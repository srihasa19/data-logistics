# 🚀 QUICK COMMANDS TO RUN YOUR BACKEND

## Step 1: Open PowerShell and Run These Commands

```powershell
# Set Java Home
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"

# Add Maven to Path
$env:PATH = "$env:USERPROFILE\apache-maven-3.9.5\bin;$env:PATH"

# Go to project directory
cd "c:\Users\sriha\Downloads\Data Logistics"

# Build the project (first time only - takes 1-2 minutes)
mvn clean install -DskipTests

# Run the backend
mvn spring-boot:run
```

## Step 2: Wait for This Message

```
Tomcat started on port(s): 8080
Started LogisticsApplication in X.XXX seconds
```

## Step 3: Test It's Working

Open another PowerShell and run:

```powershell
# Register a user
$body = @{
    email = "test@example.com"
    password = "test123"
    fullName = "Test User"
    phoneNumber = "9999999999"
    role = "ADMIN"
} | ConvertTo-Json

curl -X POST http://localhost:8080/api/auth/register `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

## Expected Response

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "message": "Authentication successful",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "fullName": "Test User",
    "role": "ADMIN"
  }
}
```

## If You Get an Error

### Error: MySQL Connection Failed
- Make sure MySQL is running: `Get-Service MySQL80 | Start-Service`
- Create database: `mysql -u root -p` then `CREATE DATABASE logistics_db;`
- Check username/password in `src/main/resources/application.properties`

### Error: Port 8080 Already in Use
- Change port in `src/main/resources/application.properties` to `server.port=8081`

### Error: Maven Not Found
- Maven is in: `$env:USERPROFILE\apache-maven-3.9.5\bin`
- Add to PATH: `$env:PATH = "$env:USERPROFILE\apache-maven-3.9.5\bin;$env:PATH"`

## ✅ Success = Backend Running!

Your backend is now ready to:
- Accept API requests on http://localhost:8080
- Authenticate users with JWT tokens
- Manage deliveries in database
- Serve your React/Angular frontend

---

**That's it! Your Spring Boot backend is running!** 🎉
