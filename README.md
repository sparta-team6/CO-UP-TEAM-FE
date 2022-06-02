![](doc/image/main.png)

### > 팀 프로젝트를 보다 효율적으로 진행할 수 있는 자원 공유 협업 툴 유틸리티 서비스

## 👉[쿱(CO-UP) 서비스 페이지 바로 가기](https://www.cooperate-up.com/)

👉🏻[Front-End GitHub 바로 가기](https://github.com/sparta-team6/CO-UP-TEAM-FE)

👉🏻[Back-End  GitHub 바로 가기](https://github.com/sparta-team6/CO-UP-TEAM-BE)

## 📌 핵심 기능 요약

> 프로젝트 팀 구성이 가능하며 **각 팀의 독립된 워크스페이스**를 제공합니다.
>
> 프로젝트 **업무 진척 파악 및 공유**가 가능합니다.
>
> 워크스페이스 내 **문서, 칸반보드 관리 및 공유**가 가능합니다.
>
> 프로젝트 멤버 간 **공통 작업 항목에 대한 동시성 제어**가 가능합니다.
>
> 프로젝트 멤버 간 **실시간 채팅**을 이용한 소통이 가능합니다.
>
> **관리자와 일반 유저 권한을 구별**하며 **권한에 따라 이용 가능한 기능을 제한**하고 있습니다.
>
![](doc/image/서비스GIF.gif)

## 🛠 프로젝트 아키텍처

![](doc/image/시스템구조.png)

## 🎁 ERD

![](doc/image/db.png)

## 💣 Trouble Shooting

### ▶ Front-End

| 이슈                                                             | 원인 및 증상                                                                                                                                | 해결 방법                                                                                                                                   |
|----------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| React CSR 동작과 이미지를 그대로 저장하는 방식을 사용한 결과, 성능이 큰 폭으로 저하되는 이슈가 발생함 | 1. 이미지 크기에 상관없이 그대로 저장하는 방법을 사용한 결과, 웹에서 이미지를 처리하는데 상당한 시간이 소요됨. 2. static의 모든 파일을 읽어 작동하는 React의 특성 상, 초기 화면에서의 로딩 속도가 느려 성능에 영향을 끼침. | Suspense, Lazy loading을 사용해 코드를 분리 시켜 페이지 별로 Load하도록 수정하였고, Resize 라이브러리를 사용해 이미지를 사전에 가공한 뒤, UI에는 가공된 이미지를 저장하도록 수정하여 위 문제를 해결할 수 있었음. |
| 문서 목록 페이지에서 문서를 상세 조회하고자 했으나 데이터가 기대와 달리 즉각 변경되지 않는 문제 발생      | useParams의 값은 정상적으로 가져올 수 있었으나, React-Query의 Detail 정보는, 즉시 fetching이 되지 않는 상태                                                         | 동일한 API에서 Detail 정보를 가져올 때는 key를 배열 형태로 만들어 새로운 index를 만들어 줘야 한다는 것을 인지하고 수정하여 위 문제를 해결함.|
### ▶ Back-End

| 이슈 | 원인 및 증상 | 해결 방법 |
| --- | --- | --- |
| 도메인 2개로 배포 테스트 과정 중, Browser에 Cookie가 저장되지 않는 문제 인식 | Samesite를 변경하기 위해 Secure 옵션 변경해야 했으나 옵션 변경이 불가능했음 (원인: Chrome version80 Cookie Issue) | SSL(인증서) 발급 받은 후, https를 도입했고 도메인(cooperate-up.com)을 통합하여 위 문제를 해결했음. |
| 3중 Nested List로 구성된 Dto를 DB에서 조회하는 QueryDSL 구현 실패 | QueryDSL은 단일 List만 조회할 수 있음 | 모든 List를 한 번에 조회한 후, 그룹핑 로직을 별도 추가하여 Dto를 재구성한 뒤, 위 문제를 해결함 |

## 👨‍👨‍👦‍👦 CO-UP 팀원 Info

## ▶ Front-End

| 팀원명 | Github, Blog, SNS | Phone | E-mail |
| --- | --- | --- | --- |
| 김지호 | https://github.com/jiho3894 | 010-8769-6527 | rlawlgh3894@naver.com |
| 김경래 | https://github.com/mosbisu | 010-3875-4535 | mosbisu@gmail.com |

## ▶ Back-End

| 팀원명 | Github, Blog, SNS | Phone | E-mail |
| --- | --- | --- | --- |
| 정재호 | https://github.com/pg-Parunson | 010-5221-0911 | iwogh3176@gmail.com |
| 권기원 | https://github.com/funnykyeon | 010-2259-4885 | funnykyeon@naver.com |
| 홍승민 | https://github.com/Hong-Seungmin | 010-6863-6397 | globalsh1@gmail.com |

## ▶ Design

| 팀원명 | Github, Blog, SNS | Phone | E-mail |
| --- | --- | --- | --- |
| 고나빈 | https://instagram.com/2x3graphics/ | 010-5048-2972 | surani208@naver.com |
| 허수빈 | https://www.instagram.com/soupsoup/<br/>https://www.instagram.com/design.souptory/ | 010-3911-1975 | huhsoup@naver.com |
