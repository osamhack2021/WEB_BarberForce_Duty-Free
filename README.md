<div align="center">
  <a href="https://github.com/osamhack2021/WEB_BarberForce_Duty-Free">
      <img src="/IMAGES/1_readme_title_1676.png" alt="BarberForce title" align="center">
  </a>
</div>

<div align="center">
  <!-- no. of used languages -->
  <a href="">
      <img src="https://img.shields.io/github/languages/count/osamhack2021/WEB_BarberForce_Duty-Free?style=for-the-badge" alt="Number of used languages">
  </a>
  <!-- no. of contributors -->
  <a href="">
      <img src="https://img.shields.io/github/contributors/osamhack2021/WEB_BarberForce_Duty-Free?style=for-the-badge" alt="Number of contributors">
  </a>
  <!-- license -->
  <a href="">
      <img src="https://img.shields.io/github/license/osamhack2021/WEB_BarberForce_Duty-Free?style=for-the-badge" alt="License">
  </a>
  <br>
  <!-- last commit -->
  <a href="">
      <img src="https://img.shields.io/github/last-commit/osamhack2021/WEB_BarberForce_Duty-Free?style=for-the-badge" alt="Date of the last commit">
  </a>
  <!-- commit per month -->
  <a href="">
      <img src="https://img.shields.io/github/commit-activity/m/osamhack2021/WEB_BarberForce_Duty-Free?style=for-the-badge" alt="Commit per month">
  </a>
</div>

## 프로젝트 소개

**바버포스(BarberForce)** 는 국군 장병들이 손쉽게 부대 주변의 미용실이나 이발소를 예약하고 방문해 이발을 받은 뒤 리뷰를 공유할 수 있는 모바일 웹 서비스입니다. 이에 더하여 부대 인근 편의시설 방문 후기 게시판과 같은 커뮤니티 기능을 활용해,  군 장병들의 소통의 장을 마련하고자 합니다.

## 기획 배경

국군 장병들은 기존의 이발병 제도와 코로나19 팬데믹 상황으로 인해 아래와 같은 고충을 겪고 있습니다.

<div align="center">
  <img src="/IMAGES/2_readme_bg_1676.png" alt="Background" align="center">
</div>

## 서비스 설명

**바버포스** 는 이러한 문제점을 해결하고, 지역사회와의 상생을 도모하며 장병들의 소통 창구를 마련하고자 기획되었습니다.

<div align="center">
  <img src="/IMAGES/2_readme_bg_1676.png" alt="Background" align="center">
</div>

<!--

## 기능 설명

장병들은 부대원임을 인증하고 '바버포스'에 가입할 수 있으며, 외출이나 외박 일정에 맞추어 미리 이들 미용시설에 이발 서비스를 예약하게 됩니다. 이렇게 이발 서비스를 받은 후 간단한 별점 시스템을 이용해 만족도를 평가하고, 다른 장병들의 별점과 리뷰를 참고해 자신이 예약하는 데에 활용할 수도 있습니다.

-->

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Tech Stacks)

### Front-end
<a href="https://nuxtjs.org/">
  <img src="https://img.shields.io/badge/nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white"/>
</a>
<a href="https://tailwindcss.com/">
  <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white"/>
</a>
<a href="https://axios-http.com/">
  <img src="https://img.shields.io/badge/Axios-854195?style=for-the-badge&logoColor=white"/>
</a>

### Back-end
<a href="https://nodejs.org/">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://expressjs.com/">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"/>
</a>
<a href="https://www.mongodb.com/">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>

## 설치 안내 (Installation Process)

#### 1. 프로젝트 Clone
``` bash
cd /YOUR/DIRECTORY
git clone https://github.com/osamhack2021/WEB_BarberForce_Duty-Free.git
```

#### 2. 백엔드 의존성 설치 & 서버 실행
``` bash
cd "WEB(BE)"
npm install --no-save
npm run dev
```

#### 3. 프론트엔드 의존성 설치 & dotenv 설정 & 서버 실행
``` bash
cd "../WEB(BE)"
npm install --no-save
cp .env
# .env 관련 설정 후 (하단 참고)
npm run dev
```

#### .env (dotenv) 설정 관련

`.env.example` 을 복사하여 `.env` 파일을 생성하면, 초기 상태는 아래와 같습니다.

``` dotenv
# kakao keys (https://developers.kakao.com/console/app/641963)
KAKAO_REST_KEY=
KAKAO_JAVASCRIPT_KEY=
# kakao login redirect
KAKAO_REDIRECT_URI=https://api.barberforce.shop/kakao/callback
# backend url (change for localtest..)
BACKEND_URL=https://api.barberforce.shop
```

여기서 `KAKAO_REST_KEY` 와 `KAKAO_JAVASCRIPT_KEY` 는 [카카오 개발자 센터](https://developers.kakao.com)의 생성한 앱의 키값을 적어주면 됩니다. ([참고: TEAM Duty-Free 의 앱](https://developers.kakao.com/console/app/641963))

`KAKAO_REST_KEY` 와 `KAKAO_JAVASCRIPT_KEY` 는 각각 카카오 로그인, 카카오 지도 API 에서 사용합니다.

`KAKAO_REDIRECT_URI` 는 카카오 로그인 시 OAuth 처리를 위해 리다이렉트 시킬 URL 입니다.

`BACKEND_URL` 은 프론트엔드 코드에서 API를 사용할 때 사용되는 BaseURL 입니다. 로컬에서 서버를 구동중인 경우, `http://localhost:포트` 로 설정해주시면 됩니다. (백엔드 기본포트: 3306)


> 카카오 로그인 등 리다이렉트 URL이 실제 서버 도메인과 연결된 서비스는 별도 카카오 API 관련 설정을 하지 않을 경우, 로컬 환경에서 관련 기능이 동작하지 않을 수 있습니다.


## 프로젝트 사용법 (Getting Started)
 
## 팀 정보 (Team Information)
- Se Lee (ese1997@naver.com), Github Id: sallyselee
- Chanhyuk Byeon (bdu00chch@gmail.com), Github Id: Bisue
- Sangwook Park (dkxkqkrtkddn@gmail.com), Github Id: sw0501

## 저작권 및 사용권 정보 (Copyleft / End User License)
