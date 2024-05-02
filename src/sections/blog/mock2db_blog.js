/*
 *  blog의 mock 데이터를 데이터베이스에 등록하는 NodeJS 프로그램
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
const authors = [
  {uid: '01qTjJi9aAhsccCLh0GfRNjZrIC3', displayName: '안유진', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714446228/jftyxwi5ieeuwkine77b.jpg'},
  {uid: 'BfjyQOYgVibKGtDI00SE16oe02g1', displayName: '마리아', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714533907/o8yqbh0doq6nh0iboovc.jpg'},
  {uid: 'Dgl4hQDj7kgrjUh356q5LAFLwKI2', displayName: '브라이언', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714446309/vwkqjqaxoiijgqiwhs7f.jpg'},
  {uid: 'NMzHTzUZ4wfw15g9meYH6WyCuey1', displayName: '엠마', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714446443/yfilvrtvisacpu3s1uvz.png'},
  {uid: 'YDZFRaRvCSa2z88bwYOSPHMBCpx2', displayName: '토미', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714446347/irtz3rj3c4yjtk6qkymt.jpg'},
  {uid: 'dlDQQaDE4eYtLHq8ZJIweNNlYj62', displayName: '류현진', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714549924/tcpgrmbosji4k4stvm1x.jpg'},
  {uid: 'gmEyfc7ObtXYuI0abl3N3hTGw6U2', displayName: '제임스', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714533885/cqlknvpmvol3kdbtpkgm.jpg'},
  {uid: 'lZGXHPdprTT9pItVVJawUl132gg1', displayName: '오지환', avatarUrl: 'http://res.cloudinary.com/dqullcaz5/image/upload/v1714446204/udimpzjkf3foladi7i8f.jpg'},
];

const blogs = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past().toISOString(),
  view: faker.number.int(99),
  comment: faker.number.int(9),
  share: faker.number.int(9),
  favorite: faker.number.int(9),
  author: sample(authors)
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
