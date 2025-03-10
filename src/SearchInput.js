// const TEMPLATE = '<input type="text">';
import SearchHistory from "./SearchHistory.js";

export default class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    this.$target = $target;
    this.onRandom = onRandom;
    this.onSearch = onSearch;
    this.render();
    this.addEvent();
  }

  render() {
    const fragment = document.createDocumentFragment();

    const $searchWrapper = document.createElement("div");
    $searchWrapper.className = "search-wrapper";
    // 1. input el 생성
    this.$searchInput = this.createInputEl();
    fragment.appendChild(this.$searchInput);

    this.$randomButton = this.createButtonEl();
    fragment.appendChild(this.$randomButton);

    $searchWrapper.appendChild(fragment);
    this.$target.appendChild($searchWrapper);

    this.searchHistory = new SearchHistory({
      $target: this.$target,
      onSearch: this.onSearch,
    });

    // 페이지 진입 시 포커스가 input에 가도록 처리하고, 키워드를 입력한 상태에서 input을 클릭할 시에는 기존에 입력되어 있던 키워드가 삭제되도록 만들어야 합니다.
    this.$searchInput.focus();
  }

  createInputEl() {
    const $input = document.createElement("input");
    $input.className = "SearchInput";
    $input.placeholder = "고양이를 검색해보세요.|";

    return $input;
  }

  createButtonEl() {
    const $btn = document.createElement("button");
    $btn.innerText = "Random Cat";
    return $btn;
  }

  addEvent() {
    this.$searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13 && e.target.value) {
        this.onSearch(e.target.value);
        this.searchHistory.addHistory(e.target.value);
      }
    });

    this.$searchInput.addEventListener("click", (e) => {
      e.target.value = "";
    });

    this.$randomButton.addEventListener("click", () => {
      this.onRandom();
    });
  }
}
