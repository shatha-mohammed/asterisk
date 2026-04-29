export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        {/* Main page title*/}
        <h1 className="text-xl font-black tracking-tight text-indigo-900 capitalize lg:text-3xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-muted mt-2 text-sm font-medium uppercase opacity-60">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action element */}
      {action && (
        <div className="mt-8 self-end md:self-auto lg:mt-0">{action}</div>
      )}
    </div>
  );
}
