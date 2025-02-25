class DarkMode {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
    this.setTheme();
    this.addEvent();
  }

  render() {
    // 1. 체크박스 생성
    const fragment = document.createDocumentFragment(); // 가상 DOM 생성

    this.$darkModeCheckBox = document.createElement("input");
    this.$darkModeCheckBox.id = "dark-mode";
    this.$darkModeCheckBox.type = "checkbox";
    this.$label = document.createElement("label");
    this.$label.htmlFor = "dark-mode";
    this.$label.innerHTML = "DarkMode";

    // $target.appendChild(this.$darkModeCheckBox); // 1. DOM 업데이트 발생
    // $target.appendChild(this.$label); // 2. DOM 업데이트 발생
    fragment.appendChild(this.$darkModeCheckBox); // 메모리에서만 추가
    fragment.appendChild(this.$label); // 메모리에서만 추가

    this.$target.appendChild(fragment); // 한 번만 DOM 업데이트!
  }

  setTheme() {
    // 이 로직은 생략가능: 사용자가 지정해둔 테마가 있었는지 확인
    const userTheme = localStorage.getItem("theme");

    // 2. OS 다크모드 확인
    // theme: userTheme가 있다면 그 값(dark or light), 없다면 os값을 data-set theme에 지정해줌
    const theme =
      userTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", theme);
    // 만약 다크모드면 체크처리
    this.$darkModeCheckBox.checked = theme === "dark";
  }

  addEvent() {
    // 3. 체크박스 이벤트리스너 추가
    this.$darkModeCheckBox.addEventListener("change", () => {
      const theme = this.$darkModeCheckBox.checked ? "dark" : "light";
      // 다크모드 체크되면, 다크모드 활성화
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    });
  }
}
