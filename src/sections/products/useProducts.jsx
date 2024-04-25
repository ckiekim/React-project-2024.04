import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductList } from '../../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['products'],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 5
  });

  return { getRecord };
}