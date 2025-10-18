import {WeatherForm} from "../widgets/WeatherForm.tsx";
import {useWeather} from "../hooks/useWeather.ts";

export default function Home() {
    const { data, loading, error, fetchWeather } = useWeather();

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">Weather App UI</h1>

            <WeatherForm onSubmit={fetchWeather} />

            {loading && <div className="card">Загружаем…</div>}
            {error && <div className="card text-red-600">{error}</div>}

            {data && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="card">
                        <h2 className="font-semibold mb-2">Сейчас</h2>
                        <div className="text-4xl font-bold">{data.raw.fact.temp}°C</div>
                        <div className="text-sm text-gray-600">Состояние: {data.raw.fact.condition}</div>
                        <div className="text-sm text-gray-600">Ветер: {data.raw.fact.wind_speed} м/с</div>
                        <div className="text-sm text-gray-600">Давление: {data.raw.fact.pressure_mm} мм</div>
                        <div className="text-sm text-gray-600">Влажность: {data.raw.fact.humidity}%</div>
                    </div>

                    <div className="card">
                        <h2 className="font-semibold mb-2">Прогноз на дни</h2>
                        <ul className="space-y-2">
                            {data.raw.forecasts.map(f => (
                                <li key={f.date} className="flex justify-between border rounded-xl px-3 py-2">
                                    <span>{new Date(f.date).toLocaleDateString("ru-RU")}</span>
                                    <span>{f.parts.day?.temp_avg ?? "—"}°C</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
