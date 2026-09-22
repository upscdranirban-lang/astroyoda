import type { WisdomCategory } from "@/types/wisdom";
import WisdomBanner from "@/components/WisdomBanner";

export default function ComingSoon({
  title,
  description,
  wisdomCategory,
}: {
  title: string;
  description: string;
  wisdomCategory: WisdomCategory;
}) {
  return (
    <section className="container-page py-16 sm:py-24 text-center">
      <p className="chip mx-auto w-fit mb-4">Coming soon</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">{title}</h1>
      <p className="mt-4 text-textMuted max-w-lg mx-auto">{description}</p>
      <div className="mt-10 max-w-md mx-auto text-left">
        <WisdomBanner category={wisdomCategory} />
      </div>
    </section>
  );
}
