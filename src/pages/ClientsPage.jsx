import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, deleteClient, updateClient } from "@/store/slices";
import { Plus, Users, Building2, Globe } from "lucide-react";
import { useAppNavigation, useCrudModals } from "@/hooks";
import { PAGINATION } from "@/constants";
import {
  Button,
  StatCard,
  Pagination,
  DeleteConfirmModal,
  EditModal,
  LoadingState,
  PageHeader,
} from "@/components/ui";
import { ClientsTable } from "@/components";
import toast from "react-hot-toast";

const ClientsPage = () => {
  const dispatch = useDispatch();
  const { goTo } = useAppNavigation();
  const { items, pagination, isLoading } = useSelector(
    (state) => state.clients,
  );
  const [page, setPage] = useState(1);
  const { deleteModal, editModal } = useCrudModals();

  // Re-fetch when page changes
  useEffect(() => {
    dispatch(fetchClients({ page, limit: PAGINATION.LIST }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Calculate unique companies for the stat card
  const stats = useMemo(() => {
    const companies = new Set(items?.map((c) => c.company).filter(Boolean));
    return { total: items?.length || 0, companies: companies.size };
  }, [items]);

  if (isLoading) return <LoadingState message="Loading Clients..." />;

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
        title="Clients"
        subtitle="Network Overview"
        action={
          <Button
            text="Add Client"
            icon={<Plus size={18} />}
            onClick={() => goTo("/add-client")}
            variant="primary"
            size="md"
          />
        }
      />

      {/* Stats */}
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        <StatCard
          title="Total Clients"
          value={stats.total}
          icon={<Users size={22} />}
        />
        <StatCard
          title="Companies"
          value={stats.companies}
          icon={<Building2 size={22} />}
        />
        <StatCard
          title="Global Reach"
          value="International"
          icon={<Globe size={22} />}
        />
      </div>

      {/* Clients table */}
      <div className="mb-10 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-sm lg:p-10">
        <ClientsTable
          clients={items}
          onEdit={(id) => editModal.open(items.find((c) => c.id === id))}
          onDelete={(id) => deleteModal.open(items.find((c) => c.id === id))}
        />
        {pagination && (
          <Pagination pagination={pagination} onPageChange={setPage} />
        )}
      </div>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        itemName={deleteModal.item?.name || "Client"}
        onConfirm={() => {
          dispatch(deleteClient(deleteModal.item.id))
            .unwrap()
            .then(() => {
              toast.success("Client deleted!");
              deleteModal.close();
            })
            .catch((err) => toast.error("Failed to delete: " + err));
        }}
      />

      {/* Edit modal */}
      <EditModal
        key={editModal.item?.id || "empty"}
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        itemName={editModal.item?.name || "Client"}
        itemData={editModal.item}
        onSave={(data) => {
          dispatch(updateClient({ id: editModal.item.id, updatedData: data }))
            .unwrap()
            .then(() => {
              toast.success("Client updated!");
              editModal.close();
            })
            .catch((err) => toast.error("Failed to update: " + err));
        }}
      />
    </div>
  );
};

export default ClientsPage;
