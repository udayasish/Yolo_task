Here’s a well-structured `README.md` file for your project. It includes instructions for setting up and running both the frontend (Next.js) and backend (NestJS) separately.

---

# YOLO Task - Fullstack Application

This is a fullstack application built with **Next.js (React + TypeScript)** for the frontend and **NestJS** for the backend. The application includes user authentication, profile management, and input validations using **Zod** on the backend.

## Features
- **Frontend:**
  - Signup Page with form validation.
  - Login Page with authentication.
  - Edit Profile Page for updating user details.
  - Header with logout functionality.
- **Backend:**
  - REST API for user authentication and profile management.
  - MongoDB database with Mongoose ORM.
  - JWT-based authentication.
  - Input validations using Zod.

---

## Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

---

## Setup and Run Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/udayasish/Yolo_task.git
cd Yolo_task
```

---

### 2. Backend Setup (NestJS)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env


    ACCESS_TOKEN_SECRET=715ad597168a8cd765f86773d2aabdbee9936029d8a96aa76b9ee773deeb1357

    ACCESS_TOKEN_EXPIRY=1d

    REFRESH_TOKEN_SECRET=f25d8f238616af8b545a59c23333d66328bdd096ab9390ca4adfb1e65a14913d

    REFRESH_TOKEN_EXPIRY=10d
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3000`.

---

### 3. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3001`.

---

## Running the Application

1. Open your browser and navigate to `http://localhost:3001`.
2. Use the **Signup** page to create a new account.
3. Log in using the **Login** page.
4. Access the **Edit Profile** page to update your details.
5. Use the **Logout** button in the header to log out.

---

## Project Structure

### Frontend (Next.js)
- **`/src/app`**: Contains all the pages and components.
  - `login/page.tsx`: Login page.
  - `signup/page.tsx`: Signup page.
  - `edit-profile/page.tsx`: Edit profile page.
- **`/src/components`**: Reusable UI components.
- **`/src/store`**: Redux store and slices for state management.

### Backend (NestJS)
- **`/src/auth`**: Authentication module (signup, login, logout).
- **`/src/user`**: User profile management module.
- **`/src/shared`**: Shared utilities and validations (Zod schemas).
- **`/src/database`**: MongoDB connection and models.

---


## Live Demo

- **Frontend:** [Vercel Link]([https://yolo-task-vsei.vercel.app/)
- **Backend:** [Render/Heroku Link](https://yolo-task.onrender.com/)

---

## Notes

- Input validations are implemented on the backend using **Zod**.
- Due to time constraints, frontend validations were not fully integrated.
- The project was completed in a single day, so some features may be limited.

---

Feel free to reach out if you have any questions or feedback!  

**Happy Coding!** 🚀
