export interface Signal {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface LegalPurpose {
  id: string;
  title: string;
  description: string;
  regulation: string;
}

export interface DataRequest {
  id: string;
  signalId: string;
  signalName: string;
  legalPurposeId: string;
  legalPurposeTitle: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateDataRequestDTO {
  signalId: string;
  legalPurposeId: string;
}

export interface UpdateStatusDTO {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}