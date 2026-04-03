import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import SailboatPart from './SailboatPart'
import DiagramTooltip from './DiagramTooltip'
import { useDiagramState } from '../../hooks/useDiagramState'

interface PartInfo {
  id: string
  label: string
  shortDef: string
  definition: string
  tooltipPos: { x: number; y: number }
}

const PARTS: PartInfo[] = [
  {
    id: 'svg-grand-voile',
    label: 'Grand-voile',
    shortDef: 'Voile principale fixée au mât et à la bôme',
    definition:
      'La grand-voile est la voile principale du voilier, attachée au mât par son guindant et à la bôme par sa bordure. Elle est contrôlée par l\'écoute de grand-voile et constitue le moteur principal du bateau.',
    tooltipPos: { x: 55, y: 30 },
  },
  {
    id: 'svg-genois',
    label: 'Génois / Foc',
    shortDef: 'Voile d\'avant triangulaire',
    definition:
      'Le génois (ou foc) est la voile d\'avant, triangulaire, fixée à l\'étai. Le génois est plus grand et se superpose au mât, le foc est plus petit. Il est contrôlé par les écoutes de foc, une de chaque bord.',
    tooltipPos: { x: 30, y: 32 },
  },
  {
    id: 'svg-spinnaker',
    label: 'Spinnaker',
    shortDef: 'Grande voile ballon symétrique pour le vent arrière',
    definition:
      'Le spinnaker est une grande voile légère en forme de ballon, utilisée aux allures portantes (vent arrière, grand largue). Il est symétrique, fixé au tangon et contrôlé par un bras et une écoute. Sa surface peut dépasser celle de la grand-voile et du génois combinés.',
    tooltipPos: { x: 15, y: 22 },
  },
  {
    id: 'svg-gennaker',
    label: 'Gennaker',
    shortDef: 'Voile asymétrique entre génois et spinnaker',
    definition:
      'Le gennaker est une voile asymétrique, à mi-chemin entre le génois et le spinnaker. Il est fixé par un point d\'amure sur l\'étrave (sans tangon) et offre un bon compromis puissance/facilité de manœuvre au largue et au reaching.',
    tooltipPos: { x: 20, y: 28 },
  },
  {
    id: 'svg-mat',
    label: 'Mât',
    shortDef: 'Espar vertical portant les voiles',
    definition:
      'Le mât est l\'espar vertical central du voilier qui soutient les voiles. Il est maintenu en place par les haubans (latéraux) et l\'étai (avant). Sa hauteur détermine la surface de voilure possible.',
    tooltipPos: { x: 48, y: 10 },
  },
  {
    id: 'svg-bome',
    label: 'Bôme',
    shortDef: 'Espar horizontal au bas de la grand-voile',
    definition:
      'La bôme est l\'espar horizontal articulé au pied du mât qui maintient la bordure (bas) de la grand-voile. Attention à la tête lors des empannages ! Elle est contrôlée par le hale-bas et l\'écoute de grand-voile.',
    tooltipPos: { x: 58, y: 58 },
  },
  {
    id: 'svg-coque',
    label: 'Coque',
    shortDef: 'Corps principal du bateau',
    definition:
      'La coque est la structure flottante du voilier, sa forme détermine les performances. On distingue la proue (avant), la poupe (arrière), tribord (droite) et bâbord (gauche).',
    tooltipPos: { x: 50, y: 72 },
  },
  {
    id: 'svg-proue',
    label: 'Proue / Étrave',
    shortDef: 'Partie avant de la coque',
    definition:
      'La proue est l\'avant du bateau, l\'étrave étant la pièce structurelle formant le tranchant avant de la coque. Elle fend l\'eau et sa forme influence vitesse et comportement dans les vagues. C\'est le point de fixation de l\'étai et du guindant du génois.',
    tooltipPos: { x: 22, y: 62 },
  },
  {
    id: 'svg-poupe',
    label: 'Poupe',
    shortDef: 'Partie arrière de la coque',
    definition:
      'La poupe désigne l\'arrière du bateau. On y trouve le cockpit, la barre, le tableau arrière et le safran. Sa forme (voûtée, en cul-de-poule, tableau) influence la stabilité de route et le comportement au surf.',
    tooltipPos: { x: 70, y: 65 },
  },
  {
    id: 'svg-quille',
    label: 'Quille',
    shortDef: 'Lest sous la coque pour la stabilité',
    definition:
      'La quille est un aileron lesté sous la coque qui empêche le bateau de chavirer (stabilité) et de dériver latéralement. Son poids (en plomb ou fonte) maintient le bateau droit même sous forte gîte.',
    tooltipPos: { x: 50, y: 88 },
  },
  {
    id: 'svg-safran',
    label: 'Safran',
    shortDef: 'Plan mobile qui dirige le bateau',
    definition:
      'Le safran est le plan vertical immergé à l\'arrière du bateau, articulé sur l\'axe de mèche. C\'est lui qui, actionné par la barre, oriente le flux d\'eau pour diriger le voilier.',
    tooltipPos: { x: 68, y: 78 },
  },
  {
    id: 'svg-barre',
    label: 'Barre',
    shortDef: 'Le gouvernail du voilier',
    definition:
      'La barre (franche ou à roue) est la commande du safran. Barre franche : un levier direct. Barre à roue : un volant avec câbles ou biellettes. On pousse la barre côté opposé au virage souhaité (barre franche).',
    tooltipPos: { x: 70, y: 68 },
  },
  {
    id: 'svg-etai',
    label: 'Étai',
    shortDef: 'Câble avant maintenant le mât',
    definition:
      'L\'étai est le câble d\'acier reliant le sommet du mât à la proue du bateau. Il maintient le mât vers l\'avant et sert de support au génois ou au foc qui y est fixé par des mousquetons.',
    tooltipPos: { x: 22, y: 18 },
  },
  {
    id: 'svg-haubans',
    label: 'Haubans',
    shortDef: 'Câbles latéraux maintenant le mât',
    definition:
      'Les haubans sont les câbles d\'acier latéraux qui maintiennent le mât en place. Fixés en tête de mât et aux cadènes sur le pont, ils empêchent le mât de tomber sur les côtés. Leur tension se règle aux ridoirs.',
    tooltipPos: { x: 70, y: 35 },
  },
  {
    id: 'svg-ecoute-gv',
    label: 'Écoute de GV',
    shortDef: 'Cordage réglant l\'angle de la grand-voile',
    definition:
      'L\'écoute de grand-voile est le cordage qui contrôle l\'angle de la grand-voile par rapport à l\'axe du bateau. Border = tirer l\'écoute, choquer = relâcher. C\'est le réglage le plus fréquent.',
    tooltipPos: { x: 64, y: 63 },
  },
  {
    id: 'svg-cockpit',
    label: 'Cockpit',
    shortDef: 'Espace de manœuvre en poupe',
    definition:
      'Le cockpit est l\'espace ouvert à l\'arrière du bateau où se trouvent la barre, les winchs et les écoutes. C\'est le poste de pilotage d\'où l\'équipage manœuvre le voilier.',
    tooltipPos: { x: 68, y: 65 },
  },
  {
    id: 'svg-hale-bas',
    label: 'Hale-bas',
    shortDef: 'Retenue de bôme empêchant celle-ci de monter',
    definition:
      'Le hale-bas (ou vang) est un cordage ou vérin reliant la bôme au pied du mât. Il empêche la bôme de se lever, contrôle le vrillage de la grand-voile et maintient la tension de la chute au portant.',
    tooltipPos: { x: 47, y: 60 },
  },
  {
    id: 'svg-drisse-gv',
    label: 'Drisse de GV',
    shortDef: 'Cordage hissant la grand-voile',
    definition:
      'La drisse de grand-voile est le cordage qui court le long du mât et sert à hisser la grand-voile. Elle est frappée en tête de voile, passe par une poulie en tête de mât, et revient au cockpit ou au pied du mât.',
    tooltipPos: { x: 52, y: 15 },
  },
  {
    id: 'svg-balancine',
    label: 'Balancine',
    shortDef: 'Câble soutenant l\'extrémité de la bôme',
    definition:
      'La balancine est un câble fin reliant la tête de mât à l\'extrémité de la bôme. Elle soutient la bôme quand la grand-voile est affalée et empêche la bôme de tomber. On la détend quand la voile est en place.',
    tooltipPos: { x: 62, y: 42 },
  },
  // === NEW PARTS (33 missing) ===
  // Anatomy
  {
    id: 'svg-roof',
    label: 'Roof / Rouf',
    shortDef: 'Superstructure surélevée du pont couvrant la cabine',
    definition:
      'Le roof (ou rouf) est la partie surélevée du pont qui protège la cabine. Il permet de gagner de la hauteur sous barrots à l\'intérieur tout en restant étanche.',
    tooltipPos: { x: 54, y: 66 },
  },
  {
    id: 'svg-pont',
    label: 'Pont',
    shortDef: 'Surface horizontale supérieure de la coque',
    definition:
      'Le pont est la surface supérieure du bateau sur laquelle on circule. Il assure l\'étanchéité de la coque et porte les équipements de manœuvre (winchs, taquets, etc.).',
    tooltipPos: { x: 45, y: 65 },
  },
  {
    id: 'svg-bastingage',
    label: 'Bastingage',
    shortDef: 'Bordage relevé au-dessus du pont',
    definition:
      'Le bastingage est le rebord surélevé le long du pont, formant une petite muraille pour empêcher l\'eau et les objets de tomber par-dessus bord.',
    tooltipPos: { x: 38, y: 66 },
  },
  {
    id: 'svg-chandelier',
    label: 'Chandelier',
    shortDef: 'Poteau vertical supportant les filières',
    definition:
      'Les chandeliers sont de petits poteaux verticaux fixés sur le pont qui supportent les filières (câbles de sécurité). Ils forment la rambarde de sécurité du voilier.',
    tooltipPos: { x: 35, y: 64 },
  },
  {
    id: 'svg-filiere',
    label: 'Filière',
    shortDef: 'Câble de sécurité entre les chandeliers',
    definition:
      'La filière est un câble ou cordage tendu horizontalement entre les chandeliers, formant une rambarde de sécurité autour du pont pour empêcher les chutes à la mer.',
    tooltipPos: { x: 33, y: 63 },
  },
  {
    id: 'svg-winch',
    label: 'Winch',
    shortDef: 'Treuil pour reprendre les cordages',
    definition:
      'Le winch est un treuil mécanique fixé sur le pont, utilisé pour reprendre les écoutes et drisses sous tension. On enroule le cordage autour du tambour et on tourne la manivelle.',
    tooltipPos: { x: 62, y: 67 },
  },
  {
    id: 'svg-taquet',
    label: 'Taquet',
    shortDef: 'Pièce d\'amarrage en forme de T',
    definition:
      'Le taquet est une pièce en forme de T ou de corne fixée sur le pont. Il sert à tourner (fixer) un cordage : amarre, écoute, drisse. On fait des tours en huit autour.',
    tooltipPos: { x: 55, y: 67 },
  },
  {
    id: 'svg-puits-de-derive',
    label: 'Puits de dérive',
    shortDef: 'Logement de la dérive dans la coque',
    definition:
      'Le puits de dérive est un caisson étanche traversant la coque dans lequel coulisse la dérive (sur les dériveurs). Il permet de remonter ou descendre la dérive selon les besoins.',
    tooltipPos: { x: 50, y: 78 },
  },
  {
    id: 'svg-tableau-arriere',
    label: 'Tableau arrière',
    shortDef: 'Surface plate à la poupe du bateau',
    definition:
      'Le tableau arrière est la surface verticale plate (ou légèrement inclinée) qui ferme la coque à l\'arrière. On y trouve souvent le nom du bateau et son port d\'attache.',
    tooltipPos: { x: 68, y: 70 },
  },
  {
    id: 'svg-ligne-de-flottaison',
    label: 'Ligne de flottaison',
    shortDef: 'Ligne séparant les œuvres vives et mortes',
    definition:
      'La ligne de flottaison est la ligne à la surface de l\'eau qui sépare la partie immergée (œuvres vives) de la partie émergée (œuvres mortes) de la coque.',
    tooltipPos: { x: 50, y: 73 },
  },
  // Cordages/rigging
  {
    id: 'svg-ecoute',
    label: 'Écoute',
    shortDef: 'Cordage réglant l\'angle d\'une voile',
    definition:
      'L\'écoute est le cordage qui permet de régler l\'angle d\'une voile par rapport à l\'axe du bateau. Chaque voile a sa propre écoute. Border = tirer, choquer = relâcher.',
    tooltipPos: { x: 60, y: 64 },
  },
  {
    id: 'svg-drisse',
    label: 'Drisse',
    shortDef: 'Cordage servant à hisser une voile',
    definition:
      'La drisse est un cordage passant par une poulie en tête de mât, servant à hisser (monter) une voile. Chaque voile a sa propre drisse : drisse de GV, drisse de foc, drisse de spi.',
    tooltipPos: { x: 52, y: 12 },
  },
  {
    id: 'svg-hauban',
    label: 'Hauban',
    shortDef: 'Câble latéral maintenant le mât',
    definition:
      'Un hauban est un câble latéral du gréement dormant qui maintient le mât. Les haubans travaillent en traction pour empêcher le mât de tomber latéralement.',
    tooltipPos: { x: 68, y: 36 },
  },
  {
    id: 'svg-cunningham',
    label: 'Cunningham',
    shortDef: 'Réglage de tension du guindant',
    definition:
      'Le cunningham est un cordage qui permet de tendre le guindant (bord d\'attaque) de la grand-voile en tirant vers le bas un œillet situé juste au-dessus du point d\'amure. Il contrôle la position du creux de la voile.',
    tooltipPos: { x: 49, y: 65 },
  },
  {
    id: 'svg-pataras',
    label: 'Pataras',
    shortDef: 'Câble arrière maintenant le mât',
    definition:
      'Le pataras est le câble reliant la tête de mât à la poupe. Il s\'oppose à la traction de l\'étai et permet de régler le cintrage du mât et la tension de l\'étai.',
    tooltipPos: { x: 65, y: 30 },
  },
  {
    id: 'svg-galhauban',
    label: 'Galhauban',
    shortDef: 'Hauban intermédiaire ou bas',
    definition:
      'Le galhauban est un hauban partant d\'un point intermédiaire du mât (et non de la tête). Il empêche le mât de se courber latéralement dans sa partie basse ou médiane.',
    tooltipPos: { x: 66, y: 48 },
  },
  {
    id: 'svg-bras',
    label: 'Bras de spi',
    shortDef: 'Cordage contrôlant le tangon ou le spi au vent',
    definition:
      'Le bras est le cordage fixé au point d\'amure du spinnaker, passant par le tangon. Il contrôle l\'ouverture de la voile côté au vent.',
    tooltipPos: { x: 25, y: 55 },
  },
  {
    id: 'svg-bosse-de-ris',
    label: 'Bosse de ris',
    shortDef: 'Cordage pour réduire la surface de la grand-voile',
    definition:
      'La bosse de ris est le cordage qui permet de prendre un ris, c\'est-à-dire de réduire la surface de la grand-voile en abaissant partiellement celle-ci et en la fixant à la bôme.',
    tooltipPos: { x: 58, y: 56 },
  },
  {
    id: 'svg-manille',
    label: 'Manille',
    shortDef: 'Pièce métallique en U pour relier des éléments',
    definition:
      'La manille est une pièce d\'accastillage en forme de U fermé par un axe (manillon). Elle sert à relier rapidement deux éléments : voile/drisse, écoute/voile, etc.',
    tooltipPos: { x: 50, y: 63 },
  },
  {
    id: 'svg-poulie',
    label: 'Poulie',
    shortDef: 'Réa sur axe déviant un cordage',
    definition:
      'La poulie est un réa (roue à gorge) monté sur un axe, servant à dévier la direction d\'un cordage et à en démultiplier l\'effort. Indispensable dans tous les systèmes de manœuvre.',
    tooltipPos: { x: 70, y: 63 },
  },
  {
    id: 'svg-tangon',
    label: 'Tangon',
    shortDef: 'Espar horizontal pour le spinnaker',
    definition:
      'Le tangon est un espar horizontal articulé au mât, utilisé pour écarter le point d\'amure du spinnaker. Il maintient la voile ouverte au vent et se règle en hauteur et en angle.',
    tooltipPos: { x: 28, y: 38 },
  },
  // Sail parts
  {
    id: 'svg-foc',
    label: 'Foc',
    shortDef: 'Voile d\'avant plus petite que le génois',
    definition:
      'Le foc est une voile d\'avant triangulaire fixée sur l\'étai. Plus petit que le génois, il ne dépasse pas le mât vers l\'arrière. Utilisé par vent fort ou en complément.',
    tooltipPos: { x: 28, y: 33 },
  },
  {
    id: 'svg-tourmentin',
    label: 'Tourmentin',
    shortDef: 'Très petit foc de tempête',
    definition:
      'Le tourmentin est un très petit foc en tissu très résistant, utilisé uniquement par gros temps. Sa faible surface permet de garder un minimum de voilure à l\'avant pour diriger le bateau.',
    tooltipPos: { x: 32, y: 50 },
  },
  {
    id: 'svg-trinquette',
    label: 'Trinquette',
    shortDef: 'Voile d\'avant sur étai intérieur',
    definition:
      'La trinquette est une voile d\'avant fixée sur un étai intérieur (entre le mât et l\'étai de génois). Elle offre un plan de voilure réduit, intermédiaire entre le génois et le tourmentin.',
    tooltipPos: { x: 35, y: 38 },
  },
  {
    id: 'svg-lazy-bag',
    label: 'Lazy bag',
    shortDef: 'Housse sur la bôme pour ranger la grand-voile',
    definition:
      'Le lazy bag est une housse en toile fixée sur la bôme dans laquelle on affale la grand-voile. Il facilite le rangement de la voile sans avoir à la plier et protège le tissu.',
    tooltipPos: { x: 59, y: 62 },
  },
  {
    id: 'svg-guindant',
    label: 'Guindant',
    shortDef: 'Bord d\'attaque de la voile (côté mât)',
    definition:
      'Le guindant est le bord avant de la voile, celui qui est fixé au mât (grand-voile) ou à l\'étai (foc/génois). Sa tension influence la forme et les performances de la voile.',
    tooltipPos: { x: 50, y: 35 },
  },
  {
    id: 'svg-chute',
    label: 'Chute',
    shortDef: 'Bord arrière de la voile (bord de fuite)',
    definition:
      'La chute est le bord arrière (de fuite) de la voile, du sommet à l\'écoute. Son profil (creux ou plat) influence fortement la puissance et le cap du voilier.',
    tooltipPos: { x: 60, y: 35 },
  },
  {
    id: 'svg-bordure',
    label: 'Bordure',
    shortDef: 'Bord inférieur de la voile',
    definition:
      'La bordure est le bord inférieur de la voile. Sur la grand-voile, elle longe la bôme. Sa tension se règle par le cunningham de bordure ou l\'étarqueur de bordure.',
    tooltipPos: { x: 57, y: 64 },
  },
  {
    id: 'svg-lattes',
    label: 'Lattes',
    shortDef: 'Renforts rigides dans la voile',
    definition:
      'Les lattes sont des tiges semi-rigides insérées dans des goussets de la voile. Elles maintiennent la forme de la chute et empêchent la toile de fasseyer (battre au vent).',
    tooltipPos: { x: 56, y: 28 },
  },
  {
    id: 'svg-point-amure',
    label: 'Point d\'amure',
    shortDef: 'Coin inférieur avant de la voile',
    definition:
      'Le point d\'amure est le coin inférieur avant de la voile, fixé au vit-de-mulet (mât/bôme) pour la grand-voile, ou à l\'étai/étrave pour le foc. C\'est un point fixe.',
    tooltipPos: { x: 49, y: 66 },
  },
  {
    id: 'svg-point-ecoute',
    label: 'Point d\'écoute',
    shortDef: 'Coin inférieur arrière de la voile',
    definition:
      'Le point d\'écoute est le coin inférieur arrière de la voile, où est frappée l\'écoute. C\'est le point de réglage mobile qui contrôle l\'angle de la voile.',
    tooltipPos: { x: 69, y: 64 },
  },
  {
    id: 'svg-point-drisse',
    label: 'Point de drisse',
    shortDef: 'Coin supérieur de la voile',
    definition:
      'Le point de drisse est le sommet de la voile, où est frappée la drisse qui sert à la hisser. C\'est le point le plus haut de la voile une fois établie.',
    tooltipPos: { x: 50, y: 8 },
  },
  // Navigation instruments
  {
    id: 'svg-compas',
    label: 'Compas',
    shortDef: 'Instrument de navigation indiquant le nord',
    definition:
      'Le compas (de route) est l\'instrument magnétique qui indique en permanence le cap du bateau. Fixé sur le cockpit, il permet au barreur de maintenir un cap stable.',
    tooltipPos: { x: 66, y: 68 },
  },
  {
    id: 'svg-sondeur',
    label: 'Sondeur',
    shortDef: 'Instrument mesurant la profondeur',
    definition:
      'Le sondeur est un instrument électronique utilisant des ultrasons pour mesurer la profondeur d\'eau sous la coque. Essentiel pour la sécurité en navigation côtière.',
    tooltipPos: { x: 48, y: 78 },
  },
  {
    id: 'svg-loch',
    label: 'Loch',
    shortDef: 'Instrument mesurant la vitesse du bateau',
    definition:
      'Le loch est un instrument mesurant la vitesse du bateau dans l\'eau (en nœuds) et la distance parcourue. Le capteur (petite hélice) est situé sous la coque.',
    tooltipPos: { x: 52, y: 78 },
  },
  {
    id: 'svg-chariot-ecoute',
    label: 'Chariot d\'écoute',
    shortDef: 'Rail de réglage transversal de l\'écoute',
    definition:
      'Le chariot d\'écoute coulisse sur un rail transversal (barre d\'écoute) dans le cockpit. Il permet de régler le point de tire latéral de l\'écoute de grand-voile.',
    tooltipPos: { x: 64, y: 68 },
  },
  // === UNIQUE PARTS for previously shared diagramPartIds ===
  // Quille group (original svg-quille at x:50, y:88)
  {
    id: 'svg-appendices',
    label: 'Appendices',
    shortDef: 'Éléments immergés sous la coque',
    definition: 'Les appendices sont les éléments immergés du bateau (quille, safran, dérive) qui dépassent sous la ligne de flottaison et influencent stabilité et performances.',
    tooltipPos: { x: 46, y: 86 },
  },
  {
    id: 'svg-bulbe',
    label: 'Bulbe',
    shortDef: 'Lest en torpille au bas de la quille',
    definition: 'Le bulbe est un lest en forme de torpille fixé à l\'extrémité inférieure de la quille, concentrant le poids le plus bas possible pour maximiser la stabilité.',
    tooltipPos: { x: 50, y: 92 },
  },
  {
    id: 'svg-lest',
    label: 'Lest',
    shortDef: 'Poids assurant la stabilité',
    definition: 'Le lest est un poids (plomb ou fonte) placé dans la quille pour abaisser le centre de gravité et empêcher le bateau de chavirer.',
    tooltipPos: { x: 54, y: 90 },
  },
  {
    id: 'svg-foil',
    label: 'Foil',
    shortDef: 'Hydrofoil créant une portance',
    definition: 'Le foil est un appendice profilé comme une aile d\'avion, créant une portance hydrodynamique qui soulève la coque hors de l\'eau à grande vitesse.',
    tooltipPos: { x: 46, y: 91 },
  },
  {
    id: 'svg-voile-de-quille',
    label: 'Voile de quille',
    shortDef: 'Aileron fin de la quille',
    definition: 'La voile de quille est la partie verticale profilée de la quille reliant la coque au bulbe, créant la force anti-dérive.',
    tooltipPos: { x: 53, y: 86 },
  },
  // Écoute group (original svg-ecoute at x:60, y:64)
  {
    id: 'svg-bout',
    label: 'Bout',
    shortDef: 'Terme générique pour tout cordage',
    definition: 'Le bout (prononcé « boute ») est le terme générique pour tout cordage à bord d\'un voilier. On ne dit jamais « corde ».',
    tooltipPos: { x: 57, y: 62 },
  },
  {
    id: 'svg-cordage',
    label: 'Cordage',
    shortDef: 'Ligne tressée en fibres',
    definition: 'Le cordage est un assemblage de fibres tressées formant une ligne flexible et résistante, base de tous les bouts du bord.',
    tooltipPos: { x: 63, y: 62 },
  },
  {
    id: 'svg-aussiere',
    label: 'Aussière',
    shortDef: 'Gros cordage d\'amarrage',
    definition: 'L\'aussière est un gros cordage résistant utilisé pour l\'amarrage ou le remorquage, généralement en polyamide pour absorber les chocs.',
    tooltipPos: { x: 57, y: 66 },
  },
  {
    id: 'svg-amarre',
    label: 'Amarre',
    shortDef: 'Cordage pour attacher au quai',
    definition: 'L\'amarre est un cordage servant à attacher le bateau au quai, à une bouée ou à un autre bateau.',
    tooltipPos: { x: 63, y: 66 },
  },
  {
    id: 'svg-corde',
    label: 'Corde',
    shortDef: 'Terme INTERDIT sur un bateau',
    definition: 'La corde est un terme absolument interdit sur un bateau. On utilise bout, cordage, écoute, drisse, amarre, etc.',
    tooltipPos: { x: 60, y: 67 },
  },
  // Coque group (original svg-coque at x:50, y:72)
  {
    id: 'svg-tribord',
    label: 'Tribord',
    shortDef: 'Côté droit du bateau',
    definition: 'Tribord est le côté droit du bateau quand on regarde vers l\'avant. Son feu de signalisation est vert.',
    tooltipPos: { x: 54, y: 70 },
  },
  {
    id: 'svg-babord',
    label: 'Bâbord',
    shortDef: 'Côté gauche du bateau',
    definition: 'Bâbord est le côté gauche du bateau quand on regarde vers l\'avant. Son feu de signalisation est rouge.',
    tooltipPos: { x: 46, y: 70 },
  },
  {
    id: 'svg-bouchain',
    label: 'Bouchain',
    shortDef: 'Angle entre fond et flanc de la coque',
    definition: 'Le bouchain est l\'angle formé entre le fond et les côtés de la coque, pouvant être vif ou arrondi.',
    tooltipPos: { x: 47, y: 74 },
  },
  {
    id: 'svg-carene',
    label: 'Carène',
    shortDef: 'Partie immergée de la coque',
    definition: 'La carène est la partie immergée de la coque, aussi appelée œuvres vives, recouverte d\'antifouling.',
    tooltipPos: { x: 53, y: 74 },
  },
  {
    id: 'svg-franc-bord',
    label: 'Franc-bord',
    shortDef: 'Hauteur entre flottaison et pont',
    definition: 'Le franc-bord est la distance verticale entre la ligne de flottaison et le bord supérieur du pont.',
    tooltipPos: { x: 50, y: 69 },
  },
  // Proue group (original svg-proue at x:22, y:62)
  {
    id: 'svg-etrave',
    label: 'Étrave',
    shortDef: 'Bord avant de la coque',
    definition: 'L\'étrave est l\'arête verticale ou inclinée à l\'avant de la coque qui fend l\'eau.',
    tooltipPos: { x: 19, y: 60 },
  },
  {
    id: 'svg-bout-dehors',
    label: 'Bout-dehors',
    shortDef: 'Espar prolongeant la proue',
    definition: 'Le bout-dehors est un espar fixe ou rétractable prolongeant la proue pour gréer des voiles d\'avant supplémentaires.',
    tooltipPos: { x: 19, y: 64 },
  },
  {
    id: 'svg-guindeau',
    label: 'Guindeau',
    shortDef: 'Treuil pour remonter l\'ancre',
    definition: 'Le guindeau est un treuil installé à l\'avant du bateau pour remonter la chaîne et l\'ancre.',
    tooltipPos: { x: 25, y: 60 },
  },
  // Mât group (original svg-mat at x:48, y:10)
  {
    id: 'svg-espar',
    label: 'Espar',
    shortDef: 'Pièce rigide du gréement',
    definition: 'L\'espar est le nom générique pour toute pièce rigide allongée du gréement : mât, bôme, tangon, bout-dehors.',
    tooltipPos: { x: 45, y: 12 },
  },
  // Bôme group (original svg-bome at x:58, y:58)
  {
    id: 'svg-vit-de-mulet',
    label: 'Vit-de-mulet',
    shortDef: 'Articulation bôme/mât',
    definition: 'Le vit-de-mulet est la pièce d\'articulation qui fixe la bôme au mât, lui permettant de pivoter librement.',
    tooltipPos: { x: 55, y: 60 },
  },
  // Étai group (original svg-etai at x:22, y:18)
  {
    id: 'svg-sous-barbe',
    label: 'Sous-barbe',
    shortDef: 'Câble sous le bout-dehors',
    definition: 'La sous-barbe est un câble sous le bout-dehors contrebalançant la tension de l\'étai pour empêcher le bout-dehors de se relever.',
    tooltipPos: { x: 19, y: 21 },
  },
  // Génois group (original svg-genois at x:30, y:32)
  {
    id: 'svg-solent',
    label: 'Solent',
    shortDef: 'Voile d\'avant intermédiaire',
    definition: 'Le solent est une voile d\'avant de taille intermédiaire entre le génois et le foc, adaptée au vent médium.',
    tooltipPos: { x: 27, y: 34 },
  },
  // Gennaker group (original svg-gennaker at x:20, y:28)
  {
    id: 'svg-code-zero',
    label: 'Code 0',
    shortDef: 'Grande voile légère pour vent faible',
    definition: 'Le Code 0 est une grande voile d\'avant légère, entre un génois léger et un gennaker, idéale pour le reaching par vent faible.',
    tooltipPos: { x: 17, y: 30 },
  },
  // Tourmentin group (original svg-tourmentin at x:32, y:50)
  {
    id: 'svg-voile-de-cape',
    label: 'Voile de cape',
    shortDef: 'Voile de survie pour gros temps',
    definition: 'La voile de cape est une petite voile très solide utilisée dans les conditions de survie, quand le vent est trop fort.',
    tooltipPos: { x: 35, y: 52 },
  },
  // Haubans group (original svg-haubans at x:70, y:35)
  {
    id: 'svg-cadene',
    label: 'Cadène',
    shortDef: 'Point d\'attache des haubans',
    definition: 'La cadène est une pièce métallique fixée sur le pont servant de point d\'attache pour les haubans et galhaubans.',
    tooltipPos: { x: 68, y: 37 },
  },
  {
    id: 'svg-bastaque',
    label: 'Bastaque',
    shortDef: 'Hauban mobile arrière',
    definition: 'La bastaque est un hauban mobile utilisé sur les gréements fractionnés, reprise à chaque virement de bord.',
    tooltipPos: { x: 67, y: 33 },
  },
  // Pont group (original svg-pont at x:45, y:65)
  {
    id: 'svg-ligne-de-vie',
    label: 'Ligne de vie',
    shortDef: 'Sangles de sécurité sur le pont',
    definition: 'Les lignes de vie sont des sangles tendues sur le pont auxquelles l\'équipage s\'attache avec un harnais de sécurité.',
    tooltipPos: { x: 42, y: 63 },
  },
  // Roof group (original svg-roof at x:54, y:66)
  {
    id: 'svg-rouf',
    label: 'Rouf',
    shortDef: 'Superstructure du pont (variante)',
    definition: 'Le rouf est la partie surélevée du pont formant le toit de la cabine, variante orthographique de « roof ».',
    tooltipPos: { x: 57, y: 68 },
  },
  // Bastingage group (original svg-bastingage at x:38, y:66)
  {
    id: 'svg-balcon',
    label: 'Balcon',
    shortDef: 'Rambarde métallique avant/arrière',
    definition: 'Le balcon est une rambarde métallique en inox à l\'avant et à l\'arrière du bateau, plus robuste que les filières.',
    tooltipPos: { x: 35, y: 68 },
  },
  // Poulie group (original svg-poulie at x:70, y:63)
  {
    id: 'svg-mousqueton',
    label: 'Mousqueton',
    shortDef: 'Crochet à ouverture rapide',
    definition: 'Le mousqueton est une pièce d\'accastillage à ouverture rapide pour connecter et déconnecter cordages et voiles.',
    tooltipPos: { x: 67, y: 65 },
  },
]

