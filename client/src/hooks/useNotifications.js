import { useLifecycle } from '../context/LifecycleContext';
import { lifecycleThresholds, getStatus } from '../config/lifecycleThresholds';

export const useNotifications = (currentReadings) => {
    const { currentLifecycle } = useLifecycle();
    const thresholds = lifecycleThresholds[currentLifecycle];

    const notifications = [];

    const sensors = [
        { key: 'temperature', name: 'Temperature', icon: '🌡️', unit: '°C' },
        { key: 'humidity', name: 'Humidity', icon: '💧', unit: '%' },
        { key: 'moisture', name: 'Substrate Moisture', icon: '🌱', unit: '%' },
        { key: 'light', name: 'Light Intensity', icon: '☀️', unit: 'lux' }
    ];

    sensors.forEach(sensor => {
        const value = currentReadings[sensor.key];
        const threshold = thresholds[sensor.key];
        const status = getStatus(value, threshold);

        if (status === 'danger') {
            notifications.push({
                id: `${sensor.key}-danger`,
                type: 'danger',
                sensor: sensor.name,
                icon: sensor.icon,
                lifecycle: currentLifecycle,
                value: value,
                unit: sensor.unit,
                message: value < threshold.min
                    ? `Below minimum threshold (${threshold.min}${sensor.unit})`
                    : `Above maximum threshold (${threshold.max}${sensor.unit})`,
                timestamp: 'Just now'
            });
        } else if (status === 'warning') {
            notifications.push({
                id: `${sensor.key}-warning`,
                type: 'warning',
                sensor: sensor.name,
                icon: sensor.icon,
                lifecycle: currentLifecycle,
                value: value,
                unit: sensor.unit,
                message: value < threshold.optimal[0]
                    ? `Below optimal range (${threshold.optimal[0]}-${threshold.optimal[1]}${sensor.unit})`
                    : `Above optimal range (${threshold.optimal[0]}-${threshold.optimal[1]}${sensor.unit})`,
                timestamp: 'Just now'
            });
        }
    });

    return notifications;
};
