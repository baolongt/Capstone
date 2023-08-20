import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import { JobPosition, Role } from '@/models/user';

type RequireAuthProps = {
  role: Role;
  jobPosition?: JobPosition;
};

const RequireAuth: React.FC<RequireAuthProps> = ({ role, jobPosition }) => {
  const {
    authState: { isAuthenticated, user }
  } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user?.roleID !== role) {
    return <Navigate to="/unauthorized" />;
  }

  if (jobPosition && user?.jobPositionID !== jobPosition) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RequireAuth;
