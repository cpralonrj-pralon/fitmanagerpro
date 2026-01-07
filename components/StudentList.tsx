
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button, StatusBadge } from './ui';
import StudentModal from './StudentModal';

interface StudentListProps {
  onSelectStudent: (id: string) => void;
  refreshTrigger?: number;
}

const StudentList: React.FC<StudentListProps> = ({ onSelectStudent, refreshTrigger }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('students')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setStudents(data || []);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const handleOpenAddModal = () => {
    setEditingStudentId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id: string) => {
    setEditingStudentId(id);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter(student =>
    (student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (student.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-sub">search</span>
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-surface-dark border-transparent rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
          />
        </div>
        <Button icon="person_add" onClick={handleOpenAddModal}>Novo Aluno</Button>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium">{error}</div>
      ) : (
        <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 dark:border-gray-800">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-sub">Aluno</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-sub text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-sub text-center">Plano</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-sub text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="size-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {student.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-sm text-text-main dark:text-white capitalize group-hover:text-primary transition-colors">{student.name}</p>
                          <p className="text-xs text-text-sub font-medium">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={student.status} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-bold text-text-sub uppercase tracking-wider">{student.plan}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 outline-none">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleOpenEditModal(student.id); }}
                          className="size-8 rounded-lg flex items-center justify-center text-text-sub hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelectStudent(student.id); }}
                          className="size-8 rounded-lg flex items-center justify-center text-text-sub hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-text-sub font-medium"> Nenhum aluno encontrado </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStudents}
        studentId={editingStudentId}
      />
    </div>
  );
};

export default StudentList;
