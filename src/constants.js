import {
  LayoutDashboardIcon,
  ReceiptTextIcon,
  FolderCode,
  UsersRound,
} from "lucide-react";

import team1 from "@/assets/rezk.jfif";
import team2 from "@/assets/fouad.jfif";
import team3 from "@/assets/shatha.jfif";
import team4 from "@/assets/roaa.jfif";

export const featuresData = [
  {
    icon: LayoutDashboardIcon,
    title: "Centralized Workspace",
    desc: "Track your active projects, pending invoices, and monthly revenue in one unified, high-performance dashboard tailored for freelancers.",
  },
  {
    icon: ReceiptTextIcon,
    title: "Financial Control",
    desc: "Generate professional invoices, track daily expenses, and monitor your profit margins effortlessly without touching a spreadsheet.",
  },
  {
    icon: FolderCode,
    title: "Project Mastery",
    desc: "Manage project statuses, set clear deadlines, and keep your client deliverables organized. Never miss a deadline again.",
  },
  {
    icon: UsersRound,
    title: "Client Management",
    desc: "Build a powerful client database with contact details, company info, and project history, all accessible in seconds.",
  },
];
export const TAX_RATE = 0.15;
export const VAT_RATE = 0.2;
export const PAGINATION = { DASHBOARD: 6, LIST: 10, ALL: 999999 };
export const INTERNAL_FIELDS = [
  "id",
  "_id",
  "createdAt",
  "updatedAt",
  "userId",
  "__v",
  "invoiceId",
];
export const teamMembers = [
  {
    name: "Ahmed Rezk",
    role: "Backend Developer",
    image: team1,
    linkedin: "https://www.linkedin.com/in/ahmdrzk/",
    github: "https://github.com/ahmedrezkgabr/",
  },
  {
    name: "Ahmed Fouad",
    role: "Frontend Developer",
    image: team2,
    linkedin: "https://www.linkedin.com/in/ahmedfouad74/",
    github: "https://github.com/ahmedtika74",
  },

  {
    name: "Shatha Abu Qamar",
    role: "Frontend Developer",
    image: team3,
    linkedin: "https://www.linkedin.com/in/shatha-abu-qamar-634585355/",
    github: "https://github.com/shatha-mohammed/asterisk",
  },
  {
    name: "Roaa Abu Qamar",
    role: "Frontend Developer",
    image: team4,
    linkedin: "https://www.linkedin.com/in/roaa-abo-qamar-2a583031a/",
    github: "https://github.com/roaaqamar",
  },
];
