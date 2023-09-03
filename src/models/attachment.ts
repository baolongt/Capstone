import { v4 as uuidv4 } from 'uuid';

export class Attachment {
  public readonly id: string;
  public readonly name: string;
  public readonly url: string;
  public readonly needSigned: boolean;
  public readonly size: string;
  public readonly mimeType: string;

  constructor({
    name,
    url,
    needSigned = false,
    size,
    mimeType
  }: {
    name: string;
    url: string;
    needSigned?: boolean;
    size: string;
    mimeType: string;
  }) {
    this.id = uuidv4();
    this.name = name;
    this.url = url;
    this.needSigned = needSigned;
    this.size = size;
    this.mimeType = mimeType;
  }
}
