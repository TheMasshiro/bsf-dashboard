export default function Card({ children, className = '', icon = '📊', value = '', unit = '', status = 'normal' }) {
    const statusColors = {
        normal: 'border-gray-700 bg-neutral-800',
        warning: 'border-yellow-500/50 bg-yellow-900/20',
        danger: 'border-red-500/50 bg-red-900/20',
        success: 'border-green-500/50 bg-green-900/20'
    };

    return (
        <div className={`
            relative overflow-hidden
            rounded-2xl border-2
            ${statusColors[status]}
            p-4 mb-3
            transition-all active:scale-[0.98]
            ${className}
        `}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-3xl">{icon}</div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">{children}</h3>
                        {value && (
                            <p className="text-gray-400 text-xs mt-0.5">
                                Last updated: 2m ago
                            </p>
                        )}
                    </div>
                </div>
                {value && (
                    <div className="text-right">
                        <p className="text-white text-2xl font-bold">
                            {value}
                        </p>
                        {unit && (
                            <p className="text-gray-400 text-xs">{unit}</p>
                        )}
                    </div>
                )}
            </div>
            {children === 'children' && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="h-12 bg-neutral-700/30 rounded-lg"></div>
                </div>
            )}
        </div>
    );
}
