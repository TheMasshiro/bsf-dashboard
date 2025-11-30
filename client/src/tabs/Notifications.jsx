import { useLifecycle } from '../context/LifecycleContext';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationCard } from '../components/Cards';
import EmptyState from '../components/EmptyState';

const Notifications = ({ sensorData, lastUpdate }) => {
    const { currentLifecycle } = useLifecycle();

    const currentReadings = sensorData || {
        temperature: 24.5,
        humidity: 65,
        moisture: 72,
        ammonia: 15
    };

    const getTimeSinceUpdate = () => {
        if (!lastUpdate) return 'Never';

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

    const notifications = useNotifications(currentReadings).map(notif => ({
        ...notif,
        timestamp: getTimeSinceUpdate()
    }));

    return (
        <div className="w-full h-full">
            <div className="mb-2">
                <h1 className="text-white text-2xl font-bold mb-1">Notifications</h1>
            </div>

            {notifications.length === 0 ? (
                <EmptyState
                    title="All Systems Normal"
                    description={`All sensors are within optimal range for ${currentLifecycle} stage`}
                />
            ) : (
                <div className="space-y-2">
                    {notifications.map(notif => (
                        <NotificationCard key={notif.id} notification={notif} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
