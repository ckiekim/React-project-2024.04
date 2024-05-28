/*
 * anniversary table
 *    id
 *    aname
 *    adate
 *    email
 *    isHoliday
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getAnnivList(adate, email) {
  return get(ref(database, 'anniversary'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.filter(record => record.adate === adate && 
          (record.email === process.env.REACT_APP_ADMIN_USER || record.email === email)
        );
        return records;
      }
      return null;
    }); 
}

export async function insertAnniv(anniv) {
  const id = uuid();
  const { email, aname, adate, isHoliday } = anniv;
  return set(ref(database, `anniversary/${id}`), {
    id, email, aname, adate, isHoliday
  });
}

export async function updateAnniv(anniv) {
  const { id } = anniv;
  return set(ref(database, `anniversary/${id}`), anniv);
}

export async function deleteAnniv(id) {
  return remove(ref(database, `anniversary/${id}`));
}
