# SOLARIS LUX — Backend API

> **The Digital Core of Power.** A hardened, high-performance API ecosystem built with Laravel 11. Engineered for reliability, security, and seamless energy management within the Solaris Lux portfolio.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![Sanctum](https://img.shields.io/badge/Auth-Sanctum-success)](https://laravel.com/docs/sanctum)

---

## 🛠️ Tech Stack & Features

- **Framework**: Laravel 11 / PHP 8.2+
- **Security**: 2025 Hardened standards featuring **Mass Assignment Prevention**, **IDOR mitigation**, and strictly scoped relationships.
- **Authentication**: High-security token management via **Laravel Sanctum** with API Throttling.
- **Architecture**: Domain-driven RESTful patterns with dedicated Controllers and comprehensive Validation.

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

## 🛡️ Security Posture
Solaris Lux prioritizes data integrity and access security:
- **Rate Limiting**: Login endpoints are protected against brute-force attacks via `throttle:6,1`.
- **Sanctum Protection**: All non-public routes require a valid Bearer token.
- **RBAC (Role-Based Access Control)**: Administrative mutations are strictly guarded by custom `admin` middleware and null-safe user validation.
- **Mass Assignment Hardening**: Critical models (`User`, `Order`, `OrderItem`) use strict `$fillable` configurations to prevent unauthorized attribute manipulation.
