# Mini Logistics Platform - Complete Code Guide

## BACKEND STRUCTURE & CODE EXPLANATION

### 1. POM.XML - Project Dependencies File

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.14</version>
        <relativePath/>
    </parent>

    <groupId>com.logistics</groupId>
    <artifactId>delivery-management</artifactId>
    <version>1.0.0</version>
    <name>Logistics Delivery Management</name>
    <description>Mini Logistics and Delivery Management Platform</description>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA - Provides ORM mapping -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Database Driver -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>

        <!-- Spring Security - For authentication and authorization -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- JWT Library - For creating and validating JWT tokens -->
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

        <!-- Lombok - Reduces boilerplate code -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

**Explanation:**
- `<parent>`: Links to Spring Boot starter for automatic dependency management
- `spring-boot-starter-web`: Provides REST controller support
- `spring-boot-starter-data-jpa`: ORM for database operations
- `jjwt`: Handles JWT token creation and validation
- `spring-boot-starter-security`: Provides authentication mechanisms

---

### 2. APPLICATION.PROPERTIES - Configuration File

```properties
# ============================================
# SERVER CONFIGURATION
# ============================================
server.port=8080
spring.application.name=logistics-delivery-api

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Database connection string - replace with your MySQL URL
spring.datasource.url=jdbc:mysql://localhost:3306/logistics_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ============================================
# JPA/HIBERNATE CONFIGURATION
# ============================================
# DDL strategy: update means auto-create and update schema
spring.jpa.hibernate.ddl-auto=update
# Display SQL queries for debugging
spring.jpa.show-sql=true
# Format SQL queries for readability
spring.jpa.properties.hibernate.format_sql=true
# Use MySQL dialect
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# ============================================
# JWT CONFIGURATION
# ============================================
# Secret key for signing JWT tokens (make this very long and secure)
jwt.secret=logistics-delivery-platform-secret-key-make-it-very-long-and-secure-in-production-2024
# Token expiration time in milliseconds (24 hours = 86400000)
jwt.expiration=86400000

# ============================================
# CORS CONFIGURATION
# ============================================
# Allowed origins for CORS requests
cors.allowed-origins=http://localhost:3000,http://localhost:3001
# Allowed HTTP methods
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
# Allowed headers
cors.allowed-headers=*
# Allow credentials (cookies, authorization headers)
cors.allow-credentials=true

# ============================================
# LOGGING CONFIGURATION
# ============================================
# Root logging level
logging.level.root=INFO
# Application logging level
logging.level.com.logistics=DEBUG
# SQL logging level
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

**Explanation:**
- Database URL points to your MySQL instance
- DDL auto=update means tables are created/updated automatically
- JWT secret should be long and secure in production
- CORS allows React frontend on port 3000 to communicate with backend

---

### 3. ENTITY CLASSES - Database Models

#### User Entity (com/logistics/entity/User.java)

```java
package com.logistics.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

// @Entity tells Spring this is a database table
@Entity
@Table(name = "users")
// @Data generates getters, setters, toString, equals, hashCode
@Data
// @NoArgsConstructor generates constructor with no arguments
@NoArgsConstructor
// @AllArgsConstructor generates constructor with all fields
@AllArgsConstructor
public class User {
    
    // Primary key - auto-generated
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Email field - unique constraint, cannot be null
    @Column(unique = true, nullable = false)
    private String email;
    
    // Password field - hashed password stored
    @Column(nullable = false)
    private String password;
    
    // Full name of the user
    @Column(nullable = false)
    private String fullName;
    
    // Phone number
    @Column
    private String phoneNumber;
    
    // User role - ADMIN, BUSINESS_USER, or DRIVER
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    
    // Whether user account is active
    @Column(nullable = false)
    private Boolean isActive = true;
    
    // Timestamp when record was created
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Timestamp when record was last updated
    @Column
    private LocalDateTime updatedAt;
    
