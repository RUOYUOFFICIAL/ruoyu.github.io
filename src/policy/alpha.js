//加载完毕
console.log(0, 'alpha ok');

//元素注册

/**
 * 根据类型获取元素
 * @param {string} tag
 * @param {string} type
 * @returns
 */
function Elem(tag, type) {
  let elem;
  switch (type) {
    case 'id':
      elem = document.getElementById(tag);
      break;
    case 'class':
      elem = document.getElementsByClassName(tag);
      break;
  }
  return elem || null;
}

const DOCELEM = document.documentElement,
  HEADER = Elem('header', 'id'),
  MAJOR = Elem('major', 'id'),
  FOOTER = Elem('footer', 'id'),
  GLX = Elem('galaxy', 'id'),
  CTX = GLX.getContext('2d'),
  core = Elem('core', 'id'),
  indexbar = Elem('indexbar', 'id'),
  search_btn = Elem('search_btn', 'id'),
  search_ipt = Elem('search_ipt', 'id'),
  ftext = Elem('ftext', 'id'),
  panels = Elem('panel', 'class'),
  pulses = Elem('pulse', 'class'),
  panel_count = panels.length;
// console.log('count', panel_count);

//记录量
var REQUEST = new Set(), //输入请求
  HISTORY = [],
  INDEX = 0,
  SUBIND = 0,
  scrollTop = 0, //滚动条位置（相对顶端）
  scrollHeight = 0,
  base_height = panels[0].scrollHeight;

//事件量
var duration = 333, //过渡时长,单位ms
  sign_cmd = '<',
  sign_ques = '?',
  mousePOS = { x: 0, y: 0 },
  mouseFOCUS = false,
  mouse_Left = false,
  mouse_Mid = false,
  mouse_Right = false,
  scrolling = false,
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
  deb_obj = false, //对象调试
  deb_server = false; //服务器调试

//galaxy常量
var WIDTH = 1703,
  HEIGHT = 841,
  FPS = 50, //帧数
  PI = Math.PI,
  SPEED = 15, //屏幕速度，结合PFS
  ZERO = 0.001,
  ANGLE = NaN, //光标角（相对x轴）
  BALLs = [], //球集;
  ratio_half = 0.5,
  ratio_equal = 1,
  ratio_mid = 1.5,
  ratio_double = 2,
  ratio_x = 0, //光标横坐标比，相对(0,0)
  ratio_y = 0, //光标纵坐标比
  ratio_w = 1, //宽比
  ratio_h = 1, //高比
  count = 20,
  size = 24,
  speed = SPEED / FPS,
  force = 30,
  acc = 1, //加速系数
  dec = 0.975, //阻力系数
  len_short = 180, //球体范围
  len_long = len_short * ratio_mid, //光标范围
  width_narrow = 0.6, //细线
  width_broad = width_narrow * ratio_double; //宽线
