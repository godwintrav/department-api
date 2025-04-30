# Department Management API

A NestJS-based GraphQL API for managing departments and sub-departments with authentication, built using:
- NestJS
- GraphQL
- TypeORM
- PostgreSQL
- TypeScript

## Features

- JWT Authentication
- Department CRUD operations
- Sub-Department CRUD operations
- Pagination for departments
- Input validation
- Type-safe GraphQL schema

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL
- npm

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/godwintrav/department-api.git
cd department-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database and store the name in your `DB_NAME` environment variable

### 4. Environment Configuration (Required)

For production, create a `.env` file by looking at the variables required in `.env.example`:

```
DB_TYPE=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
SECRET_KEY=
PORT=
```

### 5. Run the application

```bash
npm run start:dev
```

The GraphQL playground will be available at:  
`http://localhost:3000/graphql`

## API Documentation

### Health

**Health:**
```graphql
query Query {
  health
}
```

### Authentication

**Login:**
```graphql
mutation {
  login(input: {
    username: "admin",
    password: "password"
  }) {
    accessToken
  }
}
```

The access token returned should be passed to all protected routes header like this: `'Authorization': 'Bearer <accessToken>'`

Note: This mutation creates a new user if the user doesn't exist but if the user does exist it verifies the credentials.

## Protected Routes:

### Department Operations (PROTECTED ROUTE REQUIRES AUTHORIZATION HEADER WITH BEARER TOKEN)

**Create Department:**
```graphql
mutation {
  createDepartment(input: {
    name: "Finance",
    subDepartments: [
      { name: "Accounts" },
      { name: "Audit" }
    ]
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

**Get Departments (with pagination):**
```graphql
query {
  departments(page: 1, limit: 10 ) {
    departments {
      id
      name
      subDepartments {
        id
        name
      }
    }
    pagination {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
```

**Get Department:**
```graphql
query {
  department(id: 1) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

**Update Department:**
```graphql
mutation {
  updateDepartment(id: 1, input: {
    name: "Updated Department Name"
  }) {
    id
    name
  }
}
```

**Delete Department:**
```graphql
mutation {
  deleteDepartment(id: 1)
}
```

### Sub-Department Operations (PROTECTED ROUTE REQUIRES AUTHORIZATION HEADER WITH BEARER TOKEN)

**Create Sub-Department:**
```graphql
mutation {
  createSubDepartment(input: {
    name: "New Sub-Department",
    departmentId: 1
  }) {
    id
    name
  }
}
```

**Get Sub-Departments by Department:**
```graphql
query {
  subDepartmentsByDepartment(departmentId: 1) {
    id
    name
  }
}
```

**Get All Sub-Departments:**
```graphql
query {
  subDepartments {
    id
    name
  }
}
```

**Get Sub-Department:**
```graphql
query {
  subDepartment(id: 1) {
    id
    name
  }
}
```

**Delete Sub-Department:**
```graphql
mutation {
  deleteSubDepartment(id: 1)
}
```

**Update Sub-Department:**
```graphql
mutation {
  updateSubDepartment(id: 1, input: {
    name: "Updated SubDepartment Name"
  }) {
    id
    name
  }
}
```

## Production Deployment

PROD URL: https://department-graphql-api.onrender.com

## License

[MIT License](LICENSE)

---
