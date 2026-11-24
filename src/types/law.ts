export type LegalCategory =
  | 'constitutional'
  | 'criminal'
  | 'family'
  | 'cybercrime'
  | 'property_rent'
  | 'labor_employment'
  | 'consumer_rights'
  | 'inheritance'
  | 'traffic_civil';

export interface StatutoryCitation {
  actNameUrdu: string;
  actNameEnglish: string;
  actNameRomanUrdu: string;
  year: number;
  sectionOrArticle: string;
  officialGazetteRef?: string;
}

export interface LawEntry {
  id: string;
  category: LegalCategory;
  citation: StatutoryCitation;
  titleUrdu: string;
  titleEnglish: string;
  titleRomanUrdu: string;
  
  // Concise summaries (2-3 lines max!)
  summaryRomanUrdu: string;    // Main citizen language
  summaryUrdu: string;         // Urdu script
  summaryEnglish: string;      // English
  
  // Authentic statutory quotes
  statuteTextUrdu: string;
  statuteTextEnglish: string;
  
  // Bite-sized bullet points
  rightsRomanUrdu: string[];
  rightsUrdu: string[];
  rightsEnglish: string[];
  
  // Step-by-step action plan
  actionStepsRomanUrdu: string[];
  actionStepsUrdu: string[];
  actionStepsEnglish: string[];
  
  // Competent forum / where to go
  authorityRomanUrdu: string;
  authorityUrdu: string;
  authorityEnglish: string;
  
  helpline?: string;
  isBailable?: boolean;
  isCognizable?: boolean;
  punishmentRomanUrdu?: string;
  keywordsUrdu: string[];
  keywordsRomanUrdu: string[];
  keywordsEnglish: string[];
}

export interface LegalQueryResult {
  found: boolean;
  userQuery: string;
  languageDetected: 'roman_urdu' | 'urdu' | 'english';
  category?: LegalCategory;
  primaryLaw?: LawEntry;
  relatedLaws: LawEntry[];
  citations: StatutoryCitation[];
  
  // Bite-sized answers
  laymanAnswerRomanUrdu: string;
  laymanAnswerUrdu: string;
  laymanAnswerEnglish: string;
  
  practicalRoadmapRomanUrdu: string[];
  practicalRoadmapUrdu: string[];
  practicalRoadmapEnglish: string[];
  
  authoritiesToVisitRomanUrdu: string[];
  authoritiesToVisitUrdu: string[];
  authoritiesToVisitEnglish: string[];
  
  emergencyHelpline?: {
    name: string;
    number: string;
    description: string;
  };
  
  unverifiedDisclaimerRomanUrdu?: string;
  unverifiedDisclaimerUrdu?: string;
  unverifiedDisclaimerEnglish?: string;
}

export interface LegalComplaintDraft {
  templateId: string;
  titleUrdu: string;
  titleEnglish: string;
  addressedToUrdu: string;
  addressedToEnglish: string;
  subjectUrdu: string;
  contentUrdu: string;
  relevantSections: string[];
  instructionsUrdu: string[];
}
