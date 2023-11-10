/* eslint-disable react-hooks/exhaustive-deps */
import 'reactflow/dist/style.css';

import { Box, Button } from '@mui/material';
import dagre from 'dagre';
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  ConnectionLineType,
  Controls,
  Edge,
  Node,
  Panel,
  Position,
  useEdgesState,
  useNodesState
} from 'reactflow';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = 'TB'
) => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };

    return node;
  });

  return { nodes, edges };
};

type FlowChartProps = {
  nodes: Node[];
  edges: Edge[];
};

const FlowChart = ({
  nodes: initialNodes,
  edges: initialEdges
}: FlowChartProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [initialNodes, initialEdges]);

  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  if (nodes.length === 0 && edges.length === 0) {
    return <>Không có dữ liệu</>;
  }

  return (
    <Box
      sx={{
        height: '70vh',
        width: '100%'
      }}
    >
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultViewport={{ x: 0, y: 0, zoom: 0.1 }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Panel position="top-right">
          <Button onClick={() => onLayout('TB')}>Xem dọc</Button>
          <Button onClick={() => onLayout('LR')}>Xem ngang</Button>
        </Panel>
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default FlowChart;
