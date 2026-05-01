<div align="center">

# 📝 megaBlogs

### A modern, full-featured blog platform where anyone can write, share, and explore ideas.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Backend-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://mega-blogs-one.vercel.app/)

**[🌐 Live Demo](https://mega-blogs-one.vercel.app/) · [🐛 Report a Bug](https://github.com/Sajalsinghal17/megaBlogs/issues) · [✨ Request a Feature](https://github.com/Sajalsinghal17/megaBlogs/issues)**

![megaBlogs Preview](./megaBlogs%20preview.png)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Appwrite Setup](#appwrite-setup)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About the Project

**megaBlogs** is a full-stack blog platform built with React and powered by Appwrite as a Backend-as-a-Service. It allows users to create accounts, write richly formatted blog posts using a WYSIWYG editor, and browse posts shared by others — all in a clean, responsive UI.

This project was built to demonstrate a production-grade React architecture using real-world patterns: centralized state management with Redux Toolkit, form handling with React Hook Form, protected routing, and seamless cloud backend integration with Appwrite.

---

## ✨ Features

- 🔐 **User Authentication** — Sign up, log in, and log out securely via Appwrite Auth
- ✍️ **Rich Text Editor** — Write beautifully formatted posts using TinyMCE WYSIWYG editor
- 🖼️ **Image Upload** — Attach a featured image to your blog post via Appwrite Storage
- 📄 **Create / Edit / Delete Posts** — Full CRUD operations on blog posts
- 🔒 **Protected Routes** — Only authenticated users can create or manage posts
- 👁️ **Public Blog Feed** — Anyone can browse and read published posts
- 📱 **Responsive Design** — Fully mobile-friendly UI built with Tailwind CSS
- ⚡ **Fast & Optimized** — Powered by Vite for near-instant dev server and optimized builds
- 🗂️ **Global State Management** — Auth state and post data managed cleanly with Redux Toolkit

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Backend / BaaS** | Appwrite (Auth, Database, Storage) |
| **State Management** | Redux Toolkit + React Redux |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v3 |
| **Rich Text Editor** | TinyMCE (via `@tinymce/tinymce-react`) |
| **Form Handling** | React Hook Form |
| **HTML Rendering** | html-react-parser |
| **Icons** | React Icons |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
megaBlogs/
├── public/                  # Static assets
├── src/
│   ├── appwrite/            # Appwrite service configuration (auth, db, storage)
│   ├── components/          # Reusable UI components (Header, Footer, PostCard, etc.)
│   ├── pages/               # Route-level page components (Home, Login, AddPost, etc.)
│   ├── store/               # Redux store setup and slices
│   ├── App.jsx              # Root component with routing
│   └── main.jsx             # App entry point
├── .env.sample              # Sample environment variable file
├── index.html               # HTML entry point
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An [Appwrite](https://appwrite.io/) account (free tier works perfectly)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sajalsinghal17/megaBlogs.git
   cd megaBlogs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Appwrite Setup

You need to set up an Appwrite project to power the backend. Follow these steps:

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io/) and create a free account.
2. Create a new **Project** and note the **Project ID**.
3. Under **Databases**, create a new database and a collection for blog posts with the following attributes:
   - `title` (string, required)
   - `content` (string, required)
   - `featuredImage` (string)
   - `status` (string — e.g., `active` or `inactive`)
   - `userId` (string, required)
4. Under **Storage**, create a new **Bucket** for storing featured images.
5. Configure **Authentication** — enable Email/Password sign-in method.
6. Add your deployment URL (e.g., `https://mega-blogs-one.vercel.app`) and `localhost:5173` to the **Platforms / Hostnames** list in your project settings.

### Environment Variables

Create a `.env` file in the root directory by copying the sample:

```bash
cp .env.sample .env
```

Then fill in your Appwrite credentials:

```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABSE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```

> ⚠️ Never commit your `.env` file to version control. It is already included in `.gitignore`.

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 🚢 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and import the repository.
3. In the Vercel project settings, add all the environment variables from your `.env` file under **Settings → Environment Variables**.
4. Deploy! Vercel will automatically build and serve the app.

> Remember to add your Vercel deployment URL to the allowed hostnames in your Appwrite project settings.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve megaBlogs, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes and commit them (`git commit -m 'Add: your feature description'`)
4. Push to your branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

Please make sure your code follows the existing code style and passes lint checks before submitting.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [Sajal Singhal](https://github.com/Sajalsinghal17)

⭐ If you found this project helpful, consider giving it a star!

</div>