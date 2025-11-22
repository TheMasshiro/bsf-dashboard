import { useLifecycle } from '../context/LifecycleContext';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationCard } from '../components/Cards';
import EmptyState from '../components/EmptyState';

const Notifications = () => {
    const { currentLifecycle } = useLifecycle();

    const currentReadings = {
        temperature: 24.5,
        humidity: 65,
        moisture: 72,
        light: 850
    };

    const notifications = useNotifications(currentReadings);

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
