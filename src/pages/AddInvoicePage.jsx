import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { addInvoice, fetchProjects, fetchClients } from "@/store/slices";
import { PAGINATION } from "@/constants";
import {
  FormHeader,
  FormSection,
  FormActions,
  Input,
  Select,
} from "@/components/ui";
import toast from "react-hot-toast";

const AddInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: projects } = useSelector((state) => state.projects);
  const { items: clients } = useSelector((state) => state.clients);
  const { isLoading } = useSelector((state) => state.invoices);

  const [formData, setFormData] = useState({
    projectId: "",
    clientId: "",
    amount: "",
    dueDate: "",
  });

  // Fetch ALL clients/projects for dropdowns
  useEffect(() => {
    if (!projects?.length)
      dispatch(fetchProjects({ page: 1, limit: PAGINATION.ALL }));
    if (!clients?.length)
      dispatch(fetchClients({ page: 1, limit: PAGINATION.ALL }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

<<<<<<< HEAD
  const handleChange = (e) => {
    const { name, value } = e.target;

    // reset project and amount when client changes
    if (name === "clientId") {
      setFormData((prev) => ({
        ...prev,
        clientId: value,
        projectId: "",
        amount: "",
      }));
      return;
    }
    // show only client's projects
    if (name === "projectId") {
      const selectedProject = projects?.find((p) => p.id === value);
      if (selectedProject) {
        setFormData((prev) => ({
          ...prev,
          projectId: value,
          amount: Math.max(0, (selectedProject.budget || 0) - (selectedProject.deposit || 0)),
        }));
        return;
      }
    }
    // edit the state for every input
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
=======
  // edit the state for every input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : null,
    };
    dispatch(addInvoice(payload))
      .unwrap()
      .then(() => {
        toast.success("Invoice created!");
        navigate("/invoices");
      })
      .catch((err) => toast.error(err || "Failed to create invoice."));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <FormHeader title="Create New Invoice" subtitle="Billing Details" />

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-3xl space-y-6 px-6"
      >
        <FormSection icon={<FileText size={20} />} title="Billing Information">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Client dropdown */}
            <Select
              label="Client"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            >
              <option value="">Select client</option>
              {clients?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>

            {/* Project dropdown */}
            <Select
              label="Project"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
<<<<<<< HEAD
              disabled={!formData.clientId}
            >
              <option value="">
                {!formData.clientId
                  ? "Select a client first"
                  : "Select project"}
              </option>
              {projects
                ?.filter((p) => p.clientId === formData.clientId)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
=======
            >
              <option value="">Select project</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
            </Select>

            <Input
              label="Amount ($)"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
            <Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </FormSection>

        <FormActions submitLabel="Add Invoice" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AddInvoicePage;
