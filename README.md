# 🚘 Carvilla Web App  

A web-based version of Carvilla, implemented in **React.js**, delivering a full-featured car management platform including authentication, card management, and a personalized feed—all powered by **Redux** and persistent storage.  

---

## ⚙️ Tech Stack  
- **React.js** – UI development  
- **React Router** – Routing system  
- **Redux Toolkit** – State management  
- **LocalStorage / SessionStorage** – Persistent data  
- **Formik + Yup** – Forms & validation  
- **Vite / CRA** – Development & build  

---

## 🚀 Features  

### 🧭 Navigation System  

**Auth Routes**  
- `/login` → Login for registered users  
- `/signup` → User registration  
- Access: Unauthorized users only  

**Protected Routes**  
- `/feed` → Global card feed (with filters & sorting)  
- `/profile` → Current user profile  
- `/profile/:userId` → View other users’ profiles  
- Access: Authorized users only  

**Redirection Logic**  
- Unauthorized access → `/login`  
- Authenticated access to `/login` or `/signup` → `/feed`  

---

### 👤 Authentication  
- Login and Signup with validation  
- “Remember Me” support via LocalStorage  
- Real-time error reset on input change  
- Auto-login from local storage if remembered  

---

### 📝 Cards Management  
- Create, edit, update, delete, search and view cards  
- Add/remove cards to/from favorites  
- Sort and filter cards (all vs. favorites, by date)  
- Current user’s cards are editable (highlighted background)  

---

### 🧑‍🤝‍🧑 User Sidebar  
- List all registered users (except current)  
- Navigate to other users’ profile pages  
- Message if no other users available  

---

### 🪄 UI Enhancements  
- Custom modal for creating cards  
- Scroll-to-top button in feed  
- Inline validation and error hints  
- Loader during initial data fetch  

---

## 📦 Local Data Structure  

### 👥 allUsers  
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "cardIds": ["string"],
    "favoriteIds": ["string"]
  }
]
