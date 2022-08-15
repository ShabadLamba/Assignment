export enum ServiceType {
  Electrical = 'electrical',
  General = 'general',
  PestControl = 'pest-control',
  Plumbing = 'plumbing',
}

export const ALL_SERVICE_TYPES = [
  ServiceType.Electrical,
  ServiceType.General,
  ServiceType.PestControl,
  ServiceType.Plumbing,
];

export interface MaintenanceRequest {
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;
  //to maintain status of the request
  status?: 'open' | 'close';

  id?: string;
  submittedAt?: Date;
}

export interface AuthRequest {
  //name of user
  name?: string;
  //password for the user
  password: string;
  //role of the user
  role: string;
  //email of the user
  email: string;
}

export type User = {
  name?: string;
  email: string;
  role: string;
  id?: string;
  password?: string;
};
