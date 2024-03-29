import { v4 as uuidv4 } from 'uuid';

export type UploadFileType = InstanceType<typeof UploadFile>;

export class UploadFile {
  public readonly id: string;
  public name?: string;
  public url?: string;
  public needSigned: boolean;
  public fileObj?: File;
  public fileGuid?: string;

  constructor({
    name,
    url,
    fileObj,
    needSigned = false
  }: {
    name?: string;
    url?: string;
    fileObj?: File;
    needSigned?: boolean;
  }) {
    this.id = uuidv4();

    if (name) this.name = name;
    if (url) this.url = url;
    if (fileObj) this.fileObj = fileObj;
    this.needSigned = needSigned;
  }

  getprop(propName: keyof UploadFile): string | null {
    return this[propName] ? String(this[propName]) : null;
  }

  setNameUrlAndGuid(name: string, url: string, fileGuid: string) {
    this.name = name;
    this.url = url;
    this.fileGuid = fileGuid;
  }
}
