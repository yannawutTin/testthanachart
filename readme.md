# Test Project — Thanachart Technical Test

A full-stack web application built with **.NET Core 8** (backend) and **Next.js** (frontend), connected via REST API and containerized with Docker Compose.

---

## 🗂 Project Structure

```
.
├── backend/          # .NET Core 8 Web API
├── frontend/         # Next.js frontend
├── createTable.sql   # Database schema
├── docker-compose.yaml
└── README.md
```

### 🗂 Backend Structure

```
├── Application
│   ├── Application.csproj
│   ├── DependencyInjection.cs
│   ├── StockServices
│   └── productServices
├── Dockerfile
├── Domain
│   ├── DTO
│   ├── DependencyInjection.cs
│   ├── Domain.csproj
│   ├── Entities
│   └── interfaces
├── Infrastructure
│   ├── Contexts
│   ├── DependencyInjection.cs
│   ├── Infrastructure.csproj
│   └── repository
├── backend.sln
└── stockapi
    ├── Program.cs
    ├── Properties
    ├── appsettings.Development.json
    ├── appsettings.json
    ├── controller
    ├── stockapi.csproj
    └── stockapi.http
```

### 🗂 Frontend Structure

```
app
├── (shop)
│   ├── layout.tsx
│   ├── products
│   └── stock
├── components
│   ├── CartSidebar.tsx
│   ├── navbar.tsx
│   └── toast.tsx
├── config
│   ├── axios.ts
│   └── env.ts
├── context
│   ├── CartContext.tsx
│   └── toastContext.tsx
├── favicon.ico
├── globals.css
├── hook
│   └── stockHook.ts
├── layout.tsx
├── lib
├── models
│   └── product.ts
└── page.tsx
```

---

## ⚙️ Prerequisites

| Tool                    | Version                  |
| ----------------------- | ------------------------ |
| .NET Core               | 8                        |
| Node.js                 | 18+                      |
| Docker & Docker Compose | latest                   |
| PostgreSQL              | 14+ (if running locally) |

---

## 🚀 Running Locally

### Backend

1. Go to the backend directory:

```bash
   cd backend
```

2. Update `appsettings.Development.json` with your database connection:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=your_db_name;Username=your_db_user;Password=your_db_password"
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://0.0.0.0:4500" // if you want to run on a different port, change it here
      }
    }
  }
}
```

**remark
if you change the port in `appsettings.Development.json`, make sure to update the API URL in the frontend `.env.local` file as well.**

3. Run the server:

```bash
   dotnet run --project stockapi
```

The API will be available at `http://localhost:3000`

---

### Frontend

1. Go to the frontend directory:

```bash
   cd frontend
```

2. Create a `.env.local` file:

```env
   NEXT_PUBLIC_API_URL=http://localhost:4500
```

3. Install dependencies and start the dev server:

```bash
   npm install
   npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🐳 Running with Docker Compose

1. In the root directory, create a `.env` file:

```env
   JWT_SECRET=your_jwt_secret_here
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_NAME=your_db_name
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
```

2. Start all services:

```bash
   docker compose up -d
```

---

## 📚 Tech Stack

### Backend

- [.NET Core 8](https://dotnet.microsoft.com/) — Web API framework
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/) — ORM for database access
- [PostgreSQL](https://www.postgresql.org/) — Relational database

### Frontend

- [Next.js](https://nextjs.org/) — React framework
- [Axios](https://axios-http.com/) — HTTP client
