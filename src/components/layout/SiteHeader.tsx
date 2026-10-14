"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Emblem } from "./Emblem";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement) && !(e.target as HTMLElement)?.isContentEditable) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header role="banner" className="sticky top-0 z-40 border-b border-rule/80 bg-paper/88 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 no-underline" onClick={() => setMenuOpen(false)}>
          <Emblem className="h-8 w-8 text-ink transition-transform duration-500 group-hover:rotate-[8deg]" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.06rem] font-semibold tracking-[-0.01em]">{site.name}</span>
            <span lang="ne" className="mt-0.5 font-deva text-[0.72rem] text-ink-3">
              {site.nameNe}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`label rounded-full px-3 py-1.5 no-underline transition-colors hover:bg-paper-deep ${isActive(item.href) ? "bg-paper-deep text-ink" : "text-ink-2"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="label flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 text-ink-2 transition-colors hover:border-rule-strong hover:text-ink"
            aria-label="Search the Atlas"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-rule px-1 font-sans text-[0.68rem] text-ink-3 xl:inline">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="label rounded-full px-3 py-1.5 text-ink-2 hover:bg-paper-deep lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper px-4 pb-10 pt-6 lg:hidden">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-rule border-y border-rule">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="display-sm flex items-center justify-between py-4 no-underline"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-ink-3">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="label mt-6 text-ink-3">Every festival has a story.</p>
        </div>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
