import { Country } from "@/types";
import { SEED_SCARVES } from "./scarves";

export const UEFA_COUNTRIES: Country[] = [
  { name: "Albanië", nameEn: "Albania", flag: "🇦🇱" },
  { name: "Andorra", nameEn: "Andorra", flag: "🇦🇩" },
  { name: "Armenië", nameEn: "Armenia", flag: "🇦🇲" },
  { name: "Oostenrijk", nameEn: "Austria", flag: "🇦🇹" },
  { name: "Azerbeidzjan", nameEn: "Azerbaijan", flag: "🇦🇿" },
  { name: "Wit-Rusland", nameEn: "Belarus", flag: "🇧🇾" },
  { name: "België", nameEn: "Belgium", flag: "🇧🇪" },
  { name: "Bosnië en Herzegovina", nameEn: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { name: "Bulgarije", nameEn: "Bulgaria", flag: "🇧🇬" },
  { name: "Kroatië", nameEn: "Croatia", flag: "🇭🇷" },
  { name: "Cyprus", nameEn: "Cyprus", flag: "🇨🇾" },
  { name: "Tsjechië", nameEn: "Czechia", flag: "🇨🇿" },
  { name: "Denemarken", nameEn: "Denmark", flag: "🇩🇰" },
  { name: "Engeland", nameEn: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Estland", nameEn: "Estonia", flag: "🇪🇪" },
  { name: "Faeröer", nameEn: "Faroe Islands", flag: "🇫🇴" },
  { name: "Finland", nameEn: "Finland", flag: "🇫🇮" },
  { name: "Frankrijk", nameEn: "France", flag: "🇫🇷" },
  { name: "Georgië", nameEn: "Georgia", flag: "🇬🇪" },
  { name: "Duitsland", nameEn: "Germany", flag: "🇩🇪" },
  { name: "Gibraltar", nameEn: "Gibraltar", flag: "🇬🇮" },
  { name: "Griekenland", nameEn: "Greece", flag: "🇬🇷" },
  { name: "Hongarije", nameEn: "Hungary", flag: "🇭🇺" },
  { name: "IJsland", nameEn: "Iceland", flag: "🇮🇸" },
  { name: "Israël", nameEn: "Israel", flag: "🇮🇱" },
  { name: "Italië", nameEn: "Italy", flag: "🇮🇹" },
  { name: "Kazachstan", nameEn: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kosovo", nameEn: "Kosovo", flag: "🇽🇰" },
  { name: "Letland", nameEn: "Latvia", flag: "🇱🇻" },
  { name: "Liechtenstein", nameEn: "Liechtenstein", flag: "🇱🇮" },
  { name: "Litouwen", nameEn: "Lithuania", flag: "🇱🇹" },
  { name: "Luxemburg", nameEn: "Luxembourg", flag: "🇱🇺" },
  { name: "Malta", nameEn: "Malta", flag: "🇲🇹" },
  { name: "Moldavië", nameEn: "Moldova", flag: "🇲🇩" },
  { name: "Montenegro", nameEn: "Montenegro", flag: "🇲🇪" },
  { name: "Nederland", nameEn: "Netherlands", flag: "🇳🇱" },
  { name: "Noord-Macedonië", nameEn: "North Macedonia", flag: "🇲🇰" },
  { name: "Noord-Ierland", nameEn: "Northern Ireland", flag: "🇬🇧" },
  { name: "Noorwegen", nameEn: "Norway", flag: "🇳🇴" },
  { name: "Polen", nameEn: "Poland", flag: "🇵🇱" },
  { name: "Portugal", nameEn: "Portugal", flag: "🇵🇹" },
  { name: "Ierland", nameEn: "Ireland", flag: "🇮🇪" },
  { name: "Roemenië", nameEn: "Romania", flag: "🇷🇴" },
  { name: "Rusland", nameEn: "Russia", flag: "🇷🇺" },
  { name: "San Marino", nameEn: "San Marino", flag: "🇸🇲" },
  { name: "Schotland", nameEn: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { name: "Servië", nameEn: "Serbia", flag: "🇷🇸" },
  { name: "Slowakije", nameEn: "Slovakia", flag: "🇸🇰" },
  { name: "Slovenië", nameEn: "Slovenia", flag: "🇸🇮" },
  { name: "Spanje", nameEn: "Spain", flag: "🇪🇸" },
  { name: "Zweden", nameEn: "Sweden", flag: "🇸🇪" },
  { name: "Zwitserland", nameEn: "Switzerland", flag: "🇨🇭" },
  { name: "Turkije", nameEn: "Turkey", flag: "🇹🇷" },
  { name: "Oekraïne", nameEn: "Ukraine", flag: "🇺🇦" },
  { name: "Wales", nameEn: "Wales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
];

export function getCountries(): Country[] {
  return UEFA_COUNTRIES;
}

export function getCountryByName(name: string): Country | undefined {
  return UEFA_COUNTRIES.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function getCountryDisplayName(nameNL: string, lang: "nl" | "en" = "nl"): string {
  if (lang === "nl") return nameNL;
  // Clean emoji flag prefix if present e.g. "🇳🇱 Nederland" -> "Nederland"
  const cleanName = nameNL.replace(/^[^\w\säöüéèáóúñçÅåØøÆæÀ-ÿ]+/, "").trim();
  const found = UEFA_COUNTRIES.find(
    (c) => c.name.toLowerCase() === cleanName.toLowerCase() || c.name.toLowerCase() === nameNL.toLowerCase()
  );
  return found?.nameEn || nameNL;
}

export function getCountriesWithScarfCounts(category: "new" | "secondhand" | string): Country[] {
  return UEFA_COUNTRIES.map((c) => {
    const count = SEED_SCARVES.filter(
      (s) => s.category === category && s.country.toLowerCase() === c.name.toLowerCase()
    ).length;
    return { ...c, count };
  }).sort((a, b) => a.name.localeCompare(b.name));
}
