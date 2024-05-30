/*
 *  Firebase Authentication
 */
import { database } from './config'
import { ref, get } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, 
  createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export function login({ email, password }, onError) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      console.error(error);
      onError('이메일 또는 패스워드를 확인해보세요.');
    });
}

export function login2({ email, password }, onSuccess, onError) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => { onSuccess(); })
    .catch(error => {
      console.error(error);
      onError('이메일 또는 패스워드를 확인해보세요.');
    });
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
