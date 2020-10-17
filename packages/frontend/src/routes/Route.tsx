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
   //    const { user } = useAuthState();
   const user = false; //* bypass authentication

   if (is_private && not(user)) {
      return <Redirect to="/sign-in" />;
   }

   if (guest && user) {
      return <Redirect to="/" />;
   }

   return <Route {...rest} component={Component} />;
};

export default RouteWrapper;
