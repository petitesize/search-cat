class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    console.log(this.data);

    this.render();
    this.addEvent();
  }

  async setState(nextData) {
    this.data = nextData;
    if (!this.data.visible) {
      this.$imageInfo.style.display = "none";
      return;
    }
    const catInfo = await api.fetchCatInfo(this.data.image.id);
    if (catInfo) {
      this.data.image.temperament = catInfo.data.temperament;
      this.data.image.origin = catInfo.data.origin;
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
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({ visible: false });
    this.$imageInfo.classList.add("hide");
    this.$imageInfo.classList.remove("show");
  }

  addEvent() {
    this.$imageInfo.addEventListener("click", (e) => {
      if (
        e.target.className === "ImageInfo" ||
        e.target.className === "close"
      ) {
        this.closeModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }
}
