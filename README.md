# 📚 expressBookReviews - Books Management System
**expressBookReviews** is a RESTful web application built with **Node.js** and **Express.js** that empowers users to browse a book catalog, search by ISBN/author/title, and manage personalized reviews with secure authentication. It showcases asynchronous programming patterns through **callbacks**, **Promises**, and **async/await**, enabling efficient data handling for book queries and user interactions.

---
## 🚀 Features
- 📖 **Book Catalog Browsing**: Fetch and display all available books in the shop with detailed metadata.
- 🔍 **Smart Search**: Query books by ISBN, author, or title for quick, precise results.
- 💬 **Review Management**: View, add, modify, or delete book reviews—limited to authenticated users for their own entries.
- 🔐 **User Authentication**: Secure registration and login system to protect review actions.
- ⚡ **Async Operations**: Seamless integration of callbacks, Promises, and async/await for non-blocking API responses.
- 🧪 **API Testing Ready**: Endpoints optimized for tools like Postman or direct browser calls.

---
## 🛠️ Built With
- **Node.js** – Runtime environment for server-side execution
- **Express.js** – Lightweight framework for building RESTful APIs
- **JavaScript (ES6+)** – Core language with modern async features (Promises, async/await)
- **Standard Libraries** – Built-in modules for HTTP handling and data manipulation

---
## 🧠 How It Works
1. Users start by accessing the root endpoint to view all books or search via dedicated routes (e.g., `/books/isbn/:isbn` for ISBN lookup).
2. For reviews, authenticated users hit `/reviews/:isbn` to fetch existing ones, then POST/PUT/DELETE to manage their input.
3. Authentication flows through `/register` and `/login` endpoints, generating tokens for protected routes.
4. Asynchronous tasks like fetching books by author/title use Promises or async/await to handle database-like queries without blocking.
5. All endpoints return JSON responses, with error handling for invalid inputs or unauthorized access.

---
## 🧪 Setup & Installation
```bash
git clone https://github.com/Preveen369/expressBookReviews.git
cd expressBookReviews
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser or use Postman to test APIs. No database setup required—uses in-memory data for demo purposes.
