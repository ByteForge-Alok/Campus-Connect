# CampusConnect

## Campus Problem Reporting System

CampusConnect is a full-stack web application that allows students to report problems on campus and enables administrators to track, search, filter, and update those reports.

The project is designed as a practical solution for managing common campus issues such as electricity problems, water issues, cleanliness, infrastructure problems, and internet-related issues.

---

## Problem Statement

Students often face problems around campus but may not have a simple and organized way to report them.

At the same time, administrators need a centralized way to:

- Receive campus problem reports
- View all reported problems
- Search through reports
- Filter reports by category
- Filter reports by status
- Track the progress of reported problems
- Mark problems as resolved

CampusConnect provides a centralized digital reporting system for this workflow.

---

## Features

### Student Reporting

Students can submit a campus problem by providing:

- Problem title
- Category
- Description
- Location

### Admin Dashboard

The dashboard displays:

- Total reports
- Pending reports
- In-progress reports
- Resolved reports

### Report Management

Administrators can:

- View all reports
- Search reports
- Filter by category
- Filter by status
- Change report status

### Database Persistence

Reports are stored in MongoDB, so information remains available even after refreshing the application.

### Full-Stack Architecture

CampusConnect uses a React frontend, Express backend, and MongoDB database.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- CORS

### Database

- MongoDB
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub

---

## Project Structure

```text
CampusConnect/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
├── server/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── index.html