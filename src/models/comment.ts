export enum DocumentType {
  OUTGOING = 1,
  INCOMING = 2,
  INTERNAL = 3
}

type User = {
  id: number;
  name: string;
  email: string;
  citizenIdentification: string;
  roleID: number;
  jobPositionID: number;
  roleName: null | string;
  jobPositionName: null | string;
  departmentId: number;
  departmentName: null | string;
};

export type Comment = {
  id: number;
  content: string;
  createdDate: string;
  user?: User;
};
