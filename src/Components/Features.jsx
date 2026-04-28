import FeaturesCard from "./ui/FeaturesCard";
import {
  LayoutDashboardIcon,
  ReceiptTextIcon,
  FolderCode,
  UsersRound,
} from "lucide-react";

export default function Features() {
  return (
    <div className="my-23">
      <div className="mb-10 flex flex-col items-center justify-center gap-2 text-center">
        {/* Heading */}
        <h2 className="text-[26px] font-semibold text-indigo-900 md:text-[30px]">
          Everything you need to run your freelance business
        </h2>
        <p className="text-muted text-base leading-6">
          One unified platform to manage clients, track projects, and monitor
          your finances without the stress of manual spreadsheets.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <FeaturesCard
          Icon={LayoutDashboardIcon}
          title="Centralized Workspace"
          desc="Track your active projects, pending invoices, and monthly revenue in one unified, high-performance dashboard tailored for freelancers."
        />

        <FeaturesCard
          Icon={ReceiptTextIcon}
          title="Financial Control"
          desc="Generate professional invoices, track daily expenses, and monitor your profit margins effortlessly without touching a spreadsheet."
        />

        <FeaturesCard
          Icon={FolderCode}
          title="Project Mastery"
          desc="Manage project statuses, set clear deadlines, and keep your client deliverables organized. Never miss a deadline again."
        />

        <FeaturesCard
          Icon={UsersRound}
          title="Client Management"
          desc="Build a powerful client database with contact details, company info, and project history, all accessible in seconds."
        />
      </div>
    </div>
  );
}
