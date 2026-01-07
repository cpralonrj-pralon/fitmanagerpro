
import React, { useEffect, useState } from 'react';
import { AppView } from '../types';
import { supabase } from '../supabaseClient';

interface HeaderProps {
  currentView: AppView;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onMenuClick }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const titles: Record<string, string> = {
    [AppView.DASHBOARD]: 'Dashboard',
    [AppView.STUDENTS]: 'Gestão de Alunos',
    [AppView.PROFILE]: 'Perfil do Aluno',
    [AppView.SCHEDULE]: 'Agenda de Aulas',
    [AppView.FINANCIAL]: 'Gestão Financeira',
    [AppView.REPORTS]: 'Relatórios',
    [AppView.COMMUNICATION]: 'Comunicação',
  };

  const userName = user?.user_metadata?.gym_name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <header className="h-20 border-b border-[#e8eceb] dark:border-gray-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 text-text-sub hover:bg-gray-100 rounded-lg">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-xl font-black tracking-tight text-text-main dark:text-white">
          {titles[currentView] || 'Painel'}
        </h2>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar aluno, aula ou pagamento..."
            className="w-full h-11 pl-12 pr-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:flex h-10 px-4 bg-primary/10 text-primary-dark dark:text-primary font-bold text-sm rounded-lg items-center gap-2 hover:bg-primary/20 transition-all">
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Agendar</span>
        </button>

        <button className="relative p-2 text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-white dark:border-gray-800 group-hover:border-primary transition-all">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-bold leading-tight capitalize">{userName}</p>
            <p className="text-[10px] text-text-sub font-medium">Administrador</p>
          </div>
        </div>

        <button
          onClick={() => supabase.auth.signOut()}
          className="p-2 text-text-sub hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
          title="Sair"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
