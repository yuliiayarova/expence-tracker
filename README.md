# 💸 Expense Tracker

An easy-to-use expense tracker for recording spending, organizing finances, and
staying in control of your money.

🔗 **[Live Demo](https://expence-tracker-teal-one.vercel.app/)**

---

## 🎯 Project Purpose

**Expense Tracker** was developed as a collaborative team project to practice
modern frontend development. The goal was to build a real-world financial
tracking application focusing on:

- **Dynamic UI updates** and state management.
- **Data visualization** for financial insights.
- **Responsive design** for seamless use across devices.
- **Static typing** for robust and scalable code.

---

## 🚀 Features

### 💰 Expense Management

- **CRUD Operations:** Add, edit, and delete expenses easily.
- **Categorization:** Group transactions by categories.
- **History:** Track and filter expenses by date using specialized pickers.

### 📊 Analytics & Insights

- **Visual Data:** Interactive charts powered by **Recharts**.
- **Spend Analysis:** Clear overview of financial habits through category-based
  breakdowns.

### 📝 Forms & UX

- **Validation:** Robust forms managed by **Formik** and **Yup**.
- **Masked Inputs:** Clean data entry with **react-imask**.
- **Image Handling:** Profile or receipt cropping with **react-easy-crop**.
- **Feedback:** Real-time notifications via **React Hot Toast**.

---

## 🛠️ Tech Stack

### Core

- **Next.js 16** (App Router) & **React 19**
- **TypeScript** for static typing
- **Zustand** for global state management
- **TanStack Query (v5)** for server state handling
- **Axios** for API requests

### UI & Styling

- **Tailwind CSS 4** — for modern, utility-first styling.
- **AG Grid React** — for high-performance data tables.
- **Recharts** — for data visualization.
- **React Use** — for essential custom hooks.

---

## ⚙️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/vjosik/expence-tracker.git](https://github.com/vjosik/expence-tracker.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:** Create a `.env.local` file in the root directory
    and add the following:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **Open the app:** Visit [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 The Team

- **Ігор Вжос** — Team Lead
- **Діана Пригожина** — Scrum Master
- **Анастасія Загляда** — Developer
- **Юлія Ярова** — Developer
- **Артем Багно** — Developer
- **Тася Штик** — Developer
- **Роман Кузишин** — Developer

---

### 🧪 Project Maintenance

- `npm run build` — Production build.
- `npm run lint` — Code quality check with ESLint.
- **Styling:** Tailwind CSS 4, PostCSS, Normalize.css.
