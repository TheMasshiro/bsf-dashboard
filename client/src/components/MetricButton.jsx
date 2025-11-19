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

export default MetricButton;
