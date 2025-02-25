# 😺프로그래머스 고양이 사진 검색 사이트 (Vanilla JS)

<a href='https://programmers.co.kr/skill_check_assignments/4'> 프로그래머스 과제 테스트 2020 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 고양이 사진 검색 사이트</a> 과제를 직접 풀어보았습니다. </br>
본 과제는 라이브러리나 프레임워크 없이 <b>Vanilla JS(ES6)</b>로만 구현하였으며, 기능 요구 사항의 풀이 과정을 기록하였습니다.

## 🚀트러블슈팅

#### 🎯문제 상황: 다크 모드 ON/OFF를 구현하기 위해 .dark-mode 클래스를 토글하는 방식을 사용하였음.

그러나, 이 방식은 OS의 다크 모드가 활성화된 상태에서는 다크 모드를 OFF할 수 없는 문제가 발생함.

#### 🔧해결 방법: : data-theme 속성 사용

- 클래스 토글 대신 data-theme 속성으로 다크모드를 관리하여, OS 설정을 우선으로 따르되 사용자가 변경 가능하도록 수정
    <details>
    <summary>data-theme를 활용한 CSS 변경</summary>

  ```
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
