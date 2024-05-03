import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, 
  createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
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

/*========================= login =========================*/

export function login({email, password}) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function logout() {
  signOut(auth)
    .catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    // if (updateUser)
    //   console.log(updatedUser.uid, updatedUser.email);
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return {...user, isAdmin};
      }
      return user;
    });
}

export function register({ email, password }) {
  createUserWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

/*========================= userInfo =========================*/

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

// export async function getUserInfoByEmail(email) {
//   return get(ref(database, `userInfo`))
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         let records = Object.values(snapshot.val());
//         return records.filter(user => user.email === email);
//       }
//       return null;
//     }); 
// }

export async function insertUserInfo(userInfo) {
  const { uid, email, displayName, avatarUrl, job } = userInfo;
  return set(ref(database, `userInfo/${uid}`), {
    uid, email, displayName, avatarUrl, job, role: 'User', status: 'active', 
    isVerified: false, registeredAt: new Date().toISOString()
  });
}

export async function updateUserInfo(userInfo) {
  const { uid, email, displayName, avatarUrl, job, role, status, isVerified, registeredAt } = userInfo;
  return set(ref(database, `userInfo/${uid}`), {
    uid, email, displayName, avatarUrl, job, role, status, isVerified, registeredAt
  });
}

export async function deleteUserInfo(uid) {
  return remove(ref(database, `userInfo/${uid}`));
}

/*========================= products =========================*/

export async function getProductList() {
  return get(ref(database, 'products'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
        return records;
      }
      return null;
    }); 
}

export async function getProduct(id) {
  return get(ref(database, `products/${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertProduct(product) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product, id, releasedAt: new Date().toISOString()
  });
}

export async function updateProduct(product) {
  const { id, name, cover, price, priceSale, status, colors, releasedAt } = product;
  return set(ref(database, `products/${id}`), {
    id, name, cover, price, priceSale, status, colors, releasedAt
  });
}

export async function deleteProduct(id) {
  return remove(ref(database, `products/${id}`));
}

/*========================= blogs =========================*/

export async function getBlogList() {
  return get(ref(database, 'blogs'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); 
        return records;
      }
      return null;
    }); 
}

export async function getBlog(id) {
  return get(ref(database, `blogs/${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertBlog(blog) {
  const id = uuid();
  const { title, author, cover } = blog;
  return set(ref(database, `blogs/${id}`), {
    id, title, author, cover, view: 0, favorite: 0, comment: 0, share: 0,
    createdAt: new Date().toISOString()
  });
}

export async function updateBlog(blog) {
  const { id, title, author, cover, view, favorite, comment, share, createdAt } = blog;
  return set(ref(database, `blogs/${id}`), {
    id, title, author, cover, view, favorite, comment, share, createdAt
  });
}

export async function deleteBlog(id) {
  return remove(ref(database, `blogs/${id}`));
}

/*========================= users =========================*/

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
  const { id, email, avatarUrl, name, company, isVerified, status, role, registeredAt } = user;
  return set(ref(database, `users/${id}`), {
    id, email, avatarUrl, name, company, isVerified, status, role, registeredAt
  });
}

export async function deleteUser(id) {
  return remove(ref(database, `users/${id}`));
}
