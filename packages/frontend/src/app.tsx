import React from 'react';

import './app.css';
import { AuthenticatedApp } from './authenticated-app';
import { UnAuthenticatedApp } from './unauthenticated-app';

function App() {
   const user = false;
   return <div className="app">{user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</div>;
}

export default App;
