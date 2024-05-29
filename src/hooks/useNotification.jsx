import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotificationList, getNotificationCount, insertNotification, updateNotification, deleteNotification } from '../api/firebase';

export default function useNotification(email) {
  const queryClient = useQueryClient();
  // console.log(email);

  const { data: notifications, isLoading: isNotiLoading, 
    isError: isNotiError, refetch: refetchNoti } = useQuery({
    queryKey: ['notifications', email],
    queryFn: () => getNotificationList(email),
    staleTime: 1000 * 60 * 5,
  });

  const getCount = useQuery({
    queryKey: ['notificationCount', email],
    queryFn: () => getNotificationCount(email),
    staleTime: 1000 * 60 * 5,
  })

  const insertRecord = useMutation({
    mutationFn: notification => insertNotification(notification),
    onSuccess: () => { queryClient.invalidateQueries(['notifications', email]); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: notification => updateNotification(notification),
    onSuccess: () => { queryClient.invalidateQueries(['notifications', email]); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: nid => deleteNotification(nid),
    onSuccess: () => { queryClient.invalidateQueries(['notifications']); },
    onError: console.error,
  });

  return { notifications, isNotiLoading, isNotiError, refetchNoti,
    getCount, insertRecord, updateRecord, deleteRecord, }
}
