import { SensorCard } from '../components/Cards';
import { ActuatorButton } from "../components/Buttons";
import { useLifecycle } from "../context/LifecycleContext";
import { useActuators } from "../context/ActuatorContext";
import { lifecycleThresholds, getStatus } from "../config/lifecycleThresholds";

const Sensors = ({ sensorData, lastUpdate }) => {
    const { currentLifecycle } = useLifecycle();
    const { currentActuators, toggleActuator } = useActuators();
    const thresholds = lifecycleThresholds[currentLifecycle];

    const currentReadings = sensorData || {
        temperature: 24.5,
        humidity: 65,
        moisture: 72,
        light: 850,
        ammonia: 15
    };

    const actuatorControls = [
        { name: 'fan', label: 'Fan', icon: '🌀' },
        { name: 'waterPump', label: 'Water Pump', icon: '💧' },
        { name: 'light', label: 'Light', icon: '💡' },
        { name: 'heater', label: 'Heater', icon: '🔥' }
    ];

    const sensorCards = [
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
        },
        {
            name: 'Ammonia',
            icon: '💨',
            value: currentReadings.ammonia.toString(),
            unit: 'ppm',
            status: getStatus(currentReadings.ammonia, thresholds.ammonia)
        }
    ];

    return (
        <div className="w-full h-full">
            <div className="mb-2 flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">Sensors</h1>
                {lastUpdate && (
                    <span className="text-xs text-gray-400">
                        Updated: {lastUpdate.toLocaleTimeString()}
                    </span>
                )}
            </div>

            <div className="space-y-2 mb-4">
                {sensorCards.map((sensor, index) => (
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

            <div className="mb-4">
                <h2 className="text-white text-lg font-semibold mb-2">Controls</h2>
                <div className="grid grid-cols-4 gap-2">
                    {actuatorControls.map((actuator) => (
                        <ActuatorButton
                            key={actuator.name}
                            icon={actuator.icon}
                            label={actuator.label}
                            isActive={currentActuators[actuator.name]}
                            onClick={() => toggleActuator(actuator.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sensors;
