# Backend API Endpoints Reference

This document outlines all the API endpoints present in the backend application, including their associated controller functions and a detailed explanation of their behavior.

All endpoints are prefixed with the base API route: `/api/v1`

---

## 🔐 Auth (`/api/v1/auth`)

_These routes are public (no authentication required)._

### `POST /signup`

- **Controller:** `signup`
- **What it does:** Extracts `fullName`, `userName`, `email`, and `password` from the request body. It passes these to the service layer to create a new `User` record in the database. Upon success, it logs the action using Winston (`req.log`), generates a JWT, sets it as an HTTP-Only cookie, and sends the newly created user data back.

### `POST /login`

- **Controller:** `login`
- **What it does:** Extracts `email` and `password` from the request body. Calls the service layer to find the user by email and securely compare the hashed passwords. If it fails, it logs a warning. If it succeeds, it logs the login event, generates a JWT cookie, and sends the user data back.

### `GET /logout`

- **Controller:** `logout`
- **What it does:** Replaces the user's `jwt` cookie with a dummy string `"loggedout"` that expires in 5 seconds. This effectively destroys their session on the frontend.

---

## 👤 Users (`/api/v1/users`)

_All these routes require a valid JWT token. The `authenticate` middleware attaches the logged-in user to `req.user`._

### `GET /me`

- **Controller:** `getMe`
- **What it does:** A utility endpoint for the frontend. It passes `req.user` to the service layer (which ensures the user object exists) and returns the profile details of the currently logged-in user.

### `PATCH /me`

- **Controller:** `updateMe`
- **What it does:** Passes `req.body` and `req.user` to the service layer. The service layer strictly filters the incoming body so the user can only update safe fields (`fullName`, `bio`, `avatarUrl`) and saves the changes to the database.

### `GET /`

- **Controller:** `getAllUsers`
- **What it does:** Calls the service to fetch a list of all registered users on the platform (excluding sensitive data like passwords). This is primarily used by the frontend to populate dropdowns when inviting someone to a project.

### `GET /:id`

- **Controller:** `getUser`
- **What it does:** Fetches the public profile of a single specific user based on the UUID provided in the URL.

---

## 📁 Projects (`/api/v1/projects`)

_All these routes require authentication. The `:projectSlug` routes are protected by the `checkProjectAccess` middleware, ensuring only project members or platform `SUPER_ADMIN`s can access them._

### `GET /`

- **Controller:** `getAllProjects`
- **What it does:** Calls the service layer to fetch all projects where the currently authenticated user (`req.user.id`) exists as a member in the `project_users` junction table. Used to populate the user's dashboard.

### `POST /`

- **Controller:** `createProject`
- **What it does:** Extracts `name` and `description` from `req.body`. Calls the service which: (a) generates a unique URL-friendly slug, (b) creates the project in the DB, and (c) creates a `project_users` record that automatically assigns the creator as the `owner`.

### `GET /:projectSlug`

- **Controller:** `getProject`
- **What it does:** Extracts the project slug from the URL. The `checkProjectAccess` middleware first verifies the user is a member of the project. Then, this controller calls the service to retrieve the full project details, including member list and roles.

### `PATCH /:projectSlug`

- **Controller:** `updateProject`
- **What it does:** Passes the URL slug and `req.body` to the service layer to update details about the project (e.g., renaming it or changing its status to `archived`).

### `DELETE /:projectSlug`

- **Controller:** `deleteProject`
- **What it does:** Calls the service to find and permanently delete the project from the database. Because of `CASCADE` constraints in your DB, this also cleanly deletes all project memberships.

---

## 🤝 Project Members (`/api/v1/projects/:projectSlug/members`)

_This is a nested router inheriting `:projectSlug`. It requires authentication and project membership (`checkProjectAccess`). Mutating endpoints (POST, PATCH, DELETE) are further restricted to only users who hold the `owner` or `manager` role in the project (or platform `SUPER_ADMIN`s)._

### `GET /`

- **Controller:** `getProjectMembers`
- **What it does:** Calls the service to fetch all members (and their respective roles like `developer`, `tester`, etc.) for the specific project defined in the URL.

### `POST /`

- **Controller:** `addProjectMember`
- **Access Level:** Only `OWNER`, `MANAGER`, or `SUPER_ADMIN`
- **What it does:** Extracts a target `userId` and a `projectRole` from `req.body`. The service layer checks if that target user exists, ensures they aren't already in the project, and then creates a new `project_users` record linking them to the project.

### `PATCH /:userId`

- **Controller:** `updateMemberRole`
- **Access Level:** Only `OWNER`, `MANAGER`, or `SUPER_ADMIN`
- **What it does:** Extracts the target `userId` from the URL and the new `projectRole` from the body. The service layer applies the change, but explicitly guards against changing the `owner`'s role directly (to prevent a project from being left ownerless).

### `DELETE /:userId`

- **Controller:** `removeProjectMember`
- **Access Level:** Only `OWNER`, `MANAGER`, or `SUPER_ADMIN`
- **What it does:** Extracts the target `userId` from the URL. The service layer finds their membership record and destroys it. Like the update controller, it has strict guards to prevent the project `owner` from being removed.
