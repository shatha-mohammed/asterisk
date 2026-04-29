import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices, deleteInvoice, updateInvoice } from "@/store/slices";
import { Plus, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
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
import { InvoicesTable } from "@/components";
import toast from "react-hot-toast";

const Invoices = () => {
  const dispatch = useDispatch();
  const { goTo } = useAppNavigation();
  const { items, pagination, isLoading } = useSelector(
    (state) => state.invoices,
  );
  const [page, setPage] = useState(1);
  const { deleteModal, editModal } = useCrudModals();

  // Re-fetch invoices on page change
  useEffect(() => {
    dispatch(fetchInvoices({ page, limit: PAGINATION.LIST }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Invoices stats
  const stats = useMemo(
    () => ({
      total: items?.reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
      paid:
        items
          ?.filter((inv) => inv.status === "paid")
          .reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
      pending:
        items
          ?.filter((inv) => inv.status === "pending")
          .reduce((acc, inv) => acc + (inv.amount || 0), 0) || 0,
    }),
    [items],
  );

  if (isLoading) return <LoadingState message="Syncing Invoices..." />;

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
        title="Invoices"
        subtitle="Revenue Flow"
        action={
          <Button
            text="Add Invoice"
            icon={<Plus size={18} />}
            onClick={() => goTo("/add-invoice")}
            variant="primary"
            size="md"
          />
        }
      />

      {/* Stats row */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <StatCard
          title="Total Billed"
          value={stats.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          icon={<Wallet size={22} />}
        />
        <StatCard
          title="Pending"
          value={stats.pending.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          icon={<AlertCircle size={22} />}
          isRed
        />
        <StatCard
          title="Net Paid"
          value={stats.paid.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          icon={<CheckCircle2 size={22} />}
        />
      </div>

      {/* Invoices table */}
      <div className="mb-10 overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-4 shadow-sm lg:p-10">
        <InvoicesTable
          invoices={items}
          onEdit={(id) => editModal.open(items.find((i) => i.id === id))}
          onDelete={(id) => deleteModal.open(items.find((i) => i.id === id))}
        />
        {pagination && (
          <Pagination pagination={pagination} onPageChange={setPage} />
        )}
      </div>

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        itemName={
          deleteModal.item
            ? `Invoice #${deleteModal.item.invoiceId}`
            : "Invoice"
        }
        onConfirm={() => {
          dispatch(deleteInvoice(deleteModal.item.id))
            .unwrap()
            .then(() => {
              toast.success("Invoice deleted!");
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
        itemName={
          editModal.item ? `Invoice #${editModal.item.invoiceId}` : "Invoice"
        }
        itemData={editModal.item}
        onSave={(data) => {
          const payload = { ...data, amount: parseFloat(data.amount) || 0 };
          dispatch(
            updateInvoice({ id: editModal.item.id, updatedData: payload }),
          )
            .unwrap()
            .then(() => {
              toast.success("Invoice updated!");
              editModal.close();
            })
            .catch((err) => toast.error("Failed to update: " + err));
        }}
        readOnlyFields={["clientId", "projectId"]}
      />
    </div>
  );
};

export default Invoices;
