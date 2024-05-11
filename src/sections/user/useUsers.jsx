import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser, getUserList, insertUser, updateUser, deleteUser } from '../../api/firebase';

export default function useUsers(id) {
  const queryClient = useQueryClient();
  // const id = user && user.id;

  const getRecord = useQuery({
    queryKey: ['users', id],
    queryFn: id => getUser(id),
    staleTime: 1000 * 60 * 60,
  })

  const getList = useQuery({
    queryKey: ['users'],
    queryFn: getUserList,
    staleTime: 1000 * 60 * 5,
  });

  const insertRecord = useMutation({
    mutationFn: user => insertUser(user),
    onSuccess: () => { queryClient.invalidateQueries(['users']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: user => updateUser(user),
    onSuccess: () => { queryClient.invalidateQueries(['users']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: id => deleteUser(id),
    onSuccess: () => { queryClient.invalidateQueries(['users']); },
    onError: console.error,
  });

  return { getRecord, getList, insertRecord, updateRecord, deleteRecord };
}