import * as React from 'react';
import { Outlet } from 'react-router';

import useAuth from '@/hooks/useAuth';
import { JobPosition } from '@/models/user';

type RequirePotionProps = {
  positions: JobPosition[];
};

const RequirePosition: React.FC<RequirePotionProps> = ({ positions }) => {
  const {
    authState: { user }
  } = useAuth();

  if (user?.jobPositionID && positions.includes(user?.jobPositionID)) {
    return <Outlet />;
  }

  return <></>;
};

export default RequirePosition;
