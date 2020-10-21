import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { Login } from 'screens/Login';
import { SignUp } from 'screens/SignUp';
import { User } from 'screens/User';

import Route from './Route';

function Routes() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={() => <div>Dashboard</div>} is_private />
            <Route exact path="/sign-in" component={Login} guest />
            <Route exact path="/sign-up" component={SignUp} guest />
            <Route path="/users" component={User} is_private />
         </Switch>
      </Router>
   );
}

export default Routes;
