// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export function send(id: string) {
  window.sendToSignalR(id);
}
