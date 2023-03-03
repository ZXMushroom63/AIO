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
repos = {
  items: [],
  save: () => {
    localStorage.setItem("repos", JSON.stringify(this.items));
  },
  load: () => {
    this.items = JSON.parse(localStorage.getItem("repos"));
  },
  run: () => {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      inject("script", item);
    }
  },
  add: (url) => {
    this.items.push(url);
  },
  remove: (url) => {
    this.items.splice(this.items.lastIndexOf(url), 1);
  },
};
if (!localStorage.getItem("repos")) {
  localStorage.setItem("repos", "[]");
}
