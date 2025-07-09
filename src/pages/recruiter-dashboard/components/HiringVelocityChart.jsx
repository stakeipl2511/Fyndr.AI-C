import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const HiringVelocityChart = ({ velocityData, timeRange, onTimeRangeChange }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-sm font-medium text-text-primary mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${entry.name === 'Time to Fill' ? 'days' : 'hires'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">Hiring Velocity</h3>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm">+8% faster</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onTimeRangeChange(range.value)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                timeRange === range.value
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-white/10'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={velocityData}>
            <defs>
              <linearGradient id="hiresGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5eead4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#5eead4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="hires"
              stroke="#a78bfa"
              strokeWidth={2}
              fill="url(#hiresGradient)"
              name="Hires"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="timeToFill"
              stroke="#5eead4"
              strokeWidth={2}
              dot={{ fill: '#5eead4', strokeWidth: 2, r: 4 }}
              name="Time to Fill"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-sm text-text-secondary">Avg. Time to Fill</p>
          <p className="text-xl font-semibold text-text-primary">18 days</p>
          <p className="text-xs text-success">-3 days vs last month</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-secondary">Total Hires</p>
          <p className="text-xl font-semibold text-text-primary">47</p>
          <p className="text-xs text-success">+12% vs last month</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-secondary">Offer Acceptance</p>
          <p className="text-xl font-semibold text-text-primary">89%</p>
          <p className="text-xs text-success">+5% vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default HiringVelocityChart;