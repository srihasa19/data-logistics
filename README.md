# Mini Logistics & Delivery Management Platform
## Complete Full-Stack Application

A comprehensive full-stack application built with **Spring Boot** (Backend) and **React** (Frontend) for managing logistics and delivery operations.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Scalability & Future Improvements](#scalability--future-improvements)

---

## 🎯 Overview

This Mini Logistics & Delivery Management Platform is designed to streamline the process of managing delivery orders, driver assignments, and delivery tracking. The system supports three main user roles:

1. **Admin**: System administrator who manages the entire platform
2. **Business User**: Company/business that creates and tracks delivery orders
3. **Driver**: Delivery personnel who accept and update delivery statuses

---

## ✨ Features

### Authentication & Authorization
- User registration and login with email/password
- JWT-based authentication for secure API access
- Role-based access control (RBAC)
- Password encryption using BCrypt
- Secure token management with localStorage

### Delivery Management
- Create delivery orders with detailed information
- Assign drivers to deliveries (Admin only)
- Real-time status tracking (PENDING → ACCEPTED → ON_WAY → DELIVERED)
- Priority levels (LOW, MEDIUM, HIGH)
- Cost calculation based on weight and priority
- Delivery history tracking

### User Roles & Permissions
- **Admin**: Can view all deliveries and assign drivers
- **Business User**: Can create deliveries and track them
- **Driver**: Can accept deliveries and update status

### Responsive UI
- Mobile-friendly design using CSS Grid and Flexbox
- Modern card-based layout
- Real-time form validation
- User-friendly error messages
- Loading states and spinners

---

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 2.7.x
- **Language**: Java 11+
- **Database**: MySQL 8.0
- **Security**: Spring Security with JWT
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.2+
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with responsive design
- **State Management**: React Context API
- **Package Manager**: npm

### Tools
- **IDE**: IntelliJ IDEA / VS Code
- **Version Control**: Git/GitHub
- **Database Tool**: MySQL Workbench

---

## 📁 Project Structure

```
logistics-delivery-management/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/logistics/
│   │   │   │   ├── controller/        (API endpoints)
│   │   │   │   ├── service/           (Business logic)
│   │   │   │   ├── repository/        (Database access)
│   │   │   │   ├── entity/            (Database models)
│   │   │   │   ├── dto/               (Data transfer objects)
│   │   │   │   ├── security/          (JWT & authentication)
│   │   │   │   ├── exception/         (Exception handling)
│   │   │   │   ├── config/            (Spring configuration)
│   │   │   │   └── LogisticsApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminDashboard/
│   │   │   ├── BusinessUserDashboard/
│   │   │   └── DriverDashboard/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   └── .env
├── README.md
├── SETUP_GUIDE.md
└── DATABASE_SCHEMA.sql
```

---

## 💻 Installation

### Prerequisites

**Backend Requirements:**
- Java Development Kit (JDK) 11 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

**Frontend Requirements:**
- Node.js 14.0 or higher
- npm 6.0 or higher
- Git

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd logistics-delivery-management
```

#### 2. Backend Setup (Spring Boot)

```bash
cd backend

# Create MySQL database
mysql -u root -p
> CREATE DATABASE logistics_db;
> EXIT;

# Update application.properties
# File: src/main/resources/application.properties
# Change:
# - spring.datasource.url
# - spring.datasource.username
# - spring.datasource.password
# - jwt.secret

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
# Server runs on http://localhost:8080
```

#### 3. Frontend Setup (React)

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_TIMEOUT=10000
EOF

# Start development server
npm start
# App runs on http://localhost:3000
```

---

## 🚀 Running the Application

### Starting Both Servers (Terminal 1 & 2)

**Terminal 1 - Backend (Spring Boot):**
```bash
cd backend
mvn spring-boot:run
# Output: Started LogisticsApplication in X seconds
```

**Terminal 2 - Frontend (React):**
```bash
cd frontend
npm start
# Browser opens at http://localhost:3000
```

### Verifying Installation

1. **Check Backend**: http://localhost:8080/api/auth/login
2. **Check Frontend**: http://localhost:3000
3. **Login with demo credentials** (see demo section below)

---

## 📱 Demo Credentials

### Demo Users (Create these first)

1. **Admin Account**
   - Email: `admin@test.com`
   - Password: `admin123`
   - Role: `ADMIN`

2. **Business User Account**
   - Email: `business@test.com`
   - Password: `business123`
   - Role: `BUSINESS_USER`

3. **Driver Account**
   - Email: `driver@test.com`
   - Password: `driver123`
   - Role: `DRIVER`

### Demo Workflow

1. **Admin Portal**
   - Login as admin
   - View all pending deliveries
   - Click "Assign" button
   - Select driver and confirm

2. **Business Portal**
   - Login as business user
   - Click "+ Create New Delivery"
   - Fill in delivery details
   - View created deliveries and track status

3. **Driver Portal**
   - Login as driver
   - View assigned deliveries
   - Click "Accept" to accept delivery
   - Click "Update" to change status
   - Mark as delivered with actual KM and cost

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@test.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "9999999999",
  "role": "BUSINESS_USER"  // or DRIVER
}

