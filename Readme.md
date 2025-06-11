# Dresscode

Dresscode is a full-stack application for managing clothing items, loans, users, and events, with support for authentication, internationalization, and comprehensive admin and student portals.

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)

---

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access and token validation.
- **User Management**: CRUD operations, pagination, status toggling, deletion, and admin user creation.
- **Clothing Item Management**: CRUD operations, image uploads, category and size support, and inventory integration.
- **Loan Management**: Full CRUD for loans with extended endpoints for including user and item details.
- **Event Management**: CRUD for events with image support, category/status filtering, and pagination.
- **Internationalization (i18n)**: Multi-language support on the frontend.
- **Student Portal**: Landing page and navigation for student-specific features.
- **Admin Portal**: Dashboards for loan management, user management, and detailed data tables.
- **Enum Endpoints**: Expose enum values (e.g., `ClothingItemSizeEnum`).
- **Shoe Sizing**: Backend endpoints for managing shoe sizes.
- **Global Exception Handling**: Consistent error handling throughout the backend.
- **Comprehensive Tests**: Unit and integration tests for services, controllers, and mappers.

---

## Architecture

The application follows a **React + Spring Boot** architecture:

- **Backend**: Java 17, Spring Boot, Spring Security, JPA/Hibernate, REST controllers, service layer, DTOs, MapStruct mappers.
- **Frontend**: React, TypeScript, React Router, Formik, Axios (or React Query), and i18next.
- **Database**: Configurable via application properties (e.g., H2 for development, PostgreSQL for production).
- **Build & Deployment**: Docker for containerization, Nginx for static file serving, with separate containers for frontend and backend.

---

## Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Security, MapStruct, JPA/Hibernate, Maven.
- **Frontend**: React, TypeScript, Formik, React Query (or Axios), i18next.
- **Testing**: JUnit 5, Mockito, React Testing Library, Vitest.
- **DevOps**: Docker, Docker Compose, Nginx.

---

## Getting Started

### Prerequisites

- **Java** 17 or above
- **Node.js** 16 or above
- **Docker** & **Docker Compose**
- **Git**
