/*
 *  사용자의 mock 데이터를 데이터베이스에 등록하는 NodeJS 프로그램
 *    - 다 돌아가면 Ctrl-C 로 프로그램을 강제 종료할 것
 */

const propsReader = require('properties-reader');
const { sample } = require('lodash');
const { faker } = require('@faker-js/faker');
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');
const { getDatabase, ref, get, set } = require("firebase/database");

const props = propsReader('../../../.env.local');
const firebaseConfig = {
  apiKey: props.get('REACT_APP_FIREBASE_API_KEY'),
  authDomain: props.get('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: props.get('REACT_APP_FIREBASE_PROJECT_ID'),
  databaseURL: props.get('REACT_APP_FIREBASE_DATABASE_URL'),
};

const authUser = [
  {uid:'YDZFRaRvCSa2z88bwYOSPHMBCpx2', email:'tommy@naver.com', },
  {uid:'W4FmdHaf5rhAD11bb2pmQsvp14A2', email:'admin@human.com', },
  {uid:'01qTjJi9aAhsccCLh0GfRNjZrIC3', email:'yujin@naver.com', },
  {uid:'lZGXHPdprTT9pItVVJawUl132gg1', email:'hwan@naver.com', },
  {uid:'Dgl4hQDj7kgrjUh356q5LAFLwKI2', email:'brian@gmail.com', },
  {uid:'NMzHTzUZ4wfw15g9meYH6WyCuey1', email:'emma@naver.com', },
  {uid:'BfjyQOYgVibKGtDI00SE16oe02g1', email:'maria@naver.com', },
  {uid:'gmEyfc7ObtXYuI0abl3N3hTGw6U2', email:'james@gmail.com', },
]

const userInfo = authUser.map((user, index) => ({
  uid: user.uid,
  email: user.email,
  displayName: faker.person.fullName(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  job: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
  role: 'User',
  status: 'active', isVerified: false,
  registeredAt: faker.date.recent().toISOString()
}));

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

async function addUserInfo( user ) {
  const { uid, email, displayName, avatarUrl, job, role, status, isVerified, registeredAt } = user;
  return set(ref(database, `userInfo/${uid}`), {
    uid, email, displayName, avatarUrl, job, role, status, isVerified, registeredAt
  });
}

userInfo.forEach(async (user, index) => {
  await addUserInfo(user);
  console.log(index);
});
