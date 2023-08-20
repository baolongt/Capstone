export type UpdatePayload = Pick<
  User,
  | 'id'
  | 'name'
  | 'password'
  | 'email'
  | 'citizenIdentification'
  | 'roleID'
  | 'jobPositionID'
>;

export type CreatePayload = Pick<
  User,
  | 'name'
  | 'password'
  | 'email'
  | 'citizenIdentification'
  | 'roleID'
  | 'jobPositionID'
>;

export enum Role {
  ADMIN = 1,
  OFFICER
}

export enum JobPosition {
  CAN_BO = 1,
  TRUONG_PHONG,
  VAN_THU,
  CHANH_VAN_PHONG,
  PHO_LANH_DAO,
  LANH_DAO
}

export class User {
  id: number;
  name: string;
  password?: string;
  email: string;
  citizenIdentification: string;
  roleID: Role;
  jobPositionID: JobPosition;
  roleName: string;
  jobPositionName: string;

  constructor({
    id,
    name,
    password,
    email,
    citizenIdentification,
    roleID,
    jobPositionID,
    roleName,
    jobPositionName
  }: {
    id: number;
    name: string;
    password?: string;
    email: string;
    citizenIdentification: string;
    roleID: number;
    jobPositionID: number;
    roleName: string;
    jobPositionName: string;
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.citizenIdentification = citizenIdentification;
    this.roleID = roleID;
    this.jobPositionID = jobPositionID;
    this.roleName = roleName;
    this.jobPositionName = jobPositionName;
  }

  getprop(propName: keyof User): string | null {
    return this[propName] ? String(this[propName]) : null;
  }
  toUpdatePayload(): UpdatePayload {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      citizenIdentification: this.citizenIdentification,
      roleID: this.roleID,
      jobPositionID: this.jobPositionID
    };
  }

  toCreatePayload(): CreatePayload {
    return {
      name: this.name,
      password: this.password,
      email: this.email,
      citizenIdentification: this.citizenIdentification,
      roleID: this.roleID,
      jobPositionID: this.jobPositionID
    };
  }
}
