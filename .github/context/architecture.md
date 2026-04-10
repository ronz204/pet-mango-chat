# 🥭 Mango — Architecture

## 📌 Tipo de Aplicación

Mango es una **aplicación cliente-servidor en tiempo real** diseñada con una clara separación de responsabilidades entre frontend y backend.

| Componente | Tipo | Propósito |
|-----------|------|----------|
| **Cliente** | Single Page Application (SPA) | Interfaz de usuario interactiva |
| **Servidor** | REST API + WebSocket | Lógica de negocio y datos |
| **Comunicación** | HTTP + WebSockets | Hybrid request/response + streaming |

---

## 🏗️ Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Vue SPA)                   │
│  ├─ Features (Auth, Rooms, Messages, Invitations)       │
│  ├─ UI Components (Atomic Design)                       │
│  └─ State Management & API Client                       │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
    ┌───▼────┐             ┌──────▼──────┐
    │  HTTP  │             │ WebSocket   │
    │ REST   │             │ (Socket.IO) │
    └───┬────┘             └──────┬──────┘
        │                         │
┌───────▼─────────────────────────▼───────────┐
│        Backend (Bun + ElysiaJS)             │
│  ├─ Vertical Slices (Auth, Rooms, etc.)     │
│  ├─ Plugin System (Elysia)                  │
│  └─ WebSocket Handler                       │
└───────┬─────────────────────────────────────┘
        │
        ├─────────────────┬────────────────┐
        │                 │                │
    ┌───▼────┐       ┌────▼────┐      ┌──▼────┐
    │        │       │          │      │       │
    │   🗄️   │       │    ⚡    │      │   📡  │
    │PostgreSQL       │  Redis  │      │  SMTP │
    │         │       │          │      │(email)│
    └─────────┘       └──────────┘      └───────┘
```

**Componentes Principales:**

- ✅ Frontend: Interfaz reactiva del usuario
- ✅ Backend: API REST + WebSocket server
- ✅ PostgreSQL: Almacenamiento persistente (fuente de verdad)
- ✅ Redis: Cache y comunicación en tiempo real
- ✅ SMTP: Notificaciones por email (opcional)

---

## 🖥️ Frontend Architecture

### ⚙️ Stack Tecnológico

| Herramienta | Versión | Propósito |
|------------|---------|----------|
| **Vue** | 3.x | Framework reactivo |
| **Vite** | 5.x | Build tool (desarrollo rápido) |
| **Bun** | 1.x | Runtime de JavaScript |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.x | Utilidades de estilos |
| **Socket.IO Client** | 4.x | WebSocket real-time |
| **Axios/Fetch** | Nativa | HTTP client |

### 🏛️ Organización Estructural

```
frontend/
├─ src/
│  ├─ features/                    # 🎯 Feature-based architecture
│  │  ├─ auth/
│  │  │  ├─ components/
│  │  │  │  ├─ LoginForm.vue
│  │  │  │  └─ RegisterForm.vue
│  │  │  ├─ stores/
│  │  │  │  └─ authStore.ts
│  │  │  ├─ api/
│  │  │  │  └─ authApi.ts
│  │  │  └─ types/
│  │  │     └─ auth.types.ts
│  │  ├─ rooms/
│  │  │  ├─ components/
│  │  │  ├─ stores/
│  │  │  ├─ api/
│  │  │  └─ types/
│  │  ├─ messages/
│  │  │  ├─ components/
│  │  │  ├─ stores/
│  │  │  ├─ api/
│  │  │  └─ types/
│  │  └─ invitations/
│  │     ├─ components/
│  │     ├─ stores/
│  │     ├─ api/
│  │     └─ types/
│  ├─ components/                 # 🧬 Atomic Design
│  │  ├─ atoms/
│  │  │  ├─ Button.vue
│  │  │  ├─ Input.vue
│  │  │  └─ Avatar.vue
│  │  ├─ molecules/
│  │  │  ├─ MessageCard.vue
│  │  │  ├─ UserInfo.vue
│  │  │  └─ InputField.vue
│  │  └─ organisms/
│  │     ├─ ChatWindow.vue
│  │     ├─ RoomHeader.vue
│  │     └─ MemberList.vue
│  ├─ layout/                     # Layouts reutilizables
│  │  ├─ AppLayout.vue
│  │  └─ AuthLayout.vue
│  ├─ services/                   # Servicios compartidos
│  │  ├─ apiClient.ts
│  │  ├─ socketService.ts
│  │  └─ notificationService.ts
│  ├─ stores/                     # Estado global (Pinia)
│  │  ├─ authStore.ts
│  │  └─ socketStore.ts
│  ├─ router/                     # Routing (Vue Router)
│  │  └─ index.ts
│  ├─ App.vue
│  └─ main.ts
├─ vite.config.ts
├─ tsconfig.json
└─ package.json
```

### 🧩 Patrones Arquitectónicos

#### 1️⃣ Feature-Based Architecture

**Concepto:**
El frontend se organiza por **features** (dominio), no por capas técnicas.

```
❌ MALO (Layer-based):
src/
├─ components/
├─ pages/
├─ services/
└─ stores/

