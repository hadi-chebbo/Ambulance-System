# AmbuLog

AmbuLog is a multi-center ambulance and EMS management system designed to help emergency centers manage shifts, personnel, and missions efficiently.

This project focuses on building a real-world backend system with proper data modeling, role management, and scalable architecture.

---

## Overview

AmbuLog allows multiple centers to operate within the same system while keeping their data isolated.

Each center can manage:
- Personnel (EMTs, assistants, drivers)
- Ambulances
- Shifts and assignments
- Attendance tracking
- Missions (planned)

---

## Features (Current)

- Multi-center structure (centers, users, ambulances)
- Role-based users:
  - Super Admin
  - Admin
  - EMT
  - EMT Assistant
  - Driver
- Shift creation and assignment
- Attendance tracking per shift
- Relational database design with proper associations

---

## Work in Progress

- Mission management system
- API authentication and authorization improvements
- Frontend (React + TypeScript)
- Real-time updates / notifications
- Reporting and analytics

---

## Tech Stack

**Backend**
- Laravel (PHP)
- MySQL
- REST APIs

**Frontend (in progress)**
- React + TypeScript
- Axios

**Tools**
- Git & GitHub
- Postman

---

## Database Design Highlights

- Users belong to a center
- Ambulances belong to a center
- Shifts are managed by supervisors
- Many-to-many relationship between shifts and users
- Attendance tracked per user per shift

---

## Goal

The goal of this project is to simulate a real EMS management system used by emergency centers, focusing on clean architecture, scalability, and real-world use cases.

---

## Status

This project is actively being developed.
