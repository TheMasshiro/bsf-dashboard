const LifecycleOrb = ({ currentStage, isOpen, onToggle, stages, onSelectStage }) => {
    return (
        <>
            <button
                onClick={onToggle}
                className={`fixed top-4 right-4 w-14 h-14 rounded-full shadow-lg transition-all active:scale-95 z-50 flex items-center justify-center text-white font-semibold text-xs ${currentStage.color}`}
            >
                {currentStage.label}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onToggle}>
                    <div className="bg-neutral-900 rounded-2xl p-6 m-4 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-white text-xl font-bold mb-4">Select Life Cycle Stage</h2>
                        <div className="space-y-2">
                            {stages.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => onSelectStage(stage.id)}
                                    className={`w-full flex items-center justify-center p-4 rounded-lg border transition-all active:scale-95 ${currentStage.id === stage.id
                                        ? `${stage.color} border-white text-white`
                                        : 'bg-neutral-800 border-gray-700 text-gray-400'
                                        }`}
                                >
                                    <span className="font-medium text-lg">{stage.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LifecycleOrb;
