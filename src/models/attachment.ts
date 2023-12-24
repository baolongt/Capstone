export class Attachment {
  public readonly id?: number | string;
  public readonly name: string;
  public readonly url: string;
  public needSigned: boolean;
  public readonly size: string;
  public readonly mimeType: string;
  public fileGuid: string;
  constructor({
    id,
    name,
    url,
    needSigned = false,
    size,
    mimeType,
    fileGuid
  }: {
    id?: number | string;
    name: string;
    url: string;
    needSigned?: boolean;
    size: string;
    mimeType: string;
    fileGuid: string;
  }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.url = url;
    this.needSigned = needSigned;
    this.size = size;
    this.mimeType = mimeType;
    this.fileGuid = fileGuid;
  }
}
