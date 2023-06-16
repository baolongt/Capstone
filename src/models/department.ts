import { UpdateUserPayload } from './user';

export interface Department {
  id: number;
  name: string;
  leader: string;
}

export const mock_data: Department[] = [
  {
    id: 1,
    name: 'Phòng nhân sự',
    leader: 'Nguyễn Văn A'
    // leader: {
    //   id: 1,
    //   name: 'Nguyen Van A',
    //   password: '12345678',
    //   email: 'nguyenvana@gmail.com',
    //   citizenIdentification: '123456789',
    //   roleID: 1,
    //   jobPositionID: 1
    // }
  },

  {
    id: 2,
    name: 'Phòng IT',
    leader: 'Nguyễn Văn A'
    // leader: {
    //   id: 2,
    //   name: 'Nguyen Van A',
    //   password: '12345678',
    //   email: 'nguyenvana@gmail.com',
    //   citizenIdentification: '123456789',
    //   roleID: 1,
    //   jobPositionID: 1
    // }
  },

  {
    id: 3,
    name: 'Phòng Kế Toán',
    leader: 'Nguyễn Văn A'
    // leader: {
    //   id: 3,
    //   name: 'Nguyen Van A',
    //   password: '12345678',
    //   email: 'nguyenvana@gmail.com',
    //   citizenIdentification: '123456789',
    //   roleID: 1,
    //   jobPositionID: 1
    // }
  }
];
