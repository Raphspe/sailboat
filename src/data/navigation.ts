import type { LexiconEntry } from './types';

export const navigationEntries: LexiconEntry[] = [
  {
    id: 'compas',
    term: 'Compas',
    definition:
      "Instrument de navigation qui indique la direction du nord magnétique, permettant au barreur de maintenir un cap. Le compas de route est fixé devant la barre et contient une rose des vents flottant dans un liquide. Il existe aussi le compas de relèvement (portable, pour prendre des relèvements sur des amers). Attention : le compas indique le nord magnétique, pas le nord géographique — il faut corriger la déclinaison.",
    shortDefinition: 'Instrument indiquant le nord magnétique pour maintenir un cap.',
    category: 'navigation',
    diagramPartId: 'svg-compas',
    relatedTerms: ['cap', 'route', 'relevement'],
    tips: 'Éloigne les objets métalliques et les appareils électroniques du compas : ils faussent la lecture. Vérifie la déviation de ton compas régulièrement.',
  },
  {
    id: 'cap',
    term: 'Cap',
    diagramPartId: 'nav-cap',
    definition:
      "Direction dans laquelle pointe la proue du bateau, mesurée en degrés par rapport au nord (de 0° à 360°). Le cap est ce que le barreur maintient au compas. Il ne faut pas confondre le cap (direction du nez du bateau) avec la route (trajectoire réelle sur le fond), car le courant et la dérive peuvent créer un écart entre les deux.",
    shortDefinition: 'Direction de la proue en degrés par rapport au nord.',
    category: 'navigation',
    relatedTerms: ['compas', 'route', 'derive-navigation'],
    tips: 'Au compas, 0° (ou 360°) = nord, 90° = est, 180° = sud, 270° = ouest. En voile, on annonce le cap en trois chiffres : « cap deux-sept-zéro ».',
  },
  {
    id: 'route',
    term: 'Route',
    aliases: ['Route fond'],
    diagramPartId: 'nav-route',
    definition:
      "Trajectoire réelle du bateau par rapport au fond marin, tenant compte du courant et de la dérive. La route peut différer significativement du cap (direction où pointe le bateau) si le courant est fort ou si le bateau dérive latéralement sous l'effet du vent. Sur un GPS, la route fond est indiquée par « COG » (Course Over Ground).",
    shortDefinition: 'Trajectoire réelle du bateau par rapport au fond, cap + dérive + courant.',
    category: 'navigation',
    relatedTerms: ['cap', 'derive-navigation', 'courant', 'gps'],
  },
  {
    id: 'derive-navigation',
    term: 'Dérive',
    diagramPartId: 'nav-derive',
    definition:
      "En navigation, la dérive est l'écart entre le cap du bateau (où il pointe) et sa route réelle (où il va effectivement). Cette dérive est causée par le vent qui pousse le bateau latéralement et par le courant. Un voilier dérive toujours un peu sous le vent, surtout au près. La quille ou la dérive (l'aileron) limite cette dérive latérale.",
    shortDefinition: 'Écart entre le cap et la route réelle, causé par vent et courant.',
    category: 'navigation',
    relatedTerms: ['cap', 'route', 'courant', 'quille'],
    tips: 'Au près, un voilier dérive typiquement de 3° à 8°. Plus le bateau gîte, plus il dérive. Aplatir les voiles et réduire la gîte réduit la dérive.',
  },
  {
    id: 'courant',
    term: 'Courant',
    diagramPartId: 'nav-courant',
    definition:
      "Mouvement horizontal de l'eau, causé principalement par les marées (courant de marée), le vent (courant de surface) ou les différences de température. Le courant affecte la route du bateau : un courant favorable accélère, un courant contraire ralentit. Le courant de marée change de direction environ toutes les 6 heures. Les cartes de courant (atlas des courants) sont essentielles à la navigation.",
    shortDefinition: 'Mouvement de l\'eau qui affecte la trajectoire et la vitesse du bateau.',
    category: 'navigation',
    relatedTerms: ['maree', 'route', 'derive-navigation'],
    tips: 'Vérifie toujours les courants avant de partir. En Bretagne ou en Manche, les courants de marée peuvent atteindre 5-6 noeuds — plus que ta vitesse !',
  },
  {
    id: 'noeud-vitesse',
    term: 'Noeud',
    aliases: ['Knot', 'kn', 'kt'],
    diagramPartId: 'nav-route',
    definition:
      "Unité de vitesse en mer, équivalant à un mille nautique par heure (1,852 km/h). Le nom vient de l'ancienne méthode de mesure de la vitesse : on jetait une planche (le loch) à l'eau, reliée à une ligne à noeuds, et on comptait le nombre de noeuds filés en un temps donné. Un voilier de croisière navigue typiquement entre 4 et 8 noeuds.",
    shortDefinition: 'Unité de vitesse : 1 noeud = 1 mille nautique/heure = 1,852 km/h.',
    category: 'navigation',
    relatedTerms: ['mille-nautique', 'loch'],
    tips: 'Ne dis jamais « noeuds par heure » : un noeud EST déjà une vitesse (mille/heure). Dire « noeuds/heure » serait une accélération, pas une vitesse !',
  },
  {
    id: 'mille-nautique',
    term: 'Mille nautique',
    aliases: ['Nautique', 'NM'],
    diagramPartId: 'nav-route',
    definition:
      "Unité de distance en mer, équivalant à 1 852 mètres (1,852 km). Le mille nautique correspond à la longueur d'un arc d'une minute de latitude sur la surface terrestre. C'est pour cette raison qu'il est si pratique en navigation : sur une carte marine, une minute de latitude en bordure de carte = un mille nautique. Un degré de latitude = 60 milles nautiques.",
    shortDefinition: 'Unité de distance : 1 mille nautique = 1 852 m = 1 minute de latitude.',
    category: 'navigation',
    relatedTerms: ['noeud-vitesse', 'carte-marine'],
    tips: 'Pour mesurer une distance sur une carte marine, utilise l\'échelle de latitude (sur les bords verticaux) : 1 minute = 1 mille. N\'utilise jamais l\'échelle de longitude !',
  },
  {
    id: 'loch',
    term: 'Loch',
    definition:
      "Instrument mesurant la vitesse du bateau par rapport à l'eau (pas par rapport au fond). Le loch moderne est un petit capteur (hélice ou ultrason) fixé sous la coque qui mesure la vitesse de l'eau. La vitesse loch (STW — Speed Through Water) diffère de la vitesse fond (SOG — Speed Over Ground) à cause du courant. Le loch mesure aussi la distance parcourue (totalisateur).",
    shortDefinition: 'Instrument mesurant la vitesse du bateau par rapport à l\'eau.',
    category: 'navigation',
    diagramPartId: 'svg-loch',
    relatedTerms: ['noeud-vitesse', 'sondeur', 'gps'],
    tips: 'Pense à nettoyer régulièrement l\'hélice du loch : les algues et les coquillages faussent la mesure. Certains lochs se rétractent de l\'intérieur.',
  },
  {
    id: 'sondeur',
    term: 'Sondeur',
    definition:
      "Instrument mesurant la profondeur de l'eau sous le bateau à l'aide d'ultrasons. Le sondeur envoie une impulsion sonore vers le fond et mesure le temps de retour de l'écho. Il affiche la profondeur en mètres (ou en pieds/brasses). Le sondeur est un instrument de sécurité essentiel pour éviter les échouements, surtout en zone de marée où la profondeur varie.",
    shortDefinition: 'Instrument mesurant la profondeur de l\'eau sous le bateau.',
    category: 'navigation',
    diagramPartId: 'svg-sondeur',
    relatedTerms: ['loch', 'gps', 'carte-marine', 'maree'],
    tips: 'Règle l\'alarme de profondeur à ton tirant d\'eau + une marge de sécurité. Par exemple, si tu as 1,80 m de tirant d\'eau, alarme à 3 m.',
  },
  {
    id: 'gps',
    term: 'GPS',
    aliases: ['Géopositionnement par satellite'],
    diagramPartId: 'nav-cap',
    definition:
      "Système de positionnement par satellite qui donne la position du bateau (latitude, longitude) avec une précision de quelques mètres. Le GPS fournit aussi la vitesse fond (SOG), la route fond (COG), et la distance/temps jusqu'au prochain waypoint. C'est devenu l'instrument de navigation principal, mais il ne doit jamais remplacer complètement les compétences en navigation traditionnelle.",
    shortDefinition: 'Système satellite donnant la position, la vitesse et la route du bateau.',
    category: 'navigation',
    relatedTerms: ['waypoint', 'route', 'cap', 'carte-marine'],
    tips: 'Ne te repose jamais uniquement sur le GPS ! Les pannes arrivent. Sache utiliser un compas, une carte papier et prendre des relèvements. Le GPS est un outil, pas une béquille.',
  },
  {
    id: 'amers',
    term: 'Amers',
    diagramPartId: 'nav-amers',
    definition:
      "Points de repère fixes et identifiables à terre, visibles depuis la mer, utilisés pour se positionner ou se guider. Les amers peuvent être naturels (cap, falaise, sommet de montagne) ou artificiels (phare, clocher d'église, château d'eau, balise). En prenant des relèvements sur deux ou trois amers, on peut déterminer sa position sur la carte sans GPS.",
    shortDefinition: 'Points de repère visibles à terre pour se positionner en mer.',
    category: 'navigation',
    relatedTerms: ['relevement', 'gisement', 'compas'],
    tips: 'Identifie toujours les amers sur la carte avant de les chercher à l\'horizon. Un phare vu de loin peut être confondu avec un autre si tu n\'as pas préparé ta navigation.',
  },
  {
    id: 'relevement',
    term: 'Relèvement',
    diagramPartId: 'nav-relevement',
    definition:
      "Angle mesuré au compas entre le nord et la direction d'un amer (point de repère) vu depuis le bateau. Le relèvement se mesure en degrés (0° à 360°) avec un compas de relèvement. En croisant deux ou trois relèvements sur la carte, on obtient sa position (point de relèvements). C'est la méthode classique de positionnement avant le GPS.",
    shortDefinition: 'Angle au compas entre le nord et un point de repère.',
    category: 'navigation',
    relatedTerms: ['gisement', 'amers', 'compas'],
    tips: 'Pour un bon point, prends trois relèvements sur des amers bien répartis (environ 60° entre chaque). Si les trois droites se croisent en un point, c\'est bon. Si elles forment un triangle, tu es quelque part dedans.',
  },
  {
    id: 'gisement',
    term: 'Gisement',
    diagramPartId: 'nav-relevement',
    definition:
      "Angle mesuré entre l'axe du bateau (le cap) et la direction d'un objet. Contrairement au relèvement (mesuré par rapport au nord), le gisement est mesuré par rapport à l'avant du bateau. Un objet droit devant a un gisement de 0°, par le travers tribord 90°, par l'arrière 180°, par le travers bâbord 270° (ou -90°).",
    shortDefinition: 'Angle entre l\'axe du bateau et la direction d\'un objet.',
    category: 'navigation',
    relatedTerms: ['relevement', 'cap', 'amers'],
  },
  {
    id: 'waypoint',
    term: 'Waypoint',
    aliases: ['Point de route', 'WPT'],
    diagramPartId: 'nav-cap',
    definition:
      "Point géographique défini par ses coordonnées (latitude, longitude) et enregistré dans le GPS comme étape d'une route. Les waypoints jalonnent la route planifiée : on navigue de waypoint en waypoint. Le GPS indique en permanence la distance, le temps estimé et le cap à suivre pour atteindre le prochain waypoint.",
    shortDefinition: 'Point de passage défini par ses coordonnées GPS sur une route.',
    category: 'navigation',
    relatedTerms: ['gps', 'route', 'carte-marine'],
    tips: 'Place tes waypoints avec une marge de sécurité par rapport aux dangers (roches, hauts-fonds). Ne place jamais un waypoint pile sur une bouée — d\'autres bateaux font pareil et cela crée des embouteillages !',
  },
  {
    id: 'carte-marine',
    term: 'Carte marine',
    diagramPartId: 'nav-amers',
    definition:
      "Représentation à plat d'une zone maritime, indiquant les profondeurs (sondes), les dangers (roches, épaves), les courants, les balises, les amers, les zones interdites et les informations utiles à la navigation. La carte marine utilise la projection de Mercator. Elle existe en version papier et électronique (carte numérique sur traceur ou tablette). C'est l'outil fondamental de la navigation.",
    shortDefinition: 'Carte représentant les profondeurs, dangers et repères d\'une zone maritime.',
    category: 'navigation',
    relatedTerms: ['sondeur', 'amers', 'waypoint', 'mille-nautique'],
    tips: 'Garde toujours des cartes papier à bord en complément de l\'électronique. Vérifie que tes cartes sont à jour (corrections aux Avis aux Navigateurs). Une carte périmée peut être dangereuse.',
  },
  {
    id: 'maree',
    term: 'Marée',
    diagramPartId: 'nav-courant',
    definition:
      "Mouvement périodique de montée (flux ou flot) et de descente (reflux ou jusant) du niveau de la mer, causé par l'attraction gravitationnelle de la Lune et du Soleil. La marée crée aussi des courants horizontaux. En Atlantique, il y a environ deux pleines mers et deux basses mers par jour (marée semi-diurne). L'amplitude varie selon le coefficient de marée.",
    shortDefinition: 'Montée et descente périodique du niveau de la mer.',
    category: 'navigation',
    relatedTerms: ['coefficient-de-maree', 'courant', 'sondeur'],
    tips: 'Consulte toujours l\'annuaire des marées avant de naviguer. La « règle des douzièmes » permet d\'estimer la hauteur d\'eau à tout moment entre la basse et la pleine mer.',
  },
  {
    id: 'coefficient-de-maree',
    term: 'Coefficient de marée',
    diagramPartId: 'nav-courant',
    definition:
      "Nombre sans unité (de 20 à 120) qui indique l'amplitude de la marée par rapport à une marée moyenne. Un coefficient de 45 correspond à des mortes-eaux (faible amplitude), 70 à une marée moyenne, et 95 à 120 correspond aux vives-eaux (grande amplitude). Les plus forts coefficients (grandes marées) surviennent lors des équinoxes. Plus le coefficient est élevé, plus les courants sont forts.",
    shortDefinition: 'Indicateur de l\'amplitude de la marée, de 20 (faible) à 120 (forte).',
    category: 'navigation',
    relatedTerms: ['maree', 'courant'],
    tips: 'Par fort coefficient (> 90), les courants sont puissants et les zones d\'échouage se découvrent largement. Idéal pour la pêche à pied, mais attention au flot qui remonte vite !',
  },
  {
    id: 'jauge',
    term: 'Jauge',
    definition:
      "Ensemble de règles et de mesures définissant les caractéristiques techniques d'un voilier pour les compétitions. La jauge fixe des limites sur les dimensions (longueur, largeur, tirant d'eau), le poids, la surface de voilure et d'autres paramètres, afin de garantir l'équité entre les concurrents. Il existe des jauges monotypes (tous les bateaux identiques, comme le Laser ou le Figaro) et des jauges de handicap (IRC, ORC) qui permettent à des bateaux différents de courir ensemble avec des temps compensés.",
    shortDefinition: 'Règles définissant les caractéristiques d\'un voilier pour les compétitions.',
    category: 'navigation',
    diagramPartId: 'nav-route',
    relatedTerms: [],
  },
  {
    id: 'jusant',
    term: 'Jusant',
    definition:
      "Courant de marée descendante, c'est-à-dire le mouvement de l'eau vers le large lorsque la mer descend (reflux). Le jusant est l'opposé du flot (courant de marée montante). La vitesse du jusant dépend du coefficient de marée et de la géographie locale : dans les estuaires et les passes étroites, le jusant peut atteindre plusieurs noeuds. Connaître les heures de jusant est essentiel pour planifier ses navigations côtières, car naviguer contre le jusant ralentit considérablement le bateau.",
    shortDefinition: 'Courant de marée descendante, mouvement de l\'eau vers le large.',
    category: 'navigation',
    diagramPartId: 'nav-courant',
    relatedTerms: ['maree', 'courant', 'coefficient-de-maree'],
  },
  {
    id: 'roulis',
    term: 'Roulis',
    definition:
      "Mouvement de balancement latéral du bateau autour de son axe longitudinal (de la proue à la poupe), causé par la houle ou les vagues de travers. Le roulis est particulièrement ressenti au mouillage ou aux allures portantes quand la mer vient de côté. C'est le mouvement le plus désagréable en navigation car il provoque souvent le mal de mer. On réduit le roulis en ajustant l'allure, en envoyant plus de voiles pour stabiliser le bateau, ou en utilisant des stabilisateurs sur les grands voiliers.",
    shortDefinition: 'Mouvement latéral de balancement du bateau causé par la houle.',
    category: 'navigation',
    diagramPartId: 'nav-derive',
    relatedTerms: ['tangage', 'gite'],
  },
  {
    id: 'tangage',
    term: 'Tangage',
    definition:
      "Mouvement d'oscillation du bateau autour de son axe transversal, le faisant piquer du nez puis relever la proue alternativement. Le tangage est causé par les vagues venant de l'avant ou de l'arrière. Il est plus prononcé sur les bateaux légers et courts. Un tangage excessif freine le bateau en augmentant la résistance hydrodynamique et peut provoquer l'enfournement (la proue s'enfonce dans la vague suivante). On limite le tangage en ajustant sa vitesse et en répartissant les poids au centre du bateau.",
    shortDefinition: 'Mouvement d\'oscillation avant/arrière du bateau dans les vagues.',
    category: 'navigation',
    diagramPartId: 'nav-derive',
    relatedTerms: ['roulis', 'gite'],
  },
];
