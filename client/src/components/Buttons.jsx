import { useState } from 'react';
import { useLifecycle } from '../context/LifecycleContext';

const ActuatorButtons = () => {
    const { currentLifecycle } = useLifecycle();
    const [actuatorStates, setActuatorStates] = useState({
        egg: { fan: false, waterPump: false, light: false, heater: false },
        larva: { fan: false, waterPump: false, light: false, heater: false },
        prepupa: { fan: false, waterPump: false, light: false, heater: false },
        pupa: { fan: false, waterPump: false, light: false, heater: false },
        adult: { fan: false, waterPump: false, light: false, heater: false }
    });

    const toggleActuator = (name) => {
        setActuatorStates(prev => ({
            ...prev,
            [currentLifecycle]: {
                ...prev[currentLifecycle],
                [name]: !prev[currentLifecycle][name]
            }
        }));
    };

    const actuatorButtons = [
        { name: 'fan', label: 'Fan', icon: '🌀' },
        { name: 'waterPump', label: 'Water Pump', icon: '💧' },
        { name: 'light', label: 'Light', icon: '💡' },
        { name: 'heater', label: 'Heater', icon: '🔥' }
    ];

    const currentActuators = actuatorStates[currentLifecycle];

    return (
        <div className="mb-4">
            <h2 className="text-white text-lg font-semibold mb-2">Controls</h2>
            <div className="grid grid-cols-4 gap-2">
                {actuatorButtons.map((actuator) => (
                    <button
                        key={actuator.name}
                        onClick={() => toggleActuator(actuator.name)}
                        className={`flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-lg border transition-all active:scale-95 ${currentActuators[actuator.name]
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


const MetricButton = ({
    icon,
    value,
    unit,
    isActive = false,
    onClick,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                aspect-square p-4 rounded-xl border-2 transition-all active:scale-95
                ${isActive
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-gray-700 bg-neutral-800'
                }
                ${className}
            `}
        >
            <div className="flex flex-col items-center justify-center gap-1 h-full">
                <span className="text-2xl">{icon}</span>
                <p className="text-white text-sm font-bold">{value}{unit}</p>
            </div>
        </button>
    );
};


const SettingsButton = ({ label, icon, onClick, danger = false }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all active:scale-95 ${danger
                ? 'bg-red-950 border-red-800 text-red-400 hover:bg-red-900'
                : 'bg-neutral-800 border-gray-700 text-white hover:bg-neutral-700'
                }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
            <span className="text-gray-400">›</span>
        </button>
    );
};

export { ActuatorButtons, MetricButton, SettingsButton };
