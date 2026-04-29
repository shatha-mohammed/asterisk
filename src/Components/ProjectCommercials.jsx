import { VAT_RATE } from "@/constants";
import { Input, Select } from "@/components/ui";

// Receives formData, onChange, and the clients list from AddProjectPage
const ProjectCommercials = ({ formData, onChange, clients }) => {
  const budgetValue = parseFloat(formData.budget) || 0;
  // Calculate estimated tax using the centralized VAT_RATE constant
  const taxValue = budgetValue * VAT_RATE;

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:p-8">
      <h2 className="mb-8 text-lg font-bold text-slate-800">Commercials</h2>

      <div className="space-y-6">
        {/* Client dropdown */}
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

        {/* Budget input with dollar prefix */}
        <div>
          <label className="text-muted mb-1 block text-sm font-medium">
            Budget Estimate
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 font-bold text-slate-400">
              $
            </span>
            <Input
              name="budget"
              value={formData.budget}
              onChange={onChange}
              type="number"
              placeholder="0.00"
              className="pl-10"
            />
          </div>
        </div>

        {/* Live VAT preview — reads from VAT_RATE constant */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Tax (VAT {VAT_RATE * 100}%)
          </span>
          <span className="text-xs font-bold text-slate-500">
            {budgetValue > 0 ? `$${taxValue.toFixed(2)}` : "Calculated on save"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectCommercials;
