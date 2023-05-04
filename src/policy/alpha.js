//元素注册
var AUTHOR = 'RUOYU';
function Elem(id) {
  return document.getElementById(id);
}

var HEADER = Elem('header'),
  MAJOR = Elem('major'),
  FOOTER = Elem('footer'),
  GLX = Elem('galaxy'),
  CTX = GLX.getContext('2d'),
  core = Elem('core'),
  indexbar = Elem('indexbar'),
  search_btn = Elem('search_btn'),
  search_ipt = Elem('search_ipt'),
  ftext = Elem('ftext');

//事件量
var mousePos = { x: 0, y: 0 },
  mouseFOCUS = false,
  mouse_Left = false,
  mouse_Mid = false,
  mouse_Right = false,
  key_Console = false,
  key_Shift = false,
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
  deb_cmd = false, // 指令调试
  deb_obj = false; //对象调试

//galaxy常量
var FPS = 60,
  ZERO = 0.01,
  PI = Math.PI,
  count = 20,
  size = 24,
  size_ratio = 2,
  speed = 0.3,
  speed_ratio = 2,
  force = 30,
  acc = 1,
  dec = 0.975,
  angle = NaN;
