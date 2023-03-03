javascript: function inject(type, url, after = () => {}) {
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
function makeDropdown(
  name,
  options = [
    [
      "Click Me",
      () => {
        alert("wow");
      },
    ],
  ]
) {
  var dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  var dropbtn = document.createElement("button");
  dropdown.classList.add("dropbtn");
  dropbtn.innerText = name;
  dropdown.append(dropbtn);
  var dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    var a = document.createElement("a");
    a.innerText = option[0];
    a.addEventListener("click", option[1]);
    dropdownContent.append(a);
  }
  dropdown.append(dropdownContent);
  return dropdown;
}
function init() {
  window.aio = true;
  inject();
}
