import { Box, Typography } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';

const CircleNode = ({ data, id }: NodeProps) => {
  return (
    <Box
      sx={{
        borderRadius: '50%',
        height: '60px',
        width: '60px',
        backgroundColor: '#02a9ea',
        border: '1px solid black',
        textAlign: 'center'
      }}
    >
      <Typography sx={{ fontSize: '12px', mt: 2 }}>{data.label}</Typography>
      <Handle type="target" position={Position.Top} id={`${id}.top`} />

      <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />
    </Box>
  );
};
export default CircleNode;
