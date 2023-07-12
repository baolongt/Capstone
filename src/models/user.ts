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

export class User {
  id: number;
  name: string;
  password?: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
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
    roleID: 1 | 2;
    jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
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

  getprop(propName: keyof User) {
    return this[propName];
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
