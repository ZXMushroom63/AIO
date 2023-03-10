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
  for (let i = 0; i < inj.length; i++) {
    const element = inj[i];
    element.remove();
  }
}
function jsLoader() {
  if (window.scriptTool) {
    window.scriptTool.load();
  }
}
function toggleDev() {
  if (document.body.contentEditable == "true") {
    document.body.contentEditable = "false";
  } else {
    document.body.contentEditable = "true";
  }
}
function displayHTML(html) {
  var winDow = window.open(
    "",
    "",
    "width=600,height=480,toolbar=no,menubar=no,resizable=yes"
  );
  winDow.document.documentElement.outerHTML = html;
}
function displayText(text) {
  var winDow = window.open(
    "",
    "",
    "width=600,height=480,toolbar=no,menubar=no,resizable=yes"
  );
  winDow.document.body.innerText = text;
}
window.keyText = "";
function logKeys(e) {
  window.keyText += e.key;
}
function keylogger() {
  if (!window.keyloggerActive) {
    window.keyloggerActive = true;
    addEventListener("keyup", logKeys);
  } else {
    window.keyloggerActive = false;
    removeEventListener("keyup", logKeys);
    displayText(window.keyText);
  }
}
function clearKeylogger() {
  window.keyText = "";
}
function eruda() {
  (function () {
    var script = document.createElement("script");
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = function () {
      eruda.init();
    };
  })();
}
function saveTool2() {
  document.body.innerHTML = "";
  document.write("<title>Save Editor</title><h1>Save Editor</h1><br>");
  for (let io = 0; io < localStorage.length; io++) {
    const key = localStorage.key(io);
    document.write(
      `<a href="javascript:var newval = window.prompt('Set ${key} to:', localStorage.getItem('${key}')); localStorage.setItem('${key}', newval); saveTool2()">${key}:   ${localStorage.getItem(
        key
      )}</a>`
    );
    document.write(`<br>`);
    document.write(`<br>`);
  }
}
function clearCache() {
  document.cookie = "";
  location.reload(true);
}
var repos = {
  items: [],
  save: () => {},
  load: () => {},
  run: () => {},
  add: () => {},
  remove: () => {},
  reset: () => {},
};
var backupTool = {
  makeBackup: () => {},
  loadBackup: () => {},
  getUsed: () => {},
  wipe: () => {},
};
function aioContainer() {
  var aio = document.createElement("div");
  aio.id = "aio";
  aio.append(
    makeDropdown("File", [
      ["Add Script...", jsLoader],
      ["Clear Cache", clearCache],
      ["Quit", quit],
    ])
  );
  aio.append(
    makeDropdown("Tools", [
      ["Toggle Dev", toggleDev],
      ["Eruda", eruda],
      ["SaveTool v2", saveTool2],
    ])
  );
  aio.append(
    makeDropdown("Repos", [
      [
        "Add Repo",
        () => {
          repos.add(window.prompt("URL of repo to add: "));
        },
      ],
      [
        "Remove Repo",
        () => {
          repos.remove(window.prompt("URL of repo to remove: "));
        },
      ],
      [
        "List Repos",
        () => {
          alert(repos.list().join(", "));
        },
      ],
      [
        "Reset Repos",
        () => {
          repos.reset();
        },
      ],
    ])
  );
  aio.append(
    makeDropdown("Storage", [
      ["Make Backup", backupTool.makeBackup],
      ["Load Backup", backupTool.loadBackup],
      [
        "Get Used Storage",
        () =>
          window.alert(
            "This website uses " + backupTool.getUsed() + " of storage."
          ),
      ],
      ["Wipe Save", backupTool.wipe],
    ])
  );
  aio.append(
    makeDropdown("Keylogger", [
      ["Toggle Keylogger", keylogger],
      ["Clear Keylog", clearKeylogger],
    ])
  );
  document.documentElement.append(aio);
}
function init() {
  window.aio = true;
  inject(
    "style",
    "https://raw.githubusercontent.com/ZXMushroom63/AIO/main/main.css",
    aioContainer,
    "shift"
  );
  inject(
    "script",
    "https://raw.githubusercontent.com/ZXMushroom63/AIO/main/pipe.js"
  );
  inject(
    "script",
    "https://raw.githubusercontent.com/ZXMushroom63/AIO/main/backup.js"
  );
}
init();
