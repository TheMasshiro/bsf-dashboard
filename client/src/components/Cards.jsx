import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

const SensorCard = ({ children, className = '', icon = '📊', value = '', unit = '', status = 'normal' }) => {
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
                        <h3 className="text-left text-white font-semibold text-sm">{children}</h3>
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
};

const NotificationCard = ({ notification }) => {
    return (
        <div
            className={`rounded-lg p-3 border ${notification.type === 'danger'
                ? 'bg-red-950 border-red-800'
                : 'bg-yellow-950 border-yellow-800'
                }`}
        >
            <div className="flex items-center justify-between mb-1">
                <h3 className={`font-semibold text-sm ${notification.type === 'danger' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                    {notification.sensor}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded uppercase font-semibold ${notification.type === 'danger'
                    ? 'bg-red-800 text-red-200'
                    : 'bg-yellow-800 text-yellow-200'
                    }`}>
                    {notification.type}
                </span>
            </div>
            <p className="text-white text-sm mb-1">
                Current: <span className="font-bold">{notification.value}{notification.unit}</span>
            </p>
            <p className="text-gray-300 text-xs mb-1">{notification.message}</p>
            <p className="text-gray-400 text-xs">
                Lifecycle: <span className="capitalize">{notification.lifecycle}</span> • {notification.timestamp}
            </p>
        </div>
    );
};


const CustomTooltip = ({ active, payload, unit }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-neutral-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                <p className="text-white text-sm font-semibold">{payload[0].value}{unit}</p>
                <p className="text-gray-400 text-xs">{payload[0].payload.time}</p>
            </div>
        );
    }
    return null;
};

const ChartCard = ({
    title,
    icon,
    currentValue,
    unit,
    data,
    upperLimit,
    warningLimit,
    lowerLimit,
    color = '#3b82f6',
    minY,
    maxY,
    className = ''
}) => {

    return (
        <div className={`bg-neutral-800 rounded-2xl border-2 border-gray-700 p-4 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">{title}</h3>
                <span className="text-2xl">{icon}</span>
            </div>

            <div className="mb-4 p-3 bg-neutral-700/30 rounded-lg">
                <p className="text-gray-400 text-xs mb-1">Current Reading</p>
                <p className="text-white text-3xl font-bold">
                    {currentValue}
                    <span className="text-lg text-gray-400 ml-1">{unit}</span>
                </p>
            </div>

            <div className="h-48 w-full touch-none" style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="time"
                            stroke="#9ca3af"
                            style={{ fontSize: '9px' }}
                            label={{ value: 'Time', position: 'insideBottom', offset: 0, fill: '#9ca3af', fontSize: 10 }}
                            height={45}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            style={{ fontSize: '9px' }}
                            domain={[minY, maxY]}
                            label={{ value: unit, angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 10 }}
                            width={40}
                        />
                        <Tooltip content={<CustomTooltip unit={unit} />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />

                        {upperLimit !== undefined && (
                            <ReferenceLine
                                y={upperLimit}
                                stroke="#ef4444"
                                strokeDasharray="5 5"
                                label={{ value: 'Max', position: 'right', fill: '#ef4444', fontSize: 10 }}
                            />
                        )}

                        {warningLimit !== undefined && (
                            <ReferenceLine
                                y={warningLimit}
                                stroke="#f59e0b"
                                strokeDasharray="5 5"
                                label={{ value: 'Warn', position: 'right', fill: '#f59e0b', fontSize: 10 }}
                            />
                        )}

                        {lowerLimit !== undefined && (
                            <ReferenceLine
                                y={lowerLimit}
                                stroke="#3b82f6"
                                strokeDasharray="5 5"
                                label={{ value: 'Min', position: 'right', fill: '#3b82f6', fontSize: 10 }}
                            />
                        )}

                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === data.length - 1 ? '#10b981' : color}
                                    opacity={index === data.length - 1 ? 1 : 0.6}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {(upperLimit !== undefined || warningLimit !== undefined || lowerLimit !== undefined) && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                    <div className="flex justify-center gap-3 text-xs">
                        {upperLimit !== undefined && (
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-0.5 bg-red-500"></div>
                                <span className="text-gray-400">Upper: {upperLimit}{unit}</span>
                            </div>
                        )}
                        {warningLimit !== undefined && (
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-0.5 bg-yellow-500"></div>
                                <span className="text-gray-400">Warn: {warningLimit}{unit}</span>
                            </div>
                        )}
                        {lowerLimit !== undefined && (
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-0.5 bg-blue-500"></div>
                                <span className="text-gray-400">Lower: {lowerLimit}{unit}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const InfoCard = ({ icon, title, description }) => {
    return (
        <div className="bg-blue-950 border border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="text-left">
                    <p className="text-blue-400 font-semibold mb-1">{title}</p>
                    <p className="text-gray-300 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
};

export { SensorCard, NotificationCard, ChartCard, InfoCard };