✅ BIEN (Feature-based):
src/features/
├─ auth/
│  ├─ components/
│  ├─ services/
│  └─ stores/
├─ rooms/
│  ├─ components/
│  ├─ services/
│  └─ stores/
└─ messages/
   ├─ components/
   ├─ services/
   └─ stores/
```

**Beneficios:**
- 🎯 Alta cohesión (todo para una feature junto)
- 📦 Bajo acoplamiento (features independientes)
- 🚀 Escalabilidad (agregar features sin tocar otras)
- 🧪 Testeable (cada feature aislada)

**Ejemplo de Feature `auth`:**

```typescript
// auth/api/authApi.ts
export const authApi = {
  register: (email: string, password: string) => 
    api.post('/auth/register', { email, password }),
  
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  logout: () => 
    api.post('/auth/logout')
};

// auth/stores/authStore.ts
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    user.value = response.data.user;
    isAuthenticated.value = true;
  };

  return { user, isAuthenticated, login };
});
```

---

#### 2️⃣ Atomic Design

**Concepto:**
Los componentes UI siguen metodología **Atomic Design**.

```
┌────────────────────────────────┐
│      Templates / Pages         │  Layouts completos
├────────────────────────────────┤
│      Organisms                 │  Secciones complejas
├────────────────────────────────┤
│      Molecules                 │  Componentes compuestos
├────────────────────────────────┤
│      Atoms                     │  Elementos básicos
└────────────────────────────────┘
```

**Niveles:**

| Nivel | Ejemplo | Responsabilidad |
|-------|---------|-----------------|
| **Atoms** | Button, Input, Avatar | Elemento básico reutilizable |
| **Molecules** | MessageCard, UserInfo | Composición de atoms |
| **Organisms** | ChatWindow, RoomHeader | Sección UI completa |
| **Templates** | ChatLayout | Estructura de página |
| **Pages** | RoomPage | Página renderizada |

**Ejemplo de Atomic Design:**

```vue
<!-- atoms/Button.vue -->
<template>
  <button class="btn" :class="`btn-${variant}`">
    <slot />
  </button>
</template>

<!-- molecules/MessageCard.vue -->
<template>
  <div class="message-card">
    <Avatar :user="message.sender" />
    <div class="content">
      <p class="sender-name">{{ message.sender.name }}</p>
      <p class="text">{{ message.content }}</p>
      <Button variant="secondary" size="small">React</Button>
    </div>
  </div>
</template>

<!-- organisms/ChatWindow.vue -->
<template>
  <div class="chat-window">
    <RoomHeader :room="room" />
    <MessageList :messages="messages" />
    <MessageInput @send="sendMessage" />
  </div>
</template>
```

---

#### 3️⃣ Container / Presentational Pattern

**Concepto:**
Separación clara entre lógica y presentación.

```
┌─────────────────────────────────────┐
│    Container Component              │
│  ├─ Lógica de negocio              │
│  ├─ Manejo de estado               │
│  ├─ Fetching de datos              │
│  └─ Eventos y reacciones           │
│                                     │
│  └─ Renderiza ─→ ┌────────────────┐│
│                  │ Presentation   ││
│                  │  Component     ││
│                  │ ├─ Props       ││
│                  │ ├─ Slots       ││
│                  │ └─ Emits       ││
│                  └────────────────┘│
└─────────────────────────────────────┘
```

**Ejemplo:**

```typescript
// rooms/containers/RoomContainer.vue (Smart)
<template>
  <RoomPresentation
    :room="room"
    :messages="messages"
    :loading="loading"
    @send-message="handleSendMessage"
  />
