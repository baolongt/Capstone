// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export async function send(id: string) {
  await window.sendToSignalR(id);
}

export async function connect() {
  const res = await window.connect();
  console.log('res', res);
  return res;
}

export async function setUserName(name) {
  await window.setUserName(name);
}

export function isConnect(): boolean {
  const res = window.isConnect();
  return res;
}
