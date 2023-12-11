import { styled, Tooltip } from '@mui/material';

export const TextTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
  color: black;
  background-color: white;
  font-size: 1em;
  padding: 10px;
  border: 1px solid black;
    `);
