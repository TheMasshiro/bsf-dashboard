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
        { time: '12 AM', value: 22 },
        { time: '1 AM', value: 22 },
        { time: '2 AM', value: 21.5 },
        { time: '3 AM', value: 21 },
        { time: '4 AM', value: 21 },
        { time: '5 AM', value: 21.5 },
        { time: '6 AM', value: 22 },
        { time: '7 AM', value: 22.5 },
        { time: '8 AM', value: 23 },
        { time: '9 AM', value: 24 },
        { time: '10 AM', value: 25 },
        { time: '11 AM', value: 26 },
        { time: '12 PM', value: 26 },
        { time: '1 PM', value: 27 },
        { time: '2 PM', value: 28 },
        { time: '3 PM', value: 28 },
        { time: '4 PM', value: 28 },
        { time: '5 PM', value: 27 },
        { time: '6 PM', value: 26 },
        { time: '7 PM', value: 25 },
        { time: '8 PM', value: 25 },
        { time: '9 PM', value: 24 },
        { time: '10 PM', value: 23.5 },
        { time: '11 PM', value: 23 }
    ];

    const humidityData = [
        { time: '12 AM', value: 65 },
        { time: '1 AM', value: 66 },
        { time: '2 AM', value: 68 },
        { time: '3 AM', value: 70 },
        { time: '4 AM', value: 70 },
        { time: '5 AM', value: 69 },
        { time: '6 AM', value: 68 },
        { time: '7 AM', value: 68 },
        { time: '8 AM', value: 68 },
        { time: '9 AM', value: 66 },
        { time: '10 AM', value: 63 },
        { time: '11 AM', value: 60 },
        { time: '12 PM', value: 60 },
        { time: '1 PM', value: 58 },
        { time: '2 PM', value: 55 },
        { time: '3 PM', value: 55 },
        { time: '4 PM', value: 55 },
        { time: '5 PM', value: 57 },
        { time: '6 PM', value: 59 },
        { time: '7 PM', value: 62 },
        { time: '8 PM', value: 62 },
        { time: '9 PM', value: 64 },
        { time: '10 PM', value: 66 },
        { time: '11 PM', value: 67 }
    ];

    const moistureData = [
        { time: '12 AM', value: 72 },
        { time: '1 AM', value: 71.5 },
        { time: '2 AM', value: 71 },
        { time: '3 AM', value: 70 },
        { time: '4 AM', value: 70 },
        { time: '5 AM', value: 69 },
        { time: '6 AM', value: 68 },
        { time: '7 AM', value: 68 },
        { time: '8 AM', value: 68 },
        { time: '9 AM', value: 67 },
        { time: '10 AM', value: 66 },
        { time: '11 AM', value: 65 },
        { time: '12 PM', value: 65 },
        { time: '1 PM', value: 68 },
        { time: '2 PM', value: 72 },
        { time: '3 PM', value: 75 },
        { time: '4 PM', value: 75 },
        { time: '5 PM', value: 76 },
        { time: '6 PM', value: 77 },
        { time: '7 PM', value: 78 },
        { time: '8 PM', value: 78 },
        { time: '9 PM', value: 76 },
        { time: '10 PM', value: 75 },
        { time: '11 PM', value: 74 }
    ];

    const lightData = [
        { time: '12 AM', value: 0 },
        { time: '1 AM', value: 0 },
        { time: '2 AM', value: 0 },
        { time: '3 AM', value: 0 },
        { time: '4 AM', value: 100 },
        { time: '5 AM', value: 200 },
        { time: '6 AM', value: 400 },
        { time: '7 AM', value: 500 },
        { time: '8 AM', value: 600 },
        { time: '9 AM', value: 750 },
        { time: '10 AM', value: 900 },
        { time: '11 AM', value: 950 },
        { time: '12 PM', value: 950 },
        { time: '1 PM', value: 920 },
        { time: '2 PM', value: 850 },
        { time: '3 PM', value: 800 },
        { time: '4 PM', value: 800 },
        { time: '5 PM', value: 650 },
        { time: '6 PM', value: 450 },
        { time: '7 PM', value: 200 },
        { time: '8 PM', value: 200 },
        { time: '9 PM', value: 50 },
        { time: '10 PM', value: 0 },
        { time: '11 PM', value: 0 }
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
