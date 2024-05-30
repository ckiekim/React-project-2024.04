/*
 *  likes table
 *    lid
 *    uid
 *    bid
 *    value
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getLike(uid, bid) {
  return get(ref(database, `likes`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.uid === uid && record.bid === bid);
        return records.length > 0 ? records[0] : null;
      }
      return null;
    }); 
}

export async function insertLike(like) {
  const lid = uuid();
  return set(ref(database, `likes/${lid}`), { ...like, lid });
}

export async function updateLike(like) {
  const { lid } = like;
  return set(ref(database, `likes/${lid}`), like);
}

export async function deleteLike(lid) {
  return remove(ref(database, `likes/${lid}`));
}
