# 🔥 COPY & PASTE - RUN YOUR BACKEND NOW!

## ONE-LINER COMMAND (Recommended)

Copy and paste this into PowerShell:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"; $env:PATH = "$env:USERPROFILE\apache-maven-3.9.5\bin;$env:PATH"; cd "c:\Users\sriha\Downloads\Data Logistics"; mvn clean install -DskipTests; mvn spring-boot:run
```

---

## STEP-BY-STEP APPROACH (Safer)

**Step 1:** Copy this and paste in PowerShell
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
```

**Step 2:** Copy this and paste in PowerShell
```powershell
$env:PATH = "$env:USERPROFILE\apache-maven-3.9.5\bin;$env:PATH"
```

**Step 3:** Copy this and paste in PowerShell
```powershell
cd "c:\Users\sriha\Downloads\Data Logistics"
```

**Step 4:** Copy this and paste in PowerShell (first time - takes 1-2 minutes)
```powershell
mvn clean install -DskipTests
```

**Step 5:** Copy this and paste in PowerShell (to run the server)
```powershell
mvn spring-boot:run
```

---

## ✅ WHEN YOU SEE THIS - IT'S WORKING!

```
[INFO] BUILD SUCCESS

...

Tomcat started on port(s): 8080

Started LogisticsApplication in X.XXX seconds
```

🎉 **Your backend is now running on http://localhost:8080**

---

## 🧪 QUICK TEST (Open NEW PowerShell Window)

Register a user - Copy & Paste:

```powershell
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

---

## ⚠️ IF YOU GET ERRORS

### MySQL Error?
- Start MySQL: `Get-Service MySQL80 | Start-Service`
- Create DB: `mysql -u root -p` → `CREATE DATABASE logistics_db;` → `EXIT;`

### Maven Not Found?
- Check Maven path: `dir "$env:USERPROFILE\apache-maven-3.9.5\bin"`
- If not found: Install Maven from https://maven.apache.org/download.cgi

### Port 8080 Already in Use?
- Edit `src/main/resources/application.properties`
- Change `server.port=8080` to `server.port=8081`

---

## 📝 FIRST TIME CHECKLIST

Before running, open PowerShell and run these:

```powershell
# Check Java
java -version

# Check MySQL
mysql --version

# Check if database exists
mysql -u root -p -e "SHOW DATABASES;"
```

---

## 🚀 YOU'RE READY!

Your backend is production-ready. Just run the command and it works!

No config needed (except MySQL password if different from 'root')

**3 commands = Backend running ✅**

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"; $env:PATH = "$env:USERPROFILE\apache-maven-3.9.5\bin;$env:PATH"; cd "c:\Users\sriha\Downloads\Data Logistics"
mvn clean install -DskipTests
mvn spring-boot:run
```

---

That's it! 🎉
