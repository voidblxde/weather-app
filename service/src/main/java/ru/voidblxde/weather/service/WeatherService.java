package ru.voidblxde.weather.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {

    private static final String API_URL = "https://api.weather.yandex.ru/v2/forecast";
    private final String apiKey;
    private final ObjectMapper mapper = new ObjectMapper();

    public WeatherService() {
        this.apiKey = System.getenv("YANDEX_WEATHER_KEY");
        if (this.apiKey == null || this.apiKey.isBlank()) {
            throw new IllegalStateException("YANDEX_WEATHER_KEY is not set. Pass it via Docker ENV.");
        }
    }


    public Map<String, Object> getWeather(double lat, double lon, int limit) {
        try {
            if (limit < 1) limit = 1;
            if (limit > 11) limit = 11;

            String url = API_URL + "?lat=" + lat + "&lon=" + lon + "&limit=" + limit;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("X-Yandex-Weather-Key", apiKey)
                    .GET()
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JsonNode root = mapper.readTree(response.body());

            int currentTemp = root.get("fact").get("temp").asInt();

            double sum = 0;
            int count = 0;
            for (JsonNode forecast : root.get("forecasts")) {
                JsonNode dayPart = forecast.get("parts").get("day");
                if (dayPart != null && dayPart.get("temp_avg") != null) {
                    sum += dayPart.get("temp_avg").asDouble();
                    count++;
                }
            }
            double avgTemp = count > 0 ? sum / count : 0;

            Map<String, Object> result = new HashMap<>();
            result.put("currentTemp", currentTemp);
            result.put("avgTemp", avgTemp);
            result.put("raw", root);

            return result;

        } catch (Exception e) {
            return Map.of("error", e.getMessage());
        }
    }
}
