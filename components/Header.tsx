
import React, { useEffect, useState, useRef } from 'react';
import { AppView } from '../types';
import { supabase } from '../supabaseClient';
import ScheduleModal from './ScheduleModal';

interface HeaderProps {
  currentView: AppView;
  onMenuClick: () => void;
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onMenuClick, onNavigate }) => {
  const [user, setUser] = useState<any>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLButtonElement>(null);

  // Profile Menu State
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) { // Fixed: using notifRef instead of button ref directly logic
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search Logic
  useEffect(() => {
    const searchStudents = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      const { data } = await supabase
        .from('students')
        .select('id, name, avatar, plan')
        .ilike('name', `%${searchTerm}%`)
        .limit(5);

      setSearchResults(data || []);
      setShowSearchResults(true);
    };

    const timeoutId = setTimeout(searchStudents, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const titles: Record<string, string> = {
    [AppView.DASHBOARD]: 'Dashboard',
    [AppView.STUDENTS]: 'Gestão de Alunos',
    [AppView.PROFILE]: 'Perfil do Aluno',
    [AppView.SCHEDULE]: 'Agenda de Aulas',
    [AppView.FINANCIAL]: 'Gestão Financeira',
    [AppView.REPORTS]: 'Relatórios',
    [AppView.COMMUNICATION]: 'Comunicação',
    [AppView.TERMS]: 'Termos de Uso',
    [AppView.PRIVACY]: 'Política de Privacidade',
    [AppView.HELP]: 'Central de Ajuda',
    [AppView.SETTINGS]: 'Configurações',
  };

  const userName = user?.user_metadata?.gym_name || user?.email?.split('@')[0] || 'Usuário';

  // Mock Notifications
  const notifications = [
    { id: 1, text: 'Nova aula agendada: Pilates Solo', time: 'Há 10 min', type: 'schedule', read: false },
    { id: 2, text: 'Aniversariante do mês: Carla Dias', time: 'Hoje', type: 'cake', read: false },
    { id: 3, text: 'Pagamento recebido: João Silva', time: 'Há 1 hora', type: 'payments', read: true },
  ];

  return (
    <>
      <header className="h-20 border-b border-[#e8eceb] dark:border-gray-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 text-text-sub hover:bg-gray-100 rounded-lg">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-xl font-black tracking-tight text-text-main dark:text-white">
            {titles[currentView] || 'Painel'}
          </h2>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchRef}>
          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 pl-12 pr-4 bg-background-light dark:bg-background-dark border-transparent rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-14 left-0 right-0 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2">
              <p className="px-4 py-2 text-[10px] font-black uppercase text-text-sub">Resultados</p>
              {searchResults.map((student) => (
                <button
                  key={student.id}
                  onClick={() => {
                    onNavigate(AppView.STUDENTS);
                    setShowSearchResults(false);
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {student.avatar ? <img src={student.avatar} className="size-8 rounded-full object-cover" /> : student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main dark:text-white">{student.name}</p>
                    <p className="text-[10px] text-text-sub font-medium">{student.plan}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="hidden sm:flex h-10 px-4 bg-primary/10 text-primary-dark dark:text-primary font-bold text-sm rounded-lg items-center gap-2 hover:bg-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Agendar</span>
          </button>

          <div className="relative">
            <button
              ref={notifRef}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-text-sub hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-12 right-0 w-80 bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-40">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <h3 className="font-black text-sm">Notificações</h3>
                  <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">Marcar como lidas</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${!notif.read ? 'bg-primary/5' : ''}`}>
                      <div className="flex gap-3">
                        <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'cake' ? 'bg-pink-100 text-pink-500' : 'bg-blue-100 text-blue-500'}`}>
                          <span className="material-symbols-outlined text-[18px]">{notif.type}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-text-main dark:text-white leading-tight mb-1">{notif.text}</p>
                          <p className="text-[10px] text-text-sub font-medium">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-gray-100 dark:border-gray-800">
                  <button className="text-[10px] font-black uppercase text-text-sub hover:text-primary transition-colors">Ver todas</button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>

          <div className="relative" ref={profileRef}>
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-white dark:border-gray-800 group-hover:border-primary transition-all">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold leading-tight capitalize">{userName}</p>
                <p className="text-[10px] text-text-sub font-medium">Administrador</p>
              </div>
            </div>

            {/* Profile Menu */}
            {showProfileMenu && (
              <div className="absolute top-14 right-0 w-48 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-40 py-2">
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-text-main hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Meu Perfil
                </button>
                <button className="w-full px-4 py-2 text-left text-sm font-medium text-text-main hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  Configurações
                </button>
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sair
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSuccess={() => {
          // Refresh schedule logic if needed
        }}
      />
    </>
  );
};

export default Header;
