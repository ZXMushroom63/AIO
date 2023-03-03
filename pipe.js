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
    localStorage.setItem("repos", JSON.stringify(repos.items));
  },
  load: () => {
    repos.items = JSON.parse(localStorage.getItem("repos"));
  },
  run: () => {
    for (let i = 0; i < repos.items.length; i++) {
      const item = repos.items[i];
      inject("script", item);
    }
  },
  add: (url) => {
    repos.items.push(url);
    repos.save();
  },
  remove: (url) => {
    repos.items.splice(repos.items.lastIndexOf(url), 1);
    repos.save();
  },
  list: () => {
    return repos.items;
  },
};
if (!localStorage.getItem("repos")) {
  localStorage.setItem("repos", "[]");
}
repos.load();
repos.run();
