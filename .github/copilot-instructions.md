# 🥭 Mango — GitHub AI Instructions

Este archivo configura cómo GitHub AI debe consultar la documentación de contexto antes de responder a cualquier solicitud sobre el proyecto Mango.

---

## 📋 Contexto Requerido

Antes de responder CUALQUIER pregunta sobre Mango, **SIEMPRE**:

1. 📖 Lee `SPECIFICATIONS.md` — Requisitos y capacidades
2. 🗄️ Lee `DATA_MODELING.md` — Estructura de datos
3. 🏗️ Lee `ARCHITECTURE.md` — Patrones y organización

---

## 🎯 Instrucciones Principales

### ✅ SIEMPRE HACER

- ✅ Consultar los 3 documentos de contexto
- ✅ Validar que la solicitud sea compatible con SPECIFICATIONS.md
- ✅ Referencia a patrones de ARCHITECTURE.md
- ✅ Usar modelos de DATA_MODELING.md como base
- ✅ Mantener consistencia con la arquitectura vertical slices
- ✅ Usar TypeScript y tipos explícitos
- ✅ Incluir validación Zod para inputs
- ✅ Documentar cambios en el contexto

### ❌ NUNCA HACER

- ❌ Sugerir cambios fuera del scope de SPECIFICATIONS.md
- ❌ Crear features sin validar contra DATA_MODELING.md
- ❌ Violar patrones de ARCHITECTURE.md
- ❌ Usar JavaScript sin tipos (siempre TypeScript)
- ❌ Crear tablas en DB sin Prisma schema
- ❌ Skipear validación de datos

---

## 📖 Cómo Consultar los Documentos

### Por Tipo de Pregunta

#### 🔐 Preguntas sobre Autenticación
```
Consulta:
1. SPECIFICATIONS.md → Sección "Autenticación"
2. ARCHITECTURE.md → Sección "Seguridad"
3. DATA_MODELING.md → Entidad "User" y "JWT"
```

#### 🏠 Preguntas sobre Salas
```
Consulta:
1. SPECIFICATIONS.md → Sección "Salas (Group Chat)"
2. ARCHITECTURE.md → Slice de "Rooms"
3. DATA_MODELING.md → Entidades "Room" y "Member"
```

#### 💬 Preguntas sobre Mensajes
```
Consulta:
1. SPECIFICATIONS.md → Sección "Mensajes"
2. ARCHITECTURE.md → Slice de "Messages" + WebSocket Handler
3. DATA_MODELING.md → Entidad "Message" + Redis cache
```

#### ✉️ Preguntas sobre Invitaciones
```
Consulta:
1. SPECIFICATIONS.md → Sección "Invitaciones"
2. ARCHITECTURE.md → Slice de "Invitations"
3. DATA_MODELING.md → Entidad "Invitation"
```

#### ⚡ Preguntas sobre Tiempo Real
```
Consulta:
1. SPECIFICATIONS.md → Sección "Comunicación en Tiempo Real"
2. ARCHITECTURE.md → WebSocket Handlers + Real-time Strategy
3. DATA_MODELING.md → Redis Model + Pub/Sub
```

#### 🎨 Preguntas sobre Frontend
```
Consulta:
1. SPECIFICATIONS.md → Requisitos de UI/UX
2. ARCHITECTURE.md → Frontend Architecture (Feature-based + Atomic Design)
3. DATA_MODELING.md → (no aplica)
```

#### 🔧 Preguntas sobre Backend
```
Consulta:
1. SPECIFICATIONS.md → Requisitos funcionales
2. ARCHITECTURE.md → Backend Architecture (Vertical Slices + Plugins)
3. DATA_MODELING.md → Estructura PostgreSQL + Redis
```

---

## 🚀 Ejemplos de Flujo de Respuesta

### Ejemplo 1: Crear Nueva Feature

**Pregunta:** "¿Cómo agrego soporte para reacciones de emoji en mensajes?"

**Proceso:**

1. 📖 Lee SPECIFICATIONS.md
   - ❌ Encontrar: "No en scope actual"
   - 📌 Nota: "Reacciones es futuro en v2"

