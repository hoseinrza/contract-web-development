export interface PartyInfo {
  name: string;
  nationalId: string;
  phone: string;
  email?: string;
  address?: string;
  representative?: string;
}

export interface PaymentMilestone {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  condition: string;
  dueDate?: string;
}

export interface TechnicalDeliverable {
  id: string;
  title: string;
  description: string;
  isIncluded: boolean;
}

export interface ContractData {
  contractNumber: string;
  contractDate: string;
  contractCity: string;
  copiesCount: number;
  
  // Parties
  client: PartyInfo; // کارفرما
  contractor: PartyInfo; // مجری / معمار UI

  // Article 1: Subject
  subjectTitle: string;
  subjectDescription: string;
  technicalAnnexReference: string;
  apiContractNote: string;

  // Article 2: Amount & Payments
  totalAmount: number; // in Tomans
  paymentTermsText: string;
  milestones: PaymentMilestone[];

  // Article 3: Duration & Timeline
  startDate: string;
  durationMonths: number;
  endDate: string;
  timelineNotes: string;

  // Article 4: Technical & Architecture Specs
  technicalStack: string;
  technicalDeliverables: TechnicalDeliverable[];

  // Article 5: Client Obligations (تعهدات کارفرما)
  clientObligations: string[];

  // Article 6: Contractor Obligations (تعهدات مجری)
  contractorObligations: string[];

  // Article 7: Intellectual Property & Confidentiality (مالکیت معنوی و محرمانگی)
  ipAndNdaTerms: string;

  // Article 8: Warranty & Support (گارانتی و پشتیبانی)
  warrantyPeriod: string;
  warrantyTerms: string;

  // Article 9: Dispute Resolution & Jurisdiction (حل اختلاف و فورس ماژور)
  disputeResolution: string;

  // Additional Notes / Amendments
  additionalNotes: string;

  // Signatures
  clientSignDate: string;
  contractorSignDate: string;
  showSignLines: boolean;
}
