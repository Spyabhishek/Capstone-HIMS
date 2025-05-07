# 🏠 Home Insurance Management System  

A modern web application designed to **simplify home insurance operations** with efficient policy management, claims processing, and customer relationship tools.

## ✨ Key Features

### 📑 Policy Management
| Feature | Description |
|---------|-------------|
| Policy Lifecycle | Create, view, update, and delete insurance policies |
| Renewals | Automated policy renewal reminders |
| Customization | Flexible coverage options and add-ons |

### 👥 Customer Portal
| Feature | Description |
|---------|-------------|
| Secure Profiles | Encrypted customer data storage |
| Self-Service | Policy management without agent assistance |
| Document Hub | Secure upload and storage of claim documents |

### ⚡ Claims Processing
| Feature | Description |
|---------|-------------|
| Intuitive Workflow | Step-by-step claims submission |
| Real-Time Tracking | Live status updates for claims |
| Smart Validation | Automated checks for claim completeness |

# 🏗️ System Architecture

```mermaid
graph TD
    A[Spring Boot] --> B[PostgreSQL]
    A --> C[Hibernate]
    A --> D[Spring Security]
    D --> E[JWT Auth]

```

```mermaid
journey
    title Installation Journey
    section Clone
      Git Clone: 5: User
      CD into Project: 3: User
    section Frontend
      NPM Install: 4: System
      Run Dev Server: 2: System
    section Backend
      Maven Build: 3: System
      Spring Boot: 5: System
    section Complete
      Access App: 1: User
```

# Clone the repository
- git clone https://github.com/Spyabhishek/Home-Insurance-Management-System.git
- cd Home-Insurance-Management-System

# Frontend setup
- cd frontend
- npm install
- npm run dev

# Backend setup
- cd ../backend
- mvn spring-boot:run