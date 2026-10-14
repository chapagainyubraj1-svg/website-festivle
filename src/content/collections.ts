import type { Collection } from "./types";

/** Curated journeys. Stops referencing festivals not yet published are skipped at render time. */
export const collections: Collection[] = [
  {
    slug: "festivals-of-light",
    title: "Festivals of light",
    dek: "Clay lamps for Lakshmi, butter lamps at the stupa, lamps carried for the dead.",
    intro: [
      "Light means different things in different festivals: welcome for a goddess, merit at a stupa, remembrance of those who died in the past year. This journey follows the flame.",
    ],
    stops: [
      { festival: "tihar", thread: "Rows of [[diyo]] welcome Lakshmi on the darkest night of autumn." },
      { festival: "indra-jatra", thread: "On the first evening, families who lost someone walk the old city with lamps and incense — [[upaku]]." },
      { festival: "buddha-jayanti", thread: "Butter lamps are lit at Lumbini, Swayambhu and Boudha on the Baisakh full moon." },
      { festival: "dashain", thread: "The season closes with an all-night vigil under the Kojagrat full moon." },
    ],
    palette: { bg: "#151a2e", ink: "#f6ecd2", accent: "#e9a24a" },
  },
  {
    slug: "renewal-and-harvest",
    title: "Stories of renewal and harvest",
    dek: "Seeds sown for the goddess, first grain offered to nature, sesame for the turning sun.",
    intro: [
      "Many Nepali festivals keep time with the farming year. This journey moves from sowing to harvest and to the coldest days of winter.",
    ],
    stops: [
      { festival: "sakela", thread: "Ubhauli in spring asks for good crops; Udhauli in late autumn gives thanks." },
      { festival: "dashain", thread: "Jamara is sown on the first day of Dashain and given as a blessing on the tenth." },
      { festival: "chhath", thread: "Offerings of seasonal produce are carried to the water's edge for the sun." },
      { festival: "maghi", thread: "Sesame, molasses, yams and ghee mark the sun's turn at Maghe Sankranti." },
    ],
    palette: { bg: "#23361f", ink: "#f2ecd6", accent: "#d9b44a" },
  },
  {
    slug: "kathmandu-valley-living-traditions",
    title: "The living traditions of the Kathmandu Valley",
    dek: "Chariots, masks, poles and processions in three royal cities.",
    intro: [
      "The Valley's festivals are performed in its streets and squares by neighbourhoods and lineages that have kept them for generations. This journey follows them through the year.",
    ],
    stops: [
      { festival: "bisket-jatra", thread: "Bhaktapur opens the solar year with a tug-of-war over Bhairab's chariot." },
      { festival: "indra-jatra", thread: "Kathmandu raises Indra's pole and carries its living goddess through the streets." },
      { festival: "dashain", thread: "Taleju's temple opens for a single day, and the Phulpati arrives at Hanuman Dhoka." },
      { festival: "tihar", thread: "Newar households greet the new year of Nepal Sambat with Mha Puja." },
    ],
    palette: { bg: "#3a1514", ink: "#f7e9d6", accent: "#d98a3a" },
  },
  {
    slug: "festivals-of-the-himalayas",
    title: "Festivals of the Himalayas",
    dek: "Three new years, prayer flags and the twelve-year cycle.",
    intro: ["Highland and hill peoples count years in a twelve-animal cycle and begin them at different moments of winter."],
    stops: [
      { festival: "lhosar", thread: "Tamu, Sonam and Gyalpo Lhosar begin the year at three different moons." },
      { festival: "buddha-jayanti", thread: "The Baisakh full moon is kept at monasteries and stupas across the north." },
    ],
    palette: { bg: "#1b2b3d", ink: "#eef0ea", accent: "#c9a14a" },
  },
  {
    slug: "family-and-blessings",
    title: "Celebrations of family and blessings",
    dek: "Elders bless the young; sisters bless brothers; women gather to sing.",
    intro: ["Several festivals are built around relationships: who blesses whom, who travels to whom, and what each owes the other."],
    stops: [
      { festival: "dashain", thread: "Elders give tika and jamara to the young." },
      { festival: "tihar", thread: "On Bhai Tika, sisters mark their brothers with seven colours and a wish for long life." },
      { festival: "teej", thread: "Women return to their natal homes, fast, and sing songs that comment on their lives." },
    ],
    palette: { bg: "#4a1420", ink: "#f8e9dc", accent: "#e3a64a" },
  },
  {
    slug: "traditions-of-the-terai",
    title: "Traditions of the Terai",
    dek: "Sun, sesame and colour on the southern plains.",
    intro: ["The plains hold some of the most widely shared festivals in Nepal — and some of the most locally distinctive."],
    stops: [
      { festival: "chhath", thread: "Janakpur's ponds fill with devotees at sunset and at dawn." },
      { festival: "maghi", thread: "Tharu villages celebrate their new year and choose village leaders." },
      { festival: "holi", thread: "The Terai plays Holi a day after the hills." },
      { festival: "buddha-jayanti", thread: "Lumbini, the Buddha's birthplace, keeps the Baisakh full moon." },
    ],
    palette: { bg: "#3a2a10", ink: "#f7eed8", accent: "#e9b445" },
  },
  {
    slug: "many-new-years",
    title: "The many New Years",
    dek: "Nepal begins its year many times over.",
    intro: [
      "Nepal's official year begins in Baisakh, but communities also keep their own: the lunar year of Nepal Sambat, three Lhosars and Maghi. Each new year tells a different history of time.",
    ],
    stops: [
      { festival: "bisket-jatra", thread: "The solar new year in Bhaktapur: a pole lowered, chariots collide." },
      { festival: "tihar", thread: "Nepal Sambat's new year falls during Tihar, with Mha Puja." },
      { festival: "lhosar", thread: "Tamu Lhosar in Poush, Sonam Lhosar in Magh, Gyalpo Lhosar in Falgun." },
      { festival: "maghi", thread: "The Tharu new year at Maghe Sankranti." },
    ],
    palette: { bg: "#1d2a2a", ink: "#eef1e8", accent: "#d6a64c" },
  },
  {
    slug: "processions-and-public-celebrations",
    title: "The art of processions",
    dek: "Chariots, poles, masks and parades — festivals performed in public.",
    intro: ["Some festivals happen at home; these happen in the street, and depend on the people who build, carry and pull."],
    stops: [
      { festival: "indra-jatra", thread: "Three chariots, three routes, three days." },
      { festival: "bisket-jatra", thread: "Upper and lower Bhaktapur pull Bhairab's chariot against each other." },
      { festival: "dashain", thread: "The Phulpati travels from Gorkha to Hanuman Dhoka." },
      { festival: "holi", thread: "The chir is raised in Basantapur and burned at Tundikhel." },
    ],
    palette: { bg: "#2c1a36", ink: "#f3ead9", accent: "#e1873c" },
  },
];
