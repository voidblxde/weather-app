import { useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import {
    Sun,
    Cloud,
    CloudRain,
    Snowflake,
    CloudDrizzle,
    CloudFog,
    CloudSun,
} from 'lucide-react'

const weatherIcons: Record<
    string,
    { icon: any; label: string; color: string }
> = {
    clear: { icon: Sun, label: 'Ясно', color: 'text-yellow-500' },
    cloudy: { icon: Cloud, label: 'Облачно', color: 'text-gray-600' },
    overcast: { icon: CloudFog, label: 'Пасмурно', color: 'text-gray-500' },
    'light-rain': {
        icon: CloudDrizzle,
        label: 'Небольшой дождь',
        color: 'text-blue-500',
    },
    rain: { icon: CloudRain, label: 'Дождь', color: 'text-blue-600' },
    thunderstorm: {
        icon: CloudRain,
        label: 'Гроза',
        color: 'text-purple-600',
    },
    snow: { icon: Snowflake, label: 'Снег', color: 'text-cyan-500' },
    'partly-cloudy': {
        icon: CloudSun,
        label: 'Переменная облачность',
        color: 'text-gray-500',
    },
}

export function WeatherForm() {
    const [lat, setLat] = useState('55.75')
    const [lon, setLon] = useState('37.62')
    const [limit, setLimit] = useState('3')
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const fetchWeather = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/weather', {
                params: { lat, lon, limit },
            })
            setData(res.data)
        } catch (err) {
            setData({ error: 'Ошибка запроса' })
        } finally {
            setLoading(false)
        }
    }

    const renderIcon = (condition: string, size = 28) => {
        const config = weatherIcons[condition] || weatherIcons['cloudy']
        const IconComponent = config.icon
        return <IconComponent size={size} className={config.color} />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-blue-400 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Card className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-2xl border border-white/30">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight">
                            🌦 Погода сегодня
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Inputs */}
                        <div className="grid grid-cols-3 gap-3">
                            <Input
                                placeholder="lat"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                className="text-center"
                            />
                            <Input
                                placeholder="lon"
                                value={lon}
                                onChange={(e) => setLon(e.target.value)}
                                className="text-center"
                            />
                            <Input
                                placeholder="days"
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                className="text-center"
                            />
                        </div>

                        {/* Button */}
                        <Button
                            onClick={fetchWeather}
                            disabled={loading}
                            className="w-full hover:scale-[1.02] transition-all shadow-lg"
                        >
                            {loading ? '⏳ Загружаю...' : 'Получить погоду'}
                        </Button>

                        {/* Weather Display */}
                        {data && data.raw && data.raw.fact && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="mt-4 p-6 bg-white/80 rounded-lg shadow border space-y-4"
                            >
                                <div className="flex items-center gap-3">
                                    {renderIcon(data.raw.fact.condition, 40)}
                                    <div>
                                        <p className="text-lg font-medium text-gray-700">
                                            {weatherIcons[
                                                data.raw.fact.condition
                                            ]?.label || '— Состояние —'}
                                        </p>
                                        <p className="text-4xl font-extrabold text-blue-700">
                                            {data.raw.fact.temp}°C
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                        <div className="p-3 bg-blue-50 border rounded shadow text-center">
                                            💨{' '}
                                            <span className="font-semibold">
                                                {data.raw.fact.wind_speed} м/с
                                            </span>
                                            <p className="text-xs text-gray-500">
                                                Ветер
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-50 border rounded shadow text-center">
                                            💧{' '}
                                            <span className="font-semibold">
                                                {data.raw.fact.humidity}%
                                            </span>
                                            <p className="text-xs text-gray-500">
                                                Влажность
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-50 border rounded shadow text-center">
                                            🔽{' '}
                                            <span className="font-semibold">
                                                {data.raw.fact.pressure_mm} мм
                                            </span>
                                            <p className="text-xs text-gray-500">
                                                Давление
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-50 border rounded shadow text-center">
                                            🌡{' '}
                                            <span className="font-semibold">
                                                {data.raw.fact.feels_like}°C
                                            </span>
                                            <p className="text-xs text-gray-500">
                                                Ощущается
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-semibold mt-4">
                                    📆 Прогноз:
                                </h3>
                                <div className="space-y-2">
                                    {data.raw.forecasts
                                        ?.slice(0, Number(limit))
                                        .map((f: any, i: number) => {
                                            const cond = f.parts?.day?.condition
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex justify-between items-center p-3 border rounded bg-gray-50 hover:bg-gray-100 transition"
                                                >
                                                    <span className="font-medium">
                                                        {f.date}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        {renderIcon(cond, 22)}
                                                        <span className="text-gray-700">
                                                            {f.parts?.day
                                                                ?.temp_avg ??
                                                                '—'}
                                                            °C
                                                        </span>
                                                    </span>
                                                </div>
                                            )
                                        })}
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
