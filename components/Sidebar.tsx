
import React from 'react';
import { AppView } from '../types';
import { Button } from './ui';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen: boolean;
  onClose: () => void;
  onAddStudent?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose, onAddStudent }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { id: AppView.STUDENTS, label: 'Alunos', icon: 'group' },
    { id: AppView.SCHEDULE, label: 'Agenda', icon: 'calendar_month' },
    { id: AppView.FINANCIAL, label: 'Financeiro', icon: 'payments' },
    { id: AppView.REPORTS, label: 'Relatórios', icon: 'bar_chart' },
    { id: AppView.COMMUNICATION, label: 'Comunicação', icon: 'chat' },
    { id: AppView.MARKETING, label: 'Marketing', icon: 'campaign' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-surface-dark border-r border-[#e8eceb] dark:border-gray-800
        transition-transform duration-300 transform lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined font-bold text-2xl">fitness_center</span>
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight">FitManager</h1>
              <p className="text-text-sub text-[10px] font-bold uppercase tracking-widest">Studio Pro</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id + item.label}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                  ${currentView === item.id
                    ? 'bg-primary/10 text-primary-dark dark:text-primary font-bold'
                    : 'text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 hover:text-text-main'}
                `}
              >
                <span className={`material-symbols-outlined ${currentView === item.id ? 'icon-fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <Button
              icon="person_add"
              fullWidth
              size="lg"
              onClick={onAddStudent}
            >
              Novo Aluno
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
