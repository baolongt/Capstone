import { incomingDocument, internalDocument, outgoingDocument } from '.';

export type UpdatePayload = Pick<
  File,
  'title' | 'fileNotation' | 'language' | 'description' | 'status'
>;

export type CreatePayload = Pick<
  File,
  'title' | 'fileNotation' | 'language' | 'description'
>;

export class File {
  id: number;
  organCode: string;
  title: string;
  fileCreatedYear: string;
  fileNotation: string;
  creatorId: number;
  language: string;
  startDate: Date;
  endDate: Date;
  creator: string;
  docTotal: number;
  description: string;
  status: 'active' | 'inactive';
  docs:
    | outgoingDocument.OutgoingDocument[]
    | incomingDocument.IncomingDocument[]
    | internalDocument.InternalDocument[];

  constructor({
    id,
    organCode,
    title,
    fileCreatedYear,
    fileNotation,
    creatorId,
    language,
    startDate,
    endDate,
    docTotal,
    description,
    status,
    creator,
    docs
  }: {
    id: number;
    organCode: string;
    title: string;
    fileCreatedYear: string;
    fileNotation: string;
    creatorId: number;
    language: string;
    startDate: Date;
    endDate: Date;
    docTotal: number;
    description: string;
    status: 'active' | 'inactive';
    creator: string;
    docs:
      | outgoingDocument.OutgoingDocument[]
      | incomingDocument.IncomingDocument[]
      | internalDocument.InternalDocument[];
  }) {
    this.id = id;
    this.organCode = organCode;
    this.title = title;
    this.fileCreatedYear = fileCreatedYear;
    this.fileNotation = fileNotation;
    this.creatorId = creatorId;
    this.language = language;
    this.startDate = startDate;
    this.endDate = endDate;
    this.docTotal = docTotal;
    this.description = description;
    this.status = status;
    this.creator = creator;
    this.docs = docs;
  }

  getprop(propName: keyof File): string | null {
    return this[propName] ? String(this[propName]) : null;
  }
  toUpdatePayload(): UpdatePayload {
    return {
      title: this.title,
      fileNotation: this.fileNotation,
      language: this.language,
      description: this.description,
      status: this.status
    };
  }

  toCreatePayload(): CreatePayload {
    return {
      title: this.title,
      fileNotation: this.fileNotation,
      language: this.language,
      description: this.description
    };
  }
}
