import type { LexiconEntry } from './types';

export const anatomieEntries: LexiconEntry[] = [
  {
    id: 'coque',
    term: 'Coque',
    definition:
      "Structure principale du bateau, le « corps » du voilier qui flotte sur l'eau. La coque assure l'étanchéité et la flottabilité. Elle peut être en fibre de verre (polyester), en aluminium, en acier ou en bois. Sa forme (longueur, largeur, carène) détermine le comportement du bateau : stabilité, vitesse, confort.",
    shortDefinition: 'Le corps du bateau, la structure qui flotte.',
    category: 'anatomie',
    diagramPartId: 'svg-coque',
    relatedTerms: ['proue', 'poupe', 'quille', 'ligne-de-flottaison', 'franc-bord'],
  },
  {
    id: 'proue',
    term: 'Proue',
    aliases: ['Étrave'],
    definition:
      "Partie avant du bateau, celle qui fend l'eau. L'étrave est plus spécifiquement l'arête avant de la coque, la ligne verticale ou inclinée qui sépare les deux flancs à l'avant. Une étrave droite (verticale) est courante sur les voiliers modernes pour allonger la ligne de flottaison. L'étrave inversée est une tendance récente pour améliorer les performances au portant.",
    shortDefinition: 'Avant du bateau, la partie qui fend l\'eau.',
    category: 'anatomie',
    diagramPartId: 'svg-proue',
    relatedTerms: ['poupe', 'coque'],
    tips: 'On dit « de la proue à la poupe » pour désigner tout le bateau, comme « de la tête aux pieds ».',
  },
  {
    id: 'poupe',
    term: 'Poupe',
    definition:
      "Partie arrière du bateau. La poupe porte souvent le nom du navire et le port d'attache. Sur un voilier moderne, la poupe peut être ouverte (tableau arrière escamotable) pour faciliter la baignade et l'accès à l'annexe. C'est aussi à la poupe que se trouvent généralement le gouvernail et la barre.",
    shortDefinition: 'Arrière du bateau.',
    category: 'anatomie',
    diagramPartId: 'svg-poupe',
    relatedTerms: ['proue', 'tableau-arriere', 'safran', 'barre'],
  },
  {
    id: 'tribord',
    term: 'Tribord',
    diagramPartId: 'svg-tribord',
    definition:
      "Côté droit du bateau quand on regarde vers l'avant (vers la proue). En navigation maritime, on utilise toujours tribord et bâbord plutôt que droite et gauche, car ces termes sont absolus par rapport au bateau et ne dépendent pas de l'orientation de la personne. Le feu de signalisation tribord est vert.",
    shortDefinition: 'Côté droit du bateau (en regardant vers l\'avant).',
    category: 'anatomie',
    relatedTerms: ['babord', 'amure-tribord'],
    tips: 'Moyen mnémotechnique : « bâbord » a deux syllabes, comme « gauche » a deux syllabes (ba-bord / gau-che). Ou encore : « Il ne reste plus de vin à tribord » (il n\'y a pas de « ba » dans tribord, donc tribord n\'est pas bâbord).',
  },
  {
    id: 'babord',
    term: 'Bâbord',
    diagramPartId: 'svg-babord',
    definition:
      "Côté gauche du bateau quand on regarde vers l'avant (vers la proue). Le feu de signalisation de bâbord est rouge. En termes de priorité, un bateau qui reçoit le vent par bâbord (amure bâbord) doit laisser la priorité à un bateau amure tribord.",
    shortDefinition: 'Côté gauche du bateau (en regardant vers l\'avant).',
    category: 'anatomie',
    relatedTerms: ['tribord', 'amure-babord'],
    tips: 'Le feu rouge est à bâbord (gauche), le feu vert à tribord (droite). Comme pour les feux de circulation, le rouge = attention.',
  },
  {
    id: 'mat',
    term: 'Mât',
    definition:
      "Espar vertical (ou légèrement incliné vers l'arrière) qui porte les voiles. Le mât est l'élément le plus haut du voilier. Il est maintenu en place par les haubans (câbles latéraux), l'étai (câble avant) et le pataras (câble arrière). Sur un sloop (gréement le plus courant), il n'y a qu'un seul mât. Le mât peut être en aluminium ou en carbone.",
    shortDefinition: 'Espar vertical qui porte les voiles.',
    category: 'anatomie',
    diagramPartId: 'svg-mat',
    relatedTerms: ['bome', 'hauban', 'etai', 'pataras', 'drisse'],
    tips: 'Avant de passer sous un pont, vérifie toujours la hauteur du mât ! C\'est la dimension la plus critique.',
  },
  {
    id: 'bome',
    term: 'Bôme',
    aliases: ['Gui'],
    definition:
      "Espar horizontal fixé au mât par une articulation (le vit-de-mulet), sur lequel est fixée la bordure de la grand-voile. La bôme permet de régler l'angle de la grand-voile par rapport au vent grâce à l'écoute de grand-voile. Attention : lors d'un empannage, la bôme peut passer violemment d'un côté à l'autre, ce qui est dangereux.",
    shortDefinition: 'Espar horizontal au bas de la grand-voile, fixé au mât.',
    category: 'anatomie',
    diagramPartId: 'svg-bome',
    relatedTerms: ['mat', 'grand-voile', 'hale-bas', 'ecoute', 'empannage'],
    tips: 'La bôme est dangereuse ! Lors d\'un empannage, elle peut frapper violemment. Baisse toujours la tête quand elle passe et préviens l\'équipage (« Envoyez ! »).',
  },
  {
    id: 'quille',
    term: 'Quille',
    definition:
      "Aileron lesté fixé sous la coque, essentiel à la stabilité et à la navigation du voilier. La quille a deux fonctions : son poids (lest, souvent en plomb ou fonte) empêche le bateau de chavirer en créant un contrepoids à la force du vent dans les voiles, et sa forme hydrodynamique s'oppose à la dérive latérale, permettant au bateau de remonter au vent.",
    shortDefinition: 'Aileron lesté sous la coque pour la stabilité et l\'anti-dérive.',
    category: 'anatomie',
    diagramPartId: 'svg-quille',
    relatedTerms: ['coque', 'safran', 'puits-de-derive', 'derive'],
    tips: 'La profondeur de la quille détermine le tirant d\'eau du bateau (combien il « enfonce »). Vérifie toujours le sondeur en zone peu profonde !',
  },
  {
    id: 'safran',
    term: 'Safran',
    definition:
      "Partie immergée du gouvernail, c'est-à-dire la « pale » qui dévie l'eau pour faire tourner le bateau. Le safran est relié à la barre par la mèche de safran (axe vertical). Quand on tourne la barre, le safran pivote et dévie le flux d'eau, ce qui fait tourner la poupe et donc le bateau. Sans safran, le voilier n'est plus dirigeable.",
    shortDefinition: 'Pale immergée du gouvernail qui fait tourner le bateau.',
    category: 'anatomie',
    diagramPartId: 'svg-safran',
    relatedTerms: ['barre', 'poupe'],
    tips: 'Un safran ne fonctionne que si le bateau avance ! Sans vitesse, tu n\'as pas de contrôle directionnel. C\'est pour ça qu\'au port on utilise le moteur.',
  },
  {
    id: 'barre',
    term: 'Barre',
    aliases: ['Barre franche', 'Barre à roue'],
    definition:
      "Dispositif de pilotage qui permet au barreur de contrôler la direction du bateau en actionnant le safran. Il existe deux types : la barre franche (un long manche directement relié au safran — on pousse à gauche pour aller à droite) et la barre à roue (un volant relié au safran par des câbles ou un système hydraulique — on tourne dans la direction souhaitée, comme en voiture).",
    shortDefinition: 'Commande de direction : barre franche (manche) ou à roue (volant).',
    category: 'anatomie',
    diagramPartId: 'svg-barre',
    relatedTerms: ['safran', 'cockpit', 'tenir-la-barre'],
    tips: 'Barre franche : pousse du côté opposé à celui où tu veux aller. Barre à roue : tourne comme un volant de voiture. Ne tiens pas la barre trop serrée : laisse le bateau « vivre ».',
  },
  {
    id: 'cockpit',
    term: 'Cockpit',
    definition:
      "Espace ouvert en creux à l'arrière du pont, d'où l'on pilote le voilier. Le cockpit abrite la barre, les winchs d'écoute, les instruments de navigation et les assises de l'équipage. C'est le poste de commandement du bateau. Il est généralement auto-videur : des dalots (trous) dans le plancher évacuent l'eau de mer qui pourrait y entrer.",
    shortDefinition: 'Espace de pilotage en creux à l\'arrière du bateau.',
    category: 'anatomie',
    diagramPartId: 'svg-cockpit',
    relatedTerms: ['barre', 'winch', 'pont', 'roof'],
  },
  {
    id: 'roof',
    term: 'Roof',
    aliases: ['Rouf'],
    definition:
      "Partie surélevée du pont qui forme le toit de la cabine en contrebas. Le roof permet d'avoir une hauteur suffisante à l'intérieur du bateau pour se tenir debout. Il porte souvent des hublots et parfois des panneaux solaires. Les passavants (passages latéraux entre le roof et le bord du bateau) permettent de circuler de l'avant à l'arrière.",
    shortDefinition: 'Partie surélevée du pont, toit de la cabine.',
    category: 'anatomie',
    diagramPartId: 'svg-roof',
    relatedTerms: ['pont', 'cockpit'],
  },
  {
    id: 'pont',
    term: 'Pont',
    definition:
      "Surface horizontale supérieure du bateau, sur laquelle on marche. Le pont sépare l'extérieur (le dessus) de l'intérieur (la cabine). Il est généralement antidérapant pour la sécurité. On y trouve les taquets, les winchs, les chaumards, les mains courantes et tout l'accastillage nécessaire à la manœuvre des voiles.",
    shortDefinition: 'Surface supérieure du bateau sur laquelle on circule.',
    category: 'anatomie',
    diagramPartId: 'svg-pont',
    relatedTerms: ['cockpit', 'roof', 'bastingage'],
  },
  {
    id: 'bastingage',
    term: 'Bastingage',
    definition:
      "Rebord ou barrière qui entoure le pont du bateau pour empêcher les personnes et les objets de tomber à l'eau. Sur les voiliers modernes, le bastingage est constitué de chandeliers (poteaux verticaux) et de filières (câbles ou tubes horizontaux) qui font le tour du bateau. La hauteur réglementaire est d'au moins 60 cm.",
    shortDefinition: 'Barrière de sécurité autour du pont du bateau.',
    category: 'anatomie',
    diagramPartId: 'svg-bastingage',
    relatedTerms: ['chandelier', 'filiere', 'pont'],
  },
  {
    id: 'chandelier',
    term: 'Chandelier',
    definition:
      "Poteau vertical en inox fixé sur le bord du pont, qui soutient les filières (les câbles ou tubes horizontaux du bastingage). Les chandeliers forment, avec les filières, la rambarde de sécurité du voilier. Ils doivent être vérifiés régulièrement car ils sont soumis à la corrosion et aux chocs.",
    shortDefinition: 'Poteau vertical du bastingage, soutenant les filières.',
    category: 'anatomie',
    diagramPartId: 'svg-chandelier',
    relatedTerms: ['filiere', 'bastingage'],
  },
  {
    id: 'filiere',
    term: 'Filière',
    definition:
      "Câble ou tube horizontal tendu entre les chandeliers, formant la partie horizontale du bastingage. Les filières empêchent de passer par-dessus bord. Il y a généralement deux filières : une haute et une basse. Par gros temps, on peut ajouter des filets de sécurité entre les filières, surtout quand on navigue avec des enfants.",
    shortDefinition: 'Câble horizontal entre les chandeliers, partie du bastingage.',
    category: 'anatomie',
    diagramPartId: 'svg-filiere',
    relatedTerms: ['chandelier', 'bastingage'],
  },
  {
    id: 'winch',
    term: 'Winch',
    definition:
      "Treuil cylindrique fixé sur le pont ou dans le cockpit, utilisé pour exercer une traction mécanique sur les cordages (écoutes, drisses). Le winch démultiplie la force : on y enroule le cordage dans le sens des aiguilles d'une montre et on le tourne avec une manivelle. Les winchs modernes sont souvent « self-tailing » (auto-coinceurs) et parfois électriques.",
    shortDefinition: 'Treuil qui démultiplie la force pour tirer les cordages.',
    category: 'anatomie',
    diagramPartId: 'svg-winch',
    relatedTerms: ['ecoute', 'drisse', 'taquet'],
    tips: 'Enroule toujours le cordage dans le sens des aiguilles d\'une montre sur le winch. Attention aux doigts ! Ne mets jamais tes doigts entre le cordage et le winch.',
  },
  {
    id: 'taquet',
    term: 'Taquet',
    definition:
      "Pièce d'accastillage fixée sur le pont, servant à bloquer ou à fixer un cordage. Il existe différents types : le taquet coinceur (qui bloque le cordage dans une mâchoire), le taquet à corne (forme de T sur lequel on fait un nœud de taquet) et le taquet clamcleat (en V, qui coince le cordage par friction). Les taquets sont essentiels pour maintenir les réglages.",
    shortDefinition: 'Pièce qui bloque ou fixe un cordage sur le pont.',
    category: 'anatomie',
    diagramPartId: 'svg-taquet',
    relatedTerms: ['winch', 'ecoute', 'drisse'],
    tips: 'Un nœud de taquet se fait en faisant un tour complet puis un demi-tour en huit. Ne fais jamais de nœud « mort » sur un taquet : tu dois pouvoir larguer rapidement.',
  },
  {
    id: 'puits-de-derive',
    term: 'Puits de dérive',
    definition:
      "Logement dans la coque, au centre du bateau, dans lequel la dérive (aileron mobile) se rétracte. On trouve des puits de dérive principalement sur les dériveurs (petits voiliers), les catamarans de sport et certains voiliers de croisière à faible tirant d'eau. La dérive peut être remontée pour naviguer en eau peu profonde ou pour mettre le bateau au sec.",
    shortDefinition: 'Logement dans la coque pour la dérive rétractable.',
    category: 'anatomie',
    diagramPartId: 'svg-puits-de-derive',
    relatedTerms: ['quille', 'derive'],
  },
  {
    id: 'tableau-arriere',
    term: 'Tableau arrière',
    definition:
      "Surface plate ou légèrement courbe à l'extrême arrière du bateau, constituant la « face » arrière de la poupe. Le tableau arrière porte souvent le nom du bateau et son port d'attache. Sur les voiliers modernes, il peut être ouvrable (escamotable) pour former une plateforme de bain. C'est aussi là que se fixe souvent l'échelle de bain et le support de moteur hors-bord sur les petits voiliers.",
    shortDefinition: 'Face arrière plate du bateau, portant souvent son nom.',
    category: 'anatomie',
    diagramPartId: 'svg-tableau-arriere',
    relatedTerms: ['poupe', 'coque'],
  },
  {
    id: 'ligne-de-flottaison',
    term: 'Ligne de flottaison',
    definition:
      "Ligne imaginaire (souvent marquée par un changement de peinture) qui sépare la partie immergée de la coque (les œuvres vives, peintes avec de l'antifouling) de la partie émergée (les œuvres mortes). La position de la ligne de flottaison indique si le bateau est correctement chargé : trop de poids et elle s'enfonce, bateau trop léger et elle remonte.",
    shortDefinition: 'Limite entre la partie immergée et émergée de la coque.',
    category: 'anatomie',
    diagramPartId: 'svg-ligne-de-flottaison',
    relatedTerms: ['coque', 'franc-bord'],
  },
  {
    id: 'franc-bord',
    term: 'Franc-bord',
    diagramPartId: 'svg-franc-bord',
    definition:
      "Distance verticale entre la ligne de flottaison et le bord supérieur du pont (le plat-bord). Le franc-bord indique combien de « marge » le bateau a avant que l'eau n'atteigne le pont. Un franc-bord élevé offre plus de sécurité par mer formée mais rend le bateau plus sensible au vent. Un franc-bord bas rapproche l'équipage de l'eau.",
    shortDefinition: 'Hauteur entre la ligne de flottaison et le bord du pont.',
    category: 'anatomie',
    relatedTerms: ['ligne-de-flottaison', 'coque', 'pont'],
  },
  {
    id: 'appendices',
    term: 'Appendices',
    definition:
      "Éléments immergés du bateau qui dépassent de la coque sous la ligne de flottaison : quille, safran, dérive, etc. Les appendices jouent un rôle essentiel dans le comportement du voilier : la quille assure la stabilité et s'oppose à la dérive, le safran permet de diriger le bateau, et la dérive (sur les dériveurs) remplit une fonction anti-dérive rétractable. La forme et le profil hydrodynamique des appendices influencent directement la vitesse et les performances du voilier. Des appendices bien entretenus (sans algues ni coquillages) réduisent la traînée.",
    shortDefinition: 'Éléments immergés du bateau (quille, safran, dérive) dépassant sous la coque.',
    category: 'anatomie',
    diagramPartId: 'svg-appendices',
    relatedTerms: ['quille', 'safran', 'puits-de-derive'],
  },
  {
    id: 'balcon',
    term: 'Balcon',
    definition:
      "Rambarde métallique en inox située à l'avant (balcon avant) et à l'arrière (balcon arrière) du bateau. Le balcon avant protège l'équipier qui travaille à la proue (mouillage, envoi de voiles d'avant). Le balcon arrière sécurise l'accès à la jupe et à l'échelle de bain. Les balcons sont plus robustes que les filières et chandeliers des côtés, car ils encaissent les chocs directs. Ils servent aussi de points d'accroche pour les feux de navigation et les bouées.",
    shortDefinition: 'Rambarde métallique à l\'avant et l\'arrière du bateau.',
    category: 'anatomie',
    diagramPartId: 'svg-balcon',
    relatedTerms: ['bastingage', 'chandelier', 'filiere'],
  },
  {
    id: 'bouchain',
    term: 'Bouchain',
    definition:
      "Angle formé entre le fond et les côtés (flancs) de la coque. Le bouchain peut être vif (angle marqué, comme sur les coques à bouchains) ou arrondi (transition douce, comme sur la plupart des voiliers modernes). Un bouchain vif offre plus de stabilité initiale et un volume intérieur optimisé, tandis qu'un bouchain arrondi favorise les performances hydrodynamiques et le confort. La forme du bouchain influence le comportement du bateau à la gîte et sa résistance à l'avancement.",
    shortDefinition: 'Angle entre le fond et les côtés de la coque.',
    category: 'anatomie',
    diagramPartId: 'svg-bouchain',
    relatedTerms: ['coque', 'carene'],
  },
  {
    id: 'bulbe',
    term: 'Bulbe',
    definition:
      "Lest en forme de torpille ou d'ogive fixé à l'extrémité inférieure de la quille. Le bulbe concentre le maximum de poids le plus bas possible sous le bateau, ce qui abaisse le centre de gravité et augmente considérablement le couple de redressement. Grâce au bulbe, la quille peut être plus fine et plus courte tout en offrant une stabilité équivalente, ce qui réduit la traînée hydrodynamique. Les bulbes modernes sont en plomb ou en fonte, profilés pour minimiser la résistance dans l'eau.",
    shortDefinition: 'Lest en forme de torpille au bas de la quille pour maximiser la stabilité.',
    category: 'anatomie',
    diagramPartId: 'svg-bulbe',
    relatedTerms: ['quille', 'lest'],
  },
  {
    id: 'cadene',
    term: 'Cadène',
    definition:
      "Pièce métallique robuste fixée sur la coque ou le pont du bateau, servant de point d'attache pour les haubans et les galhaubans. La cadène transfère les efforts considérables du gréement dormant (tension des câbles qui maintiennent le mât) vers la structure du bateau. Elle est souvent en acier inoxydable et boulonnée à travers la coque avec une contre-plaque de renfort. Les cadènes doivent être inspectées régulièrement car une cadène défaillante peut entraîner le démâtage.",
    shortDefinition: 'Pièce métallique fixée sur le pont pour attacher les haubans.',
    category: 'anatomie',
    diagramPartId: 'svg-cadene',
    relatedTerms: ['hauban', 'galhauban'],
  },
  {
    id: 'carene',
    term: 'Carène',
    definition:
      "Partie immergée de la coque, c'est-à-dire tout ce qui se trouve sous la ligne de flottaison. La carène est aussi appelée « œuvres vives » et elle est recouverte d'antifouling (peinture anti-algues). La forme de la carène détermine les performances hydrodynamiques du bateau : largeur, profondeur, finesse d'entrée d'eau à l'étrave. Un carénage régulier (nettoyage et peinture de la carène) est nécessaire pour maintenir les performances du voilier.",
    shortDefinition: 'Partie immergée de la coque, sous la ligne de flottaison.',
    category: 'anatomie',
    diagramPartId: 'svg-carene',
    relatedTerms: ['coque', 'ligne-de-flottaison', 'quille'],
  },
  {
    id: 'etrave',
    term: 'Étrave',
    definition:
      "Bord avant de la coque, l'arête verticale ou inclinée qui fend l'eau lorsque le bateau avance. L'étrave est la partie la plus en avant du bateau et détermine la façon dont la coque pénètre dans les vagues. Une étrave droite (verticale) allonge la ligne de flottaison et améliore les performances, tandis qu'une étrave élancée (inclinée vers l'avant) aide à passer les vagues. L'étrave inversée (inclinée vers l'arrière en haut) est une tendance moderne qui optimise le passage dans le clapot.",
    shortDefinition: 'Bord avant de la coque qui fend l\'eau.',
    category: 'anatomie',
    diagramPartId: 'svg-etrave',
    relatedTerms: ['proue', 'coque'],
  },
  {
    id: 'lest',
    term: 'Lest',
    definition:
      "Poids (généralement en plomb ou en fonte) placé dans la quille ou au fond du bateau pour assurer sa stabilité. Le lest abaisse le centre de gravité du voilier, ce qui crée un couple de redressement s'opposant à la gîte causée par le vent dans les voiles. Sans lest, un voilier à quille chavirait facilement. Le rapport lest/déplacement est un indicateur clé : plus il est élevé (35-50%), plus le bateau est stable et capable de se redresser après une forte gîte.",
    shortDefinition: 'Poids (plomb, fonte) assurant la stabilité du bateau.',
    category: 'anatomie',
    diagramPartId: 'svg-lest',
    relatedTerms: ['quille', 'bulbe'],
  },
  {
    id: 'rouf',
    term: 'Rouf',
    definition:
      "Partie surélevée du pont formant le toit de la cabine en contrebas. Le rouf (aussi écrit « roof ») permet d'avoir une hauteur sous barrots suffisante à l'intérieur pour se tenir debout. Il porte généralement des hublots pour l'éclairage naturel et la ventilation, et parfois des panneaux solaires. Les passavants, couloirs latéraux entre le rouf et le bord du pont, permettent de circuler de l'avant à l'arrière du bateau en toute sécurité.",
    shortDefinition: 'Partie surélevée du pont formant le toit de la cabine.',
    category: 'anatomie',
    diagramPartId: 'svg-rouf',
    relatedTerms: ['roof', 'pont', 'cockpit'],
  },
  {
    id: 'vit-de-mulet',
    term: 'Vit-de-mulet',
    definition:
      "Pièce d'articulation mécanique qui fixe la bôme au mât, permettant à la bôme de pivoter horizontalement (pour border ou choquer la grand-voile) et verticalement (pour monter ou descendre). Le vit-de-mulet est un point de charge important qui doit être robuste et bien entretenu. Il est situé à la base du mât, à la hauteur du point d'amure de la grand-voile. Sans vit-de-mulet fonctionnel, la bôme ne peut pas bouger librement et la grand-voile n'est plus réglable.",
    shortDefinition: 'Pièce d\'articulation fixant la bôme au mât.',
    category: 'anatomie',
    diagramPartId: 'svg-vit-de-mulet',
    relatedTerms: ['bome', 'mat', 'grand-voile'],
  },
  {
    id: 'ligne-de-vie',
    term: 'Ligne de vie',
    definition:
      "Sangles ou câbles tendus sur le pont, de l'avant à l'arrière du bateau, auxquels l'équipage s'attache avec un harnais et une longe de sécurité. Les lignes de vie permettent de se déplacer sur le pont en restant attaché au bateau, notamment par mauvais temps ou de nuit. Elles sont généralement en sangle textile plate (pour pouvoir marcher dessus sans rouler) et fixées à l'avant et à l'arrière du pont. Les lignes de vie font partie de l'équipement de sécurité obligatoire en navigation hauturière.",
    shortDefinition: 'Sangles sur le pont pour s\'attacher avec un harnais de sécurité.',
    category: 'anatomie',
    diagramPartId: 'svg-ligne-de-vie',
    relatedTerms: ['pont', 'filiere', 'chandelier'],
  },
  {
    id: 'sous-barbe',
    term: 'Sous-barbe',
    definition:
      "Câble ou chaîne situé sous le bout-dehors, reliant son extrémité à la proue ou à l'étrave du bateau. La sous-barbe contrebalance la tension vers le haut exercée par l'étai (ou l'étai de gennaker) sur le bout-dehors, empêchant celui-ci de se relever. Sans sous-barbe, la traction des voiles d'avant ferait plier le bout-dehors vers le haut et risquerait de le casser. C'est un élément de gréement dormant souvent négligé mais essentiel pour la solidité de l'ensemble.",
    shortDefinition: 'Câble sous le bout-dehors contrebalançant la tension de l\'étai.',
    category: 'anatomie',
    diagramPartId: 'svg-sous-barbe',
    relatedTerms: ['etai', 'bout-dehors'],
  },
  {
    id: 'bout-dehors',
    term: 'Bout-dehors',
    definition:
      "Espar fixe ou rétractable prolongeant la proue du bateau vers l'avant. Le bout-dehors sert principalement de point d'amure pour les voiles d'avant légères (gennaker, Code 0) et permet d'augmenter la surface de voilure sans modifier le gréement principal. Sur les voiliers de course modernes, le bout-dehors est souvent en carbone et rétractable. Sur les voiliers traditionnels, il peut être en bois et porter un bout-dehors de foc. La sous-barbe maintient le bout-dehors en position.",
    shortDefinition: 'Espar à la proue pour gréer des voiles d\'avant supplémentaires.',
    category: 'anatomie',
    diagramPartId: 'svg-bout-dehors',
    relatedTerms: ['proue', 'spinnaker', 'gennaker'],
  },
  {
    id: 'espar',
    term: 'Espar',
    definition:
      "Nom générique désignant toute pièce rigide allongée (tube, perche, poutre) servant à la structure du gréement ou au maintien des voiles. Les espars principaux d'un voilier sont le mât, la bôme, le tangon, le bout-dehors et éventuellement la corne. Les espars modernes sont en aluminium ou en carbone, tandis que les voiliers traditionnels utilisent le bois. La résistance et la légèreté des espars sont essentielles aux performances du voilier.",
    shortDefinition: 'Nom générique pour mât, bôme, tangon et toute pièce rigide du gréement.',
    category: 'anatomie',
    diagramPartId: 'svg-espar',
    relatedTerms: ['mat', 'bome', 'tangon'],
  },
  {
    id: 'guindeau',
    term: 'Guindeau',
    definition:
      "Treuil mécanique ou électrique installé à l'avant du bateau (sur la plage avant), servant à remonter la chaîne et l'ancre lors du relevage du mouillage. Le guindeau peut être à axe vertical (barbotin sur le pont) ou horizontal (barbotin sur le côté). Il est alimenté électriquement par les batteries du bord et commandé depuis la plage avant ou depuis le cockpit. Sur les petits voiliers, le guindeau est souvent manuel, tandis que sur les bateaux de croisière, il est électrique pour le confort de l'équipage.",
    shortDefinition: 'Treuil à l\'avant pour remonter la chaîne d\'ancre.',
    category: 'anatomie',
    diagramPartId: 'svg-guindeau',
    relatedTerms: ['mouillage', 'proue'],
  },
];
