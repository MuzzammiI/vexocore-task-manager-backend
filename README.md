# Task Manager Backend 🚀

This repository contains the backend for the Task Manager application, built with **Node.js**, **Express**, and **MongoDB**. It provides a robust REST API for user authentication and complete task management.

---

## ✨ Features

-   ✅ **User Authentication**: Secure user signup and login using JSON Web Tokens (JWT).
-   ✅ **Task Management**: Full CRUD (Create, Read, Update, Delete) operations for tasks.
-   ✅ **Status Toggling**: Easily toggle the completion status of any task.
-   ✅ **Cloud Database**: Utilizes MongoDB Atlas for reliable and scalable data storage.
-   ✅ **Live Deployment**: Hosted on Render for continuous and accessible service.

---

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: JSON Web Tokens (JWT), bcrypt.js
-   **Deployment**: Render

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
-   A [Render](https://render.com/) account (for deployment)
-   A [GitHub](https://github.com/) account

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/MuzzammiI/vexocore-task-manager-backend.git](https://github.com/MuzzammiI/vexocore-task-manager-backend.git)
    cd vexocore-task-manager-backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**

    Create a `.env` file in the root directory and add the following variables. You can use the `.env.example` file as a template.

    ```dotenv
    # MongoDB Connection String
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority

    # JWT Secret for token signing
    JWT_SECRET=your_super_secret_jwt_key

    # Port for the local server
    PORT=5000
    ```
    ** For Production level [important]
    NODE_ENV=production

    -   Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials.
    -   For Render deployment, ensure your MongoDB Atlas cluster allows connections from all IP addresses (`0.0.0.0/0`).

---

## 💻 Running Locally

To start the development server, run the following command:

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

You can test the API endpoints using a tool like Postman or a `curl` command. For example, to sign up a new user:

```bash
curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com", "password":"password123"}'
```

---

## ☁️ Deployment on Render

This project is configured for easy deployment on Render.

1.  **Push to GitHub**

    Commit your changes and push them to your GitHub repository.
    ```bash
    git add .
    git commit -m "Prepare for deployment"
    git push origin main
    ```

2.  **Create a Web Service on Render**

    -   Sign in to your [Render Dashboard](https://dashboard.render.com/).
    -   Click **New > Web Service**.
    -   Connect your GitHub account and select the `vexocore-task-manager-backend` repository.
    -   Configure the service with the following settings:
        -   **Name**: `vexocore-task-manager-backend` (or your preference)
        -   **Environment**: `Node`
        -   **Region**: Choose the one closest to you.
        -   **Branch**: `main`
        -   **Build Command**: `npm install`
        -   **Start Command**: `npm start`

3.  **Add Environment Variables**

    In the "Environment" section, add the `MONGO_URI` and `JWT_SECRET` from your `.env` file. **Do not add the PORT variable**, as Render will assign it automatically.

4.  **Create Service**

    -   Select the **Free** plan.
    -   Click **Create Web Service**. Render will automatically build and deploy your application.

5.  **Verify Deployment**

    Once the deployment is complete, Render will provide a public URL (e.g., `https://task-manager-backend.onrender.com`). Test it with `curl`:
    ```bash
    curl -X POST [https://your-app-name.onrender.com/api/auth/signup](https://your-app-name.onrender.com/api/auth/signup) \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com", "password":"password123"}'
    ```

---

## 🔧 Troubleshooting

-   **MongoDB Connection Issues**: Double-check your `MONGO_URI` in the Render environment variables. Ensure your MongoDB Atlas IP Access List is set to `0.0.0.0/0` to allow connections from Render's servers.

-   **CORS Issues**: The `server.js` file is configured to allow requests from specific frontend URLs. If your frontend is hosted elsewhere, add its URL to the `cors` options:
    ```javascript
    app.use(cors({
      origin: ['http://localhost:5173', '[https://your-frontend-url.com](https://your-frontend-url.com)'],
      credentials: true,
    }));
    ```
    Remember to redeploy after making changes.

-   **API Request Errors**: Use Postman or `curl` to test your deployed endpoints directly. This helps isolate whether the issue is in the frontend or backend. Ensure the frontend is using the correct base URL for API requests (e.g., `https://task-manager-backend.onrender.com/api`).

---

## 📝 API Endpoints

All task-related endpoints require a valid JWT to be sent in the `Authorization` header as a `Bearer` token.

| Method  | Endpoint                | Description                  | Protected |
| :------ | :---------------------- | :--------------------------- | :-------- |
| `POST`  | `/api/auth/signup`      | Register a new user          | No        |
| `POST`  | `/api/auth/login`       | Log in an existing user      | No        |
| `GET`   | `/api/tasks`            | Get all tasks for user       | **Yes** |
| `POST`  | `/api/tasks`            | Create a new task            | **Yes** |
| `PUT`   | `/api/tasks/:id`        | Update an existing task      | **Yes** |
| `DELETE`| `/api/tasks/:id`        | Delete a task                | **Yes** |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle a task's status       | **Yes** |

---