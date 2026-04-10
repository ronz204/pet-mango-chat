# 🧠 Mango — Data Model

## 📌 Overview

Mango implementa un **enfoque híbrido de modelado de datos**:

| Capa | Tecnología | Responsabilidad |
|------|-----------|-----------------|
| 🗄️ Persistencia | PostgreSQL (Prisma) | Fuente de verdad, integridad de datos |
| ⚡ Cache & Tiempo Real | Redis | Capas efímeras, optimizaciones de lectura |

Cada capa tiene responsabilidades bien definidas para garantizar **consistencia, rendimiento y escalabilidad**.

---

## 🗄️ Modelo Relacional (PostgreSQL)

### 🎯 Propósito

- ✅ Almacenamiento persistente
- ✅ Integridad de datos
- ✅ Consistencia relacional
- ✅ Fuente de verdad para todas las entidades

---

## 🧩 Entidades Principales

### 👤 User

Representa un usuario registrado en el sistema.

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `name` | String | UNIQUE, NOT NULL |
| `email` | String | UNIQUE, NOT NULL |
| `password` | String | NOT NULL |

**Relaciones:**
- ➜ `members` (1:N) — Membresías en salas
- ➜ `messages` (1:N) — Mensajes enviados
- ➜ `invitations` (1:N) — Invitaciones recibidas

---

### 🏠 Room

Representa un espacio de grupo de chat.

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `name` | String | UNIQUE, NOT NULL |

**Relaciones:**
- ➜ `members` (1:N) — Miembros de la sala
- ➜ `messages` (1:N) — Mensajes en la sala
- ➜ `invitations` (1:N) — Invitaciones pendientes

---

### 👥 Member

Representa la membresía de un usuario en una sala.

> 💡 Esta es una **entidad de dominio**, no solo una tabla de unión.

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `role` | ENUM | `ADMIN` \| `USER` |
| `status` | ENUM | `ACTIVE` \| `LEAVED` |
| `userId` | UUID | Foreign Key → User |
| `roomId` | UUID | Foreign Key → Room |
| `createdAt` | DateTime | NOT NULL |

**Restricción Única:**
```
UNIQUE (userId, roomId)
```

**Responsabilidades:**
- Define la membresía del usuario en una sala
- Gestiona roles y permisos
- Controla el ciclo de vida dentro de la sala

---

### 💬 Message

Representa un mensaje enviado en una sala.

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `content` | String | NOT NULL |
| `senderId` | UUID | Foreign Key → User |
| `roomId` | UUID | Foreign Key → Room |
| `createdAt` | DateTime | NOT NULL, DEFAULT now() |

**Relaciones:**
- ➜ `sender` — Usuario que envió el mensaje
- ➜ `room` — Sala donde fue enviado

---

### ✉️ Invitation

Controla el acceso a las salas (modelo explícito de autorización).

| Campo | Tipo | Restricciones |
|-------|------|---------------|
| `id` | UUID | Primary Key |
| `status` | ENUM | `PENDING` \| `ACCEPTED` \| `DECLINED` \| `EXPIRED` |
| `inviteeId` | UUID | Foreign Key → User |
| `roomId` | UUID | Foreign Key → Room |
| `createdAt` | DateTime | NOT NULL |
| `expiresAt` | DateTime | Nullable |

**Responsabilidades:**
- Representa estado pre-membresía
- Controla el acceso a salas de forma explícita
- Permite auditoría de invitaciones

---

## 🔗 Diagrama de Relaciones

```
User
  ├─ 1:N ─→ Member ─ N:1 → Room
  ├─ 1:N ─→ Message ─ N:1 → Room
  └─ 1:N ─→ Invitation ─ N:1 → Room
```

| Relación | Tipo | A través de |
|----------|------|-------------|
| Users ↔ Rooms | M:N | `Member` |
| Users → Messages | 1:N | Directa |
| Rooms → Messages | 1:N | Directa |
| Users → Invitations | 1:N | Directa |
| Rooms → Invitations | 1:N | Directa |

---

## 🧠 Decisiones de Diseño

| Decisión | Beneficio |
|----------|-----------|
| `Member` como entidad de primer nivel | Permite controlar roles y ciclo de vida |
| `Invitation` como modelo explícito | Auditoría y control de acceso claro |
| Mensajes scoped a salas | Previene acceso cruzado |
| Sin joins implícitos | Explicititud y seguridad |

---

# ⚡ Modelo Redis (Cache + Realtime)

## 🎯 Propósito

- ⚡ Reducir carga en base de datos
- 🔄 Habilitar UX en tiempo real
- 📊 Manejar estado efímero

