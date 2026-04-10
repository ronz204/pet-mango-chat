# 🥭 Mango — Specifications

## 📌 Qué es Mango?

**Mango** es una **aplicación de chat en tiempo real** diseñada para habilitar comunicación grupal a través de salas de chat. Permite a los usuarios conectarse, interactuar e intercambiar mensajes instantáneamente usando una arquitectura basada en WebSockets.

El sistema se enfoca en **simplicidad e interacción inmediata**, con un alcance inicial centrado en **funcionalidad de grupo chat**.

---

## 🎯 Propósito

El objetivo principal de Mango es proporcionar:

| Objetivo | Descripción |
|----------|-------------|
| ⚡ **Sistema rápido y confiable** | Mensajería en tiempo real sin latencia perceptible |
| 📈 **Arquitectura escalable** | Múltiples usuarios y salas sin degradación |
| 🧩 **Estructura de dominio clara** | Diseño que permite evolución incremental |

Este documento define el **alcance actual y capacidades** del sistema.

---

## 🚀 Características Principales

### 1. 🔐 Autenticación

Los usuarios deben estar autenticados para interactuar con el sistema.

| Capacidad | Descripción |
|-----------|-------------|
| 📝 **Registro** | Crear nueva cuenta de usuario |
| 🔑 **Login** | Acceder con credenciales |
| 🎫 **JWT Stateless** | Tokens para sesiones sin servidor |

**Garantía:**
Solo usuarios autenticados pueden acceder a funcionalidad de chat.

**Flujo:**

```
Registro
  ├─ Email + Password
  └─ ✅ Cuenta creada

Login
  ├─ Email + Password
  └─ 🎫 JWT token recibido

Solicitudes Posteriores
  ├─ Authorization: Bearer <token>
  └─ ✅ Validado por backend
```

---

### 2. 👤 Usuarios

Representa individuos usando la plataforma.

| Aspecto | Detalles |
|--------|----------|
| **Identidad** | Email único + nombre único |
| **Creación** | Mediante registro |
| **Participación** | En salas mediante membresía |
| **Scope** | Sistema global |

**Capacidades:**
- ✅ Crear cuenta
- ✅ Ser miembro de múltiples salas
- ✅ Enviar y recibir mensajes
- ✅ Recibir invitaciones

**Ciclo de Vida:**

```
Nuevo Usuario
    ↓ (Registro)
Cuenta Activa
    ├─ Puede recibir invitaciones
    ├─ Puede enviar invitaciones
    ├─ Puede ver salas donde es miembro
    └─ Puede enviar mensajes en salas
```

---

### 3. 🏠 Salas (Group Chat)

Las salas son la unidad principal de comunicación en Mango.

| Propiedad | Valor |
|-----------|-------|
| **Alcance Actual** | Solo salas de grupo (sin 1:1) |
| **Identidad** | Nombre único |
| **Tipo de Miembro** | Solo usuarios autenticados |
| **Escalabilidad** | Cientos de miembros por sala |

**Características:**
- ✅ Salas independientes con miembros separados
- ✅ Solo miembros pueden ver y enviar mensajes
- ✅ Historial de mensajes por sala
- ✅ Metadatos de sala (nombre, creador, fecha)

**Capacidades:**
- ✅ Crear nueva sala
- ✅ Unirse a salas (via invitación)
- ✅ Ver detalles de sala (miembros, metadata)
- ✅ Listar salas donde el usuario es miembro

**Ciclo de Vida de Sala:**

```
Crear Sala (por Usuario A)
    ↓
Sala Existe (Usuario A es miembro automático)
    ├─ Usuario A invita a Usuario B
    ├─ Usuario B acepta invitación
    └─ Ambos pueden enviar mensajes
    ↓
Sala Activa (múltiples miembros)
```

**Restricciones:**
- ❌ Una sala solo existe si tiene al menos 1 miembro
- ❌ No hay salas "públicas" descubribles (acceso solo por invitación)

---

### 4. ✉️ Invitaciones

Las invitaciones controlan quién puede acceder a las salas.

