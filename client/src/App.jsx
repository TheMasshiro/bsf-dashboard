import './App.css'
import FooterNav from './components/FooterNav'
import Status from './tabs/status'
import Sensors from './tabs/sensors'
import Controls from './tabs/controls'
import Analytics from './tabs/analytics'
import Notifications from './tabs/notifications'

function App() {

    return (
        <FooterNav>
            <Notifications />
            <Sensors />
            <Controls />
            <Analytics />
            <Status />
        </FooterNav>
    )
}

export default App
