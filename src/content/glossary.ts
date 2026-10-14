import type { GlossaryTerm } from "./types";

const list: GlossaryTerm[] = [
  /* Calendar & time */
  { id: "tithi", term: "Tithi", ne: "तिथि", romanized: "tithi", definition: "A lunar day: one of thirty divisions of the lunar month, measured by the angle between sun and moon. A tithi does not line up neatly with a solar day, which is why festival dates can shift or two tithis can fall on one calendar day." },
  { id: "shukla-paksha", term: "Shukla paksha", ne: "शुक्ल पक्ष", romanized: "shukla paksha", definition: "The bright, waxing fortnight of the lunar month, from new moon to full moon." },
  { id: "krishna-paksha", term: "Krishna paksha", ne: "कृष्ण पक्ष", romanized: "krishna paksha", definition: "The dark, waning fortnight of the lunar month, from full moon to new moon." },
  { id: "purnima", term: "Purnima", ne: "पूर्णिमा", romanized: "purnima", definition: "The full-moon day. Many festivals — Buddha Jayanti, Kojagrat, Fagu, Udhauli and Ubhauli — fall on a purnima." },
  { id: "sankranti", term: "Sankranti", ne: "संक्रान्ति", romanized: "sankranti", definition: "The day the sun enters a new zodiac sign, which begins a solar month in the Bikram Sambat calendar. Maghe Sankranti opens the month of Magh." },
  { id: "bikram-sambat", term: "Bikram Sambat", ne: "विक्रम संवत्", romanized: "bikram sambat", definition: "Nepal's official calendar. Its months are solar, while religious festivals inside it follow lunar tithis — so a festival can move by weeks across years in Bikram Sambat and Gregorian terms." },
  { id: "nepal-sambat", term: "Nepal Sambat", ne: "नेपाल संवत्", romanized: "nepal sambat", definition: "A lunar calendar of the Kathmandu Valley, traditionally dated from 879 CE. Its new year falls on the day of Mha Puja during Tihar." },
  { id: "panchanga", term: "Panchanga", ne: "पञ्चाङ्ग", romanized: "panchanga", definition: "An almanac that tracks tithis, lunar mansions and auspicious times. In Nepal a government-recognised committee fixes the dates and auspicious hours of national festivals each year." },
  { id: "saait", term: "Saait", ne: "साइत", romanized: "sāit", definition: "An auspicious moment calculated by astrologers — for example the hour for sowing jamara or giving Dashain tika." },
  { id: "lho", term: "Lho", ne: "ल्हो", romanized: "lho", definition: "A year in the twelve-year animal cycle used in Tamu (Gurung), Tamang, Sherpa and Tibetan calendars." },

  /* Dashain */
  { id: "jamara", term: "Jamara", ne: "जमरा", romanized: "jamarā", definition: "Pale yellow shoots of barley (sometimes with maize or wheat) sown on the first day of Dashain beside the kalash and given with tika on Vijaya Dashami." },
  { id: "tika", term: "Tika", ne: "टीका", romanized: "ṭīkā", definition: "A mark placed on the forehead as a blessing. Dashain tika is usually a mixture of rice grains, yogurt and vermilion; some communities use a white tika without vermilion, and in Bhaktapur a black tika is also worn." },
  { id: "kalash", term: "Kalash", ne: "कलश", romanized: "kalash", definition: "A consecrated water pot. On Ghatasthapana it is installed at the centre of the jamara bed and revered as the goddess." },
  { id: "ghatasthapana", term: "Ghatasthapana", ne: "घटस्थापना", romanized: "ghaṭasthāpanā", definition: "\"Establishing the pot\": the first day of Dashain, when the kalash is installed and jamara is sown." },
  { id: "dashain-ghar", term: "Dashain ghar", ne: "दशैँ घर", romanized: "dashain ghar", definition: "The room set apart for Dashain worship, where the kalash stands and jamara grows." },
  { id: "phulpati", term: "Phulpati", ne: "फूलपाती", romanized: "phūlpātī", definition: "\"Flowers and leaves\": the seventh day of Dashain, when a bundle of sacred plants is brought into the house — and, at state level, from Gorkha to Hanuman Dhoka in Kathmandu." },
  { id: "navapatrika", term: "Navapatrika", ne: "नवपत्रिका", romanized: "navapatrikā", definition: "\"Nine leaves\": the bundle of sacred plants that forms the Phulpati offering." },
  { id: "navaratri", term: "Navaratri", ne: "नवरात्रि", romanized: "navarātri", definition: "\"Nine nights\" of goddess worship that make up the first part of Dashain." },
  { id: "navadurga", term: "Navadurga", ne: "नवदुर्गा", romanized: "navadurgā", definition: "The nine forms of the goddess Durga. In Bhaktapur the Navadurga are also a distinct group of deities with their own temples and masked dance tradition." },
  { id: "durga", term: "Durga", ne: "दुर्गा", romanized: "durgā", definition: "The great goddess whose victory over the buffalo-demon Mahishasura is narrated in the Devī Māhātmya and celebrated during Dashain." },
  { id: "mahishasura", term: "Mahishasura", ne: "महिषासुर", romanized: "mahiṣāsura", definition: "The buffalo-demon defeated by the goddess in the Devī Māhātmya." },
  { id: "devi-mahatmya", term: "Devī Māhātmya", ne: "देवी माहात्म्य", romanized: "devī māhātmya", definition: "\"Glorification of the Goddess\", a Sanskrit text of thirteen chapters within the Mārkaṇḍeya Purāṇa, widely recited during Navaratri as the Chandi Path or Durga Saptashati." },
  { id: "chandi-path", term: "Chandi Path", ne: "चण्डी पाठ", romanized: "caṇḍī pāṭh", definition: "Recitation of the Devī Māhātmya, also called the Durga Saptashati (\"seven hundred verses to Durga\")." },
  { id: "taleju", term: "Taleju", ne: "तलेजु", romanized: "taleju", definition: "Tutelary goddess of the Malla kings, regarded as a form of Durga. Her temple at Hanuman Dhoka opens to the public on Maha Navami." },
  { id: "mohani", term: "Mohani", ne: "मोहनी", romanized: "mohanī", definition: "The Newar observance of the Dashain season, centred on lineage and tutelary deities, with its own rites such as the Khadga Jatra." },
  { id: "khadga", term: "Khadga", ne: "खड्ग", romanized: "khaḍga", definition: "A ritual sword or scimitar. Newar families process with swords in the Khadga Jatra during Mohani." },
  { id: "linge-ping", term: "Linge ping", ne: "लिङ्गे पिङ", romanized: "liṅge piṅ", definition: "A tall temporary swing of four bamboo poles lashed together at the top, built by neighbours for Dashain and Tihar." },
  { id: "rote-ping", term: "Rote ping", ne: "रोटे पिङ", romanized: "roṭe piṅ", definition: "A rotating wooden wheel swing, a kind of hand-turned Ferris wheel, reused from year to year." },
  { id: "changa", term: "Changa", ne: "चङ्गा", romanized: "caṅgā", definition: "A kite. Autumn skies over Nepali towns fill with kites in the Dashain season." },
  { id: "dakshina", term: "Dakshina", ne: "दक्षिणा", romanized: "dakṣiṇā", definition: "A gift of money given with a blessing or for a ritual service — for example by elders along with Dashain tika." },
  { id: "kojagrat", term: "Kojagrat", ne: "कोजाग्रत", romanized: "kojāgrat", definition: "From Sanskrit *ko jāgarti*, \"who is awake?\" — the full moon that closes Dashain, when Lakshmi is said to bless those who keep vigil." },
  { id: "kubhindo", term: "Kubhindo", ne: "कुभिण्डो", romanized: "kubhiṇḍo", definition: "Ash gourd or pumpkin. Offered as a substitute for animal sacrifice by some households and groups." },

  /* Tihar */
  { id: "yamapanchak", term: "Yamapanchak", ne: "यमपञ्चक", romanized: "yamapañcak", definition: "\"The five days of Yama\": a name for Tihar that links the festival to Yama, lord of death, and his sister Yamuna." },
  { id: "diyo", term: "Diyo", ne: "दियो", romanized: "diyo", definition: "A small clay oil lamp. Rows of diyos are lit for Lakshmi on the third evening of Tihar." },
  { id: "sayapatri", term: "Sayapatri", ne: "सयपत्री", romanized: "sayapatrī", definition: "Marigold — \"hundred-petalled\" — the flower of Tihar garlands." },
  { id: "makhamali", term: "Makhamali", ne: "मखमली", romanized: "makhamalī", definition: "Globe amaranth (*Gomphrena globosa*), a velvety flower that keeps its colour as it dries; strung into garlands for Bhai Tika." },
  { id: "saptarangi-tika", term: "Saptarangi tika", ne: "सप्तरङ्गी टीका", romanized: "saptaraṅgī ṭīkā", definition: "The seven-coloured tika a sister places on her brother's forehead on Bhai Tika." },
  { id: "deusi-bhailo", term: "Deusi–Bhailo", ne: "देउसी–भैलो", romanized: "deusī–bhailo", definition: "Groups who go house to house during Tihar singing call-and-response songs and blessing households, receiving gifts in return. Bhailo is traditionally sung by girls and women, Deusi by boys and men." },
  { id: "mha-puja", term: "Mha Puja", ne: "म्ह पूजा", romanized: "mha pūjā", definition: "Newar \"worship of the body/self\", performed on the first day of Nepal Sambat during Tihar, with each person seated before a mandala." },
  { id: "laxmi", term: "Lakshmi", ne: "लक्ष्मी", romanized: "lakṣmī", definition: "Goddess of wealth and good fortune, worshipped on the third evening of Tihar (often spelled Laxmi in Nepal)." },

  /* Indra Jatra */
  { id: "yenya", term: "Yenya", ne: "येँयाः", romanized: "yẽyā", definition: "The Newar name of Indra Jatra: \"the festival of Kathmandu\" (Ye = Kathmandu, ya = festival)." },
  { id: "yosin", term: "Yosin", ne: "योसिं", romanized: "yosiṃ", definition: "A ceremonial pole (also lingo or Indradhvaja) raised to open a festival — at Hanuman Dhoka for Indra Jatra and in Bhaktapur for Biska." },
  { id: "kumari", term: "Kumari", ne: "कुमारी", romanized: "kumārī", definition: "A girl chosen as a living goddess. The Royal Kumari of Kathmandu is carried through the city on her chariot during Indra Jatra." },
  { id: "lakhe", term: "Lakhe", ne: "लाखे", romanized: "lākhe", definition: "A masked dancer representing a protective demon with a red face and flowing hair, performed in the streets during Indra Jatra." },
  { id: "upaku", term: "Upaku wanegu", ne: "उपाकु वनेगु", romanized: "upākū wanegu", definition: "A walk around the old city with lamps and incense by families who lost someone in the past year, on the first evening of Indra Jatra." },
  { id: "bhairab", term: "Bhairab", ne: "भैरव", romanized: "bhairav", definition: "A fierce form of Shiva and guardian deity, honoured with great masks in Kathmandu and chariots in Bhaktapur." },

  /* Chhath */
  { id: "arghya", term: "Arghya", ne: "अर्घ्य", romanized: "arghya", definition: "A water offering made with cupped hands or a vessel. Chhath centres on arghya to the setting and rising sun." },
  { id: "vratti", term: "Vratti", ne: "व्रती", romanized: "vratī", definition: "A person keeping a vow (vrata) and fasting — in Chhath, most often women of the household." },
  { id: "thekua", term: "Thekua", ne: "ठेकुवा", romanized: "ṭhekuvā", definition: "A hard, sweet wheat-and-jaggery biscuit pressed with patterns, the signature offering of Chhath." },
  { id: "soop", term: "Soop", ne: "सुप", romanized: "sup", definition: "A flat bamboo winnowing tray used to carry offerings to the water's edge during Chhath." },
  { id: "ghat", term: "Ghat", ne: "घाट", romanized: "ghāṭ", definition: "Steps or a bank leading down to water, where bathing and offerings take place." },

  /* Holi */
  { id: "chir", term: "Chir", ne: "चीर", romanized: "cīr", definition: "A tall pole hung with strips of coloured cloth, raised in Basantapur about a week before Holi and later burned." },
  { id: "abir", term: "Abir", ne: "अबिर", romanized: "abīr", definition: "Coloured powder, especially red, thrown and smeared during Holi." },

  /* Buddha Jayanti */
  { id: "vesak", term: "Vesak", ne: "वैशाख", romanized: "vesak", definition: "The Pali-derived name for the full moon of the month of Vaiśākha, observed across Buddhist Asia. In Nepal: Buddha Jayanti or Buddha Purnima." },
  { id: "kora", term: "Kora", ne: "कोरा", romanized: "korā", definition: "Clockwise circumambulation of a stupa, temple or sacred site." },
  { id: "stupa", term: "Stupa", ne: "स्तूप", romanized: "stūpa", definition: "A domed reliquary monument, such as Swayambhu or Boudha, venerated by walking around it." },
  { id: "bodhi", term: "Bodhi tree", ne: "बोधिवृक्ष", romanized: "bodhivṛkṣa", definition: "The fig tree (*Ficus religiosa*) under which the Buddha is said to have attained awakening; its heart-shaped leaf is an early aniconic symbol of the Buddha." },

  /* Teej */
  { id: "haritalika", term: "Haritalika", ne: "हरितालिका", romanized: "haritālikā", definition: "Name of the main day of Teej, explained in tradition as recalling Parvati's companion who carried her away so that she could marry Shiva." },
  { id: "dar", term: "Dar", ne: "दर", romanized: "dar", definition: "The festive meal eaten together on the eve of the Teej fast (\"dar khane din\")." },
  { id: "pote", term: "Pote", ne: "पोते", romanized: "pote", definition: "A necklace of fine glass beads, often green or red, worn by married women." },
  { id: "rishi-panchami", term: "Rishi Panchami", ne: "ऋषि पञ्चमी", romanized: "ṛṣi pañcamī", definition: "The day of purification that closes the Teej period, two days after the main fast." },

  /* Lhosar */
  { id: "lhosar", term: "Lhosar", ne: "ल्होसार", romanized: "lhosār", definition: "\"New year\" in Tibetan and related Himalayan languages (lo = year, sar = new). Nepal observes three Lhosars." },
  { id: "khada", term: "Khada", ne: "खादा", romanized: "khādā", definition: "A ceremonial scarf (Tibetan *kha btags*) offered as a greeting and blessing." },
  { id: "lungta", term: "Lungta", ne: "लुङ्दार", romanized: "lungta", definition: "Prayer flags — \"wind horses\" — printed with prayers and hung in the order blue, white, red, green, yellow." },
  { id: "damphu", term: "Damphu", ne: "डम्फु", romanized: "ḍamphu", definition: "A round frame drum central to Tamang Selo music." },

  /* Maghi */
  { id: "chaku", term: "Chaku", ne: "चाकु", romanized: "cāku", definition: "Hardened molasses (jaggery) eaten on Maghe Sankranti; Newars call the day Ghya Chaku Sanlhu after ghee and chaku." },
  { id: "tarul", term: "Tarul", ne: "तरुल", romanized: "tarul", definition: "Yam, boiled and eaten on Maghe Sankranti." },
  { id: "badghar", term: "Badghar", ne: "बडघर", romanized: "baḍghar", definition: "A Tharu village headman chosen for the coming year at Maghi, together with other village office-holders." },

  /* Bisket */
  { id: "biska", term: "Biska", ne: "बिस्का", romanized: "biskāḥ", definition: "Bhaktapur's new-year festival (often written Bisket Jatra), centred on the chariots of Bhairab and Bhadrakali and the yosin pole." },

  /* Kirat */
  { id: "sakela", term: "Sakela", ne: "साकेला", romanized: "sākelā", definition: "The great seasonal rite of the Kirat Rai, observed as Ubhauli in spring and Udhauli in late autumn, with the Sili circle dance." },
  { id: "sili", term: "Sili", ne: "सिली", romanized: "silī", definition: "The movements of the Sakela dance, which mimic birds, animals, farming and natural phenomena." },
  { id: "mundhum", term: "Mundhum", ne: "मुन्धुम", romanized: "mundhum", definition: "The oral scripture and ritual knowledge of the Kirat peoples, recited by ritual specialists." },
  { id: "silimangpa", term: "Silimangpa", ne: "सिलिमाङ्पा", romanized: "silimāṅpā", definition: "Male leader of the Sakela Sili dance; the female leader is the Silimangma." },
  { id: "phedangma", term: "Phedangma", ne: "फेदाङ्मा", romanized: "phedāṅmā", definition: "A Limbu ritual specialist who performs household rites such as Chasok." },

  /* General */
  { id: "jatra", term: "Jatra", ne: "जात्रा", romanized: "jātrā", definition: "A festival procession, often with a deity carried through the streets on a chariot or palanquin." },
  { id: "puja", term: "Puja", ne: "पूजा", romanized: "pūjā", definition: "Worship: offerings of light, flowers, food, water and attention to a deity, person or object." },
  { id: "prasad", term: "Prasad", ne: "प्रसाद", romanized: "prasād", definition: "Food or other offerings, first presented to a deity and then shared as a blessing." },
  { id: "janajati", term: "Janajati", ne: "जनजाति", romanized: "janajāti", definition: "Indigenous nationalities of Nepal — the term used by the state and by Indigenous organisations for some sixty recognised peoples." },
  { id: "madhesh", term: "Madhesh", ne: "मधेश", romanized: "madhesh", definition: "The southern plains of Nepal (also Terai), and a political identity for many of their peoples." },
  { id: "mithila", term: "Mithila", ne: "मिथिला", romanized: "mithilā", definition: "The Maithili-speaking cultural region spanning south-eastern Nepal and northern Bihar, centred historically on Janakpur." },
];

/** Common nouns appear in lower case when used mid-sentence. */
const COMMON = new Set([
  "tithi", "purnima", "sankranti", "panchanga", "saait", "lho", "jamara", "tika", "kalash", "navapatrika", "khadga", "linge-ping", "rote-ping",
  "changa", "dakshina", "kubhindo", "diyo", "sayapatri", "makhamali", "saptarangi-tika", "arghya", "vratti", "thekua", "soop", "ghat", "chir", "abir",
  "kora", "stupa", "dar", "pote", "khada", "lungta", "damphu", "chaku", "tarul", "badghar", "sili", "jatra", "puja", "prasad", "yosin", "shukla-paksha", "krishna-paksha",
]);

export function inlineLabel(t: GlossaryTerm) {
  return COMMON.has(t.id) ? t.term.toLowerCase() : t.term;
}

export const glossary: Record<string, GlossaryTerm> = Object.fromEntries(list.map((t) => [t.id, t]));
export const glossaryList = list;
