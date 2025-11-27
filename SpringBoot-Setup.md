# Mini Logistics & Delivery Management Platform
## Backend Setup Guide (Spring Boot)

### Project Structure Overview
```
logistics-delivery-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/logistics/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       ├── security/
│   │   │       ├── exception/
│   │   │       └── LogisticsApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
└── pom.xml
```

### Prerequisites
- Java 11 or higher (JDK installed)
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Git

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd logistics-delivery-backend
```

#### 2. Database Setup

**Create MySQL Database:**
```sql
CREATE DATABASE logistics_db;
USE logistics_db;
```

**Create Tables:**
```sql
-- Users table for storing user information
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('ADMIN', 'BUSINESS_USER', 'DRIVER') NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Deliveries table for storing delivery orders
CREATE TABLE deliveries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    business_user_id BIGINT NOT NULL,
    driver_id BIGINT,
    pickup_address VARCHAR(500) NOT NULL,
    drop_address VARCHAR(500) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    notes VARCHAR(1000),
    status ENUM('PENDING', 'ACCEPTED', 'ON_WAY', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    estimated_km DECIMAL(10,2),
    estimated_cost DECIMAL(10,2),
    actual_km DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_user_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);

-- Status History table for tracking delivery status changes
CREATE TABLE status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    delivery_id BIGINT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by BIGINT NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (delivery_id) REFERENCES deliveries(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);
```

#### 3. Maven Dependencies
```xml
<!-- In pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
```

#### 4. Running the Application
```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run

# Application runs on http://localhost:8080
```

### Tech Stack
- **Framework**: Spring Boot 2.7.x
- **Database**: MySQL 8.0
- **Security**: Spring Security with JWT
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Language**: Java 11+

### Key Features Implemented
1. ✅ User Authentication with JWT
2. ✅ Role-based Access Control (Admin, Business User, Driver)
3. ✅ Delivery Order Management
4. ✅ Driver Assignment System
5. ✅ Status Tracking with History
6. ✅ REST API with validation
7. ✅ Exception Handling
8. ✅ CORS enabled for React frontend

### API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/deliveries` - Get deliveries (filtered by role)
- `POST /api/deliveries` - Create delivery
- `PUT /api/deliveries/{id}` - Update delivery
- `PUT /api/deliveries/{id}/status` - Update delivery status
- `GET /api/drivers` - Get all drivers

### Environment Variables
Create `application.properties` in `src/main/resources/`:
```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/logistics_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=your-secret-key-make-it-very-long-and-secure
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:3000

# Logging
logging.level.root=INFO
logging.level.com.logistics=DEBUG
```

### Troubleshooting
- **Port 8080 already in use**: Change `server.port` in application.properties
- **Database connection failed**: Verify MySQL is running and credentials are correct
- **CORS errors**: Ensure frontend URL is added to `cors.allowed-origins`

For more details, see the project README.md in the repository root.
