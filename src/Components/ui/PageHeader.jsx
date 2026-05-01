export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        {/* Main page title*/}
<<<<<<< HEAD
        <h1 className="text-xl font-black tracking-tight text-indigo-900 capitalize lg:text-3xl">
=======
        <h1 className="text-3xl font-black tracking-tight text-indigo-900 capitalize lg:text-5xl">
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
<<<<<<< HEAD
          <p className="text-muted mt-2 text-sm font-medium uppercase opacity-60">
=======
          <p className="text-muted mt-2 text-sm font-bold tracking-[0.2em] uppercase opacity-60">
>>>>>>> 45d1129f9268c5fd00707dc9c37d7e35b7671d8b
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
