import type { LexiconEntry } from './types';

export const expressionsEntries: LexiconEntry[] = [
  {
    id: 'sous-le-vent',
    term: 'Sous le vent',
    diagramPartId: 'expr-sous-le-vent',
    definition:
      "Désigne le côté du bateau ou de l'objet qui est protégé du vent, le côté opposé à celui d'où souffle le vent. Sur un voilier en navigation, le côté sous le vent est celui vers lequel les voiles sont gonflées. « Passe sous le vent » signifie passer derrière un obstacle (île, cap) pour se mettre à l'abri. En termes de priorité, un bateau sous le vent est prioritaire sur un bateau au vent.",
    shortDefinition: 'Côté abrité du vent, où vont les voiles.',
    category: 'expressions',
    relatedTerms: ['au-vent', 'tribord', 'babord'],
  },
  {
    id: 'au-vent',
    term: 'Au vent',
    diagramPartId: 'expr-au-vent',
    definition:
      "Désigne le côté du bateau ou de l'objet qui est exposé au vent, d'où le vent arrive. Sur un voilier qui gîte, le côté au vent est le côté surélevé. « Rappeler au vent » signifie déplacer son poids du côté d'où vient le vent pour réduire la gîte. Le côté au vent est aussi appelé « le dessus ». Les manoeuvres d'écoute se font souvent depuis le côté au vent.",
    shortDefinition: 'Côté exposé, d\'où vient le vent.',
    category: 'expressions',
    relatedTerms: ['sous-le-vent'],
  },
  {
    id: 'vent-debout',
    term: 'Vent debout',
    aliases: ['Bout au vent'],
    diagramPartId: 'expr-vent-debout',
    definition:
      "Expression désignant la situation où le bateau fait face directement au vent. Le vent souffle droit sur la proue. Dans cette position, les voiles faseyent (battent au vent) et le bateau ne peut pas avancer à la voile. « Se mettre vent debout » est une manoeuvre volontaire pour hisser ou affaler les voiles, ou pour mouiller. Se retrouver vent debout involontairement signifie que l'on est entré dans le lit du vent.",
    shortDefinition: 'Face au vent, position où le voilier ne peut pas avancer.',
    category: 'expressions',
    relatedTerms: ['lit-du-vent', 'abattre', 'faseyement'],
    tips: 'Se mettre vent debout est utile pour hisser ou affaler la grand-voile en sécurité, car la voile ne prend pas le vent et reste contrôlable.',
  },
  {
    id: 'vent-de-travers',
    term: 'Vent de travers',
    diagramPartId: 'expr-vent-de-travers',
    definition:
      "Expression courante pour décrire un vent qui arrive perpendiculairement au bateau. Dans le langage courant, « un vent de travers » désigne aussi au figuré un événement inattendu qui déstabilise. En navigation, c'est simplement l'allure du travers (vent à 90° du bateau), une allure de transition confortable.",
    shortDefinition: 'Vent arrivant perpendiculairement au bateau.',
    category: 'expressions',
    relatedTerms: ['travers', 'sous-le-vent', 'au-vent'],
  },
  {
    id: 'toutes-voiles-dehors',
    term: 'Toutes voiles dehors',
    diagramPartId: 'expr-toutes-voiles-dehors',
    definition:
      "Expression signifiant que toutes les voiles du bateau sont déployées : grand-voile complète (sans ris), génois ou foc, et éventuellement spinnaker ou gennaker. C'est la configuration de voilure maximale, utilisée par vent léger à modéré. Au figuré, l'expression signifie « à fond, avec toute son énergie, sans rien retenir ». Exemple : « Il est parti toutes voiles dehors dans ce nouveau projet. »",
    shortDefinition: 'Toutes les voiles déployées ; au figuré : à fond, avec toute son énergie.',
    category: 'expressions',
    relatedTerms: ['grand-voile', 'genois', 'spinnaker'],
  },
  {
    id: 'larguer-les-amarres',
    term: 'Larguer les amarres',
    diagramPartId: 'expr-larguer-les-amarres',
    definition:
      "Au sens propre, détacher et lâcher les cordages (amarres) qui retiennent le bateau au quai ou à la bouée. C'est le geste qui marque le départ, le début de la navigation. Au figuré, « larguer les amarres » signifie partir, quitter un lieu ou une situation, prendre un nouveau départ. C'est l'une des expressions maritimes les plus utilisées dans la langue courante.",
    shortDefinition: 'Détacher les amarres pour partir ; au figuré : prendre le large.',
    category: 'expressions',
    relatedTerms: ['amarre', 'appareillage'],
  },
  {
    id: 'vent-en-poupe',
    term: 'Avoir le vent en poupe',
    diagramPartId: 'expr-vent-en-poupe',
    definition:
      "Au sens propre, naviguer vent arrière avec le vent qui souffle depuis la poupe (l'arrière), poussant le bateau en avant. C'est l'allure la plus favorable pour avancer sans effort. Au figuré, cette expression très courante signifie que tout va bien, que les circonstances sont favorables, que l'on est porté par le succès. « Depuis sa promotion, il a le vent en poupe. »",
    shortDefinition: 'Vent favorable de l\'arrière ; au figuré : avoir le succès avec soi.',
    category: 'expressions',
    relatedTerms: ['vent-arriere', 'poupe'],
  },
  {
    id: 'dans-le-lit-du-vent',
    term: 'Être dans le lit du vent',
    diagramPartId: 'expr-dans-le-lit-du-vent',
    definition:
      "Pointer la proue trop près de la direction d'où vient le vent, dans la zone interdite (environ 30-45° de chaque côté). Les voiles faseyent, le bateau perd sa vitesse et ne peut plus avancer. C'est une erreur courante chez les débutants. La solution est d'abattre franchement (tourner pour s'éloigner du vent) afin de reprendre de la vitesse, puis revenir progressivement au cap souhaité.",
    shortDefinition: 'Être face au vent dans la zone interdite, voiles qui battent.',
    category: 'expressions',
    relatedTerms: ['lit-du-vent', 'vent-debout', 'abattre', 'faseyement'],
    tips: 'Si tu es coincé dans le lit du vent, ne panique pas. Abats franchement d\'un côté, laisse le bateau reprendre de la vitesse, puis lofe progressivement vers ton cap.',
  },
  {
    id: 'naviguer-a-vue',
    term: 'Naviguer à vue',
    diagramPartId: 'expr-naviguer-a-vue',
    definition:
      "Naviguer sans instruments électroniques, en se repérant uniquement par l'observation directe : reconnaissance des côtes, identification des amers (clochers, phares, caps), lecture du ciel et des nuages, observation du vent sur l'eau. C'est l'art ancestral de la navigation, remplacé en grande partie par le GPS mais toujours essentiel comme compétence de secours. Au figuré : agir au jour le jour, sans plan précis.",
    shortDefinition: 'Naviguer en observant, sans instruments ; au figuré : improviser.',
    category: 'expressions',
    relatedTerms: ['amers', 'compas', 'relevement'],
    tips: 'Entraîne-toi à naviguer à vue régulièrement : éteins le GPS et utilise la carte, le compas et les amers. Le jour où l\'électronique tombe en panne, tu seras prêt.',
  },
  {
    id: 'tenir-la-barre',
    term: 'Tenir la barre',
    aliases: ['Barrer'],
    diagramPartId: 'expr-tenir-la-barre',
    definition:
      "Être à la barre, diriger le bateau. Le barreur est responsable du cap, de la route et de la sécurité de l'équipage. Tenir la barre demande de la concentration et de la sensibilité : sentir le bateau, anticiper les vagues et les rafales. Au figuré, « tenir la barre » signifie être aux commandes, diriger une entreprise, un projet ou une situation. « Il tient fermement la barre malgré les difficultés. »",
    shortDefinition: 'Diriger le bateau ; au figuré : être aux commandes.',
    category: 'expressions',
    relatedTerms: ['barre', 'safran', 'cap'],
  },
  {
    id: 'virer-de-bord-figure',
    term: 'Virer de bord (figuré)',
    diagramPartId: 'expr-virer-de-bord-figure',
    definition:
      "Au sens propre, changer d'amure en passant face au vent (le virement de bord). Au figuré, cette expression signifie changer radicalement de direction, de stratégie, d'opinion ou de mode de vie. « Après 20 ans dans la finance, il a viré de bord et est devenu pêcheur. » L'expression sous-entend un changement complet et décisif, pas un simple ajustement.",
    shortDefinition: 'Changer d\'amure ; au figuré : changer radicalement de direction ou d\'avis.',
    category: 'expressions',
    relatedTerms: ['virement-de-bord'],
  },
  {
    id: 'en-facheux',
    term: 'Être en fâcheux',
    diagramPartId: 'expr-en-facheux',
    definition:
      "Expression maritime ancienne signifiant être en position difficile, dans une situation délicate ou dangereuse à bord. Un bateau « en fâcheux » peut être en danger de chavirer, au mouillage dans un endroit mal protégé, ou en panne de vent dans un chenal avec du courant. L'expression est restée dans le langage courant pour désigner une situation embarrassante ou compliquée.",
    shortDefinition: 'Être dans une situation délicate ou dangereuse en mer.',
    category: 'expressions',
  },
  {
    id: 'coup-de-tabac',
    term: 'Coup de tabac',
    diagramPartId: 'expr-coup-de-tabac',
    definition:
      "Tempête soudaine et violente en mer, arrivant rapidement et sans beaucoup de préavis. Le ciel s'assombrit, le baromètre chute, le vent forcit brutalement et la mer se creuse. L'origine de l'expression est incertaine : peut-être liée à la couleur jaune-brun du ciel avant l'orage, rappelant le tabac, ou au choc ressenti comme un « coup ». Un coup de tabac peut durer quelques heures ou quelques jours.",
    shortDefinition: 'Tempête soudaine et violente en mer.',
    category: 'expressions',
    relatedTerms: ['grain', 'prise-de-ris', 'cape'],
    tips: 'Surveille le baromètre : une chute rapide (plus de 2 hPa en 3 heures) annonce un coup de vent. Prends un ris et prépare-toi avant que ça arrive.',
  },
  {
    id: 'grain',
    term: 'Grain',
    diagramPartId: 'expr-grain',
    definition:
      "Perturbation météorologique brève mais intense, caractérisée par une forte rafale de vent, souvent accompagnée de pluie ou de grêle. Un grain arrive typiquement sous un nuage sombre et menaçant (cumulonimbus), visible à l'horizon. Il peut augmenter le vent de 15-20 noeuds en quelques minutes. La conduite à tenir : prendre un ris ou affaler les voiles, fermer le bateau, et se préparer à choquer les écoutes.",
    shortDefinition: 'Perturbation météo brève mais intense : vent fort et pluie soudaine.',
    category: 'expressions',
    relatedTerms: ['coup-de-tabac', 'prise-de-ris', 'choquer'],
    tips: 'Signe avant-coureur : une barre sombre à l\'horizon, une mer qui se hérisse localement, du vent qui tombe soudainement (calme avant le grain). Agis dès que tu le vois !',
  },
  {
    id: 'pot-au-noir',
    term: 'Pot-au-noir',
    aliases: ['Zone de convergence intertropicale', 'ZCIT'],
    diagramPartId: 'expr-pot-au-noir',
    definition:
      "Zone équatoriale située entre les alizés de l'hémisphère nord et ceux de l'hémisphère sud, caractérisée par des calmes plats alternant avec des grains violents et des orages. Le pot-au-noir est la hantise des navigateurs au long cours : on peut y rester bloqué pendant des jours sans vent, puis subir des grains de 40 noeuds. Tous les skippers du Vendée Globe, de la Transat et de la Route du Rhum doivent le traverser.",
    shortDefinition: 'Zone équatoriale de calmes imprévisibles et grains violents.',
    category: 'expressions',
    relatedTerms: ['grain'],
    tips: 'Les routeurs météo modernes permettent de choisir la meilleure « porte » pour traverser le pot-au-noir. Les courses au large planifient ce passage avec soin.',
  },
  {
    id: 'gite',
    term: 'Gîte',
    definition:
      "Inclinaison latérale du bateau sous l'effet de la pression du vent dans les voiles. La gîte est un phénomène normal en navigation à la voile : le vent pousse les voiles et fait pencher le bateau sous le vent. Le poids de la quille (le lest) s'oppose à cette force et maintient l'équilibre. Une gîte modérée (15-20°) est confortable et performante. Au-delà de 30°, le bateau perd en performance et la navigation devient inconfortable. Pour réduire la gîte, on choque les voiles, on prend un ris ou on rappelle au vent.",
    shortDefinition: 'Inclinaison latérale du bateau sous l\'effet du vent.',
    category: 'expressions',
    diagramPartId: 'expr-gite',
    relatedTerms: ['rappel', 'quille', 'choquer'],
    tips: 'Une gîte de 15-20° est normale. Au-delà de 30°, choque la grand-voile !',
  },
  {
    id: 'corne',
    term: 'Corne',
    definition:
      "Espar oblique fixé au mât, servant à soutenir le bord supérieur (la têtière) de certaines voiles dites « à corne » ou « auriques ». La corne est caractéristique des gréements traditionnels : goélettes, cotres, dundees. La voile à corne (ou voile aurique) est de forme trapézoïdale, plus large en haut grâce à la corne qui prolonge la voile au-delà du mât. Ce type de gréement offre une grande surface de voilure et un aspect esthétique classique très apprécié des amateurs de voiliers traditionnels.",
    shortDefinition: 'Espar oblique sur le mât pour le gréement de voiles auriques.',
    category: 'expressions',
    diagramPartId: 'expr-toutes-voiles-dehors',
    relatedTerms: ['espar', 'bome'],
  },
];
