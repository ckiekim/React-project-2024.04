/*
 *  reply table
 *    rid
 *    comment
 *    bid
 *    commenter: {uid, displayName, avatarUrl}
 *    writtenAt
 *    isMine
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getReplyList(bid) {
  return get(ref(database, 'reply'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.bid === bid)
          .sort((a, b) => b.writtenAt.localeCompare(a.writtenAt));   // 내림차순 정렬
        return records;
      }
      return null;
    }); 
}

export async function getReply(rid) {
  return get(ref(database, `reply/${rid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertReply(reply) {
  const rid = uuid();
  return set(ref(database, `reply/${rid}`), {
    ...reply, rid, writtenAt: new Date().toISOString()
  });
}

export async function updateReply(reply) {
  const { rid } = reply;
  return set(ref(database, `reply/${rid}`), reply);
}

export async function deleteReply(rid) {
  return remove(ref(database, `reply/${rid}`));
}
