import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCards = () => {
  const summaryData = [
    {
      title: "Average Integrity Score",
      value: "82.4",
      unit: "%",
      change: "+2.3%",
      changeType: "positive",
      icon: "Shield",
      description: "Across all interviews this month"
    },
    {
      title: "Total Interviews",
      value: "1,247",
      unit: "",
      change: "+18.2%",
      changeType: "positive",
      icon: "Users",
      description: "Completed this month"
    },
    {
      title: "Violation Rate",
      value: "23.8",
      unit: "%",
      change: "-5.1%",
      changeType: "negative",
      icon: "AlertTriangle",
      description: "Interviews with violations"
    },
    {
      title: "Most Common Violation",
      value: "Focus Loss",
      unit: "",
      change: "67% of violations",
      changeType: "neutral",
      icon: "Eye",
      description: "Looking away from screen"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${
              item?.icon === 'Shield' ? 'bg-success/10 text-success' :
              item?.icon === 'Users' ? 'bg-primary/10 text-primary' :
              item?.icon === 'AlertTriangle'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
            }`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(item?.changeType)}`}>
              <Icon name={getChangeIcon(item?.changeType)} size={14} />
              <span>{item?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{item?.title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">{item?.value}</span>
              {item?.unit && <span className="text-lg text-muted-foreground">{item?.unit}</span>}
            </div>
            <p className="text-xs text-muted-foreground">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;