type DiagramFilter = 'all' | 'voiles' | 'cordages' | 'anatomie'

const VOILES_IDS = new Set([
  'svg-grand-voile', 'svg-genois', 'svg-spinnaker', 'svg-gennaker', 'svg-foc',
  'svg-tourmentin', 'svg-trinquette', 'svg-lazy-bag', 'svg-guindant', 'svg-chute',
  'svg-bordure', 'svg-lattes', 'svg-point-amure', 'svg-point-ecoute', 'svg-point-drisse',
  'svg-solent', 'svg-code-zero', 'svg-voile-de-cape', 'svg-foil', 'svg-voile-de-quille',
])

const CORDAGES_IDS = new Set([
  'svg-ecoute-gv', 'svg-ecoute', 'svg-drisse-gv', 'svg-drisse', 'svg-hale-bas',
  'svg-haubans', 'svg-hauban', 'svg-etai', 'svg-galhauban', 'svg-balancine',
  'svg-pataras', 'svg-bras', 'svg-bosse-de-ris', 'svg-cunningham', 'svg-manille',
  'svg-poulie', 'svg-tangon', 'svg-chariot-ecoute',
  'svg-bout', 'svg-cordage', 'svg-aussiere', 'svg-amarre', 'svg-corde',
  'svg-sous-barbe', 'svg-cadene', 'svg-bastaque', 'svg-mousqueton',
])

