import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogList } from '../../api/firebase';

export default function useBlogs() {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogList,
    staleTime: 1000 * 60 * 5
  });

  return { getRecord };
}