> ⚠️ **Redis NO es fuente de verdad** — solo una capa de optimización.

---

## 🎯 Estrategias por Tipo de Dato

### 💬 Message Cache

**Propósito:** Cache de lectura para mensajes recientes

| Propiedad | Valor |
|-----------|-------|
| **Key Pattern** | `room:{roomId}:messages` |
| **Tipo** | `LIST` |
| **TTL** | 1 hora (ejemplo) |

**Operaciones:**

```bash
# Agregar nuevo mensaje (al inicio)
LPUSH room:123:messages "{id, senderId, content, createdAt}"

# Mantener solo los últimos 100 mensajes
LTRIM room:123:messages 0 99

# Recuperar últimos N mensajes
LRANGE room:123:messages 0 -1
```

**Comportamiento:**
- Almacena solo mensajes recientes
- Se trim automáticamente al llegar al límite
- Reduce queries a PostgreSQL para cargar historial

---

### 🟢 Presence Indicator

Rastrea usuarios activos en una sala.

| Propiedad | Valor |
|-----------|-------|
| **Key Pattern** | `room:{roomId}:online` |
| **Tipo** | `SET` |
| **TTL** | Opcional (recomendado 5 min) |

**Operaciones:**

```bash
# Usuario se conecta
SADD room:123:online user_456

# Usuario se desconecta
SREM room:123:online user_456

# Ver usuarios activos
SMEMBERS room:123:online
```

**Características:**
- Actualización en tiempo real
- Puede extenderse con TTL para auto-limpieza
- Soporta hasta miles de usuarios simultáneos

---

### ⌨️ Typing Indicator

Rastrea usuarios escribiendo actualmente.

| Propiedad | Valor |
|-----------|-------|
| **Key Pattern** | `room:{roomId}:typing` |
| **Tipo (Recomendado)** | `ZSET` (Sorted Set) |
| **Score** | Timestamp Unix (ms) |

**Operaciones:**

```bash
# Usuario empieza a escribir
ZADD room:123:typing <timestamp> user_456

# Limpiar usuarios que escribían hace 5+ segundos
ZREMRANGEBYSCORE room:123:typing 0 (now - 5000)

# Ver usuarios escribiendo ahora
ZRANGE room:123:typing 0 -1
```

**Por qué ZSET?**
- ✅ Previene estados "ghost" (usuarios sin desconectar)
- ✅ Habilita expiración automática por timestamp
- ✅ Permite ordenar por antigüedad fácilmente

---

### 📡 Pub/Sub (Opcional)

Para comunicación entre instancias del backend.

| Propiedad | Valor |
|-----------|-------|
| **Canal** | `room:{roomId}:events` |
| **Modo** | Publish/Subscribe |

**Tipos de Eventos:**

```
message:new          → Nuevo mensaje en sala
user:joined          → Usuario entró a sala
user:left            → Usuario salió de sala
typing:start         → Usuario empieza a escribir
typing:stop          → Usuario para de escribir
user:online:update   → Cambio en presencia
```

---

## 🔄 Flujos de Datos

### 1️⃣ Flujo de Mensajes

```
Client (WebSocket)
    ↓ envía mensaje
Backend
    ├─ ✅ Valida membresía
    ├─ 🗄️ Persiste en PostgreSQL
    ├─ ⚡ Actualiza Redis cache
    └─ 📡 Publica evento (opcional)
    ↓
Broadcast a todos en sala
```

**Código Ejemplo:**

```javascript
async sendMessage(roomId, userId, content) {
  // 1. Validar
  const member = await db.member.findUnique({
    where: { userId_roomId: { userId, roomId } }
  });
  if (!member) throw new Error("No membership");

  // 2. Persistir
  const message = await db.message.create({
    data: { content, senderId: userId, roomId }
  });

  // 3. Cache
  await redis.lpush(`room:${roomId}:messages`, 
    JSON.stringify(message));
  await redis.ltrim(`room:${roomId}:messages`, 0, 99);

  // 4. Broadcast
  io.to(roomId).emit('message:new', message);
}
```

---

### 2️⃣ Flujo de Typing

```
Client (WebSocket)
    ↓ emite "typing"
Backend
    ├─ ⚡ Actualiza Redis ZSET
    └─ 📡 Broadcast a sala
    ↓
Todos ven indicador en tiempo real
```

**Código Ejemplo:**

```javascript
onUserTyping(roomId, userId) {
  const now = Date.now();
  redis.zadd(`room:${roomId}:typing`, now, userId);
  
  // Limpiar stales cada 5 segundos
  redis.zremrangebyscore(
    `room:${roomId}:typing`, 
    0, 
    now - 5000
  );
  
  io.to(roomId).emit('typing:update', {
    typing: redis.zrange(`room:${roomId}:typing`, 0, -1)
  });
}
```

