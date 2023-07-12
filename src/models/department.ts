// export interface Department {
//   id: number;
//   name: string;
//   departmentLeaderID: number;
//   departmentLeaderName: string;
// }

// export interface createDepartmentPayload {
//   name: string;
//   departmentleaderID: number;
// }

//=========================================================================

export type UpdatePayload = Pick<Department, 'name' | 'departmentLeaderID'>;

export type CreatePayload = Pick<Department, 'name' | 'departmentLeaderID'>;

export class Department {
  id: number;
  name: string;
  departmentLeaderID: number;
  departmentLeaderName: string;

  constructor({
    id,
    name,
    departmentLeaderID,
    departmentLeaderName
  }: {
    id: number;
    name: string;
    departmentLeaderID: number;
    departmentLeaderName: string;
  }) {
    this.id = id;
    this.name = name;
    this.departmentLeaderID = departmentLeaderID;
    this.departmentLeaderName = departmentLeaderName;
  }

  getprop(propName: keyof Department) {
    return this[propName];
  }

  toUpdatePayload(): UpdatePayload {
    return {
      name: this.name,
      departmentLeaderID: this.departmentLeaderID
    };
  }

  toCreatePayload(): CreatePayload {
    return {
      name: this.name,
      departmentLeaderID: this.departmentLeaderID
    };
  }
}
