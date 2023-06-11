export interface Column {
  heading: string;
  minWidth?: string;
  type?: string;
  value: string;
}

export const columns: Column[] = [
  {
    heading: "STT",
    minWidth: "30px",
    type: "text",
    value: "id",
  },
  {
    heading: "Tên",
    minWidth: "300px",
    type: "text",
    value: "name",
  },
  {
    heading: "Email",
    minWidth: "200px",
    type: "text",
    value: "email",
  },
  {
    heading: "Căn cước công dân",
    minWidth: "300px",
    type: "text",
    value: "citizenIdentification",
  },
  {
    heading: "Vai trò",
    minWidth: "100px",
    type: "text",
    value: "roleName",
  },
  {
    heading: "Chức vụ",
    minWidth: "200px",
    type: "text",
    value: "jobPositionName",
  },
];

export interface CreateUserPayload {
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}
export interface UpdateUserPayload {
  name: string;
  password: string;
  email: string;
  citizenIdentification: string;
  roleID: 1 | 2;
  jobPositionID: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}