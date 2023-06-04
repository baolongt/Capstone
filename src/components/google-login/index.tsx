import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { Button, Grid, TextField } from '@mui/material';

// eslint-disable-next-line no-undef
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;
// eslint-disable-next-line no-undef
const SCOPES = process.env.REACT_APP_SCOPES;

const LoginGoogleButton: React.FC<{ handleLogin: any }> = ({ handleLogin }) => {
  const onSuccess = (res: any) => {
    handleLogin();
    console.log('[Login Success] currentUser:', res.profileObj);
  };

  const onFailure = (res: any) => {
    console.log('[Login failed] res:', res);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={8}>
        <div id="signInButton">
          <GoogleLogin
            onSuccess={onSuccess}
            onFailure={onFailure}
            clientId={CLIENT_ID}
            buttonText="Login"
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </div>
      </Grid>
    </Grid>
  );
};

// create logout button same as login button
const LogoutGoogleButton: React.FC<{ handleLogout: any }> = ({
  handleLogout
}) => {
  const onSuccess = () => {
    handleLogout();
    alert('Logout made successfully');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}></Grid>
      <Grid item xs={8}>
        <div id="signOutButton">
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const createDoc = async (title: string) => {
  // get access token from gapi
  var accessToken = gapi.auth.getToken().access_token;

  try {
    const response = await axios.post(
      'https://docs.googleapis.com/v1/documents',
      {
        title
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response);
    window.open(
      `https://docs.google.com/document/d/${response.data.documentId}/edit`
    );
  } catch (e) {
    console.log(e);
  }
};

const Form = () => {
  const [title, setTitle] = useState('');

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createDoc(title);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: '10px auto', maxWidth: '500px' }}
    >
      <TextField
        label="Nhập tên văn bản"
        value={title}
        onChange={handleChange}
        fullWidth
      />
      <Button style={{ marginTop: '10px' }} type="submit" variant="contained">
        Tạo văn bản
      </Button>
    </form>
  );
};

export const CreateDocPage = () => {
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handleLogin = () => {
    const token = gapi.auth.getToken().access_token;
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    // Remove token from localStorage and clear state
    localStorage.removeItem('authToken');
    setAuthToken('');
  };

  useEffect(() => {
    // init gapi client
    const start = async () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      });
      console.log(gapi.client);
    };

    gapi.load('client:auth2', start);
  });

  return (
    <>
      {!authToken ? (
        <>
          <LoginGoogleButton handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <LogoutGoogleButton handleLogout={handleLogout} />
          <Form />
        </>
      )}
    </>
  );
};
