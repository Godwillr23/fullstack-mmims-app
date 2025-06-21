// src/app/models/user.model.ts
export interface UserModel {
  ID: number;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  Username?: string;
  Email?: string;
  UserRole?: string;
  ActiveStatus?: number;
  TeamLeader?: string;
  Gender?: string;
  IDNo?: string;
  ProjId?: number;
  CellNo?: string;
  LogPassword?: string;
  HasDriversLicence?: string;
  LicenceCode?: string;
  LicenceNo?: string;
  LicenceIssueDate?: string;
  LicenceExpDate?: string;
  DurationDrivingExp?: string;
  EmploymentDate?: string;
  MMIMSAllocatedNo?: string;
  ImageURL?: string;
  IDCopy?: string;
  CV?: string;
  Matric?: string;
  DriversLicense?: string;
  ApplicationForm?: string;
  EmploymentContract?: string;
  SignedKPIs?: string;
  SignedPolicies?: string;
  DateCreated?: string;
}

