import React from 'react';
import { Switch } from 'react-router-dom';

import { Login } from 'screens/Login';
import { SignUp } from 'screens/SignUp';
import Route from './Route';

function Routes() {
   return (
      <Switch>
         <Route exact path="/" component={() => <div>Home</div>} is_private />
         <Route exact path="/sign-in" component={Login} guest />
         <Route exact path="/sign-up" component={SignUp} guest />
      </Switch>
   );
}

export default Routes;