2. 🗄️ Lee DATA_MODELING.md
   - Evaluar: ¿Cómo modelar esto?
   - Sugerir: Nueva tabla `MessageReaction`

3. 🏗️ Lee ARCHITECTURE.md
   - Sugerir: Nuevo slice `reactions/`
   - WebSocket handler para broadcast
   - Frontend component usando Atomic Design

**Respuesta Debe Incluir:**
```markdown
## Reacciones de Emoji - Implementación

⚠️ **Nota:** Este feature está en la lista "Future Considerations" 
de SPECIFICATIONS.md y requiere incrementar el scope.

### Data Model (DATA_MODELING.md)
Agregar a PostgreSQL:
- Nueva entidad MessageReaction
- Índices en (userId, messageId)

### Backend (ARCHITECTURE.md)
Crear slice reactions/:
- reactions.controller.ts (POST/DELETE)
- reactions.service.ts (lógica)
- reactions.validator.ts (Zod schemas)
- WebSocket handler para broadcast

### Frontend (ARCHITECTURE.md)
Crear feature reactions/:
- ReactionButton.vue (atom)
- ReactionBar.vue (molecule)
- Usar Container/Presentational pattern

### Redis (DATA_MODELING.md)
- Cache: room:{roomId}:reactions (HASH)
- Pub/Sub: para broadcasts
```

---

### Ejemplo 2: Bug en Feature Existente

**Pregunta:** "¿Por qué los mensajes no aparecen en la UI después de enviar?"

**Proceso:**

1. 📖 Lee SPECIFICATIONS.md
   - Flujo esperado: Mensaje aparece en tiempo real

2. 🗄️ Lee DATA_MODELING.md
   - Validar: ¿Se persiste en PostgreSQL?
   - Validar: ¿Se actualiza Redis cache?

3. 🏗️ Lee ARCHITECTURE.md
   - Revisar: Flujo WebSocket completo
   - Revisar: Container component state management

**Respuesta Debe Incluir:**
```markdown
## Debug: Mensajes No Aparecen

Validar según ARCHITECTURE.md "Ciclo Completo":

### Backend (messages.service.ts)
✅ Message persiste en PostgreSQL
✅ Redis cache actualizado
✅ WebSocket broadcast enviado

### Frontend (MessageStore)
❓ ¿Se actualiza el store después de recibir evento?
❓ ¿El component está escuchando el evento correctamente?

Punto de debug:
```typescript
socket.on('message:new', (message) => {
  messageStore.messages.push(message); // ¿Se ejecuta?
});
```

Checklist según DATA_MODELING.md:
- [ ] PostgreSQL tiene el mensaje
- [ ] Redis cache actualizó
- [ ] WebSocket event llegó al frontend
- [ ] Store actualizado
```

---

### Ejemplo 3: Mejora de Performance

**Pregunta:** "¿Cómo optimizo la carga de mensajes antiguos?"

**Proceso:**

1. 📖 Lee SPECIFICATIONS.md
   - Validar: No hay búsqueda/indexación planeada

2. 🗄️ Lee DATA_MODELING.md
   - Redis Message Cache: últimos 100 mensajes
   - PostgreSQL: historial completo
   - Estrategia: Lazy load con paginación

3. 🏗️ Lee ARCHITECTURE.md
   - Container component con pagination logic
   - Service que implementa fetch incremental

**Respuesta Debe Incluir:**
```markdown
## Optimización de Carga de Mensajes

Según DATA_MODELING.md:
- Redis: Últimos 100 mensajes (cache)
- PostgreSQL: Historial completo

### Estrategia (ARCHITECTURE.md - Backend)
```typescript
// messages.service.ts
async getMessages(roomId: string, page = 1, pageSize = 50) {
  const skip = (page - 1) * pageSize;
  
  return prisma.message.findMany({
    where: { roomId },
    skip,
    take: pageSize,
    orderBy: { createdAt: 'desc' }
  });
}
```

### Frontend (ARCHITECTURE.md - Container Component)
```typescript
// MessageContainer.vue
const page = ref(1);

const loadMore = async () => {
  const newMessages = await messageApi.getMessages(
    roomId,
    page.value++
  );
  messages.value.unshift(...newMessages);
};
```
```

