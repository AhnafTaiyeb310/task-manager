<![CDATA[<div align="center">

# ✅ Task Manager

**A modern, full-stack task management application built with Django REST Framework and Next.js**

![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[Features](#-features) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Project Structure](#-project-structure) · [Architecture](#-architecture)

</div>

---

## 📖 About the Project

Task Manager is a full-stack web application that lets users **create**, **view**, **update**, and **delete** tasks through a polished, modern interface. The backend exposes a RESTful API powered by **Django REST Framework**, while the frontend delivers a responsive, dark-themed UI built with **Next.js** and **Tailwind CSS**.

The application follows industry best practices including clean separation of concerns, type-safe API communication and a component-driven frontend architecture.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Create Tasks** | Add new tasks with a title, optional description, and initial status |
| **View Tasks** | See all tasks in a clean, scrollable list sorted by newest first |
| **Update Status** | Change any task's status between *To Do*, *In Progress*, and *Done* inline |
| **Delete Tasks** | Remove tasks with a single click and instant UI feedback |
| **Live Dashboard** | Sidebar panel showing active/completed counts and per-status breakdowns |
| **Loading & Error States** | Graceful handling of API loading, network errors, and validation failures |
| **Responsive Layout** | Two-column layout on desktop, stacks cleanly on mobile devices |
| **Dark Theme** | Premium dark UI with glassmorphism, subtle gradients, and teal accents |

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| [Python 3.14](https://www.python.org/) | Core programming language |
| [Django 6.0](https://www.djangoproject.com/) | Web framework |
| [Django REST Framework 3.17](https://www.django-rest-framework.org/) | RESTful API toolkit |
| [django-cors-headers](https://github.com/adamchainz/django-cors-headers) | Cross-Origin Resource Sharing support |
| [SQLite](https://www.sqlite.org/) | Lightweight database (development) |
| [uv](https://docs.astral.sh/uv/) | Fast Python package & project manager |

### Frontend

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with SSR & API proxying |
| [React 19](https://react.dev/) | Component-based UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Static type checking for JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |

---

## 🏗️ Architecture

The application uses a **decoupled client-server architecture**:

```
┌──────────────────────────────────────────────────────────────────┐
│                         Browser (User)                           │
└──────────────────────────┬───────────────────────────────────────┘
                           │  HTTP Requests
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│               Frontend  ·  Next.js (Port 3000)                   │
│                                                                  │
│   app/page.tsx  ←→  components/  ←→  lib/api.ts                  │
│                                                                  │
│   Next.js rewrites proxy /api/* requests to the backend          │
└──────────────────────────┬───────────────────────────────────────┘
                           │  Proxied /api/* requests
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│               Backend  ·  Django (Port 8000)                     │
│                                                                  │
│   config/urls.py  →  apps/tasks/urls.py  →  views.py             │
│                                       ↕                          │
│                               serializers.py  ←→  models.py      │
│                                                      ↕           │
│                                                   SQLite DB      │
└──────────────────────────────────────────────────────────────────┘
```

**Key design decisions:**

- **API Proxy** — The Next.js `rewrites` configuration proxies all `/api/*` requests to the Django backend, avoiding CORS issues in development and keeping the frontend API calls simple.
- **ModelViewSet** — Django REST Framework's `ModelViewSet` provides all CRUD operations (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) out of the box with minimal code.
- **Optimistic UI** — The frontend tracks per-task pending states (`updating` / `deleting`) and disables controls during in-flight requests to prevent double-submissions.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | How to Install |
|---|---|---|
| **Python** | 3.14+ | [python.org/downloads](https://www.python.org/downloads/) |
| **uv** | Latest | [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | Bundled with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

> **💡 Tip:** You can verify each tool is installed by running `python --version`, `uv --version`, `node --version`, and `npm --version` in your terminal.

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/AhnafTaiyeb310/task-manager.git
cd task-manager
```

### 2. Set Up the Backend

Open a terminal and navigate to the `backend/` directory:

```bash
cd backend
```

#### Install dependencies

This project uses [uv](https://docs.astral.sh/uv/) for Python package management. It will automatically create a virtual environment and install all dependencies:

```bash
uv sync
```

#### Apply database migrations

This creates the SQLite database and sets up the `Task` table:

```bash
uv run python manage.py migrate
```

#### (Optional) Create a superuser for the admin panel

```bash
uv run python manage.py createsuperuser
```

#### Start the backend server

```bash
uv run python manage.py runserver
```

The API will be available at **http://127.0.0.1:8000/api/tasks/**.

> **📝 Note:** Keep this terminal open — the backend server needs to stay running while you use the app.

---

### 3. Set Up the Frontend

Open a **new terminal** and navigate to the `frontend/` directory:

```bash
cd frontend
```

#### Install dependencies

```bash
npm install
```

#### Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

---

### 4. You're All Set! 🎉

Open **http://localhost:3000** in your browser. You should see the Task Manager dashboard. Try creating your first task!

> **⚠️ Important:** Both the backend (port 8000) and frontend (port 3000) servers must be running simultaneously for the app to work.

---

## 📡 API Reference

The backend exposes a RESTful API at `/api/tasks/`. All endpoints accept and return JSON.

### Task Object

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README with setup instructions",
  "status": "in_progress",
  "created_at": "2026-06-23T12:00:00Z",
  "updated_at": "2026-06-23T14:30:00Z"
}
```

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks/` | Retrieve all tasks (sorted by newest first) |
| `POST` | `/api/tasks/` | Create a new task |
| `GET` | `/api/tasks/{id}/` | Retrieve a single task by ID |
| `PUT` | `/api/tasks/{id}/` | Fully update a task |
| `PATCH` | `/api/tasks/{id}/` | Partially update a task (e.g., status only) |
| `DELETE` | `/api/tasks/{id}/` | Delete a task |

### Status Values

| Value | Display Label |
|---|---|
| `todo` | To Do |
| `in_progress` | In Progress |
| `done` | Done |

### Example Requests

**Create a task:**

```bash
curl -X POST http://127.0.0.1:8000/api/tasks/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread", "status": "todo"}'
```

**Update task status:**

```bash
curl -X PATCH http://127.0.0.1:8000/api/tasks/1/ \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'
```

**Delete a task:**

```bash
curl -X DELETE http://127.0.0.1:8000/api/tasks/1/
```

---

## 📁 Project Structure

```
task-manager/
├── backend/                    # Django REST API
│   ├── apps/
│   │   └── tasks/              # Tasks application
│   │       ├── models.py       # Task model (title, description, status, timestamps)
│   │       ├── serializers.py  # DRF serializer with validation
│   │       ├── views.py        # ModelViewSet for CRUD operations
│   │       ├── urls.py         # Router-based URL configuration
│   │       └── admin.py        # Django admin registration
│   ├── config/
│   │   ├── settings.py         # Django settings (installed apps, DB, middleware)
│   │   ├── urls.py             # Root URL configuration
│   │   ├── wsgi.py             # WSGI entry point
│   │   └── asgi.py             # ASGI entry point
│   ├── manage.py               # Django management CLI
│   └── pyproject.toml          # Python dependencies & project metadata
│
├── frontend/                   # Next.js + React UI
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Geist fonts
│   │   ├── page.tsx            # Main page — task dashboard & state management
│   │   └── globals.css         # Global styles, dark theme, gradients
│   ├── components/
│   │   ├── TaskForm.tsx        # New task creation form
│   │   ├── TaskList.tsx        # Task list container with empty state
│   │   └── TaskItem.tsx        # Individual task card with status & delete controls
│   ├── lib/
│   │   ├── api.ts              # API client (fetch, create, update, delete)
│   │   └── types.ts            # TypeScript interfaces & type definitions
│   ├── next.config.ts          # Next.js config with API proxy rewrites
│   ├── package.json            # Node.js dependencies & scripts
│   └── tsconfig.json           # TypeScript configuration
│
└── README.md                   # ← You are here
```

---

## 🧪 Running in Production

To create a production build of the frontend:

```bash
cd frontend
npm run build
npm start
```

> **⚠️ Note:** For production deployment, make sure to update `SECRET_KEY` in `backend/config/settings.py`, set `DEBUG = False`, and configure `ALLOWED_HOSTS` appropriately.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "Add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

---

## 📬 Contact

**Ahnaf Taiyeb** — [GitHub](https://github.com/AhnafTaiyeb310)

---

<div align="center">

**Built with ❤️ using Django & Next.js**

</div>
]]>
