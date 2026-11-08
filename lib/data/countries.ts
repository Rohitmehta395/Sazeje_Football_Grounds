import { Country, Scarf, ScarfCategory } from "@/types";

export const UEFA_COUNTRIES: Country[] = [
  { name: "Albanië", nameEn: "Albania", code: "al", flag: "🇦🇱" },
  { name: "Andorra", nameEn: "Andorra", code: "ad", flag: "🇦🇩" },
  { name: "Armenië", nameEn: "Armenia", code: "am", flag: "🇦🇲" },
  { name: "Oostenrijk", nameEn: "Austria", code: "at", flag: "🇦🇹" },
  { name: "Azerbeidzjan", nameEn: "Azerbaijan", code: "az", flag: "🇦🇿" },
  { name: "Wit-Rusland", nameEn: "Belarus", code: "by", flag: "🇧🇾" },
  { name: "België", nameEn: "Belgium", code: "be", flag: "🇧🇪" },
  { name: "Bosnië en Herzegovina", nameEn: "Bosnia and Herzegovina", code: "ba", flag: "🇧🇦" },
  { name: "Bulgarije", nameEn: "Bulgaria", code: "bg", flag: "🇧🇬" },
  { name: "Kroatië", nameEn: "Croatia", code: "hr", flag: "🇭🇷" },
  { name: "Cyprus", nameEn: "Cyprus", code: "cy", flag: "🇨🇾" },
  { name: "Tsjechië", nameEn: "Czechia", code: "cz", flag: "🇨🇿" },
  { name: "Denemarken", nameEn: "Denmark", code: "dk", flag: "🇩🇰" },
  { name: "Engeland", nameEn: "England", code: "gb-eng", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Estland", nameEn: "Estonia", code: "ee", flag: "🇪🇪" },
  { name: "Faeröer", nameEn: "Faroe Islands", code: "fo", flag: "🇫🇴" },
  { name: "Finland", nameEn: "Finland", code: "fi", flag: "🇫🇮" },
  { name: "Frankrijk", nameEn: "France", code: "fr", flag: "🇫🇷" },
  { name: "Georgië", nameEn: "Georgia", code: "ge", flag: "🇬🇪" },
  { name: "Duitsland", nameEn: "Germany", code: "de", flag: "🇩🇪" },
  { name: "Gibraltar", nameEn: "Gibraltar", code: "gi", flag: "🇬🇮" },
  { name: "Griekenland", nameEn: "Greece", code: "gr", flag: "🇬🇷" },
  { name: "Hongarije", nameEn: "Hungary", code: "hu", flag: "🇭🇺" },
  { name: "IJsland", nameEn: "Iceland", code: "is", flag: "🇮🇸" },
  { name: "Israël", nameEn: "Israel", code: "il", flag: "🇮🇱" },
  { name: "Italië", nameEn: "Italy", code: "it", flag: "🇮🇹" },
  { name: "Kazachstan", nameEn: "Kazakhstan", code: "kz", flag: "🇰🇿" },
  { name: "Kosovo", nameEn: "Kosovo", code: "xk", flag: "🇽🇰" },
  { name: "Letland", nameEn: "Latvia", code: "lv", flag: "🇱🇻" },
  { name: "Liechtenstein", nameEn: "Liechtenstein", code: "li", flag: "🇱🇮" },
  { name: "Litouwen", nameEn: "Lithuania", code: "lt", flag: "🇱🇹" },
  { name: "Luxemburg", nameEn: "Luxembourg", code: "lu", flag: "🇱🇺" },
  { name: "Malta", nameEn: "Malta", code: "mt", flag: "🇲🇹" },
  { name: "Moldavië", nameEn: "Moldova", code: "md", flag: "🇲🇩" },
  { name: "Montenegro", nameEn: "Montenegro", code: "me", flag: "🇲🇪" },
  { name: "Nederland", nameEn: "Netherlands", code: "nl", flag: "🇳🇱" },
  { name: "Noord-Macedonië", nameEn: "North Macedonia", code: "mk", flag: "🇲🇰" },
  { name: "Noord-Ierland", nameEn: "Northern Ireland", code: "gb-nir", flag: "🇬🇧" },
  { name: "Noorwegen", nameEn: "Norway", code: "no", flag: "🇳🇴" },
  { name: "Polen", nameEn: "Poland", code: "pl", flag: "🇵🇱" },
  { name: "Portugal", nameEn: "Portugal", code: "pt", flag: "🇵🇹" },
  { name: "Ierland", nameEn: "Ireland", code: "ie", flag: "🇮🇪" },
  { name: "Roemenië", nameEn: "Romania", code: "ro", flag: "🇷🇴" },
  { name: "Rusland", nameEn: "Russia", code: "ru", flag: "🇷🇺" },
  { name: "San Marino", nameEn: "San Marino", code: "sm", flag: "🇸🇲" },
  { name: "Schotland", nameEn: "Scotland", code: "gb-sct", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { name: "Servië", nameEn: "Serbia", code: "rs", flag: "🇷🇸" },
  { name: "Slowakije", nameEn: "Slovakia", code: "sk", flag: "🇸🇰" },
  { name: "Slovenië", nameEn: "Slovenia", code: "si", flag: "🇸🇮" },
  { name: "Spanje", nameEn: "Spain", code: "es", flag: "🇪🇸" },
  { name: "Zweden", nameEn: "Sweden", code: "se", flag: "🇸🇪" },
  { name: "Zwitserland", nameEn: "Switzerland", code: "ch", flag: "🇨🇭" },
  { name: "Turkije", nameEn: "Turkey", code: "tr", flag: "🇹🇷" },
  { name: "Oekraïne", nameEn: "Ukraine", code: "ua", flag: "🇺🇦" },
  { name: "Wales", nameEn: "Wales", code: "gb-wls", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
];

export function getCountries(): Country[] {
  return UEFA_COUNTRIES;
}

export function getCountryByName(name: string): Country | undefined {
  if (!name) return undefined;
  const cleanName = name.replace(/^[^\w\säöüéèáóúñçÅåØøÆæÀ-ÿ]+/, "").trim().toLowerCase();
  return UEFA_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === cleanName ||
      c.name.toLowerCase() === name.toLowerCase() ||
      c.nameEn?.toLowerCase() === cleanName ||
      c.nameEn?.toLowerCase() === name.toLowerCase()
  );
}

export const GLOBAL_COUNTRY_CODES: Record<string, string> = {
  india: "in",
  in: "in",
  noorwegen: "no",
  norway: "no",
  no: "no",
  engeland: "gb-eng",
  england: "gb-eng",
  duitsland: "de",
  germany: "de",
  de: "de",
  nederland: "nl",
  netherlands: "nl",
  nl: "nl",
  spanje: "es",
  spain: "es",
  es: "es",
  italië: "it",
  italy: "it",
  it: "it",
  frankrijk: "fr",
  france: "fr",
  fr: "fr",
  belgië: "be",
  belgium: "be",
  be: "be",
  portugal: "pt",
  pt: "pt",
  schotland: "gb-sct",
  scotland: "gb-sct",
  wales: "gb-wls",
  brazilië: "br",
  brazil: "br",
  br: "br",
  argentinië: "ar",
  argentina: "ar",
  ar: "ar",
  usa: "us",
  "verenigde staten": "us",
  us: "us",
  japan: "jp",
  jp: "jp",
  australië: "au",
  australia: "au",
  au: "au",
  marokko: "ma",
  morocco: "ma",
  ma: "ma",
  egypte: "eg",
  egypt: "eg",
  eg: "eg",
  turkije: "tr",
  turkey: "tr",
  tr: "tr",
};

export function getCountryCode(countryName?: string): string | undefined {
  if (!countryName) return undefined;
  const cleanName = countryName.replace(/^[^\w\säöüéèáóúñçÅåØøÆæÀ-ÿ]+/, "").trim().toLowerCase();

  const uefa = getCountryByName(countryName);
  if (uefa?.code) return uefa.code.toLowerCase();

  if (GLOBAL_COUNTRY_CODES[cleanName]) {
    return GLOBAL_COUNTRY_CODES[cleanName];
  }

  if (cleanName.length === 2 && /^[a-z]{2}$/i.test(cleanName)) {
    return cleanName.toLowerCase();
  }

  return undefined;
}

export function getCountryFlagUrl(countryName: string): string | undefined {
  const code = getCountryCode(countryName);
  if (code) {
    return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  }
  return undefined;
}

export function getCountryDisplayName(nameNL: string, lang: "nl" | "en" = "nl"): string {
  if (lang === "nl") return nameNL;
  const cleanName = nameNL.replace(/^[^\w\säöüéèáóúñçÅåØøÆæÀ-ÿ]+/, "").trim();
  const found = UEFA_COUNTRIES.find(
    (c) => c.name.toLowerCase() === cleanName.toLowerCase() || c.name.toLowerCase() === nameNL.toLowerCase()
  );
  return found?.nameEn || nameNL;
}

export function getCountryFlagEmoji(countryName?: string): string | undefined {
  if (!countryName) return undefined;
  const country = getCountryByName(countryName);
  if (country?.flag) return country.flag;

  // Global fallbacks for countries outside UEFA list
  const lower = countryName.trim().toLowerCase();
  const globalFlags: Record<string, string> = {
    india: "🇮🇳",
    brazil: "🇧🇷",
    brazilië: "🇧🇷",
    argentina: "🇦🇷",
    argentinië: "🇦🇷",
    usa: "🇺🇸",
    "verenigde staten": "🇺🇸",
    japan: "🇯🇵",
    australia: "🇦🇺",
    australië: "🇦🇺",
    morocco: "🇲🇦",
    marokko: "🇲🇦",
    egypt: "🇪🇬",
    egypte: "🇪🇬",
    england: "🇬🇧",
    engeland: "🇬🇧",
    scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    schotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    wales: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    norway: "🇳🇴",
    noorwegen: "🇳🇴",
    germany: "🇩🇪",
    duitsland: "🇩🇪",
    spain: "🇪🇸",
    spanje: "🇪🇸",
    netherlands: "🇳🇱",
    nederland: "🇳🇱",
    italy: "🇮🇹",
    italië: "🇮🇹",
    france: "🇫🇷",
    frankrijk: "🇫🇷",
    belgium: "🇧🇪",
    belgië: "🇧🇪",
    portugal: "🇵🇹",
  };
  return globalFlags[lower];
}

export function resolveScarfLeagueAndFlag(
  league?: string,
  countryFlag?: string,
  countryName?: string
): { flag?: string; leagueName: string } {
  let flag = countryFlag?.trim();
  let leagueName = league?.trim() || "";

  // Check if leagueName starts with an emoji flag (e.g. "🇳🇴 Eliteserien")
  const emojiRegex = /^(\p{Regional_Indicator}{2}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u;
  const match = leagueName.match(emojiRegex);
  if (match) {
    if (!flag) {
      flag = match[1];
    }
    leagueName = leagueName.slice(match[0].length).trim();
  }

  // Fallback flag from countryName if not provided
  if (!flag && countryName) {
    flag = getCountryFlagEmoji(countryName);
  }

  return { flag, leagueName };
}

export function getCountriesWithScarfCounts(
  category: ScarfCategory | string,
  scarves: Scarf[] = []
): Country[] {
  return UEFA_COUNTRIES.map((c) => {
    const count = scarves.filter(
      (s) => s.category === category && s.country.toLowerCase() === c.name.toLowerCase()
    ).length;
    return { ...c, count };
  }).sort((a, b) => a.name.localeCompare(b.name));
}
