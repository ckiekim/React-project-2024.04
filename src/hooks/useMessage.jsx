import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessageList, insertMessage, updateMessage, deleteMessage } from '../api/firebase';

export default function useMessage(email, mid) {
  const queryClient = useQueryClient();

  const getList = useQuery({
    queryKey: ['message', email],
    queryFn: () => getMessageList(email),
    staleTime: 1000 * 60 * 5,
  });

  const insertRecord = useMutation({
    mutationFn: message => insertMessage(message),
    onSuccess: () => { queryClient.invalidateQueries(['message']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: message => updateMessage(message),
    onSuccess: () => { queryClient.invalidateQueries(['message']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: mid => deleteMessage(mid),
    onSuccess: () => { queryClient.invalidateQueries(['message']); },
    onError: console.error,
  });

  return { getList, insertRecord, updateRecord, deleteRecord };
}