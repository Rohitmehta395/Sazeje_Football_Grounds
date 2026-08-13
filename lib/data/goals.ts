import { Goal } from "@/types";

export const SEED_GOALS: Goal[] = [
  {
    id: "doel1",
    number: 1,
    title: "Alle 18 Eredivisie-stadions",
    description: "Nederland rond krijgen",
    targetCount: 18,
    currentCount: 12,
    status: "in_progress",
    details: "12 van de 18 gehad, de rest staat gepland voor komend seizoen.",
  },
  {
    id: "doel2",
    number: 2,
    title: "Een Europese finale",
    description: "Champions League of Europa League",
    targetCount: 1,
    currentCount: 0,
    status: "in_progress",
    details: "Live op de tribune staan bij een grote Europese finale.",
  },
  {
    id: "doel3",
    number: 3,
    title: "San Siro terug",
    description: "Milaan, Italië",
    targetCount: 2,
    currentCount: 1,
    status: "in_progress",
    details: "Nog een keer, maar dan bij de andere club uit de stad.",
  },
  {
    id: "doel4",
    number: 4,
    title: "Old Trafford",
    description: "Manchester United",
    targetCount: 1,
    currentCount: 0,
    status: "in_progress",
    details: "Staat al twee seizoenen op het lijstje, kaarten blijven lastig.",
  },
  {
    id: "doel5",
    number: 5,
    title: "Derde divisie ronde",
    description: "Kleinere Nederlandse clubs",
    targetCount: 10,
    currentCount: 4,
    status: "in_progress",
    details: "Ook de sfeer bij amateurvoetbal en lagere divisies meepakken.",
  },
  {
    id: "doel6",
    number: 6,
    title: "Alle Belgische topclubs",
    description: "Jupiler Pro League",
    targetCount: 5,
    currentCount: 3,
    status: "in_progress",
    details: "Nog Anderlecht en Standard te gaan.",
  },
  {
    id: "doel7",
    number: 7,
    title: "Schotland: Old Firm",
    description: "Celtic - Rangers",
    targetCount: 1,
    currentCount: 0,
    status: "in_progress",
    details: "De wedstrijd met misschien wel de zwaarste sfeer van Europa.",
  },
  {
    id: "doel8",
    number: 8,
    title: "100ste ground",
    description: "Mijlpaal",
    targetCount: 100,
    currentCount: 10,
    status: "in_progress",
    details: "Op naar de honderdste bezochte ground, waar dat ook wordt.",
  },
];

export function getGoals(): Goal[] {
  return SEED_GOALS;
}

export function getGoalById(id: string): Goal | undefined {
  return SEED_GOALS.find((g) => g.id === id);
}
