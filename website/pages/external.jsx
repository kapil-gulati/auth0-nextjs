import React, { useState } from 'react';
import {Button, Link, Spacer} from "@nextui-org/react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';

function External() {
  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined });

  const callApi = async () => {
    setState(previous => ({ ...previous, isLoading: true }))

    try {
      const response = await fetch('/api/shows');
      const data = await response.json();

      setState(previous => ({ ...previous, response: data, error: undefined }))
    } catch (error) {
      setState(previous => ({ ...previous, response: undefined, error }))
    } finally {
      setState(previous => ({ ...previous, isLoading: false }))
    }
  };

  const handle = (event, fn) => {
    event.preventDefault();
    fn();
  };

  const { isLoading, response, error } = state;

  return (
    <div className="container-fluid">
      <div className="row" data-testid="external">
        <p className="h4" data-testid="external-title">External API</p>
        <div data-testid="external-text">
          <p className="h6">
            Ping an external API by clicking the button below
          </p>
          <p>
          This will call a local API on port 3001 that would have been started if you run <code>npm run dev</code>.
          </p>
          <p>
          An access token is sent as part of the request's <code>Authorization</code> header and the API will validate
          it using the API's audience value. The audience is the identifier of the API that you want to call (see{" "}
          <Link href="https://auth0.com/docs/get-started/dashboard/tenant-settings#api-authorization-settings">
            API Authorization Settings
          </Link>{" "}for more info).
          </p>
          <Spacer></Spacer>
        </div>

      </div>
      <Button color="primary" onClick={e => handle(e, callApi)} data-testid="external-action">
        Ping API
      </Button>
      <Spacer y={5}></Spacer>
      <div className="result-block-container">
        {isLoading && <Loading />}
        {(error || response) && (
          <div className="result-block" data-testid="external-result">
            <p className="h6">Result</p>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <Highlight>{JSON.stringify(response, null, 2)}</Highlight>}
          </div>
        )}
      </div>
    </div>
  );
}

export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
