import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfo, getUserInfoList, getUserInfoByEmail, 
  insertUserInfo, updateUserInfo, deleteUserInfo } from '../../api/firebase';

export default function useUserInfo(user) {
  const queryClient = useQueryClient();
  const uid = user && user.uid;

  const getRecord = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: () => getUserInfo(uid),
    staleTime: 1000 * 60 * 60,
  });

  const getList = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfoList,
    staleTime: 1000 * 60 * 5,
  });

  const insertRecord = useMutation({
    mutationFn: userInfo => insertUserInfo(userInfo),
    onSuccess: () => { queryClient.invalidateQueries(['userInfo']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: userInfo => updateUserInfo(userInfo),
    onSuccess: () => { queryClient.invalidateQueries(['userInfo']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: uid => deleteUserInfo(uid),
    onSuccess: () => { queryClient.invalidateQueries(['userInfo']); },
    onError: console.error,
  });

  return { getRecord, getList, insertRecord, updateRecord, deleteRecord };
}