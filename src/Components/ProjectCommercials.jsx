import { Input, Select } from "@/components/ui";

// Receives formData, onChange, and the clients list from AddProjectPage
const ProjectCommercials = ({ formData, onChange, clients }) => {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:p-8">
      <h2 className="mb-8 text-lg font-bold text-slate-800">Commercials</h2>

      <div className="space-y-6">
        {/* Client */}
        <Select
          label="Client"
          name="clientId"
          value={formData.clientId}
          onChange={onChange}
          required
        >
          <option value="">Select existing client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>

        {/* Budget */}
        <Input
          label="Budget Estimate"
          name="budget"
          value={formData.budget}
          onChange={onChange}
          type="number"
          required
          placeholder="0.00"
          sign="$"
        />

        {/* Commission */}
        <Input
          label="Commission"
          name="commission"
          value={formData.commission || 15}
          onChange={onChange}
          type="number"
          required
          placeholder="ex: 15%"
          sign="%"
        />
      </div>
    </section>
  );
};

export default ProjectCommercials;
