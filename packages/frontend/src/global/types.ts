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

export type AuthProviderProps = {
   default_authenticated?: boolean;
   default_user?: IUser;
};
