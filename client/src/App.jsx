import './App.css'
import FooterNav from './components/FooterNav'
import Settings from './tabs/Settings'
import Sensors from './tabs/Sensors'
import Controls from './tabs/Controls'
import Analytics from './tabs/Analytics'
import Notifications from './tabs/Notifications'

function App() {

    return (
        <FooterNav>
            <Sensors />
            <Notifications />
            <Controls />
            <Analytics />
            <Settings />
        </FooterNav>
    )
}

export default App
