import React from 'react';
import { useCookies } from 'react-cookie';
import { not } from 'ramda';

import { AuthProviderProps } from 'global/types';
import { AuthContext, DEFAULT_USER } from './Context';
import { usePrevious } from 'hooks/usePrevious';
import useGetCurrentCuser from 'hooks/user/useGetCurrentUser';

export const AuthProvider: React.FC<AuthProviderProps> = ({
   default_authenticated = false,
   default_user = DEFAULT_USER,
   children
}) => {
   const [cookies] = useCookies();

   const is_authenticated = cookies['is_authenticated'];

   const [authenticated, setAuthenticated] = React.useState(
      (is_authenticated && JSON.parse(is_authenticated)) || default_authenticated
   );

   const previous_authenticated = usePrevious(authenticated);

   const [user, setUser] = React.useState(default_user);

   const { data: current_user, refetch: refetchCurrentUser } = useGetCurrentCuser();

   const onLogin = () => refetchCurrentUser();

   React.useEffect(() => {
      if (current_user) setUser(current_user);
   }, [current_user]);

   React.useEffect(() => {
      if (not(previous_authenticated) && authenticated) {
         onLogin();
      }
   }, [previous_authenticated, authenticated]);

   const context_value = React.useMemo(() => ({ authenticated, user, setAuthenticated }), [
      authenticated,
      user
   ]);

   return <AuthContext.Provider value={context_value}>{children}</AuthContext.Provider>;
};
