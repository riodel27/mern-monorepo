import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { Login } from 'screens/Login';
import { SignUp } from 'screens/SignUp';
import Route from './Route';

function Routes() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={() => <div>Dashboard</div>} is_private />
            <Route exact path="/sign-in" component={Login} guest />
            <Route exact path="/sign-up" component={SignUp} guest />
            <Route path="/users" component={() => <div>Users</div>} is_private />
         </Switch>
      </Router>
   );
}

export default Routes;
