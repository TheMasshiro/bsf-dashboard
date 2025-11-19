import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

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
    const CustomTooltip = ({ active, payload }) => {
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

    return (
        <div className={`bg-neutral-800 rounded-2xl border-2 border-gray-700 p-4 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm">{title}</h3>
                <span className="text-2xl">{icon}</span>
            </div>

            {/* Current Value Display */}
            <div className="mb-4 p-3 bg-neutral-700/30 rounded-lg">
                <p className="text-gray-400 text-xs mb-1">Current Reading</p>
                <p className="text-white text-3xl font-bold">
                    {currentValue}
                    <span className="text-lg text-gray-400 ml-1">{unit}</span>
                </p>
            </div>

            {/* Chart */}
            <div className="h-48 touch-none" style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="time"
                            stroke="#9ca3af"
                            style={{ fontSize: '10px' }}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            style={{ fontSize: '10px' }}
                            domain={[minY, maxY]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />

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
                                label={{ value: 'Warning', position: 'right', fill: '#f59e0b', fontSize: 10 }}
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

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fill={`url(#gradient-${title})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            {(upperLimit !== undefined || warningLimit !== undefined || lowerLimit !== undefined) && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                    <div className="grid grid-cols-3 gap-2 text-xs">
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

export default ChartCard;
