class ImageInfo {
  $imageInfo = null;
  data = null;
  // isLoading = false;

  constructor({ $target, data, isLoading }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.isLoading = isLoading;

    console.log(this.data);

    this.render();
    this.addEvent();
  }

  async setState(nextData) {
    this.data = nextData;
    if (this.data.visible) {
      this.isLoading.setState(true);
      const catInfo = await api.fetchCatInfo(this.data.image.id);
      if (catInfo) {
        this.data.image.temperament = catInfo.data.temperament;
        this.data.image.origin = catInfo.data.origin;
      }
      this.isLoading.setState(false);
    }
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
      this.$imageInfo.style.display = "block";
      this.$imageInfo.classList.add("show");
      this.$imageInfo.classList.remove("hide");
    } else {
      setTimeout(() => {
        this.$imageInfo.style.display = "none";
      }, 300);
      this.$imageInfo.classList.add("hide");
      this.$imageInfo.classList.remove("show");
    }
  }

  addEvent() {
    this.$imageInfo.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("ImageInfo") ||
        e.target.classList.contains("close")
      ) {
        this.setState({ visible: false });
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.setState({ visible: false });
      }
    });
  }
}
