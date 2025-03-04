// const TEMPLATE = '<input type="text">';
import SearchHistory from "./SearchHistory.js";

export default class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const fragment = document.createDocumentFragment();
    this.onRandom = onRandom;

    const $searchWrapper = document.createElement("div");
    $searchWrapper.className = "search-wrapper";
    // 1. input el 생성
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.className = "searchInput";
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    fragment.appendChild($searchInput);

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.innerText = "Random Cat";
    fragment.appendChild($randomButton);

    $searchWrapper.appendChild(fragment);

    $target.appendChild($searchWrapper);

    this.searchHistory = new SearchHistory({ $target, onSearch });

    // 페이지 진입 시 포커스가 input에 가도록 처리하고, 키워드를 입력한 상태에서 input을 클릭할 시에는 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.
    $searchInput.focus();

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
        this.searchHistory.addHistory(e.target.value);
      }
    });

    console.log("SearchInput created.", this);
    this.addEvent();
  }
  render() {}

  addEvent() {
    this.$searchInput.addEventListener("click", (e) => {
      e.target.value = "";
    });

    this.$randomButton.addEventListener("click", () => {
      this.onRandom();
    });
  }
}