| Propiedad | Detalles |
|-----------|----------|
| **Tipo** | Sistema interno (no links públicos) |
| **Estados** | PENDING, ACCEPTED, DECLINED, EXPIRED |
| **Propósito** | Control de acceso a salas |
| **Emisor** | Miembros existentes de la sala |

**Flujo de Invitación:**

```
Usuario A (en Sala X)
    ├─ Invita a Usuario B
    └─ Status: PENDING
    
Usuario B
    ├─ Recibe invitación
    └─ Puede:
        ├─ ✅ Aceptar → ACCEPTED → Se vuelve miembro
        ├─ ❌ Rechazar → DECLINED
        └─ ⏰ Ignorar → EXPIRED (después de X días)
```

**Capacidades:**
- ✅ Enviar invitación a otro usuario (si eres miembro de la sala)
- ✅ Aceptar invitación recibida
- ✅ Rechazar invitación recibida
- ✅ Ver estado de invitaciones enviadas y recibidas

**Reglas:**
- Un usuario solo puede invitar a salas donde es miembro
- No se puede invitar dos veces al mismo usuario a la misma sala
- Las invitaciones expiradas después de 7 días (configurable)

---

### 5. 💬 Mensajes

Los mensajes habilitan la comunicación dentro de salas.

| Propiedad | Valor |
|-----------|-------|
| **Tipo de Contenido** | Solo texto (por ahora) |
| **Scope** | Sala (visible a todos los miembros) |
| **Visibilidad** | Solo para miembros de la sala |
| **Historial** | Almacenado permanentemente |

**Capacidades:**
- ✅ Enviar mensaje de texto a una sala
- ✅ Recibir mensajes en tiempo real
- ✅ Ver historial de mensajes en sala
- ✅ Conocer remitente y timestamp de cada mensaje

**Flujo de Envío:**

```
Usuario A (miembro de Sala X)
    ├─ Escribe mensaje
    └─ Presiona enviar
    
Backend
    ├─ ✅ Valida membresía
    ├─ ✅ Persiste en DB
    ├─ 📡 Broadcast a Sala X
    └─ ⚡ Update Redis cache
    
Sala X (Miembros)
    ├─ Recibirán mensaje en tiempo real
    └─ Verán: Emisor, contenido, timestamp
```

**Restricciones:**
- ❌ Solo miembros pueden enviar mensajes
- ❌ No se pueden editar mensajes después de enviar
- ❌ No se pueden eliminar mensajes
- ❌ Solo texto (sin archivos, imágenes, links)
- ❌ Sin reacciones o emojis por ahora

---

### 6. ⚡ Comunicación en Tiempo Real

Mango está construido alrededor de interacción inmediata.

| Aspecto | Detalles |
|---------|----------|
| **Tecnología** | WebSockets (Socket.IO) |
| **Latencia Objetivo** | < 100ms |
| **Confiabilidad** | Reconexión automática |

**Capacidades:**
- ✅ Entrega instantánea de mensajes
- ✅ Actualizaciones en vivo dentro de salas
- ✅ Notificaciones de eventos (usuario entró, salió, etc.)
- ✅ Fallback a HTTP si WebSocket falla

**Eventos Soportados:**

```
message:new
  ├─ Payload: { messageId, content, senderId, createdAt }
  └─ Broadcast: A todos en la sala

room:updated
  ├─ Payload: { roomId, updates }
  └─ Broadcast: A todos en la sala

user:joined
  ├─ Payload: { userId, timestamp }
  └─ Broadcast: A todos en la sala

user:left
  ├─ Payload: { userId, timestamp }
  └─ Broadcast: A todos en la sala
```

---

## 📦 Limitaciones Actuales

En su etapa actual, Mango tiene las siguientes restricciones:

| Feature | Estado | Razón |
|---------|--------|-------|
| Direct Messaging (1:1) | ❌ No | Scope inicial: solo grupo |
| Media (imágenes, archivos) | ❌ No | Complejidad de almacenamiento |
| Edición de mensajes | ❌ No | Complejidad de sincronización |
| Eliminación de mensajes | ❌ No | Auditoría y consistencia |
| Roles/Permisos | ❌ No | Será agregado en v2 |
| Salas públicas | ❌ No | Control de acceso explícito |
| Búsqueda de mensajes | ❌ No | Requiere índices |
| Menciones (@user) | ❌ No | Requiere parser avanzado |
| Reacciones (emojis) | ❌ No | Complejidad de estado |

