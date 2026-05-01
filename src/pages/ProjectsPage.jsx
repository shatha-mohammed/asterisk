import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  deleteProject,
  updateProject,
  fetchClients,
} from "@/store/slices";
import { Plus, Briefcase, CheckCircle2, AlertCircle } from "lucide-react";
import { useAppNavigation, useCrudModals } from "@/hooks";
import { PAGINATION } from "@/constants";
import {
  Button,
  StatCard,
  Pagination,
  DeleteConfirmModal,
  EditModal,
  LoadingState,
  EmptyState,
  PageHeader,
} from "@/components/ui";
import { ProjectCard } from "@/components";
import toast from "react-hot-toast";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { goTo } = useAppNavigation();
  const { items, pagination, isLoading } = useSelector(
    (state) => state.projects,
  );
  const { items: clients } = useSelector((state) => state.clients);
  const [page, setPage] = useState(1);
  const { deleteModal, editModal } = useCrudModals();

  // Re-fetch projects on page change, fetch ALL clients for name lookups
  useEffect(() => {
    dispatch(fetchProjects({ page, limit: PAGINATION.LIST }));
    dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Creates an lookup map for clients to prevent nested loop performance bottlenecks during rendering.
  const clientMap = useMemo(() => {
    const map = new Map();
    clients?.forEach((c) => map.set(c.id, c));
    return map;
  }, [clients]);

  // Projects stats
  const stats = useMemo(
    () => ({
      total: items?.length || 0,
      active: items?.filter((p) => p.status === "active").length || 0,
      done: items?.filter((p) => p.status === "done").length || 0,
    }),
    [items],
  );

  if (isLoading && !items?.length)
    return <LoadingState message="Loading Projects..." />;

  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader
        title="Projects"
        subtitle="Pipeline Overview"
        action={
          <Button
            text="Add Project"
            icon={<Plus size={18} />}
            onClick={() => goTo("/add-project")}
            variant="primary"
            size="md"
          />
        }
      />

      {/* Stats */}
<<<<<<< HEAD
      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
=======
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
        <StatCard
          title="Total Projects"
          value={stats.total}
          icon={<Briefcase size={22} />}
        />
        <StatCard
          title="Active"
          value={stats.active}
          icon={<AlertCircle size={22} />}
        />
        <StatCard
          title="Completed"
          value={stats.done}
          icon={<CheckCircle2 size={22} />}
        />
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {items?.length > 0 ? (
          items.map((p) => (
            <ProjectCard
              key={p.id}
              project={{
                name: p.title,
                client: clientMap.get(p.clientId)?.name || "Direct Client",
                budget:
                  p.budget.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) || "0.00",
                deadline: p.dueDate
                  ? new Date(p.dueDate).toLocaleDateString("en-GB")
                  : "No deadline",
                status: p.status,
                updatedAt: p.updatedAt,
              }}
              onEdit={() => editModal.open(p)}
              onDelete={() => deleteModal.open(p)}
            />
          ))
        ) : (
          <EmptyState
            message="No projects yet"
            actionLabel="Add your first project"
            onAction={() => goTo("/add-project")}
          />
        )}
      </div>

      {pagination && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}

      {/* Delete modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        itemName={deleteModal.item?.title || "Project"}
        onConfirm={() => {
          dispatch(deleteProject(deleteModal.item.id))
            .unwrap()
            .then(() => {
              toast.success("Project deleted!");
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
        itemName={editModal.item?.title || "Project"}
        itemData={editModal.item}
        readOnlyFields={["clientId"]}
        onSave={(data) => {
          const payload = { ...data, budget: parseFloat(data.budget) || 0 };
          dispatch(
            updateProject({ id: editModal.item.id, updatedData: payload }),
          )
            .unwrap()
            .then(() => {
              toast.success("Project updated!");
              editModal.close();
              dispatch(fetchProjects({ page, limit: PAGINATION.LIST }));
            })
            .catch((err) => toast.error("Failed to update: " + err));
        }}
      />
    </div>
  );
}
