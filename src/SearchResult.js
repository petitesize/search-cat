export default class SearchResult {
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$target = $target;

    this.data = JSON.parse(localStorage.getItem("lastSearch")) || initialData;
    this.onClick = onClick;

    this.render();
  }

  // 2. lazy load 동작 핵심 로직
  handleLazyLoad = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 뷰포트에 들어오면
        const img = entry.target;
        img.src = img.dataset.src; // data-src 속성에 저장되어 있는 실제 이미지 URL 가져와서 적용
        observer.unobserve(img); // 로딩 후 감지 중지
      }
    });
  };

  observeImgs() {
    // 1. lazy load를 위한 Intersection Observer
    this.observer = new IntersectionObserver(this.handleLazyLoad, {
      root: null, // viewport 기준으로 감지하겠다다
      rootMargin: "0px", // 뷰포트 경계에서 추가 여백 없이 바로 감지
      threshold: 0.1, // 이미지가 10% 이상 보일 때 로드
    });

    // 모든 .lazy-img 요소를 Intersection Observer로 감지
    // 뷰포트에 나타나면 handleLazyLoad 실행 → 실제 이미지 로딩
    /* observe(img) → 해당 요소를 감시 시작
      unobserve(img) → 감시 대상에서 제외 */
    this.$target.querySelectorAll(".lazy-img").forEach((img) => {
      this.observer.observe(img);
    });
  }

  setState(nextData) {
    this.data = nextData.data;
    this.render();
  }

  addEvent() {
    // Event Delegation 기법 사용하기
    // 1. 부모 요소에 클릭 이벤트 등록
    this.$target.addEventListener("click", (e) => {
      // 2. 클릭한 지점에서 가장 가까운 item 찾기
      const $item = e.target.closest(".item");
      if (!$item) return; // item 없으면 return

      // 3. querySelectorAll 반환값은 유사배열
      // => Array.from() 사용하여 배열로 만들어줌
      // => 모든 item 중에 선택된 $item el의 index 가져옴
      const index = Array.from(this.$target.querySelectorAll(".item")).indexOf(
        $item
      );
      if (index !== -1) {
        this.onClick(this.data[index]);
      }
    });

    // window.addEventListener("scroll", this.applyLazyLoad);
  }

  // 💡 Lazy Load 적용 방법 2
  // applyLazyLoad() {
  //   document.querySelectorAll(".lazy-img").forEach((img) => {
  //     if (
  //       img.dataset.src &&
  //       img.getBoundingClientRect().top < window.innerHeight
  //     ) {
  //       img.src = img.dataset.src;
  //       img.removeAttribute("data-src");
  //     }
  //   });
  // }

  render() {
    if (this.data) {
      if (this.data.length === 0) {
        this.$target.innerHTML = `<div class="result-msg"><p>❌ 검색 결과가 없습니다.</p></div>`;
      } else {
        this.$target.innerHTML = this.data
          .map(
            (cat) => `
            <article class="item">
               <img class="lazy-img" title=${cat.name} data-src=${cat.url} alt=${cat.name}  />
            </article>
          `
          )
          .join("");
      }
    }
    // this.applyLazyLoad();
    this.observeImgs();
    this.addEvent();
  }
}
