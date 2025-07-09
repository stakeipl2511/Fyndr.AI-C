import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const DEIMetricsPanel = ({ diversityData, inclusionMetrics }) => {
  const COLORS = ['#a78bfa', '#5eead4', '#fbcfe8', '#fbbf24', '#f87171'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-sm font-medium text-text-primary">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">DEI Metrics</h3>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm text-success">+12% this quarter</span>
        </div>
      </div>
      
      {/* Diversity Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-secondary mb-3">Hiring Diversity</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={diversityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {diversityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {diversityData.map((item, index) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-text-secondary">{item.name}</span>
              <span className="text-xs font-medium text-text-primary">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Inclusion Metrics */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">Inclusion Score</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={inclusionMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Interview-to-Hire Ratio</span>
            <span className="text-sm font-medium text-text-primary">3.2:1</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Diverse Leadership Hires</span>
            <span className="text-sm font-medium text-success">+18%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Pay Equity Score</span>
            <span className="text-sm font-medium text-text-primary">94/100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DEIMetricsPanel;