import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClients } from '../store/slices/clientsSlice'; 

import ClientsActions from '../Components/ClientsActions';
import ClientsTable from '../Components/ClientsTable';
import ClientsStatCards from '../Components/ClientsStatCards';

const ClientsPage = () => {
  const dispatch = useDispatch();
  
  const { items: clients, isLoading, error } = useSelector((state) => state.clients || {});

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen space-y-10">
      <ClientsActions />

      {/* نمرر المصفوفة أو مصفوفة فارغة لضمان عدم الانهيار */}
      <ClientsTable clients={clients || []} isLoading={isLoading} />

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 px-1">Client Insights</h2>
        <ClientsStatCards />
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default ClientsPage;