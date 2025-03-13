# 😺프로그래머스 고양이 사진 검색 사이트 (Vanilla JS)

<a href='https://programmers.co.kr/skill_check_assignments/4'> 프로그래머스 과제 테스트 2020 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 고양이 사진 검색 사이트</a> 과제를 직접 풀어보았습니다. </br>
본 과제는 라이브러리나 프레임워크 없이 <b>Vanilla JS(ES6)</b>로만 구현하였으며, 기능 요구 사항의 풀이 과정을 기록하였습니다.

## ✅기능 설명

- 랜덤 고양이 사진 출력
  - 검색 창 옆의 버튼 클릭 시, 랜덤한 고양이 50마리의 검색 결과가 노출됩니다.
- 키워드 검색
  - 키워드 입력 후 엔터 시, 고양이 종의 검색이 가능합니다.
  - 검색 결과의 고양이 이미지 클릭 시, 고양이의 상세 정보 모달이 노출됩니다.
- 최근 검색 기록 관리
  - 검색 시, 최근 5개의 검색어가 로컬에 저장됩니다.
- 랜덤 고양이 배너
  - 웹 페이지 진입 시, 랜덤한 고양이 5마리 사진이 배너 슬라이드에 노출됩니다.
- 다크모드 지원
- LocalStorage
  - 새로고침하여도 최근 검색 결과가 저장됩니다.

</br>

## <a href="https://jee0.tistory.com/59">💡구현 과정</a>

<a href="https://jee0.tistory.com/60">요구사항 별 기능 상세 구현을 한 번에 정리한 글</a>

- HTML, CSS 관련
  - <a href="https://github.com/petitesize/search-cat/blob/main/note/1.%20HTML%2C%20CSS%20%EA%B4%80%EB%A0%A8.md">요구사항 및 구현 코드</a>
- 이미지 상세 보기 모달 관련
  - <a href="https://github.com/petitesize/search-cat/blob/main/note/2.%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EC%83%81%EC%84%B8%20%EB%B3%B4%EA%B8%B0%20%EB%AA%A8%EB%8B%AC%20%EA%B4%80%EB%A0%A8.md">요구사항 및 구현 코드</a>
- 검색 페이지 관련
  - <a href="https://github.com/petitesize/search-cat/blob/main/note/3.%20%EA%B2%80%EC%83%89%20%ED%8E%98%EC%9D%B4%EC%A7%80%20%EA%B4%80%EB%A0%A8.md">요구사항 및 구현 코드</a>
- 랜덤 고양이 배너 섹션 추가
  - <a href="https://github.com/petitesize/search-cat/blob/main/note/4.%20%EB%9E%9C%EB%8D%A4%20%EA%B3%A0%EC%96%91%EC%9D%B4%20%EB%B0%B0%EB%84%88%20%EC%84%B9%EC%85%98%20%EC%B6%94%EA%B0%80.md">요구사항 및 구현 코드</a>
- 코드 구조 관련
  - <a href="https://github.com/petitesize/search-cat/blob/main/note/5.%20%EC%BD%94%EB%93%9C%20%EA%B5%AC%EC%A1%B0%20%EA%B4%80%EB%A0%A8.md">요구사항 및 구현 코드</a>

</br>

## 🚀트러블슈팅

#### 🎯1. 문제 상황: 다크 모드 ON/OFF를 구현하기 위해 .dark-mode 클래스를 토글하는 방식을 사용하였음.

그러나, 이 방식은 OS의 다크 모드가 활성화된 상태에서는 다크 모드를 OFF할 수 없는 문제가 발생함.

#### 🔧1. 해결 방법: : data-theme 속성 사용

- 클래스 토글 대신 data-theme 속성으로 다크모드를 관리하여, OS 설정을 우선으로 따르되 사용자가 변경 가능하도록 수정
    <details>
    <summary>data-theme를 활용한 CSS 변경</summary>

  ```css
  @media (prefers-color-scheme: dark) {
    :root {
      --bg-color: black;
      --text-color: white;
    }
  }
  [data-theme="dark"] {
    --bg-color: black;
    --text-color: white;
  }

  [data-theme="light"] {
    --bg-color: white;
    --text-color: black;
  }

  body,
  body * {
    background-color: var(--bg-color);
    color: var(--text-color);
  }
  ```

#

#### 🎯2. 문제 상황: Lazy Load 다루기

고양이 사진을 Lazy Load (loading="lazy")로 설정했지만, 예상과 달리 모든 이미지가 한 번에 로드됨.<br/>
반응형을 유지하면서 Lazy Load를 정상적으로 적용하고 싶었음.

#### 🔧2-1. 해결 방법: min-height와 min-width 설정

- 브라우저가 최소한의 크기를 확보하면서 Lazy Load 트리거를 정확히 감지할 수 있게 됨! → Lazy Load 정상 적용!
  <details>
    <summary>style.css</summary>

  ```css
  .lazy-img {
    width: 100%;
    height: auto;
    min-height: 150px; /* 최소 높이 설정 */
    min-width: 150px; /* 최소 너비 설정 */
  }
  ```

#### 🔧2-2. 해결 방법: Lazy Load에 스크롤 페이징까지 적용한 방법 시도

- 두 방법 모두 기록용으로 SearchResult.js에 구현해 놓은 상태
- 현재 프로젝트는 2번 방법을 사용하였다.

1. getBoundingClientRect() + scroll 이벤트 활용

   - 간단한 방식으로 빠르게 구현 가능
      <details>
        <summary>SerachResult.js</summary>

     ```javascript
     window.addEventListener("scroll", function () {
       document.querySelectorAll(".lazy-img").forEach((img) => {
         if (img.getBoundingClientRect().top < window.innerHeight) {
           img.src = img.dataset.src; // data-src에 있던 실제 URL 적용
         }
       });
     });
     ```

2) IntersectionObserver 사용
      <details>
        <summary>SerachResult.js</summary>

   ```javascript
   const observer = new IntersectionObserver((entries, observer) => {
     entries.forEach((entry) => {
       if (entry.isIntersecting) {
         const img = entry.target;
         img.src = img.dataset.src;
         observer.unobserve(img); // 한 번 로딩되면 감지 중지
       }
     });
   });

   document.querySelectorAll(".lazy-img").forEach((img) => {
     observer.observe(img);
   });
   ```
