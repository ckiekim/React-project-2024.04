import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogList, getBlog, insertBlog, updateBlog, deleteBlog } from '../../api/firebase';

export default function useBlogs(id) {
  const queryClient = useQueryClient();

  const getRecord = useQuery({
    queryKey: ['blogs', id],
    queryFn: id => getBlog(id),
    staleTime: 1000 * 60 * 5
  });

  const getList = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogList,
    staleTime: 1000 * 60 * 5,
  });

  const insertRecord = useMutation({
    mutationFn: blog => insertBlog(blog),
    onSuccess: () => { queryClient.invalidateQueries(['blogs']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: blog => updateBlog(blog),
    onSuccess: () => { queryClient.invalidateQueries(['blogs']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: id => deleteBlog(id),
    onSuccess: () => { queryClient.invalidateQueries(['blogs']); },
    onError: console.error,
  });

  return { getRecord, getList, insertRecord, updateRecord, deleteRecord };

}