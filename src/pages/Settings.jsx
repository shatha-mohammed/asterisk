import { Button, PageHeader } from "@/components/ui";

export default function Settings() {
  return (
    <div className="animate-in fade-in mx-auto max-w-400 p-4 duration-500 lg:p-10">
      <PageHeader title="Settings" subtitle="System Preferences" />

      {/* Coming soon card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-20 text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <h2 className="mb-4 text-2xl font-black text-slate-800">
          Settings Coming Soon
        </h2>
        <p className="text-muted mx-auto max-w-md text-sm">
          The settings panel is under development. Soon you'll be able to
          configure your profile, notifications, and tax preferences here.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            text="Go Back"
            variant="outline"
            onClick={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
}
