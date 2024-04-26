import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserList, insertUser } from '../../api/firebase';

export default function useUsers() {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['users'],
    queryFn: getUserList,
    staleTime: 1000 * 60 * 5,
  });

  const insertRecord = useMutation({
    mutationFn: user => insertUser(user),
    onSuccess: () => { queryClient.invalidateQueries(['users']); },
    onError: console.error,
  })

  return { getRecord, insertRecord };
}