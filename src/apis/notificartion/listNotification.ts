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
  userId,
  queryParams
}: {
  userId: number;
  queryParams: NotificationPagingParams;
}): Promise<ListNotificationsResponse> => {
  const { page, size } = queryParams;

  const params = {
    PageNumber: page,
    PageSize: size
  };

  const response: ListNotificationsResponse = await axiosInstance.get(
    `/api/notifications/${userId}`,
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
  userId,
  queryParams
}: UseListNotificationsParams & { userId: number }) => {
  return useInfiniteQuery<ListNotificationsResponse, Error>({
    queryKey: [api.NOTIFICATION],
    queryFn: () =>
      fetchNotifications({
        userId,
        queryParams
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.metadata.isLastPage) {
        return undefined;
      }

      return {
        page: lastPage.metadata.pageNumber + 1,
        size: lastPage.metadata.pageSize
      };
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (firstPage.metadata.isFirstPage) {
        return undefined;
      }
    }
  });
};
