import { fakerVI as faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { outgoingDocument } from '@/models';
import { BaseTableQueryParams, Metadata } from '@/types';

// !remove if call real api
const documents: outgoingDocument.OutgoingDocument[] = [];
for (let i = 0; i < 10; i++) {
  const document: outgoingDocument.OutgoingDocument = {
    id: faker.datatype.number(),
    epitomize: faker.lorem.paragraph(),
    documentNotation: faker.string.alphanumeric(10),
    receiver: faker.internet.email(),
    publishDate: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    note: faker.lorem.paragraph(),
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
  } as unknown as outgoingDocument.OutgoingDocument;
  documents.push(document);
}

export type ListDocumentsResponse = {
  // Update type name
  data: outgoingDocument.OutgoingDocument[]; // Update type name
  metadata: Metadata;
};

const fetchDocuments = async ({
  // Update function name and parameter name
  queryParams
}: {
  queryParams: BaseTableQueryParams;
}): Promise<ListDocumentsResponse> => {
  const { page, size, search } = queryParams;

  // const params = {
  //   PageNumber: page,
  //   PageSize: size,
  //   ...(search && search != '' ? { SearchString: search } : {})

  //   const response: ListDocumentsResponse = await axiosInstance.get(
  //     `/api/documents`,
  //     {
  //       // Update endpoint
  //       params
  //     }
  //   );

  return Promise.resolve({
    data: documents,
    metadata: {
      pageCount: 1,
      totalItemCount: 10,
      pageNumber: page,
      pageSize: size,
      hasPreviousPage: false,
      hasNextPage: false,
      isFirstPage: true,
      isLastPage: true,
      firstItemOnPage: 1,
      lastItemOnPage: 10
    }
  });
};

type UseListDocumentsParams = {
  // Update type name
  queryParams: BaseTableQueryParams;
};

export const useListDocuments = ({ queryParams }: UseListDocumentsParams) => {
  // Update function name
  return useQuery<ListDocumentsResponse, Error>({
    queryKey: [api.OUTGOING_DOCUMENT, queryParams], // Update API endpoint
    queryFn: () =>
      fetchDocuments({
        // Update function name
        queryParams
      }),
    keepPreviousData: true
  });
};
