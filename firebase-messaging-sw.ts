import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

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
export const getFireBaseToken = (
  setTokenFound: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return getToken(messaging, {
    vapidKey:
      'BEFD8e3e4IzHXSn6nPOtm25x6egC8ivcsEJW3H1oWxSuRFHIz6qHi9OMNa4PdUZQ5uY7CXCIpdg78M-xlZYJwLo'
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};
