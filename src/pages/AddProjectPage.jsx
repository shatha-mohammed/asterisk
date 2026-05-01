import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject, fetchClients, addInvoice } from "@/store/slices";
import { PAGINATION } from "@/constants";
import {
  FormHeader,
  FormActions,
  EmptyState,
  LoadingState,
} from "@/components/ui";
import {
  ProjectIdentity,
  ProjectCommercials,
  ProjectLogistics,
} from "@/components";
import toast from "react-hot-toast";

const AddProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: clients, isLoading: clientsLoading } = useSelector(
    (state) => state.clients,
  );
  const { isLoading: projectsLoading } = useSelector((state) => state.projects);
  // If we already have clients in Redux, mark the initial fetch as done immediately
  const [initialFetchDone, setInitialFetchDone] = useState(!!clients?.length);

  const [formData, setFormData] = useState({
    title: "",
    clientId: "",
    budget: "",
    commission: "",
    deposit: "",
    dueDate: "",
  });

  // Fetch ALL clients so the client dropdown is fully populated
  useEffect(() => {
    if (!clients?.length) {
      dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }))
        .unwrap()
        .finally(() => setInitialFetchDone(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // edit the state for every input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      budget: parseFloat(formData.budget) || 0,
      commission: parseFloat(formData.commission) || 15,
      deposit: parseFloat(formData.deposit) || 0,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : null,
    };
    dispatch(addProject(payload))
      .unwrap()
      .then((newProject) => {
        const projectId =
          newProject?.data?.id || newProject?.id || newProject?._id;

        if (payload.deposit > 0 && projectId) {
          dispatch(
            addInvoice({
              projectId,
              clientId: payload.clientId,
              amount: payload.deposit,
              dueDate: new Date().toISOString(),
            }),
          ).catch((err) =>
            console.error("Failed to auto-create deposit invoice", err),
          );
        }

        toast.success("Project created!");
        navigate("/projects");
      })
      .catch((err) => toast.error(err || "Failed to create project."));
  };

  if (!initialFetchDone || clientsLoading) {
    return <LoadingState message="Checking clients..." />;
  }

  if (initialFetchDone && (!clients || clients.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
        <FormHeader title="Create New Project" subtitle="Project Details" />
        <div className="mx-auto mt-10 max-w-7xl px-6">
          <EmptyState
            message="You must add a client first before creating a project."
            actionLabel="Add Client"
            onAction={() => navigate("/add-client")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <FormHeader title="Create New Project" subtitle="Project Details" />

      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ProjectIdentity formData={formData} onChange={handleChange} />
            <ProjectLogistics formData={formData} onChange={handleChange} />
          </div>

          <ProjectCommercials
            formData={formData}
            onChange={handleChange}
            clients={clients || []}
          />
        </div>

        <FormActions submitLabel="Add Project" isLoading={projectsLoading} />
      </form>
    </div>
  );
};

export default AddProjectPage;
