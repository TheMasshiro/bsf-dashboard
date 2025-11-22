import { createContext, useContext, useState } from 'react';
import { useLifecycle } from './LifecycleContext';

const ActuatorContext = createContext();

export const ActuatorProvider = ({ children }) => {
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
