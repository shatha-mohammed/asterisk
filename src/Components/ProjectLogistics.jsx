import { Calendar } from "lucide-react";
import { Input } from "@/components/ui";

// Receives formData and onChange from AddProjectPage
const ProjectLogistics = ({ formData, onChange }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:p-8">
    {/* Section header */}
    <div className="mb-8 flex items-center gap-3 text-indigo-700">
      <div className="rounded-xl bg-indigo-50 p-2">
        <Calendar size={20} />
      </div>
      <h2 className="text-lg font-bold text-slate-800">Logistics & Timeline</h2>
    </div>

    <Input
      label="Target Deadline"
      type="date"
      name="dueDate"
      value={formData.dueDate}
      onChange={onChange}
    />
  </section>
);

export default ProjectLogistics;
