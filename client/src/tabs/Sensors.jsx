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
            <div className="mb-2">
                <h1 className="text-white text-2xl font-bold mb-1">Sensors</h1>
                <p className="text-gray-400 text-sm">Real-time monitoring data</p>
            </div>

            <div className="space-y-2">
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
        </div>
    );
};

export default Sensors;
