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
import { Edge, MarkerType, Node, Position } from 'reactflow';

import { Step } from '@/apis';
import FlowChart from '@/components/flow-chart';
import { TIMEZONE } from '@/constants';
import { Action, Status, WorkFlowActionDict } from '@/models/work-flow';

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

const convertStepsToNodesAndEdges = (steps: Step[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const seed = '-' + new Date().getTime();
  // first convert fail step to node
  const failStepIds = steps
    .filter((step) => step.failStepNumber)
    .map((step) => step.failStepNumber);
  const stepMap = steps.reduce((acc, item) => {
    acc.set(item.stepNumber, item);
    return acc;
  }, new Map<number, Step>());
  const convertedNodes: {
    nodeId: string;
    type: string;
    // if it is a step node
    step?: Step;
    // if it is a conditaion node
    failNodeId?: string;
    isFailStepHandler?: boolean;
  }[] = [];

  steps.forEach((step) => {
    convertedNodes.push({
      step: step,
      nodeId: '' + step.id + seed,
      type: 'rectangleNode',
      ...(failStepIds.includes(step.id) ? { isFailStepHandler: true } : {})
    });
    if (step.failStepNumber) {
      const failStep = stepMap.get(step.failStepNumber) as Step;
      convertedNodes.push({
        nodeId: '' + step.id + '-' + failStep.id + seed,
        failNodeId: '' + failStep.id + seed,
        type: 'rhombusNode'
      });
    }
  });

  convertedNodes.forEach((node, index) => {
    nodes.push({
      id: node.nodeId,
      type: node.type,
      data: {
        // the conditaion node only condition node dont have step
        label: node.step?.handlerName || '',
        status: node.step?.status || '',
        // for condiftion node
        ...(node.failNodeId ? { isConditaionNode: true } : {}),
        ...(node.isFailStepHandler ? { isFailStepHandler: true } : {})
      },
      position: { x: 0, y: 0 },
      draggable: false
    });

    if (index == 0) return;

    // we treat step and condition equally
    edges.push({
      id: `${convertedNodes[index - 1].nodeId} -> ${node.nodeId}`,
      source: convertedNodes[index - 1].nodeId,
      sourceHandle: `${convertedNodes[index - 1].nodeId}.bottom`,
      target: node.nodeId,
      targetHandle: `${node.nodeId}.top`,
      type: 'straight',
      animated: true,
      ...(convertedNodes[index - 1].step
        ? {
            label:
              WorkFlowActionDict[
                convertedNodes[index - 1].step?.action as Action
              ] +
              ' - Hạn xử lý ' +
              dayjs
                .utc(convertedNodes[index - 1].step?.deadline)
                .tz(TIMEZONE)
                .format('HH:mm DD/MM/YYYY')
          }
        : {}),
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      focusable: true
    });
    //fail edge
    if (node.failNodeId) {
      edges.push({
        id: `${node.nodeId} -> ${node.failNodeId}`,
        source: node.nodeId,
        sourceHandle: '' + node.nodeId + '.right',
        target: node.failNodeId,
        targetHandle: node.failNodeId + '.right',
        type: 'step',
        animated: true,
        label: 'Từ chối xử lý',
        markerEnd: {
          type: MarkerType.ArrowClosed
        }
      });
    }
  });

  // add start node
  const startId = 'start-node-' + seed;
  nodes.unshift({
    id: startId,
    type: 'circleNode',
    data: {
      label: 'Khởi tạo',
      isStatusNode: true
    },
    position: { x: 0, y: 0 },
    draggable: false
  });
  edges.unshift({
    id: steps[0].id + seed + '-' + startId,
    source: startId,
    target: steps[0].id.toString() + seed,
    animated: true,
    type: 'straight',
    label: 'Bắt đầu',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  });
  // add end node
  const endId = 'end-node-' + seed;
  nodes.push({
    id: endId,
    draggable: false,
    type: 'circleNode',
    data: {
      label: 'Phát hành',
      isStatusNode: true
    },
    position: { x: 0, y: 0 }
  });
  edges.push({
    id: steps[steps.length - 1].id.toString() + '-' + endId,
    source: steps[steps.length - 1].id.toString() + seed,
    target: endId,
    type: 'straight',
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

  console.log('debug', { nodes, edges });

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
    const { nodes, edges } = convertStepsToNodesAndEdges(steps);
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
