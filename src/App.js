console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    // 헤더 안에 다크모드와 검색창을 넣어줄 것
    this.$header = document.createElement("header");
    this.$target.appendChild(this.$header);

    this.darkMode = new DarkMode({ $target: this.$header });

    this.searchInput = new SearchInput({
      $target: this.$header,
      onSearch: (keyword) => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
    });

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
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
