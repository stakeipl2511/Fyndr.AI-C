import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineVisualization = ({ pipelineData }) => {
  const stages = [
    { key: 'sourced', label: 'Sourced', icon: 'Search', color: 'from-blue-500 to-blue-600' },
    { key: 'applied', label: 'Applied', icon: 'FileText', color: 'from-indigo-500 to-indigo-600' },
    { key: 'screening', label: 'Screening', icon: 'Filter', color: 'from-purple-500 to-purple-600' },
    { key: 'interview', label: 'Interview', icon: 'MessageCircle', color: 'from-pink-500 to-pink-600' },
    { key: 'offer', label: 'Offer', icon: 'Gift', color: 'from-green-500 to-green-600' },
    { key: 'hired', label: 'Hired', icon: 'CheckCircle', color: 'from-emerald-500 to-emerald-600' }
  ];

  const maxCount = Math.max(...Object.values(pipelineData));

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Candidate Pipeline</h3>
      
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const count = pipelineData[stage.key] || 0;
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
          const nextStage = stages[index + 1];
          const nextCount = nextStage ? pipelineData[nextStage.key] || 0 : 0;
          const conversionRate = count > 0 ? ((nextCount / count) * 100).toFixed(1) : 0;
          
          return (
            <div key={stage.key} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                    <Icon name={stage.icon} size={16} color="white" />
                  </div>
                  <span className="font-medium text-text-primary">{stage.label}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {index < stages.length - 1 && (
                    <span className="text-sm text-text-secondary">
                      {conversionRate}% conversion
                    </span>
                  )}
                  <span className="text-lg font-semibold text-text-primary">{count}</span>
                </div>
              </div>
              
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stage.color} transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              {index < stages.length - 1 && (
                <div className="flex justify-center mt-2">
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-text-secondary">Overall Conversion</p>
            <p className="text-lg font-semibold text-text-primary">
              {pipelineData.sourced > 0 ? ((pipelineData.hired / pipelineData.sourced) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Time to Hire</p>
            <p className="text-lg font-semibold text-text-primary">24 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineVisualization;