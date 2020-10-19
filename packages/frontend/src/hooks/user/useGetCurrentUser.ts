import { useQuery } from 'react-query';
import { axiosInstance } from 'util/base';

export default function useGetCurrentCuser() {
   return useQuery(
      'current',
      async () => {
         const response = await axiosInstance.get('user/current');
         return response.data.user;
      },
      {
         enabled: false,
         refetchOnWindowFocus: false
      }
   );
}
