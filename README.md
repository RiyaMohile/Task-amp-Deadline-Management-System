# 🗂️ Task Management System (Admin & Intern)

A full-stack **Task Management System** built using the **MERN stack**, designed for managing projects and tasks between **Admins** and **Interns**.  
Admins can create projects, assign tasks, and track progress, while interns can view and update their assigned tasks through a clean dashboard.

---

## 🚀 Project Overview

This application provides a structured workflow for managing tasks in an organization:

### 👩‍💼 Admin Features
- Secure admin login
- Create, update, and delete **Projects**
- Create, assign, edit, and delete **Tasks**
- Assign tasks to interns
- Set task priority and deadlines
- View all tasks with status
- Responsive admin dashboard

### 👨‍🎓 Intern Features
- Secure intern login
- View assigned tasks
- Update task status (Pending, In Progress, Completed)
- Task calendar view (deadline based)
- Color-coded task indicators
- Responsive intern dashboard

---

## 🛠️ Tech Stack Used

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- Chart.js (for task status visualization)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### Tools & Utilities
- VS Code
- Postman
- Git & GitHub

## 📁 Project Structure

TASK/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── .env
│
└── README.md