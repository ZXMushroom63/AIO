javascript: function inject(type, url, after = () => {}) {
  fetch(url).then((x) =>
    x.blob().then((y) =>
      y.text().then((z) => {
        var elem = document.createElement(type);
        elem.classList.add("injected");
        elem.innerHTML = z;
        document.head.append(elem);
        after();
      })
    )
  );
}
inject(
  "script",
  "https://raw.githubusercontent.com/ZXMushroom63/AIO/main/main.js"
);
