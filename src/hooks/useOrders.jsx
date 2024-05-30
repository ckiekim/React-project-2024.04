import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderList, getOrder, insertOrder, updateOrder, deleteOrder } from '../api/firebase';

export default function useOrders(oid) {
  const queryClient = useQueryClient();
  const email = sessionStorage.getItem('sessionEmail');
  const uid = email === process.env.REACT_APP_ADMIN_USER ? '' : sessionStorage.getItem('sessionUid');

  const getRecord = useQuery({
    queryKey: ['orders', oid],
    queryFn: () => getOrder(oid),
    staleTime: 1000 * 60 * 5
  });

  const getList = useQuery({
    queryKey: ['orders', uid || ''],
    queryFn: () => getOrderList(uid),
    staleTime: 1000 * 60,
  });

  const insertRecord = useMutation({
    mutationFn: order => insertOrder(order),
    onSuccess: (oid) => {     // oid 값을 결제시 이용할 수 있음
      queryClient.invalidateQueries(['orders']); 
    },
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