import type { Community, Region, Tradition } from "./types";

export const traditions: Tradition[] = [
  { slug: "hindu", name: "Hindu", nameNe: "हिन्दू" },
  { slug: "buddhist", name: "Buddhist", nameNe: "बौद्ध" },
  { slug: "kirat", name: "Kirat", nameNe: "किरात" },
  { slug: "indigenous", name: "Other Indigenous traditions", nameNe: "आदिवासी परम्परा" },
];

export const communities: Community[] = [
  {
    slug: "khas-arya",
    name: "Hill Hindu communities (Khas Arya)",
    nameNe: "खस आर्य",
    dek: "Bahun, Chhetri, Thakuri and other hill Hindu castes, whose festival year is often treated as Nepal's 'national' one.",
    intro: [
      "Chhetri and Hill Brahman (Bahun) are the two largest groups in Nepal's 2021 census — 16.45% and 11.29% of the population.[^nso-2021-caste] Together with Thakuri and other hill Hindu castes they are often grouped as Khas Arya.",
      "Because the Shah state promoted their festivals — above all Dashain — these calendars have long been presented as the nation's. The Atlas treats them as one tradition among many, and documents where other communities observe them differently or not at all.[^krauskopff-1996,hangen-2005]",
    ],
    sources: ["nso-2021-caste", "krauskopff-1996", "hangen-2005"],
    regions: ["hills", "kathmandu-valley", "diaspora"],
    traditions: ["hindu"],
  },
  {
    slug: "newar",
    name: "Newar",
    nameNe: "नेवार",
    dek: "The people of the Kathmandu Valley, whose Hindu and Buddhist cities keep one of the densest festival calendars anywhere.",
    intro: [
      "The Newar (Newa) are the historic inhabitants of the Kathmandu Valley, speaking Nepal Bhasa and practising intertwined Hindu and Buddhist traditions. Their festivals follow the lunar [[nepal-sambat]] and are organised through neighbourhoods, lineages and guthi associations.[^nepalsambat-history,levy-1990]",
      "Indra Jatra, Biska, Gai Jatra and Mha Puja are Newar festivals; Newars also keep their own form of Dashain, [[mohani]].[^annapurna-mohani] The 2021 census figure is reported at about 4.6% of the population.[^cultural-atlas-nepal]",
    ],
    sources: ["nepalsambat-history", "levy-1990", "annapurna-mohani", "cultural-atlas-nepal"],
    regions: ["kathmandu-valley"],
    traditions: ["hindu", "buddhist"],
  },
  {
    slug: "tharu",
    name: "Tharu",
    nameNe: "थारु",
    dek: "Indigenous people of the Terai, whose new year, Maghi, is also a day of village self-government.",
    intro: [
      "The Tharu, about 6.2% of Nepal's population in 2021, live across the Terai from east to far west.[^nso-2021-caste] At Maghi, their new year in mid-January, western Tharu villages choose office-holders such as the [[badghar]] for the year ahead.[^indigenousvoice-maghi]",
      "For many, Maghi is also remembered as a day of freedom, linked to the end of the Kamaiya bonded-labour system.[^tht-maghi-freedom]",
    ],
    sources: ["nso-2021-caste", "indigenousvoice-maghi", "tht-maghi-freedom"],
    regions: ["terai"],
    traditions: ["indigenous", "hindu"],
  },
  {
    slug: "magar",
    name: "Magar",
    nameNe: "मगर",
    dek: "One of Nepal's largest Indigenous nationalities, with a ritual role at the heart of the state's Dashain.",
    intro: [
      "Magars made up 6.9% of the population in the 2021 census.[^nso-2021-caste] In Gorkha, members of the Magar community — including a priest of the Gorkha Durbar Dashain ghar — carry the state's Phulpati on the first stage of its journey to Kathmandu.[^ekantipur-phulpati-gorkha-2025]",
      "Magar festival traditions beyond Dashain are on our research roadmap.",
    ],
    sources: ["nso-2021-caste", "ekantipur-phulpati-gorkha-2025"],
    regions: ["hills"],
    traditions: ["indigenous", "hindu", "buddhist"],
  },
  {
    slug: "tamang",
    name: "Tamang",
    nameNe: "तामाङ",
    dek: "Hill people of the Kathmandu Valley's rim, whose new year — Sonam Lhosar — is a national holiday.",
    intro: [
      "Tamangs are 5.62% of Nepal's population.[^nso-2021-caste] They celebrate Sonam Lhosar on the first day of the bright half of Magh, declared a public holiday.[^askmeaboutnepal-sonam-losar,sharesansar-sonam-lhosar-2026]",
    ],
    sources: ["nso-2021-caste", "askmeaboutnepal-sonam-losar", "sharesansar-sonam-lhosar-2026"],
    regions: ["hills", "kathmandu-valley"],
    traditions: ["buddhist"],
  },
  {
    slug: "gurung",
    name: "Gurung (Tamu)",
    nameNe: "गुरुङ (तमु)",
    dek: "People of the central hills, who count years in a twelve-animal cycle and greet each new one at Tamu Lhosar.",
    intro: [
      "The Gurung, who call themselves Tamu, are about 1.9% of the population.[^cultural-atlas-nepal] Tamu Lhosar on Poush 15 opens a new year in their twelve-year cycle of [[lho]].[^askmeaboutnepal-tamu-lhosar]",
    ],
    sources: ["cultural-atlas-nepal", "askmeaboutnepal-tamu-lhosar"],
    regions: ["hills"],
    traditions: ["buddhist", "indigenous"],
  },
  {
    slug: "sherpa",
    name: "Sherpa",
    nameNe: "शेर्पा",
    dek: "Buddhist highlanders of Solukhumbu and beyond, who keep Gyalpo Lhosar and the monastic festivals of the high valleys.",
    intro: [
      "Sherpa communities celebrate Gyalpo Lhosar, the Tibetan-calendar new year, in late winter. Their monastic festivals are on our research roadmap.[^askmeaboutnepal-sonam-losar]",
    ],
    sources: ["askmeaboutnepal-sonam-losar"],
    regions: ["himalaya"],
    traditions: ["buddhist"],
  },
  {
    slug: "rai",
    name: "Kirat Rai",
    nameNe: "किरात राई",
    dek: "Peoples of the eastern hills, whose great rite Sakela follows the farming year in spring and autumn.",
    intro: [
      "The Rai are one of the Kirat peoples of eastern Nepal, about 2.2% of the population.[^cultural-atlas-nepal] Their oral scripture, [[mundhum]], frames the seasonal rite of [[sakela]], danced as Ubhauli in spring and Udhauli in late autumn.[^kiratrai-sakela]",
      "Many Rai villages never celebrated Dashain, and some families today mark it with white rice tika if at all.[^okh-white-tika]",
    ],
    sources: ["cultural-atlas-nepal", "kiratrai-sakela", "okh-white-tika"],
    regions: ["hills"],
    traditions: ["kirat"],
  },
  {
    slug: "limbu",
    name: "Limbu (Yakthung)",
    nameNe: "लिम्बु (याक्थुङ)",
    dek: "Kirat people of the far east, who ask permission of nature and ancestors before eating the new harvest.",
    intro: [
      "Limbus, who call themselves Yakthung, are about 1.4% of the population.[^cultural-atlas-nepal] At Chasok Tangnam on the Mangsir full moon, households offer the first grain in rites led by a [[phedangma]].[^ekantipur-chasok-2025]",
    ],
    sources: ["cultural-atlas-nepal", "ekantipur-chasok-2025"],
    regions: ["hills"],
    traditions: ["kirat"],
  },
  {
    slug: "maithil",
    name: "Maithil and Madhesi communities",
    nameNe: "मैथिल तथा मधेशी समुदाय",
    dek: "Communities of Mithila and the eastern Terai, whose Chhath has spread across the country.",
    intro: [
      "Janakpur, in the Maithili-speaking region of [[mithila]], is a centre of Chhath, the four-day worship of the sun. The festival has spread to Kathmandu, where hill communities now join in large numbers.[^ekantipur-chhath-janakpur-2025,ktm-post-chhath-unites-2018]",
    ],
    sources: ["ekantipur-chhath-janakpur-2025", "ktm-post-chhath-unites-2018"],
    regions: ["terai"],
    traditions: ["hindu"],
  },
];

