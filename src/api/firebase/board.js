/*
 *  board table
 *    bid
 *    title
 *    content
 *    writer: {uid, displayName, avatarUrl}
 *    modifiedAt
 *    viewCount
 *    replyCount
 *    likeCount
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getBoardList() {
  return get(ref(database, 'board'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));   // 내림차순 정렬
        return records;
      }
      return null;
    }); 
}

export async function getBoard(bid) {
  return get(ref(database, `board/${bid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertBoard(board) {
  const bid = uuid();
  return set(ref(database, `board/${bid}`), {
    ...board, bid, modifiedAt: new Date().toISOString(),
    viewCount: 0, replyCount: 0, likeCount: 0
  })
}

export async function updateBoard(board) {
  const { bid } = board;
  return set(ref(database, `board/${bid}`), board);
}

export async function deleteBoard(bid) {
  return remove(ref(database, `board/${bid}`));
}
