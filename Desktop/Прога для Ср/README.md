# EduPlatform 🎓

[![Status](https://img.shields.io/badge/Status-MVP%20Ready-success)](.)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen)](.)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](.)
[![React](https://img.shields.io/badge/React-18.2-blue)](.)
[![Node](https://img.shields.io/badge/Node-20+-green)](.)

**🎉 Проект полностью готов к использованию! Все зависимости установлены, TypeScript компилируется без ошибок.**

> 📖 **Быстрый старт:** См. [QUICKSTART.md](./QUICKSTART.md)  
> 📊 **Технический отчёт:** См. [TECHNICAL_REPORT.md](./TECHNICAL_REPORT.md)

[English below](#english) | [Русский](#русский)

---

## Русский 🇷🇺

Современная образовательная платформа для онлайн-обучения, курсов, уроков и отслеживания прогресса.

### Оглавление
1. [Обзор](#обзор)
2. [Технологический стек](#технологический-стек)
3. [Список функций](#список-функций)
4. [Требования](#требования)
5. [Быстрый старт](#быстрый-старт)
6. [Локальная разработка](#локальная-разработка)
7. [Docker Compose](#docker-compose)
8. [База данных](#база-данных)
9. [Переменные окружения](#переменные-окружения)
10. [Тестирование на мобильных устройствах](#тестирование-на-мобильных-устройствах)
11. [Развертывание в Production](#развертывание-в-production)
12. [Свой домен](#свой-домен)
13. [HTTPS](#https)
14. [Установка PWA](#установка-pwa)
15. [Структура проекта](#структура-проекта)
16. [Документация API](#документация-api)
17. [Будущие функции](#будущие-функции)
18. [Вклад](#вклад)
19. [Лицензия](#лицензия)

### 1. Обзор 🌟
EduPlatform - это полностековое веб-приложение для управления образовательными курсами, ведения заметок, создания расписания и отслеживания успеваемости. Платформа также включает прогрессивное веб-приложение (PWA) для мобильных устройств.

### 2. Технологический стек 🛠
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router, Zustand (State)
- **Backend**: Node.js, Express, TypeScript, JWT (Auth)
- **База данных**: PostgreSQL 16
- **Инфраструктура**: Docker, Docker Compose, Nginx

### 3. Список функций 📋
- 🔐 JWT Аутентификация и Авторизация
- 📚 Управление курсами и уроками
- 📝 Личные заметки для каждого урока
- 📅 Календарь расписания
- 📊 Отслеживание прогресса
- 📱 Адаптивный дизайн (Mobile-first)
- 🚀 Поддержка PWA (Progressive Web App)

### 4. Требования ⚠️
- Node.js 20+
- PostgreSQL 14+
- Docker и Docker Compose (Опционально)

### 5. Быстрый старт 🚀
#### Вариант 1: Docker (Рекомендуется)
1. `cp .env.example .env` (отредактируйте переменные)
2. `docker compose up --build`
3. Откройте `http://localhost`

#### Вариант 2: Вручную
Смотрите раздел [Локальная разработка](#локальная-разработка)

#### Демо-режим
- Логин: `demo@example.com`
- Пароль: `Demo1234!`
*(Убедитесь, что выполнили сидирование БД `npm run db:seed`)*

### 6. Локальная разработка 💻

#### Backend
```bash
cd backend
npm install
cp ../.env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
cp ../.env.example .env
npm run dev
```
Откройте `http://localhost:5173`

### 7. Docker Compose 🐳
Для запуска через Docker:
1. Создайте `.env` файл на основе `.env.example`.
2. Измените `JWT_SECRET` и пароли БД.
3. Выполните:
```bash
docker compose up --build
```
Доступ: `http://localhost`

### 8. База данных 🗄️
- СУБД: PostgreSQL
- Строка подключения: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
- Миграции: `npm run db:migrate` (в папке backend)
- Заполнение (Seed): `npm run db:seed` (в папке backend)

### 9. Переменные окружения 🔐

| Имя | Описание | По умолчанию | Обязательно |
|-----|----------|--------------|-------------|
| `POSTGRES_USER` | Пользователь БД | `postgres` | Да |
| `POSTGRES_PASSWORD` | Пароль БД | (пусто) | Да |
| `POSTGRES_DB` | Имя БД | `eduplatform` | Да |
| `DATABASE_URL` | URL подключения | - | Да |
| `JWT_SECRET` | Секретный ключ JWT | - | Да |
| `PORT` | Порт Backend | `3001` | Нет |
| `CORS_ORIGIN` | Разрешенные домены | `http://localhost:5173` | Да |
| `VITE_API_URL` | URL API Backend | `http://localhost:3001` | Да |

### 10. Тестирование на мобильных устройствах 📱
1. Найдите ваш локальный IP (`ipconfig` на Windows / `ifconfig` на Mac/Linux).
2. Запустите frontend (`npm run dev`) - Vite по умолчанию прослушивает сеть благодаря настройке `host: true`.
3. Откройте `http://ВАШ_IP:5173` на телефоне, подключенном к той же Wi-Fi сети.

### 11. Развертывание в Production 🌍
a. **Frontend**: Разверните на Vercel или Netlify. Установите `VITE_API_URL` в настройках среды на URL вашего backend-а.
b. **Backend**: Разверните на Railway, Render или Fly.io. Настройте переменные `DATABASE_URL`, `CORS_ORIGIN` и `JWT_SECRET`.
c. **База данных**: Используйте Neon.tech, Supabase или Railway PostgreSQL.

### 12. Свой домен 🌐
- Настройте A-запись DNS на IP-адрес вашего сервера.
- Обновите `CORS_ORIGIN` в `.env` backend-а (например, `https://yourdomain.com`).
- Обновите `VITE_API_URL` в `.env` frontend-а (например, `https://api.yourdomain.com`).

### 13. HTTPS 🔒
- **Локально**: Для разработки не требуется.
- **Production (PaaS)**: Vercel, Railway, Render предоставляют HTTPS автоматически.
- **VPS**: Используйте Caddy или Nginx с Certbot (Let's Encrypt).

### 14. Установка PWA 📲
- **Android**: Откройте сайт в Chrome -> Нажмите меню '...' -> 'Добавить на главный экран' ('Add to Home Screen').
- **iOS**: Откройте сайт в Safari -> Нажмите Поделиться -> 'На экран "Домой"' ('Add to Home Screen').

### 15. Структура проекта 📂
```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── .env.example
```

### 16. Документация API 📜
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Авторизация
- `GET /api/auth/me` - Профиль
- `GET /api/courses` - Список курсов
- `GET /api/courses/:id` - Детали курса
- `GET /api/lessons/:id` - Детали урока
- `GET /api/notes` - Заметки пользователя
- `POST /api/notes` - Создать заметку
- `GET /api/schedule` - Расписание

### 17. Будущие функции 🚀
- 💳 Монетизация и платные курсы
- 📱 Полноценное нативное мобильное приложение (React Native)
- 💬 Чат и комментарии к урокам
- 🏆 Геймификация (достижения)

### 18. Вклад 🤝
Pull requests приветствуются. Для крупных изменений сначала откройте issue для обсуждения того, что вы хотели бы изменить.

### 19. Лицензия 📄
MIT

---

## English 🇬🇧

Modern educational platform for online learning, courses, lessons, and progress tracking.

### Table of Contents
1. [Overview](#1-overview-1)
2. [Tech Stack](#2-tech-stack-1)
3. [Features list](#3-features-list-1)
4. [Requirements](#4-requirements-1)
5. [Quick Start](#5-quick-start-1)
6. [Local Development](#6-local-development-1)
7. [Docker Compose](#7-docker-compose-1)
8. [Database](#8-database-1)
9. [Environment Variables](#9-environment-variables-1)
10. [Mobile Testing](#10-mobile-testing-1)
11. [Production Deployment](#11-production-deployment-1)
12. [Custom Domain](#12-custom-domain-1)
13. [HTTPS](#13-https-1)
14. [PWA Installation](#14-pwa-installation-1)
15. [Project Structure](#15-project-structure-1)
16. [API Documentation](#16-api-documentation-1)
17. [Future Features](#17-future-features-1)
18. [Contributing](#18-contributing-1)
19. [License](#19-license-1)

### 1. Overview 🌟
EduPlatform is a full-stack web application for managing educational courses, keeping notes, scheduling, and tracking student progress. The platform also includes a Progressive Web App (PWA) setup for mobile accessibility.

### 2. Tech Stack 🛠
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router, Zustand (State)
- **Backend**: Node.js, Express, TypeScript, JWT (Auth)
- **Database**: PostgreSQL 16
- **Infrastructure**: Docker, Docker Compose, Nginx

### 3. Features list 📋
- 🔐 JWT Authentication & Authorization
- 📚 Course and Lesson Management
- 📝 Personal Notes per Lesson
- 📅 Schedule Calendar
- 📊 Progress Tracking
- 📱 Responsive Design (Mobile-first)
- 🚀 Progressive Web App (PWA) Support

### 4. Requirements ⚠️
- Node.js 20+
- PostgreSQL 14+
- Docker & Docker Compose (Optional)

### 5. Quick Start 🚀
#### Option 1: Docker (Recommended)
1. `cp .env.example .env` (edit variables)
2. `docker compose up --build`
3. Open `http://localhost`

#### Option 2: Manual
See [Local Development](#6-local-development-1)

#### Demo Mode
- Login: `demo@example.com`
- Password: `Demo1234!`
*(Make sure to run db seed `npm run db:seed`)*

### 6. Local Development 💻

#### Backend
```bash
cd backend
npm install
cp ../.env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
cp ../.env.example .env
npm run dev
```
Open `http://localhost:5173`

### 7. Docker Compose 🐳
To run via Docker:
1. Copy `.env.example` to `.env`.
2. Edit `JWT_SECRET` and passwords.
3. Run:
```bash
docker compose up --build
```
Access: `http://localhost`

### 8. Database 🗄️
- Engine: PostgreSQL
- Connection string format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
- Migrations: `npm run db:migrate`
- Seed: `npm run db:seed`

### 9. Environment Variables 🔐

| Name | Description | Default | Required |
|------|-------------|---------|----------|
| `POSTGRES_USER` | DB User | `postgres` | Yes |
| `POSTGRES_PASSWORD` | DB Password | (empty) | Yes |
| `POSTGRES_DB` | DB Name | `eduplatform` | Yes |
| `DATABASE_URL` | DB Connection String | - | Yes |
| `JWT_SECRET` | JWT Secret Key | - | Yes |
| `PORT` | Backend Port | `3001` | No |
| `CORS_ORIGIN` | Allowed Origins | `http://localhost:5173` | Yes |
| `VITE_API_URL` | Backend API URL | `http://localhost:3001` | Yes |

### 10. Mobile Testing 📱
1. Find your local IP (`ipconfig` on Windows).
2. Start frontend with: `npm run dev` (it already uses `host: true` in vite config).
3. Open `http://YOUR_IP:5173` on your phone (must be on the same WiFi).

### 11. Production Deployment 🌍
a. **Frontend**: Deploy to Vercel/Netlify. Set `VITE_API_URL` to your backend URL.
b. **Backend**: Deploy to Railway/Render/Fly.io. Set `DATABASE_URL`, `CORS_ORIGIN` and `JWT_SECRET`.
c. **Database**: Use Neon.tech, Supabase, or Railway PostgreSQL.

### 12. Custom Domain 🌐
- Point A record to your server IP.
- Update `CORS_ORIGIN` in backend `.env`.
- Update `VITE_API_URL` in frontend `.env`.

### 13. HTTPS 🔒
- **Local**: Not needed for development.
- **Production Platforms (PaaS)**: Vercel, Railway, Render provide HTTPS automatically.
- **VPS**: Use Caddy or Nginx + Certbot.

### 14. PWA Installation 📲
- **Android**: Open site in Chrome -> Tap '...' menu -> 'Add to Home Screen'.
- **iOS**: Safari -> Share -> 'Add to Home Screen'.

### 15. Project Structure 📂
```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
└── .env.example
```

### 16. API Documentation 📜
- `POST /api/auth/register` - User Registration
- `POST /api/auth/login` - User Login
- `GET /api/auth/me` - Get Profile
- `GET /api/courses` - List Courses
- `GET /api/courses/:id` - Course Details
- `GET /api/lessons/:id` - Lesson Details
- `GET /api/notes` - User Notes
- `POST /api/notes` - Create Note
- `GET /api/schedule` - User Schedule

### 17. Future Features 🚀
- 💳 Monetization & Paid Courses
- 📱 Native Mobile App (React Native)
- 💬 Chat and Lesson Comments
- 🏆 Gamification

### 18. Contributing 🤝
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### 19. License 📄
MIT
