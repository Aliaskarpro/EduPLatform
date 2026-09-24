# 🚀 Быстрый старт EduPlatform

## ⚡ Самый быстрый способ (без БД)

```powershell
# Откройте терминал в папке проекта
cd frontend
npm run dev
```

Откройте браузер: **http://localhost:5173**

**Демо вход:**
- 📧 Email: `demo@example.com`
- 🔑 Password: `Demo1234!`

---

## 🐳 Полный стек с Docker (рекомендуется)

### 1. Создайте `.env` файл в корне проекта:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=eduplatform_password
POSTGRES_DB=eduplatform
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=http://localhost:5173
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

### 2. Запустите все сервисы:

```powershell
docker compose up --build
```

### 3. Выполните миграции и сиды (в новом терминале):

```powershell
# Миграции (создание таблиц)
docker exec eduplatform-backend npm run db:migrate

# Сиды (тестовые данные)
docker exec eduplatform-backend npm run db:seed
```

### 4. Откройте приложение:

- **Фронтенд:** http://localhost:80
- **API Backend:** http://localhost:3001
- **PostgreSQL:** localhost:5432

---

## ✅ Статус проекта

**Все зависимости установлены:**
- ✅ Backend: 148 пакетов
- ✅ Frontend: 524 пакета

**TypeScript сборка:**
- ✅ Backend компилируется успешно
- ✅ Frontend собирается успешно (290.86 KB)

**Проект готов к запуску!** 🎉
