# Asterisk

Scale your freelance business with calm control. 

Asterisk is a high-end productivity workspace built for independent contractors who demand professional-grade financial and project oversight. Manage clients, projects, invoices, and track your business earnings—all in one centralized platform.

## 🚀 Features

- **Business Dashboard**: Get a birds-eye overview of your pipeline, active projects, and recent financial data.
- **Client Management**: Maintain a central, easily accessible directory of your clients.
- **Project Tracking**: Manage freelance projects, set budgets, track commissions, and seamlessly record upfront deposits.
- **Invoicing & Billing**: Auto-generate invoices from project deposits, track "pending" vs "paid" statuses, and keep a clean ledger.
- **Expense Tracking**: Log business expenses to accurately measure your true net income.
- **User Settings**: Update your profile, upload custom avatars (powered by Supabase Storage), and securely manage authentication.
- **SEO Optimized**: Fully integrated dynamic meta-tags and descriptive routing for modern SEO best practices.
- **Responsive & Modern UI**: Built with Tailwind CSS, utilizing a premium and accessible aesthetic optimized for both desktop and mobile.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **State Management**: Redux Toolkit (modular slices with `createAsyncThunk`)
- **Routing**: React Router v7
- **Cloud Storage**: Supabase (Avatar & Profile image storage)
- **HTTP Client**: Axios

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd asterisk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root of your project and configure your API and Supabase credentials:
   ```env
   VITE_API_BASE_URL=http://your-backend-api-url.com
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   *(Note: Ensure you update the `.env` variable names to precisely match what is expected by `src/services/api.js` and `src/services/supabaseClient.js`)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```text
src/
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI primitives and complex page sections
├── constants/      # App-wide constants (pagination limits, internal fields)
├── hooks/          # Custom React hooks (e.g., useAppNavigation, useCrudModals)
├── layout/         # Application shell layouts (Main, App, Auth)
├── pages/          # Full page route components
├── services/       # API integration (Axios) and Supabase client configuration
├── store/          # Redux store and modular feature slices
├── App.jsx         # Main router and layout definitions
└── main.jsx        # React application entry point
```

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to find and fix code style issues.
