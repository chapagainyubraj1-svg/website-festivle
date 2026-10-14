/** Site-wide configuration. */

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Nepal Festival Atlas",
  nameNe: "नेपालका चाडपर्व",
  tagline: "Every festival has a story.",
  description:
    "An interactive, sourced encyclopedia of festivals celebrated in Nepal and by Nepali communities worldwide — histories, legends, rituals and living traditions.",
  url: resolveSiteUrl(),
  repo: "https://github.com/chapagainyubraj1-svg/website-festivle",
  /** Corrections are filed as GitHub issues so they are public and traceable. */
  correctionsUrl(title: string, body: string) {
    const u = new URL("https://github.com/chapagainyubraj1-svg/website-festivle/issues/new");
    u.searchParams.set("title", title);
    u.searchParams.set("body", body);
    u.searchParams.set("labels", "correction");
    return u.toString();
  },
};

export const nav = [
  { href: "/festivals", label: "Encyclopedia" },
  { href: "/collections", label: "Journeys" },
  { href: "/communities", label: "Peoples & places" },
  { href: "/calendar", label: "Calendar" },
  { href: "/greetings", label: "Greeting Studio" },
  { href: "/about", label: "Method" },
];
