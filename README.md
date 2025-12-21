
## Secure User Profile Access Control & Transaction Audit System

# Project Overview

This project is a combined implementation of Assignment 1 (Secure User Profile & Access Control System) and Assignment 2 (Real-time Transaction & Audit Log System).

The system provides secure user authentication, encrypted identity management, and atomic peer-to-peer fund transfers. User authentication is implemented using JWT-based stateless authentication, while sensitive identity data such as Aadhaar/ID numbers are encrypted at rest using AES encryption and decrypted only for authorized access.


-------

# Setup & Run Instructions

Follow the steps below to set up and run the project locally.

🔹 Prerequisites
-Node.js (v18 or above)
-npm
-MongoDB 
-React js
-Git

---

🔹 Clone the Repository
-git clone <(https://github.com/abhay34-ai/Secure-User-Profile-Access-Control-System)>
-cd <repository-folder>

---

- Backend Setup
cd backend
npm install

Create a .env file inside the backend directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AES_SECRET=your_aes_secret

Start the backend server:
npm run dev


Backend runs on:

http://localhost:5000

🔹 Frontend Setup
cd frontend
npm install
npm run dev

---
Frontend runs on:

http://localhost:5173
-------------------------------------------



🔗 API Documentation (Core Endpoints)
Authentication & Profile
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/profile	Fetch authenticated user profile


Transactions
Method	Endpoint	Description
POST	/api/transfer	Atomic fund transfer
GET	/api/transactions/history	User transaction history


---------
🗄️ Database Schema

User Collection

name
email (unique)
password (hashed)
aadhaarEncrypted (AES encrypted)
balance
createdAt

Transaction 

senderId
receiverId
amount
status (SUCCESS / FAILED)
reason (if failed)
timestamp

----------------------------------------------
🔐 Security Highlights

JWT-based stateless authentication
Password hashing using bcrypt

AES encryption for sensitive identity data
Protected routes with authentication middleware
Atomic database transactions for fund transfers
Immutable audit logs


--------------------------------------


1️⃣ AI-Assisted Tasks

The following tasks were assisted using AI-based development tools (ChatGPT):
Generated JWT authentication middleware structure
Assisted in AES encryption/decryption utility functions
Helped design token validation logic
Generated backend controller and route boilerplate
Assisted with database transaction logic for fund transfers
Helped structure the transaction history table UI
Assisted in structuring this README.md as per guidelines
All AI-generated code was reviewed, modified, and integrated manually
