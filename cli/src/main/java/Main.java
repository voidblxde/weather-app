import io.github.cdimascio.dotenv.Dotenv;
import java.net.http.*;
import java.net.URI;
import java.time.Duration;
import java.util.*;
import java.util.Scanner;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ArrayNode;

/**
 * Основной класс приложения.
 * Выполняет:
 * 1. Получение координат и limit через аргументы или диалоговый ввод.
 * 2. Ограничение значения limit до допустимого диапазона (1..11).
 * 3. GET-запрос к API Яндекс.Погоды.
 * 4. Вывод полного JSON-ответа.
 * 5. Вывод текущей температуры (fact.temp) и средней температуры за limit суток.
 */
public class Main {

    private static final String API_URL = "https://api.weather.yandex.ru/v2/forecast";
    private static final int MAX_LIMIT = 11;

    public static void main(String[] args) throws Exception {

        // === 1. Загружаем ключ API из .env ===
        Dotenv dotenv = Dotenv.configure()
                .directory("../") // ищем .env в корне монорепы
                .ignoreIfMissing()
                .load();

        String keyFromEnv = dotenv.get("YANDEX_WEATHER_KEY");

        // === 2. Обрабатываем аргументы CLI ===
        Map<String, String> cliArgs = parseArgs(args);
        Scanner scanner = new Scanner(System.in);

        // === 3. Получаем lat ===
        String lat = cliArgs.get("lat");
        if (lat == null) {
            System.out.print("Введите широту (lat) [по умолчанию 55.75]: ");
            String input = scanner.nextLine().trim();
            lat = input.isEmpty() ? "55.75" : input;
        }

        // === 4. Получаем lon ===
        String lon = cliArgs.get("lon");
        if (lon == null) {
            System.out.print("Введите долготу (lon) [по умолчанию 37.62]: ");
            String input = scanner.nextLine().trim();
            lon = input.isEmpty() ? "37.62" : input;
        }

        // === 5. Получаем limit ===
        String limit = cliArgs.get("limit");
        if (limit == null) {
            System.out.print("Введите количество суток limit (1..11) [по умолчанию 3]: ");
            String input = scanner.nextLine().trim();
            limit = input.isEmpty() ? "3" : input;
        }

        int limitDays = Integer.parseInt(limit);
        if (limitDays > MAX_LIMIT) {
            System.out.println("Значение limit=" + limitDays + " превышает допустимое по API. Установлено limit=" + MAX_LIMIT);
            limitDays = MAX_LIMIT;
        } else if (limitDays < 1) {
            System.out.println("Значение limit не может быть меньше 1. Установлено limit=1");
            limitDays = 1;
        }

        // === 6. Берём ключ: приоритет у CLI --key ===
        String key = cliArgs.getOrDefault("key", keyFromEnv);
        if (key == null || key.isBlank()) {
            System.err.println("Ключ API не найден. Добавьте YANDEX_WEATHER_KEY в .env или передайте --key=...");
            System.exit(1);
        }

        // === 7. Формирование URL ===
        String uri = API_URL + "?lat=" + lat + "&lon=" + lon + "&limit=" + limitDays;

        // === 8. HTTP-запрос ===
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .timeout(Duration.ofSeconds(20))
                .header("X-Yandex-Weather-Key", key)
                .header("Accept", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("\n=== RAW JSON RESPONSE ===");
        System.out.println(response.body());

        // === 9. Разбор JSON ===
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.body());

        // Если есть ошибки — выводим и завершаем
        if (root.has("errors")) {
            System.out.println("\n⚠ API вернул ошибку: " + root.get("errors"));
            return;
        }

        // === Вывод текущей температуры ===
        JsonNode factTemp = root.path("fact").path("temp");
        System.out.println("\nТекущая температура: " +
                (factTemp.isNumber() ? factTemp.asInt() + "°C" : "нет данных"));

        // === Расчёт средней температуры ===
        ArrayNode forecasts = (ArrayNode) root.path("forecasts");
        if (forecasts == null || !forecasts.isArray()) {
            System.out.println("Данные прогнозов недоступны");
            return;
        }

        double sum = 0;
        int count = 0;
        for (int i = 0; i < Math.min(limitDays, forecasts.size()); i++) {
            JsonNode tempAvg = forecasts.get(i).path("parts").path("day").path("temp_avg");
            if (tempAvg.isNumber()) {
                sum += tempAvg.asDouble();
                count++;
            }
        }

        if (count > 0) {
            double avg = sum / count;
            System.out.println("Средняя температура за " + count + " суток: " +
                    String.format("%.1f", avg) + "°C");
        } else {
            System.out.println("Средняя температура по прогнозу: недоступно");
        }
    }

    // Утилита для парсинга аргументов CLI
    private static Map<String, String> parseArgs(String[] args) {
        Map<String, String> map = new HashMap<>();
        for (String arg : args) {
            if (arg.startsWith("--") && arg.contains("=")) {
                int idx = arg.indexOf('=');
                map.put(arg.substring(2, idx), arg.substring(idx + 1));
            }
        }
        return map;
    }
}
