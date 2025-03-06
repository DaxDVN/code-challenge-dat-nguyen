# 🎬 Theater Management API

## 📖 Introduction

This project is a simple **backend service** built with **Express.js** and **TypeScript**, providing a CRUD API to manage theaters.  
The data is stored in **MongoDB**, and the API supports **filtering** and **pagination**.

📄 Notes
Soft delete is implemented using an isDeleted field.
MongoDB ObjectId format is validated before querying the database.
Request body validation is handled using Joi.
Error handling is implemented for database errors, invalid inputs, and missing resources.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Joi (for request validation)
- dotenv (for environment variables)

---

## 📂 Project Structure

|-- .env
|-- .gitignore
|-- nodemon.json
|-- package-lock.json
|-- package.json
|-- Readme.md
|-- tsconfig.json
|-- src
|-- index.ts
|-- config
|-- database.ts
|-- controllers
|-- theater.controllers.ts
|-- middleware
|-- validation.middleware.ts
|-- models
|-- theater.model.ts
|-- routes
|-- theater.routes.ts

## ⚙️ Installation & Setup

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in the project root with the following content:

   ```
   PORT=3000
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## 📬 API Endpoints

### Base URL

http://localhost:3000/theaters

### Endpoints

| Method   | Endpoint        | Description                             |
| -------- | --------------- | --------------------------------------- |
| `GET`    | `/theaters`     | List theaters with filters & pagination |
| `GET`    | `/theaters/:id` | Get details of a specific theater       |
| `POST`   | `/theaters`     | Create a new theater                    |
| `PUT`    | `/theaters/:id` | Update an existing theater              |
| `DELETE` | `/theaters/:id` | Soft delete a theater                   |

---

## 🔎 Query Parameters (GET /theaters)

| Parameter | Type     | Description                                                      |
| --------- | -------- | ---------------------------------------------------------------- |
| `street1` | `string` | Filter theaters by street name (partial match, case-insensitive) |
| `city`    | `string` | Filter theaters by city name (partial match, case-insensitive)   |
| `page`    | `number` | Page number (default: `1`)                                       |
| `limit`   | `number` | Number of items per page (default: `20`)                         |

---

## 🧰 Data Model (Theater)

```json
{
  "_id": "659b9f2f3cfc4a3f5f5a3f4d",
  "theaterId": 1000,
  "location": {
    "address": {
      "street1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipcode": "10001"
    },
    "geo": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    }
  },
  "isDeleted": false
}
```

## Request Body Example:

```json
{
  "theaterId": 1001,
  "location": {
    "address": {
      "street1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipcode": "10001"
    },
    "geo": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    }
  }
}
```
