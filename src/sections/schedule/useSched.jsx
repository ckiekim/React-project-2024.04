import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSchedList, insertSched } from '../../api/firebase';

export default function useSched(ymd) {
  const queryClient = useQueryClient();
  const email = sessionStorage.getItem('sessionEmail');

  const getList = useQuery({
    queryKey: ['schedule', ymd, email],
    queryFn: () => getSchedList(ymd, email),
    staleTime: 1000 * 60 * 5
  });

  const insertRecord = useMutation({
    mutationFn: sched => insertSched(sched),
    onSuccess: () => { queryClient.invalidateQueries(['anniversary']); },
    onError: console.error
  });

  return { getList, insertRecord };
}