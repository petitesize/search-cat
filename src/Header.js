import DarkMode from "./DarkMode.js";
import SearchInput from "./SearchInput.js";

export default class Header {
  constructor({ $target, onSearch, onRandom }) {
    this.$target = $target;

    this.darkMode = new DarkMode({ $target: this.$target });

    this.searchInput = new SearchInput({
      $target: this.$target,
      onSearch,
      onRandom,
    });

    this.render();
  }

  render() {}
}
