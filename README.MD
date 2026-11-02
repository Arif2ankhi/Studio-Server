# 🎬 StudioSpace — Creative Studio Booking Marketplace

StudioSpace is a full-stack marketplace web application built to connect creative professionals with studio spaces. Users can seamlessly explore, filter, host, and book verified photo studios, film stages, podcast lounges, music suites, and art workshops by the hour.

---

## 🔗 Live Links & Repositories

| Component | Repository / Live Link |
| :--- | :--- |
| 🌐 **Live Application** | [View Live Demo] https://studiospace-client-xi.vercel.app |
| 💻 **Client-Side Repository** | [GitHub Client Repo]  https://github.com/Arif2ankhi/Studio-Client 
| ⚙️ **Server-Side Repository** | [GitHub Server Repo]  https://github.com/Arif2ankhi/Studio-Server 

---

## 🛠️ Key Technologies & Tech Stack

### Client-Side (Frontend)
- **Framework:** Next.js (App Router) & React[cite: 1, 2]
- **Language:** TypeScript[cite: 1, 2]
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide React Icons[cite: 1, 2, 6, 11]
- **Authentication:** BetterAuth Client (`authClient`)[cite: 1, 2, 6]

### Server-Side (Backend & Database)
- **Runtime & Framework:** Node.js & Express.js[cite: 1, 2]
- **Database:** MongoDB Atlas (Native MongoDB Driver)[cite: 1, 2]
- **Authentication Management:** BetterAuth Server API[cite: 1, 2]

---

## ✨ Key Features & Highlights

- **Dynamic Studio Explorer:** Browse creative spaces filtered by category, rate, location, and popularity[cite: 1, 2, 10].
- **Featured Studios Section:** Displays real-time top listings directly from MongoDB with a responsive grid layout and graceful offline demo fallback[cite: 1, 2].
- **Seamless Authentication:** Secure user registration, login, and session persistence managed via BetterAuth[cite: 1, 2, 6].
- **Interactive User Dropdown:** Quick access to personalized features including studio listings, booking management, and saved wishlists[cite: 6].
- **Add New Studio Listings:** Integrated multi-step workflow allowing hosts to publish detailed studio offerings[cite: 1, 2, 6].
- **Smooth Navigation & UX:** Dynamic active state tracking, hash link auto-scroll (`/#how-it-works`, `/#about`), and full light/dark theme toggling[cite: 1, 2, 6, 7].
- **Optimized Performance:** Server-Side Rendering (SSR), React Suspense boundary skeletons, and dynamic route protection[cite: 1, 2, 8].

---

## 📂 Project Architecture Overview

```text
├── client/ (Next.js App Router)
│   ├── src/app/                  # Application pages, layouts, and routes
│   │   ├── page.tsx              # Homepage with Suspense-wrapped Featured Studios
│   │   ├── studios/              # Explore & studio detail views
│   │   └── add-studio/           # Add new studio page
│   ├── src/components/           # Reusable UI, Navbar, Footer, and Feature Cards
│   └── src/lib/                  # BetterAuth client, API fetchers, and TypeScript types
│
└── server/ (Express & MongoDB)
    ├── index.js                  # Express App entry point & endpoint routes
    └── db.js                     # MongoDB connection setup