import { createContext, useContext, useState, useEffect } from 'react';
import { useLifecycle } from './LifecycleContext';
import { storage, STORAGE_KEYS } from '../utils/storage';
import androidBridge from '../utils/androidBridge';

const ActuatorContext = createContext();

export const ActuatorProvider = ({ children, sendActuatorCommand }) => {
    const { currentLifecycle } = useLifecycle();

    const [lightTimers, setLightTimers] = useState(() => {
        return storage.get(STORAGE_KEYS.LIGHT_TIMERS, {
            egg: null,
            larva: null,
            pupa: null,
            adult: null
        });
    });

    const [actuatorStates, setActuatorStates] = useState(() => {
        const savedStates = storage.get(STORAGE_KEYS.ACTUATOR_STATES, {
            egg: { fan: false, waterPump: false, light: 0, heater: false },
            larva: { fan: false, waterPump: false, light: 0, heater: false },
            pupa: { fan: false, waterPump: false, light: 0, heater: false },
            adult: { fan: false, waterPump: false, light: 0, heater: false }
        });

        // Restore light hours from timers
        const savedTimers = storage.get(STORAGE_KEYS.LIGHT_TIMERS, {});
        Object.keys(savedStates).forEach(lifecycle => {
            if (savedTimers[lifecycle] && savedTimers[lifecycle] > 0) {
                const hours = Math.ceil(savedTimers[lifecycle] / 3600);
                savedStates[lifecycle].light = hours;
            }
        });

        return savedStates;
    });

    useEffect(() => {
        storage.save(STORAGE_KEYS.ACTUATOR_STATES, actuatorStates);
    }, [actuatorStates]);

    useEffect(() => {
        storage.save(STORAGE_KEYS.LIGHT_TIMERS, lightTimers);
    }, [lightTimers]);

    useEffect(() => {
        // Check if it's 6 PM and auto-turn on lights with 12 hours
        const checkAutoSchedule = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();

            // Check if it's 6:00 PM (18:00)
            if (currentHour === 18 && currentMinute === 0) {
                Object.keys(actuatorStates).forEach(lifecycle => {
                    // Only turn on if light is currently off
                    if (actuatorStates[lifecycle].light === 0) {
                        setActuatorStates(prev => ({
                            ...prev,
                            [lifecycle]: {
                                ...prev[lifecycle],
                                light: 12
                            }
                        }));

                        setLightTimers(prev => ({
                            ...prev,
                            [lifecycle]: 12 * 3600
                        }));

                        androidBridge.showToast('Light auto-turned on for 12 hours');
                    }
                });
            }
        };

        const interval = setInterval(() => {
            // Check auto-schedule every second
            checkAutoSchedule();

            setLightTimers(prev => {
                const updated = { ...prev };
                let hasChanges = false;

                Object.keys(updated).forEach(lifecycle => {
                    if (updated[lifecycle] && updated[lifecycle] > 0) {
                        updated[lifecycle] = updated[lifecycle] - 1;
                        hasChanges = true;

                        if (updated[lifecycle] === 0) {
                            setActuatorStates(prevStates => ({
                                ...prevStates,
                                [lifecycle]: {
                                    ...prevStates[lifecycle],
                                    light: 0
                                }
                            }));
                        }
                    }
                });

                return hasChanges ? updated : prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [actuatorStates]);

    const toggleActuator = (name) => {
        let newState;

        if (name === 'light') {
            const currentValue = actuatorStates[currentLifecycle][name];
            const durations = [0, 4, 8, 12];
            const currentIndex = durations.indexOf(currentValue);
            const nextIndex = (currentIndex + 1) % durations.length;
            newState = durations[nextIndex];

            if (newState > 0) {
                setLightTimers(prev => ({
                    ...prev,
                    [currentLifecycle]: newState * 3600
                }));
            } else {
                setLightTimers(prev => ({
                    ...prev,
                    [currentLifecycle]: null
                }));
            }
        } else {
            newState = !actuatorStates[currentLifecycle][name];
        }

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
    const currentLightTimer = lightTimers[currentLifecycle];

    return (
        <ActuatorContext.Provider value={{ currentActuators, currentLightTimer, toggleActuator }}>
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
