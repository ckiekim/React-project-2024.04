/*
 *  notification table
 *    nid
 *    email
 *    type
 *    description
 *    createdAt
 *    status
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getNotificationList(email) {
  return get(ref(database, 'notification'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.email === email && record.status === '신규')
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)); 
        // console.log(records);
        return records;
      }
      return null;
    }); 
}

export async function getNotificationCount(email) {
  return get(ref(database, 'notification'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records
          .filter(record => record.email === email && record.status === '신규');
        // console.log(records.length);
        return records.length;
      }
      return 0;
    }); 
}

export async function insertNotification(notification) {
  // console.log(notification);
  const nid = uuid();
  return set(ref(database, `notification/${nid}`), {
    nid, ...notification, status: '신규', createdAt: new Date().toISOString()
  });
}

export async function updateNotification(notification) {
  const { nid } = notification;
  return set(ref(database, `notification/${nid}`), notification);
}

export async function deleteNotification(nid) {
  return remove(ref(database, `notification/${nid}`));
}
