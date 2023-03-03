repos = {
  init: () => {
    function inject(type, url, after = () => {}, id = "") {
      fetch(url).then((x) =>
        x.blob().then((y) =>
          y.text().then((z) => {
            var elem = document.createElement(type);
            elem.classList.add("injected");
            elem.innerHTML = z;
            if (id !== "") {
              elem.id = id;
            }
            document.head.append(elem);
            after();
          })
        )
      );
    }
    if (!localStorage.getItem("repos")) {
      localStorage.setItem(
        "repos",
        `{"repos":["https://raw.githubusercontent.com/ZXMushroom63/AIO/main/repo.json"],"installed":[]}`
      );
    }
    try {
      this.r = JSON.parse(localStorage.getItem(repos));
    } catch (e) {
      localStorage.setItem(
        "repos",
        `{"repos":["https://raw.githubusercontent.com/ZXMushroom63/AIO/main/repo.json"],"installed":[]}`
      );
      this.r = JSON.parse(localStorage.getItem(repos));
    }
    for (let i = 0; i < r.installed.length; i++) {
      const res = r.installed[i];
      inject(res.type, res.url);
    }
  },
  save: () => {
    if (this.r) {
      localStorage.setItem("repos", JSON.stringify(this.r));
    }
  },
  addRepo: (url) => {
    this.r.repos.push(url);
    this.save();
  },
  addPlugin: (url) => {
    var plugin = { type: "script", url: url };
    this.r.installed.push(plugin);
    this.save();
  },
  addStyle: (url) => {
    var theme = { type: "style", url: url };
    this.r.installed.push(theme);
    this.save();
  },
  remove: (itemType, url) => {
    if (itemType === "repo") {
      var index = this.r.repos.lastIndexOf(url);
      if (index > -1) {
        this.r.repos.splice(index, 1);
      }
    }
    if (itemType === "plugin") {
      var index = this.r.installed.lastIndexOf({ type: "script", url: url });
      if (index > -1) {
        this.r.installed.splice(index, 1);
      }
    }
    if (itemType === "style") {
      var index = this.r.installed.lastIndexOf({ type: "style", url: url });
      if (index > -1) {
        this.r.installed.splice(index, 1);
      }
    }
    this.save();
  },
  launch: () => {
    var containerDiv = document.createElement("div");
    containerDiv.id = "repos";
    document.querySelector("#aio").append(containerDiv);
    
  },
};
repos.init();
