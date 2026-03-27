YouTube Clone (MERN Stack)

This is a full-stack YouTube Clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
The application allows users to watch videos, upload content, like/dislike videos, and interact through comments.

 Frontend (React)

Responsive YouTube-style UI
Header with search bar
Sidebar with toggle functionality
Video grid with thumbnails
Filter videos by category
Search videos by title

Authentication (JWT)
User Registration
User Login
Secure JWT-based authentication
Protected routes

Video Features

Watch videos (YouTube embed)
Like / Dislike functionality
View count increment
Dynamic thumbnails

Channel Features
Create Channel
View Channel Page
Upload Videos
Delete Videos

Comments
Add comments
View comments
Delete comments

Frontend:
React.js (Vite)
React Router DOM
Axios

Backend:
Node.js
Express.js

Database:
MongoDB (Mongoose)

Authentication:
JSON Web Tokens (JWT)

📁 Folder Structure
youtube-clone/
│
├── client/        # React Frontend
├── server/        # Node.js Backend
│
├── models/        # MongoDB Schemas
├── routes/        # API Routes
├── controllers/   # Logic
├── middleware/    # JWT Auth


cd youtube-clone
2️⃣ Backend Setup
cd server
npm install
npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm run dev

 Environment Variables

Create a .env file in the server folder:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=secretkey
 API Endpoints
Auth

POST /api/auth/register

POST /api/auth/login

Videos

GET /api/videos
GET /api/videos/:id
POST /api/videos
DELETE /api/videos/:id
POST /api/videos/:id/like
POST /api/videos/:id/dislike

Channel

POST /api/channel
GET /api/channel/:id

 Demo Features

Upload YouTube videos using embed links

Like / Dislike system
Channel-based video management
Search and filter functionality

 Responsiveness

Fully responsive design
Works on mobile, tablet, and desktop

GitHub Repository:
 

Demo Video: Test Credentials:
Email: test@gmail.com
Password: 123456
