export default class RandomBanner {
  constructor({ $target, data }) {
    this.$target = $target;
    this.data = data;
    this.currentIndex = 0;
    this.itemsPerPage = 5;
    this.totalPages = 10;

    this.render();
    this.setBannerImg();
    this.updateButtonState();
    this.addEvent();
  }

  render() {
    const $bannerWrapper = document.querySelector(".BannerWrapper");

    // 배너 전체 감싸는 컨테이너
    this.$bannerContainer = document.createElement("div");
    this.$bannerContainer.className = "banner-container";

    // 배너 아이템들이 들어갈 내부 div
    this.$bannerInner = document.createElement("div");
    this.$bannerInner.className = "banner-inner";

    this.$prevBtn = document.createElement("button");
    this.$prevBtn.innerHTML = "<";
    this.$nextBtn = document.createElement("button");
    this.$nextBtn.innerHTML = ">";

    // 구조 변경: 화살표를 감싸는 컨테이너에 배너 추가
    $bannerWrapper.appendChild(this.$prevBtn);
    this.$bannerContainer.appendChild(this.$bannerInner);
    $bannerWrapper.appendChild(this.$bannerContainer);
    $bannerWrapper.appendChild(this.$nextBtn);
  }

  setBannerImg() {
    this.$bannerInner.innerHTML = this.data
      .map(
        (cat) => `
          <div class="banner-item">
             <img class="lazy-img" title="${cat.name}" src="${cat.url}" alt="${cat.name}" />
          </div>
        `
      )
      .join("");

    // 배너 전체의 가로 길이를 페이지 개수에 맞게 조정
    this.$bannerInner.style.width = `${this.totalPages * 100}%`;
  }

  updateBannerPosition() {
    // 한 번에 5개씩 이동하도록 translateX 설정
    this.$bannerInner.style.transform = `translateX(-${
      (this.currentIndex * 100) / this.totalPages
    }%)`;
  }

  addEvent() {
    this.$nextBtn.addEventListener("click", () => {
      if (this.currentIndex < this.totalPages - 1) {
        this.currentIndex += 1;
        this.updateBannerPosition();
      }

      this.updateButtonState();
    });

    this.$prevBtn.addEventListener("click", () => {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
        this.updateBannerPosition();
      }

      this.updateButtonState();
    });
    this.updateButtonState();
  }

  updateButtonState() {
    this.$prevBtn.disabled = this.currentIndex === 0;
    this.$nextBtn.disabled = this.currentIndex === this.totalPages - 1;
  }
}
