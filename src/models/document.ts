export type UpdatePayload = Pick<
  Document,
  'id' | 'title' | 'fileNotation' | 'language' | 'description' | 'status'
>;

export type CreatePayload = Pick<
  Document,
  'id' | 'title' | 'fileNotation' | 'language' | 'description'
>;

export class Document {
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
    status
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
  }

  getprop(propName: keyof Document): string | null {
    return this[propName] ? String(this[propName]) : null;
  }
  toUpdatePayload(): UpdatePayload {
    return {
      id: this.id,
      title: this.title,
      fileNotation: this.fileNotation,
      language: this.language,
      description: this.description,
      status: this.status
    };
  }

  toCreatePayload(): CreatePayload {
    return {
      id: this.id,
      title: this.title,
      fileNotation: this.fileNotation,
      language: this.language,
      description: this.description
    };
  }
}