    // Automatically set createdAt and updatedAt timestamps
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

**Explanation:**
- `@Entity`: Marks this class as a JPA entity mapped to database table
- `@Id` & `@GeneratedValue`: Primary key with auto-increment
- `@Column`: Defines column constraints
- `@Enumerated`: Stores enum value in database
- `@PrePersist` & `@PreUpdate`: Automatically manage timestamps

#### UserRole Enum (com/logistics/entity/UserRole.java)

```java
package com.logistics.entity;

// Enum for different user roles in the system
public enum UserRole {
    ADMIN,           // System administrator
    BUSINESS_USER,   // Business/Company user who creates deliveries
    DRIVER           // Delivery driver
}
```

#### Delivery Entity (com/logistics/entity/Delivery.java)

```java
package com.logistics.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Foreign key to business user who created delivery
    @ManyToOne
    @JoinColumn(name = "business_user_id", nullable = false)
    private User businessUser;
    
    // Foreign key to driver assigned to this delivery
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
    
    // Pickup location address
    @Column(nullable = false, length = 500)
    private String pickupAddress;
    
    // Drop/Delivery location address
    @Column(nullable = false, length = 500)
    private String dropAddress;
    
    // Customer name
    @Column(nullable = false)
    private String customerName;
    
    // Customer contact number
    @Column(nullable = false)
    private String customerPhone;
    
    // Weight of delivery package
    @Column(nullable = false)
    private BigDecimal weight;
    
    // Priority level of delivery
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryPriority priority;
    
    // Additional notes
    @Column(length = 1000)
    private String notes;
    
    // Current status of delivery
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status = DeliveryStatus.PENDING;
    
    // Estimated distance in kilometers
    @Column
    private BigDecimal estimatedKm;
    
    // Estimated cost of delivery
    @Column
    private BigDecimal estimatedCost;
    
    // Actual distance traveled
    @Column
    private BigDecimal actualKm;
    
    // Actual cost charged
    @Column
    private BigDecimal actualCost;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        status = DeliveryStatus.PENDING;
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

#### DeliveryStatus Enum

```java
package com.logistics.entity;

public enum DeliveryStatus {
    PENDING,      // Order created, awaiting driver acceptance
    ACCEPTED,     // Driver accepted the delivery
    ON_WAY,       // Driver is on the way
    DELIVERED,    // Delivery completed
    CANCELLED     // Delivery cancelled
}
```

#### DeliveryPriority Enum

```java
package com.logistics.entity;

public enum DeliveryPriority {
    LOW,          // Low priority - standard delivery
    MEDIUM,       // Medium priority - faster delivery
    HIGH          // High priority - urgent delivery
}
```

#### StatusHistory Entity (com/logistics/entity/StatusHistory.java)

```java
package com.logistics.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.LocalDateTime;

// Tracks all status changes for audit trail
@Entity
@Table(name = "status_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Reference to delivery
    @ManyToOne
    @JoinColumn(name = "delivery_id", nullable = false)
    private Delivery delivery;
    
    // Previous status
    @Column
    private String oldStatus;
    
    // New status
    @Column(nullable = false)
    private String newStatus;
    
    // User who made the change
    @ManyToOne
    @JoinColumn(name = "changed_by", nullable = false)
    private User changedBy;
    
    // Timestamp of change
    @Column(nullable = false, updatable = false)
    private LocalDateTime changedAt;
    
    @PrePersist
    protected void onCreate() {
        changedAt = LocalDateTime.now();
    }
}
```

---

### 4. DTO CLASSES - Data Transfer Objects

#### AuthRequest DTO (com/logistics/dto/AuthRequest.java)

```java
package com.logistics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

// DTO for login/authentication requests
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    
    // Email - must be valid email format and not blank
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    // Password - must not be blank
    @NotBlank(message = "Password is required")
    private String password;
}
```

#### AuthResponse DTO (com/logistics/dto/AuthResponse.java)

```java
package com.logistics.dto;

import com.logistics.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO for login response containing JWT token and user info
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    private String message;
    private UserDto user;
    
    public AuthResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
        this.message = "Authentication successful";
    }
}
```

#### RegisterRequest DTO (com/logistics/dto/RegisterRequest.java)

```java
package com.logistics.dto;

import com.logistics.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

// DTO for user registration
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    // Password must be at least 6 characters
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    private String phoneNumber;
    
    @NotBlank(message = "Role is required")
    private String role; // "ADMIN", "BUSINESS_USER", "DRIVER"
}
```

#### UserDto (com/logistics/dto/UserDto.java)

```java
package com.logistics.dto;

import com.logistics.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

