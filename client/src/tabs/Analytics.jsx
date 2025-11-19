import { useState } from 'react';
import ChartCard from '../components/ChartCard';
import MetricButton from '../components/MetricButton';

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
            name: 'Moisture',
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
            name: 'Light',
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

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-4">
                <h1 className="text-white text-2xl font-bold mb-1">Analytics</h1>
                <p className="text-gray-400 text-sm">24-hour trend analysis</p>
            </div>

            <ChartCard
                title={`${currentMetric.name} Trend`}
                icon={currentMetric.icon}
                currentValue={currentMetric.current}
                unit={currentMetric.unit}
                data={currentMetric.data}
                upperLimit={currentMetric.upperLimit}
                warningLimit={currentMetric.warningLimit}
                lowerLimit={currentMetric.lowerLimit}
                color={currentMetric.color}
                minY={currentMetric.min}
                maxY={currentMetric.max}
                className="mb-4"
            />

            <div className="grid grid-cols-2 gap-2 pb-30">
                {Object.entries(metrics).map(([key, metric]) => (
                    <MetricButton
                        key={key}
                        icon={metric.icon}
                        value={metric.current}
                        name={metric.name}
                        unit={metric.unit}
                        isActive={selectedMetric === key}
                        onClick={() => setSelectedMetric(key)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Analytics;
