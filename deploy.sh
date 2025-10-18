#!/bin/bash

echo "🌍 Weather App — авторазвёртывание через Docker"

# 1. Проверка Docker
if ! command -v docker &> /dev/null
then
    echo "❌ Docker не найден! Установите Docker и запустите снова."
    exit 1
fi

# 2. Скачиваем docker-compose.prod.yml (если его нет)
if [ ! -f docker-compose.prod.yml ]; then
  echo "⬇ Скачиваем docker-compose.prod.yml..."
  curl -O https://raw.githubusercontent.com/voidblxde/weather-app/main/docker-compose.prod.yml
fi

# 3. Создаём .env если его нет
if [ ! -f .env ]; then
  echo "⚙ Создаём .env... (впиши ключ по желанию)"
  echo "YANDEX_WEATHER_KEY=ВСТАВЬ_СВОЙ_КЛЮЧ" > .env
fi

# 4. Запуск
echo "🚀 Запускаем сервис..."
docker compose -f docker-compose.prod.yml up -d

echo "✅ Готово! Открывай:"
echo "   👉 Backend: http://localhost:8080/api/ping"
echo "   👉 Frontend: http://localhost"
