export default function FeaturesCard({ Icon, title, desc }) {
  return (
    <div className="flex flex-col justify-center gap-2 rounded-lg bg-white p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <Icon className="text-brand-accent size-6.75" />
      <h3 className="text-xl leading-8 font-semibold text-indigo-900">
        {title}
      </h3>
      <p className="text-muted text-base leading-6 font-normal">{desc}</p>
    </div>
  );
}
