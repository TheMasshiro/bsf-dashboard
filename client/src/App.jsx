import { useState } from 'react'
import './App.css'
import FooterNav from './components/FooterNav'
import Settings from './tabs/Settings'
import Sensors from './tabs/Sensors'
import Analytics from './tabs/Analytics'
import Notifications from './tabs/Notifications'
import LifecycleOrb from './components/LifecycleOrb'
import { LifecycleProvider, useLifecycle } from './context/LifecycleContext'
import { ActuatorProvider } from './context/ActuatorContext'

function AppContent() {
    const [activeTab, setActiveTab] = useState(0);
    const [isOrbOpen, setIsOrbOpen] = useState(false);
    const { currentLifecycle, setCurrentLifecycle } = useLifecycle();

    const tabs = [
        { name: 'Sensors', icon: '🌡️' },
        { name: 'Notifications', icon: '🔔' },
        { name: 'Analytics', icon: '📈' },
        { name: 'Settings', icon: '⚙️' }
    ];

    const stages = [
        { id: 'egg', label: 'Egg', color: 'bg-neutral-700' },
        { id: 'larva', label: 'Larva', color: 'bg-neutral-700' },
        { id: 'prepupa', label: 'Prepupa', color: 'bg-neutral-700' },
        { id: 'pupa', label: 'Pupa', color: 'bg-neutral-700' },
        { id: 'adult', label: 'Adult', color: 'bg-neutral-700' }
    ];

    const currentStage = stages.find(s => s.id === currentLifecycle);

    const handleSelectStage = (stageId) => {
        setCurrentLifecycle(stageId);
        setIsOrbOpen(false);
    };

    return (
        <>
            <FooterNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs}
            >
                <Sensors />
                <Notifications />
                <Analytics />
                <Settings />
            </FooterNav>
            <LifecycleOrb
                currentStage={currentStage}
                isOpen={isOrbOpen}
                onToggle={() => setIsOrbOpen(!isOrbOpen)}
                stages={stages}
                onSelectStage={handleSelectStage}
            />
        </>
    );
}

function App() {
    return (
        <LifecycleProvider>
            <ActuatorProvider>
                <AppContent />
            </ActuatorProvider>
        </LifecycleProvider>
    )
}

export default App