---

## 📊 Matriz de Casos de Uso

### Usuario Nuevo

```
1. Visitante accede a Mango
2. Ve pantalla de registro
3. Ingresa email + contraseña
4. ✅ Cuenta creada
5. ✅ JWT recibido
6. Redirigido a dashboard (sin salas)
```

### Unirse a Sala Existente

```
1. Usuario A es miembro de Sala X
2. Usuario A invita a Usuario B
3. Usuario B recibe notificación de invitación
4. Usuario B acepta
5. ✅ Usuario B se vuelve miembro de Sala X
6. Usuario B ve historial y puede enviar mensajes
```

### Enviar Mensaje

```
1. Usuario A (miembro de Sala X) escribe mensaje
2. Usuario A presiona enviar
3. Backend valida membresía ✅
4. Backend persiste en PostgreSQL ✅
5. Backend actualiza Redis cache ✅
6. WebSocket broadcast a todos en Sala X
7. Todos los miembros ven mensaje en tiempo real
```

### Crear Nueva Sala

```
1. Usuario A hace click en "Crear sala"
2. Usuario A ingresa nombre de sala
3. ✅ Sala creada en DB
4. ✅ Usuario A se vuelve miembro automático
5. Usuario A puede invitar a otros
6. Sala aparece en su lista de salas
```

---

## 🧱 Estructura de Dominios

El sistema está compuesto por los siguientes dominios principales:

| Dominio | Responsabilidad | Entidades |
|---------|-----------------|-----------|
| **Auth** | Autenticación e identidad | JWT tokens, sessions |
| **Users** | Representación de usuarios | User |
| **Rooms** | Gestión de salas de chat | Room, Member |
| **Invitations** | Control de acceso a salas | Invitation |
| **Messages** | Comunicación y historial | Message |
| **Real-time** | Sincronización vía WebSocket | Events, Broadcasts |

**Diagram de Interacciones:**

```
┌─────────────────────────────────────────┐
│           Auth Domain                   │
│   (Autenticación → JWT → Autorización)  │
└────────────────┬────────────────────────┘
                 │
    ┌────────────▼────────────┐
    │   Users Domain          │
    │ (Identidad, perfil)     │
    └────────────┬────────────┘
                 │
    ┌────────────▼──────────────────────┐
    │   Rooms Domain                    │
    │ ├─ Room (espacio de chat)         │
    │ └─ Member (membresía en sala)     │
    └────────────┬──────────────────────┘
                 │
    ┌────────────▼──────────────────────┐
    │   Invitations Domain              │
    │ (Control de acceso a salas)       │
    └────────────┬──────────────────────┘
                 │
    ┌────────────▼──────────────────────┐
    │   Messages Domain                 │
    │ (Comunicación en salas)           │
    └────────────┬──────────────────────┘
                 │
    ┌────────────▼──────────────────────┐
    │   Real-time Domain                │
    │ (WebSocket, broadcasts, sync)     │
    └───────────────────────────────────┘
```

---

## 🔮 Consideraciones Futuras (No Implementadas)

Estos son potenciales áreas de expansión planificadas para versiones futuras:

| Feature | Descripción | Complejidad | Prioridad |
|---------|-------------|-------------|-----------|
| 🔀 Direct Messaging | 1:1 chats entre usuarios | Media | Alta |
| 📎 Media/Files | Compartir imágenes, documentos | Alta | Media |
| ✏️ Message Edits | Editar mensajes después de enviar | Media | Baja |
| 🗑️ Message Deletion | Eliminar mensajes con auditoría | Media | Baja |
| 👁️ Presence Indicators | Ver quién está online | Baja | Alta |
| ⌨️ Typing Indicators | Ver quién está escribiendo | Baja | Media |
| 🎭 Roles & Permissions | Admin, moderador, miembro | Media | Alta |
| 🔍 Search | Buscar mensajes por contenido | Alta | Baja |
| 📌 Pins | Fijar mensajes importantes | Baja | Baja |
| 😀 Reactions | Reaccionar con emojis | Baja | Media |
| 🔗 Link Preview | Preview de URLs | Media | Baja |
| 🔔 Notifications | Notificaciones desktop/mobile | Media | Alta |