const ANATOMIE_IDS = new Set([
  'svg-coque', 'svg-mat', 'svg-bome', 'svg-quille', 'svg-safran', 'svg-barre',
  'svg-cockpit', 'svg-proue', 'svg-poupe', 'svg-roof', 'svg-pont', 'svg-bastingage',
  'svg-chandelier', 'svg-filiere', 'svg-winch', 'svg-taquet', 'svg-puits-de-derive',
  'svg-tableau-arriere', 'svg-ligne-de-flottaison', 'svg-compas', 'svg-sondeur', 'svg-loch',
  'svg-tribord', 'svg-babord', 'svg-bouchain', 'svg-carene', 'svg-franc-bord',
  'svg-appendices', 'svg-bulbe', 'svg-lest', 'svg-etrave', 'svg-bout-dehors',
  'svg-guindeau', 'svg-espar', 'svg-vit-de-mulet', 'svg-rouf', 'svg-balcon',
  'svg-ligne-de-vie',
])

// Always visible — hull, mast, boom (structural context)
const STRUCTURE_IDS = new Set([
  'svg-coque', 'svg-mat', 'svg-bome', 'svg-quille', 'svg-safran', 'svg-proue', 'svg-poupe',
])

function getPartOpacity(partId: string, filter: DiagramFilter, isActive: boolean): number {
  if (isActive) return 1
  if (filter === 'all') return 1
  if (STRUCTURE_IDS.has(partId)) return 0.3 // always show hull faintly

  const inGroup = filter === 'voiles' ? VOILES_IDS.has(partId)
    : filter === 'cordages' ? CORDAGES_IDS.has(partId)
    : filter === 'anatomie' ? ANATOMIE_IDS.has(partId)
    : true

  return inGroup ? 1 : 0.06
}

interface SailboatDiagramProps {
  onPartSelect?: (part: {
    id: string
    label: string
    shortDef: string
    definition: string
  }) => void
  selectedPartId?: string | null
  enableZoom?: boolean
  filter?: DiagramFilter
}

