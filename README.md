# Nova Talent CRM – Notification System

A full-stack, multi-tenant notification system built as part of the AI-native CRM hiring challenge.

The project demonstrates an end-to-end notification pipeline where business events automatically generate notifications for the correct tenant and user.

---

# Features

## Notification Module

- Create notifications
- List notifications (tenant-aware)
- Unread notification badge
- Mark a single notification as read
- Mark all notifications as read
- Unread count API
- Pagination
- Tenant isolation

---

## Outreach Module

Create outreach messages and simulate creator replies.

When a creator replies:

Outreach → NotificationService → Notification Created

Notifications are automatically assigned to the recruiter responsible for that outreach.

---

## Team Module

Invite new team members.

When a member joins:

Team → NotificationService → Tenant-wide Notification

Notifications are visible to every user inside the organization.

---

# Tech Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Data JPA
- PostgreSQL
- Maven
- Lombok

---

## Frontend

- Next.js 15 (App Router)
- React 19
- JavaScript
- Tailwind CSS v4
- Lucide React
- Axios

---

# Architecture

```
                        React Frontend

                               │

                     REST Controllers

        ┌──────────────┬──────────────┐
        │              │              │

 Notification     Outreach      Team

        │              │              │
        │              └──────┐ ┌─────┘
        │                     │ │
        ▼                     ▼ ▼

             NotificationService

                     │

          NotificationRepository

                     │

                 PostgreSQL
```

Business modules never create notifications directly.

They delegate all notification creation to the NotificationService.

This keeps the notification logic reusable and decoupled.

---

# Multi-Tenant Design

The system supports multiple organizations (tenants).

For the assignment, authentication is simplified using request headers.

```
X-Tenant-Id
X-User-Id
```

Every API request is automatically scoped to the caller's tenant.

Tenant isolation guarantees:

- Tenant A cannot view Tenant B notifications.
- Tenant A cannot mark Tenant B notifications as read.
- Tenant A cannot access Tenant B outreach or team data.

---

# Backend APIs

## Notification

```
POST   /api/notifications
GET    /api/notifications
GET    /api/notifications/unread-count
PATCH  /api/notifications/{id}/read
PATCH  /api/notifications/read-all
```

---

## Outreach

```
POST   /api/outreach
GET    /api/outreach
GET    /api/outreach/{id}
POST   /api/outreach/{id}/reply
```

---

## Team

```
POST   /api/team
GET    /api/team
GET    /api/team/{id}
```

---

# Notification Flow

## Outreach Reply

```
Create Outreach

        │

Waiting For Reply

        │

Simulate Reply

        │

NotificationService.createNotification()

        │

Notification Saved

        │

Notification Bell Updates
```

---

## Team Invitation

```
Invite Member

        │

Save Team Member

        │

NotificationService.createNotification()

        │

Tenant-wide Notification

        │

Notification Bell Updates
```

---

# Frontend

The frontend is intentionally minimal and focuses on demonstrating the notification pipeline rather than building a complete CRM.

## Pages

```
Dashboard

Outreach

Team
```

## Notification Bell

- Unread badge
- Polls backend every 20 seconds
- Dropdown activity panel
- Mark one notification as read
- Mark all notifications as read

---

# Project Structure

```
frontend/

app/
components/
hooks/
lib/

backend/

notification/
outreach/
team/
exception/
```

---

# Running the Project

## Backend

```bash
cd backend

./mvnw spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Environment Variables

Frontend

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api

NEXT_PUBLIC_TENANT_ID=t1

NEXT_PUBLIC_USER_ID=u1
```

Backend

Configure PostgreSQL inside

```
application.properties
```

```
spring.datasource.url=

spring.datasource.username=

spring.datasource.password=
```

---

# Testing

The backend has been tested using Postman.

Verified scenarios:

- Create notification
- List notifications
- Unread count
- Mark one notification as read
- Mark all notifications as read
- Create outreach
- Simulate creator reply
- Invite team member
- Tenant isolation
- User-specific notifications
- Tenant-wide notifications

---

# Future Improvements

With more development time, the following enhancements would be implemented:

- JWT authentication instead of request headers
- WebSocket / Server-Sent Events for real-time notifications
- Redis caching for unread counts
- Event-driven architecture using Kafka or RabbitMQ
- Notification preferences per user
- Search and filtering
- Infinite scrolling / pagination improvements
- Optimistic UI with rollback and toast notifications
- Unit and integration testing using JUnit and Testcontainers
- Docker & Docker Compose deployment
- CI/CD pipeline using GitHub Actions

---

# Assignment Objectives Covered

- Multi-tenant architecture
- End-to-end notification pipeline
- Automatic notification triggers
- RESTful API design
- Frontend notification bell
- Backend integration
- Clean layered architecture
- Separation of concerns
- Tenant isolation
- Modern React + Spring Boot implementation
