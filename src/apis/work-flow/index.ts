export enum WorkFlowStatus {
  APPROVED = 1,
  REJECTED = 2,
  PENDING = 3
}

export enum WorkFlowDocType {
  OUTGOING = 1,
  INCOMING = 2,
  INTERNAL = 3
}

export * from './change-status';
export * from './create';
export * from './edit';
export * from './get-workflows';
export * from './list-handlers';
