import api from "./api.js";

export default class ImageInfo {
  $imageInfo = null;
  data = null;
  // isLoading = false;

  constructor({ $target, data, isLoading }) {
    this.$target = $target;
    const $searchResult = document.querySelector(".SearchResult");
    this.$searchResult = $searchResult;

    this.data = data;
    this.isLoading = isLoading;

    this.setImageInfo();
    this.render();
    this.addEvent();
  }

  // 모달창 레이아웃 생성
  setImageInfo() {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    this.$target.appendChild($imageInfo);
  }

  async setState(nextData) {
    this.data = nextData;
    if (this.data.visible) {
      this.isLoading.setState(true);
      try {
        const catInfo = await api.fetchCatInfo(this.data.image.id);
        if (catInfo.error) {
          this.data.image.temperament = catInfo.error;
          this.data.image.origin = catInfo.error;
          throw new Error(catInfo.error);
        }
        if (catInfo) {
          this.data.image.temperament = catInfo.data.temperament;
          this.data.image.origin = catInfo.data.origin;
          this.isLoading.setState(false);
        }
      } catch (err) {
        this.isLoading.setState(false);
      }
    }
    this.render();
  }

  // 모달창 안의 내용을 렌더링
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
      this.handleImageShow(true);
    } else {
      this.handleImageShow(false);
    }
  }

  handleImageShow(show = false) {
    if (show) {
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