export const regions: Region[] = [
  {
    slug: "kathmandu-valley",
    name: "Kathmandu Valley",
    nameNe: "काठमाडौँ उपत्यका",
    dek: "Three royal cities and their festival streets: Kathmandu, Patan and Bhaktapur.",
    intro: [
      "The Valley's festivals are performed in its streets and squares — the chariots of Indra Jatra and Biska, the procession of Gai Jatra, the Phulpati's arrival at Hanuman Dhoka. Most are Newar festivals tied to particular neighbourhoods and guthis.[^ktm-post-indra-jatra-2020,okh-biska]",
    ],
    sources: ["ktm-post-indra-jatra-2020", "okh-biska"],
  },
  {
    slug: "terai",
    name: "Terai and Madhesh",
    nameNe: "तराई–मधेश",
    dek: "The southern plains: Mithila, the Tharu heartlands, and Lumbini.",
    intro: [
      "The plains hold some of Nepal's most widely shared festivals: Chhath at Janakpur's ponds, Maghi in Tharu villages, and Buddha Jayanti at Lumbini. Holi is played here a day after the hills.[^ekantipur-chhath-janakpur-2025,indigenousvoice-maghi,ekantipur-holi-2026]",
    ],
    sources: ["ekantipur-chhath-janakpur-2025", "indigenousvoice-maghi", "ekantipur-holi-2026"],
  },
  {
    slug: "hills",
    name: "The middle hills",
    nameNe: "पहाड",
    dek: "Terraced hills from far west to far east, home to Dashain's swings and Sakela's dances.",
    intro: [
      "Most of the hill festivals in the Atlas follow the farming year: Sakela's spring and autumn rites, Tamu Lhosar, and the harvest-season Dashain with its bamboo swings.[^kiratrai-sakela,askmeaboutnepal-tamu-lhosar,nepali-times-swings]",
    ],
    sources: ["kiratrai-sakela", "askmeaboutnepal-tamu-lhosar", "nepali-times-swings"],
  },
  {
    slug: "himalaya",
    name: "The high Himalaya",
    nameNe: "हिमाल",
    dek: "Buddhist valleys of the north, where the year turns at Lhosar.",
    intro: ["Lhosar and the monastic festivals of the high valleys are the least covered part of the Atlas so far; several are on the research roadmap."],
    sources: [],
  },
  {
    slug: "diaspora",
    name: "Nepalis abroad",
    nameNe: "प्रवासी नेपाली",
    dek: "Millions of Nepalis celebrate far from home — sometimes on a video call at the tika hour.",
    intro: [
      "Nearly 2.8 million Nepalis work abroad, mainly in the Gulf, Malaysia and Europe.[^ktm-post-migrants-2026] Festival hours are now published for other time zones, and community associations organise tika ceremonies and gatherings from Australia to the United States.[^tht-global-tika-times,sbs-dashain-overseas,republica-nepali-americans-dashain]",
    ],
    sources: ["ktm-post-migrants-2026", "tht-global-tika-times", "sbs-dashain-overseas", "republica-nepali-americans-dashain"],
  },
];

export const communityBySlug = Object.fromEntries(communities.map((c) => [c.slug, c]));
export const regionBySlug = Object.fromEntries(regions.map((r) => [r.slug, r]));
export const traditionBySlug = Object.fromEntries(traditions.map((t) => [t.slug, t]));
