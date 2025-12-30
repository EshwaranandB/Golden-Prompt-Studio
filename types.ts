
export interface GoldenPrompt {
  id: string;
  originalInput: string;
  role: string;
  objective: string;
  context: string;
  constraints: string[];
  instructions: string[];
  outputFormat: string;
  timestamp: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
