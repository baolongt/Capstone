export enum Status {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3
}

export enum Action {
  CONSIDER = 1,
  SIGN
}

export const convertActionToString = (action: Action) => {
  switch (action) {
    case Action.CONSIDER:
      return 'Xem xét';
    case Action.SIGN:
      return 'Ký duyệt';
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
