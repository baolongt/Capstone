export type LoginPayload = {
  email: string;
  password: string;
};

export type Auth = {
  id: number;
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: number;
  jobPositionID: number;
  departmentId: number;
  role: {
    id: number;
    name: string;
  };
  jobPosition: null;
  department: {
    id: number;
    name: string;
    departmentLeaderId: number;
    departmentLeader: null;
    members: null[];
  };
  createdDate: string;
  createdById: number;
  updatedDate: string;
  updatedBy: number;
  isDeleted: boolean;
};
