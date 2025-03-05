export default class SearchHistory {
  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;
    this.keywordsHistory = localStorage.getItem("searchKeywords")
      ? localStorage.getItem("searchKeywords").split(",")
      : [];
    this.$searchKewordContainer = document.createElement("div");
    this.$searchKewordContainer.className = "history-wrapper";
    this.$searchInput = document.querySelector(".SearchInput");
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
