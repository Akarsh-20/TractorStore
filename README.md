# Tractor Store 🚜

A premium, front-end web application built for browsing, managing, and showcasing agricultural equipment. This project integrates with the Fake Store API, transforming its generic payload into a realistic Tractor Store catalog using a robust local persistence layer to support creation, editing, and deletion across sessions.

## 🚀 Technologies Used
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios (with custom interceptors)
- **State/Persistence:** React Hooks & `localStorage`

## ✨ Features
- **Authentication:** Secure login with mock JWT storage. Includes an automatic redirect on session expiration.
- **Local Sign-Up Flow:** Create new accounts locally that persist across reloads.
- **Dynamic Catalog:** Transforms the standard Fake Store API data into authentic tractor models with realistic pricing and custom imagery.
- **CRUD Operations:**
  - View detailed specifications on dedicated product pages.
  - Add new tractors with a highly polished form.
  - Edit existing products.
  - Delete products with native confirmation prompts.
- **Local Persistence:** Edits and newly created products are saved in the browser's local storage to mock a complete backend experience seamlessly.

## 💻 How to Run the Application Locally

Follow these steps to get the Tractor Store running on your local machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 2. Install Dependencies
Open your terminal, navigate to the root directory of the project, and run:
```bash
npm install
```

### 3. Start the Development Server
Once dependencies are installed, start the Vite development server:
```bash
npm run dev
```

### 4. View the App
Open your browser and navigate to the local server URL provided in your terminal (typically `http://localhost:5173` or `http://localhost:5174`).

### 5. Test Credentials
To explore the application without creating a new account, you can use the default Fake Store API credentials:
- **Username:** `mor_2314`
- **Password:** `83r5^_`

Alternatively, you can click "Sign Up" on the login page to create your own local account!

---
*Developed by Akarsh-20*
