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

const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
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
  registeredAt: faker.date.recent().toISOString()
}));

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

async function addUser( user ) {
  const { id, avatarUrl, name, company, isVerified, status, role, registeredAt } = user;
  return set(ref(database, `users/${id}`), {
    id, avatarUrl, name, company, isVerified, status, role, registeredAt
  });
}

users.forEach(async (user, index) => {
  await addUser(user);
  console.log(index);
});
