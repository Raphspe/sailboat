import type { LexiconEntry } from './types';

export const manoeuvresEntries: LexiconEntry[] = [
  {
    id: 'ecoute',
    term: 'Écoute',
    definition:
      "Cordage servant à régler l'angle d'une voile par rapport au vent. L'écoute est fixée au point d'écoute de la voile (coin arrière bas) et passe par une poulie ou un chariot d'écoute avant d'arriver au winch dans le cockpit. On « borde » l'écoute pour rapprocher la voile de l'axe du bateau, on la « choque » pour l'éloigner. Chaque voile a son écoute : écoute de grand-voile, écoute de génois, etc.",
    shortDefinition: 'Cordage qui règle l\'angle de la voile par rapport au vent.',
    category: 'manoeuvres',
    diagramPartId: 'svg-ecoute',
    relatedTerms: ['border', 'choquer', 'winch', 'chariot-d-ecoute', 'point-d-ecoute'],
    tips: 'L\'écoute est le cordage que tu manipules le plus souvent. Garde-la toujours prête à être larguée rapidement en cas de coup de vent ou de survente.',
  },
  {
    id: 'drisse',
    term: 'Drisse',
    definition:
      "Cordage qui sert à hisser (monter) une voile le long du mât. La drisse part du sommet du mât, descend le long de celui-ci et rejoint le pont où elle est bloquée sur un taquet ou un winch. Chaque voile a sa propre drisse : drisse de grand-voile, drisse de génois, drisse de spinnaker. La tension de la drisse influence la forme de la voile.",
    shortDefinition: 'Cordage pour hisser une voile le long du mât.',
    category: 'manoeuvres',
    diagramPartId: 'svg-drisse',
    relatedTerms: ['hisser', 'affaler', 'mat', 'winch', 'grand-voile'],
    tips: 'Vérifie toujours que ta drisse n\'est pas emmêlée ou prise autour d\'un hauban avant de hisser. Regarde en l\'air !',
  },
  {
    id: 'hale-bas',
    term: 'Hale-bas',
    aliases: ['Vang'],
    definition:
      "Système (cordage, palan ou vérin) reliant la bôme au pied du mât et tirant la bôme vers le bas. Le hale-bas empêche la bôme de remonter, ce qui contrôle le vrillage de la grand-voile et la tension de la chute. En bordant le hale-bas, on ferme la chute et on aplatit le haut de la grand-voile. Il est particulièrement utile aux allures portantes.",
    shortDefinition: 'Dispositif qui tire la bôme vers le bas pour contrôler le vrillage de la GV.',
    category: 'manoeuvres',
    diagramPartId: 'svg-hale-bas',
    relatedTerms: ['bome', 'grand-voile', 'vrillage', 'chute'],
    tips: 'Pense à choquer le hale-bas avant d\'affaler la grand-voile, sinon la bôme reste bloquée en bas et empêche la voile de descendre.',
  },
  {
    id: 'cunningham',
    term: 'Cunningham',
    definition:
      "Cordage ou palan fixé sur le guindant de la grand-voile, juste au-dessus du point d'amure (coin avant bas). En exerçant une tension vers le bas sur le guindant, le cunningham avance le creux de la voile et aplatit son profil. C'est un réglage fin très utile quand le vent monte : il dépower (réduit la puissance de) la grand-voile sans prendre de ris.",
    shortDefinition: 'Cordage qui tend le guindant de la GV pour aplatir le profil.',
    category: 'manoeuvres',
    diagramPartId: 'svg-cunningham',
    relatedTerms: ['guindant', 'grand-voile', 'regler-la-grand-voile'],
    tips: 'Par vent léger, relâche le cunningham complètement. Quand le vent monte, tends-le progressivement pour avancer le creux et réduire la puissance.',
  },
  {
    id: 'pataras',
    term: 'Pataras',
    definition:
      "Câble ou tige reliant le sommet du mât à la poupe (arrière) du bateau. Le pataras maintient le mât en place vers l'arrière, en opposition à l'étai qui le tire vers l'avant. En réglant la tension du pataras, on modifie la courbure du mât et la tension de l'étai, ce qui influence la forme du génois. Un pataras tendu cintre le mât et aplatit la grand-voile.",
    shortDefinition: 'Câble du sommet du mât à la poupe, maintenant le mât vers l\'arrière.',
    category: 'manoeuvres',
    diagramPartId: 'svg-pataras',
    relatedTerms: ['mat', 'etai', 'hauban'],
    tips: 'Le pataras est un réglage fin puissant : en le tendant par vent fort, tu aplatis les voiles et réduis la gîte. Relâche-le par petit temps pour creuser les voiles.',
  },
  {
    id: 'hauban',
    term: 'Hauban',
    definition:
      "Câble métallique (ou tige en inox) latéral qui maintient le mât en place sur les côtés. Les haubans partent du haut (ou de différentes hauteurs) du mât et descendent jusqu'au bord du pont, fixés sur des cadènes. Ils empêchent le mât de tomber sur les côtés. Leur tension est réglée avec des ridoirs. Les haubans font partie du gréement dormant.",
    shortDefinition: 'Câble latéral qui maintient le mât sur les côtés.',
    category: 'manoeuvres',
    diagramPartId: 'svg-hauban',
    relatedTerms: ['mat', 'etai', 'pataras', 'galhauban'],
    tips: 'Vérifie régulièrement la tension des haubans et l\'état des goupilles et des ridoirs. Un hauban cassé peut entraîner la perte du mât.',
  },
  {
    id: 'etai',
    term: 'Étai',
    definition:
      "Câble métallique reliant le sommet du mât (ou un point élevé du mât) à la proue (avant) du bateau. L'étai maintient le mât vers l'avant et sert de support au foc ou au génois, qui coulissent ou s'enroulent dessus. Un étai bien tendu est essentiel pour la performance au près, car un étai mou crée un creux excessif dans le génois.",
    shortDefinition: 'Câble du mât à la proue, support des voiles d\'avant.',
    category: 'manoeuvres',
    diagramPartId: 'svg-etai',
    relatedTerms: ['mat', 'pataras', 'hauban', 'genois', 'foc'],
    tips: 'La tension de l\'étai se règle indirectement via le pataras. Plus le pataras est tendu, plus l\'étai est tendu, et plus le génois est plat.',
  },
  {
    id: 'galhauban',
    term: 'Galhauban',
    definition:
      "Hauban supplémentaire, souvent orienté plus vers l'arrière que les haubans principaux. Les galhaubans partent de hauteurs intermédiaires du mât et apportent un maintien supplémentaire, surtout vers l'arrière et latéralement. Ils sont courants sur les gréements fractionnés (où l'étai ne va pas en tête de mât) pour compenser les efforts.",
    shortDefinition: 'Hauban secondaire orienté vers l\'arrière pour renforcer le mât.',
    category: 'manoeuvres',
    diagramPartId: 'svg-galhauban',
    relatedTerms: ['hauban', 'mat', 'pataras'],
  },
  {
    id: 'balancine',
    term: 'Balancine',
    definition:
      "Cordage reliant l'extrémité de la bôme au sommet du mât. La balancine soutient la bôme quand la grand-voile est affalée, empêchant la bôme de tomber dans le cockpit. Quand la grand-voile est hissée, la balancine doit être relâchée car c'est la voile qui porte la bôme. Si la balancine reste tendue, elle déforme la chute de la grand-voile.",
    shortDefinition: 'Cordage du mât à la bôme qui soutient la bôme quand la GV est affalée.',
    category: 'manoeuvres',
    diagramPartId: 'svg-balancine',
    relatedTerms: ['bome', 'grand-voile', 'mat'],
    tips: 'N\'oublie pas de choquer la balancine après avoir hissé la grand-voile. Si la chute de ta GV a l\'air « crochée » en haut, c\'est souvent la balancine qui est trop tendue.',
  },
  {
    id: 'bras-de-spinnaker',
    term: 'Bras',
    aliases: ['Bras de spinnaker'],
    definition:
      "Cordage fixé au point d'amure du spinnaker, passant à travers l'extrémité du tangon et revenant au cockpit. Le bras contrôle le tangon et donc le bord au vent du spinnaker. Il travaille en opposition avec l'écoute de spinnaker (côté sous le vent). Quand on empanne avec le spi, bras et écoute échangent leurs rôles.",
    shortDefinition: 'Cordage qui contrôle le côté au vent du spinnaker via le tangon.',
    category: 'manoeuvres',
    diagramPartId: 'svg-bras',
    relatedTerms: ['spinnaker', 'tangon', 'ecoute', 'empannage'],
  },
  {
    id: 'bosse-de-ris',
    term: 'Bosse de ris',
    definition:
      "Cordage utilisé pour prendre un ris, c'est-à-dire réduire la surface de la grand-voile. La bosse de ris relie un point de la grand-voile (l'œillet de ris) à la bôme. En la tendant, on tire le bas de la voile vers la bôme, ce qui « plie » la partie inférieure de la grand-voile et réduit sa surface. Il y a généralement 2 ou 3 niveaux de ris.",
    shortDefinition: 'Cordage pour prendre un ris et réduire la surface de la grand-voile.',
    category: 'manoeuvres',
    diagramPartId: 'svg-bosse-de-ris',
    relatedTerms: ['prise-de-ris', 'grand-voile', 'bome'],
    tips: 'Prends un ris quand tu commences à y penser, pas quand le vent est déjà trop fort. « Ris tôt, ris bien » est un adage marin essentiel.',
  },
  {
    id: 'bout',
    term: 'Bout',
    diagramPartId: 'svg-bout',
    definition:
      "Terme générique pour désigner tout cordage à bord d'un voilier. En marine, on ne dit jamais « corde » (le seul cordage qui s'appelle « corde » est la corde de la cloche du bord). On dit « un bout » (prononcé « boute »). Chaque bout a un nom spécifique selon sa fonction : écoute, drisse, hale-bas, amarre, etc.",
    shortDefinition: 'Terme générique pour tout cordage à bord (ne jamais dire « corde »).',
    category: 'manoeuvres',
    relatedTerms: ['cordage', 'ecoute', 'drisse', 'amarre'],
    tips: 'On prononce « boute » (pas « bou »). Et surtout, ne dis jamais « corde » sur un bateau ! Ça porte malheur selon la tradition maritime.',
  },
  {
    id: 'cordage',
    term: 'Cordage',
    diagramPartId: 'svg-cordage',
    definition:
      "Assemblage de fibres tressées ou toronnées formant une ligne flexible et résistante. Les cordages modernes sont en fibres synthétiques (polyester, Dyneema, Spectra, Kevlar) qui offrent résistance, légèreté et faible élasticité. Chaque cordage à bord a une fonction précise et un nom : écoute, drisse, amarre, etc. Le diamètre et le matériau sont choisis en fonction des efforts.",
    shortDefinition: 'Ligne flexible tressée en fibres, base de tous les « bouts » du bord.',
    category: 'manoeuvres',
    relatedTerms: ['bout', 'ecoute', 'drisse', 'aussiere'],
  },
  {
    id: 'aussiere',
    term: 'Aussière',
    diagramPartId: 'svg-aussiere',
    definition:
      "Gros cordage utilisé pour l'amarrage ou le remorquage. L'aussière est plus grosse et plus résistante que les cordages courants. On l'utilise pour attacher le bateau au quai (amarres principales) ou pour le remorquage. Les aussières sont généralement en polyamide (nylon) pour leur élasticité, qui absorbe les chocs des vagues au mouillage.",
    shortDefinition: 'Gros cordage d\'amarrage ou de remorquage.',
    category: 'manoeuvres',
    relatedTerms: ['amarre', 'cordage', 'bout'],
  },
  {
    id: 'amarre',
    term: 'Amarre',
    diagramPartId: 'svg-amarre',
    definition:
      "Cordage servant à attacher le bateau au quai, à une bouée ou à un autre bateau. Les amarres principales sont : l'amarre de proue (avant), l'amarre de poupe (arrière), les gardes montantes et descendantes (amarres en diagonale qui empêchent le bateau d'avancer ou de reculer), et les traversières. On dit « larguer les amarres » pour quitter le quai.",
    shortDefinition: 'Cordage qui attache le bateau au quai ou à une bouée.',
    category: 'manoeuvres',
    relatedTerms: ['aussiere', 'bout', 'taquet', 'larguer-les-amarres'],
    tips: 'Prévois toujours des pare-battages et des amarres prêtes avant d\'arriver au port. Fais des nœuds de taquet corrects pour pouvoir larguer facilement.',
  },
  {
    id: 'manille',
    term: 'Manille',
    definition:
      "Pièce d'accastillage en forme de U ou de D avec un axe (une tige filetée) qui ferme le U. La manille sert à relier deux éléments entre eux : un cordage à une voile, une chaîne d'ancre à l'ancre, un hauban à une cadène, etc. Il existe des manilles droites (en forme de D) et des manilles lyre (en forme de U arrondi) selon l'usage.",
    shortDefinition: 'Pièce en U avec axe pour relier cordages, voiles et accastillage.',
    category: 'manoeuvres',
    diagramPartId: 'svg-manille',
    relatedTerms: ['mousqueton', 'poulie'],
    tips: 'Vérifie régulièrement le serrage des manilles et scotche les axes avec du fil de fer ou du frein-filet pour éviter qu\'ils ne se dévissent en mer.',
  },
  {
    id: 'poulie',
    term: 'Poulie',
    definition:
      "Pièce d'accastillage composée d'un réa (roue) tournant sur un axe, dans laquelle passe un cordage. La poulie réduit les frottements et peut modifier la direction de la traction. Les poulies de renvoi dirigent les cordages vers le cockpit. Les palans (assemblages de plusieurs poulies) démultiplient la force. Il existe des poulies simples, doubles, à billes, à violon, etc.",
    shortDefinition: 'Roue dans un boîtier qui guide un cordage et réduit les frottements.',
    category: 'manoeuvres',
    diagramPartId: 'svg-poulie',
    relatedTerms: ['ecoute', 'drisse', 'winch'],
  },
  {
    id: 'mousqueton',
    term: 'Mousqueton',
    diagramPartId: 'svg-mousqueton',
    definition:
      "Pièce d'accastillage à ouverture rapide, en forme de crochet avec un système de fermeture automatique (ressort ou doigt basculant). Le mousqueton permet de connecter et déconnecter rapidement un cordage ou une voile. On en trouve sur les drisses, les écoutes de spinnaker, et les longes de harnais de sécurité. Les mousquetons de sécurité ont un verrouillage supplémentaire.",
    shortDefinition: 'Crochet à ouverture rapide pour connecter cordages et voiles.',
    category: 'manoeuvres',
    relatedTerms: ['manille', 'drisse', 'ecoute'],
    tips: 'Utilise toujours des mousquetons à verrouillage (double sécurité) pour les longes de harnais. Un mousqueton simple peut s\'ouvrir accidentellement.',
  },
  {
    id: 'corde',
    term: 'Corde',
    definition:
      "Terme absolument INTERDIT sur un bateau ! En marine, on ne dit jamais « corde » : on utilise bout, cordage, écoute, drisse, amarre, aussière, etc. Chaque cordage à bord a un nom précis selon sa fonction. La seule exception historique est la corde de la cloche du bord. Cette règle est une tradition maritime très ancienne et tout marin qui dit « corde » sur un voilier se fera immédiatement corriger par l'équipage. C'est l'une des premières choses que l'on apprend en voile.",
    shortDefinition: 'Terme INTERDIT sur un bateau — on dit bout, cordage, écoute, etc.',
    category: 'manoeuvres',
    diagramPartId: 'svg-corde',
    relatedTerms: ['cordage', 'bout', 'ecoute'],
    tips: 'Ne dis JAMAIS corde sur un voilier ! Seule exception : la corde de la cloche.',
  },
  {
    id: 'bastaque',
    term: 'Bastaque',
    definition:
      "Hauban mobile utilisé principalement sur les gréements fractionnés (où l'étai ne va pas en tête de mât). La bastaque part d'un point intermédiaire ou du sommet du mât et descend vers l'arrière du bateau, côté au vent. Contrairement aux haubans fixes, la bastaque doit être reprise à chaque virement de bord : on tend celle du côté au vent et on relâche celle du côté sous le vent pour laisser passer la grand-voile. Les bastaques remplacent le pataras sur certains gréements et assurent la tension de l'étai.",
    shortDefinition: 'Hauban mobile arrière utilisé sur les gréements fractionnés.',
    category: 'manoeuvres',
    diagramPartId: 'svg-bastaque',
    relatedTerms: ['hauban', 'galhauban', 'pataras'],
  },
];
