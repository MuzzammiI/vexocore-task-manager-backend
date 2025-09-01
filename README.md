Task Manager Backend
This is the backend for the Task Manager app, built with Node.js, Express, and MongoDB. It provides API endpoints for user authentication (JWT) and task management (CRUD operations, status toggling).
Features

User signup and login with JWT authentication.
Task creation, editing, deletion, and status toggling.
MongoDB Atlas for data storage.
Deployed on Render for free hosting.

Prerequisites

Node.js (v16 or higher)
MongoDB Atlas account
Render account (for deployment)
GitHub account

Setup

Clone the Repository (if not already done):
git clone https://github.com/MuzzammiI/vexocore-task-manager-backend.git
cd vexocore-task-manager-backend


Install Dependencies:
npm install


Configure Environment:Create a .env file in the backend directory based on .env.example:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/task-manager?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000 // only for testing purpose


Replace <username> and <password> with your MongoDB Atlas credentials.
Ensure MongoDB Atlas allows connections from 0.0.0.0/0 (all IPs) for Render.


Run Locally:
npm run dev

The server runs on http://localhost:5000. Test endpoints with curl or Postman:
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'



Deployment (Render)

Push to GitHub:
git add .
git commit -m "Initial backend commit"
git push origin main


Create a Web Service on Render:

Sign up at render.com.
In Render Dashboard, click New > Web Service.
Connect your GitHub repository (vexocore-task-manager-backend).
Configure:
Name: vexocore-task-manager-backend
Environment: Node
Region: Closest to you 
Branch: main
Root Directory: . (or backend if in a monorepo)
Build Command: npm install
Start Command: npm start


Add environment variables:
MONGO_URI: Your MongoDB Atlas connection string
JWT_SECRET: Your secret key
PORT: 5000 //testing purpose only


Select Free plan and click Create Web Service.


Verify Deployment:

Render builds and deploys (~2-5 minutes).
Note the URL (e.g., https://task-manager-backend.onrender.com).
Test the API:curl -X POST https://task-manager-backend.onrender.com/api/auth/signup -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'





Troubleshooting

MongoDB Connection Issues:

Verify MONGO_URI is correct and MongoDB Atlas allows connections from 0.0.0.0/0.
Test connection locally:npm run dev


Check terminal logs for MongoDB errors.


CORS Issues:

Ensure server.js allows the frontend URL:app.use(cors({
  origin: ['http://localhost:5173', 'https://task-manager-frontend.vercel.app'],
  credentials: true,
}));


Redeploy after updating CORS:git add .
git commit -m "Update CORS"
git push




API Request Errors:

Test endpoints directly with curl or Postman to isolate issues.
Ensure the frontend uses the correct VITE_API_URL (e.g., https://task-manager-backend.onrender.com/api).



Notes

Free tier limits: Render’s free tier (512 MB RAM, 0.1 CPU) sleeps after 15 minutes of inactivity, suitable for low-traffic apps (~300-400 users/month).
Use a strong JWT_SECRET for security.
Monitor Render logs in the dashboard for runtime errors.

API Endpoints

POST /api/auth/signup - Register user
POST /api/auth/login - Login user
GET /api/tasks - Get user tasks (JWT required)
POST /api/tasks - Create task (JWT required)
PUT /api/tasks/:id - Update task (JWT required)
DELETE /api/tasks/:id - Delete task (JWT required)
PATCH /api/tasks/:id/toggle - Toggle task status (JWT required)
