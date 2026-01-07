
import React, { useState } from 'react';
import { StatusBadge, Button } from './ui';

interface StudentProfileProps {
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Dados Pessoais');

  const tabs = [
    { name: 'Dados Pessoais', icon: 'person' },
    { name: 'Saúde', icon: 'monitor_heart' },
    { name: 'Avaliações', icon: 'analytics' },
    { name: 'Planos', icon: 'credit_card' },
    { name: 'Documentos', icon: 'folder' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Navigation and Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-2">
          <button onClick={onBack} className="flex items-center gap-2 text-text-sub hover:text-primary transition-colors text-sm font-bold group">
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Voltar para Lista
          </button>
          <h1 className="text-3xl font-black tracking-tight">Ana Silva</h1>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button icon="check_circle" className="flex-1 md:flex-none">
            Check-in
          </Button>
          <Button variant="outline" icon="chat" className="flex-1 md:flex-none">
            Mensagem
          </Button>
        </div>
      </div>

      {/* Profile Info Header */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-8 shadow-sm flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <div className="relative">
          <div className="size-32 rounded-full bg-cover bg-center border-4 border-[#f0f4f3] dark:border-gray-700 shadow-md"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD28bw0qPs8tZAuALQGgo1Ec49WocbcuLuId2tjXQD88A91DqCnv5GdkOHKhpXWcNHRJ8j0nCFGzmRSDERm8zUpk6hUnQAS7gzeVuLmKcfRuzGsBYwG_dmrxmRGooQ-RMHoZe5IaXkBBVnIU0esSEaIpQJ-bxAQyuuWZIoihRXu10lV-km7PK-l1AhETh02DVRypQGwsqzhLRQdlzZxT6Xm600mLWIdtFPdoKxePNWNfg2667jjLg_nGeWSfk10uMPx8T8CIIHy97A")' }} />
          <button className="absolute bottom-1 right-1 size-8 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-text-sub hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
        </div>

        <div className="flex-1 text-center lg:text-left space-y-4">
          <div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-text-sub font-medium">
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">cake</span> 34 anos</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">calendar_month</span> Desde Jan 2023</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">call</span> (11) 99999-9999</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <StatusBadge status="Ativo" className="border border-green-100" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary-dark border border-primary/20">
              Plano: Mensal Pro
            </span>
          </div>
        </div>

        <div className="bg-[#f9fafb] dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 min-w-[240px]">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-sub mb-3">Próxima Atividade</p>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white dark:bg-surface-dark flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined">self_improvement</span>
            </div>
            <div>
              <p className="text-sm font-bold">Pilates Solo</p>
              <p className="text-xs text-text-sub">Hoje, às 18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#e8eceb] dark:border-gray-800 overflow-x-auto no-scrollbar">
        <div className="flex gap-8 px-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-4 border-b-2 transition-all ${activeTab === tab.name ? 'border-primary text-text-main dark:text-white font-bold' : 'border-transparent text-text-sub hover:text-text-main'}`}
            >
              <span className={`material-symbols-outlined text-[20px] ${activeTab === tab.name ? 'icon-fill' : ''}`}>{tab.icon}</span>
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Informações Básicas</h3>
              <button className="text-primary-dark dark:text-primary text-xs font-bold hover:underline">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Nome Completo', value: 'Ana Clara Silva' },
                { label: 'CPF', value: '123.456.789-00' },
                { label: 'Data de Nascimento', value: '15/05/1990' },
                { label: 'Profissão', value: 'Arquiteta' },
                { label: 'Endereço', value: 'Rua das Flores, 123 - Apt 402' },
                { label: 'Bairro', value: 'Jardim Paulista' },
              ].map((field, i) => (
                <div key={i} className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-sub">{field.label}</label>
                  <p className="text-sm font-bold p-3 bg-background-light dark:bg-background-dark rounded-xl">{field.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Histórico de Saúde</h3>
              <button className="text-primary-dark dark:text-primary text-xs font-bold hover:underline">Ver Completo</button>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">ecg_heart</span> Hipertensão Leve
              </span>
              <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-xs font-bold border border-orange-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">accessibility_new</span> Lesão Joelho (2021)
              </span>
            </div>
            <div className="p-4 bg-background-light dark:bg-background-dark rounded-xl border border-gray-100 dark:border-gray-800 italic text-sm text-text-sub">
              "A aluna relata desconforto em exercícios de alto impacto. Focar em fortalecimento de quadríceps e evitar saltos nas próximas 2 semanas."
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-background-dark rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-black">Plano Atual</h4>
                  <p className="text-white/60 text-xs font-medium">Pilates Clássico</p>
                </div>
                <div className="p-2 bg-primary/20 rounded-xl text-primary">
                  <span className="material-symbols-outlined">diamond</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-black">R$ 450,00</p>
                    <p className="text-xs text-primary font-bold">Renova em: 15/11/2023</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/50">
                    <span>Aulas usadas</span>
                    <span>6 / 8</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-all border border-white/10">
                  Ver Detalhes do Plano
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black tracking-tight">Documentos</h3>
              <button className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
            <ul className="space-y-4">
              {[
                { name: 'Atestado Médico.pdf', date: '10 Out 2023', icon: 'description', color: 'blue' },
                { name: 'Contrato 2023.pdf', date: '15 Jan 2023', icon: 'contract', color: 'green' },
              ].map((doc, i) => (
                <li key={i} className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group cursor-pointer">
                  <div className={`p-2 rounded-lg bg-${doc.color}-50 text-${doc.color}-500`}>
                    <span className="material-symbols-outlined">{doc.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{doc.name}</p>
                    <p className="text-[10px] text-text-sub uppercase font-black">{doc.date}</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">download</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
