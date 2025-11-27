# Spring Boot Logistics Backend - Quick Start Script
# Run this script to set up and start the application

Write-Host "================================================"
Write-Host "Logistics Delivery Management - Spring Boot"
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify Java Installation
Write-Host "[1/5] Verifying Java installation..." -ForegroundColor Yellow
$javaVersion = java -version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Java is installed" -ForegroundColor Green
    Write-Host $javaVersion[0]
} else {
    Write-Host "✗ Java is not installed!" -ForegroundColor Red
    Write-Host "Please install Java 11 or higher from: https://www.oracle.com/java/technologies/javase-downloads.html"
    exit 1
}

Write-Host ""

# Step 2: Set Environment Variables
Write-Host "[2/5] Setting up environment variables..." -ForegroundColor Yellow
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "$env:USERPROFILE\apache-maven-3.9.5\bin;$env:PATH"

# Verify Maven
$mvnVersion = mvn --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Maven is ready" -ForegroundColor Green
} else {
    Write-Host "✗ Maven not found! Please ensure Maven is installed." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 3: Navigate to Project Directory
Write-Host "[3/5] Navigating to project directory..." -ForegroundColor Yellow
$projectDir = "c:\Users\sriha\Downloads\Data Logistics"
if (Test-Path $projectDir) {
    cd $projectDir
    Write-Host "✓ Project directory found" -ForegroundColor Green
} else {
    Write-Host "✗ Project directory not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Build the Project
Write-Host "[4/5] Building the project (this may take 1-2 minutes)..." -ForegroundColor Yellow
mvn clean install -DskipTests -q

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed! Check the output above for errors." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 5: Start the Application
Write-Host "[5/5] Starting Spring Boot application..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Starting Logistics Backend on http://localhost:8080"
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT NOTES:" -ForegroundColor Magenta
Write-Host "• Ensure MySQL is running on localhost:3306"
Write-Host "• Database 'logistics_db' will be auto-created"
Write-Host "• Default user: root / password: root"
Write-Host ""
Write-Host "To test the API, use:" -ForegroundColor Cyan
Write-Host "  curl -X POST http://localhost:8080/api/auth/login"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server"
Write-Host ""

mvn spring-boot:run
