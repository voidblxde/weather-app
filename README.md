[![Run in GitHub Web IDE](https://img.shields.io/badge/%E2%96%B6%20Запустить%20CLI%20на%20GitHub.dev-24292e?logo=github&style=for-the-badge)](https://github.dev/voidblxde/weather-app/cli)
# 🌦 Weather App — мультипроект (CLI → далее API / UI)

Репозиторий организован как **монорепозиторий**, в котором постепенно будут появляться отдельные модули (CLI, backend-сервис, frontend-интерфейс).

---

## 📂 Структура проекта

```
weather-app/
├── pom.xml              ← Корневой Maven (тип packaging: pom)
├── README.md           ← Общая документация (этот файл)
├── cli/               ← Готовое консольное приложение (Maven)
│   ├── pom.xml
│   ├── src/
│   ├── .env.example
│   └── README.md
├── service/       
└── frontend/       
```

---

## 🚀 Как запустить CLI-версию (Windows / PowerShell)

Перейти в модуль **cli**:

```powershell
cd cli
```

Создать `.env` на основе `.env.example` и указать ключ API:

```
YANDEX_WEATHER_KEY=ВАШ_КЛЮЧ
```

Запуск через Maven (**корректно для PowerShell**):

```powershell
mvn compile exec:java "-Dexec.mainClass=Main"
```

---

### ▶ Запуск с параметрами (PowerShell)

```powershell
mvn compile exec:java "-Dexec.mainClass=Main" "-Dexec.args=--lat=55.75 --lon=37.62 --limit=3"
```

> При запуске **без параметров** приложение предложит ввести `lat`, `lon`, `limit` вручную, значения по умолчанию применяются по Enter.

---

📌 Автор: **voidblxde**
