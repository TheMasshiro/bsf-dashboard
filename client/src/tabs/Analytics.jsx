import { useState } from 'react';
import { ChartCard } from '../components/Cards';
import { MetricButton } from '../components/Buttons';
import { useLifecycle } from '../context/LifecycleContext';
import { lifecycleThresholds } from '../config/lifecycleThresholds';

const Analytics = () => {
    const [selectedMetric, setSelectedMetric] = useState('temperature');
    const { currentLifecycle } = useLifecycle();
    const thresholds = lifecycleThresholds[currentLifecycle];

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
            upperLimit: thresholds.temperature.max,
            warningLimit: thresholds.temperature.optimal[1],
            lowerLimit: thresholds.temperature.min,
            color: '#ef4444',
            current: 24.5,
            min: thresholds.temperature.min - 5,
            max: thresholds.temperature.max + 5
        },
        humidity: {
            name: 'Humidity',
            icon: '💧',
            data: humidityData,
            unit: '%',
            upperLimit: thresholds.humidity.max,
            warningLimit: thresholds.humidity.optimal[1],
            lowerLimit: thresholds.humidity.min,
            color: '#3b82f6',
            current: 65,
            min: thresholds.humidity.min - 10,
            max: thresholds.humidity.max + 10
        },
        moisture: {
            name: 'Moisture',
            icon: '🌱',
            data: moistureData,
            unit: '%',
            upperLimit: thresholds.moisture.max,
            warningLimit: thresholds.moisture.optimal[1],
            lowerLimit: thresholds.moisture.min,
            color: '#10b981',
            current: 72,
            min: thresholds.moisture.min - 10,
            max: thresholds.moisture.max + 10
        },
        light: {
            name: 'Light',
            icon: '☀️',
            data: lightData,
            unit: 'lux',
            upperLimit: thresholds.light.max,
            warningLimit: thresholds.light.optimal[1],
            lowerLimit: thresholds.light.min,
            color: '#f59e0b',
            current: 850,
            min: thresholds.light.min,
            max: thresholds.light.max + 500
        }
    };

    const currentMetric = metrics[selectedMetric];

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-2">
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
                className="mb-3"
            />

            <div className="grid grid-cols-4 gap-2 pb-30">
                {Object.entries(metrics).map(([key, metric]) => (
                    <MetricButton
                        key={key}
                        icon={metric.icon}
                        value={metric.current}
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
