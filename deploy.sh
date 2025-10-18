#!/bin/bash

echo "=============================="
echo " 🌍 Weather App — Авторазвёртывание"
echo "=============================="

# 1. Проверка Docker
if ! command -v docker &> /dev/null
then
    echo "❌ Docker не найден! Установите Docker и запустите снова."
    exit 1
fi

# 2. Скачиваем docker-compose.prod.yml, если его нет
if [ ! -f docker-compose.prod.yml ]; then
  echo "⬇ Скачиваем docker-compose.prod.yml..."
  curl -O https://raw.githubusercontent.com/voidblxde/weather-app/main/docker-compose.prod.yml
fi

# 3. Спросить ключ
echo ""
read -p "🔑 Введите YANDEX_WEATHER_KEY (или оставьте пустым, если уже в .env): " KEY

# 4. .env — создаём или обновляем
if [ ! -f .env ]; then
  echo "Создаю .env..."
  echo "YANDEX_WEATHER_KEY=$KEY" > .env
else
  if [ ! -z "$KEY" ]; then
    echo "Обновляю ключ в .env..."
    sed -i "s|YANDEX_WEATHER_KEY=.*|YANDEX_WEATHER_KEY=$KEY|" .env 2>/dev/null || \
    sed -i '' "s|YANDEX_WEATHER_KEY=.*|YANDEX_WEATHER_KEY=$KEY|" .env
  fi
fi

# 5. Запуск с пересозданием, чтобы ENV применился
echo "🚀 Запускаем сервис..."
docker compose -f docker-compose.prod.yml up -d --force-recreate

echo "✅ Готово!"
echo "   👉 Backend:  http://localhost:8080/api/ping"
echo "   👉 Frontend: http://localhost"
echo "=============================="
