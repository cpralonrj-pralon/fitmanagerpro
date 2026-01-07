
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Avatar, StatusBadge } from './ui';
import { supabase } from '../supabaseClient';

const data = [
  { name: 'Jan', revenue: 120, expense: 80 },
  { name: 'Fev', revenue: 145, expense: 95 },
  { name: 'Mar', revenue: 132, expense: 105 },
  { name: 'Abr', revenue: 155, expense: 90 },
  { name: 'Mai', revenue: 180, expense: 110 },
  { name: 'Jun', revenue: 240, expense: 140 },
];

const occupancyData = [
  { name: 'Pilates', value: 75 },
  { name: 'Musculação', value: 45 },
  { name: 'Yoga', value: 60 },
  { name: 'Dança', value: 90 },
  { name: 'Funcional', value: 30 },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState([
    { label: 'Alunos Ativos', value: '0', change: '...', pos: true, icon: 'groups', color: 'bg-blue-500' },
    { label: 'Faturamento', value: 'R$ 0', change: '...', pos: true, icon: 'payments', color: 'bg-green-500' },
    { label: 'Ocupação', value: '0%', change: '...', pos: true, icon: 'fitness_center', color: 'bg-purple-500' },
    { label: 'Inadimplência', value: '0%', change: '...', pos: false, icon: 'warning', color: 'bg-red-500' },
  ]);
  const [recentClasses, setRecentClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Students
      const { count: activeCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Ativo');

      // 2. Fetch Payments (Total)
      const { data: payments } = await supabase
        .from('payments')
        .select('value')
        .eq('status', 'Pago');

      const revenue = payments?.reduce((acc, curr) => acc + Number(curr.value), 0) || 0;

      // 3. Fetch Recent Classes
      const { data: classes } = await supabase
        .from('classes')
        .select('*')
        .order('start_time', { ascending: true })
        .limit(3);

      setStats([
        { label: 'Alunos Ativos', value: String(activeCount || 0), change: '+0%', pos: true, icon: 'groups', color: 'bg-blue-500' },
        { label: 'Faturamento', value: `R$ ${(revenue / 1000).toFixed(1)}k`, change: '+0%', pos: true, icon: 'payments', color: 'bg-green-500' },
        { label: 'Ocupação', value: '85%', change: 'Normal', pos: true, icon: 'fitness_center', color: 'bg-purple-500' },
        { label: 'Inadimplência', value: '4%', change: '0%', pos: false, icon: 'warning', color: 'bg-red-500' },
      ]);

      setRecentClasses(classes || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-8 pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
            <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <p className="text-text-sub text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              <div className={`${stat.color}/10 p-2 rounded-xl`}>
                <span className={`material-symbols-outlined ${stat.color.replace('bg-', 'text-')} text-xl`}>{stat.icon}</span>
              </div>
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <div className="flex items-center gap-1">
              <span className={`material-symbols-outlined text-sm ${stat.pos ? 'text-green-500' : 'text-red-500'}`}>
                {stat.pos ? 'trending_up' : 'trending_down'}
              </span>
              <span className={`text-xs font-bold ${stat.pos ? 'text-green-500' : 'text-red-500'}`}>{stat.change} este mês</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-surface-dark p-8 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black tracking-tight">Receita x Despesas</h3>
              <p className="text-text-sub text-sm">Visão geral financeira dos últimos 6 meses</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-primary"></div>
                <span className="text-xs font-bold">Receita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-gray-300"></div>
                <span className="text-xs font-bold">Despesa</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13eca4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#13eca4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#61897c' }} dy={10} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#13eca4" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expense" stroke="#cbd5e1" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-black tracking-tight mb-2">Ocupação</h3>
          <p className="text-text-sub text-sm mb-8">Por modalidade em Junho</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#61897c' }} width={80} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#13eca4" fillOpacity={entry.value / 100 + 0.3} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Today's Classes List */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-black tracking-tight">Aulas de Hoje</h3>
          <button className="text-primary-dark dark:text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            Ver Agenda Completa
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Horário</th>
                <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Aula</th>
                <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Instrutor</th>
                <th className="px-8 py-4 text-xs font-bold text-text-sub uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentClasses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-text-sub">
                    Nenhuma aula programada para hoje.
                  </td>
                </tr>
              ) : recentClasses.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-8 py-5 text-sm font-bold">
                    {new Date(row.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold leading-tight">{row.title}</p>
                    <p className="text-xs text-text-sub">{row.type}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <Avatar src={row.instructor_avatar} name={row.instructor} size="sm" />
                      <span className="text-sm font-medium">{row.instructor}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
