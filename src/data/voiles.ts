import type { LexiconEntry } from './types';

export const voilesEntries: LexiconEntry[] = [
  {
    id: 'grand-voile',
    term: 'Grand-voile',
    aliases: ['GV'],
    definition:
      "La voile principale du voilier, envoyée sur le mât et la bôme. Elle est généralement de forme triangulaire (gréement bermudien) et constitue le moteur principal du bateau, surtout aux allures de près. On la hisse le long du mât grâce à la drisse de grand-voile, et on la règle avec l'écoute de grand-voile. Elle se prend des ris pour réduire sa surface quand le vent forcit.",
    shortDefinition: 'Voile principale, fixée au mât et à la bôme.',
    category: 'voiles',
    diagramPartId: 'svg-grand-voile',
    relatedTerms: ['bome', 'drisse', 'ecoute', 'prise-de-ris', 'mat'],
    tips: 'La grand-voile est toujours la première voile hissée et la dernière affalée. Pense à choquer le hale-bas et la bordure avant de la hisser.',
  },
  {
    id: 'genois',
    term: 'Génois',
    definition:
      "Grande voile d'avant dont la surface dépasse celle du triangle avant (triangle formé par l'étai, le mât et le pont). Le génois recouvre donc partiellement la grand-voile. On le mesure en pourcentage : un génois à 130% a une surface 30% plus grande que le triangle avant. C'est la voile d'avant la plus courante en croisière par vent léger à modéré.",
    shortDefinition: 'Grande voile d\'avant qui recouvre partiellement la grand-voile.',
    category: 'voiles',
    diagramPartId: 'svg-genois',
    relatedTerms: ['foc', 'etai', 'ecoute', 'solent'],
    tips: 'Plus le génois est grand, plus il est puissant par vent faible, mais plus il est difficile à manier quand le vent monte. Sur enrouleur, tu peux réduire sa surface facilement.',
  },
  {
    id: 'foc',
    term: 'Foc',
    definition:
      "Voile d'avant de taille plus réduite que le génois, dont la surface ne dépasse pas le triangle avant (100% ou moins). Le foc ne recouvre pas la grand-voile. Il est utilisé par vent moyen à fort, car sa surface plus petite le rend plus maniable. Sur les voiliers modernes, le foc est souvent auto-vireur, ce qui simplifie les manœuvres de virement de bord.",
    shortDefinition: 'Voile d\'avant plus petite que le génois, ne recouvrant pas la GV.',
    category: 'voiles',
    diagramPartId: 'svg-foc',
    relatedTerms: ['genois', 'solent', 'tourmentin', 'etai'],
    tips: 'Le foc auto-vireur est idéal pour naviguer en équipage réduit car tu n\'as pas besoin de changer l\'écoute à chaque virement.',
  },
  {
    id: 'solent',
    term: 'Solent',
    diagramPartId: 'svg-solent',
    definition:
      "Voile d'avant de taille intermédiaire entre le génois et le foc, généralement autour de 90-100% du triangle avant. Le nom vient du détroit du Solent en Angleterre. C'est une voile polyvalente, adaptée au vent médium, qui offre un bon compromis entre puissance et maniabilité.",
    shortDefinition: 'Voile d\'avant de taille intermédiaire, entre le génois et le foc.',
    category: 'voiles',
    relatedTerms: ['genois', 'foc', 'etai'],
  },
  {
    id: 'tourmentin',
    term: 'Tourmentin',
    definition:
      "Très petite voile d'avant, en tissu très résistant (souvent orange pour la visibilité), utilisée uniquement par gros temps. Le tourmentin est envoyé sur l'étai à la place du foc ou du génois quand le vent est trop fort. Sa surface réduite permet de garder un minimum de propulsion et de contrôle du bateau dans les conditions difficiles.",
    shortDefinition: 'Très petite voile d\'avant pour le gros temps.',
    category: 'voiles',
    diagramPartId: 'svg-tourmentin',
    relatedTerms: ['voile-de-cape', 'etai', 'foc'],
    tips: 'Le tourmentin fait partie de l\'équipement de sécurité obligatoire en navigation hauturière. Entraîne-toi à l\'envoyer par beau temps !',
  },
  {
    id: 'spinnaker',
    term: 'Spinnaker',
    aliases: ['Spi'],
    definition:
      "Grande voile légère et creuse, souvent très colorée, envoyée à l'avant du bateau pour les allures portantes (vent arrière, grand largue). Le spinnaker est symétrique et se manœuvre avec un tangon. Il est maintenu par un bras et une écoute. C'est une voile très puissante qui peut considérablement augmenter la vitesse, mais sa manœuvre est technique.",
    shortDefinition: 'Grande voile creuse et colorée pour les allures portantes, avec tangon.',
    category: 'voiles',
    diagramPartId: 'svg-spinnaker',
    relatedTerms: ['tangon', 'bras-de-spinnaker', 'gennaker', 'vent-arriere', 'grand-largue'],
    tips: 'L\'envoi et l\'affalage du spi sont des manœuvres qui s\'enchaînent vite. Prépare bien tout avant : bras, écoute, tangon, drisse. Communique clairement avec l\'équipage.',
  },
  {
    id: 'gennaker',
    term: 'Gennaker',
    aliases: ['Spi asymétrique'],
    definition:
      "Voile d'avant légère et creuse, intermédiaire entre le génois et le spinnaker. Contrairement au spinnaker classique, le gennaker est asymétrique : il est fixé au bateau par un point d'amure (souvent sur un bout-dehors ou un emmagasineur à l'étrave) et ne nécessite pas de tangon. Plus facile à manœuvrer que le spi, il est idéal du travers au grand largue.",
    shortDefinition: 'Voile d\'avant creuse asymétrique, plus facile que le spinnaker.',
    category: 'voiles',
    diagramPartId: 'svg-gennaker',
    relatedTerms: ['spinnaker', 'code-zero', 'genois'],
    tips: 'Le gennaker est parfait pour la croisière : il apporte beaucoup de puissance aux allures portantes sans la complexité du tangon. Idéal pour les équipages réduits.',
  },
  {
    id: 'code-zero',
    term: 'Code 0',
    aliases: ['Code zéro'],
    diagramPartId: 'svg-code-zero',
    definition:
      "Grande voile d'avant légère, à mi-chemin entre un génois léger et un gennaker. Le Code 0 est plus plat qu'un gennaker et s'utilise aux allures de reaching (du bon plein au travers) par vent léger. Il est souvent gréé sur un emmagasineur (enrouleur dédié) pour faciliter ses manœuvres. C'est la voile idéale pour les petits airs.",
    shortDefinition: 'Grande voile légère entre le génois et le gennaker, pour vent faible.',
    category: 'voiles',
    relatedTerms: ['gennaker', 'genois', 'bon-plein', 'travers'],
    tips: 'Le Code 0 est fragile : ne l\'utilise pas au-dessus de 12-15 nœuds de vent. Il est magique par petit temps quand le génois ne porte plus.',
  },
  {
    id: 'trinquette',
    term: 'Trinquette',
    definition:
      "Voile d'avant de taille réduite, envoyée sur un étai intérieur (étai de trinquette), en arrière de l'étai principal. Sur les voiliers de croisière hauturière, la trinquette permet de conserver une petite voile d'avant efficace quand le vent forcit, sans avoir à réduire le génois. Elle est particulièrement utile en double équipier.",
    shortDefinition: 'Petite voile d\'avant sur un étai intérieur, pour vent fort.',
    category: 'voiles',
    diagramPartId: 'svg-trinquette',
    relatedTerms: ['foc', 'etai', 'tourmentin'],
    tips: 'La trinquette est un excellent investissement pour la croisière hauturière. Elle permet de naviguer confortablement par vent soutenu sans trop fatiguer l\'équipage.',
  },
  {
    id: 'voile-de-cape',
    term: 'Voile de cape',
    diagramPartId: 'svg-voile-de-cape',
    definition:
      "Petite voile très solide, semblable au tourmentin mais envoyée sur le mât à la place de la grand-voile (ou en complément du tourmentin sur l'avant). La voile de cape est utilisée dans les conditions de survie, quand le vent est trop fort pour porter toute autre voile. Elle permet au bateau de se mettre à la cape et de dériver lentement sous le vent en attendant l'accalmie.",
    shortDefinition: 'Petite voile de survie pour le très gros temps.',
    category: 'voiles',
    relatedTerms: ['tourmentin', 'cape', 'prise-de-ris'],
    tips: 'Comme le tourmentin, la voile de cape doit être préparée et testée avant de partir en mer. Ne la découvre pas le jour où tu en as besoin !',
  },
  {
    id: 'lazy-bag',
    term: 'Lazy bag',
    aliases: ['Lazy jack'],
    definition:
      "Système de sangles ou de bras reliant le mât à la bôme, formant un berceau qui retient la grand-voile lorsqu'elle est affalée. Le lazy bag (sac de paresseux) facilite considérablement l'affalage et le rangement de la grand-voile : au lieu de tomber en vrac sur le pont, elle se plie d'elle-même dans le berceau. Certains systèmes intègrent une housse de protection.",
    shortDefinition: 'Système de bras qui recueille la grand-voile quand on l\'affale.',
    category: 'voiles',
    diagramPartId: 'svg-lazy-bag',
    relatedTerms: ['grand-voile', 'bome', 'affaler'],
    tips: 'Pense à écarter les lazy jacks quand tu hisses la grand-voile, sinon les lattes peuvent se coincer dedans.',
  },
  {
    id: 'guindant',
    term: 'Guindant',
    definition:
      "Bord d'attaque d'une voile, c'est-à-dire le côté par lequel le vent arrive en premier. Pour la grand-voile, le guindant est le côté fixé au mât (le long de la ralingue). Pour le foc ou le génois, c'est le côté fixé à l'étai. La tension du guindant influence le creux de la voile et donc sa puissance.",
    shortDefinition: 'Bord d\'attaque de la voile, côté d\'où arrive le vent.',
    category: 'voiles',
    diagramPartId: 'svg-guindant',
    relatedTerms: ['chute', 'bordure', 'cunningham', 'point-de-drisse'],
    tips: 'Tendre le guindant (avec le cunningham ou la drisse) aplatit la voile et avance le creux : utile quand le vent forcit.',
  },
  {
    id: 'chute',
    term: 'Chute',
    definition:
      "Bord de fuite d'une voile, c'est-à-dire le côté par lequel le vent s'échappe. C'est le bord arrière de la voile, opposé au guindant. La forme de la chute (ouverte ou fermée) influence l'écoulement du vent et la puissance de la voile. On contrôle la tension de la chute par le hale-bas, la bordure et les lattes.",
    shortDefinition: 'Bord de fuite de la voile, par où le vent s\'échappe.',
    category: 'voiles',
    diagramPartId: 'svg-chute',
    relatedTerms: ['guindant', 'bordure', 'hale-bas', 'lattes'],
    tips: 'Une chute trop fermée (crochée) freine le bateau. Une chute trop ouverte perd de la puissance. Regarde les penons de chute pour vérifier.',
  },
  {
    id: 'bordure',
    term: 'Bordure',
    definition:
      "Bord inférieur de la voile, le côté qui se trouve en bas. Pour la grand-voile, la bordure est le côté fixé le long de la bôme. La tension de la bordure modifie le creux de la voile : en la tendant, on aplatit le bas de la voile ; en la relâchant, on augmente le creux, ce qui donne plus de puissance par vent faible.",
    shortDefinition: 'Bord inférieur de la voile.',
    category: 'voiles',
    diagramPartId: 'svg-bordure',
    relatedTerms: ['guindant', 'chute', 'point-d-ecoute', 'point-d-amure'],
    tips: 'Relâche la bordure par petit temps pour creuser la voile et gagner en puissance. Tends-la quand le vent monte pour aplatir.',
  },
  {
    id: 'lattes',
    term: 'Lattes',
    definition:
      "Tiges semi-rigides (en fibre de verre, carbone ou plastique) insérées dans des goussets horizontaux sur la voile, perpendiculairement à la chute. Les lattes maintiennent la forme de la voile, surtout dans la zone de rond de chute (la partie de la voile qui dépasse une ligne droite entre la tête et le point d'écoute). Sans lattes, la chute battrait au vent.",
    shortDefinition: 'Tiges rigides dans la voile qui maintiennent sa forme.',
    category: 'voiles',
    diagramPartId: 'svg-lattes',
    relatedTerms: ['chute', 'grand-voile'],
    tips: 'Vérifie régulièrement que les lattes sont bien en place et pas fendues. Des lattes abîmées déforment la voile et réduisent ses performances.',
  },
  {
    id: 'foil',
    term: 'Foil',
    aliases: ['Hydrofoil'],
    definition:
      "Appendice profilé comme une aile d'avion, fixé sous la coque ou sur les côtés du bateau, qui crée une force de portance hydrodynamique lorsque le bateau atteint une certaine vitesse. Cette portance soulève partiellement ou totalement la coque hors de l'eau, réduisant drastiquement la traînée et permettant des vitesses spectaculaires. Les foils ont révolutionné la voile de compétition : les IMOCA, les AC75 (America's Cup) et les Ultim volent littéralement au-dessus de l'eau. La navigation sur foils demande une technique de pilotage très précise.",
    shortDefinition: 'Hydrofoil profilé créant une portance pour soulever le bateau hors de l\'eau.',
    category: 'voiles',
    diagramPartId: 'svg-foil',
    relatedTerms: ['quille', 'appendices'],
  },
  {
    id: 'voile-de-quille',
    term: 'Voile de quille',
    definition:
      "Aileron fin et profilé de la quille, la partie verticale reliant la coque au bulbe de lest. La voile de quille joue un rôle hydrodynamique essentiel : son profil en forme d'aile d'avion crée une force anti-dérive lorsque le bateau remonte au vent. Plus la voile de quille est fine et allongée, moins elle crée de traînée mais plus elle est fragile. Sur les voiliers de course, la voile de quille est souvent en carbone. La forme et l'épaisseur du profil sont optimisées selon le programme du bateau.",
    shortDefinition: 'Aileron fin de quille reliant la coque au bulbe de lest.',
    category: 'voiles',
    diagramPartId: 'svg-voile-de-quille',
    relatedTerms: ['quille', 'bulbe', 'lest'],
  },
];
