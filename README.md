
# Secure User Profile Access Control & Transaction Audit System

## Project Overview

This project is a combined implementation of Assignment 1 (Secure User Profile & Access Control System) and Assignment 2 (Real-time Transaction & Audit Log System).

The application provides secure user authentication, encrypted identity management, and atomic peer-to-peer fund transfers. User authentication is implemented using JWT-based stateless authentication. Sensitive identity data such as Aadhaar/ID numbers are encrypted at rest using AES encryption and are decrypted only for authorized access.

The system also maintains a persistent and immutable transaction audit log to ensure data integrity, traceability, and accountability. The project follows a full-stack MERN architecture and includes documented AI-assisted development as required by the submission guidelines.

---

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- AES encryption

### Frontend
- React.js
- Axios
- CSS

### AI Tools
- ChatGPT

---

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or above)
- npm
- MongoDB (local or MongoDB Atlas)
- Git

---

### Clone the Repository

```bash
git clone https://github.com/abhay34-ai/Secure-User-Profile-Access-Control-System
cd Secure-User-Profile-Access-Control-System
````

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

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

Backend will run at:

```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## API Documentation

### Authentication and Profile

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | /api/auth/register | User registration                |
| POST   | /api/auth/login    | User login                       |
| GET    | /api/profile       | Fetch authenticated user profile |

### Transactions

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | /api/transfer             | Atomic fund transfer     |
| GET    | /api/transactions/history | User transaction history |

---

## Database Schema

### User Collection

* name
* email (unique)
* password (hashed)
* aadhaarEncrypted
* balance
* createdAt

### Transaction Collection

* senderId
* receiverId
* amount
* status (SUCCESS / FAILED)
* reason (if failed)
* timestamp

### Audit Log Collection

* transactionId
* senderId
* receiverId
* amount
* status (SUCCESS / FAILED)
* timestamp

---

## Backend Folder Structure

```text
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
```

---

## Frontend Folder Structure

```text
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
```

---

## Security Highlights

* JWT-based stateless authentication
* Password hashing using bcrypt
* AES encryption for sensitive identity data
* Protected routes using authentication middleware
* Atomic database transactions for fund transfers
* Immutable transaction audit logs

---



### AI-Assisted Tasks

* Generated JWT authentication middleware structure
* Assisted in AES encryption and decryption utilities
* Helped design token validation logic
* Generated backend controller and route boilerplate
* Assisted with database transaction logic
* Helped structure frontend components
* Assisted in structuring this README.md



## Author

Abhay Thakre
B.Tech Student
VJTI


