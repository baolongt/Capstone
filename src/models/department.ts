export interface Department {
  id: number;
  name: string;
  departmentLeaderID: number;
  departmentLeaderName: string;
}

export interface createDepartmentPayload {
  name: string;
  departmentleaderID: number;
}