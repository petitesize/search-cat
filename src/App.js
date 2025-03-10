import SearchResult from "./SearchResult.js";
import Loading from "./Loading.js";
import api from "./api.js";
import ImageInfo from "./ImageInfo.js";
import Header from "./Header.js";
import RandomBanner from "./RandomBanner.js";

console.log("app is running!");

export const ERROR_MSG = (msg) => `<div class="result-msg"><p>${msg}</p></div>`;

export default class App {
  $target = null;
  data = null;
  isLoading = false;
  bannerData = null;

  constructor($target) {
    this.$target = $target;
    this.setupLayout();

    this.setupHeader();
    this.loading = new Loading({ $target });
    this.setupBanner();

    this.setImageInfo();
  }

  // 기본 레이아웃 틀
  setupLayout() {
    this.$header = document.createElement("header");
    this.$target.appendChild(this.$header);

    // 섹션 레이아웃을 잡아줌
    this.$bannerWrapper = document.createElement("section");
    this.$bannerWrapper.className = "BannerWrapper";
    this.$target.appendChild(this.$bannerWrapper);

    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    this.$target.appendChild(this.$searchResult);
  }

  setupHeader() {
    // 헤더 안에 다크모드와 검색창을 넣어줄 것
    this.$header = new Header({
      $target: this.$header,
      onSearch: (keyword) => this.fetchData(api.fetchCats, keyword),
      onRandom: () => this.fetchData(api.fetchRandomCats),
    });
  }

  async setupBanner() {
    this.setState({ isLoading: true });
    try {
      const res = await api.fetchRandomCats();

      this.bannerData = res.data;
      this.banner = new RandomBanner({
        $target: this.$bannerWrapper,
        data: this.bannerData,
      });

      if (res.error) {
        this.banner.setError("배너 이미지 요청 중 오류가 발생하였습니다.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }

    this.setSearchResult();
  }

  setSearchResult() {
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
  }

  setImageInfo() {
    this.imageInfo = new ImageInfo({
      $target: this.$target,
      data: {
        visible: false,
        image: null,
      },
      isLoading: this.loading,
    });
  }

  fetchData = async (apiCall, keyword = "") => {
    this.setState({ isLoading: true });
    try {
      // 키워드가 있으면 넣어서 검색, 없으면 x
      // 빈문자열 false 처리됨
      const res = keyword ? await apiCall(keyword) : await apiCall();

      if (res.error) {
        document.querySelector(".SearchResult").innerHTML = ERROR_MSG(
          res.error
        );
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
  };

  setState(nextData) {
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
}
