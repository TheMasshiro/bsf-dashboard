import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';

const Analytics = () => {
    const [selectedMetric, setSelectedMetric] = useState('temperature');

    const temperatureData = [
        { time: '00:00', value: 22 },
        { time: '04:00', value: 21 },
        { time: '08:00', value: 23 },
        { time: '12:00', value: 26 },
        { time: '16:00', value: 28 },
        { time: '20:00', value: 25 },
        { time: '24:00', value: 23 }
    ];

    const humidityData = [
        { time: '00:00', value: 65 },
        { time: '04:00', value: 70 },
        { time: '08:00', value: 68 },
        { time: '12:00', value: 60 },
        { time: '16:00', value: 55 },
        { time: '20:00', value: 62 },
        { time: '24:00', value: 67 }
    ];

    const moistureData = [
        { time: '00:00', value: 72 },
        { time: '04:00', value: 70 },
        { time: '08:00', value: 68 },
        { time: '12:00', value: 65 },
        { time: '16:00', value: 75 },
        { time: '20:00', value: 78 },
        { time: '24:00', value: 74 }
    ];

    const lightData = [
        { time: '00:00', value: 0 },
        { time: '04:00', value: 100 },
        { time: '08:00', value: 600 },
        { time: '12:00', value: 950 },
        { time: '16:00', value: 800 },
        { time: '20:00', value: 200 },
        { time: '24:00', value: 0 }
    ];

    const metrics = {
        temperature: {
            name: 'Temperature',
            icon: '🌡️',
            data: temperatureData,
            unit: '°C',
            upperLimit: 28,
            warningLimit: 25,
            lowerLimit: 20,
            color: '#ef4444',
            current: 24.5,
            min: 18,
            max: 32
        },
        humidity: {
            name: 'Humidity',
            icon: '💧',
            data: humidityData,
            unit: '%',
            upperLimit: 75,
            warningLimit: 70,
            lowerLimit: 50,
            color: '#3b82f6',
            current: 65,
            min: 40,
            max: 90
        },
        moisture: {
            name: 'Substrate Moisture',
            icon: '🌱',
            data: moistureData,
            unit: '%',
            upperLimit: 80,
            warningLimit: 75,
            lowerLimit: 60,
            color: '#10b981',
            current: 72,
            min: 50,
            max: 100
        },
        light: {
            name: 'Light Intensity',
            icon: '☀️',
            data: lightData,
            unit: 'lux',
            upperLimit: 1000,
            warningLimit: 900,
            lowerLimit: 0,
            color: '#f59e0b',
            current: 850,
            min: 0,
            max: 1200
        }
    };

    const currentMetric = metrics[selectedMetric];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-neutral-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                    <p className="text-white text-sm font-semibold">{payload[0].value}{currentMetric.unit}</p>
                    <p className="text-gray-400 text-xs">{payload[0].payload.time}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full">
            <div className="mb-4">
                <h1 className="text-white text-2xl font-bold mb-1">Analytics</h1>
                <p className="text-gray-400 text-sm">24-hour trend analysis</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.entries(metrics).map(([key, metric]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedMetric(key)}
                        className={`
                            p-3 rounded-xl border-2 transition-all active:scale-95
                            ${selectedMetric === key
                                ? 'border-blue-500 bg-blue-900/20'
                                : 'border-gray-700 bg-neutral-800'
                            }
                        `}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl">{metric.icon}</span>
                            <div className="text-left">
                                <p className="text-white text-xs font-semibold">{metric.name}</p>
                                <p className="text-gray-400 text-[10px]">{metric.current}{metric.unit}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="bg-neutral-800 rounded-2xl border-2 border-gray-700 p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold text-sm">{currentMetric.name} Trend</h3>
                    <span className="text-2xl">{currentMetric.icon}</span>
                </div>

                <div className="mb-4 p-3 bg-neutral-700/30 rounded-lg">
                    <p className="text-gray-400 text-xs mb-1">Current Reading</p>
                    <p className="text-white text-3xl font-bold">
                        {currentMetric.current}
                        <span className="text-lg text-gray-400 ml-1">{currentMetric.unit}</span>
                    </p>
                </div>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentMetric.data}>
                            <defs>
                                <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={currentMetric.color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={currentMetric.color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis
                                dataKey="time"
                                stroke="#9ca3af"
                                style={{ fontSize: '10px' }}
                            />
                            <YAxis
                                stroke="#9ca3af"
                                style={{ fontSize: '10px' }}
                                domain={[currentMetric.min, currentMetric.max]}
                            />
                            <Tooltip content={<CustomTooltip />} />

                            <ReferenceLine
                                y={currentMetric.upperLimit}
                                stroke="#ef4444"
                                strokeDasharray="5 5"
                                label={{ value: 'Max', position: 'right', fill: '#ef4444', fontSize: 10 }}
                            />

                            <ReferenceLine
                                y={currentMetric.warningLimit}
                                stroke="#f59e0b"
                                strokeDasharray="5 5"
                                label={{ value: 'Warning', position: 'right', fill: '#f59e0b', fontSize: 10 }}
                            />

                            <ReferenceLine
                                y={currentMetric.lowerLimit}
                                stroke="#3b82f6"
                                strokeDasharray="5 5"
                                label={{ value: 'Min', position: 'right', fill: '#3b82f6', fontSize: 10 }}
                            />

                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={currentMetric.color}
                                strokeWidth={2}
                                fill={`url(#gradient-${selectedMetric})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-0.5 bg-red-500"></div>
                            <span className="text-gray-400">Upper: {currentMetric.upperLimit}{currentMetric.unit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-0.5 bg-yellow-500"></div>
                            <span className="text-gray-400">Warn: {currentMetric.warningLimit}{currentMetric.unit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-0.5 bg-blue-500"></div>
                            <span className="text-gray-400">Lower: {currentMetric.lowerLimit}{currentMetric.unit}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="bg-neutral-800 rounded-xl border border-gray-700 p-3 text-center">
                    <p className="text-green-400 text-lg font-bold">
                        {Math.max(...currentMetric.data.map(d => d.value))}{currentMetric.unit}
                    </p>
                    <p className="text-gray-400 text-[10px]">Peak</p>
                </div>
                <div className="bg-neutral-800 rounded-xl border border-gray-700 p-3 text-center">
                    <p className="text-blue-400 text-lg font-bold">
                        {(currentMetric.data.reduce((a, b) => a + b.value, 0) / currentMetric.data.length).toFixed(1)}{currentMetric.unit}
                    </p>
                    <p className="text-gray-400 text-[10px]">Average</p>
                </div>
                <div className="bg-neutral-800 rounded-xl border border-gray-700 p-3 text-center">
                    <p className="text-purple-400 text-lg font-bold">
                        {Math.min(...currentMetric.data.map(d => d.value))}{currentMetric.unit}
                    </p>
                    <p className="text-gray-400 text-[10px]">Lowest</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
