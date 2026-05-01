import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { addProject, fetchClients, addInvoice } from "@/store/slices";
import { PAGINATION } from "@/constants";
import {
  FormHeader,
  FormActions,
  EmptyState,
  LoadingState,
} from "@/components/ui";
=======
import { addProject, fetchClients } from "@/store/slices";
import { PAGINATION } from "@/constants";
import { FormHeader, FormActions } from "@/components/ui";
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
import {
  ProjectIdentity,
  ProjectCommercials,
  ProjectLogistics,
} from "@/components";
import toast from "react-hot-toast";

const AddProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { items: clients, isLoading: clientsLoading } = useSelector(
    (state) => state.clients,
  );
  const { isLoading: projectsLoading } = useSelector((state) => state.projects);
  // If we already have clients in Redux, mark the initial fetch as done immediately
  const [initialFetchDone, setInitialFetchDone] = useState(!!clients?.length);
=======
  const { items: clients } = useSelector((state) => state.clients);
  const { isLoading } = useSelector((state) => state.projects);
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b

  const [formData, setFormData] = useState({
    title: "",
    clientId: "",
    budget: "",
<<<<<<< HEAD
    commission: "",
    deposit: "",
=======
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
    dueDate: "",
  });

  // Fetch ALL clients so the client dropdown is fully populated
  useEffect(() => {
<<<<<<< HEAD
    if (!clients?.length) {
      dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }))
        .unwrap()
        .finally(() => setInitialFetchDone(true));
    }
=======
    if (!clients?.length)
      dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }));
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
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
<<<<<<< HEAD
      commission: parseFloat(formData.commission) || 15,
      deposit: parseFloat(formData.deposit) || 0,
=======
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : null,
    };
    dispatch(addProject(payload))
      .unwrap()
<<<<<<< HEAD
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

=======
      .then(() => {
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
        toast.success("Project created!");
        navigate("/projects");
      })
      .catch((err) => toast.error(err || "Failed to create project."));
  };

<<<<<<< HEAD
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

=======
  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <FormHeader title="Create New Project" subtitle="Project Details" />

>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ProjectIdentity formData={formData} onChange={handleChange} />
            <ProjectLogistics formData={formData} onChange={handleChange} />
          </div>
<<<<<<< HEAD

          <ProjectCommercials
            formData={formData}
            onChange={handleChange}
            clients={clients || []}
          />
        </div>

        <FormActions submitLabel="Add Project" isLoading={projectsLoading} />
=======
          <div>
            <ProjectCommercials
              formData={formData}
              onChange={handleChange}
              clients={clients || []}
            />
          </div>
        </div>

        <FormActions submitLabel="Add Project" isLoading={isLoading} />
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
      </form>
    </div>
  );
};

export default AddProjectPage;
