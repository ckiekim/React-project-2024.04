import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, insertCart, updateCart, deleteCart } from '../../api/firebase';

export default function useCart(uid) {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['carts', uid],
    queryFn: () => getCart(uid),
    staleTime: 1000 * 60 * 5
  });

  const insertRecord = useMutation({
    mutationFn: cart => insertCart(cart),
    onSuccess: () => { queryClient.invalidateQueries(['carts', uid]); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: cart => updateCart(cart),
    onSuccess: () => { queryClient.invalidateQueries(['carts', uid]); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: uid => deleteCart(uid),
    onSuccess: () => { queryClient.invalidateQueries(['carts']); },
    onError: console.error,
  });

  return { getRecord, insertRecord, updateRecord, deleteRecord };
}