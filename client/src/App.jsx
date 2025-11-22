import './App.css'
import FooterNav from './components/FooterNav'
import Settings from './tabs/Settings'
import Sensors from './tabs/Sensors'
import Analytics from './tabs/Analytics'
import Notifications from './tabs/Notifications'
import LifecycleOrb from './components/LifecycleOrb'
import { LifecycleProvider } from './context/LifecycleContext'

function App() {

    return (
        <LifecycleProvider>
            <FooterNav>
                <Sensors />
                <Notifications />
                <Analytics />
                <Settings />
            </FooterNav>
            <LifecycleOrb />
        </LifecycleProvider>
    )
}

export default App
