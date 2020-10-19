import { useMutation } from 'react-query';
import { axiosInstance } from 'util/base';
import { Inputs } from 'screens/Login';

export default function useSignIn() {
   return useMutation(
      async (data: Inputs) => {
         await axiosInstance.post('/auth/signin', data);
      },
      {
         onSuccess: () => {
            console.log('success sign in mutation');
         }
      }
   );
}
