javascript: function injectCSS(css) {
  var css = document.createElement("style");
  css.innerText = css;
  document.head.append(css);
}
function makeDropdown(name, options = [["Click Me", ()=>{alert("wow")}]]) {
    var dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    var dropbtn = document.createElement("button");
    dropdown.classList.add("dropbtn");
    dropbtn.innerText=name;
    dropdown.append(dropbtn);
    var dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        var a = document.createElement("a");
        a.innerText=option[0];
        a.addEventListener("click",option[1]);
        dropdownContent.append(a);
    }
    dropdown.append(dropdownContent);
    return dropdown;
}
function init() {
    window.aio=true;
    injectCSS(`
        html {
            padding-top: 5%;
            padding-bottom: 4%;
        }
        #aio {
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            pointer-events: none;
            z-index:99999999999;
            border: 2px solid black;
        }
        .dropbtn {
            background-color: #f1f1f1;
            color: black;
            padding: 12px 16px;
            font-size: 16px;
            border: none;
        }
        
        .dropdown {
            position: relative;
            display: inline-block;
        }
        
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f1f1f1;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        
        .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        
        .dropdown-content a:hover {background-color: #ddd;}
        
        .dropdown:hover .dropdown-content {display: block;}
        
        .dropdown:hover .dropbtn {background-color: #ddd;}
    `)
}
