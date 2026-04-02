import type { Category, LexiconEntry } from './types';
import { alluresEntries } from './allures';
import { voilesEntries } from './voiles';
import { anatomieEntries } from './anatomie';
import { manoeuvresEntries } from './manoeuvres';
import { reglageEntries } from './reglage';
import { navigationEntries } from './navigation';
import { manoeuvresFondEntries } from './manoeuvres-fond';
import { expressionsEntries } from './expressions';

export const categories: Category[] = [
  {
    id: 'allures',
    title: 'Les allures',
    subtitle: 'Ta position par rapport au vent',
    description:
      "L'allure est la notion fondamentale en voile : c'est l'angle entre le vent et l'axe du bateau. Chaque allure a ses caractéristiques de vitesse, de confort et de technique. Tout dépend d'où vient le vent par rapport à ton bateau.",
    icon: 'Wind',
    color: 'amber',
    entries: alluresEntries,
  },
  {
    id: 'voiles',
    title: 'Les voiles',
    subtitle: 'Les surfaces qui captent le vent',
    description:
      'Les voiles sont le moteur du voilier. Chaque voile a un nom, une forme et un usage spécifique selon les conditions de vent et l\'allure choisie. Apprends à les reconnaître et à comprendre leur rôle.',
    icon: 'Triangle',
    color: 'cyan',
    entries: voilesEntries,
  },
  {
    id: 'anatomie',
    title: 'Anatomie du voilier',
    subtitle: 'Chaque pièce du bateau a un nom',
    description:
      "Un voilier est composé de dizaines de pièces, chacune avec un nom précis hérité de siècles de tradition maritime. Connaître l'anatomie du bateau est essentiel pour communiquer avec l'équipage.",
    icon: 'Ship',
    color: 'seagreen',
    entries: anatomieEntries,
  },
  {
    id: 'manoeuvres',
    title: 'Cordages et accastillage',
    subtitle: 'Cordages et accastillage',
    description:
      "Le gréement courant (cordages mobiles) et l'accastillage (pièces mécaniques) permettent de contrôler les voiles et de manoeuvrer le bateau. Chaque cordage a un nom et une fonction précise — on ne dit jamais « corde » à bord !",
    icon: 'Cable',
    color: 'coral',
    entries: manoeuvresEntries,
  },
  {
    id: 'reglage',
    title: 'Réglage des voiles',
    subtitle: "L'art de régler ses voiles",
    description:
      "Savoir régler ses voiles est ce qui distingue un bon marin. Border, choquer, observer les penons : chaque ajustement affecte la vitesse et l'équilibre du bateau. La règle d'or : border jusqu'à ce que le faseyement s'arrête, pas plus.",
    icon: 'SlidersHorizontal',
    color: 'ocean',
    entries: reglageEntries,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    subtitle: "S'orienter sur l'eau",
    description:
      "Naviguer, c'est se repérer et se déplacer sur l'eau en toute sécurité. Du compas au GPS, en passant par les cartes marines et les marées, voici les outils et concepts essentiels du navigateur.",
    icon: 'Compass',
    color: 'rose',
    entries: navigationEntries,
  },
  {
    id: 'manoeuvres-fondamentales',
    title: 'Manoeuvres fondamentales',
    subtitle: 'Les gestes essentiels',
    description:
      "Les manoeuvres sont les actions concrètes du marin : virer de bord, empanner, prendre un ris, mouiller... Chaque manoeuvre a sa procédure et ses commandes vocales. Maîtriser ces gestes, c'est gagner en autonomie et en sécurité.",
    icon: 'RotateCcw',
    color: 'purple',
    entries: manoeuvresFondEntries,
  },
  {
    id: 'expressions',
    title: 'Expressions du marin',
    subtitle: 'Parler comme un marin',
    description:
      "La voile a son propre langage, riche d'expressions imagées passées dans le vocabulaire courant. « Larguer les amarres », « avoir le vent en poupe »... Découvre le sens marin derrière ces expressions.",
    icon: 'MessageCircle',
    color: 'indigo',
    entries: expressionsEntries,
  },
];

export function getAllEntries(): LexiconEntry[] {
  return categories.flatMap((cat) => cat.entries);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getEntryById(id: string): LexiconEntry | undefined {
  return getAllEntries().find((entry) => entry.id === id);
}
