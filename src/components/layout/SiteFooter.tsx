import Link from "next/link";
import { site } from "@/lib/site";
import { Emblem } from "./Emblem";
import { MotionToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="mt-24 border-t border-rule bg-paper-deep">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Emblem className="h-10 w-10" />
            <div>
              <p className="font-display text-xl font-semibold">{site.name}</p>
              <p lang="ne" className="font-deva text-sm text-ink-3">
                {site.nameNe}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-ink-2">
            An interactive encyclopedia of festivals celebrated in Nepal and by Nepali communities worldwide. Every article distinguishes documented history from scripture, oral tradition and
            contemporary practice, and shows its sources.
          </p>
          <p className="label mt-5 text-ink-3">
            Illustrations are original interpretive artwork, not documentary images. <Link href="/about#media" className="underline">Media policy</Link>.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="kicker text-ink-3">Explore</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/festivals">Encyclopedia</Link></li>
              <li><Link href="/collections">Curated journeys</Link></li>
              <li><Link href="/communities">Peoples &amp; places</Link></li>
              <li><Link href="/glossary">Glossary</Link></li>
              <li><Link href="/stories/how-nepal-keeps-time">How Nepal keeps time</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker text-ink-3">Use</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/calendar">Festival calendar</Link></li>
              <li><Link href="/greetings">Greeting Studio</Link></li>
              <li><Link href="/saved">Saved stories</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker text-ink-3">Trust</p>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about">Editorial method</Link></li>
              <li><Link href="/research">Research roadmap</Link></li>
              <li>
                <a href={site.correctionsUrl("Correction: ", "Page:\n\nWhat should change:\n\nSource (if any):\n")} target="_blank" rel="noopener noreferrer">
                  Suggest a correction
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p className="label">Research status and limitations are stated on every article.</p>
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
