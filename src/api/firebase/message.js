/*
 *  message table
 *    mid
 *    content
 *    srcEmail
 *    srcName
 *    srcAvatar
 *    dstEmail
 *    dstName
 *    dstAvatar
 *    sentAt
 *    status
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getMessageList(email) {
  return get(ref(database, 'message'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.dstEmail === email)
          .sort((a, b) => b.sentAt.localeCompare(a.sentAt))
          .sort((a, b) => a.status.localeCompare(b.status)); 
        // console.log(records);
        return records;
      }
      return null;
    }); 
}

export async function insertMessage(message) {
  const mid = uuid();
  return set(ref(database, `message/${mid}`), {
    mid, ...message, status: '신규', sentAt: new Date().toISOString()
  });
}

export async function updateMessage(message) {
  const { mid } = message;
  return set(ref(database, `message/${mid}`), message);
}

export async function deleteMessage(mid) {
  return remove(ref(database, `message/${mid}`));
}
