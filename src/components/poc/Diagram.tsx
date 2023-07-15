import React from 'react';
import { GraphCanvas } from 'reagraph';

const nodes = [
  {
    id: 'n-1',
    label: 'Tran Bao Long'
  },
  {
    id: 'n-2',
    label: 'Tu Trong Duc'
  },
  {
    id: 'n-3',
    label: '????'
  },
  {
    id: 'n-4',
    label: 'X Department'
  }
];

const edges = [
  {
    id: '1->2',
    source: 'n-1',
    target: 'n-2',
    label: 'Edge 1-2'
  },
  {
    id: '2->3',
    source: 'n-2',
    target: 'n-3',
    label: 'Edge 1-3'
  },
  {
    id: '3->4',
    source: 'n-3',
    target: 'n-4',
    label: 'Edge 1-4'
  }
];

export const Diagram = () => (
  <GraphCanvas layoutType="hierarchicalLr" nodes={nodes} edges={edges} />
);
