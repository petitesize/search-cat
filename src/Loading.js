export default class Loading {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
  }

  render() {
    // 로딩 오버레이 (화면 전체 덮는 회색 배경)
    this.$loadingOverlay = document.createElement("div");
    this.$loadingOverlay.classList.add("loading-overlay");
    this.$loadingOverlay.style.display = "none";

    // 로딩 스피너 컨테이너 (스피너 + 텍스트 포함)
    this.$loadingContainer = document.createElement("div");
    this.$loadingContainer.classList.add("loading-container");

    this.$loadingSpinner = document.createElement("div");
    this.$loadingSpinner.classList.add("loading-spinner");
    // this.$loading.innerHTML = "Loading...";
    this.$loadingSpinner.style.display = "none";

    // 스피너 안에 텍스트(고양이 모양 "|")
    this.$loadingText = document.createElement("span");
    this.$loadingText.classList.add("loading-text");
    this.$loadingText.innerText = "┙"; // 고양이 모양으로 사용

    // 로딩 컨테이너에 스피너 & 텍스트 추가
    this.$loadingContainer.appendChild(this.$loadingSpinner);
    this.$loadingContainer.appendChild(this.$loadingText);

    this.$loadingOverlay.appendChild(this.$loadingContainer);
    this.$target.appendChild(this.$loadingOverlay);
  }

  setState(isLoading) {
    if (isLoading) {
      this.$loadingOverlay.style.display = "flex"; // 오버레이 활성화
    } else {
      this.$loadingOverlay.style.display = "none"; // 오버레이 숨기기
    }

    if (isLoading) {
      this.$loadingSpinner.style.display = "block";
    } else {
      this.$loadingSpinner.style.display = "none";
    }
  }
}
