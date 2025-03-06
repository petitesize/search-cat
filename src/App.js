import SearchResult from "./SearchResult.js";
import Loading from "./Loading.js";
import api from "./api.js";
import ImageInfo from "./ImageInfo.js";
import Header from "./Header.js";
import RandomBanner from "./RandomBanner.js";

console.log("app is running!");

export default class App {
  $target = null;
  data = null;
  isLoading = false;
  bannerData = null;

  constructor($target) {
    this.$target = $target;

    // 헤더 안에 다크모드와 검색창을 넣어줄 것

    this.$header = new Header({
      $target,
      onSearch: async (keyword) => {
        this.setState({ isLoading: true });
        try {
          const res = await api.fetchCats(keyword);

          if (res.error) {
            this.$searchResult.innerHTML = res.error;
            throw new Error(res.error);
          }

          if (res.data) {
            this.setState({ data: res.data, isLoading: false });
            // 마지막 검색 결과 로컬스토리지에 저장
            localStorage.setItem("lastSearch", JSON.stringify(res.data));
          }
        } catch (err) {
          this.setState({ isLoading: false });
        }
      },
      onRandom: async () => {
        this.setState({ isLoading: true });
        try {
          const res = await api.fetchRandomCats();

          if (res.error) {
            this.$searchResult.innerHTML = res.error;
            throw new Error(res.error);
          }
          if (res.data) {
            this.setState({ data: res.data, isLoading: false });
            localStorage.setItem("lastSearch", JSON.stringify(res.data));
          }
        } catch (err) {
          this.setState({ isLoading: false });
        }
      },
    });

    this.loading = new Loading({ $target });

    this.init();

    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    this.$target.appendChild(this.$searchResult);

    this.searchResult = new SearchResult({
      $target: this.$searchResult,
      initialData: this.data,
      // 이미지 클릭 시, 모달 보이게
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      isLoading: this.loading,
    });
  }

  setState(nextData) {
    console.log(this);
    // 로딩, 데이터를 구분해서 업데이트
    if (nextData.data !== undefined) {
      this.data = nextData.data;
      this.searchResult.setState(nextData);
    }

    if (nextData.isLoading !== undefined) {
      this.isLoading = nextData.isLoading;
      this.loading.setState(this.isLoading);
    }
  }

  async init() {
    const $section = document.createElement("section");
    $section.className = "BannerWrapper";
    this.$target.appendChild($section);
    this.loading.setState(true);
    try {
      const res = await api.fetchRandomCats();

      if (res.error) {
        this.$searchResult.innerHTML = res.error;
        throw new Error(res.error);
      }
      if (res.data) {
        this.loading.setState(false);
        this.bannerData = res.data;
      }
    } catch (err) {
      this.loading.setState(false);
    }
    this.banner = new RandomBanner({
      $target: this.$header,
      data: this.bannerData,
    });
  }
}
