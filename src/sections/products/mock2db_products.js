/*
 *  products의 mock 데이터를 데이터베이스에 등록하는 NodeJS 프로그램
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

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
  'Nike Air Max Zephyr',
  'Jordan Delta',
  'Air Jordan XXXV PF',
  'Nike Waffle Racer Crater',
  'Kyrie 7 EP Sisterhood',
  'Nike Air Zoom BB NXT',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];
const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 7, max: 99 }) * 1000,
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 6, max: 39 }) * 1000,
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', 'default']),
    releasedAt: faker.date.recent().toISOString()
  };
});

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

async function addProduct( product ) {
  const { id, cover, name, price, priceSale, colors, status, releasedAt } = product;
  return set(ref(database, `products/${id}`), {
    id, cover, name, price, priceSale, colors, status, releasedAt
  });
}

products.forEach(async (product, index) => {
  await addProduct(product);
  console.log(index);
});
