# 🚀 backend-assignment

### Project Overview
This repository contains the documentation and project structure for the **Backend Developer (Intern)** assignment.
It includes API documentation (Thunder Client collection placeholder), a scalability note, and configuration examples.

> NOTE: API request/response examples and the Thunder Client collection were created using **Thunder Client (VS Code extension)** — **Postman/Swagger were NOT used**.

---

## 🧱 Tech Stack
- Node.js + Express.js (suggested)
- MongoDB Atlas (Mongoose)
- JWT authentication (jsonwebtoken)
- Password hashing with bcryptjs
- Thunder Client for API testing & documentation

---

## ⚙️ Setup Instructions (for evaluators)
1. Clone the repo:
```bash
https://github.com/Swapnilsable20/backend-assignment.git
cd backend-assignment
```

2. Install dependencies (if you add server code later):
```bash
npm install
```

3. Create a `.env` file from `.env.example` and provide your secrets.

4. Run the server (if server code is added):
```bash
npm run dev
```

Expected output (when fully implemented):
```
✅ MongoDB connected
🚀 Server running on port 5000
```

---

## 📘 API Documentation (Thunder Client)
Import the Thunder Client collection found in:
```
./docs/thunder-collection-backend-assignment.json
```
**Important:** This project uses **Thunder Client** (VS Code extension) for API testing and documentation. Postman/Swagger were not used.

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints Overview
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST   | /auth/register | Register a new user | ❌ |
| POST   | /auth/login    | Login and get JWT token | ❌ |
| POST   | /tasks         | Create a new task | ✅ |
| GET    | /tasks         | Get all tasks for logged-in user | ✅ |
| PUT    | /tasks/:id     | Update a task | ✅ |
| DELETE | /tasks/:id     | Delete a task | ✅ |
| GET    | /tasks/admin/all | Admin-only: Get all users’ tasks | ✅ (admin only) |

---

## 🧪 Example API Workflows (short)
**Register:**
`POST /api/v1/auth/register`
```json
{ "name": "Swapnil", "email": "swapnil@example.com", "password": "123456" }
```

**Login:**
`POST /api/v1/auth/login`
```json
{ "email": "swapnil@example.com", "password": "123456" }
```

**Use the returned token in an Authorization header for protected routes:**
```
Authorization: Bearer <token>
```

---

## 🔒 Security & Notes
- Do not commit `.env` to source control (example provided: `.env.example`).
- The Thunder Client collection file is a placeholder — please replace it with your exported collection file if needed.
- Author: Swapnil Sable
- Email: swapnilsable704@gmail.com
