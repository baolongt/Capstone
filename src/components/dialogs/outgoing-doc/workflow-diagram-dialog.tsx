import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Edge, MarkerType, Node } from 'reactflow';

import { Step } from '@/apis';
import FlowChart from '@/components/flow-chart';
import { TIMEZONE } from '@/constants';
import { Status, WorkFlowActionDict } from '@/models/work-flow';

const StatusColor: Record<Status, string> = {
  1: '#ffe082',
  2: '#a5d6a7',
  3: '#ef9a9a',
  4: '#fff'
};

const StatusLabel: Record<Status, string> = {
  1: 'Chờ xử lý',
  2: 'Đã hoàn thành',
  3: 'Từ chối',
  [Status.NOT_START]: ''
};

const convertStepsToFlowChart = (steps: Step[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const seed = '-' + new Date().getTime();
  steps.forEach((step, index) => {
    const node: Node = {
      id: step.id.toString() + seed,
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
        id: `${step.id}-${steps[index - 1].id}` + seed,
        source: steps[index - 1].id.toString() + seed,
        target: step.id.toString() + seed,
        type: 'default',
        animated: true,
        label:
          WorkFlowActionDict[steps[index - 1].action] +
          ' - Hạn xử lý ' +
          dayjs
            .utc(steps[steps.length - 1].deadline)
            .tz(TIMEZONE)
            .format('HH:mm DD/MM/YYYY'),

        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      };
      edges.push(edge);
    }
  });

  // add start node
  const startId = 'start-node-' + seed;
  nodes.unshift({
    id: startId,
    type: 'default',
    data: {
      label: 'Khởi tạo'
    },
    position: { x: 0, y: 0 },
    draggable: false,
    style: {
      backgroundColor: '#bdbdbd'
    }
  });
  edges.unshift({
    id: steps[0].id + seed + '-' + startId,
    source: startId,
    target: steps[0].id.toString() + seed,
    type: 'default',
    animated: true,
    label: 'Bắt đầu',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  });
  // add end node
  const endId = 'end-node-' + seed;
  nodes.push({
    id: endId,
    type: 'default',
    draggable: false,
    data: {
      label: 'Phát hành'
    },
    position: { x: 0, y: 0 },
    style: {
      backgroundColor: '#bdbdbd'
    }
  });
  edges.push({
    id: steps[steps.length - 1].id.toString() + '-' + endId,
    source: steps[steps.length - 1].id.toString() + seed,
    target: endId,
    type: 'default',
    animated: true,
    label:
      WorkFlowActionDict[steps[steps.length - 1].action] +
      ' - Hạn xử lý ' +
      dayjs
        .utc(steps[steps.length - 1].deadline)
        .tz(TIMEZONE)
        .format('HH:mm DD/MM/YYYY'),
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  });

  return { nodes, edges };
};

const StatusColorAnnotation = () => {
  const keys = Object.keys(StatusColor);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {keys.map((key) => (
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
              backgroundColor: StatusColor[key as unknown as Status],
              marginRight: '10px'
            }}
          />
          <Typography variant="body1">
            {StatusLabel[key as unknown as Status]}
          </Typography>
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
