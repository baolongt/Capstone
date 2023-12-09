/* eslint-disable react-hooks/exhaustive-deps */
import 'reactflow/dist/style.css';

import { Box } from '@mui/material';
import dagre from 'dagre';
import React, { useEffect } from 'react';
import ReactFlow, {
  ConnectionLineType,
  Controls,
  Edge,
  Node,
  Position,
  useEdgesState,
  useNodesState
} from 'reactflow';

import CircleNode from './circle-node';
import RectangleNode from './rectangle-node';
import RhombusNode from './rhombus-node';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeTypes = {
  circleNode: CircleNode,
  rectangleNode: RectangleNode,
  rhombusNode: RhombusNode
};

type FlowChartProps = {
  nodes: Node[];
  edges: Edge[];
};

const nodeWidth = 140;
const distance = 100;
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  nodes.forEach((node, index) => {
    if (node.data.isConditaionNode) {
      node.position = {
        x: nodeWidth / 2,
        y: index * distance
      };
    } else if (node.data.isStatusNode) {
      node.position = {
        x: 55,
        y: index * distance
      };
    } else {
      node.position = {
        x: 0,
        y: index * distance
      };
    }
    return node;
  });

  return { nodes, edges };
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
    // setNodes(initialNodes);
    // setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

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
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default FlowChart;
