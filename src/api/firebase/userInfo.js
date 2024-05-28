/*
 *  userInfo table
 *    uid
 *    email
 *    displayName
 *    job
 *    avatarUrl
 *    role
 *    status
 *    registeredAt
 *    isVerified
 */
import { database } from './config'
import { ref, get, set, remove } from 'firebase/database';

export async function getUserInfoList() {
  return get(ref(database, 'userInfo'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));   // 내림차순 정렬
        return records;
      }
      return null;
    }); 
}

export async function getUserInfo(uid) {
  return get(ref(database, `userInfo/${uid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertUserInfo(userInfo) {
  const { uid, email, displayName, avatarUrl, job } = userInfo;
  return set(ref(database, `userInfo/${uid}`), {
    uid, email, displayName, avatarUrl, job, role: 'User', status: 'active', 
    isVerified: false, registeredAt: new Date().toISOString()
  });
}

export async function updateUserInfo(userInfo) {
  const { uid } = userInfo;
  return set(ref(database, `userInfo/${uid}`), userInfo);
}

export async function deleteUserInfo(uid) {
  return remove(ref(database, `userInfo/${uid}`));
}
