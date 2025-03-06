import DarkMode from "./DarkMode.js";
import SearchInput from "./SearchInput.js";

export default class Header {
  constructor({ $target, onSearch, onRandom }) {
    this.$target = $target;
    this.$header = document.createElement("header");
    this.$target.appendChild(this.$header);

    this.darkMode = new DarkMode({ $target: this.$header });

    this.searchInput = new SearchInput({
      $target: this.$header,
      onSearch,
      onRandom,
    });

    this.render();
  }

  render() {}
}
