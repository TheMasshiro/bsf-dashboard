import { SettingsButton } from '../components/Buttons';
import { InfoCard } from '../components/Cards';

const Settings = () => {
    const handleProfile = () => {
        console.log('Profile clicked');
    };

    const handleBackup = () => {
        console.log('Backup data clicked');
    };

    const handleSignOut = () => {
        console.log('Sign out clicked');
    };

    const settingsOptions = [
        { label: 'Profile', icon: '👤', action: handleProfile },
        { label: 'Backup Data', icon: '💾', action: handleBackup }
    ];

    return (
        <div className="w-full h-full">
            <div className="mb-4">
                <h1 className="text-white text-2xl font-bold mb-1">Settings</h1>
                <p className="text-gray-400 text-sm">App configuration and account</p>
            </div>

            <div className="space-y-2 mb-4">
                {settingsOptions.map((option, index) => (
                    <SettingsButton
                        key={index}
                        label={option.label}
                        icon={option.icon}
                        onClick={option.action}
                    />
                ))}
            </div>

            <div className="mb-4">
                <InfoCard
                    icon="ℹ️"
                    title="Automatic Backup"
                    description="Data will be automatically backed up every 5 minutes."
                />
            </div>

            <SettingsButton
                label="Sign Out"
                icon="🚪"
                onClick={handleSignOut}
                danger={true}
            />
        </div>
    );
};

export default Settings;
