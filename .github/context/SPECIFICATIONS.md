# 🥭 Mango — Specifications

## 📌 What is Mango?

Mango is a **real-time chat application** designed to enable group communication through chat rooms. It allows users to connect, interact, and exchange messages instantly using a WebSocket-based architecture.

The system is focused on simplicity and real-time interaction, with an initial scope centered around **group chat functionality**.

---

## 🎯 Purpose

The primary goal of Mango is to provide:

- A **fast and reliable real-time messaging system**
- A **scalable architecture** for handling multiple users and chat rooms
- A **clear domain structure** that can evolve over time

This document defines the **current scope and capabilities** of the system.

---

## 🚀 Core Features

### 1. 🔐 Authentication

Users must be authenticated to interact with the system.

**Capabilities:**
- User registration
- User login
- Stateless authentication (JWT-based)

**Goal:**
Ensure that only authenticated users can access chat functionality.

---

### 2. 👤 Users

Represents individuals using the platform.

**Capabilities:**
- Account creation
- Identity representation within rooms
- Participation in chat interactions

---

### 3. 🏠 Rooms (Group Chat)

Rooms are the core unit of communication in Mango.

**Characteristics:**
- Only **group chat rooms** are supported (no 1:1 chats for now)
- Users must be members of a room to interact within it

**Capabilities:**
- Create chat rooms
- Join rooms via invitation
- View room details (members, metadata, etc.)

---

### 4. ✉️ Invitations

Invitations are used to control access to rooms.

**Capabilities:**
- Send invitations to other users
- Accept or reject invitations
- Manage room membership through invitations

**Important Note:**
Invitations are handled internally within the system (no public invite links).

---

### 5. 💬 Messages

Messages enable communication inside rooms.

**Current Scope:**
- Text messages only

**Capabilities:**
- Send messages to a room
- Receive messages in real-time
- Messages are visible to all room members

---

### 6. ⚡ Real-Time Communication

Mango is built around real-time interaction.

**Technology:**
- WebSockets

**Capabilities:**
- Instant message delivery
- Live updates within rooms

---

## 📦 Current Limitations

At its current stage, Mango has the following constraints:

- ❌ No direct (1:1) messaging
- ❌ No media messages (images, files, etc.)
- ❌ No message editing or deletion
- ❌ No roles/permissions within rooms
- ❌ No public/private room distinction (implicit via invitations)

---

## 🧱 Domain Overview

The system is composed of the following core domains:

- **Auth** → Handles authentication and identity
- **Users** → Represents system users
- **Rooms** → Manages group chat spaces
- **Invitations** → Controls access to rooms
- **Messages** → Handles communication
- **Real-time layer** → Synchronization via WebSockets

---

## 🔮 Future Considerations (Not Implemented Yet)

These are potential areas for expansion:

- Direct messaging (1:1 chats)
- Media/file support
- Message reactions and edits
- Presence indicators (online/offline)
- Typing indicators
- Roles and permissions in rooms

---

## 🧠 Notes for AI Agents

- Mango follows a **real-time, event-driven architecture**
- Rooms are the **primary aggregation root** for communication
- Invitations are required for **controlled access**
- Messaging is **room-scoped**, not user-scoped
- The system is designed to evolve incrementally

---

## 📍 Summary

Mango is a **real-time group chat system** with:

- Authentication
- Room-based communication
- Invitation-based access control
- Real-time messaging (text only)

It is intentionally minimal, focusing on a solid foundation for future expansion.