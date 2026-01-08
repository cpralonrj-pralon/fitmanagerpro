
import React, { useState } from 'react';

interface Room {
  id: number;
  name: string;
  sub: string;
}

interface Appointment {
  id: string;
  roomId: number;
  date: string; // YYYY-MM-DD
  startHour: string; // "08:00"
  duration: number; // 1 = 1 hour
  title: string;
  studentName: string;
  status: 'confirmed' | 'pending' | 'conflict';
  color: 'green' | 'red' | 'blue';
}

const Schedule: React.FC = () => {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
  const [currentDate, setCurrentDate] = useState(new Date());

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const rooms: Room[] = [
    { id: 0, name: 'Reformer 1', sub: 'Sala A' },
    { id: 1, name: 'Reformer 2', sub: 'Sala A' },
    { id: 2, name: 'Cadillac', sub: 'Sala B' },
    { id: 3, name: 'Chair / Solo', sub: 'Sala B' },
  ];

  // Mock Data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      roomId: 0,
      date: new Date().toISOString().split('T')[0],
      startHour: '08:00',
      duration: 1,
      title: 'Pilates Clássico',
      studentName: 'Maria Silva',
      status: 'confirmed',
      color: 'green'
    },
    {
      id: '2',
      roomId: 2,
      date: new Date().toISOString().split('T')[0],
      startHour: '09:00',
      duration: 1,
      title: 'Lúcia Mendes',
      studentName: 'Lúcia Mendes',
      status: 'conflict',
      color: 'red'
    }
  ]);

  const [draggedAppt, setDraggedAppt] = useState<string | null>(null);

  // Helper to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Navigation Logic
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') newDate.setDate(newDate.getDate() - 1);
    else if (currentView === 'week') newDate.setDate(newDate.getDate() - 7);
    else newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') newDate.setDate(newDate.getDate() + 1);
    else if (currentView === 'week') newDate.setDate(newDate.getDate() + 7);
    else newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, apptId: string) => {
    e.dataTransfer.setData('apptId', apptId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedAppt(apptId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, roomId: number, hour: string) => {
    e.preventDefault();
    const apptId = e.dataTransfer.getData('apptId');

    setAppointments(prev => prev.map(appt => {
      if (appt.id === apptId) {
        return {
          ...appt,
          roomId,
          startHour: hour,
          // Update date if we were moving between days (not implemented in this view yet)
        };
      }
      return appt;
    }));
    setDraggedAppt(null);
  };

  return (
    <div className="space-y-6 pb-10 flex flex-col h-full">
      <div className="flex flex-col xl:flex-row justify-between items-start gap-4">
        {/* View Toggles */}
        <div className="flex gap-2 p-1 bg-white dark:bg-surface-dark border border-[#e8eceb] dark:border-gray-800 rounded-xl">
          {['day', 'week', 'month'].map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all capitalize ${currentView === v ? 'bg-primary text-background-dark shadow-sm' : 'text-text-sub hover:text-text-main'}`}
            >
              {v === 'day' ? 'Diária' : v === 'week' ? 'Semanal' : 'Mensal'}
            </button>
          ))}
        </div>

        {/* Date Controls */}
        <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-2 px-4 rounded-xl border border-[#e8eceb] dark:border-gray-800">
          <button onClick={handlePrev} className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
          <p className="text-sm font-black flex items-center gap-2 min-w-[140px] justify-center text-text-main dark:text-white">
            <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
            {formatDate(currentDate)}
          </p>
          <button onClick={handleNext} className="p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-[#e8eceb] dark:border-gray-800 shadow-sm overflow-hidden flex-1 flex flex-col">
        {currentView === 'day' ? (
          <>
            {/* Resource Header */}
            <div className="grid grid-cols-[80px_repeat(4,1fr)] bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
              <div className="p-4 border-r border-gray-100 dark:border-gray-800 flex items-center justify-center">
                <span className="text-[10px] font-black uppercase text-text-sub">Horário</span>
              </div>
              {rooms.map((room) => (
                <div key={room.id} className="p-4 border-r last:border-r-0 border-gray-100 dark:border-gray-800 text-center">
                  <p className="text-sm font-black tracking-tight leading-tight text-text-main dark:text-white">{room.name}</p>
                  <p className="text-[10px] text-text-sub font-bold uppercase tracking-widest">{room.sub}</p>
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative min-h-[600px]">
              <div className="grid grid-cols-[80px_repeat(4,1fr)]">
                {/* Time Column */}
                <div className="bg-gray-50/50 dark:bg-background-dark/50 border-r border-gray-100 dark:border-gray-800">
                  {hours.map((h) => (
                    <div key={h} className="h-24 p-4 text-right text-[11px] font-bold text-text-sub border-b border-gray-100 dark:border-gray-800 flex items-start justify-end">
                      {h}
                    </div>
                  ))}
                </div>

                {/* Room Columns */}
                {rooms.map((room) => (
                  <div key={room.id} className="relative border-r last:border-r-0 border-gray-100 dark:border-gray-800">
                    {hours.map((h) => {
                      // Find appointment for this slot
                      const appt = appointments.find(a => a.roomId === room.id && a.startHour === h && new Date(a.date).toDateString() === currentDate.toDateString());

                      return (
                        <div
                          key={h}
                          className={`h-24 border-b border-gray-100/50 dark:border-gray-800/30 relative transition-colors ${draggedAppt ? 'hover:bg-primary/5' : ''}`}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, room.id, h)}
                        >
                          {appt && (
                            <div
                              draggable
                              onDragStart={(e) => handleDragStart(e, appt.id)}
                              className={`absolute top-1 left-1 right-1 bottom-1 z-10 rounded-xl p-2 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all border-l-4 ${appt.color === 'green' ? 'bg-green-50 dark:bg-green-900/10 border-green-500' :
                                  appt.color === 'red' ? 'bg-red-50 dark:bg-red-900/10 border-red-500' :
                                    'bg-blue-50 dark:bg-blue-900/10 border-blue-500'
                                }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <p className={`text-xs font-black leading-tight ${appt.color === 'green' ? 'text-green-900 dark:text-green-100' :
                                    appt.color === 'red' ? 'text-red-900 dark:text-red-100' :
                                      'text-blue-900 dark:text-blue-100'
                                  }`}>{appt.title}</p>
                                {appt.status === 'confirmed' && <span className="material-symbols-outlined text-[14px] text-green-600">check_circle</span>}
                                {appt.status === 'conflict' && <span className="material-symbols-outlined text-[14px] text-red-600">error</span>}
                              </div>
                              <div className="flex items-center gap-2 mt-auto">
                                <div className="size-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                  {appt.studentName.charAt(0)}
                                </div>
                                <span className={`text-[10px] font-medium truncate ${appt.color === 'green' ? 'text-green-700 dark:text-green-300' :
                                    appt.color === 'red' ? 'text-red-700 dark:text-red-300' :
                                      'text-blue-700 dark:text-blue-300'
                                  }`}>{appt.studentName}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-10 text-center">
            <div className="size-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-text-sub">calendar_view_week</span>
            </div>
            <h3 className="text-lg font-black text-text-main dark:text-white mb-2">Modo {currentView === 'week' ? 'Semanal' : 'Mensal'} em desenvolvimento</h3>
            <p className="text-text-sub max-w-sm">Estamos focando na visualização diária para garantir a melhor experiência de agendamento por recursos.</p>
            <button
              onClick={() => setCurrentView('day')}
              className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
            >
              Voltar para Diária
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