// DTO for user information (without sensitive data like password)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    
    private Long id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

#### DeliveryDto (com/logistics/dto/DeliveryDto.java)

```java
package com.logistics.dto;

import com.logistics.entity.DeliveryPriority;
import com.logistics.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

// DTO for delivery requests and responses
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDto {
    
    private Long id;
    
    // Pickup location
    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;
    
    // Drop location
    @NotBlank(message = "Drop address is required")
    private String dropAddress;
    
    // Customer name
    @NotBlank(message = "Customer name is required")
    private String customerName;
    
    // Customer phone
    @NotBlank(message = "Customer phone is required")
    private String customerPhone;
    
    // Weight in kg
    @NotNull(message = "Weight is required")
    private BigDecimal weight;
    
    // Priority level
    private DeliveryPriority priority = DeliveryPriority.MEDIUM;
    
    // Additional notes
    private String notes;
    
    // Current status
    private DeliveryStatus status;
    
    // Estimated kilometers
    private BigDecimal estimatedKm;
    
    // Estimated cost
    private BigDecimal estimatedCost;
    
    // Actual kilometers
    private BigDecimal actualKm;
    
    // Actual cost
    private BigDecimal actualCost;
    
    // Business user info
    private UserDto businessUser;
    
    // Assigned driver info
    private UserDto driver;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

#### StatusUpdateRequest DTO (com/logistics/dto/StatusUpdateRequest.java)

```java
package com.logistics.dto;

import com.logistics.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

// DTO for updating delivery status
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusUpdateRequest {
    
    @NotNull(message = "New status is required")
    private DeliveryStatus newStatus;
    
    // Actual kilometers if delivery is completed
    private BigDecimal actualKm;
    
    // Actual cost if delivery is completed
    private BigDecimal actualCost;
}
```

---

### 5. REPOSITORY CLASSES - Database Access

#### UserRepository (com/logistics/repository/UserRepository.java)

```java
package com.logistics.repository;

import com.logistics.entity.User;
import com.logistics.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

// JpaRepository provides built-in CRUD operations
// <Entity, PrimaryKeyType>
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Find all users by role (e.g., all drivers)
    List<User> findByRole(UserRole role);
    
    // Find all active drivers
    List<User> findByRoleAndIsActive(UserRole role, Boolean isActive);
}
```

**Explanation:**
- `JpaRepository<User, Long>`: Provides findById, save, delete, findAll, etc.
- Methods defined here are auto-implemented by Spring Data JPA
- `Optional`: Java class that represents a value that may or may not exist

#### DeliveryRepository (com/logistics/repository/DeliveryRepository.java)

```java
package com.logistics.repository;

import com.logistics.entity.Delivery;
import com.logistics.entity.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    
    // Find all deliveries for a business user
    List<Delivery> findByBusinessUserId(Long businessUserId);
    
    // Find all deliveries assigned to a driver
    List<Delivery> findByDriverId(Long driverId);
    
    // Find deliveries by status
    List<Delivery> findByStatus(DeliveryStatus status);
    
    // Find pending deliveries (waiting for driver assignment)
    List<Delivery> findByStatusAndDriverIsNull(DeliveryStatus status);
}
```

#### StatusHistoryRepository (com/logistics/repository/StatusHistoryRepository.java)

```java
package com.logistics.repository;

import com.logistics.entity.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {
    
    // Get all status changes for a delivery
    List<StatusHistory> findByDeliveryIdOrderByChangedAtDesc(Long deliveryId);
}
```

---

### 6. EXCEPTION CLASSES - Custom Exceptions

#### ResourceNotFoundException (com/logistics/exception/ResourceNotFoundException.java)

```java
package com.logistics.exception;

// Custom exception thrown when a resource (user, delivery) is not found
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

#### UnauthorizedException (com/logistics/exception/UnauthorizedException.java)

```java
package com.logistics.exception;

// Custom exception thrown when user lacks required permissions
public class UnauthorizedException extends RuntimeException {
    
    public UnauthorizedException(String message) {
        super(message);
    }
}
```

#### ErrorResponse (com/logistics/exception/ErrorResponse.java)

```java
package com.logistics.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

// Standard error response format for all exceptions
@Data
@AllArgsConstructor
public class ErrorResponse {
    
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private String path;
}
```

