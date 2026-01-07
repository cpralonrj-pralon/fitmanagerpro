
import React from 'react';

const Schedule: React.FC = () => {
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const rooms = [
    { name: 'Reformer 1', sub: 'Sala A' },
    { name: 'Reformer 2', sub: 'Sala A' },
    { name: 'Cadillac', sub: 'Sala B' },
    { name: 'Chair / Solo', sub: 'Sala B' },
  ];

  return (
    <div className="space-y-6 pb-10 flex flex-col h-full">
      <div className="flex flex-col xl:flex-row justify-between items-start gap-4">
        <div className="flex gap-2 p-1 bg-white dark:bg-surface-dark border border-[#e8eceb] dark:border-gray-800 rounded-xl">
           <button className="px-6 py-2 bg-primary text-background-dark font-black rounded-lg text-sm shadow-sm">Diária</button>
           <button className="px-6 py-2 text-text-sub font-bold rounded-lg text-sm hover:text-text-main transition-colors">Semanal</button>
           <button className="px-6 py-2 text-text-sub font-bold rounded-lg text-sm hover:text-text-main transition-colors">Mensal</button>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-2 px-4 rounded-xl border border-[#e8eceb] dark:border-gray-800">
           <button className="p-1 hover:bg-gray-100 rounded-lg"><span className="material-symbols-outlined">chevron_left</span></button>
           <p className="text-sm font-black flex items-center gap-2">
             <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
             14 Out, 2023
           </p>
           <button className="p-1 hover:bg-gray-100 rounded-lg"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm overflow-hidden flex-1 flex flex-col">
        {/* Resource Header */}
        <div className="grid grid-cols-[100px_repeat(4,1fr)] bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
          <div className="p-4 border-r border-gray-100 dark:border-gray-800 flex items-center justify-center">
            <span className="text-[10px] font-black uppercase text-text-sub">Horário</span>
          </div>
          {rooms.map((room, i) => (
            <div key={i} className={`p-4 ${i < rooms.length - 1 ? 'border-r' : ''} border-gray-100 dark:border-gray-800 text-center`}>
              <p className="text-sm font-black tracking-tight leading-tight">{room.name}</p>
              <p className="text-[10px] text-text-sub font-bold uppercase tracking-widest">{room.sub}</p>
            </div>
          ))}
        </div>

        {/* Scrollable Grid Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative min-h-[600px]">
          {/* Time Marker Indicator */}
          <div className="absolute top-[180px] left-0 right-0 border-t-2 border-red-400 z-20 flex items-center pointer-events-none">
            <span className="bg-red-400 text-white text-[9px] font-black px-1.5 py-0.5 rounded-r ml-[100px] -mt-[11px]">09:45</span>
          </div>

          <div className="grid grid-cols-[100px_repeat(4,1fr)] h-full">
            <div className="bg-gray-50/50 dark:bg-background-dark/50 border-r border-gray-100 dark:border-gray-800">
              {hours.map((h, i) => (
                <div key={i} className="h-24 p-4 text-right text-[11px] font-bold text-text-sub border-b border-gray-100 dark:border-gray-800">{h}</div>
              ))}
            </div>
            
            {/* Calendar Cells Placeholder */}
            {[0, 1, 2, 3].map((col) => (
              <div key={col} className={`relative h-full ${col < 3 ? 'border-r' : ''} border-gray-100 dark:border-gray-800`}>
                {hours.map((_, hIndex) => (
                  <div key={hIndex} className="h-24 border-b border-gray-100/50 dark:border-gray-800/30"></div>
                ))}

                {/* Example Class Cards (absolute position) */}
                {col === 0 && (
                  <div className="absolute top-2 left-2 right-2 h-[80px] bg-green-50 dark:bg-green-900/10 border-l-4 border-primary rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-black leading-tight text-text-main dark:text-white">Pilates Clássico</p>
                      <span className="material-symbols-outlined text-primary text-[14px] icon-fill">check_circle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-5 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBNJsepxgo_AZOyL4N0RazByY2gv4imKll3W_WkwZiEk1_j1MW4ORD5VtSu3CVfcgxHhukjorBkQTmUTQ2JGmT8d-dNhiF7KOEBYOfAleEIe668c9qsSJLRghOxW3r-FOJoXn_N1Gj2SYdzrkyg14JaFsvAIKc2Ueqv_GLkGggdRtUSsv_8Bl-JhONaXRfmK1NWZ-7eEZUD0J3uHQQ4aGALLVIbl9X498ItoxUmD_d9A6zlZS3Gidpfm3MG6LjZAJwEMoJQcZBHP8")' }}></div>
                      <span className="text-[10px] font-medium text-text-sub truncate">Maria Silva</span>
                    </div>
                  </div>
                )}

                {col === 2 && (
                  <div className="absolute top-[100px] left-2 right-2 h-[120px] bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-xl p-3 z-10 shadow-lg">
                    <div className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 px-2 py-0.5 rounded text-[9px] font-black uppercase mb-2 inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">error</span> Conflito
                    </div>
                    <div className="space-y-2">
                      <div className="p-2 bg-white dark:bg-surface-dark rounded-lg border-l-2 border-red-400 shadow-sm">
                        <p className="text-[10px] font-black">Lúcia Mendes</p>
                        <p className="text-[9px] text-text-sub">09:00 - 10:00</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-surface-dark rounded-lg border-l-2 border-red-400 shadow-sm -mt-4 ml-4">
                        <p className="text-[10px] font-black">Roberto Farias</p>
                        <p className="text-[9px] text-text-sub">09:00 - 10:00</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
