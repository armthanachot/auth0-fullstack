// src/views/external-api.js

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();
  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/messages/public-message`);

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/api/messages/protected-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callProtectWithScopedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/api/messages/scoped-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
  const callProtectWithPermissionApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/api/messages/two-permission-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log("responseData: ", responseData);
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const authorization = async()=>{
    const result = await fetch("")
  }

  const getToken = async () => {
    const result = await fetch("https://dev-s3o1avy9.us.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: {
        data: {
          grant_type: 'authorization_code',
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
          client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
          code: 'OVgFwrXMduEQKMCz',
          redirect_uri: 'http://localhost:4040/profile'
        }
      }
    })
  }

  return (
    <div className="container">
      <h1>External API</h1>
      <p>
        Use these buttons to call an external API. The protected API call has an
        access token in its authorization header. The API server will validate
        the access token using the Auth0 Audience value.
      </p>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button type="button" className="ml-5 btn btn-primary" onClick={callApi}>
          Get Public Message
        </button>
        <button
          type="button"
          className="ml-5 btn btn-warning"
          onClick={callSecureApi}
        >
          Get Protected Message
        </button>
        <button
          type="button"
          className="ml-5 btn btn-info"
          onClick={callSecureApi}
        >
          Get Protected With Scoped Message
        </button>
        <button
          type="button"
          className="ml-5 btn btn-danger"
          onClick={callProtectWithPermissionApi}
        >
          Get Protected With Permission Message
        </button>
        <a
          className="ml-5 btn btn-danger"
          href="https://dev-s3o1avy9.us.auth0.com/authorize"
        >
          OAuth
        </a>
      </div>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalApi;
