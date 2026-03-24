# SOLARIS LUX — Backend API

> **Powering the SmartCharge Experience.** A robust, secure, and scalable API built with Laravel 11 to handle orders, products, and user management for the Solaris Lux ecosystem.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![Sanctum](https://img.shields.io/badge/Auth-Sanctum-success)](https://laravel.com/docs/sanctum)

---

## 🛠️ Tech Stack & Features

- **Framework**: Laravel 11 (PHP 8.2+)
- **Authentication**: Secure token-based auth via **Laravel Sanctum**.
- **Database**: Eloquent ORM with support for MySQL/PostgreSQL/SQLite.
- **Security**: Granular access control with custom **Admin Middleware**.
- **Architecture**: RESTful API design with dedicated Controllers and Request validation.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/register` | Register a new user | Public |
| POST | `/api/login` | Login and get access token | Public |
| GET | `/api/user` | Get authenticated user info | User |
| POST | `/api/logout` | Revoke access token | User |

### Products
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/products` | List all products | Public |
| GET | `/api/products/{id}` | Get product details | Public |
| POST | `/api/products` | Create a product | **Admin** |
| PUT | `/api/products/{id}` | Update a product | **Admin** |
| DELETE | `/api/products/{id}` | Delete a product | **Admin** |

### Orders
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/orders` | List user orders | User |
| POST | `/api/orders` | Place a new order | User |

---

## 🚀 Setup & Installation

### 1. Environment Configuration
Copy the default environment file and set your database credentials:
```bash
cp .env.example .env
```

### 2. Install Dependencies
```bash
composer install
```

### 3. Generate Key & Migrate
```bash
php artisan key:generate
php artisan migrate --seed
```

### 4. Start Server
```bash
php artisan serve
```

---

## 📐 Database Schema
The system uses a relational schema designed for e-commerce performance:
- `users`: Customer accounts and admin profiles.
- `products`: Product catalogue with pricing and descriptions.
- `orders`: Transaction headers linked to users.
- `order_items`: Detailed lines for each order (Snapshotting price at purchase).

---

## 🛡️ Security
- All sensitive routes are protected by the `auth:sanctum` middleware.
- Administrative routes (`/api/products` for mutations) require the custom `admin` middleware.
