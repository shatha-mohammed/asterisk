import { Target, Eye } from "lucide-react";
import { TeamCard } from "@/components/ui";
import { CTA } from "@/components";
import { teamMembers } from "../constants";

export default function AboutPage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center sm:py-24">
        <h1 className="max-w-2xl text-[28px] leading-9 font-bold text-indigo-900 sm:text-[44px] sm:leading-13">
          We're building the future of freelance management
        </h1>
        <p className="text-muted max-w-3xl text-base leading-7">
          Asterisk was born from a shared frustration — the tools freelancers
          use today are either too complex or too simple. We set out to build
          something different: a platform that's powerful yet intuitive.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl bg-white p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <Target className="text-brand-accent size-6" />
          </div>
          <h2 className="text-xl font-semibold text-indigo-900">Our Mission</h2>
          <p className="text-muted leading-7">
            To empower independent professionals with a unified workspace that
            eliminates the chaos of managing multiple tools. We believe
            freelancers deserve enterprise-level organization without the
            enterprise-level complexity.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-white p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <Eye className="text-brand-accent size-6" />
          </div>
          <h2 className="text-xl font-semibold text-indigo-900">Our Vision</h2>
          <p className="text-muted leading-7">
            A world where every freelancer can focus on what they do best while
            Asterisk handles the business side. We envision a future where going
            independent doesn't mean going it alone.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <div className="mb-10 flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-[26px] font-semibold text-indigo-900 md:text-[30px]">
            Meet the Team
          </h2>
          <p className="text-muted max-w-3xl text-base leading-6">
            A small, passionate team committed to building the best freelance
            management experience.
          </p>
        </div>

        <div className="mx-auto grid max-w-[70%] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamCard key={member.name + member.role} {...member} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <CTA />
    </div>
  );
}
