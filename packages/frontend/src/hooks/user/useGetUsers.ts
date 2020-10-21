import { useQuery } from 'react-query';
import { axiosInstance } from 'util/base';

export default function useGetUsers() {
   return useQuery('users', async () => {
      const response = await axiosInstance.get('/users');
      return response.data.users;
   });
}
