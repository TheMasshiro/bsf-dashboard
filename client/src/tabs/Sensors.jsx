import Card from "../components/Card";

const Sensors = () => {
    const sensorData = [
        {
            name: 'Temperature',
            icon: '🌡️',
            value: '24.5',
            unit: '°C',
            status: 'normal'
        },
        {
            name: 'Humidity',
            icon: '💧',
            value: '65',
            unit: '%',
            status: 'normal'
        },
        {
            name: 'Substrate Moisture',
            icon: '🌱',
            value: '72',
            unit: '%',
            status: 'success'
        },
        {
            name: 'Light Intensity',
            icon: '☀️',
            value: '850',
            unit: 'lux',
            status: 'warning'
        }
    ];

    return (
        <div className="w-full h-full">
            <div className="mb-4">
                <h1 className="text-white text-2xl font-bold mb-1">Sensors</h1>
                <p className="text-gray-400 text-sm">Real-time monitoring data</p>
            </div>

            <div className="space-y-3">
                {sensorData.map((sensor, index) => (
                    <Card
                        key={index}
                        icon={sensor.icon}
                        value={sensor.value}
                        unit={sensor.unit}
                        status={sensor.status}
                    >
                        {sensor.name}
                    </Card>
                ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-neutral-800/50 border border-gray-700">
                <h3 className="text-white text-sm font-semibold mb-3">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-neutral-700/30 rounded-lg">
                        <p className="text-green-400 text-lg font-bold">4/4</p>
                        <p className="text-gray-400 text-xs">Online</p>
                    </div>
                    <div className="text-center p-2 bg-neutral-700/30 rounded-lg">
                        <p className="text-blue-400 text-lg font-bold">100%</p>
                        <p className="text-gray-400 text-xs">Uptime</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sensors;
