# 📚 School Management API

A Node.js + TypeScript API built with Express and Prisma ORM, using MySQL for data storage. Designed to manage school records and support geolocation-based queries.

---

## 🚀 Features

- Built with **TypeScript**
- **Prisma ORM** + **MySQL**
- Add and retrieve school information
- Find the **nearest school** based on coordinates

---

## 📁 Project Structure
```
.
├── dist/                   # Compiled JavaScript output
├── node_modules/
├── prisma/
│   ├── generated/          # Generated Prisma client
│   ├── migrations/         # Migration files
│   └── schema.prisma       # Prisma schema definition
├── src/
│   ├── controllers/        # Controller logic
│   ├── routes/
│   ├── prisma.ts           # Prisma client instance
│   └── server.ts           # Entry point of the app
├── .env                    # Environment variables
├── package.json
├── tsconfig.json           # TypeScript config
└── README.md
```

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/school-management-api
cd school-management-api

# Install dependencies
npm install
```

---

## 🛠️ Setup

1. **Configure Environment Variables:**

Create a `.env` file in the root:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database"
```

2. **Generate Prisma Client:**

```bash
npx prisma generate
```

3. **Run Migrations:**

```bash
npx prisma migrate dev --name init
```

---

## 🧪 Development

Run the project in development mode:

```bash
npm run dev
```

This uses `ts-node` with ESM support to run `src/server.ts`.

---

## 🏗️ Build

To build the project (compile TypeScript into JavaScript):

```bash
npm run build
```

Compiled files will go into the `dist/` directory.

---

## 🚀 Deploying

1. **Set `DATABASE_URL`** in your deployment platform (e.g., Railway or Vercel).
2. **Build the app:**

```bash
npm run build
```

3. **Run the compiled app:**

```bash
npm start
```

---

## 🧩 Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **Prisma ORM**
- **MySQL**
- **dotenv**

---

## 📝 API Endpoints

### 1. Add School

- **Endpoint**: `POST /api/schools/addSchool`
- **Description**: Adds a new school to the system.
- **Request Body**:
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 34.0522,
    "longitude": -118.2437
  }
  ```
- **Response**:
  ```json
  {
    "message": "School added successfully",
    "school": {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 34.0522,
      "longitude": -118.2437
    }
  }
  ```

### 2. List Schools

- **Endpoint**: `GET /api/schools/listSchools`
- **Description**: Fetches and sorts schools based on proximity to the user's location.
- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 34.0522,
      "longitude": -118.2437,
      "distance": 0.5
    }
  ]
  ```

---

## 📬 Contact

For questions or contributions, feel free to open an issue or a PR.

---

## 📝 License

This project is open-source and available under the MIT License.
