# 🚪 Full-Stack Test Automation Project – React & Node.js

This project demonstrates automated testing of a full-stack application consisting of a **React frontend** and a **Node.js backend**. It includes:

* Functional UI automation (Login/Task Management)
* API test automation
* Github integration

---

## 🚀 Quick Setup (⏱ \~2 mins)

### 1. Clone the repository

```bash
git clone https://github.com/amiralaa93/REMWASTETest-AmirMahgoub.git
cd REMWASTETest-AmirMahgoub
```

---

### 2. Start the Backend Server

```bash
cd backend
npm install
node server.js
```

> ✅ You should see: `Server running on http://localhost:3001`

---

### 3. Start the Frontend App

In a **new terminal tab**:

```bash
cd frontend
npm install
npm start
```

> 🌐 Visit: [http://localhost:3000](http://localhost:3000)

---

## 💪 Test Automation Overview

### ✅ Functional UI Tests

**Tool Used**: `Playwright`

**Install Playwright:**

```bash
npm install --save-dev playwright
```

**Test Scenarios**:

* Register with valid/invalid credentials
* Login with valid/invalid credentials
* Create a new task
* Edit a task
* Delete a task
* Check that UI reflects updated data

**Run Tests**:

```bash
cd REMWASTETest-AmirMahgoub
npm test
```

---

### ✅ API Tests

**Tool Used**: `Postman + Newman`

**API Endpoints Tested**:

* `POST /register` – Valid and invalid credentials
* `POST /login` – Valid and invalid credentials
* `POST /tasks` – Add a new task
* `POST /tasks` – Add a new task while you're unauthorized
* `GET /tasks` – List all tasks
* `PUT /tasks/:id` – Update a task
* `DELETE /tasks/:id` – Remove a task

**Run Tests (Postman + Newman)**:

### 1. Import Collection:

* Download Login-Task Manager APIs.postman_collection.json
* Download Login-Task Manager Env.postman_environment.json
* Import both into Postman

### 2. Run via Postman:

* Open the collection
* Click on Run

---

## 📾 Test Plan Summary

| Section         | Description                                |
| --------------- | ------------------------------------------ |
| **Scope**       | UI & API test coverage for todo app        |
| **Tools Used**  | Playwright (UI), Postman (API)             |
| **Coverage**    | Positive + negative test cases             |

---

## 🛠️ Tools & Libraries

* **Frontend**: React, Fetch API
* **Backend**: Node.js, Express, CORS
* **UI Testing**: Playwright
* **API Testing**: Postman
* **Dev Tools**: VS Code, GitHub

---

## 🤛 About

**Author**: Amir Mahgoub
**Role**: QA Engineer
**Location**: France 🇫🇷

---

> For any questions or improvements, feel free to open an issue or contact me.
