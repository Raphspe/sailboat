import type { LexiconEntry } from './types';

export const reglageEntries: LexiconEntry[] = [
  {
    id: 'border',
    term: 'Border',
    diagramPartId: 'trim-bordee',
    definition:
      "Action de tirer sur l'écoute pour rapprocher la voile de l'axe du bateau. Quand on borde, la voile se rapproche du centre et prend un angle plus fermé par rapport au vent. On borde les voiles quand on remonte vers le vent (on lofe) ou quand le vent adonne (tourne favorablement). Border trop crée un décrochage aérodynamique et freine le bateau.",
    shortDefinition: 'Tirer l\'écoute pour rapprocher la voile de l\'axe du bateau.',
    category: 'reglage',
    relatedTerms: ['choquer', 'ecoute', 'lofer', 'faseyement'],
    tips: 'En cas de doute, choque d\'abord (laisse la voile s\'ouvrir), puis borde lentement jusqu\'à ce que la voile arrête de faseyer. C\'est le bon réglage !',
  },
  {
    id: 'choquer',
    term: 'Choquer',
    diagramPartId: 'trim-choquee',
    definition:
      "Action de relâcher progressivement l'écoute pour éloigner la voile de l'axe du bateau. Quand on choque, la voile s'ouvre et prend un angle plus large par rapport au vent. On choque les voiles quand on s'éloigne du vent (on abat) ou en cas de rafale pour réduire la puissance. Choquer rapidement la grand-voile est un geste de sécurité essentiel.",
    shortDefinition: 'Relâcher l\'écoute pour éloigner la voile de l\'axe du bateau.',
    category: 'reglage',
    relatedTerms: ['border', 'ecoute', 'abattre'],
    tips: 'En cas de rafale soudaine, le premier réflexe est de choquer la grand-voile. Cela réduit instantanément la gîte et la pression sur le bateau.',
  },
  {
    id: 'faseyement',
    term: 'Faseyement',
    aliases: ['Faseyer', 'Fasier'],
    diagramPartId: 'trim-faseyante',
    definition:
      "Battement de la voile quand elle n'est plus correctement orientée par rapport au vent. La voile faseye quand elle est trop choquée (pas assez bordée) par rapport à l'allure, ou quand le bateau est trop face au vent (dans le lit du vent). Le faseyement se manifeste par un flottement caractéristique du tissu le long du guindant. C'est un signal visuel essentiel pour le réglage.",
    shortDefinition: 'Battement de la voile quand elle n\'est pas correctement orientée.',
    category: 'reglage',
    relatedTerms: ['border', 'choquer', 'penon', 'lit-du-vent'],
    tips: 'Le faseyement n\'est pas toujours mauvais : c\'est un indicateur. Si la voile faseye légèrement le long du guindant, tu es juste au bon angle. Borde un tout petit peu pour l\'arrêter.',
  },
  {
    id: 'penon',
    term: 'Penon',
    aliases: ['Faveur'],
    diagramPartId: 'trim-optimale',
    definition:
      "Petit fil de laine, ruban ou bande de tissu léger fixé sur la voile, servant d'indicateur visuel de l'écoulement de l'air. Les penons sont placés de chaque côté de la voile (au vent et sous le vent). Quand les deux penons filent horizontalement et parallèlement, l'écoulement est correct et la voile est bien réglée. Des penons qui décrochent (montent ou descendent) indiquent un mauvais réglage.",
    shortDefinition: 'Petit fil sur la voile indiquant l\'écoulement du vent.',
    category: 'reglage',
    relatedTerms: ['faseyement', 'border', 'choquer', 'regler-le-genois'],
    tips: 'Les penons du génois sont tes meilleurs amis au près : si le penon au vent décroche, lofe ou borde. Si le penon sous le vent décroche, abats ou choque. Les deux filent = parfait !',
  },
  {
    id: 'creux',
    term: 'Creux',
    diagramPartId: 'trim-optimale',
    definition:
      "Profondeur du profil de la voile, c'est-à-dire la distance entre la ligne droite guindant-chute et le point le plus profond de la voile (comme une aile d'avion). Un creux important donne de la puissance (utile par vent faible ou allure portante). Un profil plat (peu de creux) réduit la puissance et la gîte (utile par vent fort ou au près). On parle aussi de la position du creux (avant, centre, arrière).",
    shortDefinition: 'Profondeur du profil de la voile, déterminant sa puissance.',
    category: 'reglage',
    relatedTerms: ['vrillage', 'cunningham', 'bordure', 'guindant'],
    tips: 'Par vent léger : creux prononcé (voile creuse). Par vent fort : creux réduit (voile plate). Utilise le cunningham, la bordure et le pataras pour contrôler le creux.',
  },
  {
    id: 'vrillage',
    term: 'Vrillage',
    aliases: ['Twist'],
    diagramPartId: 'trim-optimale',
    definition:
      "Différence d'angle entre le bas et le haut de la voile. Comme le vent est plus fort en altitude (gradient de vent), le haut de la voile reçoit un vent apparent plus débordé. Un vrillage correct permet à chaque section de la voile d'être correctement orientée. On contrôle le vrillage de la grand-voile avec le hale-bas et l'écoute, et celui du génois avec le chariot d'écoute.",
    shortDefinition: 'Différence d\'angle entre le bas et le haut de la voile.',
    category: 'reglage',
    relatedTerms: ['hale-bas', 'chariot-d-ecoute', 'creux', 'chute'],
    tips: 'Regarde les penons de chute de la grand-voile : si le penon du haut décroche en permanence, tu as trop de vrillage (chute trop ouverte). Tends le hale-bas pour corriger.',
  },
  {
    id: 'guindant-tendu',
    term: 'Guindant tendu / détendu',
    diagramPartId: 'trim-bordee',
    definition:
      "État de tension du bord d'attaque de la voile. Un guindant tendu (par le cunningham ou la drisse) aplatit la voile et avance le creux vers l'avant : c'est le réglage adapté au vent fort, qui réduit la puissance et permet de mieux pointer au vent. Un guindant détendu laisse le creux reculer et la voile se creuser : c'est le réglage pour le vent faible, qui maximise la puissance.",
    shortDefinition: 'Tension du bord d\'attaque : tendu aplatit, détendu creuse la voile.',
    category: 'reglage',
    relatedTerms: ['cunningham', 'drisse', 'guindant', 'creux'],
  },
  {
    id: 'chariot-d-ecoute',
    term: 'Chariot d\'écoute',
    aliases: ['Rail d\'écoute', 'Barber hauler'],
    definition:
      "Chariot coulissant sur un rail transversal (perpendiculaire à l'axe du bateau) qui modifie le point de tire de l'écoute de génois ou de grand-voile. En déplaçant le chariot au vent, on ferme la voile ; sous le vent, on l'ouvre. Pour la grand-voile, le rail est généralement devant la barre. Pour le génois, les rails sont sur les passavants. La position du chariot influence le vrillage.",
    shortDefinition: 'Chariot sur rail qui ajuste le point de tire de l\'écoute.',
    category: 'reglage',
    diagramPartId: 'svg-chariot-ecoute',
    relatedTerms: ['ecoute', 'vrillage', 'regler-le-genois', 'barber'],
    tips: 'Pour le génois au près : avance le chariot quand le vent monte (pour ouvrir la chute), recule-le par vent faible (pour creuser la voile). Le penon du haut te guide.',
  },
  {
    id: 'barber',
    term: 'Barber',
    aliases: ['Barber hauler'],
    diagramPartId: 'trim-optimale',
    definition:
      "Système de cordage additionnel qui permet de modifier le point de tire de l'écoute d'une voile vers l'extérieur ou vers l'intérieur du bateau, indépendamment du chariot d'écoute. Le barber est particulièrement utile pour le spinnaker et le gennaker, où il permet d'ajuster finement l'ouverture de la voile aux allures portantes. On parle de « barber intérieur » et « barber extérieur ».",
    shortDefinition: 'Cordage qui modifie le point de tire de l\'écoute latéralement.',
    category: 'reglage',
    relatedTerms: ['chariot-d-ecoute', 'ecoute', 'spinnaker', 'gennaker'],
  },
  {
    id: 'tangon',
    term: 'Tangon',
    definition:
      "Espar horizontal utilisé pour écarter une voile d'avant (spinnaker ou génois) du mât aux allures portantes. Le tangon est fixé au mât par une articulation et son extrémité externe porte le bras du spinnaker ou l'écoute du génois tangonné. Il permet de maintenir la voile ouverte quand le vent vient de l'arrière. Le réglage du tangon (hauteur, angle) est crucial pour la forme du spi.",
    shortDefinition: 'Espar horizontal pour écarter le spinnaker ou le génois au portant.',
    category: 'reglage',
    diagramPartId: 'svg-tangon',
    relatedTerms: ['spinnaker', 'bras-de-spinnaker', 'vent-arriere'],
    tips: 'La règle du tangon : il doit être perpendiculaire au vent apparent. Règle sa hauteur pour que les deux points d\'amure du spi (tangon et point d\'écoute) soient à la même hauteur.',
  },
  {
    id: 'regler-la-grand-voile',
    term: 'Régler la grand-voile',
    diagramPartId: 'trim-optimale',
    definition:
      "Ensemble des ajustements de la grand-voile pour optimiser ses performances selon les conditions. Les réglages principaux sont : l'écoute (angle par rapport au vent), le hale-bas (vrillage et tension de la chute), le cunningham (position du creux), la bordure (creux du bas), le chariot d'écoute (angle de tire), et le pataras (cintrage du mât). Un bon réglage combine tous ces paramètres.",
    shortDefinition: 'Optimiser la grand-voile en ajustant écoute, hale-bas, cunningham, etc.',
    category: 'reglage',
    relatedTerms: ['grand-voile', 'ecoute', 'hale-bas', 'cunningham', 'creux', 'vrillage'],
    tips: 'Séquence au près par vent montant : 1) borde l\'écoute, 2) tends le cunningham, 3) tends le hale-bas, 4) tends le pataras. Par vent faiblissant, fais l\'inverse.',
  },
  {
    id: 'regler-le-genois',
    term: 'Régler le génois',
    diagramPartId: 'trim-optimale',
    definition:
      "Ensemble des ajustements du génois (ou foc) pour optimiser ses performances. Les réglages principaux sont : l'écoute (ouverture/fermeture), la position du chariot d'écoute sur le rail (vers l'avant pour creuser, vers l'arrière pour aplatir), la drisse (tension du guindant), et éventuellement le barber. On utilise les penons comme indicateurs visuels pour trouver le bon réglage.",
    shortDefinition: 'Optimiser le génois en ajustant écoute, chariot et drisse.',
    category: 'reglage',
    relatedTerms: ['genois', 'ecoute', 'chariot-d-ecoute', 'penon', 'drisse'],
    tips: 'La règle d\'or du génois : les trois penons (haut, milieu, bas) doivent décrocher en même temps quand tu lofes doucement. Si le haut décroche avant, avance le chariot ; si le bas décroche avant, recule-le.',
  },
  {
    id: 'regle-d-or-du-reglage',
    term: 'La règle d\'or du réglage',
    diagramPartId: 'trim-optimale',
    definition:
      "Principe fondamental du réglage des voiles : « Choque jusqu'à ce que ça faseye, puis borde juste assez pour que ça arrête. » Autrement dit, on relâche progressivement l'écoute jusqu'à ce que le guindant de la voile commence à faseyer, puis on borde très légèrement pour retrouver un écoulement laminaire. Ce réglage donne l'angle optimal de la voile pour l'allure et le vent du moment.",
    shortDefinition: 'Choquer jusqu\'au faseyement, puis border juste assez — c\'est le bon angle.',
    category: 'reglage',
    relatedTerms: ['border', 'choquer', 'faseyement', 'penon'],
    tips: 'C\'est LA technique à retenir quand on débute. Applique-la systématiquement après chaque changement de cap ou de vent. Avec l\'expérience, tu le feras instinctivement.',
  },
  {
    id: 'point-d-ecoute',
    term: 'Point d\'écoute',
    definition:
      "Coin arrière bas de la voile, là où l'écoute est fixée. C'est le point de jonction entre la bordure (bord inférieur) et la chute (bord de fuite). Pour la grand-voile, le point d'écoute est à l'extrémité arrière de la bôme. Pour le génois, c'est le coin libre de la voile auquel est frappée (attachée) l'écoute de génois.",
    shortDefinition: 'Coin arrière bas de la voile, où se fixe l\'écoute.',
    category: 'reglage',
    diagramPartId: 'svg-point-ecoute',
    relatedTerms: ['ecoute', 'point-de-drisse', 'point-d-amure', 'bordure', 'chute'],
  },
  {
    id: 'point-de-drisse',
    term: 'Point de drisse',
    aliases: ['Têtière'],
    definition:
      "Coin supérieur de la voile, là où la drisse est fixée pour hisser la voile. C'est le point le plus haut de la voile. La têtière est la pièce renforcée (souvent une plaque métallique ou en plastique) cousue dans le tissu à cet endroit pour supporter la traction de la drisse. Le point de drisse est à la jonction du guindant et de la chute.",
    shortDefinition: 'Coin supérieur de la voile, où la drisse est fixée.',
    category: 'reglage',
    diagramPartId: 'svg-point-drisse',
    relatedTerms: ['drisse', 'guindant', 'chute', 'point-d-ecoute', 'point-d-amure'],
  },
  {
    id: 'point-d-amure',
    term: 'Point d\'amure',
    definition:
      "Coin avant bas de la voile, fixé au bateau. Pour la grand-voile, le point d'amure est au niveau du vit-de-mulet (jonction mât-bôme). Pour le foc ou génois, il est fixé à l'étrave ou au point d'accroche sur l'étai. C'est le point fixe de la voile, autour duquel elle pivote quand on borde ou choque l'écoute. Le cunningham agit juste au-dessus du point d'amure.",
    shortDefinition: 'Coin avant bas de la voile, point d\'attache fixe au bateau.',
    category: 'reglage',
    diagramPartId: 'svg-point-amure',
    relatedTerms: ['point-d-ecoute', 'point-de-drisse', 'guindant', 'bordure', 'cunningham'],
  },
  {
    id: 'ardent',
    term: 'Ardent',
    definition:
      "Tendance naturelle d'un voilier à remonter au vent (à lofer) lorsque le barreur relâche la barre. Un bateau ardent exige du barreur qu'il maintienne une pression constante sur la barre pour empêcher le bateau de remonter au vent. Cette tendance est généralement considérée comme souhaitable à un niveau modéré (barre légère), car elle procure une sensation de contrôle et constitue un mécanisme de sécurité naturel : en cas de lâcher de barre, le bateau se met face au vent et les voiles faseyent, ce qui arrête le bateau au lieu de l'accélérer.",
    shortDefinition: 'Tendance du bateau à remonter au vent naturellement.',
    category: 'reglage',
    diagramPartId: 'trim-bordee',
    relatedTerms: ['lofer', 'barre', 'mou'],
  },
  {
    id: 'mou',
    term: 'Mou',
    definition:
      "Tendance naturelle d'un voilier à s'éloigner du vent (à abattre) lorsque le barreur relâche la barre. Un bateau mou est l'inverse d'un bateau ardent : il cherche à abattre en permanence. Cette tendance est considérée comme indésirable car, en cas de lâcher de barre, le bateau s'éloigne du vent, les voiles se remplissent davantage, la gîte augmente et la situation peut devenir dangereuse. On corrige un bateau mou en reculant le centre de voilure (choquer le génois, border la grand-voile) ou en modifiant le réglage du safran.",
    shortDefinition: 'Tendance du bateau à s\'éloigner du vent naturellement.',
    category: 'reglage',
    diagramPartId: 'trim-choquee',
    relatedTerms: ['abattre', 'barre', 'ardent'],
  },
  {
    id: 'etarquer',
    term: 'Étarquer',
    definition:
      "Tendre un cordage ou une voile au maximum de sa tension. Étarquer une drisse, c'est la raidir complètement pour que la voile soit parfaitement tendue le long du mât ou de l'étai. Étarquer le cunningham aplatit le profil de la voile. On étarque les voiles par vent fort pour réduire leur creux et limiter la puissance. L'étarquage se fait généralement au winch, car les efforts sont importants. Un cordage bien étarqué ne présente aucun mou.",
    shortDefinition: 'Tendre un cordage ou une voile au maximum.',
    category: 'reglage',
    diagramPartId: 'trim-bordee',
    relatedTerms: ['drisse', 'cunningham', 'border'],
  },
  {
    id: 'rappel',
    term: 'Rappel',
    definition:
      "Action de placer le poids de son corps au vent (du côté d'où souffle le vent) pour contrebalancer la gîte du bateau. Sur les dériveurs, le rappel est une technique essentielle : l'équipier (et parfois le barreur) se penche à l'extérieur du bateau en accrochant ses pieds sous des sangles de rappel, le corps suspendu au-dessus de l'eau. Sur les voiliers de croisière, on parle plutôt de « se mettre au rappel » en se positionnant au vent dans le cockpit. Le trapèze est une forme extrême de rappel utilisée sur les dériveurs sportifs.",
    shortDefinition: 'Placer son poids au vent pour réduire la gîte du bateau.',
    category: 'reglage',
    diagramPartId: 'trim-optimale',
    relatedTerms: ['gite', 'quille'],
  },
  {
    id: 'rond-de-chute',
    term: 'Rond de chute',
    definition:
      "Partie arrondie de la chute (bord de fuite) de la grand-voile qui dépasse la ligne droite tirée entre la têtière (point de drisse) et le point d'écoute. Ce surplus de tissu augmente la surface de la voile et donc sa puissance. Le rond de chute est maintenu en forme par les lattes, insérées dans des goussets horizontaux. Sans lattes, le tissu du rond de chute faseyerait et battrait dans le vent. Plus les lattes sont longues et rigides, plus le rond de chute peut être prononcé.",
    shortDefinition: 'Partie arrondie de la chute de la grand-voile maintenue par les lattes.',
    category: 'reglage',
    diagramPartId: 'trim-optimale',
    relatedTerms: ['chute', 'lattes', 'grand-voile'],
  },
];
