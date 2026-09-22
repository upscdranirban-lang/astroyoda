import { describe, expect, it } from "vitest";
import { buildMetadata } from "@/lib/seo/buildMetadata";

describe("buildMetadata", () => {
  it("passes through title and description unchanged (root layout applies the '— AstroYoda' title template)", () => {
    const meta = buildMetadata({ title: "About", description: "Some description.", path: "/about" });
    expect(meta.title).toBe("About");
    expect(meta.description).toBe("Some description.");
  });

  it("sets a canonical URL matching the given path", () => {
    const meta = buildMetadata({ title: "Learn", description: "d", path: "/learn" });
    expect(meta.alternates).toEqual({ canonical: "/learn" });
  });

  it("treats an empty path as the homepage canonical", () => {
    const meta = buildMetadata({ title: "Home", description: "d", path: "" });
    expect(meta.alternates).toEqual({ canonical: "/" });
  });

  it("builds matching Open Graph tags, with the site suffix applied to the OG title", () => {
    const meta = buildMetadata({ title: "Compatibility", description: "d", path: "/compatibility" });
    expect(meta.openGraph).toMatchObject({
      title: "Compatibility — AstroYoda",
      description: "d",
      url: "/compatibility",
      siteName: "AstroYoda",
      type: "website",
    });
  });
});
