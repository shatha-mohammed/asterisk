import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeSeoMap = {
  "/": { title: "Asterisk | Freelance Dashboard", description: "Manage your freelance business effortlessly with Asterisk." },
  "/about": { title: "About Us | Asterisk", description: "Learn more about the Asterisk team and our mission." },
  "/contact": { title: "Contact Us | Asterisk", description: "Get in touch with the Asterisk team." },
  "/login": { title: "Log In | Asterisk", description: "Log in to your Asterisk account." },
  "/register": { title: "Sign Up | Asterisk", description: "Create a new Asterisk account." },
  "/dashboard": { title: "Dashboard | Asterisk", description: "View your freelance business overview." },
  "/invoices": { title: "Invoices | Asterisk", description: "Manage and track your invoices." },
  "/add-invoice": { title: "Create Invoice | Asterisk", description: "Create a new invoice for your clients." },
  "/earnings": { title: "Earnings | Asterisk", description: "Track your income and financial growth." },
  "/expenses": { title: "Expenses | Asterisk", description: "Manage your business expenses." },
  "/add-expense": { title: "Add Expense | Asterisk", description: "Record a new business expense." },
  "/clients": { title: "Clients | Asterisk", description: "Manage your client list and details." },
  "/add-client": { title: "Add Client | Asterisk", description: "Add a new client to your roster." },
  "/projects": { title: "Projects | Asterisk", description: "Manage your freelance projects." },
  "/add-project": { title: "Add Project | Asterisk", description: "Start a new project." },
  "/profile": { title: "Profile | Asterisk", description: "View and edit your user profile." },
  "/settings": { title: "Settings | Asterisk", description: "Manage your Asterisk account settings." },
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const seo = routeSeoMap[location.pathname] || { 
      title: "Asterisk", 
      description: "Manage your freelance business effortlessly with Asterisk." 
    };

    document.title = seo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seo.description;
  }, [location.pathname]);

  return null;
}
