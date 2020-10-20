import React from 'react';

import { IAuthContext } from 'global/types';

export const DEFAULT_USER = {
   name: '',
   email: '',
   password: ''
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const AuthContext = React.createContext<IAuthContext>({
   authenticated: false,
   setAuthenticated: noop,
   user: DEFAULT_USER
});

export const useAuthState = () => React.useContext(AuthContext);