#### GlobalExceptionHandler (com/logistics/exception/GlobalExceptionHandler.java)

```java
package com.logistics.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import java.time.LocalDateTime;

// Centralized exception handler for all controllers
// @RestControllerAdvice makes this global for all REST endpoints
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // Handle ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex,
            WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    
    // Handle UnauthorizedException
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(
            UnauthorizedException ex,
            WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.FORBIDDEN.value(),
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }
    
    // Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex,
            WebRequest request) {
        String message = ex.getBindingResult()
                .getFieldError()
                .getDefaultMessage();
        ErrorResponse errorResponse = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            message,
            request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    
    // Handle all other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(
            Exception ex,
            WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "An error occurred: " + ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

**Explanation:**
- `@RestControllerAdvice`: Makes this class handle exceptions globally
- `@ExceptionHandler`: Specifies which exceptions to handle
- Returns consistent error response format

---

### 7. SECURITY & JWT CLASSES

#### JwtTokenProvider (com/logistics/security/JwtTokenProvider.java)

```java
package com.logistics.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

// Handles JWT token creation and validation
@Component
public class JwtTokenProvider {
    
    // Secret key from application.properties
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    // Token expiration time from application.properties
    @Value("${jwt.expiration}")
    private int jwtExpiration;
    
    /**
     * Generate JWT token for user
     * @param email User email
     * @return JWT token string
     */
    public String generateToken(String email) {
        // Current time
        Date now = new Date();
        // Expiration time = current time + expiration duration
        Date expireDate = new Date(now.getTime() + jwtExpiration);
        
        // Create and sign the JWT token
        return Jwts.builder()
                .setSubject(email)              // Subject = user identifier
                .setIssuedAt(now)               // When token was created
                .setExpiration(expireDate)      // When token expires
                .signWith(SignatureAlgorithm.HS512, jwtSecret) // Sign with secret
                .compact();                     // Build token string
    }
    
    /**
     * Extract email from JWT token
     * @param token JWT token
     * @return Email address
     */
    public String getEmailFromToken(String token) {
        // Parse and extract the subject (email) from token
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    /**
     * Validate JWT token
     * @param token JWT token to validate
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token) {
        try {
            // Try to parse the token
            Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException ex) {
            System.err.println("Invalid JWT signature: " + ex);
        } catch (MalformedJwtException ex) {
            System.err.println("Invalid JWT token: " + ex);
        } catch (ExpiredJwtException ex) {
            System.err.println("Expired JWT token: " + ex);
        } catch (UnsupportedJwtException ex) {
            System.err.println("Unsupported JWT token: " + ex);
        } catch (IllegalArgumentException ex) {
            System.err.println("JWT claims string is empty: " + ex);
        }
        return false;
    }
}
```

**Explanation:**
- JWT = JSON Web Token, used for stateless authentication
- Token contains email and expiration, signed with secret key
- To validate: check signature, expiration, and format

#### JwtAuthenticationFilter (com/logistics/security/JwtAuthenticationFilter.java)

```java
package com.logistics.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// Filter that runs once per request to authenticate JWT tokens
// OncePerRequestFilter ensures this runs exactly once per request
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Extract JWT token from request header
            String jwt = getJwtFromRequest(request);
            
            // Validate and authenticate the token
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // Extract email from token
                String email = tokenProvider.getEmailFromToken(jwt);
                
                // Load user details from database
                var userDetails = userDetailsService.loadUserByUsername(email);
                
                // Create authentication token
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                        );
                
                // Set request details
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                
                // Set authentication in security context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            System.err.println("Could not set user authentication: " + ex);
        }
        
        // Continue filter chain
        filterChain.doFilter(request, response);
    }
    
    /**
     * Extract JWT token from Authorization header
     * @param request HTTP request
     * @return JWT token or null
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        // Get Authorization header
        String bearerToken = request.getHeader("Authorization");
        
        // Check if header exists and starts with "Bearer "
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            // Extract token (remove "Bearer " prefix)
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

**Explanation:**
- Filter intercepts every request to check for JWT token
- Extracts token from "Authorization: Bearer {token}" header
- Validates token and sets authentication in security context

#### CustomUserDetailsService (com/logistics/security/CustomUserDetailsService.java)

```java
package com.logistics.security;

import com.logistics.entity.User;
import com.logistics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

// Service to load user details from database for authentication
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        // Create authority from user role
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole());
        
        // Return Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.singletonList(authority))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(!user.getIsActive())
                .build();
    }
}
```

---

### 8. SERVICE CLASSES - Business Logic

#### UserService (com/logistics/service/UserService.java)

```java
package com.logistics.service;

import com.logistics.dto.RegisterRequest;
import com.logistics.dto.UserDto;
import com.logistics.entity.User;
import com.logistics.entity.UserRole;
import com.logistics.exception.ResourceNotFoundException;
import com.logistics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Register a new user
     */
    public UserDto registerUser(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        
        // Create new user entity
        User user = new User();
        user.setEmail(request.getEmail());
        // Encrypt password using BCrypt
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        // Convert string role to enum
        user.setRole(UserRole.valueOf(request.getRole()));
        user.setIsActive(true);
        
        // Save to database
        User savedUser = userRepository.save(user);
        
        // Convert to DTO and return
        return convertToDto(savedUser);
    }
    
    /**
     * Get user by ID
     */
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return convertToDto(user);
    }
    
