
## 📌 Project Overview

This project is a **combined implementation of Assignment 1 (Secure User Profile & Access Control System)** and **Assignment 2 (Real-time Transaction & Audit Log System)**.

The system provides **secure user authentication**, **encrypted identity management**, and **atomic peer-to-peer fund transfers**. User authentication is implemented using **JWT-based stateless authentication**, while sensitive identity data such as **Aadhaar/ID numbers are encrypted at rest using AES encryption** and decrypted only for authorized access.

In addition, the system maintains a **persistent transaction audit log**, allowing users to track transaction history and balance updates securely.

---

## ⚙️ Setup & Run Instructions

Follow the steps below to set up and run the project locally.

---

### 🔹 Prerequisites

Ensure the following are installed:

* Node.js (v18 or above)
* npm
* MongoDB (local or Atlas)
* React.js
* Git

---
 # backend folder structure

backend/
│
├── config/
│   ├── db.js
│   └── token.js
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
│   └── encrypt.js
│
├── .env
└── server.js

---

# frontend folder structure

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




### 🔹 Clone the Repository

```bash
git clone https://github.com/abhay34-ai/Secure-User-Profile-Access-Control-System
cd Secure-User-Profile-Access-Control-System
```

---

### 🔹 Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AES_SECRET=your_aes_secret
```

Start the backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 🔹 Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Documentation (Core Endpoints)

### Authentication & Profile

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/auth/register` | User registration                |
| POST   | `/api/auth/login`    | User login                       |
| GET    | `/api/profile`       | Fetch authenticated user profile |

---

### Transactions

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/api/transfer`             | Atomic fund transfer     |
| GET    | `/api/transactions/history` | User transaction history |

---

## 🗄️ Database Schema

### User Collection

* name
* email (unique)
* password (hashed)
* aadhaarEncrypted (AES encrypted)
* balance
* createdAt

### Transaction Collection

* senderId
* receiverId
* amount
* status (SUCCESS / FAILED)
* reason (if failed)
* timestamp

### AuditLog Model (MongoDB)

transactionId  
senderId 
receiverId
amount 
status (SUCCESS / FAILED)
timestamp 

---

## 🔐 Security Highlights

* JWT-based stateless authentication
* Password hashing using bcrypt
* AES encryption for sensitive identity data
* Protected routes with authentication middleware
* Atomic database transactions for fund transfers
* Immutable transaction audit logs

---


### 1️⃣ AI-Assisted Tasks

The following tasks were assisted using **AI-based development tools (ChatGPT)**:

* Generated JWT authentication middleware structure
* Assisted in AES encryption/decryption utility functions
* Helped design token validation logic
* Generated backend controller and route boilerplate
* Assisted with database transaction logic for fund transfers
* Helped structure the transaction history table UI
* Assisted in structuring this README.md as per submission guidelines

All AI-generated code was **reviewed, modified, and integrated manually**.

---


## 👨‍💻 Author

**Abhay Thakre**
B.Tech Student VJTI

---
