import { FeaturesCard } from "../components/ui/";
import { featuresData } from "../constants";

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
        {featuresData.map((f) => {
          return (
            <FeaturesCard
              key={f.title}
              Icon={f.icon}
              title={f.title}
              desc={f.desc}
            />
          );
        })}
      </div>
    </div>
  );
}
