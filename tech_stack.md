# 🛠️ SANGAM — Technology Stack & Deployment Architecture

This document details the technology stack powering SANGAM. It covers the **current frontend implementation** and defines the **recommended production architecture** (Backend, Database, Storage, APIs, and Hosting) required to deploy the platform completely.

---

## 🎨 1. Current Frontend Tech Stack

The current client-side app is built with a modern, responsive, and performance-oriented React stack.

| Layer | Technology | Details / Purpose |
| :--- | :--- | :--- |
| **Core Runtime & Tooling** | Node.js (v20+) & **Vite (v8)** | Lightning-fast Hot Module Replacement (HMR) and optimized Rollup production builds. |
| **Component Library** | **React (v19)** | Declarative UI structure utilizing functional components, custom hooks, and context state management. |
| **Styling** | **Tailwind CSS (v3) + PostCSS** | Utility-first styling for responsive layouts, combined with custom CSS variables for themed "Sacred Ink" assets. |
| **Routing** | **React Router DOM (v7)** | Handles client-side navigation between Pages (Landing, Dashboards, Pricing, Discover, Profiles). |
| **Iconography** | **Lucide React** | Sleek, modern SVG-based icons for instruments, stamps, and dashboard controls. |

---

## 💻 2. Proposed Backend Architecture (For Full Deployment)

Since SANGAM connects Young Talent (poets and musicians) with Mentors (Gurus) through file submissions, verification status workflows, and subscription payments, a robust backend is necessary.

Here is the recommended production stack:

### A. Backend Runtime & APIs
*   **Language**: **TypeScript**
    *   *Why*: Provides type safety from database models all the way to frontend network calls, avoiding data structure mismatches.
*   **Framework**: **Node.js with Express.js** (or **NestJS** for larger enterprise structures)
    *   *Why*: Lightweight, highly performant, and maps perfectly with the existing JavaScript/Node environment.
*   **Protocols**: **REST API + WebSockets (Socket.io)**
    *   *Why*: REST for standard CRUD operations (profiles, uploads); WebSockets for real-time notifications (e.g., notifying an artist the moment a Guru applies a *Mudra* verification stamp).

### B. Database & ORM
*   **Database**: **PostgreSQL** (Hosted via **Supabase** or **Neon**)
    *   *Why*: SANGAM relies on relational data: Users have roles (`talent` vs `guru`), Submissions are linked to `talentId` and assigned to `guruId`, and Subscriptions track specific payment histories. Relational integrity (foreign keys, transactions) is critical here.
*   **ORM**: **Prisma ORM**
    *   *Why*: Auto-generates TypeScript types from your schema, supports easy database migrations, and makes complex relational queries simple.

### C. File & Media Storage
*   **Storage Provider**: **AWS S3** or **Cloudinary**
    *   *Why*: Young talent uploads high-fidelity audio (MP3/WAV), text files (PDF/TXT), and images (portraits). These large assets cannot be stored in a relational database. S3 handles scalable object storage, and we can generate **presigned URLs** to allow direct, secure client uploads.

### D. Authentication & Identity
*   **Auth Provider**: **Clerk Auth** or **NextAuth.js**
    *   *Why*: Provides pre-built login/register forms, manages sessions, and supports Role-Based Access Control (RBAC) so we can securely segment `/dashboard/talent` from `/dashboard/guru`.

### E. Payment Gateway
*   **Gateway**: **Razorpay** (Standard for India) or **Stripe** (Global)
    *   *Why*: SANGAM lists plans in Indian Rupees (`₹99/mo`, `₹249/mo`). Razorpay has direct support for UPI, local cards, and recurring subscriptions in India.
    *   *Webhooks*: Secure webhooks will trigger backend updates to update a user's plan status upon successful recurring payments.

---

## 🗄️ 3. Recommended Database Schema Design

Using **Prisma**, the schema definition would look like this:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  TALENT
  GURU
}

enum SubmissionStatus {
  PENDING
  UNDER_REVIEW
  VERIFIED
  REVISION_REQUESTED
  DECLINED
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  name          String
  stageName     String?
  role          Role           @default(TALENT)
  avatarUrl     String?
  city          String
  state         String
  bio           String?        @db.Text
  plan          String         @default("free") // free, rising_star, pro, verified_guru, master
  createdAt     DateTime       @default(now())
  
  // Talent relations
  submissions   Submission[]   @relation("TalentSubmissions")
  assignedGuruId String?
  assignedGuru  User?          @relation("GuruMentees", fields: [assignedGuruId], references: [id])
  
  // Guru relations
  mentees       User[]         @relation("GuruMentees")
  reviews       Submission[]   @relation("GuruReviews")
  specialties   String[]       // e.g. ["Ghazal", "Classical Vocals"]
}

model Submission {
  id            String           @id @default(uuid())
  title         String
  type          String           // "poetry" | "audio"
  contentUrl    String           // Link to S3 file or text block content
  status        SubmissionStatus @default(PENDING)
  feedback      String?          @db.Text
  createdAt     DateTime         @default(now())
  
  // Relations
  talentId      String
  talent        User             @relation("TalentSubmissions", fields: [talentId], references: [id])
  assignedGuruId String
  assignedGuru  User             @relation("GuruReviews", fields: [assignedGuruId], references: [id])
}
```

---

## 🚀 4. Deployment Roadmap

To go live with the complete fullstack SANGAM application, deploy to the following hosting environments:

| App Tier | Recommended Platform | Pricing Level | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web** | **Vercel** or **Netlify** | Free Tier / Hobby | Hosts the built static React/Vite app. Provides CDN edge routing and automatic HTTPS. |
| **Backend API** | **Render.com** or **Railway.app** | $7/month | Hosts the Node.js Express server. Auto-builds directly from the GitHub repository. |
| **Database** | **Supabase** or **Neon** | Free Tier / $10/mo | Serverless PostgreSQL database with automated backups and connection pooling. |
| **Object Storage** | **AWS S3** or **Cloudinary** | Pay-as-you-go | Stores profile avatars and audio/video files. Cloudinary provides automatic audio compression. |
| **Domain & DNS**| **Cloudflare** | Free Tier | DNS resolution, DDoS protection, edge caching, and free SSL. |

---

## 📜 Summary of Technologies (Answering the Prompts)

1.  **Tools**: Git, npm/Vite, Prettier/ESLint, VS Code.
2.  **Languages**: JavaScript (Frontend) & TypeScript (Backend API).
3.  **Frameworks**: React 19, Tailwind CSS, Express.js (Node.js backend server).
4.  **Databases**: PostgreSQL (Relational) via Supabase, with Prisma ORM.
5.  **APIs & Third-Party Integrations**:
    *   **Clerk Auth API**: Identity and session management.
    *   **Razorpay API**: UPI/Subscription payments in INR.
    *   **AWS S3 API**: Secure audio, video, and image storage.
