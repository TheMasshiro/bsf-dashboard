import { SensorCard } from '../components/Cards';
import { ActuatorButtons } from "../components/Buttons";
import { useLifecycle } from "../context/LifecycleContext";
import { lifecycleThresholds, getStatus } from "../config/lifecycleThresholds";

const Sensors = () => {
    const { currentLifecycle } = useLifecycle();
    const thresholds = lifecycleThresholds[currentLifecycle];

    const currentReadings = {
        temperature: 24.5,
        humidity: 65,
        moisture: 72,
        light: 850
    };

    const sensorData = [
        {
            name: 'Temperature',
            icon: '🌡️',
            value: currentReadings.temperature.toString(),
            unit: '°C',
            status: getStatus(currentReadings.temperature, thresholds.temperature)
        },
        {
            name: 'Humidity',
            icon: '💧',
            value: currentReadings.humidity.toString(),
            unit: '%',
            status: getStatus(currentReadings.humidity, thresholds.humidity)
        },
        {
            name: 'Substrate Moisture',
            icon: '🌱',
            value: currentReadings.moisture.toString(),
            unit: '%',
            status: getStatus(currentReadings.moisture, thresholds.moisture)
        },
        {
            name: 'Light Intensity',
            icon: '☀️',
            value: currentReadings.light.toString(),
            unit: 'lux',
            status: getStatus(currentReadings.light, thresholds.light)
        }
    ];

    return (
        <div className="w-full h-full">
            <div className="mb-2">
                <h1 className="text-white text-2xl font-bold mb-1">Sensors</h1>
            </div>

            <div className="space-y-2 mb-4">
                <h2 className="text-white text-lg font-semibold mb-2">Sensor Readings</h2>
                {sensorData.map((sensor, index) => (
                    <SensorCard
                        key={index}
                        icon={sensor.icon}
                        value={sensor.value}
                        unit={sensor.unit}
                        status={sensor.status}
                    >
                        {sensor.name}
                    </SensorCard>
                ))}
            </div>
            <ActuatorButtons />
        </div>
    );
};

export default Sensors;
