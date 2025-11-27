import { createContext, useContext, useState, useEffect } from 'react';
import { useLifecycle } from './LifecycleContext';
import { storage, STORAGE_KEYS } from '../utils/storage';
import androidBridge from '../utils/androidBridge';

const ActuatorContext = createContext();

export const ActuatorProvider = ({ children, sendActuatorCommand }) => {
    const { currentLifecycle } = useLifecycle();
    const [actuatorStates, setActuatorStates] = useState(() => {
        return storage.get(STORAGE_KEYS.ACTUATOR_STATES, {
            egg: { fan: false, waterPump: false, light: false, heater: false },
            larva: { fan: false, waterPump: false, light: false, heater: false },
            pupa: { fan: false, waterPump: false, light: false, heater: false },
            adult: { fan: false, waterPump: false, light: false, heater: false }
        });
    });

    useEffect(() => {
        storage.save(STORAGE_KEYS.ACTUATOR_STATES, actuatorStates);
    }, [actuatorStates]);

    const toggleActuator = (name) => {
        const newState = !actuatorStates[currentLifecycle][name];

        setActuatorStates(prev => ({
            ...prev,
            [currentLifecycle]: {
                ...prev[currentLifecycle],
                [name]: newState
            }
        }));

        // Send command via WebSocket if available
        if (sendActuatorCommand) {
            sendActuatorCommand(currentLifecycle, name, newState);
        }

        // Vibrate on Android for feedback
        androidBridge.vibrate(50);
    };

    const currentActuators = actuatorStates[currentLifecycle];

    return (
        <ActuatorContext.Provider value={{ currentActuators, toggleActuator }}>
            {children}
        </ActuatorContext.Provider>
    );
};

export const useActuators = () => {
    const context = useContext(ActuatorContext);
    if (!context) {
        throw new Error('useActuators must be used within ActuatorProvider');
    }
    return context;
};
