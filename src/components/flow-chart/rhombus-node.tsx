import { Box } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';

const RhombusNode = ({ id }: NodeProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        height: '40px',
        width: '40px'
      }}
    >
      <Box
        sx={{
          display: 'block',
          position: 'absolute',
          transform: 'rotate(45deg)',
          backgroundColor: '#a600ff',
          top: '-10px',
          left: '5px',
          padding: '0px',
          width: '30px',
          height: '30px',
          border: '1px solid',
          zIndex: -1,
          mt: 2
        }}
      ></Box>
      <Box>
        <Handle type="target" position={Position.Top} id={`${id}.top`} />
        <Handle type="source" position={Position.Bottom} id={`${id}.bottom`} />
        <Handle type="source" position={Position.Right} id={`${id}.right`} />
      </Box>
    </Box>
  );
};
export default RhombusNode;
