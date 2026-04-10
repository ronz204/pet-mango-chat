# 🏗️ Mango — Architecture

## 📌 Application Type

Mango is a **client-server real-time application** designed around a clear separation between frontend and backend responsibilities.

- **Client:** Single Page Application (SPA)
- **Server:** REST API with real-time capabilities
- **Communication Model:** Hybrid (HTTP + WebSockets)

---

## 🧱 High-Level Architecture

Mango follows a **distributed architecture** composed of:

- A frontend client (SPA)
- A backend API server
- A relational database
- An in-memory data store for caching and real-time support

---

## 🖥️ Frontend Architecture

### ⚙️ Stack

- **Framework:** Vue
- **Build Tooling:** Vite
- **Runtime:** Bun

---

### 🧩 Architectural Patterns

#### 1. Feature-Based Architecture

The frontend is organized by **features**, not by technical layers.

**Goal:**
- Improve scalability
- Encapsulate domain logic
- Enable independent evolution of features

---

#### 2. Atomic Design

UI components follow the **Atomic Design methodology**:

- Atoms → Basic UI elements
- Molecules → Composed components
- Organisms → Complex UI sections
- Templates / Pages → Layout structure

**Goal:**
Promote reusability and consistency in UI design.

---

#### 3. Container / Presentation Pattern

Components are split into:

- **Container Components**
  - Handle logic, state, and data fetching
- **Presentation Components**
  - Focus purely on UI rendering

**Goal:**
Separation of concerns and improved testability.

---

## 🖥️ Backend Architecture

### ⚙️ Stack

- **Runtime:** Bun
- **Framework:** ElysiaJS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Cache / Realtime Engine:** Redis

---

### 🧩 Architectural Patterns

#### 1. Vertical Slices Architecture

The backend is organized by **features (slices)** instead of layers.

Each slice contains everything needed for a specific use case:

- Route / Controller
- Business logic
- Data access

**Goal:**
- High cohesion
- Low coupling
- Easier scalability and maintainability

---

#### 2. Plugin Composition (Elysia)

Mango leverages Elysia's **plugin system** to compose functionality.

**Characteristics:**
- Modular structure
- Encapsulation of behavior
- Reusable plugins across the application

**Goal:**
Enable flexible and composable backend design.

---

## 🗄️ Data Layer

### PostgreSQL

Used as the **primary data store**.

**Responsibilities:**
- Persistent storage
- Relational data modeling
- Transactional consistency

---

### Prisma ORM

Acts as the abstraction layer between the application and the database.

**Responsibilities:**
- Type-safe database access
- Query building
- Schema management

---

### Redis

Used as an **in-memory data store**.

**Responsibilities:**
- Caching frequently accessed data
- Supporting real-time features
- Pub/Sub for message distribution (if applicable)

**Why Redis?**
- Extremely low latency
- High throughput
- Ideal for real-time systems

---

## 🌐 Communication Protocols

### HTTP (REST)

Used for standard client-server communication.

**Use Cases:**
- Authentication
- Room management
- Invitations
- Data fetching

---

### WebSockets

Used for **real-time bidirectional communication**.

**Use Cases:**
- Sending and receiving messages instantly
- Live updates within chat rooms

**Characteristics:**
- Persistent connection
- Low latency communication
- Event-driven interactions

---

## ⚡ Real-Time Strategy

Mango uses a **hybrid approach**:

- HTTP → For request/response operations
- WebSockets → For real-time events

Redis may be used to:

- Broadcast events across instances
- Synchronize real-time data
- Support horizontal scaling

---

## 🧠 Design Principles

Mango’s architecture is guided by:

- **Separation of concerns**
- **Scalability**
- **Modularity**
- **Domain-driven structure (feature-based)**
- **Real-time first mindset**

---

## 📦 Scalability Considerations

The current architecture allows:

- Horizontal scaling of the backend
- Stateless authentication (JWT)
- Externalized state via Redis

---

## 🔮 Future Enhancements

Potential architectural improvements:

- Message queues (e.g., for event-driven workflows)
- Distributed WebSocket handling
- Advanced caching strategies
- Observability (logging, tracing, metrics)
- Rate limiting and security layers

---

## 📍 Summary

Mango is a **modern real-time client-server system** built with:

- A Vue-based SPA frontend
- A Bun + Elysia backend
- PostgreSQL for persistence
- Redis for caching and real-time support
- HTTP + WebSockets communication

It combines **feature-based frontend architecture** with **vertical slice backend design**, enabling a scalable and maintainable system.