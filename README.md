# ck-react-world (구 React-Template-Project)

### 개요
- 반응형 웹
- React Query, React Router, Firebase DB/Authentication 등을 이용하는 교과서적인 대표 어플리케이션을 모아놓은 웹
- gh-pages를 이용한 배포: https://ckiekim.github.io/ck-react-world 
- 문제점: 해결 방안을 아시는 분은 꼭 연락주세요.
  - 외부 API(토스페이먼츠 등)를 이용할 때 callback-url을 사용하는 경우, 로컬에서는 잘 작동하는데 github에 배포한 버전에서는 동작하지 않음
  - CK Editor의 image upload 기능(독자적으로는 잘 돌아가나, 다른 프로그램과 같이 돌리면 동작하지 않음)이 동작하지 않아 React Quill Editor로 대체

### 사용한 도구 및 API
- Front-end: React, Material UI
- Back-end: Firebase Authentication, Firebase Realtime Database, Cloudinary
- API: TMDB, Toss Payments, Open Weather, Kakao 우편번호

### 디지털 컨버전스 중심 데이터 처리 SW 개발자 양성 과정
- 장소: 휴먼교육센터 수원
- 기간: 2023.12 ~ 2024.06

### 디자인 출처
- Template Name: Minimal (Free version)
- Template URL: https://github.com/minimal-ui-kit/material-kit-react
- MIT License: Minimal UI (https://minimals.cc/)

--------------------------------------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
