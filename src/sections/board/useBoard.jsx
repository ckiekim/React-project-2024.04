import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBoard, getBoardList, insertBoard, updateBoard, deleteBoard } from '../../api/firebase';

export default function useBoard() {
  const queryClient = useQueryClient();

  // const getRecord = useQuery({
  //   queryKey: ['board', bid],
  //   queryFn: () => getBoard(bid),
  //   staleTime: 1000 * 60 * 5
  // });

  const getList = useQuery({
    queryKey: ['board'],
    queryFn: () => getBoardList(),
    staleTime: 1000 * 60,
  });

  const insertRecord = useMutation({
    mutationFn: board => insertBoard(board),
    onSuccess: () => { queryClient.invalidateQueries(['board']); },
    onError: console.error,
  });

  const updateRecord = useMutation({
    mutationFn: board => updateBoard(board),
    onSuccess: () => { queryClient.invalidateQueries(['board']); },
    onError: console.error,
  });

  const deleteRecord = useMutation({
    mutationFn: bid => deleteBoard(bid),
    onSuccess: () => { queryClient.invalidateQueries(['board']); },
    onError: console.error,
  });

  return { getList, insertRecord, updateRecord, deleteRecord };
}