</template>

<script setup lang="ts">
const roomId = route.params.id;
const room = ref<Room>();
const messages = ref<Message[]>([]);
const loading = ref(true);

onMounted(async () => {
  const response = await roomApi.getRoom(roomId);
  room.value = response.data;
  messages.value = response.data.messages;
  loading.value = false;
});

const handleSendMessage = async (content: string) => {
  await messageApi.sendMessage(roomId, content);
};
</script>

// rooms/components/RoomPresentation.vue (Dumb)
<template>
  <div v-if="loading" class="loading">Cargando...</div>
  <div v-else class="room">
    <div class="header">{{ room.name }}</div>
    <div class="messages">
      <MessageCard v-for="msg in messages" :key="msg.id" :message="msg" />
    </div>
    <MessageInput @submit="$emit('send-message', $event)" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  room: Room;
  messages: Message[];
  loading: boolean;
}>();

defineEmits<{
  'send-message': [content: string];
}>();
</script>
```

**Beneficios:**
- 🧪 Presentación fácil de testear (sin dependencias)
- ♻️ Componentes muy reutilizables
- 🎯 Lógica centralizada en containers
- 📱 Fácil cambiar UI sin tocar lógica

---

### 🔄 Flujo de Estado

```
User Interaction
  ↓
Component emits event
  ↓
Store (Pinia) updates state
  ↓
API call to backend (si aplica)
  ↓
Backend updates DB/Redis
  ↓
Backend responds
  ↓
Store updates local state
  ↓
Component re-renders (reactivity)
  ↓
UI updates
```

**Ejemplo de flujo de envío de mensaje:**

```typescript
// En MessageInput component
const handleSend = async (content: string) => {
  const messageStore = useMessageStore();
  await messageStore.sendMessage(roomId, content);
};

// En messageStore
const sendMessage = async (roomId: string, content: string) => {
  try {
    // 1. Request al backend
    const response = await messageApi.sendMessage(roomId, content);
    
    // 2. Update local state
    messages.value.push(response.data);
    
    // 3. WebSocket broadcast (backend lo hace)
    // 4. Component se re-renderiza automáticamente
  } catch (error) {
    handleError(error);
  }
};
```

---

## 🖥️ Backend Architecture

### ⚙️ Stack Tecnológico

| Herramienta | Versión | Propósito |
|------------|---------|----------|
| **Bun** | 1.x | Runtime (NPM compatible, más rápido) |
| **ElysiaJS** | 1.x | Framework web (tipo Elysia.js) |
| **Prisma** | 5.x | ORM type-safe |
| **PostgreSQL** | 15+ | Base de datos relacional |
| **Redis** | 7.x | Cache + real-time |
| **Socket.IO** | 4.x | WebSocket server |
| **Zod** | 3.x | Validación de esquemas |
| **JWT** | - | Autenticación stateless |

### 🏛️ Organización Estructural

```
backend/
├─ src/
│  ├─ features/                    # 🎯 Vertical Slices
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts     # Routes
│  │  │  ├─ auth.service.ts        # Business logic
│  │  │  ├─ auth.validator.ts      # Zod schemas
│  │  │  ├─ auth.types.ts          # Types
│  │  │  └─ index.ts               # Elysia plugin
│  │  ├─ rooms/
│  │  │  ├─ rooms.controller.ts
│  │  │  ├─ rooms.service.ts
│  │  │  ├─ rooms.validator.ts
│  │  │  ├─ rooms.types.ts
│  │  │  └─ index.ts
│  │  ├─ messages/
│  │  │  ├─ messages.controller.ts
│  │  │  ├─ messages.service.ts
│  │  │  ├─ messages.validator.ts
│  │  │  ├─ messages.types.ts
│  │  │  └─ index.ts
│  │  └─ invitations/
│  │     ├─ invitations.controller.ts
│  │     ├─ invitations.service.ts
│  │     ├─ invitations.validator.ts
│  │     ├─ invitations.types.ts
│  │     └─ index.ts
│  ├─ core/                        # Shared
│  │  ├─ db/
│  │  │  ├─ client.ts              # Prisma instance
│  │  │  └─ migrations/
│  │  ├─ redis/
│  │  │  ├─ client.ts              # Redis instance
│  │  │  └─ pubsub.ts              # Pub/Sub setup
│  │  ├─ middleware/
│  │  │  ├─ auth.ts
│  │  │  └─ errorHandler.ts
│  │  ├─ utils/
│  │  │  ├─ jwt.ts
│  │  │  └─ errors.ts
│  │  └─ types/
│  │     └─ common.ts
│  ├─ websocket/                   # Real-time
│  │  ├─ handlers/
│  │  │  ├─ messageHandler.ts
│  │  │  ├─ typingHandler.ts
│  │  │  └─ presenceHandler.ts
│  │  ├─ events.ts                 # Event types
│  │  └─ socketServer.ts
│  ├─ app.ts                       # Elysia app setup
│  └─ index.ts                     # Entry point
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ .env
├─ bunfig.toml
├─ package.json
└─ tsconfig.json
```

### 🧩 Patrones Arquitectónicos

#### 1️⃣ Vertical Slices Architecture

**Concepto:**
Backend organizado por **features (slices)**, no por capas técnicas.

```
❌ MALO (Layered):
src/
├─ controllers/
├─ services/
├─ repositories/
├─ models/
└─ utils/

