export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="text-brand-accent animate-pulse p-20 text-center font-black tracking-[0.3em] uppercase">
      {message}
    </div>
  );
}
