# SOLARIS LUX — SmartCharge Edition

> **Premium Wireless Charging Experience.** High-performance induction charging for tech-centric environments. Designed with an industrial aesthetic and powered by modern web technologies.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R183-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-PHP-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)

---

## 🌟 Overview

**Solaris Lux** is more than just a website; it’s a high-end technological showroom where industrial aesthetics meet cutting-edge web performance. 

Designed to redefine the standard e-commerce journey, this platform showcases the **SmartCharge V1** through an immersive digital experience. By merging **React 19** with interactive 3D rendering via **Three.js** and seamless **GSAP** animations, I’ve crafted an interface that does more than just display a product—it tells its story at every scroll. Under the hood, a secure **Laravel 11** API ensures a reliable and elegant full-stack experience.

### Key Features
▸ **Immersive 3D Visualization**: Interactive product rendering using **React Three Fiber** and **Three.js**.
▸ **Dynamic Animations**: Fluid transitions and micro-interactions powered by **GSAP** and **Framer Motion**.
▸ **Industrial Aesthetics**: A "Luxury Industrial" design system built with **Tailwind CSS 4**, featuring glassmorphism and real-time lighting effects.
▸ **Full-Stack Architecture**: A robust decoupled architecture with a **React 19** frontend and a **Laravel 11** backend.
▸ **High Performance**: Optimized for speed, 60 FPS rendering, and responsiveness using Vite 8.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite 8)
- **Styling**: Tailwind CSS 4 (Custom Design System)
- **3D Engine**: Three.js / React Three Fiber
- **Motion**: GSAP, Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: Laravel (PHP)
- **Database**: MySQL / SQLite (configurable)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- PHP (v8.2+) & Composer

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Youssef-adl/Product.git
   cd Product
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

---

## 📐 Architecture

The site is designed as an immersive **Single Page Application (SPA)**, structured logically for maximum conversion and storytelling:
1. **Hero**: High-impact visual entrance with 3D parallax.
2. **Features**: Technical innovation highlights.
3. **Engineering**: Deep dive into material quality and industrial design.
4. **Specs**: Detailed technical specifications.

---

## 🤝 Contribution & License

Designed with passion for the **SmartCharge** community.
*License: MIT*