✅ BIEN (Vertical Slices):
src/features/
├─ auth/
│  ├─ controller.ts
│  ├─ service.ts
│  ├─ validator.ts
│  └─ types.ts
├─ rooms/
│  ├─ controller.ts
│  ├─ service.ts
│  ├─ validator.ts
│  └─ types.ts
└─ messages/
   ├─ controller.ts
   ├─ service.ts
   ├─ validator.ts
   └─ types.ts
```

**Diagrama de Slice:**

```
┌────────────────────────────────────┐
│     Auth Slice (Feature)           │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  Controller (Routes)         │ │
│  │  POST /auth/register         │ │
│  │  POST /auth/login            │ │
│  └──────────────────────────────┘ │
│              ↓                     │
│  ┌──────────────────────────────┐ │
│  │  Service (Business Logic)    │ │
│  │  - Hash password             │ │
│  │  - Generate JWT              │ │
│  │  - Validate credentials      │ │
│  └──────────────────────────────┘ │
│              ↓                     │
│  ┌──────────────────────────────┐ │
│  │  Data Access (Prisma)        │ │
│  │  - prisma.user.create()      │ │
│  │  - prisma.user.findUnique()  │ │
│  └──────────────────────────────┘ │
│              ↓                     │
│  ┌──────────────────────────────┐ │
│  │  Database (PostgreSQL)       │ │
│  └──────────────────────────────┘ │
│                                    │
│  ✅ Validator (Zod)               │
│  ✅ Types (TypeScript)            │
└────────────────────────────────────┘
```

**Beneficios:**
- 🎯 Colocación de código relacionado
- 🚀 Deployment independiente de features
- 🧪 Tests por feature
- 📚 Documentación autodocumentada
- 🔄 Bajo acoplamiento entre slices

**Ejemplo de Slice `messages`:**

```typescript
// messages/messages.types.ts
export interface SendMessageRequest {
  roomId: string;
  content: string;
}

export interface MessageResponse {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  createdAt: Date;
}

// messages/messages.validator.ts
import { z } from 'zod';

export const sendMessageSchema = z.object({
  roomId: z.string().uuid(),
  content: z.string().min(1).max(1000)
});

// messages/messages.service.ts
export const messagesService = {
  async sendMessage(
    userId: string,
    roomId: string,
    content: string
  ) {
    // 1. Validar membresía
    const member = await prisma.member.findUnique({
      where: {
        userId_roomId: { userId, roomId }
      }
    });

    if (!member) {
      throw new Error('No membership');
    }

    // 2. Crear mensaje
    const message = await prisma.message.create({
      data: {
        content,
        senderId: userId,
        roomId
      }
    });

    // 3. Update Redis cache
    await redis.lpush(
      `room:${roomId}:messages`,
      JSON.stringify(message)
    );
    await redis.ltrim(`room:${roomId}:messages`, 0, 99);

    // 4. Broadcast event
    socketServer.to(roomId).emit('message:new', message);

    return message;
  }
};

