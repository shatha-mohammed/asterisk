import { Tag } from "lucide-react";
import { Input } from "@/components/ui";

// Receives formData and onChange from AddProjectPage
const ProjectIdentity = ({ formData, onChange }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:p-8">
    {/* Section header */}
    <div className="mb-8 flex items-center gap-3 text-indigo-700">
      <div className="rounded-xl bg-indigo-50 p-2">
        <Tag size={20} />
      </div>
      <h2 className="text-lg font-bold text-slate-800">Project Identity</h2>
    </div>

    <Input
      label="Project Name"
      name="title"
      value={formData.title}
      onChange={onChange}
      required
      placeholder="e.g. Q4 Brand Identity Redesign"
    />
  </section>
);

export default ProjectIdentity;
