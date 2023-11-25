/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '@/constants';
import { getFireBaseToken } from '@/firebase-messaging-sw';

const firebaseConfig = {
  apiKey: 'AIzaSyAlCbCpbwlo9mbsVX9iqM-nAoGA6PkPH0U',
  authDomain: 'capstone-project-f17e6.firebaseapp.com',
  projectId: 'capstone-project-f17e6',
  storageBucket: 'capstone-project-f17e6.appspot.com',
  messagingSenderId: '972493547090',
  appId: '1:972493547090:web:7274b946e241dbd5ee218b',
  measurementId: 'G-9VWGQS12J9'
};

initializeApp(firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

const openNotification = (message: string, description: string) => {
  toast.info(
    <>
      <Typography variant="h6">{message}</Typography>
      <Typography variant="body1">{description}</Typography>
    </>
  );
};

const NotiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    getFireBaseToken(setToken);
  }, []);

  onMessageListener()
    .then((payload: any) => {
      openNotification(payload.notification.title, payload.notification.body);
      console.log(payload);
      queryClient.invalidateQueries({ queryKey: [api.NOTIFICATION] });
    })
    .catch((err) => console.log('failed: ', err));
  return <>{children}</>;
};

export default NotiProvider;
