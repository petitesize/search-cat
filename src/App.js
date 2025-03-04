console.log("app is running!");

class App {
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
          if (!res.ok) {
            if (res.status === 500) {
              this.setState({ isLoading: false });
              throw new Error(
                "서버에서 오류가 발생했습니다. 다시 시도해주세요"
              );
            }
          }
          if (res.data) {
            this.setState({ data: res.data, isLoading: false });
            localStorage.setItem("lastSearch", JSON.stringify(res.data));
          }
        } catch (err) {
          console.error(err);
          this.setState({ isLoading: false });
        }
      },
      onRandom: async () => {
        this.setState({ isLoading: true });
        try {
          const res = await api.fetchCatInfo("random50");
          if (!res.ok) {
            if (res.status === 500) {
              this.setState({ isLoading: false });
              throw new Error(
                "서버에서 오류가 발생했습니다. 다시 시도해주세요"
              );
            }
          }
          if (res.data) {
            this.setState({ data: res.data, isLoading: false });
            localStorage.setItem("lastSearch", JSON.stringify(res.data));
          }
        } catch (err) {
          console.error(err);
          this.setState({ isLoading: false });
        }
      },
    });

    this.loading = new Loading({ $target });
    this.searchResult = new SearchResult({
      $target,
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
