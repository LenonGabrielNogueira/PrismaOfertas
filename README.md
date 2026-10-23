# 🛍️ PrismaOfertas

![PrismaOfertas Logo](logo)

### 👉 [**See it live →[ YOUR-SITE-LINK**](YOUR-SITE-LINK)](https://prismaofertas.netlify.app/)

A modern, smart e-commerce platform built with cutting-edge technologies from the JavaScript ecosystem, prioritizing performance, scalability, security, and user experience.

> 💼 **Need a store like this for your business?** Explore the live demo above, browse the code below, and get in touch. Let's build yours.

## 📖 About the Project

PrismaOfertas is a Full Stack application created to serve as a professional foundation for modern online stores.

It was built with a modular, scalable, and easy-to-maintain architecture, allowing complete management of products, categories, user authentication, cloud image storage, price monitoring, automations, and an administrative dashboard.

The goal is to bring together the best tools on the market in a single platform, providing a fast, secure, and intuitive experience for both customers and administrators.

## 🚀 Key Features

- 🛒 Complete product catalog
- 🔎 Dynamic search
- ❤️ Favorites system
- 📂 Category management
- 👤 Secure authentication
- 🔐 Access control
- 🛠 Administrative dashboard
- 📷 Image upload
- ☁️ Cloud storage
- ⚡ Background jobs
- 📱 Responsive interface
- 🚀 High performance
- 🔒 Security

## 🏗️ Architecture

The project follows a modern Full Stack architecture based on independent components.

```
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
```

**External services:** Clerk · AWS S3 · ImageKit · Inngest

The architecture was planned with these goals in mind: scalability, organization, modularity, ease of maintenance, clean code, and high performance.

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | JavaScript (ES6+), Next.js, Tailwind CSS |
| Backend | Node.js (APIs, business logic, database communication, async processing, service integration) |
| ORM | Prisma (relationships, migrations, optimized queries) |
| Database | Neon PostgreSQL (serverless) |
| Authentication | Clerk (sign up, login, sessions, middleware, protected routes, permissions) |
| File storage | AWS S3 (high availability, scalability, security) |
| Image delivery | ImageKit (compression, CDN, resizing, automatic conversion) |
| Automations | Inngest (price updates, periodic monitoring, queues, scheduled jobs) |

The database stores products, categories, users, favorites, settings, and administrative data.

## ⚙️ Features

### 🛒 Products
Creation, updating, deletion, search, pagination, images, descriptions, prices, and promotions.

### 📂 Categories
Smart organization of products.

### 🔎 Search
Fast search system for locating products.

### ❤️ Favorites
Authenticated users can save favorite products.

### 👤 Users
Complete user management through Clerk.

### 🛠 Administration
Exclusive dashboard for administrators: manage products, update prices, manage categories, and general administration.

### 📱 Responsiveness
Built with a Mobile First approach, working on desktop, laptop, tablet, and smartphone.

## 🚀 Performance

- Lazy loading
- Image compression
- CDN
- Optimized queries
- Componentization
- Modular code
- Background jobs
- Asynchronous processing

## 🔒 Security

- Secure authentication
- Protected routes
- Middleware
- Data validation
- Access control
- Secure sessions

## 📦 Project Structure

```
app/
components/
lib/
actions/
hooks/
prisma/
public/
styles/
```

Organized following best practices to ease maintenance and scalability.

## ⚡ Getting Started

```bash
# Clone the project
git clone https://github.com/LenonGabrielNogueira/PrismaOfertas.git

# Enter the folder
cd PrismaOfertas

# Install dependencies
npm install

# Configure your environment variables
# (create a .env file)

# Run the migrations
npx prisma migrate dev

# Start the project
npm run dev
```

## 🎯 Goals

- Professional architecture
- Scalability
- Security
- High performance
- Clean code
- Organization
- Ease of maintenance
- Great user experience

It also serves as a portfolio project demonstrating modern Full Stack development skills.

## 📈 Roadmap

- Reviews system
- Price history
- Analytics dashboard
- Wishlist
- Product comparison tool
- Integration with external APIs
- Coupon system
- Online payments
- Marketplace
- AI-powered recommendations

## 👨‍💻 Author

**Lenon Gabriel Nogueira**

Full Stack Developer passionate about technology, automation, and building modern applications with the JavaScript ecosystem.

📩 **Open to freelance projects.** Contact me on [Upwork](YOUR-UPWORK-PROFILE-LINK) or via [GitHub](https://github.com/LenonGabrielNogueira).

## ⭐ Support

If this project was useful to you, please consider leaving a ⭐ on the repository.
