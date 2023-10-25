// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export async function send(id: string) {
  await window.sendToSignalR(id);
}

export async function connect() {
  return await window.connect();
}

export async function setUserName(name) {
  return await window.setUserName(name);
}
