export interface GameData {
  artefacto: string;
  tema: string;
  industria: string;
}

export interface CurrentSelection {
  artefacto: string;
  tema: string;
  industria: string;
}

export interface LockStates {
  artefacto: boolean;
  tema: boolean;
  industria: boolean;
}

export type ElementType = 'artefacto' | 'tema' | 'industria';

export interface MiniAppIdea {
  id: number;
  text: string;
}

export interface AppState {
  view: 'generator' | 'ideas';
  currentPrompt: string;
  ideas: MiniAppIdea[];
  isLoading: boolean;
}