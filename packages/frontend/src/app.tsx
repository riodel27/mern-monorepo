import React from 'react';
import styled from 'styled-components';

import './app.css';
import { AuthenticatedApp } from './authenticated-app';
import { UnAuthenticatedApp } from './unauthenticated-app';

const AppContainer = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
   padding: 20px;
`;

function App() {
   const user = false;
   return <AppContainer>{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</AppContainer>;
}

export default App;
