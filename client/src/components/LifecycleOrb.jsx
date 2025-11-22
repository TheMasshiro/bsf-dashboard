import { useState } from 'react';
import { useLifecycle } from '../context/LifecycleContext';

const LifecycleOrb = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentLifecycle, setCurrentLifecycle } = useLifecycle();

    const stages = [
        { id: 'egg', label: 'Egg', color: 'bg-neutral-700' },
        { id: 'larva', label: 'Larva', color: 'bg-neutral-700' },
        { id: 'prepupa', label: 'Prepupa', color: 'bg-neutral-700' },
        { id: 'pupa', label: 'Pupa', color: 'bg-neutral-700' },
        { id: 'adult', label: 'Adult', color: 'bg-neutral-700' }
    ];

    const currentStage = stages.find(s => s.id === currentLifecycle);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-4 right-4 w-14 h-14 rounded-full shadow-lg transition-all active:scale-95 z-50 flex items-center justify-center text-white font-semibold text-xs ${currentStage.color}`}
            >
                {currentStage.label}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
                    <div className="bg-neutral-900 rounded-2xl p-6 m-4 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-white text-xl font-bold mb-4">Select Life Cycle Stage</h2>
                        <div className="space-y-2">
                            {stages.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => {
                                        setCurrentLifecycle(stage.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-center p-4 rounded-lg border transition-all active:scale-95 ${currentLifecycle === stage.id
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
