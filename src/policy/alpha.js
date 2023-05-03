//元素注册
function Elem(id) {
  return document.getElementById(id);
}

var HEADER = Elem("header"),
  MAJOR = Elem("major"),
  FOOTER = Elem("footer"),
  galaxy = Elem("galaxy"),
  galaxyCtx = galaxy.getContext("2d"),
  core = Elem("core"),
  indexbar = Elem("indexbar"),
  search_btn = Elem("search_btn"),
  search_ipt = Elem("search_ipt"),
  year = Elem("year");

//事件量
var mousePos = { x: 0, y: 0 },
  mouseFOCUS = false,
  mouse_Left = false,
  mouse_Mid = false,
  mouse_Right = false,
  key_CONSOLE = false,
  key_Ctrl = false,
  key_W = false,
  key_S = false,
  key_A = false,
  key_D = false,
  key_Space = false;

//模式量
var DEBUG = false,
  deb_key = false, //按键调试
  deb_mouse = false, //鼠标调试
  deb_cmd = false; // 指令调试
//常量
var ZERO = 0.01,
  PI = Math.PI,
  count = 20,
  size = 15,
  size_ratio = 2,
  speed = 0.2,
  speed_ratio = 2,
  force = 30,
  acc = 1,
  dec = 0.95;
