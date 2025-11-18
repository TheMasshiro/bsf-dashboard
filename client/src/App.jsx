import './App.css'
import FooterNav from './components/FooterNav'
import Status from './tabs/Status'
import Sensors from './tabs/Sensors'
import Controls from './tabs/Controls'
import Analytics from './tabs/Analytics'
import Notifications from './tabs/Notifications'

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