    /**
     * Get user by email
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
    
    /**
     * Get all drivers
     */
    public List<UserDto> getAllDrivers() {
        List<User> drivers = userRepository.findByRoleAndIsActive(UserRole.DRIVER, true);
        return drivers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert User entity to UserDto
     */
    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setRole(user.getRole());
        dto.setIsActive(user.getIsActive());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
}
```

#### DeliveryService (com/logistics/service/DeliveryService.java)

```java
package com.logistics.service;

import com.logistics.dto.DeliveryDto;
import com.logistics.dto.StatusUpdateRequest;
import com.logistics.entity.*;
import com.logistics.exception.ResourceNotFoundException;
import com.logistics.exception.UnauthorizedException;
import com.logistics.repository.DeliveryRepository;
import com.logistics.repository.StatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {
    
    @Autowired
    private DeliveryRepository deliveryRepository;
    
    @Autowired
    private StatusHistoryRepository statusHistoryRepository;
    
    @Autowired
    private UserService userService;
    
    /**
     * Create a new delivery order
     */
    public DeliveryDto createDelivery(DeliveryDto deliveryDto, Long businessUserId) {
        // Create new delivery entity
        Delivery delivery = new Delivery();
        
        // Set business user
        User businessUser = userService.getUserById(businessUserId);
        delivery.setBusinessUser(businessUser);
        
        // Set delivery details
        delivery.setPickupAddress(deliveryDto.getPickupAddress());
        delivery.setDropAddress(deliveryDto.getDropAddress());
        delivery.setCustomerName(deliveryDto.getCustomerName());
        delivery.setCustomerPhone(deliveryDto.getCustomerPhone());
        delivery.setWeight(deliveryDto.getWeight());
        delivery.setPriority(deliveryDto.getPriority());
        delivery.setNotes(deliveryDto.getNotes());
        
        // Calculate estimated cost: Rs 50 + (Rs 10 per kg)
        delivery.setEstimatedCost(calculateCost(deliveryDto.getWeight(), null));
        
        // Save to database
        Delivery savedDelivery = deliveryRepository.save(delivery);
        
        // Convert to DTO and return
        return convertToDto(savedDelivery);
    }
    
    /**
     * Get delivery by ID
     */
    public DeliveryDto getDeliveryById(Long id) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + id));
        return convertToDto(delivery);
    }
    
    /**
     * Get all deliveries for a business user
     */
    public List<DeliveryDto> getDeliveriesByBusinessUser(Long businessUserId) {
        List<Delivery> deliveries = deliveryRepository.findByBusinessUserId(businessUserId);
        return deliveries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all deliveries assigned to a driver
     */
    public List<DeliveryDto> getDeliveriesByDriver(Long driverId) {
        List<Delivery> deliveries = deliveryRepository.findByDriverId(driverId);
        return deliveries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Assign driver to delivery (Admin only)
     */
    public DeliveryDto assignDriver(Long deliveryId, Long driverId) {
        // Find delivery
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
        
        // Verify driver exists and has driver role
        User driver = userService.getUserById(driverId);
        if (driver.getRole() != UserRole.DRIVER) {
            throw new IllegalArgumentException("User is not a driver");
        }
        
        // Assign driver
        delivery.setDriver(driver);
        Delivery updatedDelivery = deliveryRepository.save(delivery);
        
        return convertToDto(updatedDelivery);
    }
    
    /**
     * Update delivery status
     */
    public DeliveryDto updateDeliveryStatus(
            Long deliveryId,
            StatusUpdateRequest request,
            Long userId) {
        // Find delivery
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));
        
        // Store old status
        DeliveryStatus oldStatus = delivery.getStatus();
        
        // Update status
        delivery.setStatus(request.getNewStatus());
        
        // If completed, set actual km and cost
        if (request.getNewStatus() == DeliveryStatus.DELIVERED) {
            if (request.getActualKm() != null) {
                delivery.setActualKm(request.getActualKm());
            }
            if (request.getActualCost() != null) {
                delivery.setActualCost(request.getActualCost());
            }
        }
        
        // Save delivery
        Delivery updatedDelivery = deliveryRepository.save(delivery);
        
        // Save status history for audit trail
        User changedBy = userService.getUserById(userId);
        StatusHistory history = new StatusHistory();
        history.setDelivery(delivery);
        history.setOldStatus(oldStatus.toString());
        history.setNewStatus(request.getNewStatus().toString());
        history.setChangedBy(changedBy);
        statusHistoryRepository.save(history);
        
        return convertToDto(updatedDelivery);
    }
    
    /**
     * Get all pending deliveries (not assigned to driver)
     */
    public List<DeliveryDto> getPendingDeliveries() {
        List<Delivery> deliveries = deliveryRepository.findByStatusAndDriverIsNull(DeliveryStatus.PENDING);
        return deliveries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Calculate delivery cost
     * Formula: Base 50 + (10 per kg) + Priority multiplier
     */
    private java.math.BigDecimal calculateCost(
            java.math.BigDecimal weight,
            DeliveryPriority priority) {
        java.math.BigDecimal baseCost = new java.math.BigDecimal("50");
        java.math.BigDecimal weightCost = weight.multiply(new java.math.BigDecimal("10"));
        java.math.BigDecimal totalCost = baseCost.add(weightCost);
        
        // Apply priority multiplier
        if (priority == DeliveryPriority.HIGH) {
            totalCost = totalCost.multiply(new java.math.BigDecimal("1.5")); // 50% extra
        } else if (priority == DeliveryPriority.MEDIUM) {
            totalCost = totalCost.multiply(new java.math.BigDecimal("1.2")); // 20% extra
        }
        
        return totalCost;
    }
    
    /**
     * Convert Delivery entity to DeliveryDto
     */
    private DeliveryDto convertToDto(Delivery delivery) {
        DeliveryDto dto = new DeliveryDto();
        dto.setId(delivery.getId());
        dto.setPickupAddress(delivery.getPickupAddress());
        dto.setDropAddress(delivery.getDropAddress());
        dto.setCustomerName(delivery.getCustomerName());
        dto.setCustomerPhone(delivery.getCustomerPhone());
        dto.setWeight(delivery.getWeight());
        dto.setPriority(delivery.getPriority());
        dto.setNotes(delivery.getNotes());
        dto.setStatus(delivery.getStatus());
        dto.setEstimatedKm(delivery.getEstimatedKm());
        dto.setEstimatedCost(delivery.getEstimatedCost());
        dto.setActualKm(delivery.getActualKm());
        dto.setActualCost(delivery.getActualCost());
        dto.setCreatedAt(delivery.getCreatedAt());
        dto.setUpdatedAt(delivery.getUpdatedAt());
        
        if (delivery.getBusinessUser() != null) {
            // Set business user info (without password)
            UserDto businessUserDto = new UserDto();
            businessUserDto.setId(delivery.getBusinessUser().getId());
            businessUserDto.setEmail(delivery.getBusinessUser().getEmail());
            businessUserDto.setFullName(delivery.getBusinessUser().getFullName());
            dto.setBusinessUser(businessUserDto);
        }
        
        if (delivery.getDriver() != null) {
            // Set driver info (without password)
            UserDto driverDto = new UserDto();
            driverDto.setId(delivery.getDriver().getId());
            driverDto.setEmail(delivery.getDriver().getEmail());
            driverDto.setFullName(delivery.getDriver().getFullName());
            dto.setDriver(driverDto);
        }
        
        return dto;
    }
}
```

---

### 9. CONTROLLER CLASSES - API Endpoints

#### AuthController (com/logistics/controller/AuthController.java)

```java
package com.logistics.controller;

