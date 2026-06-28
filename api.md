# CivicSync API Documentation

This file documents the local Express.js backend API (running on port 5000) that powers the CivicSync platform. The backend is built with SQLite for local data persistence and integrates Google's Gemini Flash for AI-powered report verification.

## 1. Authentication Routes (`/api/auth`)

### Register a User
- **POST** `/api/auth/register`
- **Body:** `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "citizen" }`
- **Response:** `{ "message": "User registered successfully", "userId": 1 }`

### Login
- **POST** `/api/auth/login`
- **Body:** `{ "email": "john@example.com", "password": "password123" }`
- **Response:** `{ "token": "jwt_token_string", "user": { "id": 1, "role": "citizen" } }`

---

## 2. Report Routes (`/api/reports`)

### Submit a New Report
- **POST** `/api/reports`
- **Description:** Submits a new infrastructure issue. The backend automatically triggers the Gemini AI model to analyze the description and assign a severity score/category.
- **Body:** 
  ```json
  {
    "userId": 1,
    "title": "Large Pothole on Main St",
    "description": "Deep pothole causing traffic issues.",
    "latitude": 28.6139,
    "longitude": 77.2090,
    "imageUrl": "base64_string_or_url"
  }
  ```
- **Response:** `{ "message": "Report submitted successfully", "reportId": 5, "aiAnalysis": { "severity": "High", "category": "Road Hazard" } }`

### Get All Reports (For Map/Feed)
- **GET** `/api/reports`
- **Response:** `[ { "id": 1, "title": "Large Pothole", "status": "Pending", "severity": "High", ... } ]`

---

## 3. Official / Admin Routes (`/api/official`)

### Update Report Status
- **PUT** `/api/official/reports/:id/status`
- **Headers:** `Authorization: Bearer <token>` (Must be an official)
- **Body:** `{ "status": "In Progress" }` // Valid statuses: Pending, In Progress, Resolved
- **Response:** `{ "message": "Status updated successfully" }`
