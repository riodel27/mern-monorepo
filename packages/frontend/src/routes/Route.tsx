import React from 'react';
import { not } from 'ramda';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from 'context/Authentication';
interface WrapperProps {
   component: React.ComponentType;
   is_private?: boolean;
   guest?: boolean;
   exact?: boolean;
   path: string;
}

/**
 *
 * @param is_private
 * @param guest :: public
 */
const RouteGuard: React.FC<WrapperProps> = ({
   component: Component,
   is_private,
   guest,
   ...rest
}) => {
   const { authenticated } = useAuthState();
   // const authenticated = true; // bypass authentication

   if (is_private && not(authenticated)) {
      return <Redirect to="/sign-in" />;
   }

   if (guest && authenticated) {
      return <Redirect to="/" />;
   }

   return <Route {...rest} component={Component} />;
};

export default RouteGuard;
