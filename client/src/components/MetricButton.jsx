const MetricButton = ({
    icon,
    name,
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
                p-4 rounded-xl border-2 transition-all active:scale-95
                ${isActive
                    ? 'border-blue-500 bg-blue-900/30'
                    : 'border-gray-700 bg-neutral-800'
                }
                ${className}
            `}
        >
            <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">{icon}</span>
                <div className="text-left">
                    <p className="text-white text-sm font-semibold">{name}</p>
                    <p className="text-gray-400 text-xs">{value}{unit}</p>
                </div>
            </div>
        </button>
    );
};

export default MetricButton;
