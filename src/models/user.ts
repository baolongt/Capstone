export interface Column {
  heading: string;
  minWidth?: string;
  type?: string;
  value: string;
}


export interface CreateUserPayload {
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}
export interface UpdateUserPayload {
  id: number;
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}