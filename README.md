# 🌦 Weather App — CLI, REST API с Docker и готовностью к фронтенду

Этот репозиторий — **монорепозиторий** с несколькими модулями:

| Модуль      | Назначение |
|-------------|-----------|
| `cli/`      | ✅ Консольное приложение (получение погоды через терминал) |
| `service/`  | ✅ REST API на Spring Boot + Swagger UI + Docker |
| `frontend/` | 🚧 *будет добавлен позже* (React + Vite + Tailwind) |

---

## ⚡ Запуск без установки Java/Maven — через GitHub Codespaces

> 🎓 *Для проверки преподавателем — проект можно запустить прямо в браузере.*

Нажмите кнопку ниже и выберите **Create Codespace**:

[![Open in GitHub Codespaces](https://img.shields.io/badge/⚡%20Open%20in%20Codespaces-181717?style=for-the-badge&logo=github)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=voidblxde/weather-app)

После открытия терминала выполните:

```bash
cp .env.example .env    # .env должен быть в корне проекта с ключом яндекс погоды
cd cli 
mvn compile exec:java -Dexec.mainClass=Main
```

---

## 💻 Запуск CLI локально (Windows / Linux / Mac)

```bash
copy .env.example .env           # .env должен быть в корне проекта с ключом яндекс погоды
cd cli
mvn compile exec:java -Dexec.mainClass=Main
```

Запуск **с параметрами**:

```bash
mvn compile exec:java -Dexec.mainClass=Main -Dexec.args="--lat=55.75 --lon=37.62 --limit=3"
```

---

## 🐳 Запуск REST API (Spring Boot) через Docker

```
echo "YANDEX_WEATHER_KEY=ВАШ_КОД_ОТ_ЯНДЕКС_ПОГОДЫ" > .env
docker run -d --env-file .env -p 8080:8080 voidblxde/weather-backend:latest
```


После запуска REST API доступен по адресам:

| Endpoint      | URL |
|---------------|-----|
| Проверка API  | http://localhost:8080/api/ping |
| Swagger UI    | http://localhost:8080/swagger-ui/index.html |
| Пример запроса | http://localhost:8080/api/weather?lat=55.75&lon=37.62&limit=3 |

---

## 📂 Структура проекта

```
weather-app/
├── cli/                     # Консольное приложение ✅
│   ├── src/
│   ├── pom.xml
│   ├── .env.example
├── service/                 # REST API + Swagger + Docker ✅
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
├── docker-compose.yml       # Запуск backend через Docker ✅
├── .env.example             # Шаблон ENV для Docker
├── pom.xml                  # Корневой Maven (packaging: pom)
└── frontend/                # 🚧 Будущий UI (React)
```

💬 Автор: **Лебедев С.А. / @voidblxde**  
Проект развивается как **production-ready учебный pet-проект**