// messages/messages.controller.ts
export const messagesController = (app: Elysia) =>
  app.post('/rooms/:roomId/messages', 
    async ({ params: { roomId }, body, user }) => {
      const validated = sendMessageSchema.parse(body);
      
      return messagesService.sendMessage(
        user.id,
        roomId,
        validated.content
      );
    },
    {
      body: z.object({
        content: z.string().min(1).max(1000)
      }),
      beforeHandle: ({ user }) => {
        if (!user) throw new Unauthorized();
      }
    }
  );

// messages/index.ts
export const messagesPlugin = (app: Elysia) =>
  app
    .use(messagesController)
    .ws('/rooms/:roomId/messages', {
      open: (ws) => { /* handle connection */ },
      message: (ws, message) => { /* handle message */ },
      close: (ws) => { /* handle disconnect */ }
    });
```

---

#### 2️⃣ Plugin Composition (ElysiaJS)

**Concepto:**
ElysiaJS usa **plugins** para composición modular.

```typescript
// app.ts
const app = new Elysia()
  // Core plugins
  .use(cors())
  .use(jwt({ secret: env.JWT_SECRET }))
  
  // Feature plugins
  .use(authPlugin)
  .use(roomsPlugin)
  .use(messagesPlugin)
  .use(invitationsPlugin)
  
  // Middleware
  .use(errorHandlerPlugin)
  
  // Start
  .listen(env.PORT);
```

**Ventajas:**
- ✅ Modular y composable
- ✅ Fácil reutilizar plugins
- ✅ Dependencias claras
- ✅ Testing aislado

---

#### 3️⃣ Middleware Chain

```
Request
  ↓
[CORS]
  ↓
[JWT Verification]
  ↓
[Route Handler]
  ├─ [Validation]
  ├─ [Authorization]
  ├─ [Service Logic]
  └─ [Database Access]
  ↓
Response
```

---

## 🗄️ Capa de Datos

### PostgreSQL (Persistencia)

**Responsabilidades:**
- ✅ Almacenamiento persistente
- ✅ Modelado relacional
- ✅ ACID transactions
- ✅ Fuente de verdad

**Características:**
- Soporte para UUID, JSONB, Arrays
- Constraints y triggers
- Índices para performance
- Migrations versionadas

### Prisma ORM

**Responsabilidades:**
- ✅ Type-safe queries
- ✅ Schema management
- ✅ Migrations
- ✅ Type generation

**Ejemplo:**

```typescript
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String   @unique
  password  String
  members   Member[]
  messages  Message[]
  createdAt DateTime @default(now())
}

model Room {
  id        String   @id @default(cuid())
  name      String   @unique
  members   Member[]
  messages  Message[]
  createdAt DateTime @default(now())
}

model Member {
  id        String   @id @default(cuid())
  userId    String
  roomId    String
  role      Role     @default(USER)
  status    Status   @default(ACTIVE)
  user      User     @relation(fields: [userId], references: [id])
  room      Room     @relation(fields: [roomId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, roomId])
}

model Message {
  id        String   @id @default(cuid())
  content   String
  senderId  String
  roomId    String
  sender    User     @relation(fields: [senderId], references: [id])
  room      Room     @relation(fields: [roomId], references: [id])
  createdAt DateTime @default(now())

  @@index([roomId])
  @@index([senderId])
}

enum Role {
  ADMIN
  USER
}

