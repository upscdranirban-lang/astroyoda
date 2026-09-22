export interface LearnSection {
  heading?: string;
  paragraphs: string[];
}

export interface LearnRelatedLink {
  href: string;
  label: string;
}

/**
 * A single /learn article. Content is fact-checked, hand-written prose
 * (see data/learn/articles.ts's file-level comment for sourcing notes),
 * never generated at request time.
 */
export interface LearnArticle {
  slug: string;
  title: string;
  /** One-line summary, used as the meta description and the hub-page card blurb. */
  description: string;
  sections: LearnSection[];
  relatedLinks: LearnRelatedLink[];
}
