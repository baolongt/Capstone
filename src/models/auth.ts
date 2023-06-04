export interface CreateUserPayLoad {
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: number;
  jobPositionID: number;
  userCreatedId: number;
}
