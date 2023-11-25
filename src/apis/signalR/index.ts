// ts-nocheck
import { toast } from 'react-toastify';

declare global {
  interface Window {
    connect: () => Promise<boolean>;
    setUserName: (name: string) => Promise<void>;
    isConnect: () => boolean;
  }
}
export async function send(id: string) {
  const isConnected = await connect();
  if (isConnected) {
    await setUserName('test');
    await send(id as string);
  } else {
    toast.error('Không thể kết nối đến thiết bị ký số');
  }
}

export async function connect() {
  const res = await window.connect();
  console.log('res', res);
  return res;
}

export async function setUserName(name: string) {
  await window.setUserName(name);
}

export function isConnect(): boolean {
  const res = window.isConnect();
  return res;
}
