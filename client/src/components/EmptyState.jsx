const EmptyState = ({ title, description }) => {
    return (
        <div className="bg-neutral-800 rounded-lg p-6 border border-gray-700">
            <p className="text-white font-semibold mb-1">{title}</p>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
};

export default EmptyState;
