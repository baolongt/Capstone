import { fakerVI as faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { Attachment, outgoingDocument } from '@/models';
import { ProcessHisstory } from '@/models/outgoingDocument';

const attach: Attachment[] = [
  new Attachment({
    name: 'File 1',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    needSigned: true,
    mimeType: 'application/pdf',
    size: '123456'
  }),
  new Attachment({
    name: 'File 2',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    mimeType: 'application/pdf',
    size: '123456',
    needSigned: false
  })
];

export const processHistory: ProcessHisstory[] = [];
for (let i = 0; i < 10; i++) {
  const myObject: ProcessHisstory = {
    id: faker.datatype.number(),
    handlerId: faker.datatype.uuid(),
    createAt: faker.date.recent().toISOString(),
    outgoingDocumentId: faker.datatype.uuid(),
    status: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
    note: faker.lorem.sentence()
  };
  processHistory.push(myObject);
}

export const getOne = async (
  id: number
): Promise<outgoingDocument.OutgoingDocument> => {
  const document: outgoingDocument.OutgoingDocument = {
    id: id,
    epitomize: 'Lorem ipsum dolor sit amet',
    archivedBookName: 'Book 1',
    outgoingDocumentNumber: 123,
    documentNotation: 'ABC123',
    publishDate: new Date('2021-10-31T00:00:00.000Z'),
    receiver: 'john.doe@example.com',
    lastSignedBy: 'Jane Doe',
    createdByDepartment: 'IT',
    createdBy: 'John Doe',
    documentField: 'Field 1',
    documentType: 'Công văn',
    directingDescription: 'Description 1',
    processDeadline: new Date('2021-10-31T00:00:00.000Z'),
    isRepliedDocument: false,
    note: faker.lorem.paragraph({
      min: 10,
      max: 16
    }),
    status: 'active',
    attachments: attach,
    processHistory: processHistory
  };
  return document;
};
export const useGetOneDocument = (id: number) => {
  return useQuery<outgoingDocument.OutgoingDocument, Error>(
    [api.OUTGOING_DOCUMENT, id],
    () => getOne(id)
  );
};
