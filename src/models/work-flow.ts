export enum Status {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
  NOT_START = 4
}

export enum Action {
  CONSIDER = 1,
  SIGN = 2,
  ADD_NUMNER = 3,
  PREPARE_EMAIL = 4,
  INCOMING_CONSIDER = 20,
  INTERNAL_SEND_TO_HEAD_OFFFICE = 40,
  INTERNAL_SEND_TO_LEADER = 41
}

export const WorkFlowActionDict: Record<Action, string> = {
  [Action.CONSIDER]: 'Xem xét',
  [Action.SIGN]: 'Ký duyệt',
  [Action.ADD_NUMNER]: 'Thêm số',
  [Action.PREPARE_EMAIL]: 'Chuẩn bị email',
  [Action.INCOMING_CONSIDER]: 'Xem xét',
  [Action.INTERNAL_SEND_TO_HEAD_OFFFICE]: 'Xem xét',
  [Action.INTERNAL_SEND_TO_LEADER]: 'Ban hành'
};

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
    case Action.INCOMING_CONSIDER:
      return 'Xem xét';
    case Action.INTERNAL_SEND_TO_HEAD_OFFFICE:
      return 'Xem xét';
    case Action.INTERNAL_SEND_TO_LEADER:
      return 'Ban hành';
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

export const ActionOptions: Record<DocumentTypeCreate, Action[]> = {
  [DocumentTypeCreate.OUTGOING]: [
    Action.SIGN,
    Action.CONSIDER,
    Action.ADD_NUMNER,
    Action.PREPARE_EMAIL
  ],
  [DocumentTypeCreate.INCOMING]: [Action.INCOMING_CONSIDER],
  [DocumentTypeCreate.INTERNAL]: [
    Action.INTERNAL_SEND_TO_HEAD_OFFFICE,
    Action.INTERNAL_SEND_TO_LEADER
  ]
};
