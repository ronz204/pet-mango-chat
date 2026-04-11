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
├─ source/
│  ├─ features/                    # 🎯 Vertical Slices
│  │  ├─ identity/
│  │  │  ├─ plugin.ts              # Routes aggregator
│  │  │  ├─ signin/
│  │  │  │  ├─ signin.handler.ts   # Business logic
│  │  │  │  ├─ signin.schema.ts    # Zod schemas  
│  │  │  │  └─ signin.plugin.ts    # (optional)
│  │  │  └─ signup/
│  │  │     ├─ signup.handler.ts
│  │  │     └─ signup.schema.ts
│  │  ├─ rooms/
│  │  │  ├─ plugin.ts
│  │  │  ├─ create-room/
│  │  │  ├─ get-my-rooms/
│  │  │  └─ leave-room/
│  │  ├─ invites/
│  │  │  ├─ plugin.ts
│  │  │  ├─ send-invitation/
│  │  │  └─ accept-invitation/
│  │  └─ profile/
│  │     ├─ plugin.ts
│  │     ├─ get-profile/
│  │     └─ update-info/
│  ├─ core/                        # Shared
│  │  ├─ dal/                      # Data Access Layer
│  │  │  ├─ users/
│  │  │  │  ├─ user.dao.ts         # DAO implementation
│  │  │  │  ├─ user.idao.ts        # DAO interface
│  │  │  │  └─ queries/            # Query builders
│  │  │  ├─ rooms/
│  │  │  ├─ members/
│  │  │  └─ invitations/
│  │  ├─ auth/
│  │  │  ├─ auth.plugin.ts         # JWT & auth middleware
│  │  │  └─ auth.schema.ts
│  ├─ plugins/                     # Infrastructure
│  │  ├─ prisma.plugin.ts          # Prisma instance
│  │  ├─ cors.plugin.ts
│  │  ├─ health.plugin.ts
│  │  └─ scalar.plugin.ts          # API docs
│  └─ boot.ts                      # Entry point
├─ prisma/
│  ├─ schema.prisma                # Main schema (imports models)
│  └─ models/                      # Separated models
│     ├─ user.prisma
│     ├─ room.prisma
│     ├─ member.prisma
│     ├─ message.prisma
│     └─ invitation.prisma
├─ .env
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
└─ models/

✅ BIEN (Vertical Slices):
source/features/
├─ identity/
│  ├─ plugin.ts
│  ├─ signin/
│  │  ├─ signin.handler.ts
│  │  └─ signin.schema.ts
│  └─ signup/
│     ├─ signup.handler.ts
│     └─ signup.schema.ts
├─ rooms/
│  ├─ plugin.ts
│  └─ create-room/
│     ├─ create-room.handler.ts
│     └─ create-room.schema.ts
└─ invites/
   ├─ plugin.ts
   └─ send-invitation/
      ├─ send-invitation.handler.ts
      └─ send-invitation.schema.ts
```

**Diagrama de Slice:**

```Identity Slice (Feature)         │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  Plugin (Routes)             │ │
│  │  POST /auth/signin           │ │
│  │  POST /auth/signup           │ │
│  └──────────────────────────────┘ │
│              ↓                     │
│  ┌──────────────────────────────┐ │
│  │  Handler (Business Logic)    │ │
│  │  - Validate credentials      │ │
│  │  - Hash password             │ │
│  │  - Generate JWT              │ │
│  └──────────────────────────────┘ │
│              ↓                     │
│  ┌──────────────────────────────┐ │
│  │  DAO (Data Access)           │ │
│  │  - dao.create()              │ │
│  │  - dao.obtain()              │ │
│  └──────────────────────────────┘ │
│              ↓                     │
│  ┌──────────────────────────────┐ │
│  │  Prisma → PostgreSQL         │ │
│  └──────────────────────────────┘ │
│                                    │
│  ✅ Schema (Zod validation)         │
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

**Ejemplo de Slice `identity`:**

