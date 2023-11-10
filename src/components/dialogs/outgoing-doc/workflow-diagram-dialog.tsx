import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Edge, MarkerType, Node } from 'reactflow';

import { Step } from '@/apis';
import FlowChart from '@/components/flow-chart';
import { Status, WorkFlowActionDict } from '@/models/work-flow';

const StatusColor: Record<Status, string> = {
  1: '#ffe082',
  2: '#a5d6a7',
  3: '#ef9a9a'
};

const StatusLabel: Record<Status, string> = {
  1: 'Chờ xử lý',
  2: 'Đã hoàn thành',
  3: 'Từ chối'
};

const convertStepsToFlowChart = (steps: Step[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  steps.forEach((step, index) => {
    console.log('step', step);
    const node: Node = {
      id: step.id.toString(),
      type: 'default',
      data: {
        label: step.handlerName
      },
      position: { x: 0, y: 0 },
      draggable: false,
      style: {
        backgroundColor: StatusColor[step.status]
      }
    };
    nodes.push(node);

    if (index > 0) {
      const edge: Edge = {
        id: `${step.id}-${steps[index - 1].id}`,
        source: steps[index - 1].id.toString(),
        target: step.id.toString(),
        type: 'default',
        animated: true,
        label: WorkFlowActionDict[steps[index - 1].action],
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      };
      edges.push(edge);
    }
  });

  // add start node
  nodes.unshift({
    id: 'start-node',
    type: 'default',
    data: {
      label: 'Khởi tạo'
    },
    position: { x: 0, y: 0 },
    style: {
      backgroundColor: '#bdbdbd'
    }
  });
  edges.unshift({
    id: 'start-edge',
    source: 'start-node',
    target: steps[0].id.toString(),
    type: 'default',
    animated: true,
    label: 'Bắt đầu',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  });
  // add end node
  nodes.push({
    id: 'end-node',
    type: 'default',
    data: {
      label: 'Kết thúc'
    },
    position: { x: 0, y: 0 },
    style: {
      backgroundColor: '#bdbdbd'
    }
  });
  edges.unshift({
    id: 'end-edge',
    source: steps[steps.length - 1].id.toString(),
    target: 'end-node',
    type: 'default',
    animated: true,
    label: 'Phát hành',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  });

  console.log('nodes', nodes);
  console.log('edges', edges);
  return { nodes, edges };
};

const StatusColorAnnotation = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {Object.entries(StatusColor).map(([status, color]) => (
        <Box
          key={status}
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            mr: '20px'
          }}
        >
          <Box
            sx={{
              width: '20px',
              height: '20px',
              backgroundColor: color,
              marginRight: '10px'
            }}
          />
          <Typography variant="body1">{StatusLabel[status]}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export interface WorkflowDiagramDialogProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
}

export const WorkflowDiagramDialog = ({
  steps,
  isOpen,
  onClose
}: WorkflowDiagramDialogProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const { nodes, edges } = convertStepsToFlowChart(steps);
    console.debug('debug', nodes, edges);
    setNodes(nodes);
    setEdges(edges);
  }, [steps]);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { md: '80%', xs: '75vw' },
          maxHeight: { md: '80%', xs: '75vh' }
        }
      }}
      onClose={onClose}
    >
      <DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <StatusColorAnnotation />
        <FlowChart nodes={nodes} edges={edges} />
      </DialogContent>
    </Dialog>
  );
};
