import React from 'react';

const FetchError = ({ message, onRetry }) => (
  <div>
    <p>Cound not fetch recipes. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default FetchError;
