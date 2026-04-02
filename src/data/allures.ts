import type { LexiconEntry } from './types';

export const alluresEntries: LexiconEntry[] = [
  {
    id: 'vent-arriere',
    term: 'Vent arrière',
    diagramPartId: 'wind-vent-arriere',
    definition:
      "Allure où le voilier navigue dans la même direction que le vent. Le vent souffle exactement depuis la poupe (l'arrière) du bateau. C'est l'allure la plus portante, mais elle peut être instable car le risque d'empannage involontaire est élevé. La grand-voile est complètement débordée, perpendiculaire à l'axe du bateau.",
    shortDefinition: 'Naviguer dans le même sens que le vent, vent venant de l\'arrière.',
    category: 'allures',
    relatedTerms: ['grand-largue', 'empannage', 'spinnaker'],
    tips: 'Attention à l\'empannage involontaire ! Reste vigilant et garde une main sur l\'écoute de grand-voile. C\'est l\'allure idéale pour envoyer le spinnaker.',
  },
  {
    id: 'grand-largue',
    term: 'Grand largue',
    diagramPartId: 'wind-grand-largue',
    definition:
      "Allure portante où le vent arrive par le trois-quarts arrière du bateau, soit environ 150° par rapport à l'axe du lit du vent. Le voilier est bien lancé et stable. Les voiles sont largement débordées. C'est souvent considérée comme l'allure la plus agréable et la plus rapide sur certains bateaux.",
    shortDefinition: 'Vent venant du trois-quarts arrière, environ 150° du lit du vent.',
    category: 'allures',
    relatedTerms: ['vent-arriere', 'largue', 'spinnaker', 'gennaker'],
    tips: 'C\'est l\'allure reine pour le plaisir ! Le bateau est stable, rapide, et on peut facilement envoyer le spi ou le gennaker.',
  },
  {
    id: 'largue',
    term: 'Largue',
    diagramPartId: 'wind-largue',
    definition:
      "Allure portante où le vent arrive par le travers arrière, soit environ 120° par rapport au lit du vent. Les voiles sont moyennement débordées. Le voilier atteint souvent de bonnes vitesses tout en restant maniable. C'est une allure de transition entre le travers et le grand largue.",
    shortDefinition: 'Vent venant du travers arrière, environ 120° du lit du vent.',
    category: 'allures',
    relatedTerms: ['grand-largue', 'petit-largue', 'travers'],
    tips: 'Règle les voiles pour qu\'elles soient à mi-chemin entre le travers et le vent arrière. Les penons doivent filer horizontalement.',
  },
  {
    id: 'petit-largue',
    term: 'Petit largue',
    diagramPartId: 'wind-petit-largue',
    definition:
      "Allure portante où le vent arrive légèrement en arrière du travers, soit environ 100° par rapport au lit du vent. C'est une allure intermédiaire entre le travers et le largue. Les voiles sont un peu plus débordées qu'au travers.",
    shortDefinition: 'Vent légèrement en arrière du travers, environ 100° du lit du vent.',
    category: 'allures',
    relatedTerms: ['travers', 'largue'],
  },
  {
    id: 'travers',
    term: 'Travers',
    aliases: ['Vent de travers'],
    diagramPartId: 'wind-travers',
    definition:
      "Allure où le vent arrive perpendiculairement à l'axe du bateau, soit à 90° par rapport au lit du vent. C'est l'allure de transition entre les allures portantes (vent arrière, largue) et les allures de remontée au vent (bon plein, près). Les voiles sont à demi bordées.",
    shortDefinition: 'Vent perpendiculaire au bateau, à 90° du lit du vent.',
    category: 'allures',
    relatedTerms: ['bon-plein', 'petit-largue', 'vent-de-travers'],
    tips: 'Au travers, le bateau a tendance à gîter. Pense à rappeler (mettre ton poids au vent) si nécessaire.',
  },
  {
    id: 'bon-plein',
    term: 'Bon plein',
    diagramPartId: 'wind-bon-plein',
    definition:
      "Allure de remontée au vent où le vent arrive environ à 60° par rapport au lit du vent. C'est un compromis idéal entre vitesse et cap : le bateau avance bien tout en remontant vers le vent. Les voiles sont bordées assez serré mais pas au maximum.",
    shortDefinition: 'Remontée au vent confortable, environ 60° du lit du vent.',
    category: 'allures',
    relatedTerms: ['pres', 'travers'],
    tips: 'Le bon plein est l\'allure préférée des croiseurs : on avance vite vers sa destination au vent sans trop gîter. Si tu n\'es pas pressé de remonter au vent, c\'est l\'allure idéale.',
  },
  {
    id: 'pres',
    term: 'Près',
    aliases: ['Au près'],
    diagramPartId: 'wind-pres',
    definition:
      "Allure de remontée au vent où le voilier navigue aussi près du vent que possible, généralement entre 40° et 45° par rapport au lit du vent. Les voiles sont bordées au maximum. Le bateau gîte fortement. C'est l'allure la plus technique, qui demande une attention constante aux réglages et au cap.",
    shortDefinition: 'Remonter au vent au maximum, voiles bordées, environ 40-45° du lit du vent.',
    category: 'allures',
    relatedTerms: ['pres-serre', 'bon-plein', 'louvoyer', 'virement-de-bord'],
    tips: 'Surveille tes penons ! S\'ils décrochent côté au vent, tu es trop près du vent (lofe). S\'ils décrochent sous le vent, tu peux lofer un peu pour gagner du cap.',
  },
  {
    id: 'pres-serre',
    term: 'Près serré',
    diagramPartId: 'wind-pres-serre',
    definition:
      "L'allure la plus proche du vent qu'un voilier puisse atteindre, entre 30° et 40° selon le bateau. À cette allure, le bateau est à la limite du faseyement : les voiles commencent à battre si on essaie de remonter davantage. La vitesse diminue mais le cap gagné au vent est maximal. On est à la limite du « lit du vent ».",
    shortDefinition: 'Allure la plus serrée possible, à la limite du faseyement.',
    category: 'allures',
    relatedTerms: ['pres', 'lit-du-vent', 'faseyement', 'lofer'],
    tips: 'Au près serré, tu sacrifies de la vitesse pour gagner du cap. Si la grand-voile faseye, tu es trop près du vent : abats un peu.',
  },
  {
    id: 'lit-du-vent',
    term: 'Lit du vent',
    aliases: ['Zone interdite', 'No-go zone'],
    diagramPartId: 'wind-lit-du-vent',
    definition:
      "Zone d'environ 30° à 45° de chaque côté de la direction d'où vient le vent, dans laquelle un voilier ne peut pas naviguer. Dans cette zone, les voiles ne sont plus portantes : elles faseyent (battent au vent) et le bateau n'a plus de propulsion. Pour se rendre vers une destination située dans le lit du vent, il faut louvoyer (faire des bords successifs au près).",
    shortDefinition: 'Zone face au vent où le voilier ne peut pas naviguer.',
    category: 'allures',
    relatedTerms: ['pres-serre', 'louvoyer', 'virement-de-bord', 'vent-debout'],
    tips: 'Si tes voiles se mettent à battre et que le bateau ralentit, tu es probablement entré dans le lit du vent. Abats franchement pour retrouver de la vitesse !',
  },
  {
    id: 'allure-portante',
    term: 'Allure portante',
    diagramPartId: 'wind-allure-portante',
    definition:
      "Terme générique désignant toutes les allures où le vent arrive de l'arrière ou du côté arrière du bateau : vent arrière, grand largue, largue et petit largue. On dit que le vent « porte » le bateau. Les voiles sont plus ou moins débordées. Ce sont généralement les allures les plus confortables et les plus rapides.",
    shortDefinition: 'Ensemble des allures où le vent vient de l\'arrière.',
    category: 'allures',
    relatedTerms: ['vent-arriere', 'grand-largue', 'largue', 'allure-de-remontee'],
  },
  {
    id: 'allure-de-remontee',
    term: 'Allure de remontée',
    aliases: ['Allure de près'],
    diagramPartId: 'wind-allure-de-remontee',
    definition:
      "Terme générique désignant les allures où le voilier progresse en remontant vers la direction d'où vient le vent : le bon plein, le près et le près serré. Les voiles sont bordées plus ou moins serré. Le bateau gîte davantage et la navigation est plus technique qu'aux allures portantes.",
    shortDefinition: 'Ensemble des allures où le bateau remonte vers le vent.',
    category: 'allures',
    relatedTerms: ['bon-plein', 'pres', 'pres-serre', 'allure-portante'],
  },
  {
    id: 'amure-babord',
    term: 'Amure bâbord',
    diagramPartId: 'wind-amure-babord',
    definition:
      "Lorsqu'un voilier reçoit le vent par son côté gauche (bâbord), on dit qu'il est « amure bâbord » ou « bâbord amure ». Les voiles sont alors débordées à tribord (à droite). En régate, un bateau bâbord amure doit la priorité à un bateau tribord amure.",
    shortDefinition: 'Le vent arrive par la gauche (bâbord) du bateau.',
    category: 'allures',
    relatedTerms: ['amure-tribord', 'babord', 'tribord', 'virement-de-bord'],
    tips: 'Moyen mnémotechnique : « BaTterie » — Bâbord = voiles à Tribord. En croisement, bâbord amure doit s\'écarter.',
  },
  {
    id: 'amure-tribord',
    term: 'Amure tribord',
    diagramPartId: 'wind-amure-tribord',
    definition:
      "Lorsqu'un voilier reçoit le vent par son côté droit (tribord), on dit qu'il est « amure tribord » ou « tribord amure ». Les voiles sont alors débordées à bâbord (à gauche). Un bateau tribord amure est prioritaire sur un bateau bâbord amure selon les règles de barre.",
    shortDefinition: 'Le vent arrive par la droite (tribord) du bateau.',
    category: 'allures',
    relatedTerms: ['amure-babord', 'tribord', 'babord', 'virement-de-bord'],
    tips: 'Tribord amure = prioritaire. En cas de croisement avec un autre voilier, c\'est toi qui gardes ton cap.',
  },
];
