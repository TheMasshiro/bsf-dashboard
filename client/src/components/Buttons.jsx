const ActuatorButton = ({ icon, label, isActive = false, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-0.5 p-1.5 rounded-lg border transition-all active:scale-95 ${isActive
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-neutral-800 border-gray-700 text-gray-400'
                }`}
        >
            <span className="text-lg">{icon}</span>
            <span className="font-medium text-[10px]">{label}</span>
        </button>
    );
};


const MetricButton = ({
    icon,
    value,
    unit,
    isActive = false,
    onClick,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                aspect-square p-4 rounded-xl border-2 transition-all active:scale-95
                ${isActive
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-gray-700 bg-neutral-800'
                }
                ${className}
            `}
        >
            <div className="flex flex-col items-center justify-center gap-1 h-full">
                <span className="text-2xl">{icon}</span>
                <p className="text-white text-sm font-bold">{value}{unit}</p>
            </div>
        </button>
    );
};


const SettingsButton = ({ label, icon, onClick, danger = false }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all active:scale-95 ${danger
                ? 'bg-red-950 border-red-800 text-red-400 hover:bg-red-900'
                : 'bg-neutral-800 border-gray-700 text-white hover:bg-neutral-700'
                }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
            <span className="text-gray-400">›</span>
        </button>
    );
};

export { ActuatorButton, MetricButton, SettingsButton };
