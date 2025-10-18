import { useState } from "react";
import type {WeatherResponse} from "../types/weather.ts";
import {api} from "../shared/api.ts";

export function useWeather() {

    const [data, setData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchWeather(lat: number, lon: number, limit: number) {
        setLoading(true); setError(null);
        try {
            const res = await api.get<WeatherResponse>("/weather", { params: { lat, lon, limit } });
            setData(res.data);
        } catch (e: any) {
            setError(e?.response?.data?.message || "Не удалось получить данные. Проверьте параметры.");
        } finally {
            setLoading(false);
        }
    }
    return { data, loading, error, fetchWeather };
}
