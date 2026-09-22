import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The blueprint's Privacy Architecture (§20) requires the Privacy Policy,
 * Terms of Use and Disclaimer pages to carry "real, specific content —
 * not boilerplate placeholders — before launch" (Phase 15). This guards
 * against a future edit accidentally reintroducing a bracketed
 * placeholder like the ones these three pages used to have.
 *
 * The Contact page is deliberately excluded: its placeholder support
 * email is a real launch blocker that only the site owner can resolve
 * (see README's "Before you launch this publicly"), not something this
 * test should treat as an error.
 */
describe("legal pages have no leftover placeholder text", () => {
  const pages = [
    "app/privacy-policy/page.tsx",
    "app/terms-of-use/page.tsx",
    "app/disclaimer/page.tsx",
  ];

  for (const page of pages) {
    it(`${page} contains no bracketed placeholder`, () => {
      const source = readFileSync(resolve(__dirname, "../..", page), "utf8");
      expect(source).not.toMatch(/\[add |\[update |\[list /i);
    });

    it(`${page} has a real "Last updated" date, not a placeholder`, () => {
      const source = readFileSync(resolve(__dirname, "../..", page), "utf8");
      expect(source).toMatch(/Last updated: [A-Z][a-z]+ \d{1,2}, \d{4}/);
    });
  }
});
