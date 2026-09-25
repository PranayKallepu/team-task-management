# Team Task Management SaaS

## Project Overview

This project is a fully-featured, Jira-like project management SaaS application. It is designed to help teams and individuals efficiently plan, track, and manage their software development lifecycle and day-to-day tasks.

The core philosophy of this application is **Project-Based Organization**. Users can sign up, create isolated projects, invite team members, and assign trackable tasks (tickets) to ensure everyone knows exactly what they need to work on.

## Key Features

- **Authentication & User Management:** Secure sign-up, login, and user profile management.
- **Project Workspaces:** Users can create multiple projects and also act as invitees in projects created by others.
- **Role-Based Access Control:** Projects have specific roles (Owner, Manager, Developer, Code Reviewer, Tester) dictating what actions a user can take.
- **Ticketing System:** Comprehensive task tracking including states, priorities, types, and assignments.
- **Interactive Boards:** Visual representations of project progress (similar to Jira boards).

## Application Architecture

This project is structured as a full-stack JavaScript/TypeScript application, separated into two main directories:

1. **`/frontend`**: The client-facing web application. Handles UI, state management, and routing.
2. **`/backend`**: The RESTful API server. Handles business logic, database transactions, and authentication.
