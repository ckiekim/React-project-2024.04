import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductList, getProduct, insertProduct, updateProduct, deleteProduct } from '../api/firebase';

export default function useProducts(id) {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5
  });

  const getList = useQuery({
    queryKey: ['products'],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 5,
  });

  const insertRecord = useMutation({
    mutationFn: product => insertProduct(product),
    onSuccess: () => { queryClient.invalidateQueries(['products']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: product => updateProduct(product),
    onSuccess: () => { queryClient.invalidateQueries(['products']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: id => deleteProduct(id),
    onSuccess: () => { queryClient.invalidateQueries(['products']); },
    onError: console.error,
  });

  return { getRecord, getList, insertRecord, updateRecord, deleteRecord };
}