---

### 3️⃣ Flujo de Presencia

```
User (WebSocket)
    ├─ Conecta → SADD (online)
    ├─ Activo → Broadcast presencia
    └─ Desconecta → SREM (online)
    ↓
Todos ven quién está online
```

**Código Ejemplo:**

```javascript
socket.on('connect', async () => {
  const roomId = socket.handshake.data.roomId;
  const userId = socket.handshake.data.userId;
  
  // Agregar a presencia
  await redis.sadd(`room:${roomId}:online`, userId);
  
  // Notificar
  io.to(roomId).emit('user:online', {
    online: await redis.smembers(`room:${roomId}:online`)
  });
});

socket.on('disconnect', async () => {
  await redis.srem(`room:${roomId}:online`, userId);
  io.to(roomId).emit('user:offline', { userId });
});
```

---

## 🔐 Sincronización PostgreSQL ↔ Redis

### Regla de Oro

```
PostgreSQL = Verdad
Redis = Cache (puede perderse)
```

**Implicaciones:**

| Escenario | Acción |
|-----------|--------|
| Redis down | Reconstruir desde PostgreSQL |
| Datos stale en Redis | Revalidar contra PostgreSQL |
| Inconsistencia detectada | Reconstruir cache desde DB |

**Estrategia de Invalidación:**

```javascript
// Cuando actualizar un dato crítico
async updateRoom(roomId, data) {
  // 1. Actualizar DB
  await db.room.update({ where: { id: roomId }, data });
  
  // 2. Invalidar caches relacionadas
  await redis.del(`room:${roomId}:messages`);
  await redis.del(`room:${roomId}:online`);
  await redis.del(`room:${roomId}:typing`);
  
  // 3. Notificar
  io.to(roomId).emit('room:updated', { roomId });
}
```

---

## 🧠 Principios Clave

| Principio | Descripción |
|-----------|-------------|
| **PostgreSQL = Verdad** | Siempre confiar en DB para datos críticos |
| **Redis = Velocidad** | Optimizar UX con datos ephemeros |
| **Nunca confiar solo en Redis** | Siempre tener fallback a DB |
| **Patrones simples** | Evitar keys complejas o anidadas |
| **Datos pequeños y corta vida** | No almacenar objetos grandes |
| **Invalidación explícita** | No dejar que cache caduque silenciosamente |

---

## 📍 Resumen Ejecutivo

### Arquitectura en Capas

```
┌─────────────────────────────┐
│      WebSocket Clients      │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│    Backend (Bun/Elysia)     │
├─────────────┬───────────────┤
│ PostgreSQL  │    Redis      │
│ (Verdad)    │   (Cache)     │
└─────────────┴───────────────┘
```

### Características

| Capa | Ventajas | Limitaciones |
|------|----------|--------------|
| **PostgreSQL** | Persistencia, integridad, ACID | Latencia de disco |
| **Redis** | Baja latencia, real-time | Ephemero, no ACID |

### Resultado

- ⚡ **Baja latencia** — Mensajes y presencia instantáneos
- 📈 **Escalabilidad** — Redis reduce carga DB exponencialmente
- 🧩 **Separación de Concerns** — Cada herramienta hace una cosa bien
- 🔄 **Sincronización controlada** — Invalidación explícita evita bugs

---

## 🚀 Próximos Pasos

Para profundizar en la implementación:

👉 **`DATA_ACCESS.md`**  
Define cómo tus vertical slices interactúan con Prisma y Redis.
Aquí es donde transformas una arquitectura normal en una **excelente**.

---

## 📚 Referencia Rápida

### Decisiones de Diseño Clave

- ✅ `Member` es una entidad con roles y estados
- ✅ `Invitation` es control de acceso explícito
- ✅ Mensajes son siempre scoped a salas
- ✅ Redis cache es opcional pero recomendado
- ✅ Typing indicator usa ZSET por expiración temporal

### Redis Key Patterns

```
room:{roomId}:messages    (LIST)  — Cache de mensajes
room:{roomId}:online      (SET)   — Usuarios activos
room:{roomId}:typing      (ZSET)  — Usuarios escribiendo
room:{roomId}:events      (PUB/SUB) — Canal de eventos
```

### PostgreSQL Constraints

```
UNIQUE (User.email)
UNIQUE (User.name)
UNIQUE (Room.name)
UNIQUE (Member.userId, Member.roomId)
```

---

💡 **Nota Final:** Esta documentación está optimizada para ser legible por humanos y consumible por IA. Mantente simple y explícito en tus decisiones de arquitectura.