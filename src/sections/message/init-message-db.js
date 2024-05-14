const propsReader = require('properties-reader');
const { sample } = require('lodash');
const { faker } = require('@faker-js/faker');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getDatabase, ref, get, set } = require('firebase/database');
const uuid = require('uuid').v4;

const props = propsReader('../../../.env.local');
const firebaseConfig = {
  apiKey: props.get('REACT_APP_FIREBASE_API_KEY'),
  authDomain: props.get('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: props.get('REACT_APP_FIREBASE_PROJECT_ID'),
  databaseURL: props.get('REACT_APP_FIREBASE_DATABASE_URL'),
};

const messages = [
  '디펜딩 챔피언 LG 트윈스가 불안하다. 올 시즌 LG는 지난 시즌 우승 영광을 이어가지 못하는 것일까.',
  'LG는 주전 포수 박동원과 대체 선발로 낙점받았던 강효종이 1군 말소됐다.',
  '박동원은 지난 11일 롯데 자이언츠와 경기에서 4회초 구본혁의 2루타 때 홈을 쇄도하는 과정에서 슬라이딩을 시도, 무릎 통증을 느꼈다.',
  '당시 박동원은 "괜찮다"고 의사를 표현했다.',
  '서울의 모 정형외과에서 검진을 진행한 결과, 우측 무릎 후방 슬와근 부분 손상 진단을 받았다.',
  'LG 구단에 따르면 박동원의 회복 기간은 1~2주. 최소 6경기, 최대 10경기 이상 1군에서 빠지게 됐다.',
  '박동원은 올 시즌 40경기에서 타율 0.266, 5홈런, 20타점, OPS 0.790을 기록하고 있었다.',
  '오지환은 최근 홈런포를 가동하기 시작하는 등 타격감이 살아나고 있다.',
  'KT 입장에선 뼈아픈 상황이다.',
  '박동원의 공백을 완벽히 메우기엔 쉽지 않기에, 한동안 고민이 많아질 LG다.',
  'LG는 선발 공백의 문제를 겪고 있기도 하다.',
  '최원태 역시 왼쪽 엉덩이 근육 통증을 느껴 말소된 바 있다.',
  '최원태의 대체 선발로 낙점받은 강효종 역시 다시 퓨처스로 내려갔다.',
  'NC 다이노스는 주전 2루수인 박민우가 어깨 통증 탓에 2군으로 내려갔다.',
  '원·달러 환율이 장중 1360원 후반대로 소폭 상승하고 있다.'
]

async function getUserInfoList() {
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
async function insertMessage(message) {
  const mid = uuid();
  return set(ref(database, `message/${mid}`), {
    mid, ...message
  });
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const messageArray = [];
getUserInfoList()
  .then((userInfoList) => {
    for (let i = 0; i < 100; i++) {
      let src = sample(userInfoList);
      let dst = sample(userInfoList);
      if (src.email === dst.email)
        continue;
      const message = {
        content: messages[i % 15], status: '신규',
        srcEmail:src.email, srcName:src.displayName, srcAvatar:src.avatarUrl,
        dstEmail:dst.email, dstName:dst.displayName, dstAvatar:dst.avatarUrl,
        sentAt:faker.date.recent().toISOString()
      }
      messageArray.push(message);
    }
  })
  .then(() => {
    messageArray.forEach(async (msg, idx) => {
      await insertMessage(msg);
      console.log(idx);
    });
  });