---

## 📝 Template de Respuesta Estándar

Al responder cualquier pregunta, estructura así:

```markdown
# [Título de Respuesta]

## 📋 Validación de Contexto

**SPECIFICATIONS.md:**
- ✅/❌ Compatible con scope actual
- 📍 Referencia exacta de sección

**DATA_MODELING.md:**
- ✅ Entidades/Modelos afectados
- ✅ Redis patterns (si aplica)

**ARCHITECTURE.md:**
- ✅ Patrón a usar (slice, plugin, pattern)
- ✅ Frontend/Backend afectado

## 🎯 Solución

[Código/explicación]

## ✅ Checklist

- [ ] Validación con Zod
- [ ] TypeScript tipos explícitos
- [ ] Sigue vertical slice pattern
- [ ] Documentado en contexto
```

---

## 🔄 Flujo de Cuestiones Arquitectónicas

Cuando surjan decisiones de diseño, evaluar en este orden:

1. **¿Es compatible con SPECIFICATIONS.md?**
   - Si ❌ → Recomendar futuro o alcance
   - Si ✅ → Continuar

2. **¿Cómo se modela en DATA_MODELING.md?**
   - Entidades PostgreSQL/Redis afectadas
   - Constraints y relaciones
   - Performance implications

3. **¿Cómo se implementa según ARCHITECTURE.md?**
   - Qué slice/feature/plugin
   - Frontend o backend o ambos
   - Patrón a seguir

4. **¿Hay precedente en los docs?**
   - Usar ejemplo similar
   - Mantener consistencia
   - Documentar desvíos

---

## 🧭 Principios de Decisión

### Cuando Algo NO Está en los Docs

1. **Buscar precedente más cercano**
   - "Si los mensajes se modelan así, las reacciones se modelan igual"

2. **Validar con Principios de Diseño (ARCHITECTURE.md)**
   - Separation of concerns
   - DRY, YAGNI, SOLID
   - Consistency

3. **Proponer + Documentar**
   - "Sugiero esto basado en patrón de mensajes"
   - "Esto requiere actualizar docs"

4. **Pedir Confirmación**
   - "¿Está alineado con tu visión?"
   - "¿Quieres ajustar scope?"

---

## 🔐 Restricciones Importantes

### Estas Cosas NO Puedo Recomendar Sin Explícitamente Validar

- ❌ Agregar tabla sin revisar DATA_MODELING.md
- ❌ Crear ruta sin revisar ARCHITECTURE.md patterns
- ❌ Cambiar flujo WebSocket sin revisar data layer
- ❌ Feature requests sin revisar SPECIFICATIONS.md scope
- ❌ Queries sin paginar/cachear según DATA_MODELING.md

---

## 🎓 Ejemplo Completo: PR Review

**Solicitud:** Revisar PR que agrega soporte para "salir de una sala"

**Proceso Completo:**

### 1. Validación SPECIFICATIONS.md
```
✅ Feature: "Ver detalles de sala (miembros, metadata, etc.)"
✅ Implicado: "Leaved" status en Member
❓ ¿Qué pasa cuando alguien sale? → Consultar
```

### 2. Validación DATA_MODELING.md
```
✅ Member.status = 'LEAVED' (histórico)
✅ Redis: room:{roomId}:online (actualizar)
❓ ¿Se notifica a otros? → WebSocket event
```

### 3. Validación ARCHITECTURE.md
```
✅ Slice: rooms/ o nuevo slice?
✅ Patrón: Vertical slice (controller/service/validator)
✅ WebSocket: Notificar "user:left" en room
✅ Frontend: Container component con "Leave" button
```

