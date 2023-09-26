import { useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { notification } from '@/models';
import { Metadata, NotificationPagingParams } from '@/types';
import { axiosInstance } from '@/utils';

export type ListNotificationsResponse = {
  data: notification.Notification[];
  metadata: Metadata;
};

const fetchNotifications = async ({
  queryParams
}: {
  queryParams: NotificationPagingParams;
}): Promise<ListNotificationsResponse> => {
  const { page, size } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size
  };

  const response: ListNotificationsResponse = await axiosInstance.get(
    `/api/notifications`,
    {
      params
    }
  );

  return response;
};

type UseListNotificationsParams = {
  queryParams: NotificationPagingParams;
};

export const useListNotifications = ({
  queryParams
}: UseListNotificationsParams) => {
  return useInfiniteQuery<ListNotificationsResponse, Error>({
    queryKey: [api.NOTIFICATION],
    queryFn: () =>
      fetchNotifications({
        queryParams
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.isLastPage) {
        return undefined;
      }

      return {
        page: lastPage.metadata.pageNumber + 1,
        size: lastPage.metadata.pageSize
      };
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.metadata.isFirstPage) {
        return undefined;
      }
    }
  });
};
