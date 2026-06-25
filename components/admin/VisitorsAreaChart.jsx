'use client'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts'

const VisitorsAreaChart = ({ data = [] }) => {

    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64
                            bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-400 text-sm">
                    Nenhum dado de tráfego disponível
                </p>
            </div>
        )
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorVisitantes"
                            x1="0" y1="0"
                            x2="0" y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#22c55e"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#22c55e"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f1f5f9"
                    />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                        width={30}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: '#475569'
                        }}
                        formatter={(value) => [value, 'Visitantes']}
                    />
                    <Area
                        type="monotone"
                        dataKey="visitantes"
                        stroke="#22c55e"
                        strokeWidth={2.5}
                        fill="url(#colorVisitantes)"
                        dot={false}
                        activeDot={{
                            r: 5,
                            fill: '#16a34a',
                            stroke: '#fff',
                            strokeWidth: 2
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VisitorsAreaChart