/*
 *  blog의 mock 데이터를 데이터베이스에 등록하는 NodeJS 프로그램
 *    - 다 돌아가면 Ctrl-C 로 프로그램을 강제 종료할 것
 */

const propsReader = require('properties-reader');
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

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio',
  'vincenzo de cotiis’ crossing over showcases a research on contamination',
  'Simple, Great Looking Animations in Your Project | Video Tutorial',
  '40 Free Serif Fonts for Digital Designers',
  'Examining the Evolution of the Typical Web Design Client',
  'Katie Griffin loves making that homey art',
  'The American Dream retold through mid-century railroad graphics',
  'Illustration System Design',
  'CarZio-Delivery Driver App SignIn/SignUp',
  'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
  'Tylko Organise effortlessly -3D & Motion Design',
  'RAYO ?? A expanded visual arts festival identity',
  'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
  'Inside the Mind of Samuel Day',
  'Portfolio Review: Is This Portfolio Too Creative?',
  'Akkers van Margraten',
  'Gradient Ticket icon',
  'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
  'How to Animate a SVG with border-image',
];

const blogs = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past().toISOString(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

async function addBlog( blog ) {
  const { id, cover, title, createdAt, view, comment, share, favorite, author } = blog;
  return set(ref(database, `blogs/${id}`), {
    id, cover, title, createdAt, view, comment, share, favorite, author
  });
}

blogs.forEach(async (blog, index) => {
  await addBlog(blog);
  console.log(index);
});
