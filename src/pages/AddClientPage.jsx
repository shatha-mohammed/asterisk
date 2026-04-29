import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { addClient } from "@/store/slices";
import { FormHeader, FormSection, FormActions, Input } from "@/components/ui";
import toast from "react-hot-toast";

const AddClientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.clients);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  // edit the state for every input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClient(formData))
      .unwrap()
      .then(() => {
        toast.success("Client created!");
        navigate("/clients");
      })
      .catch(() => toast.error("Failed to create client."));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <FormHeader title="Create New Client" subtitle="Client Details" />

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-3xl space-y-6 px-6"
      >
        <FormSection icon={<User size={20} />} title="Client Information">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              required
            />
            <Input
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Group"
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@acme.com"
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+201234567890"
              required
            />
          </div>
        </FormSection>

        <FormActions submitLabel="Add Client" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AddClientPage;
