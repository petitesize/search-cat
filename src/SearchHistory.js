class SearchHistory {
  // <완> 1. 검색 실행 onSearch 실행
  // <완> 2. 이 검색어를 검색어 배열에 저장
  // <완> 3. 검색이 실행될 때 render = UI 업데이트
  // 4. 최근 검색어 클릭 시 키워드로 검색 실행
  // (완) 로컬스토리지에 검색어 저장
  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;
    this.keywordsHistory = localStorage.getItem("searchKeywords")
      ? localStorage.getItem("searchKeywords").split(",")
      : [];
    this.$searchKewordContainer = document.createElement("div");
    this.$searchKewordContainer.className = "history-wrapper";
    this.$searchInput = document.querySelector(".searchInput");
    this.$target.appendChild(this.$searchKewordContainer);
    this.render();
  }

  render() {
    if (this.keywordsHistory.length > 0) {
      this.$searchKewordContainer.innerHTML = this.keywordsHistory
        .map((keyword) => `<span class="searchHistory">${keyword}</span>`)
        .join("");
    }
    this.addEvent();
  }

  addHistory(keyword) {
    if (this.keywordsHistory.length >= 5) {
      this.keywordsHistory = this.keywordsHistory.slice(0, 4);
    }
    this.keywordsHistory.unshift(keyword);
    localStorage.setItem("searchKeywords", this.keywordsHistory);
    this.render();
  }

  addEvent() {
    document.querySelectorAll(".searchHistory").forEach(($keyword) => {
      $keyword.addEventListener("click", (e) => {
        this.onSearch(e.target.innerHTML);
      });
    });
  }
}
