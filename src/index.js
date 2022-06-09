import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactTable from './ReactTable';
import UseFetch from './useFetch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseFetch />
  </React.StrictMode>
);

