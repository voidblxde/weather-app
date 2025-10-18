export type WeatherResponse = {
    raw: {
        fact: {
            temp: number;
            condition: string;
            wind_speed: number;
            pressure_mm: number;
            humidity: number;
        };
        forecasts: Array<{
            date: string;
            parts: {
                day?: {
                    temp_avg?: number;
                    condition?: string;
                    prec_prob?: number;
                };
            };
        }>;
    };
};
