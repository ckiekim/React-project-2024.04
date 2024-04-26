import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

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

export async function insertUser(user) {
  const id = uuid();
  const { email, avatarUrl, name, company, role } = user;
  // console.log(user);
  return set(ref(database, `users/${id}`), {
    id, email, avatarUrl, name, company, isVerified: false, status: 'active', role,
    registeredAt: new Date().toISOString()
  });
}

export async function getProductList() {
  return get(ref(database, 'products'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);   // object를 array로 변환
        return records;
      }
      return null;
    }); 
}

export async function getBlogList() {
  return get(ref(database, 'blogs'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);   // object를 array로 변환
        return records;
      }
      return null;
    }); 
}
