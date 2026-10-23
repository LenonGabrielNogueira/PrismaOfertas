🛍️ PrismaOfertas

👉 See it live: www.prismaofertas.netlify.app

A modern Smart E-commerce platform built with cutting-edge technologies from the JavaScript ecosystem, prioritizing performance, scalability, security, and user experience.

📖 About the Project

PrismaOfertas is a Full Stack application created to serve as a professional foundation for modern online stores.

The system was built using a modular, scalable, and easy-to-maintain architecture, allowing complete management of products, categories, user authentication, cloud image storage, price monitoring, automations, and an administrative dashboard.

The goal of the project is to bring together the best tools on the market in a single platform, providing a fast, secure, and intuitive experience for both customers and administrators.

🚀 Key Features
🛒 Complete product catalog
🔎 Dynamic search
❤️ Favorites system
📂 Category management
👤 Secure authentication
🔐 Access control
🛠 Administrative dashboard
📷 Image upload
☁️ Cloud storage
⚡ Background jobs
📱 Responsive interface
🚀 High performance
🔒 Security
🏗️ Architecture

The project follows a modern Full Stack architecture based on independent components.

Client
│
▼
Next.js + JavaScript
│
▼
Node.js
│
▼
Prisma ORM
│
▼
Neon PostgreSQL

External services:

Clerk
AWS S3
ImageKit
Inngest

The entire architecture was planned with the following goals in mind:

Scalability
Organization
Modularity
Ease of maintenance
Clean code
High performance
💻 Tech Stack
Frontend
JavaScript (ES6+)
Tailwind CSS
Backend

Node.js

Responsible for:

APIs
Business logic
Database communication
Asynchronous processing
Integration between services
Database

Prisma ORM

Prisma acts as the database access layer, offering:

Modern ORM
Relationships
Migrations
Optimized queries
Security
Ease of maintenance

Neon PostgreSQL

A Serverless database based on PostgreSQL.

Stores:

Products
Categories
Users
Favorites
Settings
Administrative data
Authentication

Clerk

All user management is handled using Clerk.

Features:

Sign up
Login
Logout
Sessions
Middleware
Protected routes
Permission control
File Upload

AWS S3

Used for secure file storage.

Benefits:

High availability
Scalability
Security
Excellent performance
Image Management

ImageKit

Responsible for automatic image optimization.

Features:

Compression
CDN
Resizing
Automatic conversion
Faster loading
Automations

Inngest

Runs background tasks.

Examples:

Automatic price updates
Periodic monitoring
Queue processing
Scheduled jobs
Asynchronous executions
⚙️ Features
🛒 Products
Creation
Updating
Deletion
Search
Pagination
Images
Descriptions
Prices
Promotions
📂 Categories

Smart organization of products.

🔎 Search

Fast search system for locating products.

❤️ Favorites

Authenticated users can save favorite products.

👤 Users

Complete management through Clerk.

🛠 Administration

Exclusive dashboard for administrators.

Allows:

Managing products
Updating prices
Managing categories
General administration
📱 Responsiveness

Interface built using the Mobile First concept, working perfectly on:

Desktop
Laptop
Tablet
Smartphone
🚀 Performance

Several techniques were applied to optimize the application.

Among them:

Lazy Loading
Image compression
CDN
Optimized queries
Componentization
Modular code
Background Jobs
Asynchronous processing
🔒 Security

The system uses modern development best practices.

Including:

Secure authentication
Protected routes
Middleware
Data validation
Access control
Secure sessions
📦 Project Structure
app/
components/
lib/
actions/
hooks/
prisma/
public/
styles/

Organized following best practices to ease maintenance and scalability.

⚡ Installation

Clone the project

bash
git clone https://github.com/LenonGabrielNogueira/PrismaOfertas.git

Enter the folder

bash
cd PrismaOfertas

Install dependencies

bash
npm install

Configure the file

.env

Run the migrations

bash
npx prisma migrate dev

Start the project

bash
npm run dev
📌 Technologies
Node.js
JavaScript
Prisma ORM
Neon PostgreSQL
Tailwind CSS
Clerk
AWS S3
ImageKit
Inngest
🎯 Goals

This project was developed with the following goals:

Professional architecture
Scalability
Security
High performance
Clean code
Organization
Ease of maintenance
User experience

Besides serving as a portfolio project demonstrating knowledge of modern Full Stack development.

📈 Future Implementations
Reviews system
Price history
Analytics dashboard
Wishlist
Product comparison tool
Integration with external APIs
Coupon system
Online payments
Marketplace
Artificial Intelligence for recommendations
👨‍💻 Author

Lenon Gabriel Nogueira

Full Stack Developer passionate about technology, automation, and the development of modern applications using the JavaScript ecosystem.

⭐ PrismaOfertas

If this project was useful to you, please consider leaving a ⭐ on the repository.
