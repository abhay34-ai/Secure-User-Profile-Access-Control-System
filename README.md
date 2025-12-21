
# Secure User Profile Access Control & Transaction Audit System

##  Project Overview

This project is a **merged implementation of Assignment 1 and Assignment 2**, built as a secure full-stack MERN application.

The system provides:
- Secure authentication and user profile management
- Aadhaar number encryption and decryption
- Peer-to-peer fund transfer system
- Transaction audit logs and history
- Unified frontend dashboard

Both assignments are **fully completed, integrated, and functional** in a single application.

---

##  Assignments Covered

###  Assignment 1: Secure User Profile & Access Control
- User registration and login using JWT
- Aadhaar number encrypted before database storage
- Decryption of Aadhaar only for authenticated profile access
- Protected routes using authentication middleware

###  Assignment 2: Real-time Transaction & Audit Log System
- Fund transfer between users
- Atomic debit and credit transaction handling
- Transaction audit logging
- Transaction history view for users

---

##  Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- AES Encryption (crypto)

### Frontend
- React.js
- Axios
- Custom CSS

---

##  Folder Structure

### Backend Structure
```

backend/
│
├── config/
│   ├── db.js            # MongoDB connection
│   └── token.js         # JWT token utility
│
├── controllers/
│   ├── authController.js
│   ├── profileController.js
│   └── transactionController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Transaction.js
│   └── AuditLog.js
│
├── routes/
│   ├── authRoutes.js
│   ├── profileRoutes.js
│   └── transactionRoutes.js
│
├── utils/
│   └── encrypt.js       # Aadhaar encryption & decryption
│
├── .env
└── server.js

```

---

### Frontend Structure
```

frontend/
│
├── src/
│   ├── assets/
│
│   ├── components/
│   │   ├── Styles/
│   │   │   ├── Loader.css
│   │   │   └── Navbar.css
│   │   ├── Loader.jsx
│   │   └── Navbar.jsx
│
│   ├── context/
│   │   └── Authcontext.jsx
│
│   ├── pages/
│   │   ├── styles/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Transfer.jsx
│   │   └── History.jsx
│
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore

````

---

##  Security Implementation

- Passwords are hashed before storage
- Aadhaar number encrypted using AES before saving to database
- Aadhaar decrypted only for authenticated users
- JWT authentication with protected routes
- Token validation using middleware

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Profile
- `GET /api/profile` (Protected)

### Transactions
- `POST /api/transaction/transfer`
- `GET /api/transaction/history`

---

## 🖥️ Frontend Features

- Login & Registration pages
- Secure profile dashboard
- Fund transfer form
- Transaction history table
- Loader and Navbar components
- Responsive UI

---

##  AI Tool Usage Log (MANDATORY)

AI tools (ChatGPT) were used for:
- Designing JWT authentication flow
- Creating Aadhaar encryption/decryption utility
- Structuring transaction and audit log logic
- Backend controller and middleware logic
- Frontend UI component structure and styling
- Debugging and error handling improvements

*

AI tools significantly improved development speed and reduced boilerplate work, while final integration and debugging were done manually.

---

##  How to Run the Project

backend

cd backend
npm install
npm run dev


frontend

cd frontend
npm install
npm run dev



