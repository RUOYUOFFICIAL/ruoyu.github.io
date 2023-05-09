//元素注册
var AUTHOR = '若愚[RUOYU]';
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
var mousePOS = { x: 0, y: 0 },
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
var AREA = 1428000, //1700*840
  FPS = 60,
  PI = Math.PI,
  SPEED = 15, //屏幕速度，结合PFS
  ZERO = 0.01,
  WidthRatio = 1,
  HeightRatio = 1,
  AreaRatio = 1,
  count = 20,
  size = 24,
  size_ratio = 2,
  speed = SPEED / FPS,
  speed_ratio = 2,
  force = 30,
  acc = 1, //加速系数
  dec = 0.975, //阻力系数
  angle = NaN,
  len1 = 300, //光标范围
  len2 = 200, //球体范围
  broad_wid = 1, //宽线
  narrow_wid = 0.5; //细线
