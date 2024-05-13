import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, 
  createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
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
  if (priceSale)
    return set(ref(database, `products/${id}`), {
      id, name, cover, price, priceSale, status, colors, releasedAt
    });
  else
    return set(ref(database, `products/${id}`), {
      id, name, cover, price, status, colors, releasedAt
    });
}

export async function deleteProduct(id) {
  return remove(ref(database, `products/${id}`));
}

/*========================= orders =========================*/

export async function getOrderList(uid) {
  return get(ref(database, 'orders'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
        if (uid)
          records = records.filter(record => record.uid === uid);
        return records;
      }
      return null;
    }); 
}

export async function getOrder(oid) {
  return get(ref(database, `orders/${oid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    }); 
}

export async function insertOrder(order) {
  const oid = uuid();
  return set(ref(database, `orders/${oid}`), {
    ...order, oid, status:'주문완료', orderedAt: new Date().toISOString()
  });
}

export async function updateOrder(order) {
  const { oid } = order;
  return set(ref(database, `orders/${oid}`), order);
}

export async function deleteOrder(oid) {
  return remove(ref(database, `orders/${oid}`));
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
  const { id } = blog;
  return set(ref(database, `blogs/${id}`), blog);
}

export async function deleteBlog(id) {
  return remove(ref(database, `blogs/${id}`));
}

/*========================= scheduler =========================*/

export async function getAnnivList(adate, email) {
  return get(ref(database, 'anniversary'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        let records = Object.values(objects);
        records = records.filter(record => record.adate === adate && 
          (record.email === 'admin@human.com' || record.email === email)
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
  const { id } = user;
  return set(ref(database, `users/${id}`), user);
}

export async function deleteUser(id) {
  return remove(ref(database, `users/${id}`));
}
