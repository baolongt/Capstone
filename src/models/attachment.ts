export class Attachment {
  public readonly id?: number | string;
  public readonly name: string;
  public readonly url: string;
  public readonly needSigned: boolean;
  public readonly size: string;
  public readonly mimeType: string;

  constructor({
    id,
    name,
    url,
    needSigned = false,
    size,
    mimeType
  }: {
    id?: number | string;
    name: string;
    url: string;
    needSigned?: boolean;
    size: string;
    mimeType: string;
  }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.url = url;
    this.needSigned = needSigned;
    this.size = size;
    this.mimeType = mimeType;
  }
}
