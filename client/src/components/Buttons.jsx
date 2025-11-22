import { useState } from 'react';

const Buttons = () => {
    const [actuators, setActuators] = useState({
        fan: false,
        waterPump: false,
        light: false,
        heater: false
    });

    const toggleActuator = (name) => {
        setActuators(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const actuatorButtons = [
        { name: 'fan', label: 'Fan', icon: '🌀' },
        { name: 'waterPump', label: 'Water Pump', icon: '💧' },
        { name: 'light', label: 'Light', icon: '💡' },
        { name: 'heater', label: 'Heater', icon: '🔥' }
    ];

    return (
        <div className="mb-4">
            <h2 className="text-white text-lg font-semibold mb-2">Controls</h2>
            <div className="grid grid-cols-4 gap-2">
                {actuatorButtons.map((actuator) => (
                    <button
                        key={actuator.name}
                        onClick={() => toggleActuator(actuator.name)}
                        className={`flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-lg border transition-all active:scale-95 ${actuators[actuator.name]
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'bg-neutral-800 border-gray-700 text-gray-400'
                            }`}
                    >
                        <span className="text-lg">{actuator.icon}</span>
                        <span className="font-medium text-[10px]">{actuator.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Buttons;