Response: 201 Created
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "user@test.com",
    "fullName": "John Doe",
    "role": "BUSINESS_USER"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "user": {
    "id": 1,
    "email": "admin@test.com",
    "role": "ADMIN"
  }
}
```

### Delivery Endpoints

#### Create Delivery
```
POST /deliveries
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "pickupAddress": "Mumbai, India",
  "dropAddress": "Bangalore, India",
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "weight": 5.5,
  "priority": "HIGH",
  "notes": "Fragile items"
}

Response: 201 Created
{
  "id": 1,
  "status": "PENDING",
  "estimatedCost": 105.5,
  ...
}
```

#### Get All Deliveries
```
GET /deliveries
Authorization: Bearer {TOKEN}

Response: 200 OK
[
  {
    "id": 1,
    "customerName": "John Doe",
    "status": "DELIVERED",
    ...
  }
]
```

#### Assign Driver
```
PUT /deliveries/{id}/assign-driver/{driverId}
Authorization: Bearer {TOKEN}

Response: 200 OK
{
  "id": 1,
  "driver": {
    "id": 2,
    "fullName": "Driver Name"
  },
  "status": "PENDING"
}
```

#### Update Delivery Status
```
PUT /deliveries/{id}/status
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "newStatus": "DELIVERED",
  "actualKm": 45.5,
  "actualCost": 150.0
}

Response: 200 OK
{
  "id": 1,
  "status": "DELIVERED",
  "actualKm": 45.5,
  "actualCost": 150.0
}
```

### User Endpoints

#### Get All Drivers
```
GET /users/drivers
Authorization: Bearer {TOKEN}

Response: 200 OK
[
  {
    "id": 2,
    "email": "driver@test.com",
    "fullName": "Driver Name",
    "role": "DRIVER"
  }
]
```

---

## 🌐 Deployment

### Deploy Backend to Heroku

```bash
# 1. Create Procfile
echo "web: java -Dserver.port=\$PORT \$JAVA_OPTS -jar target/logistics-*.jar" > Procfile

# 2. Build application
mvn clean package -DskipTests

# 3. Initialize git and heroku
git init
heroku login
heroku create your-app-name

# 4. Add MySQL add-on
heroku addons:create cleardb:ignite

# 5. Set environment variables
heroku config:set JWT_SECRET=your-secure-secret-key
heroku config:set CORS_ALLOWED_ORIGINS=https://your-frontend-url.com

# 6. Deploy
git add .
git commit -m "Initial commit"
git push heroku main
```

### Deploy Frontend to Vercel

```bash
# 1. Build React application
npm run build

