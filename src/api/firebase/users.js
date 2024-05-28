/*
 * users table (userInfo table의 old version)
 *    id
 *    email
 *    name
 *    avatarUrl
 *    company
 *    role
 *    registeredAt
 *    status
 *    isVerified
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

export async function getUserList() {
  return get(ref(database, 'users'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);   // object를 array로 변환
        // records = records.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));   // 내림차순 정렬
        return records;
      }
      return null;
    }); 
}

export async function getUser(id) {
  return get(ref(database, `users/${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertUser(user) {
  const id = uuid();
  const { email, avatarUrl, name, company, role } = user;
  return set(ref(database, `users/${id}`), {
    id, email, avatarUrl, name, company, isVerified: false, status: 'active', role,
    registeredAt: new Date().toISOString()
  });
}

export async function updateUser(user) {
  const { id } = user;
  return set(ref(database, `users/${id}`), user);
}

export async function deleteUser(id) {
  return remove(ref(database, `users/${id}`));
}
