# Shortest Path for Nearby Blood Bank Application

This project is a **Blood Bank Management System** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** along with **AWS SNS** for real-time notifications. The application allows users to request blood, blood banks to manage requests, and notifications to be sent to relevant parties via AWS SNS.

## Folder Structure

The project is divided into two main parts: **Frontend** and **Backend**.

### Frontend (React)
```
/frontend
│
├── /public                 # Static assets (e.g., index.html, favicon.ico)
├── /src                    # Main source code for React application
│   ├── /components         # Reusable UI components
│   ├── /pages              # Page components (Home, Login, Admin, etc.)
│   ├── /assets             # Static assets (images, icons, etc.)
│   ├── /services           # API services to interact with the backend
│   ├── /styles             # Tailwind CSS or other styles
│   ├── App.js              # Main app component
│   └── index.js            # Entry point for the React app
│
├── package.json            # Frontend dependencies and scripts
└── .env                    # Environment variables (API URLs, etc.)
```

### Backend (Node.js + Express)
```
/backend
│
├── /controllers            # Handle business logic for API routes
├── /models                 # MongoDB models (User, BloodRequest, etc.)
├── /routes                 # API route definitions
├── /config                 # Configuration files (e.g., AWS credentials, MongoDB URI)
├── /middleware             # Middleware (e.g., JWT authentication)
├── /utils                  # Utility functions (e.g., AWS SNS logic)
├── server.js               # Main entry point for the Express server
└── .env                    # Environment variables (DB URI, AWS credentials)
```

## Features

- **User Registration & Login**: Users can register and login with JWT-based authentication.
- **Blood Request**: Users can request blood and view nearby blood banks based on their location.
- **Admin Dashboard**: Admins can view and manage blood requests.
- **Notifications**: Users and admins receive notifications for blood requests using AWS SNS.
- **Geolocation**: Find nearby blood banks based on the user's current location.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
- **AWS**: Amazon SNS (Simple Notification Service)
- **Database**: MongoDB (NoSQL database)

## Setup and Installation

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/OletiSatish/Shortest_Path_for_Nearby_BloodBank_Application.git
cd blood-bank-management
```

### 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following (replace the values accordingly):
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the React development server:
   ```bash
   npm start
   ```
   The front end should now run at [http://localhost:3000](http://localhost:3000).

### 3. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd ../backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following (replace the values accordingly):
   ```
   MONGO_URI=mongodb://localhost:27017/blood_bank
   JWT_SECRET=your_jwt_secret_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   SNS_TOPIC_ARN=your_sns_topic_arn
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend server will now run at [http://localhost:8000](http://localhost:8000).

### 4. Deployment (Optional)

- **Frontend**: You can deploy the frontend using **Vercel** or **Netlify**.
- **Backend**: You can deploy the backend using **Heroku**, **AWS EC2**, or **Render**.

#### AWS Deployment Notes

- Ensure your **AWS credentials** are correctly configured in both the **Frontend** and **Backend**.
- The backend utilizes **AWS SNS** for notifications, so make sure you have created an SNS topic and subscribed endpoints (e.g., email, SMS) for notifications.

## API Endpoints

Here are some of the key API endpoints in the project:

### User Endpoints
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user and return a JWT token.
  
### Blood Request Endpoints
- **POST /api/blood-requests**: Create a new blood request.
- **GET /api/blood-requests**: Fetch all blood requests (for admins).
- **GET /api/blood-requests/:id**: Get details of a specific blood request.

### Admin Endpoints
- **GET /api/admin/blood-requests**: View all blood requests in the system.
- **PUT /api/admin/blood-requests/:id**: Update blood request status.

## Environment Variables

- **REACT_APP_API_URL**: URL of the backend API (e.g., `http://localhost:5000/api`).
- **MONGO_URI**: MongoDB URI for the database connection.
- **JWT_SECRET**: Secret key for JWT authentication.
- **AWS_ACCESS_KEY_ID**: AWS access key for SNS.
- **AWS_SECRET_ACCESS_KEY**: AWS secret key for SNS.
- **AWS_REGION**: AWS region for SNS.
- **SNS_TOPIC_ARN**: Amazon SNS Topic ARN for notifications.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **AWS SNS** for push notifications.
- **MongoDB** for the database.
- **React.js** for building the user interface.
- **Node.js** and **Express.js** for the backend development.

---

This **README.md** provides a comprehensive guide to setting up, using, and understanding your **Blood Bank Management System** project. Be sure to replace placeholders like `your-username` with your actual GitHub username, and add any other dependencies or configurations specific to your project.
