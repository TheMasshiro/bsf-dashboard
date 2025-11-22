import { createContext, useContext, useState } from 'react';

const LifecycleContext = createContext();

export const LifecycleProvider = ({ children }) => {
    const [currentLifecycle, setCurrentLifecycle] = useState('larva');

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