enum Status {
  ACTIVE
  LEAVED
}
```

### Redis (Cache + Real-time)

**Responsabilidades:**
- ✅ Cache de lectura
- ✅ Pub/Sub para broadcasts
- ✅ Presence tracking
- ✅ Typing indicators

**Datos típicos:**
- `room:{roomId}:messages` → LIST (cache)
- `room:{roomId}:online` → SET (presencia)
- `room:{roomId}:typing` → ZSET (typing)
- `room:{roomId}:events` → PUB/SUB (broadcast)

---

## 🌐 Protocolos de Comunicación

### HTTP/REST

**Uso Principal:**
- ✅ Autenticación
- ✅ CRUD operations
- ✅ Gestión de datos

**Ejemplo de endpoint:**

```typescript
app.post('/rooms/:roomId/messages', 
  async ({ params, body, user }) => {
    // Validar
    // Procesar
    // Responder
    return { success: true, message: newMessage };
  }
);
```

### WebSockets (Socket.IO)

**Uso Principal:**
- ✅ Mensajes en tiempo real
- ✅ Presencia y typing
- ✅ Broadcast de eventos
- ✅ Sincronización bidireccional

**Ciclo de conexión:**

```
Client               Backend
  │                   │
  ├─ connect()────→   │ [connect handler]
  │                   ├─ Validar JWT
  │                   ├─ Agregar a Redis (online)
  │                   └─ Broadcast user:joined
  │   ←────joined─────┤
  │                   │
  ├─ emit event──→    │ [message handler]
  │                   ├─ Validar membresía
  │                   ├─ Persistir en DB
  │                   ├─ Update Redis
  │                   └─ Broadcast event
  │   ←─── event─────┤
  │                   │
  ├─ disconnect()───→ │ [disconnect handler]
  │                   ├─ Remover de Redis (online)
  │                   └─ Broadcast user:left
  │   ←─ disconnect──┤
