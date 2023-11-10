export enum Status {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3
}

export enum Action {
  CONSIDER = 1,
  SIGN,
  ADD_NUMNER,
  PREPARE_EMAIL
}

export const WorkFlowActionDict: Record<Action, string> = {
  [Action.CONSIDER]: 'Xem xét',
  [Action.SIGN]: 'Ký duyệt',
  [Action.ADD_NUMNER]: 'Thêm số',
  [Action.PREPARE_EMAIL]: 'Chuẩn bị email'
};

export const ActionOptions = [
  Action.SIGN,
  Action.CONSIDER,
  Action.ADD_NUMNER,
  Action.PREPARE_EMAIL
];

export const convertActionToString = (action: Action) => {
  switch (action) {
    case Action.CONSIDER:
      return 'Xem xét';
    case Action.SIGN:
      return 'Ký duyệt';
    case Action.ADD_NUMNER:
      return 'Thêm số';
    case Action.PREPARE_EMAIL:
      return 'Chuẩn bị email';
  }
};

export type Step = {
  id: number;
  stepNumber: number;
  handlerId: number;
  handlerName: string;
  action: Action;
  status: Status;
};

export type StepCreate = {
  id: number; // for drag and drop
  handlerId: number;
  action: Action;
};

export enum DocumentTypeCreate {
  OUTGOING = 1,
  INCOMING = 2,
  INTERNAL = 3
}
