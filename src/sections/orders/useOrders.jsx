import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderList, getOrder, insertOrder, updateOrder, deleteOrder } from '../../api/firebase';

export default function useOrders(oid) {
  const queryClient = useQueryClient();
  const email = sessionStorage.getItem('sessionEmail');
  const uid = email === 'admin@human.com' ? '' : sessionStorage.getItem('sessionUid');

  const getRecord = useQuery({
    queryKey: ['orders', oid],
    queryFn: oid => getOrder(oid),
    staleTime: 1000 * 60 * 5
  });

  const getList = useQuery({
    queryKey: ['orders', uid || ''],
    queryFn: () => getOrderList(uid),
    staleTime: 1000 * 60,
  });

  const insertRecord = useMutation({
    mutationFn: order => insertOrder(order),
    onSuccess: () => { queryClient.invalidateQueries(['orders']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: order => updateOrder(order),
    onSuccess: () => { queryClient.invalidateQueries(['orders']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: oid => deleteOrder(oid),
    onSuccess: () => { queryClient.invalidateQueries(['orders']); },
    onError: console.error,
  });

  return { getRecord, getList, insertRecord, updateRecord, deleteRecord };
}