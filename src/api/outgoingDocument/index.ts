import { fakerVI as faker } from '@faker-js/faker';
import { outgoingDocument } from '../../models';

const documents: Partial<outgoingDocument.OutgoingDocument>[] = [];
for (let i = 0; i < 20; i++) {
  const document: Partial<outgoingDocument.OutgoingDocument> = {
    epitomize: faker.lorem.paragraph(),
    documentNotation: faker.string.alphanumeric(10),
    receiver: faker.internet.email(),
    publishDate: faker.date.past().toISOString(),
    documentType: faker.helpers.arrayElement([
      'Nghị quyết',
      'Quyết định',
      'Chỉ thị',
      'Quy chế',
      'Quy định',
      'Thông cáo',
      'Thông báo',
      'Hướng dẫn',
      'Chương trình',
      'Kế hoạch',
      'Phương án',
      'Đề án',
      'Dự án',
      'Báo cáo',
      'Biên bản',
      'Tờ trình',
      'Hợp đồng',
      'Công văn',
      'Công điện'
    ])
  };
  documents.push(document);
}
export const getAllOutgoingDocuments = async () => {
  // TODO: change to real api
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return documents;
};
