import { Box, Stack, Typography } from '@mui/material';

import IncomingStatusChart from '@/components/dashboard/charts/incoming-status-pie-chart';
import InternalStatusChart from '@/components/dashboard/charts/internal-status-pie-chart';
import OutgoingStatusChart from '@/components/dashboard/charts/outgoing-status-pie-chart';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import useAuth from '@/hooks/useAuth';

const Dashboard = () => {
  const {
    authState: { user }
  } = useAuth();

  return (
    <Box sx={{ p: 1, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
      <Typography sx={{ mt: 2 }} variant="h4" fontWeight="bold">
        {`Welcome ${user?.name} !` || ''}
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={{ xs: 'column', sm: 'row' }}
        useFlexGap={true}
        flexWrap="wrap"
        sx={{ mt: 5, justifyContent: 'space-between' }}
      >
        <OutgoingStatusChart />
        <IncomingStatusChart />
        <InternalStatusChart />
      </Stack>
    </Box>
  );
};

export default Dashboard;
