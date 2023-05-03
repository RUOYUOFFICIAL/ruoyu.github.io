//自定义事件
//跳转
function _2URL(url) {
  top.location.href = url;
}
//延时跳转
function delay2URL(url, time) {
  setTimeout("top.location.href = '" + url + "'", time);
}

//indexbar位置控制
function sticky() {
  if (document.documentElement.scrollTop < header.scrollHeight) {
    galaxy.style.display = "block";
    indexbar.style.position = "relative";
    indexbar.style.opacity = 0.9;
  } else {
    galaxy.style.display = "none";
    indexbar.style.position = "fixed";
    indexbar.style.top = 0;
    indexbar.style.opacity = 0.5;
  }
}
//窗口大小改变时重新放置小球
window.onresize = function () {
  var curWidth = header.scrollWidth,
    curHeight = header.scrollHeight;
  reParticles(galaxy.width, curWidth, galaxy.height, curHeight);
  galaxy.width = curWidth;
  galaxy.height = curHeight;
  galaxyCtx.lineWidth = 0.3;
  sticky(); //sticky.js函数，用于判断galaxy和indexbar呈像问题
};
//窗口滚动条位置改变时判断galaxy和indexbar呈像问题
window.onload = window.onscroll = function () {
  sticky();
};

//鼠标事件
galaxy.onmouseenter = galaxy.onmousemove = function (ev) {
  mouseFOCUS = true;
  var e = ev;
  mousePos.x = e.offsetX;
  mousePos.y = e.offsetY;
  if (DEBUG && deb_mouse)
    console.log("mouse enter|move:", e.offsetX, e.offsetY);
};
galaxy.onmouseleave = function () {
  mouseFOCUS = false;
  mouse_Left = false;
  mouse_Mid = false;
  mouse_Right = false;
  if (DEBUG && deb_mouse) console.log("mouse leave");
};
galaxy.onmousedown = function (ev) {
  var e = ev;
  switch (e.button) {
    case 0:
      mouse_Left = true;
      break;
    case 1:
      mouse_Mid = true;
      break;
    case 2:
      mouse_Right = true;
      break;
    default:
      if (DEBUG && deb_mouse) console.log("mouse down:", ev.button);
      break;
  }
};
galaxy.onmouseup = function (ev) {
  var e = ev;
  switch (e.button) {
    case 0:
      mouse_Left = false;
      break;
    case 1:
      mouse_Mid = false;
      break;
    case 2:
      mouse_Right = false;
      break;
    default:
      if (DEBUG && deb_mouse) console.log("mouse up:", ev.button);
      break;
  }
};

//按键事件
document.onkeydown = function (ev) {
  //callee针对firefox
  var e = ev || window.event || arguments.callee.caller.arguments[0];

  switch (e.key) {
    case "w":
    case "ArrowUp":
      key_S = false;
      key_W = true;
      break;
    case "s":
    case "ArrowDown":
      key_W = false;
      key_S = true;
      break;
    case "a":
    case "ArrowLeft":
      key_D = false;
      key_A = true;
      break;
    case "d":
    case "ArrowRight":
      key_A = false;
      key_D = true;
      break;
    case " ":
      key_Space = true;
      break;
    case "`":
      key_CONSOLE = !key_CONSOLE;
      break;
    default:
      if (DEBUG && deb_key) console.log("key down:", e.key);
      break;
  }
};
document.onkeyup = function (ev) {
  //callee针对firefox
  var e = ev || window.event || arguments.callee.caller.arguments[0];
  switch (e.key) {
    case "w":
    case "ArrowUp":
      key_W = false;
      break;
    case "s":
    case "ArrowDown":
      key_S = false;
      break;
    case "a":
    case "ArrowLeft":
      key_A = false;
      break;
    case "d":
    case "ArrowRight":
      key_D = false;
      break;
    case " ":
      key_Space = false;
      break;
    default:
      if (DEBUG && deb_key) console.log("key up:", e.key);
      break;
  }
};

//禁用事件
/*
[小白鸥]关于js禁止浏览器缩放
https://www.cnblogs.com/xiaobaiou/p/10731062.html
*/
//chrome 禁止ctrl+滚轮
window.addEventListener(
  "mousewheel",
  function (event) {
    if (event.ctrlKey === true || event.metaKey) {
      event.preventDefault();
    }
  },
  { passive: false }
);

//firefox禁止ctrl+滚轮
window.addEventListener(
  "DOMMouseScroll",
  function (event) {
    if (event.ctrlKey === true || event.metaKey) {
      event.preventDefault();
    }
  },
  { passive: false }
);

/*
版权声明：本文为CSDN博主「Noblesse-」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wen81643956/article/details/99586314
*/
// 阻止pc端浏览器缩放js代码
// 由于浏览器菜单栏属于系统软件权限，没发控制，着手解决ctrl/cammond + +/-
// chrome 浏览器直接加上下面这个样式就行了，但是ff不识别
document.body.style.zoom = "reset";
window.addEventListener(
  "keydown",
  function (event) {
    if (
      (event.ctrlKey === true || event.metaKey === true) &&
      (event.which === 61 ||
        event.which === 107 ||
        event.which === 173 ||
        event.which === 109 ||
        event.which === 187 ||
        event.which === 189)
    ) {
      event.preventDefault();
    }
  },
  false
);