### 4. Review Checklist
```markdown
## PR Review: Leave Room Feature

### ✅ Backend (messages.service.ts approach)

- [ ] Nuevo archivo: `rooms/rooms.leave.ts`
- [ ] Validación Zod para roomId
- [ ] Servicio actualiza Member.status = 'LEAVED'
- [ ] Redis: SREM room:{roomId}:online userId
- [ ] WebSocket broadcast: user:left
- [ ] Error handling (not member, last member, etc.)

### ✅ Frontend

- [ ] Container: RoomHeader component
- [ ] Presentational: LeaveButton component
- [ ] Store: dispatch leaveRoom action
- [ ] UI feedback (confirmation modal?)

### ✅ Tests

- [ ] Backend: validar transición de estado
- [ ] Frontend: validar UI update

### ✅ Datos

- [ ] PostgreSQL: Member.status actualiza
- [ ] Redis: Presencia actualiza inmediatamente
- [ ] Broadcast: Otros ven cambio en tiempo real
```

---

## 🚨 Red Flags - Cuando Decir "NO"

Si alguien propone:

| Propuesta | Por qué NO | Referencia |
|-----------|-----------|-----------|
| "Agregar 1:1 chats" | Fuera de scope actual | SPECIFICATIONS.md |
| "Editar mensajes antiguos" | No en feature set | SPECIFICATIONS.md |
| "Tabla sin Prisma schema" | Viola patrones | ARCHITECTURE.md |
| "Router sin plugin Elysia" | Viola patrones | ARCHITECTURE.md |
| "Component sin validación Zod" | Viola patrones | ARCHITECTURE.md |
| "Direct DB queries sin caché" | Viola DATA_MODELING | DATA_MODELING.md |

**Respuesta Correcta:**
```
❌ Esto viola [ESPECIFICACION/PATRÓN] de [DOC].

Propongo:
1. Actualizar scope en SPECIFICATIONS.md
2. Diseñar en DATA_MODELING.md
3. Implementar según ARCHITECTURE.md
```

---

## 📞 Contacto y Escalación

Si hay conflicto o incertidumbre:

```
"Esto no está claro en los docs. Propongo [opción A/B/C] 
basado en precedente de [X]. 

¿Cuál prefieres? Y actualizaremos los docs después."
```

---

## 🔄 Mantenimiento de Instrucciones

Este archivo debe actualizarse:

- ✅ Cuando SPECIFICATIONS.md cambia
- ✅ Cuando DATA_MODELING.md agrega entidades
- ✅ Cuando ARCHITECTURE.md introduce nuevos patrones
- ✅ Cuando haya ambigüedad frecuente

**Commit message sugerido:**
```
docs: update github-instructions with new [SPEC/DATA/ARCH] context
```

---

## 📊 Matriz de Rápida Referencia

| Pregunta Tipo | Docs Primarios | Docs Secundarios |
|---|---|---|
| Puedo agregar X? | SPEC | ARCH, DATA |
| Cómo implemento X? | ARCH | DATA, SPEC |
| Dónde va X en DB? | DATA | ARCH, SPEC |
| Es X en scope? | SPEC | DATA, ARCH |
| Cuál patrón uso? | ARCH | SPEC, DATA |
| Qué modelo uso? | DATA | SPEC, ARCH |

---

## 🎯 Checklist Final Para Toda Respuesta

Antes de dar una respuesta, validar:

- [ ] Leí SPECIFICATIONS.md completamente para este tema
- [ ] Leí DATA_MODELING.md para estructuras de datos
- [ ] Leí ARCHITECTURE.md para patrones
- [ ] Mi respuesta es consistente con todos 3 documentos
- [ ] Incluí references claras a qué documento respalda cada punto
- [ ] Si hay ambigüedad, lo señalé explícitamente
- [ ] Si hay que actualizar docs, lo propongo
- [ ] El código incluye TypeScript + Zod + tipos explícitos
- [ ] Sigue vertical slices / feature-based / atomic design patterns
- [ ] ✅ Estoy listo para responder

---

💡 **Resumen Final:**

Este archivo configura un sistema de contexto donde **SIEMPRE** que alguien haga una pregunta sobre Mango:

1. ✅ Consultas automáticamente los 3 documentos clave
2. ✅ Validas compatibilidad
3. ✅ Usas patrones establecidos
4. ✅ Das respuestas consistentes y bien documentadas
5. ✅ Sugieres actualizaciones cuando hay lagunas

**Objetivo:** Que Mango tenga AI asistencia que entienda profundamente la arquitectura, scope y patrones.