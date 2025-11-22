const FooterNav = ({ children, activeTab, onTabChange, tabs }) => {
    return (
        <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-neutral-900">
            <div className="flex-1 overflow-auto p-4 pb-safe">
                {children && children[activeTab]}
            </div>

            <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto flex border-t border-gray-700 bg-neutral-900 safe-area-inset-bottom">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all active:scale-95 ${activeTab === index
                            ? 'text-blue-500 bg-neutral-800'
                            : 'text-gray-400 active:bg-neutral-800'
                            }`}
                        onClick={() => onTabChange(index)}
                    >
                        <span className="text-2xl mb-0.5">{tab.icon}</span>
                        <span className="text-[10px] leading-tight">{tab.name}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default FooterNav;
