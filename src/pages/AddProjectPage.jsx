import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject, fetchClients } from "@/store/slices";
import { PAGINATION } from "@/constants";
import { FormHeader, FormActions } from "@/components/ui";
import {
  ProjectIdentity,
  ProjectCommercials,
  ProjectLogistics,
} from "@/components";
import toast from "react-hot-toast";

const AddProjectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: clients } = useSelector((state) => state.clients);
  const { isLoading } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: "",
    clientId: "",
    budget: "",
    dueDate: "",
  });

  // Fetch ALL clients so the client dropdown is fully populated
  useEffect(() => {
    if (!clients?.length)
      dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }));
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
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : null,
    };
    dispatch(addProject(payload))
      .unwrap()
      .then(() => {
        toast.success("Project created!");
        navigate("/projects");
      })
      .catch((err) => toast.error(err || "Failed to create project."));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <FormHeader title="Create New Project" subtitle="Project Details" />

      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ProjectIdentity formData={formData} onChange={handleChange} />
            <ProjectLogistics formData={formData} onChange={handleChange} />
          </div>
          <div>
            <ProjectCommercials
              formData={formData}
              onChange={handleChange}
              clients={clients || []}
            />
          </div>
        </div>

        <FormActions submitLabel="Add Project" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AddProjectPage;
