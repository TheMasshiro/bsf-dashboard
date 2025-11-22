import './App.css'
import FooterNav from './components/FooterNav'
import Settings from './tabs/Settings'
import Sensors from './tabs/Sensors'
import Analytics from './tabs/Analytics'
import Notifications from './tabs/Notifications'

function App() {

    return (
        <FooterNav>
            <Sensors />
            <Notifications />
            <Analytics />
            <Settings />
        </FooterNav>
    )
}

export default App
