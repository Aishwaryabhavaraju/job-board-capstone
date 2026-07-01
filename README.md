# Job Board Platform - Capstone Project
DEMO VIDEO LINK: https://drive.google.com/file/d/1-hKWVErqsBS7O_poEZE6OwDRerh-l3UX/view?usp=sharing

A full-stack, real-time Job Board platform built using a **Django REST Framework (DRF)** backend connected to a **PostgreSQL** database, and a dynamic **React** frontend styled with **Tailwind CSS**.

---

## Tech Stack

- **Backend**: Python 3.x, Django, Django REST Framework, Django Filter, SimpleJWT (JWT Authentication)
- **Database**: PostgreSQL (connected in real-time)
- **Frontend**: React (Vite), React Router v7, React Toastify, Tailwind CSS
- **Authentication**: Stateless JSON Web Token (JWT) with secure local storage persistence

---

## Core Features

### 👥 Role-Based Access Control
- **Employers**: Can post new job listings, view statistical counters, manage listings (edit, delete), browse received applications with cover letters, view candidate profiles, and shortlist/reject applicants in real-time.
- **Job Seekers (Candidates)**: Can browse, search, and filter job listings, save jobs for later, edit their detailed profile details (contact info, address, education, experience, LinkedIn, GitHub, portfolio), upload PDF/DOCX resumes, and track their application statuses.

### 💼 Job Listing Management (CRUD)
- Complete CRUD actions for job postings by employers.
- Real-time job browsing page for candidates, featuring:
  - Text search by job title, company, or description.
  - Location filtering.
  - Multi-select filters for Job Type (Full-Time, Part-Time, Remote, Internship, Contract).
  - Client-side range filters for salary brackets and experience keywords.

### 📄 Profile & Resume System
- User profile dashboard for candidates.
- Interactive profile update form with real-time text input fields.
- **Resume Upload**: File upload handling using Django Media storage for resumes (`.pdf`, `.doc`, `.docx` up to 5MB).
- Built-in applicant resume viewers directly in the employer's applications dashboard.

### ✉ Job Application System
- Interactive cover letter input and optional resume attachments during the application process.
- Duplicate prevention constraints ensuring candidates can only apply to a job once.
- Real-time application tracker for candidates showing status changes (`Pending`, `Shortlisted`, `Rejected`, `Accepted`).

---

## Folder Structure

```text
job-board-capstone/
├── backend/                  # Django REST API
│   ├── accounts/             # User Auth, Roles & Managers
│   ├── jobs/                 # Job CRUD ViewSets & Filters
│   ├── profiles/             # Applicant Profile Model & Serializer
│   ├── applications/         # Applications & Status Updaters
│   ├── config/               # Settings, URLs, Router
│   ├── media/                # Resume Upload Folder
│   ├── requirements.txt      # Python dependencies
│   └── manage.py             # Django entrypoint
│
└── frontend/                 # React SPA (Vite)
    ├── src/
    │   ├── components/       # Custom UI components & Modals
    │   ├── context/          # JWT Auth Context Providers
    │   ├── layouts/          # Auth, Main, Dashboard templates
    │   ├── pages/            # Page Views (Job Details, Dashboards, CRUD forms)
    │   ├── routes/           # Protected Route Definitions
    │   ├── utils/            # Toast Notifiers & Utilities
    │   ├── App.jsx           # App Root
    │   └── main.jsx          # Entrypoint (Wraps Router & Context Providers)
    ├── tailwind.config.js    # Tailwind styling tokens
    ├── vite.config.js        # Vite config (Server port 3000)
    └── package.json          # Node dependencies
```

---

## Setup & Installation

### 1. Database Setup (PostgreSQL)
Ensure your PostgreSQL server is running. Create a new database named `job_board_db`:
```sql
CREATE DATABASE job_board_db;
```

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create and activate a python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (cmd/powershell):
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file inside the `backend` folder:
   ```env
   SECRET_KEY=your-django-secret-key-here
   DEBUG=True
   DB_NAME=job_board_db
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password_here
   DB_HOST=localhost
   DB_PORT=5432
   ```
5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the development server (runs on port 8000 by default):
   ```bash
   python manage.py runserver
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the development server (configured to run on port 3000):
   ```bash
   npm run dev
   ```
4. Open your browser and visit `http://localhost:3000`.

---

## API Endpoints Reference

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/register/` | Register a new user (`job_seeker` or `employer`) | No |
| `POST` | `/api/login/` | Obtain JWT access/refresh tokens | No |
| `POST` | `/api/token/refresh/` | Refresh expired access tokens | No |
| `GET` | `/api/me/` | Fetch current logged-in user profile details | Yes |

### 💼 Job Board
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/jobs/` | Get list of all jobs (supports search & filter params) | No |
| `GET` | `/api/jobs/?posted_by={id}` | Get jobs posted by a specific employer | No |
| `GET` | `/api/jobs/{id}/` | Get details of a single job | No |
| `POST` | `/api/jobs/` | Create a new job listing (Employer only) | Yes |
| `PUT/PATCH` | `/api/jobs/{id}/` | Update a job listing (Owner only) | Yes |
| `DELETE` | `/api/jobs/{id}/` | Delete a job listing (Owner only) | Yes |

### 📄 Candidate Profiles
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/profiles/` | Get the logged-in candidate's profile details | Yes |
| `POST` | `/api/profiles/` | Create an applicant profile and upload resume | Yes |
| `PUT/PATCH` | `/api/profiles/{id}/` | Update applicant profile fields or change resume | Yes |

### ✉ Applications
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/applications/` | Get submissions (Job Seeker sees own list, Employer sees applicant list for their jobs) | Yes |
| `POST` | `/api/applications/` | Apply to a job listing (Job Seeker only) | Yes |
| `PATCH` | `/api/applications/{id}/update_status/` | Shortlist or reject an application (Hiring Employer only) | Yes |
