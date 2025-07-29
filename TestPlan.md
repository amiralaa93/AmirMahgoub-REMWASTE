# 🧪 Test Plan – Full-Stack Task App

## 1. Overview

This test plan outlines the strategy and scope for testing a full-stack web application with a React frontend and a Node.js backend. The goal is to ensure the reliability, usability, and correctness of both the UI and API layers.

---

## 2. What is Being Tested

* **Login functionality** (authentication)
* **Register functionality** (account creation)
* **CRUD operations** for tasks

  * Create a new task
  * Edit an existing task
  * Delete a task
  * View tasks list

---

## 3. Test Coverage Areas

### ✅ Functional UI Tests

* Valid login (admin/password)
* Invalid login (wrong credentials or empty fields)
* Valid registration (new user)
* Invalid registration (existing user or missing fields)
* Adding a new task
* Editing an existing task
* Deleting a task
* UI validations after actions (i.e., item appears/disappears)

### ✅ API Tests

* `POST /register`

  * Success with valid data
  * Failure with missing fields
  * Failure with duplicate username
* `POST /login`

  * Success with correct credentials
  * Failure with missing or incorrect credentials
* `GET /tasks`

  * Returns all tasks
* `POST /tasks`

  * Adds new task
  * Error with missing fields
* `PUT /tasks/:id`

  * Updates a task
  * Error on invalid ID
* `DELETE /tasks/:id`

  * Deletes a task
  * Error on invalid ID

---

## 4. Tools Used and Why

| Layer     | Tool       | Reason                                   |
| --------- | ---------- | ---------------------------------------- |
| UI Tests  | Playwright | Fast, reliable, supports modern browsers |
| API Tests | Postman    | Easy to use, visual testing, quick setup |

---

## 5. How to Run the Tests

### 🖥️ UI Tests (Playwright)

```bash
cd /e2e_UI
npm install
npx playwright test
```

---

## 6. Assumptions & Limitations

* Login/register tokens are not persisted between sessions
* Basic error handling only (no rate limits, brute-force protection)
* No form validations beyond presence checks

---

## 7. Authors

**Amir Mahgoub** – QA Engineer

---

> Feel free to contribute improvements or raise issues in the repo.
