import { useAppNavigation } from "@/hooks";
import { Button } from "@/components/ui";

export default function CTA() {
  const { goToRegister } = useAppNavigation();

  return (
    <div className="mx-auto my-23 flex flex-col items-center justify-center gap-4 rounded-3xl bg-indigo-900 p-10 text-center md:max-w-[60vw] md:gap-6 md:p-20">
      <h2 className="text-[32px] leading-10.75 font-bold text-white">
        Ready to manage your business?
      </h2>
      <p className="text-base leading-6 text-indigo-100/80">
        Join us to optimize your freelance career with Asterisk
      </p>
      <Button
        text="Get Started"
        variant="white"
        size="full"
        className="md:max-w-40"
        onClick={goToRegister}
      />
    </div>
  );
}
