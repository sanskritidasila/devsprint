# DevSprint — Engineering Backlog & Task Workspace

A responsive sprint task management platform demonstrating clean **state separation** between asynchronous server caching and client UI state using Next.js (App Router), TanStack React Query, and Zustand.

🔗 **Live Deployment:** [devsprint-silk.vercel.app](https://devsprint-silk.vercel.app/)

---

## 💡 Architecture & Key Decisions

In many modern React applications, server-fetched data and transient local UI states are mixed together, leading to unnecessary re-renders, prop drilling, and complex caching logic. DevSprint decouples these concerns into two distinct layers:

### 1. Server State Layer (TanStack React Query)
- **Data Caching & Lifecycle:** Fetches and hydrates initial sprint tickets with configured `staleTime` (5 minutes) to avoid redundant network round-trips.
- **Direct Cache Mutation:** Uses `useMutation` with `queryClient.setQueryData` to update backlog items (creation, status toggle, and deletion) directly in the local query cache for instant UI feedback without requiring full page refetches.
- **Stable Provider Instance:** The `QueryClient` is initialized inside a `useState` lazy-initializer in a dedicated client boundary (`QueryProvider.tsx`), guaranteeing that the cache instance remains stable across re-renders.

### 2. Client UI State Layer (Zustand)
- **Independent Filter Store:** Manages local filter states (`searchQuery` and `selectedPriority`) via a lightweight global Zustand store.
- **Zero Prop-Drilling:** Filter controls in the search bar and priority selectors trigger updates directly to the store, allowing the list views to derive active subsets cleanly without context provider overhead.

---

##Project Structure

src/
├── app/
│   ├── globals.css         # Clean styling baseline & Tailwind imports
│   ├── layout.tsx          # Root layout wrapped with QueryProvider
│   └── page.tsx            # Sprint backlog interface & combined state consumers
├── hooks/
│   └── useTasks.ts         # React Query custom hook (queries, mutations, cache updates)
├── providers/
│   └── QueryProvider.tsx   # React Query client boundary provider
└── store/
    └── useFilterStore.ts   # Zustand client state store (filters & search)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Server State & Cache:** TanStack React Query (`@tanstack/react-query`)
- **Client State Management:** Zustand
- **Styling:** Tailwind CSS (Modern editorial light theme)
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel

---

## ✨ Features

- **Backlog Orchestration:** Add, complete, and delete engineering tickets across categories (`Frontend`, `Architecture`, `State`, `Optimization`).
- **Live Sprint Velocity:** Dynamic progress calculation tracking completion percentage against total active tickets.
- **Client-Side Filtering:** Instant keyword search (matching titles, tags, and assignees) combined with priority pills (`HIGH`, `MEDIUM`, `LOW`).
- **State-Aware UI:** Purpose-built empty states, loading indicators, and priority tags with distinct status styles.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/sanskritidasila/devsprint.git](https://github.com/sanskritidasila/devsprint.git)
   cd devsprint
