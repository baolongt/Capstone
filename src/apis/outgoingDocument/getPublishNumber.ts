import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { axiosInstance } from '@/utils';

export type GetPublishNumberResponse = {
  data: {
    number: number;
  };
};

export const getPublishNumber = async (): Promise<number> => {
  const res: GetPublishNumberResponse = await axiosInstance.get(
    '/api/OutgoingArchives/publish-number'
  );

  return res.data.number;
};

export const useGetPublishNumber = () => {
  return useQuery<number, Error>([api.OUTGOING_DOCUMENT_PUBLISH_NUMBER], () =>
    getPublishNumber()
  );
};
