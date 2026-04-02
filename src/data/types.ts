export type CategoryId =
  | 'allures'
  | 'voiles'
  | 'anatomie'
  | 'manoeuvres'
  | 'reglage'
  | 'navigation'
  | 'manoeuvres-fondamentales'
  | 'expressions';

export interface LexiconEntry {
  id: string;
  term: string;
  aliases?: string[];
  definition: string;
  shortDefinition: string;
  category: CategoryId;
  diagramPartId?: string;
  relatedTerms?: string[];
  tips?: string;
}

export interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon name
  color: string; // tailwind color like "ocean" or "coral"
  entries: LexiconEntry[];
}
