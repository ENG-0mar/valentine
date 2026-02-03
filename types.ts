
export enum AppStep {
  INTRO = 'INTRO',
  VALENTINE_ASK = 'VALENTINE_ASK',
  LOVE_ASK = 'LOVE_ASK',
  MAIN_SITE = 'MAIN_SITE'
}

export enum MainTab {
  HOME = 'HOME',
  LETTER = 'LETTER'
}

export interface Memory {
  id: number;
  imageUrl: string;
  caption: string;
  date: string;
}
