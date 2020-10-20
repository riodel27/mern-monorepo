/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';

import './app.css';
import Routes from 'routes';

/**
 * TODO: how to watch for unauthorized request to set the authenticated to false and remove is_authenticated from the cookie.
 */
function App() {
   return (
      <>
         <Routes />
         <ReactQueryDevtools initialIsOpen />
      </>
   );
}

export default App;
