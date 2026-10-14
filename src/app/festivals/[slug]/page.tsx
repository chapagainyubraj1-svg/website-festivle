import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleRenderer } from "@/components/article/ArticleRenderer";
import { festivalCitations, getFestival, getFestivals } from "@/lib/content";
import { breadcrumbs, jsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFestivals().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFestival(slug);
  if (!f) return {};
  const title = `${f.name} (${f.ne}) — ${f.headline}`;
  return {
    title,
    description: f.description,
    alternates: { canonical: `/festivals/${f.slug}` },
    keywords: [f.name, ...f.altNames.slice(0, 8), "Nepal festival", "Nepali culture"],
    openGraph: {
      type: "article",
      title: `${f.name} — ${f.headline}`,
      description: f.description,
      url: `/festivals/${f.slug}`,
      modifiedTime: f.status.lastVerified,
      section: "Festivals",
    },
    twitter: { card: "summary_large_image", title: `${f.name} — ${f.headline}`, description: f.description },
  };
}

export default async function FestivalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFestival(slug);
  if (!f) notFound();
  const { order, sources } = festivalCitations(f);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${f.name}: ${f.headline}`,
    alternativeHeadline: f.ne,
    description: f.description,
    inLanguage: "en",
    dateModified: f.status.lastVerified,
    mainEntityOfPage: `${site.url}/festivals/${f.slug}`,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    about: {
      "@type": "Thing",
      name: f.name,
      alternateName: f.altNames,
      description: f.dek,
    },
    citation: order.map((id) => {
      const s = sources[id];
      return { "@type": "CreativeWork", name: s.title, url: s.url, publisher: s.publisher, author: s.authors?.join(", ") };
    }),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(article)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbs([
            { name: "Atlas", path: "/" },
            { name: "Encyclopedia", path: "/festivals" },
            { name: f.name, path: `/festivals/${f.slug}` },
          ]),
        )}
      />
      <ArticleRenderer f={f} />
    </>
  );
}