---

## 🧠 Notas para Agentes IA

- Mango sigue una **arquitectura dirigida por eventos y tiempo real**
- Las salas son el **agregado raíz principal** para comunicación
- Las invitaciones son **requeridas para control de acceso**
- Los mensajes son **scoped a salas**, no a usuarios
- El sistema está diseñado para **evolucionar incrementalmente**
- **PostgreSQL es la fuente de verdad**, Redis es capa de caché
- **WebSockets es el canal primario** de comunicación

**Principios de Diseño:**
- Simplicidad primero (MVP antes de complejidad)
- Explicititud sobre implicititud (invitaciones explícitas)
- Escalabilidad desde el inicio (Redis + arquitectura async)
- Auditoría y trazabilidad (todos los cambios en DB)

---

## 📋 Checklist de Requisitos

### Autenticación
- ✅ Registro de usuario
- ✅ Login con JWT
- ✅ Validación de tokens en cada request

### Usuarios
- ✅ Crear perfil
- ✅ Información de usuario
- ✅ Listado de salas del usuario

### Salas
- ✅ Crear sala
- ✅ Listar salas propias
- ✅ Ver detalles de sala
- ✅ Ver miembros de sala

### Invitaciones
- ✅ Enviar invitación
- ✅ Aceptar invitación
- ✅ Rechazar invitación
- ✅ Ver invitaciones pendientes

### Mensajes
- ✅ Enviar mensaje a sala
- ✅ Recibir mensajes en tiempo real
- ✅ Ver historial de mensajes
- ✅ Validación de membresía antes de enviar

### Tiempo Real
- ✅ WebSocket connection
- ✅ Broadcast de mensajes
- ✅ Reconexión automática
- ✅ Fallback a HTTP

---

## 📍 Resumen Ejecutivo

**Mango es un sistema de grupo chat en tiempo real** con:

| Componente | Detalles |
|-----------|----------|
| **Autenticación** | JWT-based, stateless |
| **Comunicación** | Room-based, WebSocket powered |
| **Control de Acceso** | Invitation-based (explícito) |
| **Mensajería** | Texto, real-time, persistente |
| **Escalabilidad** | PostgreSQL + Redis híbrido |
| **Objetivo** | MVP sólido para evolución futura |

**Está intencionalmente minimizado**, enfocándose en una fundación sólida para expansión futura sin acumular deuda técnica.

---

## 📚 Referencia Rápida

### Estados de Entidades

**Invitation States:**
```
PENDING  → Esperando respuesta del invitado
ACCEPTED → Usuario se unió a la sala
DECLINED → Usuario rechazó la invitación
EXPIRED  → 7 días pasaron sin respuesta
```

**Member Status:**
```
ACTIVE   → Usuario es miembro activo
LEAVED   → Usuario se fue de la sala (histórico)
REMOVED  → Usuario fue removido (futuro)
```

### APIs Principales

```
POST   /auth/register         → Crear cuenta
POST   /auth/login            → Obtener JWT
POST   /rooms                 → Crear sala
GET    /rooms                 → Listar salas del usuario
POST   /rooms/:id/invitations → Invitar usuario
POST   /invitations/:id/accept → Aceptar invitación
POST   /rooms/:id/messages    → Enviar mensaje
GET    /rooms/:id/messages    → Ver historial
WS     /socket                → WebSocket connection
```

### WebSocket Events

```
Emitir:
  socket.emit('message:send', { roomId, content })
  socket.emit('typing:start', { roomId })
  socket.emit('typing:stop', { roomId })

Escuchar:
  socket.on('message:new', (data) => { ... })
  socket.on('user:joined', (data) => { ... })
  socket.on('user:left', (data) => { ... })
```

---

💡 **Siguiente Paso:** Revisa `DATA_MODELING.md` para entender cómo se estructuran los datos en PostgreSQL y Redis.