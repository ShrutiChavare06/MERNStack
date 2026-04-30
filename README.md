🎂 Cake Shop Authentication System
This is a simple full-stack MERN project for a Cake Shop. It includes user registration, login, and dashboard based on user roles (User/Admin).
________________________________________
📌 About Project
This project is created to manage authentication for a cake shop system. Users can create an account, log in, and access their dashboard. Admin users can also log in and manage the system.
________________________________________
🚀 Features
•	User Registration (Sign Up) 
•	User Login (Sign In) 
•	JWT Authentication 
•	Role-based Dashboard (User & Admin) 
•	Protected Routes 
•	Password Hashing using bcrypt 
•	Basic Form Validation 
•	Responsive UI 
________________________________________
🛠 Technologies Used
Frontend:
•	React.js 
•	Bootstrap 
•	Axios 
Backend:
•	Node.js 
•	Express.js 
Database:
•	MongoDB 
Authentication:
•	JWT (jsonwebtoken) 
•	bcryptjs 
________________________________________
📁 Project Structure
CakeShopSystems/
│
├── backend/        # Server side code
├── frontend/       # React frontend
└── README.md
________________________________________
⚙️ How to Run the Project
1. Install Dependencies
Backend:
cd backend
npm install
Frontend:
cd frontend
npm install
________________________________________
2. Setup Environment Variables
Create a .env file in backend folder:
MONGO_URI=mongodb://localhost:27017/cakeshop
JWT_SECRET=your_secret_key
PORT=5000
________________________________________
3. Run the Project
Start Backend:
cd backend
npm run dev
Start Frontend:
cd frontend
npm start
________________________________________
🌐 API Routes
•	POST /api/auth/register → Register user 
•	POST /api/auth/login → Login user 
•	GET /api/auth/me → Get user data 
________________________________________
🔐 User Roles
•	User → Normal customer 
•	Admin → Manage system 
________________________________________
📌 Notes
•	Make sure MongoDB is running 
•	Use strong JWT secret in production 
•	You can create users from Sign Up page 
________________________________________
✨ Conclusion
This project demonstrates basic authentication in MERN stack with role-based access. It can be extended further by adding features like product management, orders, and payments.

