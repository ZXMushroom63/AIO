var backupTool = {
  getUsed: function () {
    var _lsTotal = 0,
      _xLen,
      _x;
    for (_x in localStorage) {
      if (!localStorage.hasOwnProperty(_x)) {
        continue;
      }
      _xLen = (localStorage[_x].length + _x.length) * 2;
      _lsTotal += _xLen;
    }
    return (_lsTotal / 1024).toFixed(2) + " KB";
  },
  wipe: function () {
    if (window.confirm("Are your sure you want to wipe your websites saves?")) {
      localStorage.clear();
      location.reload();
    }
  },
  makeBackup: function () {
    function download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
    function getLocalStorage() {
      var save = {};
      var keys = [];
      for (i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        save[key] = localStorage.getItem(key);
      }
      return save;
    }
    function exportSave() {
      var date = new Date();
      var name =
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      download(name + ".sav", JSON.stringify(getLocalStorage()));
    }
    exportSave();
  },
  loadBackup: function () {
    function readFile(after) {
      var picker = document.createElement("input");
      picker.setAttribute("type", "file");
      picker.setAttribute("accept", ".sav");
      picker.style.display = "none";
      document.body.appendChild(picker);
      picker.click();
      picker.onchange = () => {
        if (picker.files[0]) {
          const reader = new FileReader();
          reader.onload = (event) => {
            after(event.target.result);
          };
          reader.readAsText(picker.files[0]);
        }
      };
    }
    function setLocalStorage(save) {
      var keys = Object.keys(save);
      localStorage.clear();
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        localStorage.setItem(key, save[key]);
      }
    }
    function loadSave(text) {
      console.log("Text: " + text);
      setLocalStorage(JSON.parse(text));
      location.reload();
    }
    readFile(loadSave);
  },
};