```

**Ejemplo de WebSocket handler:**

```typescript
// websocket/handlers/messageHandler.ts
export const messageHandler = (socket: Socket) => {
  socket.on('message:send', async (data) => {
    const { roomId, content } = data;
    
    try {
      // 1. Validar
      const member = await validateMembership(
        socket.user.id,
        roomId
      );
      
      // 2. Procesar
      const message = await messagesService.sendMessage(
        socket.user.id,
        roomId,
        content
      );
      
      // 3. Broadcast
      socket.to(roomId).emit('message:new', {
        id: message.id,
        content: message.content,
        sender: { id: message.senderId, name: message.sender.name },
        createdAt: message.createdAt
      });
      
      // 4. Confirmar al sender
      socket.emit('message:sent', { id: message.id });
      
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });
};
```

---

## ⚡ Estrategia de Tiempo Real

### Flujo Híbrido (HTTP + WebSocket)

```
┌─────────────────────────────────────┐
│     Datos Críticos (HTTP)           │
│  ├─ Autenticación                   │
│  ├─ Gestión de salas                │
│  ├─ Invitaciones                    │
│  └─ Confirmaciones                  │
└─────────────────────────────────────┘
        ↓ (para datos persistentes)
┌─────────────────────────────────────┐
│     PostgreSQL (Fuente de Verdad)   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Datos Efímeros (WebSocket)        │
│  ├─ Mensajes en tiempo real         │
│  ├─ Presencia                       │
│  ├─ Typing indicators               │
│  └─ Eventos en vivo                 │
└─────────────────────────────────────┘
        ↓ (para UX inmediata)
┌─────────────────────────────────────┐
│     Redis (Caché + Broadcast)       │
└─────────────────────────────────────┘
```

### Garantías de Consistencia

| Escenario | Estrategia |
|-----------|-----------|
| Mensaje enviado | HTTP persiste, WS broadcast inmediato |
| Usuario offline | DB tiene verdad, Redis actualiza cuando vuelve |
| Redis down | Reconstituir desde PostgreSQL on-demand |
| Conflictos | Last-write-wins (timestamp) |

---

## 🔐 Seguridad

### Autenticación

```typescript
// JWT-based, stateless
const token = jwt.sign(
  { userId: user.id, email: user.email },
  env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Validar en cada request
app.use(jwt({ secret: env.JWT_SECRET }));
```

### Autorización

```typescript
// WebSocket
socket.use((socket, next) => {
  const token = socket.handshake.auth.token;
  const decoded = jwt.verify(token, env.JWT_SECRET);
  socket.user = decoded;
  next();
});

// HTTP
app.before(({ user }) => {
  if (!user) throw new Unauthorized();
});
```

### Validación

```typescript
// Zod para todos los inputs
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

schema.parse(body); // Throws if invalid
```

---

## 📊 Monitoreo y Observabilidad

### Logging

```typescript
// Ejemplo con Pino
import { pino } from 'pino';

const logger = pino();

logger.info({ userId, roomId }, 'Message sent');
logger.error({ error }, 'Send message failed');
```

### Métricas

```typescript
// Prometheus-style
metrics.increment('messages.sent', { roomId });
metrics.gauge('rooms.active_users', activeCount);
metrics.histogram('message.latency_ms', latency);
```

### Tracing

```typescript
// OpenTelemetry
const span = tracer.startSpan('sendMessage');
// ... operación
span.end();
```

---

## 📈 Escalabilidad

### Horizontal Scaling

```
┌──────────────┐
│  Load        │
│  Balancer    │
└──────┬───────┘
       │
       ├─→ [Backend 1]
       ├─→ [Backend 2]
       └─→ [Backend 3]
       
       Todos comparten:
       ├─ PostgreSQL (single DB)
       ├─ Redis (shared cache)
       └─ Socket.IO Adapter (Redis Adapter)
```

### Redis Adapter para WebSocket

```typescript
import { createAdapter } from '@socket.io/redis-adapter';

io.adapter(createAdapter(redisClient, pubsubClient));

// Ahora un evento emitido en Server 1
// Se recibe en Server 2 y 3 automáticamente
```

---

## 🚀 Deployment

### Stack Típico

```
Internet
  ↓
Cloudflare/AWS CloudFront (CDN)
  ↓
Application Load Balancer
  ↓
Kubernetes Cluster (EKS/GKE)
  ├─ [Backend Pod 1]
  ├─ [Backend Pod 2]
  └─ [Backend Pod 3]
  ↓
RDS PostgreSQL (Primary + Standby)
  ↓
ElastiCache Redis Cluster
```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mango"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-secret-key"

# Server
PORT=3000
NODE_ENV="production"

# CORS
CORS_ORIGIN="https://mango.example.com"
```

---

## 🧠 Principios de Diseño

| Principio | Aplicación |
|-----------|-----------|
| **Separation of Concerns** | Slices por feature, componentes separados |
| **DRY (Don't Repeat Yourself)** | Servicios compartidos, hooks reutilizables |
| **YAGNI (You Aren't Gonna Need It)** | MVP first, extensibilidad después |
| **SOLID Principles** | Interfaces claras, inyección de dependencias |
| **Fail Fast** | Validación temprana, errores descriptivos |
| **Async First** | Operaciones no-bloqueantes |
| **Cache is King** | Redis para datos calientes |

---

## 🔄 Ciclo Completo: Envío de Mensaje

```
┌─ Frontend ─────────────────────────────┐
│ Usuario escribe en MessageInput        │
│ Click en "Enviar"                      │
└──────────────┬────────────────────────┘
               │
               ├─ Emit WebSocket
               │  "message:send"
               │
┌──────────────▼──────────────────────────┐
│       Backend WebSocket Handler         │
│ 1. Validar JWT del socket              │
│ 2. Parsear datos (Zod)                 │
│ 3. Validar membresía                   │
└──────────────┬──────────────────────────┘
               │
               ├─ Call messagesService
               │
┌──────────────▼──────────────────────────┐
│      Business Logic (Service)           │
│ 1. Query Prisma (validar member)       │
│ 2. Create Message en PostgreSQL        │
│ 3. Update Redis cache                  │
└──────────────┬──────────────────────────┘
               │
               ├─ Broadcast WebSocket
               │  "message:new" a room
               │
┌──────────────▼──────────────────────────┐
│      Frontend (todas instancias)        │
│ 1. Recibir "message:new"               │
│ 2. Update messageStore                 │
│ 3. Re-renderizar ChatWindow            │
└────────────────────────────────────────┘
```

---

## 📍 Resumen

Mango es un **sistema moderno cliente-servidor en tiempo real**:

### Frontend
- ✅ Vue 3 + Vite + TypeScript
- ✅ Feature-based architecture
- ✅ Atomic Design + Container/Presentational
- ✅ State management con Pinia
- ✅ Comunicación HTTP + WebSocket

### Backend
- ✅ Bun + ElysiaJS + Prisma
- ✅ Vertical Slices architecture
- ✅ Plugin composition
- ✅ Type-safe (Zod validation)
- ✅ PostgreSQL + Redis hybrid

### Características
- 🚀 Escalable horizontalmente
- 🔐 Autenticación JWT
- ⚡ Real-time con WebSockets
- 💾 Persistencia fuerte
- 🎯 Dominio claro y mantenible
