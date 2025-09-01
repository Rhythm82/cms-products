# Product Management CMS

A full-stack Content Management System (CMS) for managing products, built with Next.js, React, Tailwind CSS, framer-motion, Node.js, Express, and MySQL.

## Features

- Product CRUD (Create, Read, Update, Delete)
- Soft delete (products are not permanently removed)
- Product status update (e.g., active/inactive)
- Responsive and modern UI
- Smooth animations with framer-motion

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, framer-motion
- **Backend:** Node.js, Express
- **Database:** MySQL

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MySQL server

### 1. Clone the Repository
```bash
git clone <repo-url>
cd CMS
```

### 2. Database Setup

Create a MySQL database and run the following schema:

```sql
CREATE DATABASE cms_db;
USE cms_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  deleted TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Backend Setup

```bash
cd backend
cp .env.example .env # Create your .env file if not present
# Edit .env with your MySQL credentials
npm install
npm run dev # or npm start
```

#### Example `.env` for Backend
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=cms_db
PORT=5000
```

### 4. Frontend Setup

```bash
cd ../frontend
cp .env.local.example .env.local # Create your .env.local if not present
# Edit .env.local to set NEXT_PUBLIC_API_URL (e.g., http://localhost:5000)
npm install
npm run dev
```

#### Example `.env.local` for Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Usage Guide

1. **Access the Frontend:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
2. **Product Management:**
   - Add, edit, delete (soft delete), and update the status of products from the admin interface.
   - Deleted products are not permanently removed and can be restored or permanently deleted if implemented.
3. **Responsive UI:**
   - The interface adapts to desktop and mobile devices.

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm start` – Start production server

---

## License

MIT
