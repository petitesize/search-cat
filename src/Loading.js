//필수 데이터를 불러오는 중일 때, 현재 데이터를 불러오는 중임을 유저에게 알리는 UI를 추가해야 합니다.
class Loading {
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
