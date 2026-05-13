# SmartCampus ERP

A comprehensive Enterprise Resource Planning (ERP) system for colleges built with the MERN stack.

## Features

### Core Modules
- **Authentication & Roles**: Secure JWT-based authentication with role-based access control (Admin, Faculty, Student)
- **Student Management**: Complete student lifecycle management with profiles, courses, and academic records
- **Faculty Management**: Faculty profiles, subject assignments, and leave management
- **Attendance System**: Automated attendance tracking with low-attendance alerts
- **Examination Module**: Exam scheduling, marks management, and result generation
- **Fees Management**: Fee collection tracking, payment history, and receipt generation
- **Notice Board**: Real-time announcements and notifications
- **Timetable Module**: Dynamic class and faculty scheduling
- **Library Management**: Book issuing, returns, and fine calculation
- **Dashboard Analytics**: Comprehensive analytics with charts and statistics

### Advanced Features
- Modern responsive UI with Tailwind CSS
- Dark mode support
- PDF generation for reports and receipts
- Excel export functionality
- Real-time notifications
- AI chatbot integration (optional)
- Mobile-responsive design

## Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Chart.js for analytics
- React Icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- PDFKit for PDF generation

### Deployment
- Vercel for frontend and backend
- MongoDB Atlas for database

## Project Structure

```
college-erp-system/
├── api/                    # Vercel serverless API
│   ├── models/            # MongoDB models
│   ├── middleware/        # Authentication middleware
│   ├── auth.js           # Authentication routes
│   ├── students.js       # Student management routes
│   ├── faculty.js        # Faculty management routes
│   ├── attendance.js     # Attendance routes
│   ├── exams.js          # Examination routes
│   ├── fees.js           # Fees management routes
│   ├── notices.js        # Notice board routes
│   ├── timetable.js      # Timetable routes
│   ├── library.js        # Library management routes
│   ├── index.js          # Main API handler
│   ├── package.json
│   └── .env.example
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Local development server (legacy)
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
├── vercel.json           # Vercel deployment configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smartcampus-erp.git
   cd smartcampus-erp
   ```

2. **API Setup**
   ```bash
   cd api
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm start
   ```

4. **Database**
   - Set up MongoDB Atlas or local MongoDB
   - Update the connection string in `api/.env`

### Environment Variables

Create a `.env` file in the `api` directory:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcampus-erp
CLIENT_URL=https://your-app-name.vercel.app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
# For production: REACT_APP_API_URL=https://your-app-name.vercel.app/api
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/update-profile` - Update user profile

### Student Management
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## Deployment

### Vercel Deployment

1. **Prerequisites**
   - Vercel account
   - MongoDB Atlas database
   - GitHub repository

2. **Environment Variables Setup**
   - In Vercel dashboard, go to your project settings
   - Add the following environment variables:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcampus-erp
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

3. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

4. **Alternative: GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration and deploy
   - Set environment variables in Vercel dashboard

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smartcampus-erp.git
   cd smartcampus-erp
   ```

2. **API Setup**
   ```bash
   cd api
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm start
   ```

4. **Database**
   - Set up MongoDB Atlas or local MongoDB
   - Update the connection string in `api/.env`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your-email@example.com

Project Link: [https://github.com/your-username/smartcampus-erp](https://github.com/your-username/smartcampus-erp)