export default function SailboatDiagram({
  onPartSelect,
  selectedPartId,
  enableZoom = false,
  filter = 'all',
}: SailboatDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    hoveredPart,
    handleHover,
    clearSelection,
  } = useDiagramState()
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Clear internal selection when external selection changes
  useEffect(() => {
    if (selectedPartId) clearSelection()
  }, [selectedPartId, clearSelection])

  const isActive = useCallback(
    (partId: string) => {
      // If hovering something, only that one is active (selected loses glow temporarily)
      if (hoveredPart) return hoveredPart === partId
      return selectedPartId === partId
    },
    [hoveredPart, selectedPartId],
  )

  // Hover takes priority over selected for tooltip display
  const activePart = hoveredPart
    ? PARTS.find(p => p.id === hoveredPart)
    : selectedPartId
      ? PARTS.find(p => p.id === selectedPartId)
      : null

  // Animated viewBox — snappy but smooth
  const springConfig = { stiffness: 120, damping: 22, mass: 0.8 }
  const vbX = useSpring(0, springConfig)
  const vbY = useSpring(0, springConfig)
  const vbW = useSpring(500, springConfig)
  const vbH = useSpring(550, springConfig)

  const animatedViewBox = useTransform(
    [vbX, vbY, vbW, vbH],
    ([x, y, w, h]) => `${x} ${y} ${w} ${h}`
  )

  // Debounced zoom — only zooms after hovering 400ms, dezoom is instant
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    // Clear any pending zoom
    clearTimeout(zoomTimerRef.current)

    if (!enableZoom) {
      vbX.set(0); vbY.set(0); vbW.set(500); vbH.set(550)
      return
    }

    // Only zoom on selectedPartId (from panel click), NOT on hover — hover causes infinite loop
    const focusId = selectedPartId
    const focusPart = focusId ? PARTS.find(p => p.id === focusId) : null

    if (!focusPart) {
      vbX.set(0); vbY.set(0); vbW.set(500); vbH.set(550)
      return
    }

    // Short delay for debounce, then zoom
    zoomTimerRef.current = setTimeout(() => {
      const tx = (focusPart.tooltipPos.x / 100) * 500
      const ty = (focusPart.tooltipPos.y / 100) * 550
      // Adaptive zoom — shifts the view toward the part without hard clamp
      const zoomW = 420
      const zoomH = 462
      // Bias toward center: blend between target and canvas center
      const cx = 250, cy = 275
      const bx = tx * 0.6 + cx * 0.4
      const by = ty * 0.6 + cy * 0.4
      const x = Math.max(0, Math.min(500 - zoomW, bx - zoomW / 2))
      const y = Math.max(0, Math.min(550 - zoomH, by - zoomH / 2))
      vbX.set(x); vbY.set(y); vbW.set(zoomW); vbH.set(zoomH)
    }, 100)

    return () => clearTimeout(zoomTimerRef.current)
  }, [selectedPartId, hoveredPart, vbX, vbY, vbW, vbH, enableZoom])

  const handlePartHover = useCallback(
    (partId: string | null) => {
      handleHover(partId)
      if (partId && containerRef.current) {
        const part = PARTS.find((p) => p.id === partId)
        if (part) {
          const rect = containerRef.current.getBoundingClientRect()
          setTooltipPos({
            x: (part.tooltipPos.x / 100) * rect.width,
            y: (part.tooltipPos.y / 100) * rect.height,
          })
        }
      }
    },
    [handleHover],
  )

  const handlePartClick = useCallback(
    (partId: string) => {
      const part = PARTS.find((p) => p.id === partId)
      if (part && onPartSelect) {
        onPartSelect({
          id: part.id,
          label: part.label,
          shortDef: part.shortDef,
          definition: part.definition,
        })
      }
    },
    [onPartSelect],
  )

  const activeColor = '#38bdf8'
  const selectedColor = '#f59e0b'
  const defaultStroke = '#4a7ab5'

  const getActiveStroke = (partId: string, fallback: string = defaultStroke) => {
    if (selectedPartId === partId) return selectedColor
    if (isActive(partId)) return activeColor
    return fallback
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      <motion.svg
        viewBox={animatedViewBox as unknown as string}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Schéma interactif du voilier avec 83 composants cliquables"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <defs>
          {/* Background radial gradient */}
          <radialGradient id="bg-radial" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0c1a3a" />
            <stop offset="70%" stopColor="#060e1f" />
            <stop offset="100%" stopColor="#030812" />
          </radialGradient>

          {/* Water gradient — subtle, transparent to blend with site bg */}
          <linearGradient id="water-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.15" />
          </linearGradient>

          {/* Sail gradients */}
          <linearGradient id="sail-gv-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="sail-gv-grad-active" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient id="sail-genois-grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0.16" />
            <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="sail-genois-grad-active" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.15" />
          </linearGradient>

          {/* Spinnaker gradient - coral to amber */}
          <radialGradient id="spinnaker-grad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="spinnaker-grad-active" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fb923c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
          </radialGradient>

          {/* Gennaker gradient - teal/green */}
          <radialGradient id="gennaker-grad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.12" />
          </radialGradient>
          <radialGradient id="gennaker-grad-active" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.25" />
          </radialGradient>

          {/* Hull gradient */}
          <linearGradient id="hull-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f1729" />
          </linearGradient>

          {/* Hull reflection gradient */}
          <linearGradient id="hull-reflect-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f1729" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f1729" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Soft star glow */}
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="1" />
          </filter>

          {/* Clip for reflection */}
          <clipPath id="water-clip">
            <rect x="0" y="400" width="500" height="150" />
          </clipPath>

          {/* Wind dash animation */}
          <linearGradient id="wind-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Background transparent — uses site CSS ocean gradient */}

        {/* === WATER === */}
        {/* Multiple wave lines */}
        <path
          d="M 0 395 Q 40 389 80 393 Q 130 399 180 394 Q 230 388 280 393 Q 340 400 400 394 Q 450 389 500 393"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="1"
          opacity="0.25"
        />
        <path
          d="M 0 400 Q 50 394 100 398 Q 160 404 220 398 Q 280 392 340 397 Q 400 403 460 397 Q 480 395 500 398"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="0.8"
          opacity="0.2"
        />
        <path
          d="M 0 406 Q 60 401 120 405 Q 190 410 260 404 Q 320 399 380 404 Q 440 409 500 404"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="0.6"
          opacity="0.15"
        />
        <rect x="0" y="397" width="500" height="153" fill="url(#water-grad)" />
        {/* Deeper wave hints */}
        <path
          d="M 0 420 Q 70 416 140 420 Q 210 425 280 419 Q 350 414 420 419 Q 460 422 500 419"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="0.5"
          opacity="0.1"
        />
        <path
          d="M 0 445 Q 80 441 160 445 Q 240 449 320 444 Q 400 440 500 444"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="0.4"
          opacity="0.07"
        />

        {/* === HULL REFLECTION (faint mirror below waterline) === */}
        <g clipPath="url(#water-clip)" opacity="0.12">
          <path
            d="M 140 430 Q 130 425 125 410 Q 130 400 160 405 Q 220 398 280 398 Q 340 400 355 410 Q 365 420 358 430 L 350 435 Z"
            fill="url(#hull-reflect-grad)"
            stroke="none"
            transform="translate(0, 5) scale(1, -0.4) translate(0, -1030)"
          />
        </g>

        {/* === QUILLE === */}
        <SailboatPart
          partId="svg-quille"
          label="Quille"
          isActive={isActive('svg-quille')}
          isSelected={selectedPartId === 'svg-quille'}
          cx={250}
          cy={484}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-quille', filter, isActive('svg-quille'))}
        >
          <path
            d="M 248 410 L 238 478 Q 249 484 260 478 L 252 410 Z"
            fill={isActive('svg-quille') ? '#1e3a5f' : '#0f2035'}
            stroke={getActiveStroke('svg-quille', '#2a4a6b')}
            strokeWidth="1.5"
          />
          <ellipse
            cx="250"
            cy="480"
            rx="18"
            ry="6"
            fill={isActive('svg-quille') ? '#2a4a6b' : '#1a3050'}
            stroke={getActiveStroke('svg-quille', '#2a4a6b')}
            strokeWidth="1"
          />
          <rect
            x="232"
            y="476"
            width="36"
            height="8"
            rx="2"
            fill={isActive('svg-quille') ? '#2a4a6b' : '#1a3050'}
            stroke={getActiveStroke('svg-quille', '#2a4a6b')}
            strokeWidth="1"
          />
        </SailboatPart>

        {/* === SAFRAN === */}
        <SailboatPart
          partId="svg-safran"
          label="Safran"
          isActive={isActive('svg-safran')}
          isSelected={selectedPartId === 'svg-safran'}
          cx={340}
          cy={429}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-safran', filter, isActive('svg-safran'))}
        >
          <path
            d="M 340 397 Q 339 420 337 445 L 344 445 Q 344 420 343 397 Z"
            fill={isActive('svg-safran') ? '#1e3a5f' : '#0f2035'}
            stroke={getActiveStroke('svg-safran', '#2a4a6b')}
            strokeWidth="1.5"
          />
        </SailboatPart>

        {/* === COQUE === */}
        <SailboatPart
          partId="svg-coque"
          label="Coque"
          isActive={isActive('svg-coque')}
          isSelected={selectedPartId === 'svg-coque'}
          cx={250}
          cy={396}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-coque', filter, isActive('svg-coque'))}
        >
          <path
            d="M 140 370 C 132 375, 126 385, 128 395 C 132 405, 155 412, 190 414 Q 240 416, 290 414 C 330 412, 355 405, 360 395 C 363 385, 360 375, 352 370 Z"
            fill="url(#hull-grad)"
            stroke={getActiveStroke('svg-coque')}
            strokeWidth="2"
          />
          {/* Deck line */}
          <path
            d="M 148 370 Q 200 362 250 360 Q 300 362 348 370"
            fill="none"
            stroke={getActiveStroke('svg-coque', '#4a7ab5')}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          {/* Waterline */}
          <path
            d="M 135 395 Q 200 400 250 401 Q 310 400 355 395"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="0.8"
            opacity="0.4"
          />
        </SailboatPart>

        {/* === PROUE / ÉTRAVE === */}
        <SailboatPart
          partId="svg-proue"
          label="Proue / Étrave"
          isActive={isActive('svg-proue')}
          isSelected={selectedPartId === 'svg-proue'}
          cx={110}
          cy={341}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-proue', filter, isActive('svg-proue'))}
        >
          <path
            d="M 140 370 C 132 375, 126 385, 128 395"
            fill="none"
            stroke={
              isActive('svg-proue')
                ? activeColor
                : '#5a8abf'
            }
            strokeWidth={isActive('svg-proue') ? 3.5 : 2.5}
            strokeLinecap="round"
          />
          {/* Highlight dot at the bow tip */}
          <circle
            cx="133"
            cy="382"
            r={isActive('svg-proue') ? 4 : 2.5}
            fill={isActive('svg-proue') ? activeColor : '#5a8abf'}
            opacity={isActive('svg-proue') ? 1 : 0.6}
          />
        </SailboatPart>

        {/* === POUPE === */}
        <SailboatPart
          partId="svg-poupe"
          label="Poupe"
          isActive={isActive('svg-poupe')}
          isSelected={selectedPartId === 'svg-poupe'}
          cx={350}
          cy={358}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-poupe', filter, isActive('svg-poupe'))}
        >
          <path
            d="M 352 370 C 360 375, 363 385, 360 395"
            fill="none"
            stroke={
              isActive('svg-poupe')
                ? activeColor
                : '#5a8abf'
            }
            strokeWidth={isActive('svg-poupe') ? 3.5 : 2.5}
            strokeLinecap="round"
          />
          {/* Highlight dot at stern */}
          <circle
            cx="357"
            cy="382"
            r={isActive('svg-poupe') ? 4 : 2.5}
            fill={isActive('svg-poupe') ? activeColor : '#5a8abf'}
            opacity={isActive('svg-poupe') ? 1 : 0.6}
          />
        </SailboatPart>

        {/* === COCKPIT === */}
        <SailboatPart
          partId="svg-cockpit"
          label="Cockpit"
          isActive={isActive('svg-cockpit')}
          isSelected={selectedPartId === 'svg-cockpit'}
          cx={340}
          cy={358}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-cockpit', filter, isActive('svg-cockpit'))}
        >
          <rect
            x="300"
            y="363"
            width="40"
            height="12"
            rx="3"
            fill={
              isActive('svg-cockpit')
                ? 'rgba(56,189,248,0.2)'
                : 'rgba(14,32,54,0.6)'
            }
            stroke={getActiveStroke('svg-cockpit', '#3a5a80')}
            strokeWidth="1"
          />
        </SailboatPart>

        {/* === BARRE === */}
        <SailboatPart
          partId="svg-barre"
          label="Barre"
          isActive={isActive('svg-barre')}
          isSelected={selectedPartId === 'svg-barre'}
          cx={350}
          cy={374}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-barre', filter, isActive('svg-barre'))}
        >
          <line
            x1="340"
            y1="373"
            x2="368"
            y2="364"
            stroke={getActiveStroke('svg-barre', '#6a8ab0')}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle
            cx="368"
            cy="364"
            r="3"
            fill={getActiveStroke('svg-barre', '#6a8ab0')}
          />
        </SailboatPart>

        {/* === MÂT === */}
        <SailboatPart
          partId="svg-mat"
          label="Mât"
          isActive={isActive('svg-mat')}
          isSelected={selectedPartId === 'svg-mat'}
          cx={240}
          cy={55}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-mat', filter, isActive('svg-mat'))}
        >
          <line
            x1="250"
            y1="50"
            x2="250"
            y2="375"
            stroke={getActiveStroke('svg-mat', '#7a9abf')}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Mast head */}
          <circle
            cx="250"
            cy="48"
            r="4"
            fill={getActiveStroke('svg-mat', '#7a9abf')}
          />
        </SailboatPart>

        {/* === DRISSE DE GV === */}
        <SailboatPart
          partId="svg-drisse-gv"
          label="Drisse de GV"
          isActive={isActive('svg-drisse-gv')}
          isSelected={selectedPartId === 'svg-drisse-gv'}
          cx={260}
          cy={82}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-drisse-gv', filter, isActive('svg-drisse-gv'))}
        >
          <line
            x1="253"
            y1="52"
            x2="253"
            y2="365"
            stroke={getActiveStroke('svg-drisse-gv', '#5a7a9f')}
            strokeWidth={isActive('svg-drisse-gv') ? 1.8 : 1}
            strokeDasharray="6 4"
            opacity={isActive('svg-drisse-gv') ? 0.9 : 0.4}
          />
        </SailboatPart>

        {/* === GRAND-VOILE === */}
        <SailboatPart
          partId="svg-grand-voile"
          label="Grand-voile"
          isActive={isActive('svg-grand-voile')}
          isSelected={selectedPartId === 'svg-grand-voile'}
          cx={275}
          cy={165}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-grand-voile', filter, isActive('svg-grand-voile'))}
        >
          <path
            d="M 252 60 Q 275 130, 300 210 Q 318 275, 332 330 Q 338 348, 340 358 L 252 365 Z"
            fill={
              isActive('svg-grand-voile')
                ? 'url(#sail-gv-grad-active)'
                : 'url(#sail-gv-grad)'
            }
            stroke={getActiveStroke('svg-grand-voile', 'rgba(186,230,253,0.4)')}
            strokeWidth="1.5"
          />
          {/* Battens */}
          <line x1="252" y1="120" x2="288" y2="126" stroke="rgba(186,230,253,0.2)" strokeWidth="0.5" />
          <line x1="252" y1="180" x2="308" y2="192" stroke="rgba(186,230,253,0.2)" strokeWidth="0.5" />
          <line x1="252" y1="240" x2="323" y2="258" stroke="rgba(186,230,253,0.2)" strokeWidth="0.5" />
          <line x1="252" y1="300" x2="334" y2="322" stroke="rgba(186,230,253,0.2)" strokeWidth="0.5" />
          {/* Telltales */}
          <line x1="275" y1="155" x2="283" y2="153" stroke="#fb923c" strokeWidth="1.5" opacity="0.7" />
          <line x1="290" y1="230" x2="298" y2="228" stroke="#fb923c" strokeWidth="1.5" opacity="0.7" />
        </SailboatPart>

        {/* === BÔME === */}
        <SailboatPart
          partId="svg-bome"
          label="Bôme"
          isActive={isActive('svg-bome')}
          isSelected={selectedPartId === 'svg-bome'}
          cx={290}
          cy={319}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bome', filter, isActive('svg-bome'))}
        >
          <line
            x1="248"
            y1="362"
            x2="345"
            y2="355"
            stroke={getActiveStroke('svg-bome', '#7a9abf')}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </SailboatPart>

        {/* === HALE-BAS === */}
        <SailboatPart
          partId="svg-hale-bas"
          label="Hale-bas"
          isActive={isActive('svg-hale-bas')}
          isSelected={selectedPartId === 'svg-hale-bas'}
          cx={235}
          cy={330}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-hale-bas', filter, isActive('svg-hale-bas'))}
        >
          <line
            x1="280"
            y1="360"
            x2="250"
            y2="375"
            stroke={getActiveStroke('svg-hale-bas', '#6a8ab0')}
            strokeWidth={isActive('svg-hale-bas') ? 2 : 1.2}
            strokeLinecap="round"
          />
          {/* Small tackle indicator */}
          <circle
            cx="265"
            cy="367"
            r="2"
            fill={getActiveStroke('svg-hale-bas', '#6a8ab0')}
            opacity={isActive('svg-hale-bas') ? 1 : 0.5}
          />
        </SailboatPart>

        {/* === BALANCINE === */}
        <SailboatPart
          partId="svg-balancine"
          label="Balancine"
          isActive={isActive('svg-balancine')}
          isSelected={selectedPartId === 'svg-balancine'}
          cx={310}
          cy={231}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-balancine', filter, isActive('svg-balancine'))}
        >
          <line
            x1="250"
            y1="52"
            x2="345"
            y2="355"
            stroke={getActiveStroke('svg-balancine', '#4a6a8f')}
            strokeWidth={isActive('svg-balancine') ? 1.2 : 0.6}
            strokeDasharray="3 4"
            opacity={isActive('svg-balancine') ? 0.85 : 0.3}
          />
        </SailboatPart>

        {/* === ÉTAI === */}
        <SailboatPart
          partId="svg-etai"
          label="Étai"
          isActive={isActive('svg-etai')}
          isSelected={selectedPartId === 'svg-etai'}
          cx={110}
          cy={99}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-etai', filter, isActive('svg-etai'))}
        >
          <line
            x1="250"
            y1="52"
            x2="140"
            y2="370"
            stroke={getActiveStroke('svg-etai', '#5a7a9f')}
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
        </SailboatPart>

        {/* === GÉNOIS/FOC === */}
        <SailboatPart
          partId="svg-genois"
          label="Génois"
          isActive={isActive('svg-genois')}
          isSelected={selectedPartId === 'svg-genois'}
          cx={150}
          cy={176}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-genois', filter, isActive('svg-genois'))}
        >
          <path
            d="M 248 65 Q 205 150, 175 240 Q 160 300, 150 360 L 248 365 Q 246 210, 248 65 Z"
            fill={
              isActive('svg-genois')
                ? 'url(#sail-genois-grad-active)'
                : 'url(#sail-genois-grad)'
            }
            stroke={getActiveStroke('svg-genois', 'rgba(186,230,253,0.35)')}
            strokeWidth="1.5"
          />
          {/* Telltales */}
          <line x1="195" y1="200" x2="203" y2="198" stroke="#34d399" strokeWidth="1.5" opacity="0.7" />
          <line x1="180" y1="280" x2="188" y2="278" stroke="#34d399" strokeWidth="1.5" opacity="0.7" />
        </SailboatPart>

        {/* === SPINNAKER === */}
        <SailboatPart
          partId="svg-spinnaker"
          label="Spinnaker"
          isActive={isActive('svg-spinnaker')}
          isSelected={selectedPartId === 'svg-spinnaker'}
          cx={75}
          cy={121}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-spinnaker', filter, isActive('svg-spinnaker'))}
        >
          <path
            d="M 248 58 C 200 70, 100 100, 65 160 C 40 205, 45 260, 70 300 C 90 330, 115 350, 140 362 Q 190 365, 248 365 C 240 280, 230 180, 248 58 Z"
            fill={
              isActive('svg-spinnaker')
                ? 'url(#spinnaker-grad-active)'
                : 'url(#spinnaker-grad)'
            }
            stroke={
              isActive('svg-spinnaker')
                ? '#fbbf24'
                : 'rgba(251,146,60,0.35)'
            }
            strokeWidth="1.5"
          />
          {/* Panel seams on the spinnaker */}
          <path
            d="M 248 58 C 195 130, 110 220, 100 300"
            fill="none"
            stroke="rgba(251,146,60,0.15)"
            strokeWidth="0.5"
          />
          <path
            d="M 248 58 C 210 150, 140 260, 130 340"
            fill="none"
            stroke="rgba(251,146,60,0.15)"
            strokeWidth="0.5"
          />
          <path
            d="M 248 58 C 225 160, 190 280, 180 355"
            fill="none"
            stroke="rgba(251,146,60,0.12)"
            strokeWidth="0.5"
          />
        </SailboatPart>

        {/* === GENNAKER === */}
        <SailboatPart
          partId="svg-gennaker"
          label="Gennaker"
          isActive={isActive('svg-gennaker')}
          isSelected={selectedPartId === 'svg-gennaker'}
          cx={100}
          cy={154}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-gennaker', filter, isActive('svg-gennaker'))}
        >
          <path
            d="M 248 62 C 210 80, 125 120, 100 180 C 80 230, 90 285, 110 320 C 125 345, 135 358, 145 365 Q 195 367, 248 365 C 242 260, 238 150, 248 62 Z"
            fill={
              isActive('svg-gennaker')
                ? 'url(#gennaker-grad-active)'
                : 'url(#gennaker-grad)'
            }
            stroke={
              isActive('svg-gennaker')
                ? '#5eead4'
                : 'rgba(45,212,191,0.3)'
            }
            strokeWidth="1.5"
          />
          {/* Panel seam */}
          <path
            d="M 248 62 C 200 150, 140 270, 130 345"
            fill="none"
            stroke="rgba(45,212,191,0.12)"
            strokeWidth="0.5"
          />
        </SailboatPart>

        {/* === HAUBANS === */}
        <SailboatPart
          partId="svg-haubans"
          label="Haubans"
          isActive={isActive('svg-haubans')}
          isSelected={selectedPartId === 'svg-haubans'}
          cx={350}
          cy={192}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-haubans', filter, isActive('svg-haubans'))}
        >
          {/* Starboard shroud */}
          <line
            x1="250"
            y1="55"
            x2="340"
            y2="370"
            stroke={getActiveStroke('svg-haubans', '#4a6a8f')}
            strokeWidth="1.2"
          />
          {/* Port shroud */}
          <line
            x1="250"
            y1="55"
            x2="165"
            y2="370"
            stroke={getActiveStroke('svg-haubans', '#4a6a8f')}
            strokeWidth="1.2"
          />
          {/* Cap shrouds */}
          <line
            x1="250"
            y1="150"
            x2="330"
            y2="370"
            stroke={getActiveStroke('svg-haubans', '#3a5a7f')}
            strokeWidth="0.8"
            opacity="0.6"
          />
          <line
            x1="250"
            y1="150"
            x2="175"
            y2="370"
            stroke={getActiveStroke('svg-haubans', '#3a5a7f')}
            strokeWidth="0.8"
            opacity="0.6"
          />
        </SailboatPart>

        {/* === ÉCOUTE DE GV === */}
        <SailboatPart
          partId="svg-ecoute-gv"
          label="Écoute de GV"
          isActive={isActive('svg-ecoute-gv')}
          isSelected={selectedPartId === 'svg-ecoute-gv'}
          cx={320}
          cy={346}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-ecoute-gv', filter, isActive('svg-ecoute-gv'))}
        >
          <path
            d="M 342 355 Q 340 368 330 375 Q 320 380 315 375"
            fill="none"
            stroke={getActiveStroke('svg-ecoute-gv', '#6a8ab0')}
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle
            cx="315"
            cy="375"
            r="2.5"
            fill={getActiveStroke('svg-ecoute-gv', '#6a8ab0')}
          />
        </SailboatPart>

        {/* === PATARAS === */}
        <SailboatPart
          partId="svg-pataras"
          label="Pataras"
          isActive={isActive('svg-pataras')}
          isSelected={selectedPartId === 'svg-pataras'}
          cx={325}
          cy={165}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-pataras', filter, isActive('svg-pataras'))}
        >
          <line
            x1="250"
            y1="52"
            x2="355"
            y2="370"
            stroke={getActiveStroke('svg-pataras', '#4a6a8f')}
            strokeWidth={isActive('svg-pataras') ? 1.5 : 0.8}
            strokeDasharray="8 4"
            opacity={isActive('svg-pataras') ? 0.85 : 0.25}
          />
        </SailboatPart>

        {/* === GALHAUBAN === */}
        <SailboatPart
          partId="svg-galhauban"
          label="Galhauban"
          isActive={isActive('svg-galhauban')}
          isSelected={selectedPartId === 'svg-galhauban'}
          cx={330}
          cy={264}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-galhauban', filter, isActive('svg-galhauban'))}
        >
          <line
            x1="250"
            y1="150"
            x2="330"
            y2="370"
            stroke={getActiveStroke('svg-galhauban', '#3a5a7f')}
            strokeWidth={isActive('svg-galhauban') ? 1.5 : 0.8}
            opacity={isActive('svg-galhauban') ? 0.9 : 0.35}
          />
          <line
            x1="250"
            y1="150"
            x2="175"
            y2="370"
            stroke={getActiveStroke('svg-galhauban', '#3a5a7f')}
            strokeWidth={isActive('svg-galhauban') ? 1.5 : 0.8}
            opacity={isActive('svg-galhauban') ? 0.9 : 0.35}
          />
        </SailboatPart>

        {/* === TANGON === */}
        <SailboatPart
          partId="svg-tangon"
          label="Tangon"
          isActive={isActive('svg-tangon')}
          isSelected={selectedPartId === 'svg-tangon'}
          cx={140}
          cy={209}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-tangon', filter, isActive('svg-tangon'))}
        >
          <line
            x1="248"
            y1="200"
            x2="140"
            y2="210"
            stroke={getActiveStroke('svg-tangon', '#7a9abf')}
            strokeWidth={isActive('svg-tangon') ? 3 : 2}
            strokeLinecap="round"
            opacity={isActive('svg-tangon') ? 1 : 0.35}
          />
        </SailboatPart>

        {/* === BRAS DE SPI === */}
        <SailboatPart
          partId="svg-bras"
          label="Bras de spi"
          isActive={isActive('svg-bras')}
          isSelected={selectedPartId === 'svg-bras'}
          cx={125}
          cy={302}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bras', filter, isActive('svg-bras'))}
        >
          <path
            d="M 140 210 Q 180 310 310 370"
            fill="none"
            stroke={getActiveStroke('svg-bras', '#6a8ab0')}
            strokeWidth={isActive('svg-bras') ? 1.5 : 0.8}
            strokeDasharray="5 3"
            opacity={isActive('svg-bras') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === CUNNINGHAM === */}
        <SailboatPart
          partId="svg-cunningham"
          label="Cunningham"
          isActive={isActive('svg-cunningham')}
          isSelected={selectedPartId === 'svg-cunningham'}
          cx={245}
          cy={358}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-cunningham', filter, isActive('svg-cunningham'))}
        >
          <line
            x1="250"
            y1="360"
            x2="250"
            y2="374"
            stroke={getActiveStroke('svg-cunningham', '#6a8ab0')}
            strokeWidth={isActive('svg-cunningham') ? 2 : 1}
            strokeDasharray="3 2"
            opacity={isActive('svg-cunningham') ? 0.9 : 0.35}
          />
          <circle
            cx="250"
            cy="367"
            r={isActive('svg-cunningham') ? 2.5 : 1.5}
            fill={getActiveStroke('svg-cunningham', '#6a8ab0')}
            opacity={isActive('svg-cunningham') ? 1 : 0.4}
          />
        </SailboatPart>

        {/* === BOSSE DE RIS === */}
        <SailboatPart
          partId="svg-bosse-de-ris"
          label="Bosse de ris"
          isActive={isActive('svg-bosse-de-ris')}
          isSelected={selectedPartId === 'svg-bosse-de-ris'}
          cx={290}
          cy={308}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bosse-de-ris', filter, isActive('svg-bosse-de-ris'))}
        >
          <line
            x1="252"
            y1="330"
            x2="332"
            y2="338"
            stroke={getActiveStroke('svg-bosse-de-ris', '#6a8ab0')}
            strokeWidth={isActive('svg-bosse-de-ris') ? 1.5 : 0.8}
            strokeDasharray="3 3"
            opacity={isActive('svg-bosse-de-ris') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === ÉCOUTE (alias général) === */}
        <SailboatPart
          partId="svg-ecoute"
          label="Écoute"
          isActive={isActive('svg-ecoute')}
          isSelected={selectedPartId === 'svg-ecoute'}
          cx={300}
          cy={352}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-ecoute', filter, isActive('svg-ecoute'))}
        >
          <path
            d="M 155 362 Q 200 380 310 375"
            fill="none"
            stroke={getActiveStroke('svg-ecoute', '#6a8ab0')}
            strokeWidth={isActive('svg-ecoute') ? 1.5 : 0.8}
            strokeDasharray="4 2"
            opacity={isActive('svg-ecoute') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === DRISSE (alias général) === */}
        <SailboatPart
          partId="svg-drisse"
          label="Drisse"
          isActive={isActive('svg-drisse')}
          isSelected={selectedPartId === 'svg-drisse'}
          cx={260}
          cy={66}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-drisse', filter, isActive('svg-drisse'))}
        >
          <line
            x1="247"
            y1="52"
            x2="247"
            y2="365"
            stroke={getActiveStroke('svg-drisse', '#5a7a9f')}
            strokeWidth={isActive('svg-drisse') ? 1.8 : 0.8}
            strokeDasharray="6 4"
            opacity={isActive('svg-drisse') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === HAUBAN (alias singulier) === */}
        <SailboatPart
          partId="svg-hauban"
          label="Hauban"
          isActive={isActive('svg-hauban')}
          isSelected={selectedPartId === 'svg-hauban'}
          cx={340}
          cy={198}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-hauban', filter, isActive('svg-hauban'))}
        >
          <line
            x1="250"
            y1="55"
            x2="340"
            y2="370"
            stroke={getActiveStroke('svg-hauban', '#4a6a8f')}
            strokeWidth={isActive('svg-hauban') ? 1.5 : 0.8}
            opacity={isActive('svg-hauban') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === MANILLE === */}
        <SailboatPart
          partId="svg-manille"
          label="Manille"
          isActive={isActive('svg-manille')}
          isSelected={selectedPartId === 'svg-manille'}
          cx={250}
          cy={346}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-manille', filter, isActive('svg-manille'))}
        >
          <path
            d="M 247 362 Q 244 358 247 354 Q 250 358 253 362"
            fill="none"
            stroke={getActiveStroke('svg-manille', '#6a8ab0')}
            strokeWidth={isActive('svg-manille') ? 2 : 1}
            opacity={isActive('svg-manille') ? 1 : 0.35}
          />
          <line
            x1="244"
            y1="362"
            x2="253"
            y2="362"
            stroke={getActiveStroke('svg-manille', '#6a8ab0')}
            strokeWidth={isActive('svg-manille') ? 2 : 1}
            opacity={isActive('svg-manille') ? 1 : 0.35}
          />
        </SailboatPart>

        {/* === POULIE === */}
        <SailboatPart
          partId="svg-poulie"
          label="Poulie"
          isActive={isActive('svg-poulie')}
          isSelected={selectedPartId === 'svg-poulie'}
          cx={350}
          cy={346}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-poulie', filter, isActive('svg-poulie'))}
        >
          <circle
            cx="345"
            cy="355"
            r={isActive('svg-poulie') ? 5 : 3.5}
            fill="none"
            stroke={getActiveStroke('svg-poulie', '#6a8ab0')}
            strokeWidth={isActive('svg-poulie') ? 1.5 : 0.8}
            opacity={isActive('svg-poulie') ? 1 : 0.35}
          />
          <circle
            cx="345"
            cy="355"
            r="1"
            fill={getActiveStroke('svg-poulie', '#6a8ab0')}
            opacity={isActive('svg-poulie') ? 1 : 0.35}
          />
        </SailboatPart>

        {/* === FOC (alias for genois) === */}
        <SailboatPart
          partId="svg-foc"
          label="Foc"
          isActive={isActive('svg-foc')}
          isSelected={selectedPartId === 'svg-foc'}
          cx={140}
          cy={182}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-foc', filter, isActive('svg-foc'))}
        >
          <path
            d="M 248 65 Q 205 150, 175 240 Q 160 300, 150 360 L 248 365 Q 246 210, 248 65 Z"
            fill="none"
            stroke={getActiveStroke('svg-foc', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-foc') ? 2 : 0.8}
            opacity={isActive('svg-foc') ? 0.8 : 0.15}
          />
        </SailboatPart>

        {/* === TOURMENTIN === */}
        <SailboatPart
          partId="svg-tourmentin"
          label="Tourmentin"
          isActive={isActive('svg-tourmentin')}
          isSelected={selectedPartId === 'svg-tourmentin'}
          cx={160}
          cy={275}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-tourmentin', filter, isActive('svg-tourmentin'))}
        >
          <path
            d="M 248 180 L 195 340 L 248 345 Z"
            fill={isActive('svg-tourmentin') ? 'rgba(56,189,248,0.15)' : 'rgba(186,230,253,0.05)'}
            stroke={getActiveStroke('svg-tourmentin', 'rgba(186,230,253,0.3)')}
            strokeWidth={isActive('svg-tourmentin') ? 1.5 : 0.6}
            opacity={isActive('svg-tourmentin') ? 0.8 : 0.2}
          />
        </SailboatPart>

        {/* === TRINQUETTE === */}
        <SailboatPart
          partId="svg-trinquette"
          label="Trinquette"
          isActive={isActive('svg-trinquette')}
          isSelected={selectedPartId === 'svg-trinquette'}
          cx={175}
          cy={209}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-trinquette', filter, isActive('svg-trinquette'))}
        >
          <path
            d="M 248 100 L 185 340 L 248 350 Z"
            fill={isActive('svg-trinquette') ? 'rgba(56,189,248,0.12)' : 'rgba(186,230,253,0.04)'}
            stroke={getActiveStroke('svg-trinquette', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-trinquette') ? 1.5 : 0.6}
            opacity={isActive('svg-trinquette') ? 0.8 : 0.2}
          />
        </SailboatPart>

        {/* === LAZY BAG === */}
        <SailboatPart
          partId="svg-lazy-bag"
          label="Lazy bag"
          isActive={isActive('svg-lazy-bag')}
          isSelected={selectedPartId === 'svg-lazy-bag'}
          cx={295}
          cy={341}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-lazy-bag', filter, isActive('svg-lazy-bag'))}
        >
          <rect
            x="270"
            y="354"
            width="60"
            height="6"
            rx="3"
            fill={isActive('svg-lazy-bag') ? 'rgba(56,189,248,0.2)' : 'rgba(74,122,181,0.1)'}
            stroke={getActiveStroke('svg-lazy-bag', '#4a6a8f')}
            strokeWidth={isActive('svg-lazy-bag') ? 1.2 : 0.6}
            opacity={isActive('svg-lazy-bag') ? 0.9 : 0.3}
          />
        </SailboatPart>

        {/* === GUINDANT (leading edge of mainsail along mast) === */}
        <SailboatPart
          partId="svg-guindant"
          label="Guindant"
          isActive={isActive('svg-guindant')}
          isSelected={selectedPartId === 'svg-guindant'}
          cx={250}
          cy={192}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-guindant', filter, isActive('svg-guindant'))}
        >
          <line
            x1="252"
            y1="60"
            x2="252"
            y2="365"
            stroke={getActiveStroke('svg-guindant', 'rgba(186,230,253,0.3)')}
            strokeWidth={isActive('svg-guindant') ? 3 : 1}
            opacity={isActive('svg-guindant') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === CHUTE (trailing edge of mainsail) === */}
        <SailboatPart
          partId="svg-chute"
          label="Chute"
          isActive={isActive('svg-chute')}
          isSelected={selectedPartId === 'svg-chute'}
          cx={300}
          cy={192}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-chute', filter, isActive('svg-chute'))}
        >
          <path
            d="M 252 60 Q 275 130, 300 210 Q 318 275, 332 330 Q 338 348, 340 358"
            fill="none"
            stroke={getActiveStroke('svg-chute', 'rgba(186,230,253,0.3)')}
            strokeWidth={isActive('svg-chute') ? 3 : 1}
            opacity={isActive('svg-chute') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === BORDURE (bottom edge of mainsail along boom) === */}
        <SailboatPart
          partId="svg-bordure"
          label="Bordure"
          isActive={isActive('svg-bordure')}
          isSelected={selectedPartId === 'svg-bordure'}
          cx={285}
          cy={352}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bordure', filter, isActive('svg-bordure'))}
        >
          <line
            x1="252"
            y1="365"
            x2="340"
            y2="358"
            stroke={getActiveStroke('svg-bordure', 'rgba(186,230,253,0.3)')}
            strokeWidth={isActive('svg-bordure') ? 3 : 1}
            opacity={isActive('svg-bordure') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === LATTES (battens in the mainsail) === */}
        <SailboatPart
          partId="svg-lattes"
          label="Lattes"
          isActive={isActive('svg-lattes')}
          isSelected={selectedPartId === 'svg-lattes'}
          cx={280}
          cy={154}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-lattes', filter, isActive('svg-lattes'))}
        >
          <line x1="252" y1="120" x2="288" y2="126"
            stroke={getActiveStroke('svg-lattes', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-lattes') ? 1.5 : 0.5}
            opacity={isActive('svg-lattes') ? 0.9 : 0.25}
          />
          <line x1="252" y1="180" x2="308" y2="192"
            stroke={getActiveStroke('svg-lattes', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-lattes') ? 1.5 : 0.5}
            opacity={isActive('svg-lattes') ? 0.9 : 0.25}
          />
          <line x1="252" y1="240" x2="323" y2="258"
            stroke={getActiveStroke('svg-lattes', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-lattes') ? 1.5 : 0.5}
            opacity={isActive('svg-lattes') ? 0.9 : 0.25}
          />
          <line x1="252" y1="300" x2="334" y2="322"
            stroke={getActiveStroke('svg-lattes', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-lattes') ? 1.5 : 0.5}
            opacity={isActive('svg-lattes') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === POINT D'AMURE (lower-front corner of sail) === */}
        <SailboatPart
          partId="svg-point-amure"
          label="Point d'amure"
          isActive={isActive('svg-point-amure')}
          isSelected={selectedPartId === 'svg-point-amure'}
          cx={245}
          cy={363}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-point-amure', filter, isActive('svg-point-amure'))}
        >
          <circle
            cx="250"
            cy="363"
            r={isActive('svg-point-amure') ? 5 : 3}
            fill={isActive('svg-point-amure') ? activeColor : '#5a7a9f'}
            opacity={isActive('svg-point-amure') ? 1 : 0.3}
          />
        </SailboatPart>

        {/* === POINT D'ÉCOUTE (lower-back corner of sail) === */}
        <SailboatPart
          partId="svg-point-ecoute"
          label="Point d'écoute"
          isActive={isActive('svg-point-ecoute')}
          isSelected={selectedPartId === 'svg-point-ecoute'}
          cx={345}
          cy={352}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-point-ecoute', filter, isActive('svg-point-ecoute'))}
        >
          <circle
            cx="342"
            cy="356"
            r={isActive('svg-point-ecoute') ? 5 : 3}
            fill={isActive('svg-point-ecoute') ? activeColor : '#5a7a9f'}
            opacity={isActive('svg-point-ecoute') ? 1 : 0.3}
          />
        </SailboatPart>

        {/* === POINT DE DRISSE (top corner of sail) === */}
        <SailboatPart
          partId="svg-point-drisse"
          label="Point de drisse"
          isActive={isActive('svg-point-drisse')}
          isSelected={selectedPartId === 'svg-point-drisse'}
          cx={250}
          cy={44}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-point-drisse', filter, isActive('svg-point-drisse'))}
        >
          <circle
            cx="252"
            cy="58"
            r={isActive('svg-point-drisse') ? 5 : 3}
            fill={isActive('svg-point-drisse') ? activeColor : '#5a7a9f'}
            opacity={isActive('svg-point-drisse') ? 1 : 0.3}
          />
        </SailboatPart>

        {/* === ROOF === */}
        <SailboatPart
          partId="svg-roof"
          label="Roof"
          isActive={isActive('svg-roof')}
          isSelected={selectedPartId === 'svg-roof'}
          cx={270}
          cy={363}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-roof', filter, isActive('svg-roof'))}
        >
          <rect
            x="255"
            y="360"
            width="35"
            height="10"
            rx="2"
            fill={isActive('svg-roof') ? 'rgba(56,189,248,0.2)' : 'rgba(14,32,54,0.5)'}
            stroke={getActiveStroke('svg-roof', '#3a5a80')}
            strokeWidth={isActive('svg-roof') ? 1.2 : 0.6}
            opacity={isActive('svg-roof') ? 0.9 : 0.35}
          />
        </SailboatPart>

        {/* === PONT === */}
        <SailboatPart
          partId="svg-pont"
          label="Pont"
          isActive={isActive('svg-pont')}
          isSelected={selectedPartId === 'svg-pont'}
          cx={225}
          cy={358}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-pont', filter, isActive('svg-pont'))}
        >
          <path
            d="M 145 365 Q 200 358 250 356 Q 300 358 350 365"
            fill="none"
            stroke={getActiveStroke('svg-pont', '#4a7ab5')}
            strokeWidth={isActive('svg-pont') ? 2 : 0.8}
            strokeDasharray="3 3"
            opacity={isActive('svg-pont') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === BASTINGAGE === */}
        <SailboatPart
          partId="svg-bastingage"
          label="Bastingage"
          isActive={isActive('svg-bastingage')}
          isSelected={selectedPartId === 'svg-bastingage'}
          cx={190}
          cy={363}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bastingage', filter, isActive('svg-bastingage'))}
        >
          <path
            d="M 145 368 Q 200 361 250 359 Q 300 361 348 368"
            fill="none"
            stroke={getActiveStroke('svg-bastingage', '#4a6a8f')}
            strokeWidth={isActive('svg-bastingage') ? 1.5 : 0.6}
            opacity={isActive('svg-bastingage') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === CHANDELIER === */}
        <SailboatPart
          partId="svg-chandelier"
          label="Chandelier"
          isActive={isActive('svg-chandelier')}
          isSelected={selectedPartId === 'svg-chandelier'}
          cx={175}
          cy={352}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-chandelier', filter, isActive('svg-chandelier'))}
        >
          <line x1="175" y1="367" x2="175" y2="358"
            stroke={getActiveStroke('svg-chandelier', '#4a6a8f')}
            strokeWidth={isActive('svg-chandelier') ? 1.5 : 0.8}
            opacity={isActive('svg-chandelier') ? 0.9 : 0.3}
          />
          <line x1="210" y1="364" x2="210" y2="355"
            stroke={getActiveStroke('svg-chandelier', '#4a6a8f')}
            strokeWidth={isActive('svg-chandelier') ? 1.5 : 0.8}
            opacity={isActive('svg-chandelier') ? 0.9 : 0.3}
          />
          <line x1="295" y1="364" x2="295" y2="355"
            stroke={getActiveStroke('svg-chandelier', '#4a6a8f')}
            strokeWidth={isActive('svg-chandelier') ? 1.5 : 0.8}
            opacity={isActive('svg-chandelier') ? 0.9 : 0.3}
          />
          <line x1="330" y1="367" x2="330" y2="358"
            stroke={getActiveStroke('svg-chandelier', '#4a6a8f')}
            strokeWidth={isActive('svg-chandelier') ? 1.5 : 0.8}
            opacity={isActive('svg-chandelier') ? 0.9 : 0.3}
          />
        </SailboatPart>

        {/* === FILIÈRE === */}
        <SailboatPart
          partId="svg-filiere"
          label="Filière"
          isActive={isActive('svg-filiere')}
          isSelected={selectedPartId === 'svg-filiere'}
          cx={165}
          cy={346}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-filiere', filter, isActive('svg-filiere'))}
        >
          <path
            d="M 175 358 L 210 355 Q 250 354 295 355 L 330 358"
            fill="none"
            stroke={getActiveStroke('svg-filiere', '#4a6a8f')}
            strokeWidth={isActive('svg-filiere') ? 1.2 : 0.5}
            opacity={isActive('svg-filiere') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === WINCH === */}
        <SailboatPart
          partId="svg-winch"
          label="Winch"
          isActive={isActive('svg-winch')}
          isSelected={selectedPartId === 'svg-winch'}
          cx={310}
          cy={368}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-winch', filter, isActive('svg-winch'))}
        >
          <circle
            cx="305"
            cy="367"
            r={isActive('svg-winch') ? 4 : 3}
            fill={isActive('svg-winch') ? 'rgba(56,189,248,0.3)' : 'rgba(14,32,54,0.6)'}
            stroke={getActiveStroke('svg-winch', '#5a7a9f')}
            strokeWidth={isActive('svg-winch') ? 1.2 : 0.6}
            opacity={isActive('svg-winch') ? 1 : 0.4}
          />
          <circle
            cx="295"
            cy="367"
            r={isActive('svg-winch') ? 4 : 3}
            fill={isActive('svg-winch') ? 'rgba(56,189,248,0.3)' : 'rgba(14,32,54,0.6)'}
            stroke={getActiveStroke('svg-winch', '#5a7a9f')}
            strokeWidth={isActive('svg-winch') ? 1.2 : 0.6}
            opacity={isActive('svg-winch') ? 1 : 0.4}
          />
        </SailboatPart>

        {/* === TAQUET === */}
        <SailboatPart
          partId="svg-taquet"
          label="Taquet"
          isActive={isActive('svg-taquet')}
          isSelected={selectedPartId === 'svg-taquet'}
          cx={275}
          cy={368}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-taquet', filter, isActive('svg-taquet'))}
        >
          {/* T-shape cleat */}
          <line x1="266" y1="367" x2="274" y2="367"
            stroke={getActiveStroke('svg-taquet', '#5a7a9f')}
            strokeWidth={isActive('svg-taquet') ? 2 : 1}
            opacity={isActive('svg-taquet') ? 1 : 0.35}
          />
          <line x1="270" y1="367" x2="270" y2="372"
            stroke={getActiveStroke('svg-taquet', '#5a7a9f')}
            strokeWidth={isActive('svg-taquet') ? 2 : 1}
            opacity={isActive('svg-taquet') ? 1 : 0.35}
          />
        </SailboatPart>

        {/* === PUITS DE DÉRIVE === */}
        <SailboatPart
          partId="svg-puits-de-derive"
          label="Puits de dérive"
          isActive={isActive('svg-puits-de-derive')}
          isSelected={selectedPartId === 'svg-puits-de-derive'}
          cx={250}
          cy={429}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-puits-de-derive', filter, isActive('svg-puits-de-derive'))}
        >
          <rect
            x="243"
            y="405"
            width="14"
            height="18"
            rx="1"
            fill="none"
            stroke={getActiveStroke('svg-puits-de-derive', '#3a5a7f')}
            strokeWidth={isActive('svg-puits-de-derive') ? 1.2 : 0.6}
            strokeDasharray="3 2"
            opacity={isActive('svg-puits-de-derive') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === TABLEAU ARRIÈRE === */}
        <SailboatPart
          partId="svg-tableau-arriere"
          label="Tableau arrière"
          isActive={isActive('svg-tableau-arriere')}
          isSelected={selectedPartId === 'svg-tableau-arriere'}
          cx={340}
          cy={385}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-tableau-arriere', filter, isActive('svg-tableau-arriere'))}
        >
          <line
            x1="355"
            y1="370"
            x2="358"
            y2="395"
            stroke={getActiveStroke('svg-tableau-arriere', '#5a8abf')}
            strokeWidth={isActive('svg-tableau-arriere') ? 3 : 1.5}
            strokeLinecap="round"
            opacity={isActive('svg-tableau-arriere') ? 1 : 0.35}
          />
        </SailboatPart>

        {/* === LIGNE DE FLOTTAISON === */}
        <SailboatPart
          partId="svg-ligne-de-flottaison"
          label="Ligne de flottaison"
          isActive={isActive('svg-ligne-de-flottaison')}
          isSelected={selectedPartId === 'svg-ligne-de-flottaison'}
          cx={250}
          cy={402}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-ligne-de-flottaison', filter, isActive('svg-ligne-de-flottaison'))}
        >
          <path
            d="M 135 395 Q 200 400 250 401 Q 310 400 355 395"
            fill="none"
            stroke={getActiveStroke('svg-ligne-de-flottaison', '#0ea5e9')}
            strokeWidth={isActive('svg-ligne-de-flottaison') ? 2.5 : 1}
            opacity={isActive('svg-ligne-de-flottaison') ? 0.9 : 0.3}
          />
        </SailboatPart>

        {/* === COMPAS === */}
        <SailboatPart
          partId="svg-compas"
          label="Compas"
          isActive={isActive('svg-compas')}
          isSelected={selectedPartId === 'svg-compas'}
          cx={330}
          cy={374}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-compas', filter, isActive('svg-compas'))}
        >
          <circle
            cx="325"
            cy="370"
            r={isActive('svg-compas') ? 5 : 3.5}
            fill={isActive('svg-compas') ? 'rgba(56,189,248,0.2)' : 'rgba(14,32,54,0.5)'}
            stroke={getActiveStroke('svg-compas', '#5a7a9f')}
            strokeWidth={isActive('svg-compas') ? 1.2 : 0.6}
            opacity={isActive('svg-compas') ? 1 : 0.35}
          />
          {/* N indicator */}
          <line
            x1="325"
            y1="370"
            x2="325"
            y2={isActive('svg-compas') ? 366 : 367.5}
            stroke={getActiveStroke('svg-compas', '#ef4444')}
            strokeWidth={isActive('svg-compas') ? 1.2 : 0.6}
            opacity={isActive('svg-compas') ? 1 : 0.35}
          />
        </SailboatPart>

        {/* === SONDEUR === */}
        <SailboatPart
          partId="svg-sondeur"
          label="Sondeur"
          isActive={isActive('svg-sondeur')}
          isSelected={selectedPartId === 'svg-sondeur'}
          cx={240}
          cy={429}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-sondeur', filter, isActive('svg-sondeur'))}
        >
          {/* Small sensor under hull */}
          <rect
            x="237"
            y="416"
            width="8"
            height="4"
            rx="1"
            fill={isActive('svg-sondeur') ? activeColor : '#3a5a7f'}
            opacity={isActive('svg-sondeur') ? 0.9 : 0.3}
          />
          {/* Sound wave arcs */}
          <path
            d="M 238 422 Q 241 425 244 422"
            fill="none"
            stroke={getActiveStroke('svg-sondeur', '#3a5a7f')}
            strokeWidth={isActive('svg-sondeur') ? 1 : 0.5}
            opacity={isActive('svg-sondeur') ? 0.8 : 0.2}
          />
        </SailboatPart>

        {/* === LOCH === */}
        <SailboatPart
          partId="svg-loch"
          label="Loch"
          isActive={isActive('svg-loch')}
          isSelected={selectedPartId === 'svg-loch'}
          cx={260}
          cy={429}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-loch', filter, isActive('svg-loch'))}
        >
          {/* Small propeller symbol under hull */}
          <circle
            cx="258"
            cy="418"
            r={isActive('svg-loch') ? 3.5 : 2.5}
            fill="none"
            stroke={getActiveStroke('svg-loch', '#3a5a7f')}
            strokeWidth={isActive('svg-loch') ? 1 : 0.5}
            opacity={isActive('svg-loch') ? 0.9 : 0.25}
          />
          {/* Propeller blades */}
          <line x1="256" y1="416" x2="260" y2="420"
            stroke={getActiveStroke('svg-loch', '#3a5a7f')}
            strokeWidth={isActive('svg-loch') ? 1 : 0.5}
            opacity={isActive('svg-loch') ? 0.9 : 0.25}
          />
          <line x1="260" y1="416" x2="256" y2="420"
            stroke={getActiveStroke('svg-loch', '#3a5a7f')}
            strokeWidth={isActive('svg-loch') ? 1 : 0.5}
            opacity={isActive('svg-loch') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === CHARIOT D'ÉCOUTE === */}
        <SailboatPart
          partId="svg-chariot-ecoute"
          label="Chariot d'écoute"
          isActive={isActive('svg-chariot-ecoute')}
          isSelected={selectedPartId === 'svg-chariot-ecoute'}
          cx={320}
          cy={374}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-chariot-ecoute', filter, isActive('svg-chariot-ecoute'))}
        >
          <line
            x1="302"
            y1="372"
            x2="338"
            y2="372"
            stroke={getActiveStroke('svg-chariot-ecoute', '#5a7a9f')}
            strokeWidth={isActive('svg-chariot-ecoute') ? 2 : 1}
            opacity={isActive('svg-chariot-ecoute') ? 0.9 : 0.3}
          />
          {/* Sliding car */}
          <rect
            x="316"
            y="370"
            width="6"
            height="4"
            rx="1"
            fill={getActiveStroke('svg-chariot-ecoute', '#5a7a9f')}
            opacity={isActive('svg-chariot-ecoute') ? 0.9 : 0.3}
          />
        </SailboatPart>

        {/* === APPENDICES (near quille, slightly left-up) === */}
        <SailboatPart
          partId="svg-appendices"
          label="Appendices"
          isActive={isActive('svg-appendices')}
          isSelected={selectedPartId === 'svg-appendices'}
          cx={230}
          cy={473}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-appendices', filter, isActive('svg-appendices'))}
        >
          <line
            x1="228" y1="415" x2="228" y2="445"
            stroke={getActiveStroke('svg-appendices', '#2a4a6b')}
            strokeWidth={isActive('svg-appendices') ? 1.5 : 0.6}
            strokeDasharray="3 2"
            opacity={isActive('svg-appendices') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === BULBE (below quille bulb) === */}
        <SailboatPart
          partId="svg-bulbe"
          label="Bulbe"
          isActive={isActive('svg-bulbe')}
          isSelected={selectedPartId === 'svg-bulbe'}
          cx={250}
          cy={506}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bulbe', filter, isActive('svg-bulbe'))}
        >
          <ellipse
            cx="250" cy="488"
            rx={isActive('svg-bulbe') ? 14 : 10}
            ry={isActive('svg-bulbe') ? 4 : 3}
            fill="none"
            stroke={getActiveStroke('svg-bulbe', '#2a4a6b')}
            strokeWidth={isActive('svg-bulbe') ? 1.2 : 0.5}
            opacity={isActive('svg-bulbe') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === LEST (right of quille) === */}
        <SailboatPart
          partId="svg-lest"
          label="Lest"
          isActive={isActive('svg-lest')}
          isSelected={selectedPartId === 'svg-lest'}
          cx={270}
          cy={495}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-lest', filter, isActive('svg-lest'))}
        >
          <rect
            x="264" y="470" width="10" height="14" rx="1"
            fill="none"
            stroke={getActiveStroke('svg-lest', '#2a4a6b')}
            strokeWidth={isActive('svg-lest') ? 1.2 : 0.5}
            strokeDasharray="2 2"
            opacity={isActive('svg-lest') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === FOIL (left of quille, angled) === */}
        <SailboatPart
          partId="svg-foil"
          label="Foil"
          isActive={isActive('svg-foil')}
          isSelected={selectedPartId === 'svg-foil'}
          cx={230}
          cy={500}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-foil', filter, isActive('svg-foil'))}
        >
          <line
            x1="222" y1="420" x2="210" y2="450"
            stroke={getActiveStroke('svg-foil', '#2a4a6b')}
            strokeWidth={isActive('svg-foil') ? 1.5 : 0.6}
            opacity={isActive('svg-foil') ? 0.9 : 0.2}
          />
          <circle
            cx="210" cy="450"
            r={isActive('svg-foil') ? 2.5 : 1.5}
            fill={getActiveStroke('svg-foil', '#2a4a6b')}
            opacity={isActive('svg-foil') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === VOILE DE QUILLE (along quille shaft) === */}
        <SailboatPart
          partId="svg-voile-de-quille"
          label="Voile de quille"
          isActive={isActive('svg-voile-de-quille')}
          isSelected={selectedPartId === 'svg-voile-de-quille'}
          cx={265}
          cy={473}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-voile-de-quille', filter, isActive('svg-voile-de-quille'))}
        >
          <line
            x1="256" y1="415" x2="262" y2="470"
            stroke={getActiveStroke('svg-voile-de-quille', '#2a4a6b')}
            strokeWidth={isActive('svg-voile-de-quille') ? 1.5 : 0.6}
            opacity={isActive('svg-voile-de-quille') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === BOUT (near écoute, slightly up-left) === */}
        <SailboatPart
          partId="svg-bout"
          label="Bout"
          isActive={isActive('svg-bout')}
          isSelected={selectedPartId === 'svg-bout'}
          cx={285}
          cy={341}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bout', filter, isActive('svg-bout'))}
        >
          <line
            x1="270" y1="378" x2="295" y2="378"
            stroke={getActiveStroke('svg-bout', '#6a8ab0')}
            strokeWidth={isActive('svg-bout') ? 1.5 : 0.6}
            strokeDasharray="4 2"
            opacity={isActive('svg-bout') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === CORDAGE (near écoute, slightly right) === */}
        <SailboatPart
          partId="svg-cordage"
          label="Cordage"
          isActive={isActive('svg-cordage')}
          isSelected={selectedPartId === 'svg-cordage'}
          cx={315}
          cy={341}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-cordage', filter, isActive('svg-cordage'))}
        >
          <path
            d="M 320 372 Q 325 378 330 372"
            fill="none"
            stroke={getActiveStroke('svg-cordage', '#6a8ab0')}
            strokeWidth={isActive('svg-cordage') ? 1.2 : 0.5}
            opacity={isActive('svg-cordage') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === AUSSIÈRE (near écoute, lower-left) === */}
        <SailboatPart
          partId="svg-aussiere"
          label="Aussière"
          isActive={isActive('svg-aussiere')}
          isSelected={selectedPartId === 'svg-aussiere'}
          cx={285}
          cy={363}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-aussiere', filter, isActive('svg-aussiere'))}
        >
          <line
            x1="268" y1="382" x2="298" y2="384"
            stroke={getActiveStroke('svg-aussiere', '#6a8ab0')}
            strokeWidth={isActive('svg-aussiere') ? 2 : 0.8}
            opacity={isActive('svg-aussiere') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === AMARRE (near écoute, lower-right) === */}
        <SailboatPart
          partId="svg-amarre"
          label="Amarre"
          isActive={isActive('svg-amarre')}
          isSelected={selectedPartId === 'svg-amarre'}
          cx={315}
          cy={363}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-amarre', filter, isActive('svg-amarre'))}
        >
          <path
            d="M 322 378 Q 328 382 334 378"
            fill="none"
            stroke={getActiveStroke('svg-amarre', '#6a8ab0')}
            strokeWidth={isActive('svg-amarre') ? 1.5 : 0.6}
            opacity={isActive('svg-amarre') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === CORDE (near écoute, below) === */}
        <SailboatPart
          partId="svg-corde"
          label="Corde"
          isActive={isActive('svg-corde')}
          isSelected={selectedPartId === 'svg-corde'}
          cx={300}
          cy={368}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-corde', filter, isActive('svg-corde'))}
        >
          <line
            x1="295" y1="384" x2="310" y2="384"
            stroke={getActiveStroke('svg-corde', '#6a8ab0')}
            strokeWidth={isActive('svg-corde') ? 1.2 : 0.5}
            strokeDasharray="2 3"
            opacity={isActive('svg-corde') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === TRIBORD (right side of hull) === */}
        <SailboatPart
          partId="svg-tribord"
          label="Tribord"
          isActive={isActive('svg-tribord')}
          isSelected={selectedPartId === 'svg-tribord'}
          cx={270}
          cy={385}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-tribord', filter, isActive('svg-tribord'))}
        >
          <path
            d="M 290 380 Q 330 385 350 390"
            fill="none"
            stroke={getActiveStroke('svg-tribord', '#4a7ab5')}
            strokeWidth={isActive('svg-tribord') ? 2 : 0.8}
            opacity={isActive('svg-tribord') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === BÂBORD (left side of hull) === */}
        <SailboatPart
          partId="svg-babord"
          label="Bâbord"
          isActive={isActive('svg-babord')}
          isSelected={selectedPartId === 'svg-babord'}
          cx={230}
          cy={385}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-babord', filter, isActive('svg-babord'))}
        >
          <path
            d="M 210 380 Q 170 385 150 390"
            fill="none"
            stroke={getActiveStroke('svg-babord', '#4a7ab5')}
            strokeWidth={isActive('svg-babord') ? 2 : 0.8}
            opacity={isActive('svg-babord') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === BOUCHAIN (hull angle, lower-left) === */}
        <SailboatPart
          partId="svg-bouchain"
          label="Bouchain"
          isActive={isActive('svg-bouchain')}
          isSelected={selectedPartId === 'svg-bouchain'}
          cx={235}
          cy={407}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bouchain', filter, isActive('svg-bouchain'))}
        >
          <path
            d="M 180 405 Q 175 400 180 395"
            fill="none"
            stroke={getActiveStroke('svg-bouchain', '#4a7ab5')}
            strokeWidth={isActive('svg-bouchain') ? 1.5 : 0.6}
            opacity={isActive('svg-bouchain') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === CARÈNE (underwater hull area) === */}
        <SailboatPart
          partId="svg-carene"
          label="Carène"
          isActive={isActive('svg-carene')}
          isSelected={selectedPartId === 'svg-carene'}
          cx={265}
          cy={407}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-carene', filter, isActive('svg-carene'))}
        >
          <path
            d="M 170 400 Q 250 410 330 400"
            fill="none"
            stroke={getActiveStroke('svg-carene', '#4a7ab5')}
            strokeWidth={isActive('svg-carene') ? 1.5 : 0.6}
            strokeDasharray="4 3"
            opacity={isActive('svg-carene') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === FRANC-BORD (between waterline and deck) === */}
        <SailboatPart
          partId="svg-franc-bord"
          label="Franc-bord"
          isActive={isActive('svg-franc-bord')}
          isSelected={selectedPartId === 'svg-franc-bord'}
          cx={250}
          cy={379}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-franc-bord', filter, isActive('svg-franc-bord'))}
        >
          <line
            x1="320" y1="370" x2="320" y2="392"
            stroke={getActiveStroke('svg-franc-bord', '#4a7ab5')}
            strokeWidth={isActive('svg-franc-bord') ? 1.5 : 0.6}
            strokeDasharray="2 2"
            opacity={isActive('svg-franc-bord') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === ÉTRAVE (bow edge, slightly left of proue) === */}
        <SailboatPart
          partId="svg-etrave"
          label="Étrave"
          isActive={isActive('svg-etrave')}
          isSelected={selectedPartId === 'svg-etrave'}
          cx={95}
          cy={330}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-etrave', filter, isActive('svg-etrave'))}
        >
          <line
            x1="135" y1="372" x2="130" y2="390"
            stroke={getActiveStroke('svg-etrave', '#5a8abf')}
            strokeWidth={isActive('svg-etrave') ? 2.5 : 1}
            strokeLinecap="round"
            opacity={isActive('svg-etrave') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === BOUT-DEHORS (extending forward from bow) === */}
        <SailboatPart
          partId="svg-bout-dehors"
          label="Bout-dehors"
          isActive={isActive('svg-bout-dehors')}
          isSelected={selectedPartId === 'svg-bout-dehors'}
          cx={95}
          cy={352}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bout-dehors', filter, isActive('svg-bout-dehors'))}
        >
          <line
            x1="135" y1="375" x2="110" y2="380"
            stroke={getActiveStroke('svg-bout-dehors', '#7a9abf')}
            strokeWidth={isActive('svg-bout-dehors') ? 2.5 : 1.2}
            strokeLinecap="round"
            opacity={isActive('svg-bout-dehors') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === GUINDEAU (on foredeck) === */}
        <SailboatPart
          partId="svg-guindeau"
          label="Guindeau"
          isActive={isActive('svg-guindeau')}
          isSelected={selectedPartId === 'svg-guindeau'}
          cx={125}
          cy={330}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-guindeau', filter, isActive('svg-guindeau'))}
        >
          <circle
            cx="148" cy="367"
            r={isActive('svg-guindeau') ? 4 : 2.5}
            fill={isActive('svg-guindeau') ? 'rgba(56,189,248,0.25)' : 'rgba(14,32,54,0.5)'}
            stroke={getActiveStroke('svg-guindeau', '#5a7a9f')}
            strokeWidth={isActive('svg-guindeau') ? 1.2 : 0.5}
            opacity={isActive('svg-guindeau') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === ESPAR (along mast, slightly left) === */}
        <SailboatPart
          partId="svg-espar"
          label="Espar"
          isActive={isActive('svg-espar')}
          isSelected={selectedPartId === 'svg-espar'}
          cx={225}
          cy={66}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-espar', filter, isActive('svg-espar'))}
        >
          <line
            x1="244" y1="55" x2="244" y2="370"
            stroke={getActiveStroke('svg-espar', '#7a9abf')}
            strokeWidth={isActive('svg-espar') ? 1.5 : 0.5}
            strokeDasharray="8 6"
            opacity={isActive('svg-espar') ? 0.8 : 0.15}
          />
        </SailboatPart>

        {/* === VIT-DE-MULET (junction of boom and mast) === */}
        <SailboatPart
          partId="svg-vit-de-mulet"
          label="Vit-de-mulet"
          isActive={isActive('svg-vit-de-mulet')}
          isSelected={selectedPartId === 'svg-vit-de-mulet'}
          cx={275}
          cy={330}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-vit-de-mulet', filter, isActive('svg-vit-de-mulet'))}
        >
          <circle
            cx="249" cy="362"
            r={isActive('svg-vit-de-mulet') ? 4 : 2.5}
            fill={isActive('svg-vit-de-mulet') ? 'rgba(56,189,248,0.3)' : 'rgba(74,122,181,0.15)'}
            stroke={getActiveStroke('svg-vit-de-mulet', '#7a9abf')}
            strokeWidth={isActive('svg-vit-de-mulet') ? 1.2 : 0.5}
            opacity={isActive('svg-vit-de-mulet') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === SOUS-BARBE (below forestay, near bow) === */}
        <SailboatPart
          partId="svg-sous-barbe"
          label="Sous-barbe"
          isActive={isActive('svg-sous-barbe')}
          isSelected={selectedPartId === 'svg-sous-barbe'}
          cx={95}
          cy={116}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-sous-barbe', filter, isActive('svg-sous-barbe'))}
        >
          <line
            x1="125" y1="385" x2="140" y2="375"
            stroke={getActiveStroke('svg-sous-barbe', '#5a7a9f')}
            strokeWidth={isActive('svg-sous-barbe') ? 1.5 : 0.6}
            strokeDasharray="3 2"
            opacity={isActive('svg-sous-barbe') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === SOLENT (genois area, slightly offset) === */}
        <SailboatPart
          partId="svg-solent"
          label="Solent"
          isActive={isActive('svg-solent')}
          isSelected={selectedPartId === 'svg-solent'}
          cx={135}
          cy={187}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-solent', filter, isActive('svg-solent'))}
        >
          <path
            d="M 248 80 Q 215 170, 195 260 Q 180 320, 170 355 L 248 360 Z"
            fill={isActive('svg-solent') ? 'rgba(56,189,248,0.1)' : 'rgba(186,230,253,0.03)'}
            stroke={getActiveStroke('svg-solent', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-solent') ? 1.5 : 0.5}
            opacity={isActive('svg-solent') ? 0.8 : 0.15}
          />
        </SailboatPart>

        {/* === CODE ZERO (gennaker area, slightly offset) === */}
        <SailboatPart
          partId="svg-code-zero"
          label="Code 0"
          isActive={isActive('svg-code-zero')}
          isSelected={selectedPartId === 'svg-code-zero'}
          cx={85}
          cy={165}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-code-zero', filter, isActive('svg-code-zero'))}
        >
          <path
            d="M 248 65 C 215 80, 135 125, 112 185 C 95 235, 100 290, 118 325 C 130 348, 140 360, 148 365 Q 198 367, 248 365 C 244 265, 240 155, 248 65 Z"
            fill={isActive('svg-code-zero') ? 'rgba(56,189,248,0.08)' : 'rgba(45,212,191,0.02)'}
            stroke={isActive('svg-code-zero') ? '#5eead4' : 'rgba(45,212,191,0.2)'}
            strokeWidth={isActive('svg-code-zero') ? 1.5 : 0.5}
            opacity={isActive('svg-code-zero') ? 0.8 : 0.12}
          />
        </SailboatPart>

        {/* === VOILE DE CAPE (near tourmentin, slightly offset) === */}
        <SailboatPart
          partId="svg-voile-de-cape"
          label="Voile de cape"
          isActive={isActive('svg-voile-de-cape')}
          isSelected={selectedPartId === 'svg-voile-de-cape'}
          cx={175}
          cy={286}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-voile-de-cape', filter, isActive('svg-voile-de-cape'))}
        >
          <path
            d="M 252 200 L 210 335 L 252 340 Z"
            fill={isActive('svg-voile-de-cape') ? 'rgba(56,189,248,0.12)' : 'rgba(186,230,253,0.03)'}
            stroke={getActiveStroke('svg-voile-de-cape', 'rgba(186,230,253,0.25)')}
            strokeWidth={isActive('svg-voile-de-cape') ? 1.5 : 0.5}
            opacity={isActive('svg-voile-de-cape') ? 0.8 : 0.15}
          />
        </SailboatPart>

        {/* === CADÈNE (near haubans, at deck level) === */}
        <SailboatPart
          partId="svg-cadene"
          label="Cadène"
          isActive={isActive('svg-cadene')}
          isSelected={selectedPartId === 'svg-cadene'}
          cx={340}
          cy={204}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-cadene', filter, isActive('svg-cadene'))}
        >
          <rect
            x="336" y="366" width="6" height="8" rx="1"
            fill={isActive('svg-cadene') ? 'rgba(56,189,248,0.25)' : 'rgba(14,32,54,0.4)'}
            stroke={getActiveStroke('svg-cadene', '#4a6a8f')}
            strokeWidth={isActive('svg-cadene') ? 1.2 : 0.5}
            opacity={isActive('svg-cadene') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === BASTAQUE (aft shroud line) === */}
        <SailboatPart
          partId="svg-bastaque"
          label="Bastaque"
          isActive={isActive('svg-bastaque')}
          isSelected={selectedPartId === 'svg-bastaque'}
          cx={335}
          cy={182}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-bastaque', filter, isActive('svg-bastaque'))}
        >
          <line
            x1="250" y1="80" x2="348" y2="370"
            stroke={getActiveStroke('svg-bastaque', '#4a6a8f')}
            strokeWidth={isActive('svg-bastaque') ? 1.2 : 0.5}
            strokeDasharray="5 5"
            opacity={isActive('svg-bastaque') ? 0.85 : 0.15}
          />
        </SailboatPart>

        {/* === LIGNE DE VIE (on deck, fore-aft) === */}
        <SailboatPart
          partId="svg-ligne-de-vie"
          label="Ligne de vie"
          isActive={isActive('svg-ligne-de-vie')}
          isSelected={selectedPartId === 'svg-ligne-de-vie'}
          cx={210}
          cy={346}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-ligne-de-vie', filter, isActive('svg-ligne-de-vie'))}
        >
          <path
            d="M 160 366 Q 250 358 340 366"
            fill="none"
            stroke={getActiveStroke('svg-ligne-de-vie', '#4a7ab5')}
            strokeWidth={isActive('svg-ligne-de-vie') ? 1.5 : 0.5}
            strokeDasharray="6 3"
            opacity={isActive('svg-ligne-de-vie') ? 0.9 : 0.2}
          />
        </SailboatPart>

        {/* === ROUF (roof variant, slightly offset) === */}
        <SailboatPart
          partId="svg-rouf"
          label="Rouf"
          isActive={isActive('svg-rouf')}
          isSelected={selectedPartId === 'svg-rouf'}
          cx={285}
          cy={374}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-rouf', filter, isActive('svg-rouf'))}
        >
          <rect
            x="258" y="362" width="30" height="8" rx="2"
            fill={isActive('svg-rouf') ? 'rgba(56,189,248,0.15)' : 'rgba(14,32,54,0.4)'}
            stroke={getActiveStroke('svg-rouf', '#3a5a80')}
            strokeWidth={isActive('svg-rouf') ? 1 : 0.4}
            strokeDasharray="3 2"
            opacity={isActive('svg-rouf') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === BALCON (railing at bow and stern) === */}
        <SailboatPart
          partId="svg-balcon"
          label="Balcon"
          isActive={isActive('svg-balcon')}
          isSelected={selectedPartId === 'svg-balcon'}
          cx={175}
          cy={374}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-balcon', filter, isActive('svg-balcon'))}
        >
          {/* Bow railing */}
          <path
            d="M 143 368 Q 138 362 143 358"
            fill="none"
            stroke={getActiveStroke('svg-balcon', '#4a6a8f')}
            strokeWidth={isActive('svg-balcon') ? 1.5 : 0.6}
            opacity={isActive('svg-balcon') ? 0.9 : 0.25}
          />
          {/* Stern railing */}
          <path
            d="M 348 368 Q 353 362 348 358"
            fill="none"
            stroke={getActiveStroke('svg-balcon', '#4a6a8f')}
            strokeWidth={isActive('svg-balcon') ? 1.5 : 0.6}
            opacity={isActive('svg-balcon') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* === MOUSQUETON (near poulie, slightly offset) === */}
        <SailboatPart
          partId="svg-mousqueton"
          label="Mousqueton"
          isActive={isActive('svg-mousqueton')}
          isSelected={selectedPartId === 'svg-mousqueton'}
          cx={335}
          cy={358}
          onHover={handlePartHover}
          onClick={handlePartClick}
          opacity={getPartOpacity('svg-mousqueton', filter, isActive('svg-mousqueton'))}
        >
          <path
            d="M 352 352 Q 349 348 352 344 L 355 348 Z"
            fill="none"
            stroke={getActiveStroke('svg-mousqueton', '#6a8ab0')}
            strokeWidth={isActive('svg-mousqueton') ? 1.2 : 0.5}
            opacity={isActive('svg-mousqueton') ? 0.9 : 0.25}
          />
        </SailboatPart>

        {/* Interaction is handled directly by SailboatPart components — no overlay needed */}

        {/* Wind indicator removed */}
      </motion.svg>

      {/* HTML Tooltip overlay */}
      {activePart && (
        <DiagramTooltip
          label={activePart.label}
          definition={activePart.shortDef}
          isVisible={!!hoveredPart}
          x={tooltipPos.x}
          y={tooltipPos.y}
        />
      )}
    </div>
  )
}
