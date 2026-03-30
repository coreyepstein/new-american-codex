export interface IdeaSubmission {
  title: string;
  description: string;
  pillar?: string;
  stage?: string;
  submitterName?: string;
  submitterEmail?: string;
  _trap?: string; // honeypot
}

export interface ContentSubmission {
  title: string;
  pillar: string;
  stage: string;
  contentType: string;
  learningObjectives: string; // newline-separated
  materials: string; // newline-separated
  duration: string;
  body: string;
  submitterName?: string;
  submitterEmail?: string;
  _trap?: string; // honeypot
}

export interface IssueSubmission {
  contentUnit: string;
  description: string;
  suggestedFix?: string;
  submitterName?: string;
  submitterEmail?: string;
  _trap?: string; // honeypot
}

export interface ContributeResponse {
  url: string;
  number: number;
}
