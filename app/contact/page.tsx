import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with AstroYoda with questions, feedback, or anything that looks wrong on the site.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Contact</h1>
      <div className="mt-6 space-y-4 text-textMuted">
        <p>
          Questions, feedback, or something that looks wrong on the site?
          We&apos;d like to hear about it.
        </p>
        <p>
          Email:{" "}
          <a href="mailto:parivrajaka9@gmail.com" className="underline hover:text-textPrimary">
            parivrajaka9@gmail.com
          </a>
        </p>
        <p className="text-sm text-textMuted/80">
          Replace this placeholder address with your real support email before
          launch — see the README for where to update it.
        </p>
      </div>
    </section>
  );
}
