import { useQuery } from '@tanstack/react-query';

import { api } from '@/constants';
import { user } from '@/models';
import { axiosInstance } from '@/utils';

type getLeadersResponse = { data: user.User[] };

export const getLeaders = async () => {
  const url = `/getLeader`;
  const res: getLeadersResponse = await axiosInstance.get(url);

  return res.data;
};

export const useListLeaders = () => {
  // path users/id
  return useQuery([api.LEADER], () => getLeaders());
};
