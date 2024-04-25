import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserList } from '../../api/firebase';

export default function useUsers() {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['users'],
    queryFn: getUserList,
    staleTime: 1000 * 60 * 5
  });

  return { getRecord };
}