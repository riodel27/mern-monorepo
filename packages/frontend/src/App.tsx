import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import styled from 'styled-components';

import './app.css';
import Routes from 'routes';

const AppContainer = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
   padding: 20px;
`;

function App() {
   return (
      <AppContainer>
         <Router>
            <Routes />
         </Router>
         <ReactQueryDevtools initialIsOpen />
      </AppContainer>
   );
}

export default App;
