```
# 🚀 Full-Stack Portfolio Management System  
### A Dynamic Portfolio + Admin Dashboard built using the MERN Stack

A complete content-management platform where an admin can manage projects, clients, contacts, and newsletter subscribers — and changes instantly reflect on the public landing page.

> 🔥 Built for **Flipr Task | Full-Stack Placement Drive**

---

## 🌍 Live Demo(Landing Page):  
👉 https://full-stack-app-mocha-nu.vercel.app/

---

## 🛠 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## ✨ Features

### Public Website
✔ Modern Hero Section  
✔ Dynamic Projects Showcase  
✔ Testimonials Carousel  
✔ Functional Contact Form  
✔ Newsletter Subscription  
✔ Fully responsive UI  
✔ Elegant Tailwind styling  

### Admin Dashboard
✔ Add / View / Delete Projects  
✔ Add / View / Delete Clients  
✔ View Contact Leads  
✔ Manage Subscriber List  
✔ Mobile-friendly navigation  
✔ Live API integration  

---

## 📡 REST API Endpoints

| Feature | Method | Endpoint | Use |
|--------|--------|----------|-----|
| Projects | GET | `/api/projects` | Fetch all projects |
| Projects (Admin) | POST | `/api/admin/projects` | Add project |
| Projects (Admin) | DELETE | `/api/admin/projects/:id` | Delete project |
| Clients | GET | `/api/clients` | Fetch client testimonials |
| Clients (Admin) | POST | `/api/admin/clients` | Add client |
| Contact | POST | `/api/contact` | Submit form inquiry |
| Contacts (Admin) | GET | `/api/admin/contacts` | View leads |
| Subscribers | POST | `/api/subscribers` | Subscribe newsletter |
| Subscribers (Admin) | GET | `/api/admin/subscribers` | View subscribers |

> 🗂 Models: Project, Client, Contact, Subscriber (all stored in MongoDB)

---

## 📂 Project Structure

```

FliperTask/
├─ backend/         # Express + MongoDB API
│   ├─ src/
│   │   ├─ models/
│   │   ├─ routes/
│   │   ├─ controllers/
│   │   └─ server.js
│   └─ package.json
│
└─ frontend/        # React + Vite + Tailwind
├─ src/
│   ├─ pages/
│   ├─ components/
│   ├─ api/
│   └─ App.jsx
└─ package.json

````

---

## ⚙️ Run Locally

### Clone the repo

```bash
git clone https://github.com/Divyanshu9329/FullStack.git
cd FullStack
````

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
MONGODB_URI=your-mongodb-atlas-connection
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Visit:
👉 https://full-stack-app-mocha-nu.vercel.app/

---

## 🚀 Deployment Strategy

| App      | Service | Status |
| -------- | ------- | ------ |
| Backend  | Render  | Live   |
| Frontend | Vercel  | Live   |

Vercel rewrites for SPA routing:

```json
{
  "rewrites": [
    { "source": "/admin/:path*", "destination": "/index.html" },
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```


## 🤝 Contact

👤 **Divyanshu Pandey**
📧 Email: *divyanshupandey9329@gmail.com*
📌 GitHub: [https://github.com/Divyanshu9329/FullStack-app](https://github.com/Divyanshu9329](https://github.com/Divyanshu9329/FullStack-app))

---

### ⭐ If you like this project, please star the repo!

```
Made with ❤️ using the MERN Stack
```

---

```
