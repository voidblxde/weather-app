# 🌐 Weather Frontend — React + Vite + Tailwind + Axios

Этот модуль — **визуальный интерфейс** для работы с backend API `weather-service`.

Фронтенд позволяет:
- Ввести **широту, долготу, limit**
- Отправить запрос на `/api/weather`
- Увидеть результат в **красивом JSON виде**
- Работает **в двух режимах**: `Dev` (Vite) и `Prod` (Docker + Nginx)

---

## 🚀 Запуск в режиме разработки (Dev Mode — Vite)

> Подходит для локальной работы, когда backend запущен отдельно (`mvn spring-boot:run` или `docker compose up`)

```bash
cd frontend
npm install
npm run dev
```

Откроется: **http://localhost:3000**

---

## 🔁 Как фронтенд общается с backend в Dev

Во **время разработки** React-приложение запущено через **Vite Dev Server (порт 3000)**.

Запросы вида:

```
/api/weather
```

→ автоматически **прокидываются Vite на backend (порт 8080)**  
Это работает благодаря этой настройке в `vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

---

### 🔍 ASCII-схема (Dev Mode)

```
[Браузер:3000] → Vite Dev Server
     |
     ├── /               → отдаёт React UI
     └── /api/weather    → 🔁 проксирует → http://localhost:8080/api/weather
```

---

## 🏭 Production (Docker + Nginx)

В продакшене Vite **не работает** — вместо этого:

- Приложение **собирается в статические файлы (`/dist`)**
- Эти файлы раздаются **Nginx**
- **Nginx не только отдаёт UI, но и проксирует /api/... внутрь Docker на backend**

### 🔍 ASCII-схема (Docker / Prod)

```
[Браузер:3000] → Nginx (фронт контейнер)
     |
     ├── /                → отдаёт index.html + JS + CSS
     └── /api/weather     → 🔁 proxy_pass → weather-service:8080/api/weather
```

> ✅ Это позволяет **использовать один URL `/api/...` в React-коде без хардкода портов и доменов**

---

## 🐳 Запуск фронтенда через Docker

> Требуется, чтобы **backend тоже работал в Docker** (по инструкции из корневого README)

```bash
docker compose up -d --build
```

После сборки:
- **http://localhost:3000** → UI (nginx)
- **http://localhost:8080/api/** → backend API

---

## 📦 Используемый стек

| Технология | Назначение |
|-----------|-----------|
| **React + TypeScript** | UI-логика |
| **Vite** | Быстрый разработческий сервер |
| **TailwindCSS** | Ускоренная стилизация без CSS-файлов |
| **Axios** | Запросы к API |
| **Nginx (в Docker)** | Продакшн-сервер для UI + прокси на backend API |

---
