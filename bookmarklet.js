function inject(type, url, after = () => {}) {
  fetch(url).then((x) =>
    x.blob().then((y) =>
      y.text().then((z) => {
        var elem = document.createElement(type);
        elem.innerText = z;
        document.head.append(elem);
        after();
      })
    )
  );
}
inject(
  "style",
  "https://raw.githubusercontent.com/ZXMushroom63/AIO/main/main.js"
);
