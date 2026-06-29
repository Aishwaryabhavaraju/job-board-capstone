# Job Board Platform - Project Planning

## Project Overview

The **Job Board Platform** is a full-stack web application that connects employers and job seekers. Employers can create and manage job postings, while job seekers can search, filter, and apply for jobs. The application will be built using **React** for the frontend and **Django REST Framework** for the backend, with **PostgreSQL** as the database and **JWT Authentication** for secure user access.

---

## Objectives

* Develop a secure and responsive job portal.
* Allow employers to create, update, view, and delete job postings.
* Enable job seekers to browse, search, filter, and apply for jobs.
* Provide resume upload and applicant profile management.
* Allow employers to review applications and update application status.
* Build RESTful APIs using Django REST Framework.
* Integrate the React frontend with backend APIs.
* Use PostgreSQL for reliable data storage.
* Implement JWT-based authentication and authorization.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-based access (Employer and Job Seeker)

### Employer Features

* Create Job Posting
* Edit Job
* Delete Job
* View Posted Jobs
* View Applicants
* Update Application Status

### Job Seeker Features

* Create Applicant Profile
* Upload Resume
* Browse Jobs
* Search Jobs
* Filter Jobs by Role, Location, and Job Type
* Apply for Jobs
* Track Application Status

---

## Technology Stack

### Frontend

* React 18
* React Router v6
* Axios
* HTML5
* CSS3

### Backend

* Python 3.11
* Django 4.x
* Django REST Framework
* Simple JWT

### Database

* PostgreSQL

### Development Tools

* Git & GitHub
* Postman
* Visual Studio Code
* python-dotenv

---

## Project Workflow

1. User registers as an Employer or Job Seeker.
2. User logs in using JWT authentication.
3. Employer can create, edit, delete, and manage job postings.
4. Job Seeker browses available jobs.
5. Job Seeker searches and filters jobs based on role, location, and job type.
6. Job Seeker uploads a resume and submits job applications.
7. Employer reviews applications and updates their status.
8. Job Seeker views the current status of submitted applications.

---

## Database Design

### User

* id
* username
* email
* password
* role (Employer / Job Seeker)

### Job

* id
* title
* company
* location
* job_type
* salary
* description
* requirements
* employer (Foreign Key → User)
* created_at

### ApplicantProfile

* id
* user (Foreign Key → User)
* phone
* skills
* education
* experience
* resume

### Application

* id
* job (Foreign Key → Job)
* applicant (Foreign Key → User)
* cover_letter
* status (Pending, Shortlisted, Rejected, Accepted)
* applied_at

---

## Future Enhancements

* Email notifications for application updates.
* Bookmark or save jobs.
* Company profile management.
* Pagination and advanced filtering.
* Admin dashboard for platform management.

---

## Expected Outcome

The completed application will provide a secure and user-friendly platform for employers to recruit candidates and for job seekers to find and apply for jobs. It will demonstrate full-stack development skills using React, Django REST Framework, PostgreSQL, REST APIs, and JWT authentication.
