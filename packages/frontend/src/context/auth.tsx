import { usePrevious } from 'hooks/usePrevious';
import useGetCurrentCuser from 'hooks/user/useGetCurrentUser';
import { not } from 'ramda';
import React from 'react';
import { useCookies } from 'react-cookie';

export type IUser = {
   name: string;
   email: string;
   password: string;
};

export type IAuthContext = {
   authenticated: boolean;
   setAuthenticated: (is_authenticated: boolean) => void;
   user: IUser;
};

export const DEFAULT_USER = {
   name: '',
   email: '',
   password: ''
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const AuthContext = React.createContext<IAuthContext>({
   authenticated: false,
   setAuthenticated: noop,
   user: DEFAULT_USER
});

export type AuthProviderProps = {
   default_authenticated?: boolean;
   default_user?: IUser;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
   default_authenticated = false,
   default_user = DEFAULT_USER,
   children
}) => {
   const [authenticated, setAuthenticated] = React.useState(default_authenticated);
   const [user, setUser] = React.useState(default_user);

   const previous_authenticated = usePrevious(authenticated);

   const [cookies] = useCookies();
   const { data: current_user, refetch: refetchCurrentUser } = useGetCurrentCuser();

   const onLogin = () => refetchCurrentUser();

   React.useEffect(() => {
      const is_authenticated = cookies['is_authenticated'];

      if (is_authenticated && JSON.parse(is_authenticated)) {
         setAuthenticated(true);
      }

      if (current_user) setUser(current_user);
   }, [cookies, current_user]);

   React.useEffect(() => {
      // not authenticated previously && authenticated
      // not false = true && authenticated => process logins
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

export const useAuthState = () => React.useContext(AuthContext);
