import { useMutation } from 'react-query';
import { axiosInstance } from 'util/base';
import { Inputs } from 'screens/SignUp';

export default function useSignUp() {
   return useMutation(
      async (data: Inputs) => {
         await axiosInstance.post('/auth/signup', data);
      },
      {
         onSuccess: () => {
            console.log('success sign up mutation');
         }
      }
   );
}
