import { useAuthState } from 'context/auth';
import { not } from 'ramda';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface WrapperProps {
   component: React.ComponentType;
   is_private?: boolean;
   guest?: boolean;
   exact?: boolean;
   path: string;
}

/**
 * * important information is highlighted
 * @param is_private
 * @param guest
 *
 */
const RouteWrapper: React.FC<WrapperProps> = ({
   component: Component,
   is_private,
   guest,
   ...rest
}) => {
   const { authenticated } = useAuthState();
   // const user = false; //* bypass authentication

   if (is_private && not(authenticated)) {
      return <Redirect to="/sign-in" />;
   }

   if (guest && authenticated) {
      return <Redirect to="/" />;
   }

   return <Route {...rest} component={Component} />;
};

export default RouteWrapper;
