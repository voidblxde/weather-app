# 🌦 Weather App — консольное приложение + готовность к расширению (API / UI)

Этот репозиторий организован как **монорепозиторий** — сначала реализована **CLI-версия на Java (Maven)**, далее планируется добавить **REST-сервис + frontend-интерфейс**.

---

## ☁ Запуск БЕЗ установки Java/Maven (через GitHub Codespaces)

> 🎓 *Для удобства преподавателя и проверки — проект можно запустить прямо в браузере без установки окружения.*

Нажмите кнопку ниже — GitHub автоматически откроет проект в облачной среде с **предустановленными Java и Maven**:

[![Open in GitHub Codespaces](https://img.shields.io/badge/⚡%20Open%20in%20Codespaces-181717?style=for-the-badge&logo=github)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=voidblxde/weather-app)

После открытия выполните в терминале (Codespaces уже откроется в корне проекта):

```bash
cd cli
echo "YANDEX_WEATHER_KEY=ВАШ_КЛЮЧ" > .env   # при первом запуске
mvn compile exec:java "-Dexec.mainClass=Main"
```

---

## 💻 Альтернативный запуск локально (Windows / PowerShell)

```powershell
cd cli
copy .env.example .env   # Указываем ключ API в .env
mvn compile exec:java "-Dexec.mainClass=Main"
```

### ▶ Запуск с параметрами:

```powershell
mvn compile exec:java "-Dexec.mainClass=Main" "-Dexec.args=--lat=55.75 --lon=37.62 --limit=3"
```

---

## 📂 Структура

```
weather-app/
├── pom.xml              ← Корневой Maven (packaging: pom, готово к расширению)
├── cli/                 ← Консольный Java-клиент (готово)
│   ├── pom.xml
│   ├── src/
│   ├── .env.example
│   └── README.md (опционально можно расширить)
├── service/             ← Будущий REST API (будет добавлен)
└── frontend/            ← Будущий UI (будет добавлен)
```

---

✅ Сейчас реализована **консольная версия**, которая:
- Делает запрос к API Яндекс.Погоды
- Передаёт **X-Yandex-Weather-Key** в заголовке
- Выводит **полный JSON-ответ без форматирования**
- Отдельно показывает **текущую температуру (fact.temp)**
- Считает **среднюю температуру за первые N дней (forecasts[*].parts.day.temp_avg)**
- ✅ **Защищена от выхода limit за пределы (автоматически ограничивает до 11)**

📌 Автор: **voidblxde** Лебедев С.А.
