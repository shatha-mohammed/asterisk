import { useState } from "react";
import { useSelector } from "react-redux";
import { INTERNAL_FIELDS } from "@/constants";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

// format the date
const formatItemData = (data) => {
  if (!data) return {};
  const formatted = { ...data };
  Object.keys(formatted).forEach((key) => {
    if (
      (key.toLowerCase().includes("date") || key === "deadline") &&
      formatted[key]
    ) {
      try {
        formatted[key] = new Date(formatted[key]).toISOString().split("T")[0];
      } catch (err) {
        console.error("Invalid date format for field:", key, err);
      }
    }
  });
  return formatted;
};

export default function EditModal({
  isOpen,
  onClose,
  itemName,
  itemData,
  onSave,
  children,
  readOnlyFields = [],
}) {
  const { items: clients } = useSelector((state) => state.clients);
  const { items: projects } = useSelector((state) => state.projects);
  const [formData, setFormData] = useState(() => formatItemData(itemData));

  // edit the state for every input
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Update data function
  function handleSave() {
    if (onSave) {
      const payload = { ...formData };

      if (payload.commission !== undefined)
        payload.commission = Number(payload.commission);
      if (payload.budget !== undefined) payload.budget = Number(payload.budget);
      if (payload.deposit !== undefined) payload.deposit = Number(payload.deposit);
      // Sanitize the payload by stripping out internal/read-only fields before sending the API request
      INTERNAL_FIELDS.forEach((key) => {
        delete payload[key];
      });

      // Check if any field has actually changed
      const hasChanges = Object.keys(payload).some((key) => {
        let originalValue = itemData[key];
        let newValue = payload[key];

        // Format original dates to match the input "YYYY-MM-DD" format for comparison
        if (
          (key.toLowerCase().includes("date") || key === "deadline") &&
          originalValue
        ) {
          try {
            originalValue = new Date(originalValue).toISOString().split("T")[0];
          } catch {
            // Ignore invalid date strings; they will be caught by the inequality check
          }
        }

        return (newValue || "") != (originalValue || "");
      });

      if (!hasChanges) {
        onClose();
        return;
      }

      onSave(payload);
    }
  }

  const renderGenericForm = () => {
    if (!itemData)
      return (
        <p className="text-sm text-slate-400">No data selected to edit.</p>
      );

    // Filter out internal fields that shouldn't be edited
    const editableKeys = Object.keys(itemData).filter(
      (key) => !INTERNAL_FIELDS.includes(key),
    );

    return (
      <div className="mb-2 max-h-[50vh] space-y-4 overflow-y-auto px-1 pb-4">
        {editableKeys.map((key) => {
          if (key === "status") {
            let options = ["active", "done"];
            if (itemName?.toLowerCase().includes("project")) {
              options = ["active", "done"];
            } else if (itemName?.toLowerCase().includes("invoice")) {
              options = ["pending", "paid"];
            }

            return (
              <div key={key}>
                <label className="mb-1.5 ml-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  Status
                </label>
                <Select
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="rounded-xl border-slate-200 bg-slate-50/50 py-2.5"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === "done"
                        ? "Completed"
                        : opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </Select>
              </div>
            );
          }

          if (key === "clientId") {
            if (readOnlyFields.includes("clientId")) {
              const client = clients?.find((c) => c.id === formData.clientId);
              return (
                <div key={key}>
                  <label className="mb-1.5 ml-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Client
                  </label>
                  <div className="w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-400">
                    {client?.name || formData.clientId || "—"}
                  </div>
                </div>
              );
            }
          }

          if (key === "projectId") {
            if (readOnlyFields.includes("projectId")) {
              const project = projects?.find(
                (p) => p.id === formData.projectId,
              );
              return (
                <div key={key}>
                  <label className="mb-1.5 ml-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Project
                  </label>
                  <div className="w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-400">
                    {project?.title || formData.projectId || "—"}
                  </div>
                </div>
              );
            }
          }

          return (
            <div key={key}>
              <label className="mb-1.5 ml-1 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <Input
                type={
                  key.toLowerCase().includes("date")
                    ? "date"
                    : key.toLowerCase().includes("amount") ||
                        key === "budget" ||
                        key === "commission" ||
                        key === "deposit"
                      ? "number"
                      : "text"
                }
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-bold text-slate-700 transition-all outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit ${itemName || "Item"}`}
    >
      {children ? children : renderGenericForm()}
      <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
        <Button variant="outline" text="Cancel" onClick={onClose} />
        <Button variant="primary" text="Save Changes" onClick={handleSave} />
      </div>
    </Modal>
  );
}