```typescript
// signin/signin.schema.ts
export const SignInBody = t.Object({
  email: t.String(),
  password: t.String()
});

export const SignInResponse = t.Object({
  token: t.String()
});

// signin/signin.handler.ts
export class SignInHandler {
  constructor(private dao: IUserDao) {}

  async handle(req: SignInRequest): Promise<SignInPayload> {
    const user = await this.dao.obtain(req.body);
    if (!user) throw new Error("User does not exist");

    const isValid = await Bun.password.verify(
      req.body.password, 
      user.password
    );
    if (!isValid) throw new Error("Invalid password");

    return { userId: user.id };
  }
}

// plugin.ts
export const IdentityPlugin = new Elysia({ name: "identity", prefix: "/auth" })
  .use(PrismaPlugin)
  .derive(({ prisma }) => ({
    signInH: new SignInHandler(new UserDao(prisma))
  }))
  .post("/signin", async ({ body, jwt, signInH }) => {
    const payload = await signInH.handle({ body });
    const token = await jwt.sign(payload);
    return { token };
  }, {
    body: SignInBody,
    response: { 200: SignInResponse }
  });
```
```

---

#### 2️⃣ Plugin Composition (ElysiaJS)

**Concepto:**
ElysiaJS usa **plugins** para composición modular.

```typescript
// boot.ts
const app = new Elysia({ prefix: "/api" })
  .use(CorsPlugin)
  .use(ScalarPlugin)      // API docs
  .use(HealthPlugin)      // Health check
  .use(IdentityPlugin)    // Auth
  .use(ProfilePlugin)     // User profile
  .use(RoomsPlugin)       // Rooms
  .use(InvitationsPlugin) // Invitations
  .listen(process.env.PORT!);
```

**Ventajas:**
- ✅ Modular y composable
- ✅ Fácil reutilizar plugins
- ✅ Dependencias claras
- ✅ Testing aislado

---

#### 3️⃣ DAO Pattern (Data Access Layer)

**Concepto:**
Capa separada para acceso a datos con interfaces y queries.

```typescript
// users/user.idao.ts
export interface IUserDao {
  create(args: Create.Args): Promise<User>;
  update(args: Update.Args): Promise<User>;
  search(args: Search.Args): Promise<User[]>;
  obtain(args: Obtain.Args): Promise<User | null>;
}

// users/user.dao.ts
export class UserDao implements IUserDao {
  constructor(private prisma: PrismaClient) {}

  async create(args: Create.Args) {
    return await this.prisma.user.create(Create.query(args));
  }

  async obtain(args: Obtain.Args) {
    return await this.prisma.user.findFirst(Obtain.query(args));
  }
  // ... otros métodos
}
```

**Beneficios:**
- 🧪 Testeable (fácil mockear)
- 🎯 Queries reutilizables
- 📦 Encapsulación de lógica de DB
- 🔄 Fácil cambiar ORM

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

**Estructura Modular:**
```
prisma/
├─ schema.prisma          # Schema principal (imports)
└─ models/                # Modelos separados
   ├─ user.prisma
   ├─ room.prisma
   ├─ member.prisma
   ├─ message.prisma
   └─ invitation.prisma
```

**Ejemplo:**

```typescript
// prisma/models/user.prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String @unique
  email    String @unique
  password String

  members     Member[]
  messages    Message[]
  invitations Invitation[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
  @@schema("mango")
}

// prisma/models/member.prisma
model Member {
  id     Int          @id @default(autoincrement())
  role   MemberRole   @default(USER)
  status MemberStatus @default(ACTIVE)

  userId Int
  user   User @relation(fields: [userId], references: [id])

  roomId Int
  room   Room @relation(fields: [roomId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, roomId])
  @@map("members")
  @@schema("mango")
}

enum MemberRole {
  ADMIN
  USER
  @@schema("mango")
}

enum MemberStatus {
  ACTIVE
  LEAVED
  @@schema("mango")
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
// Ejemplo simplificado (WebSocket en desarrollo)
socket.on('message:send', async (data) => {
  const { roomId, content } = data;
  
  // 1. Validar membresía
  const member = await prisma.member.findUnique({
    where: { userId_roomId: { userId: socket.user.id, roomId } }
  });
  if (!member) throw new Error("Not a member");
  
  // 2. Persistir mensaje
  const message = await prisma.message.create({
    data: { content, senderId: socket.user.id, roomId }
  });
  
  // 3. Broadcast a la sala
  socket.to(roomId).emit('message:new', message);
  socket.emit('message:sent', { id: message.id });
});
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
