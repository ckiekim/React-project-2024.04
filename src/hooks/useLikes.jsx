import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLike, insertLike, updateLike } from '../api/firebase';

export default function useLikes(uid, bid) {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['likes', uid, bid],
    queryFn: () => getLike(uid, bid),
    staleTime: 1000 * 60 * 5
  });

  const insertRecord = useMutation({
    mutationFn: like => insertLike(like),
    onSuccess: () => { queryClient.invalidateQueries(['likes', uid, bid]); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: like => updateLike(like),
    onSuccess: () => { queryClient.invalidateQueries(['likes', uid, bid]); },
    onError: console.error,
  });

  return { getRecord, insertRecord, updateRecord };
}