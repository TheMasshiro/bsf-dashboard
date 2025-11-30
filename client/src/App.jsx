import { useState, useEffect } from 'react'
import './App.css'
import FooterNav from './components/FooterNav'
import Settings from './tabs/Settings'
import Sensors from './tabs/Sensors'
import Analytics from './tabs/Analytics'
import Notifications from './tabs/Notifications'
import LifecycleOrb from './components/LifecycleOrb'
import { LifecycleProvider, useLifecycle } from './context/LifecycleContext'
import { ActuatorProvider } from './context/ActuatorContext'
import { useWebSocket } from './hooks/useWebSocket'
import { useLifecycleEvents } from './hooks/useLifecycleEvents'
import androidBridge from './utils/androidBridge'

function AppContent() {
    const [activeTab, setActiveTab] = useState(0);
    const [isOrbOpen, setIsOrbOpen] = useState(false);
    const { currentLifecycle, setCurrentLifecycle } = useLifecycle();

    const {
        isConnected,
        sensorData,
        lastUpdate,
        sendActuatorCommand,
        reconnect
    } = useWebSocket();

    useLifecycleEvents({
        onPause: () => {
            console.log('App paused - WebSocket will auto-disconnect');
        },
        onResume: () => {
            console.log('App resumed - attempting to reconnect');
            reconnect();
        }
    });

    useEffect(() => {
        if (androidBridge.isAndroidWebView()) {
            console.log('Running in Android WebView');
        }
    }, []);

    const tabs = [
        { name: 'Sensors', icon: '🌡️' },
        { name: 'Notifications', icon: '🔔' },
        { name: 'Analytics', icon: '📈' },
        { name: 'Settings', icon: '⚙️' }
    ];

    const stages = [
        { id: 'egg', label: 'Egg', color: 'bg-neutral-700' },
        { id: 'larva', label: 'Larva', color: 'bg-neutral-700' },
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
            <div className="fixed top-2 left-2 z-50">
                <div className={`px-2 py-1 rounded text-xs ${isConnected ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {isConnected ? '🟢 Connected' : '🔴 Offline'}
                </div>
            </div>

            <ActuatorProvider sendActuatorCommand={sendActuatorCommand}>
                <FooterNav
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={tabs}
                >
                    <Sensors sensorData={sensorData} lastUpdate={lastUpdate} />
                    <Notifications sensorData={sensorData} lastUpdate={lastUpdate} />
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
            </ActuatorProvider>
        </>
    );
}

function App() {
    return (
        <LifecycleProvider>
            <AppContent />
        </LifecycleProvider>
    )
}

export default App
