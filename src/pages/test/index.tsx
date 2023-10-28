import { TreeViewSelect } from '@/components/common';

const nodes = [
  {
    id: '1',
    name: 'Phòng ban A',
    children: [
      {
        id: '1-1',
        name: 'Trần Bảo Long'
      },
      {
        id: '1-2',
        name: 'Trần Bảo Long'
      }
    ]
  },
  {
    id: '2',
    name: 'Phòng ban B',
    children: [
      {
        id: '2-1',
        name: 'Từ Trọng Đức'
      }
    ]
  }
];

export const TestPage = () => {
  return <TreeViewSelect data={nodes} />;
};
