package ru.voidblxde.weather.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.voidblxde.weather.service.WeatherService;

import java.util.Map;

@SuppressWarnings("unused")
@RestController
@RequiredArgsConstructor
public class WeatherController {


    private final WeatherService weatherService;

    @GetMapping("/api/ping")
    public Map<String, String> ping() {
        return Map.of("status", "ok");
    }

    @GetMapping("/api/weather")
    public Map<String, Object> getWeather(
            @RequestParam(name = "lat", defaultValue = "55.75") double lat,
            @RequestParam(name = "lon", defaultValue = "37.62") double lon,
            @RequestParam(name = "limit", defaultValue = "3") int limit
    ) {
        return weatherService.getWeather(lat, lon, limit);
    }

}
