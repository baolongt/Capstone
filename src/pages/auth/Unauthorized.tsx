import { Button, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate('/');

  return (
    <Stack sx={{ mx: 'auto', width: '1000px' }}>
      <Typography variant="h3">Unauthorized</Typography>
      <Typography>You do not have access to the requested page</Typography>
      <Button onClick={goBack}>Go Back</Button>
    </Stack>
  );
};

export default Unauthorized;
