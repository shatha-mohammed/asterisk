import heroImage from "../assets/hero.png";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <div className="my-23 grid grid-cols-1 items-center justify-center gap-12.5 sm:my-0 sm:h-[calc(100vh-64px)] sm:grid-cols-2">
      <div className="flex flex-col">
        <h2 className="text-[24px] leading-10 font-bold text-indigo-900 sm:text-[48px] sm:leading-15">
          Scale your freelance business with{" "}
          <span className="text-brand-accent">calm control</span>.
        </h2>

        <p className="my-3.75 text-[18px] leading-7 text-slate-600">
          The high-end productivity workspace built for independent contractors
          who demand professional grade financial and project oversight.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
          <Button text="Get Started" size="full" />
          <Button text="View Demo" size="full" variant="outline" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05) w-fit rotate-3 overflow-hidden rounded-2xl p-3 shadow-2xl">
          <img src={heroImage} alt="hero photo" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
