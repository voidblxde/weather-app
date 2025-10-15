package ru.voidblxde.weather.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI weatherApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Weather Service API")
                        .version("1.0.0")
                        .description("REST API для получения погоды из Яндекс.Погоды"));
    }
}
