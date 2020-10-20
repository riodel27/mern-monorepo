import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';

import { axiosInstance } from 'util/base';
import { Inputs } from 'screens/Login';
import { useAuthState } from 'context/Authentication';

export default function useSignIn() {
   const { setAuthenticated } = useAuthState();
   const [_, setCookie] = useCookies();

   return useMutation(
      async (data: Inputs) => {
         await axiosInstance.post('/auth/signin', data);
      },
      {
         onSuccess: () => {
            console.log('success sign in mutation');
            setAuthenticated(true);
            setCookie('is_authenticated', true, { maxAge: 60 * 60 }); //maxAge is the same from session-cookie
         }
      }
   );
}
