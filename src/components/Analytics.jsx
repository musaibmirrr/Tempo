import React, { useContext } from 'react';
import { TempoContext } from '../context/Context';
import { BarChart3, CheckCircle2, Clock, ListTodo } from 'lucide-react';

const Analytics = () => {
  const { tempo } = useContext(TempoContext);

  const totalTasks = tempo ? tempo.length : 0;
  const completedTasks = tempo ? tempo.filter(t => t.status === 'Completed ✅').length : 0;
  const inProgressTasks = tempo ? tempo.filter(t => t.status === 'In Progress 🔄').length : 0;

  const totalEst = tempo ? tempo.reduce((acc, t) => acc + parseFloat(t.est || 0), 0) : 0;
  const totalAct = tempo ? tempo.reduce((acc, t) => acc + parseFloat(t.act || 0), 0) : 0;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: <ListTodo className="text-blue-500" size={24} />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: <CheckCircle2 className="text-green-500" size={24} />,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: <Clock className="text-yellow-500" size={24} />,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: <BarChart3 className="text-purple-500" size={24} />,
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{stat.value}</h3>
          </div>
        </div>
      ))}

      <div className="md:col-span-2 lg:col-span-4 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          Hours Analytics
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">Estimated vs Actual Hours</span>
              <span className="text-sm font-bold">{totalAct.toFixed(1)} / {totalEst.toFixed(1)} hrs</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${Math.min((totalAct / (totalEst || 1)) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-slate-400 italic">
              {totalAct > totalEst ? 'You have exceeded your estimated hours.' : 'You are within your estimated hours.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
