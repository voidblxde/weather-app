# 🌦 Weather App — мультипроект (CLI → далее API / UI)


## 🚀 Запуск в GitHub Codespaces (облачная среда с Maven + Java)

Можно запустить проект прямо в браузере, без установки Java и Maven локально.

### ▶ Открыть в Codespaces

[![Открыть в GitHub Codespaces](https://img.shields.io/badge/⚡%20Open%20in%20Codespaces-181717?style=for-the-badge&logo=github)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=voidblxde/weather-app)

> После запуска Codespaces выполните команды в терминале:

```bash
cd cli
echo "YANDEX_WEATHER_KEY=ВАШ_КЛЮЧ" > .env   # если .env ещё нет
mvn compile exec:java "-Dexec.mainClass=Main"
```

---
