import { Box, Stack, Typography } from '@mui/material';

import IncomingStatusChart from '@/components/dashboard/charts/incoming-status-pie-chart';
import InternalStatusChart from '@/components/dashboard/charts/internal-status-pie-chart';
import OutgoingStatusChart from '@/components/dashboard/charts/outgoing-status-pie-chart';
import theme from '@/components/theme/theme';
import { DEFAULT_PAGE_WIDTH } from '@/constants';
import useAuth from '@/hooks/useAuth';

const Dashboard = () => {
  const {
    authState: { user }
  } = useAuth();

  return (
    <Box sx={{ p: 1, mx: 'auto', width: DEFAULT_PAGE_WIDTH }}>
      <Typography
        sx={{ mt: 2, color: theme.palette.grey[800] }}
        variant="h5"
        fontWeight="600"
      >
        Thống kê tháng
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction={'row'}
        useFlexGap={true}
        sx={{ mt: 3, justifyContent: 'space-between' }}
      >
        <OutgoingStatusChart />
        <IncomingStatusChart />
        <InternalStatusChart />
      </Stack>
    </Box>
  );
};

export default Dashboard;
