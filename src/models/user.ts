export type CreatePayload = {
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};
export type UpdatePayload = {
  id: number;
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};
