/*
 * schedule table
 *    id
 *    email
 *    title
 *    sdate
 *    startTime
 *    endTime
 *    place
 *    isImportant
 *    memo
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getSchedList(sdate, email) {
  return get(ref(database, 'schedule'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.sdate === sdate && record.email === email)
          .sort((a, b) => a.startTime.localeCompare(b.startTime)); 
        return records;
      }
      return null;
    }); 
}

export async function insertSched(sched) {
  const id = uuid();
  return set(ref(database, `schedule/${id}`), {
    id, ...sched
  });
}

export async function updateSched(sched) {
  const { id } = sched;
  return set(ref(database, `schedule/${id}`), sched);
}

export async function deleteSched(id) {
  return remove(ref(database, `schedule/${id}`));
}
