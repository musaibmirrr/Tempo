import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListTodo, CheckCircle2, Calendar } from 'lucide-react';

const ModernNavbar = () => {
  const today = new Date().toDateString();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive
        ? 'bg-blue-100 text-blue-700 font-semibold'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-6">
          <NavLink to="/Tempo" className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-slate-900 dark:bg-slate-50 text-slate-50 dark:text-slate-900 p-1.5 rounded-lg">
              <LayoutDashboard size={20} />
            </span>
            <span className="tracking-tight">Tempo</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/Tempo" end className={navLinkClass}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/Tempo/DailyTasks" className={navLinkClass}>
              <ListTodo size={18} />
              <span>Daily Tasks</span>
            </NavLink>
            <NavLink to="/Tempo/Completed" className={navLinkClass}>
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            <Calendar size={16} />
            <span>{today}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