import com.logistics.dto.AuthRequest;
import com.logistics.dto.AuthResponse;
import com.logistics.dto.RegisterRequest;
import com.logistics.entity.User;
import com.logistics.security.JwtTokenProvider;
import com.logistics.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

// REST Controller for authentication endpoints
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Register new user
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            // Register user using service
            var userDto = userService.registerUser(request);
            
            // Generate JWT token for new user
            String token = tokenProvider.generateToken(request.getEmail());
            
            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(token, userDto));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null));
        }
    }
    
    /**
     * Login user
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody AuthRequest request) {
        try {
            // Find user by email
            User user = userService.getUserByEmail(request.getEmail());
            
            // Verify password
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(null, null));
            }
            
            // Check if user is active
            if (!user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new AuthResponse(null, null));
            }
            
            // Generate JWT token
            String token = tokenProvider.generateToken(user.getEmail());
            
            // Convert user to DTO
            var userDto = new com.logistics.dto.UserDto();
            userDto.setId(user.getId());
            userDto.setEmail(user.getEmail());
            userDto.setFullName(user.getFullName());
            userDto.setRole(user.getRole());
            
            // Return success response with token
            return ResponseEntity.ok(new AuthResponse(token, userDto));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, null));
        }
    }
}
```

#### DeliveryController (com/logistics/controller/DeliveryController.java)

```java
package com.logistics.controller;

import com.logistics.dto.DeliveryDto;
import com.logistics.dto.StatusUpdateRequest;
import com.logistics.entity.UserRole;
import com.logistics.service.DeliveryService;
import com.logistics.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

// REST Controller for delivery management
@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class DeliveryController {
    
    @Autowired
    private DeliveryService deliveryService;
    
    @Autowired
    private UserService userService;
    
    /**
     * Get current user ID from JWT token
     */
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userService.getUserByEmail(email).getId();
    }
    
    /**
     * Create new delivery
     * POST /api/deliveries
     */
    @PostMapping
    public ResponseEntity<DeliveryDto> createDelivery(@Valid @RequestBody DeliveryDto deliveryDto) {
        Long userId = getCurrentUserId();
        DeliveryDto createdDelivery = deliveryService.createDelivery(deliveryDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDelivery);
    }
    
    /**
     * Get delivery by ID
     * GET /api/deliveries/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDto> getDelivery(@PathVariable Long id) {
        DeliveryDto delivery = deliveryService.getDeliveryById(id);
        return ResponseEntity.ok(delivery);
    }
    
    /**
     * Get all deliveries based on user role
     * GET /api/deliveries
     */
    @GetMapping
    public ResponseEntity<List<DeliveryDto>> getAllDeliveries() {
        Long userId = getCurrentUserId();
        var user = userService.getUserById(userId);
        
        List<DeliveryDto> deliveries;
        
        if (user.getRole() == UserRole.ADMIN) {
            // Admin can see all deliveries
            deliveries = deliveryService.getPendingDeliveries();
        } else if (user.getRole() == UserRole.BUSINESS_USER) {
            // Business user sees only their deliveries
            deliveries = deliveryService.getDeliveriesByBusinessUser(userId);
        } else if (user.getRole() == UserRole.DRIVER) {
            // Driver sees only their assigned deliveries
            deliveries = deliveryService.getDeliveriesByDriver(userId);
        } else {
            deliveries = List.of();
        }
        
        return ResponseEntity.ok(deliveries);
    }
    
    /**
     * Assign driver to delivery (Admin only)
     * PUT /api/deliveries/{id}/assign-driver/{driverId}
     */
    @PutMapping("/{id}/assign-driver/{driverId}")
    public ResponseEntity<DeliveryDto> assignDriver(
            @PathVariable Long id,
            @PathVariable Long driverId) {
        Long userId = getCurrentUserId();
        var user = userService.getUserById(userId);
        
        // Check if user is admin
        if (user.getRole() != UserRole.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        DeliveryDto updatedDelivery = deliveryService.assignDriver(id, driverId);
        return ResponseEntity.ok(updatedDelivery);
    }
    
    /**
     * Update delivery status
     * PUT /api/deliveries/{id}/status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<DeliveryDto> updateDeliveryStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        Long userId = getCurrentUserId();
        DeliveryDto updatedDelivery = deliveryService.updateDeliveryStatus(id, request, userId);
        return ResponseEntity.ok(updatedDelivery);
    }
}
```

#### UserController (com/logistics/controller/UserController.java)

```java
package com.logistics.controller;

import com.logistics.dto.UserDto;
import com.logistics.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// REST Controller for user management
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Get all drivers
     * GET /api/users/drivers
     */
    @GetMapping("/drivers")
    public ResponseEntity<List<UserDto>> getAllDrivers() {
        List<UserDto> drivers = userService.getAllDrivers();
        return ResponseEntity.ok(drivers);
    }
    
    /**
     * Get user by ID
     * GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
```

---

### 10. SPRING SECURITY CONFIGURATION

#### SecurityConfig (com/logistics/config/SecurityConfig.java)

```java
package com.logistics.config;

import com.logistics.security.JwtAuthenticationFilter;
import com.logistics.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Spring Security configuration
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    /**
     * Create password encoder bean
     * BCryptPasswordEncoder uses bcrypt algorithm for secure password hashing
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    /**
     * Create JWT authentication filter bean
     */
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
    
    /**
     * Configure HTTP security
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()                              // Disable CSRF for APIs
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Stateless sessions
                .and()
            .authorizeRequests()
                // Public endpoints
                .antMatchers("/api/auth/login", "/api/auth/register").permitAll()
                // Require authentication for other endpoints
                .anyRequest().authenticated()
                .and()
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    
    /**
     * Configure authentication manager
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }
    
    /**
     * Create authentication manager bean
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
```

---

### 11. CORS CONFIGURATION

#### CorsConfig (com/logistics/config/CorsConfig.java)

```java
package com.logistics.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Enable CORS (Cross-Origin Resource Sharing) for frontend communication
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Apply to all API endpoints
                .allowedOrigins("http://localhost:3000", "http://localhost:3001")  // Allow these origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow these HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true)  // Allow credentials (cookies)
                .maxAge(3600);  // Cache preflight for 1 hour
    }
}
```

---

### 12. MAIN APPLICATION CLASS

#### LogisticsApplication (com/logistics/LogisticsApplication.java)

```java
package com.logistics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Main entry point for Spring Boot application
@SpringBootApplication
public class LogisticsApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(LogisticsApplication.class, args);
    }
}
```

---

## HOW TO RUN

### Backend Setup (Spring Boot)

```bash
# 1. Clone/create project directory
mkdir logistics-delivery-management
cd logistics-delivery-management

# 2. Create MySQL database
mysql -u root -p
> CREATE DATABASE logistics_db;
> EXIT

# 3. Copy all Java files to respective packages
# Place application.properties in src/main/resources/

# 4. Run Maven clean and install
mvn clean install

# 5. Start Spring Boot application
mvn spring-boot:run

# Application starts on http://localhost:8080
```

### Testing Backend API

```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123",
    "fullName": "Admin User",
    "phoneNumber": "9999999999",
    "role": "ADMIN"
  }'

# Login user
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123"
  }'

# Use returned token for authenticated requests
curl -X GET http://localhost:8080/api/deliveries \
  -H "Authorization: Bearer {TOKEN_HERE}"
```

---

## CONCEPTS EXPLAINED

### Backend Concepts Used:

1. **Spring Boot**: Framework for building Java applications
2. **JPA/Hibernate**: ORM for database operations
3. **REST API**: HTTP-based API design
4. **JWT**: Stateless authentication tokens
5. **Spring Security**: Authentication and authorization
6. **Password Encoding**: BCrypt for secure password storage
7. **Exception Handling**: Global exception handler
8. **DTOs**: Data Transfer Objects for API communication
9. **Repositories**: Database access layer
10. **Services**: Business logic layer
11. **Controllers**: HTTP request handlers

This concludes the complete backend code. The React frontend code will be provided next with equal detail and explanation.
