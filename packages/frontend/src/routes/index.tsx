import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

function Routes() {
   return (
      <Switch>
         <Route exact path="/" component={() => <div>HOMe</div>} is_private />
         <Route exact path="/sign-in" component={() => <div>Sign In</div>} guest />
         <Route exact path="/sign-up" component={() => <div>Sign UP</div>} guest />
      </Switch>
   );
}

export default Routes;
