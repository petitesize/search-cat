import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import DarkMode from "./DarkMode.js";
import Loading from "./Loading.js";
import api from "./api.js";
import ImageInfo from "./ImageInfo.js";

console.log("app is running!");

export default class App {
  $target = null;
  data = null;
  isLoading = false;

  constructor($target) {
    this.$target = $target;

    // 헤더 안에 다크모드와 검색창을 넣어줄 것
    this.$header = document.createElement("header");
    this.$target.appendChild(this.$header);

    this.darkMode = new DarkMode({ $target: this.$header });

    this.searchInput = new SearchInput({
      $target: this.$header,
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
            localStorage.setItem("lastSearch", JSON.stringify(res.data));
          }
        } catch (err) {
          this.setState({ isLoading: false });
        }
      },
      onRandom: async () => {
        this.setState({ isLoading: true });
        try {
          const res = await api.fetchCatInfo("random50");

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
}
