function inject(type, url, after = () => {}) {
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
  dropbtn.classList.add("dropbtn");
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
function quit() {
  document.querySelector("#aio").remove();
  var inj = document.querySelectorAll(".injected");
  for (elem in inj) {
    elem.remove();
  }
}
function aioContainer() {
  var aio = document.createElement("div");
  aio.id = "aio";
  aio.append(makeDropdown("File", [["Quit", quit]]));
  document.documentElement.append(aio);
}
function init() {
  window.aio = true;
  inject(
    "style",
    "https://raw.githubusercontent.com/ZXMushroom63/AIO/main/main.css",
    aioContainer
  );
}
init();
