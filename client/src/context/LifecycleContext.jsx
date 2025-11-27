import { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

const LifecycleContext = createContext();

export const LifecycleProvider = ({ children }) => {
    const [currentLifecycle, setCurrentLifecycle] = useState(() => {
        return storage.get(STORAGE_KEYS.LIFECYCLE, 'larva');
    });

    useEffect(() => {
        storage.save(STORAGE_KEYS.LIFECYCLE, currentLifecycle);
    }, [currentLifecycle]);

    return (
        <LifecycleContext.Provider value={{ currentLifecycle, setCurrentLifecycle }}>
            {children}
        </LifecycleContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLifecycle = () => {
    const context = useContext(LifecycleContext);
    if (!context) {
        throw new Error('useLifecycle must be used within a LifecycleProvider');
    }
    return context;
};
