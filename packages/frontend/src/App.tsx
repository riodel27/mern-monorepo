import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';

import './app.css';
import Routes from 'routes';

function App() {
   return (
      <>
         <Router>
            <Routes />
         </Router>
         <ReactQueryDevtools initialIsOpen />
      </>
   );
}

export default App;
