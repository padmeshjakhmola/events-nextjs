🎉 Connectify Events
Connectify Events is a modern, full-stack event management platform where users can create, manage, and join events effortlessly. With a personalized dashboard, users can track their own events, manage invitations, and control participation. Built for performance and scalability using cutting-edge technologies like Next.js, Node.js, JWT, and PostgreSQL.

🚀 Features
✅ User Authentication (JWT-based)

🎫 Create & Join Events

📅 Personalized Event Dashboard

❌ Cancel Invitations

📊 Scalable Architecture with Dockerized Backend

🛠 Tech Stack
Technology Purpose
Next.js Frontend framework
Node.js Backend API server
PostgreSQL Relational database
JWT Authentication
Vercel Frontend deployment
Cloud Run Backend deployment (Docker)
Docker Containerized backend

📸 Screenshots
Add your screenshots here to showcase the UI and features

🔧 Installation
🖥 Frontend (Next.js)
bash
Copy
Edit
git clone https://github.com/your-username/connectify-events.git
cd connectify-events/frontend
npm install
npm run dev
🛠 Backend (Node.js with Docker)
bash
Copy
Edit
cd ../backend
docker build -t connectify-backend .
docker run -p 5000:5000 connectify-backend
Or deploy directly to Cloud Run using the Dockerfile.

🔑 Environment Variables
Frontend (.env.local)
ini
Copy
Edit
NEXT_PUBLIC_API_URL=https://your-backend-url
Backend (.env)
ini
Copy
Edit
PORT=5000
DATABASE_URL=your_postgresql_connection_url
JWT_SECRET=your_secret_key
🌐 Deployment
Frontend is deployed on Vercel

Backend is deployed on Google Cloud Run (Dockerized container)

Database is hosted using PostgreSQL

🤝 Contributing
Contributions, issues and feature requests are welcome!

Fork the repository

Create your feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m 'Add your feature'

Push to the branch: git push origin feature/your-feature

Open a pull request

📩 Contact
Made with ❤️ by Padmesh Jakhmola

📬 Email: padmeshjakhmola@gmail.com
🔗 LinkedIn
