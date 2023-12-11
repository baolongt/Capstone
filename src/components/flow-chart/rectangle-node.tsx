import { Box, Typography } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';

import { StatusColor } from '@/constants/flow-chart';
import { Status } from '@/models/work-flow';

const RectangleNode = ({ data, id }: NodeProps) => {
  return (
    <Box
      sx={{
        height: '36px',
        width: '172px',
        border: '1px solid black',
        borderRadius: '5px',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          widht: '100%',
          height: '100%',
          backgroundColor: StatusColor[data.status as Status],
          textAlign: 'center',
          pt: 1
        }}
      >
        <Typography sx={{ fontSize: '12px' }}>{data.label}</Typography>
        <Handle type="target" position={Position.Top} id={`${id}.top`} />
        {/* {data.isFailStepHandler && ( */}
        <Handle type="target" position={Position.Right} id={`${id}.right`} />
        {/* )} */}

        <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />
      </Box>
    </Box>
  );
};
export default RectangleNode;
