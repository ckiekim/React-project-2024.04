import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReply, getReplyList, insertReply, updateReply, deleteReply } from '../../api/firebase';

export default function useReply(bid) {
  const queryClient = useQueryClient();

  const getList = useQuery({
    queryKey: ['reply', bid],
    queryFn: () => getReplyList(bid),
    staleTime: 1000 * 60,
  });

  const insertRecord = useMutation({
    mutationFn: reply => insertReply(reply),
    onSuccess: () => { queryClient.invalidateQueries(['reply']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: reply => updateReply(reply),
    onSuccess: () => { queryClient.invalidateQueries(['reply']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: rid => deleteReply(rid),
    onSuccess: () => { queryClient.invalidateQueries(['reply']); },
    onError: console.error,
  });

  return { getList, insertRecord, updateRecord, deleteRecord };  
}