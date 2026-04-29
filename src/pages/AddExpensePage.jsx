import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Receipt } from "lucide-react";
import { addExpense } from "@/store/slices";
import { FormHeader, FormSection, FormActions, Input } from "@/components/ui";
import toast from "react-hot-toast";

const AddExpensePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({ title: "", amount: "", date: "" });

  // edit the state for every input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date ? new Date(formData.date).toISOString() : null,
    };
    dispatch(addExpense(payload))
      .unwrap()
      .then(() => {
        toast.success("Expense logged!");
        navigate("/expenses");
      })
      .catch((err) => toast.error(err || "Failed to log expense."));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <FormHeader title="Log New Expense" subtitle="Expense Details" />

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-3xl space-y-6 px-6"
      >
        <FormSection icon={<Receipt size={20} />} title="Expense Information">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Title / Description"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Server Hosting"
                required
              />
            </div>
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
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </FormSection>

        <FormActions submitLabel="Log Expense" isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AddExpensePage;
