export default class Loading {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$loading = document.createElement("div");
    this.$loading.classList.add("loading");
    this.$loading.innerHTML = "Loading...";
    this.$loading.style.display = "none";
    this.$target.appendChild(this.$loading);
  }

  setState(isLoading) {
    if (isLoading) {
      this.$loading.style.display = "block";
    } else {
      this.$loading.style.display = "none";
    }
  }
}
