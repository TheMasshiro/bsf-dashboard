import { SensorCard } from '../components/Cards';
import { ActuatorButton } from "../components/Buttons";
import { useLifecycle } from "../context/LifecycleContext";
import { useActuators } from "../context/ActuatorContext";
import { lifecycleThresholds, getStatus } from "../config/lifecycleThresholds";

const Sensors = ({ sensorData, lastUpdate }) => {
    const { currentLifecycle } = useLifecycle();
    const { currentActuators, currentLightTimer, toggleActuator } = useActuators();
    const thresholds = lifecycleThresholds[currentLifecycle];

    const currentReadings = sensorData || {
        temperature: 24.5,
        humidity: 65,
        moisture: 72,
        ammonia: 15
    };

    const formatCountdown = (seconds) => {
        if (!seconds || seconds <= 0) return '0:00';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    };

    const getTimeSinceUpdate = () => {
        if (!lastUpdate) return 'Never updated';

        const now = new Date();
        const updateTime = new Date(lastUpdate);
        const diffMs = now - updateTime;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    const getLightStatusMessage = () => {
        if (!currentLightTimer || currentLightTimer <= 0) {
            return 'Light is currently turned off';
        }

        const now = new Date();
        const turnOffTime = new Date(now.getTime() + currentLightTimer * 1000);
        const hours = turnOffTime.getHours();
        const minutes = turnOffTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');

        return `Light will turn off at ${displayHours}:${displayMinutes} ${ampm}`;
    };

    const actuatorControls = [
        { name: 'fan', label: 'Fan', icon: '🍃', type: 'toggle' },
        { name: 'waterPump', label: 'Water Pump', icon: '💧', type: 'toggle' },
        { name: 'light', label: `Light ${currentActuators.light || 0}h`, icon: '💡', type: 'cycle' },
        { name: 'heater', label: 'Heater', icon: '🔥', type: 'toggle' }
    ];

    const sensorCards = [
        {
            name: 'Temperature',
            icon: '🌡️',
            value: (currentReadings.temperature ?? 0).toString(),
            unit: '°C',
            status: getStatus(currentReadings.temperature, thresholds.temperature),
            statusMessage: `Last updated: ${getTimeSinceUpdate()}`
        },
        {
            name: 'Humidity',
            icon: '💧',
            value: (currentReadings.humidity ?? 0).toString(),
            unit: '%',
            status: getStatus(currentReadings.humidity, thresholds.humidity),
            statusMessage: `Last updated: ${getTimeSinceUpdate()}`
        },
        {
            name: 'Substrate Moisture',
            icon: '🌱',
            value: (currentReadings.moisture ?? 0).toString(),
            unit: '%',
            status: getStatus(currentReadings.moisture, thresholds.moisture),
            statusMessage: `Last updated: ${getTimeSinceUpdate()}`
        },
        {
            name: 'Light Duration',
            icon: '☀️',
            value: formatCountdown(currentLightTimer),
            unit: '',
            status: currentLightTimer > 0 ? 'success' : 'warning',
            statusMessage: getLightStatusMessage()
        },
        {
            name: 'Ammonia',
            icon: '💨',
            value: (currentReadings.ammonia ?? 0).toString(),
            unit: 'ppm',
            status: getStatus(currentReadings.ammonia, thresholds.ammonia),
            statusMessage: `Last updated: ${getTimeSinceUpdate()}`
        }
    ];

    return (
        <div className="w-full h-full">
            <div className="mb-2">
                <h1 className="text-white text-2xl font-bold mb-1">Sensors</h1>
            </div>

            <div className="space-y-2 mb-4">
                {sensorCards.map((sensor, index) => (
                    <SensorCard
                        key={index}
                        icon={sensor.icon}
                        value={sensor.value}
                        unit={sensor.unit}
                        status={sensor.status}
                        statusMessage={sensor.statusMessage}
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
                            isActive={actuator.type === 'toggle' ? currentActuators[actuator.name] : currentActuators[actuator.name] > 0}
                            onClick={() => toggleActuator(actuator.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sensors;