# 2. Install Vercel CLI
npm install -g vercel

# 3. Login to Vercel
vercel login

# 4. Deploy
vercel --prod

# 5. Update environment variable in Vercel dashboard
# REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

### Deploy Frontend to Netlify

```bash
# 1. Build React application
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=build
```

---

## 📊 Scalability & Future Improvements

### Current Limitations
- Single-server backend (no load balancing)
- No real-time updates (polling only)
- In-memory authentication state
- No caching layer

### Scalability Plan for 100k Users

#### Infrastructure
- **Horizontal Scaling**
  - Multiple Spring Boot instances behind AWS Load Balancer
  - Read replicas for MySQL database
  - Redis cache for session management
  - CDN for static assets

#### Database Optimization
- Connection pooling (HikariCP)
- Database indexing on frequently queried fields
- Query optimization and caching
- Database sharding for very large datasets

#### API Improvements
- Implement pagination for list endpoints
- Add request rate limiting
- API versioning (v1, v2)
- Response compression (GZIP)

#### Caching Strategy
- Redis for user session caching
- HTTP caching headers
- Frontend component-level caching

#### Monitoring & Analytics
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- User analytics
- Database performance monitoring

### Features for 2 More Weeks

#### Week 1: Real-time Features
1. **WebSocket Integration**
   - Real-time delivery status updates
   - Live driver location tracking
   - Instant notifications

2. **Payment Gateway**
   - Stripe/Razorpay integration
   - Automated invoicing
   - Payment history

3. **Advanced Analytics**
   - Delivery metrics dashboard
   - Driver performance statistics
   - Revenue analytics

#### Week 2: Enhancement & Polish
1. **Mobile App**
   - React Native for iOS/Android
   - Offline functionality
   - Push notifications

2. **Additional Features**
   - Delivery route optimization
   - SMS/Email notifications
   - Customer feedback system
   - Advanced search and filters

3. **Performance & Security**
   - API rate limiting
   - Two-factor authentication
   - Data encryption at rest
   - GDPR compliance

---

## 🔒 Security Best Practices

### Implemented
- ✅ Password encryption with BCrypt
- ✅ JWT token-based authentication
- ✅ CORS configuration
- ✅ Input validation
- ✅ SQL injection prevention (JPA)
- ✅ Role-based access control

### Recommended for Production
- 🔐 Enable HTTPS/TLS
- 🔐 Implement API rate limiting
- 🔐 Use environment variables for secrets
- 🔐 Add request signing
- 🔐 Implement 2FA
- 🔐 Regular security audits
- 🔐 DDoS protection

---

## 📝 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('ADMIN', 'BUSINESS_USER', 'DRIVER'),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Deliveries Table
```sql
CREATE TABLE deliveries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_user_id BIGINT NOT NULL,
    driver_id BIGINT,
    pickup_address VARCHAR(500),
    drop_address VARCHAR(500),
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    weight DECIMAL(10,2),
    priority ENUM('LOW', 'MEDIUM', 'HIGH'),
    status ENUM('PENDING', 'ACCEPTED', 'ON_WAY', 'DELIVERED', 'CANCELLED'),
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (business_user_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support

For issues and questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include screenshots/error logs
4. Provide steps to reproduce

---

## 🎓 Learning Resources

### Backend (Spring Boot)
- [Spring Boot Official Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Guide](https://spring.io/projects/spring-security)
- [JWT Authentication](https://jwt.io/)

### Frontend (React)
- [React Official Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

### General
- [REST API Best Practices](https://restfulapi.net/)
- [Database Design](https://www.oracle.com/database/what-is-database/)
- [Git Version Control](https://git-scm.com/)

---

**Created:** November 2024
**Last Updated:** November 25, 2024
**Version:** 1.0.0

This Mini Logistics & Delivery Management Platform is ready for deployment and can be extended with additional features as needed!
