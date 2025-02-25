# 😺프로그래머스 고양이 사진 검색 사이트 (Vainlia JS)

## 🚀트러블슈팅

#### 🎯문제 상황: 다크 모드 ON/OFF를 구현하기 위해 .dark-mode 클래스를 토글하는 방식을 사용하였음.

그러나, 이 방식은 OS의 다크 모드가 활성화된 상태에서는 다크 모드를 OFF할 수 없는 문제가 발생함.

#### 🔧해결 방법: : data-theme 속성 사용

- 클래스 토글 대신, data-theme 속성으로 다크모드를 관리하여, OS 설정을 우선으로 따르되 사용자가 변경 가능하도록 수정정
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
