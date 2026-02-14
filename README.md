# QuickTask – Personal Task Management Application

## Project Overview
QuickTask is a full-stack task management application that allows users to efficiently manage daily tasks and view analytics about their productivity.  
It includes a **React frontend**, a **Node.js + Express backend**, a **MongoDB database**, and a **Python analytics service** for task statistics and insights.  

---

## Technology Stack
- **Frontend:** React.js (with Hooks, Axios)  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Analytics Service:** Python (Flask/FastAPI) with PyMongo  
- **Styling/UI:** Tailwind CSS / Bootstrap / Material-UI  
- **Charts/Visualization:** Chart.js or Recharts  

---

## Features

### User Authentication
- User registration and login  
- Secure JWT-based authentication  
- Protected routes for authenticated users only  
- Logout functionality  

### Task Management
- Create, read, update, delete tasks (CRUD)  
- Task fields: title, description, priority, status, due date  
- Filter tasks by status and priority  
- Search tasks by title  
- Sort tasks by due date, priority, or creation date  

### Dashboard & Analytics
- Total task count  
- Completed vs pending tasks  
- Task distribution by priority (charts)  
- Completion rate calculation  

### Python Analytics Service
- **User Statistics Endpoint:** Returns aggregate stats for a user  
- **Productivity Analysis Endpoint:** Returns task completion trends over time  

---

## Project Structure
│
├── frontend/ # React.js application
├── backend/ # Node.js + Express API
├── analytics/ # Python analytics service (Flask/FastAPI)
└── README.md


---

## Prerequisites
- Node.js >= 18.x  
- npm >= 9.x  
- Python >= 3.10  
- MongoDB (local or Atlas)  

---

## Installation & Setup

### Backend/backend
```bash
cd backend
npm install
cp .env.example .env   # configure your environment variables
npm start
```


### Frontend/frontend
```bash
cd frontend
npm install
npm start
```


### Python Analytics Service/
```bash
cd python_service
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python app.py
```

After starting backend, frontend, and Python service, open http://localhost:3000 in your browser to use the app.
