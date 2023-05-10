/**
 * 获取随机数
 * @param {number} val 基础量
 * @param {number} min 最小系数
 * @param {number} max 最大系数
 * @returns val*[min,max)
 */
function rand(val, min, max) {
  return val * (min + (max - min) * Math.random());
}

/**
 * 随机类
 * @param {string} type 类型
 * @returns 返回对应随机类型
 */
function randType(type) {
  var ret;
  switch (type) {
    case 'size': //随机大小
      ret = rand(size, ratio_equal, ratio_double);
      break;
    case 'x': //随机横坐标
      ret = rand(size, ratio_double, CTX.width / size - ratio_double);
      break;
    case 'y': //随机纵坐标
      ret = rand(size, ratio_double, CTX.height / size - ratio_double);
      break;
    case 'angle': //随机角度
      ret = rand(PI, 0, 2);
      break;
    case 'speed': //随机速度
      ret = rand(speed, ratio_equal, ratio_double);
      break;
    case 'indigo': //靛蓝色系
      ret = `rgb(${rand(16, 1, 3)},${rand(16, 7, 10)},${rand(16, 9, 12)})`;
      break;
  }
  // console.log(type, ret);
  return ret;
}

/**
 *n平方
 * @param {number} n 基础数
 * @returns n^2
 */
function sqr(n) {
  return n ** 2;
}
/**
 *n1和n2的平方和
 * @param {number} n1 数1
 * @param {number} n2 数2
 * @returns n1^2+n2^2
 */
function sqr2(n1, n2) {
  return sqr(n1) + sqr(n2);
}
/**
 *p1和p2的距离平方
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns sqr2(p2.y - p1.y, p2.x - p1.x)
 */
function sqr2p(p1, p2) {
  return sqr2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *n的平方根
 * @param {number} n 基础数
 * @returns n平方根
 */
function sqrt(n) {
  return Math.sqrt(n);
}
/**
 *n1和n2平方和的平方根
 * @param {number} n1 数1
 * @param {number} n2 数2
 * @returns sqrt(sqr2(n1, n2))
 */
function sqrt2(n1, n2) {
  return sqrt(sqr2(n1, n2));
}
/**
 *p1和p2的距离
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns sqrt2(p2.y - p1.y, p2.x - p1.x)
 */
function sqrt2p(p1, p2) {
  return sqrt2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *n的绝对值
 * @param {number} n 基础数
 * @returns |n|
 */
function abs(n) {
  return Math.abs(n);
}
/**
 *n2对n1的绝对差
 * @param {number} n1 数1
 * @param {number} n2 数2
 * @returns |n1-n2|
 */
function abs2(n1, n2) {
  return abs(n2 - n1);
}
//三角函数系统是按顺时针解析，原因是屏幕的y轴向下
/**
 *正弦值
 * @param {number} theta 基础角
 * @returns sin(theta)
 */
function sin(theta) {
  return Math.sin(theta);
}
/**
 *坐标(x,y)相对(0,0)角的sin值
 * @param {number} y y坐标
 * @param {number} x x坐标
 * @returns y / sqrt2(y, x)
 */
function sin2(y, x) {
  return y / sqrt2(y, x);
}
/**
 *点2对点1角的sin值
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns sin2(p2.y - p1.y, p2.x - p1.x)
 */
function sin2p(p1, p2) {
  return sin2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *余弦值
 * @param {number} theta 基础角
 * @returns cos(theta)
 */
function cos(theta) {
  return Math.cos(theta);
}
/**
 *坐标(x,y)相对(0,0)角的cos值
 * @param {*} y y坐标
 * @param {*} x x坐标
 * @returns x / sqrt2(y, x)
 */
function cos2(y, x) {
  return x / sqrt2(y, x);
}
/**
 *点2对点1角的cos值
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns cos2(p2.y - p1.y, p2.x - p1.x)
 */
function cos2p(p1, p2) {
  return cos2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *正切值
 * @param {number} theta 基础角
 * @returns tan(theta)
 */
function tan(theta) {
  return Math.tan(theta);
}
/**
 *坐标(x,y)相对(0,0)角的tan值
 * @param {*} y y坐标
 * @param {*} x x坐标
 * @returns y / x
 */
function tan2(y, x) {
  return y / x;
}
/**
 *点2对点1角的tan值
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns tan2(p2.y - p1.y, p2.x - p1.x)
 */
function tan2p(p1, p2) {
  return tan2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *正切角
 * @param {number} n 正切值
 * @returns arctan(n)
 */
function atan(n) {
  return Math.atan(n);
}
/**
 *坐标(x,y)相对x轴的角度
 * @param {number} y y坐标
 * @param {number} x x坐标
 * @returns arctan(y/x)
 */
function atan2(y, x) {
  return Math.atan2(y, x);
}
/**
 *点2相对点1与x轴的夹角
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns (p2.y - p1.y, p2.x - p1.x)
 */
function atan2p(p1, p2) {
  return atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * 交换a和b
 * @param {*} a 基础量1
 * @param {*} b 基础量2
 */
function swap(a, b) {
  var t = a;
  a = b;
  b = t;
}

/**
 *路由转url
 * @param {string} route
 * @param {boolean} delay
 * @returns 路由对应的URL
 */
function route2url(route, delay) {
  var path = './src/route/';
  if (delay) return `\'${path}${route}\'`;
  else return path + route;
}

/**
 * 跳转至url
 * @param {string} url 路径
 */
function _2URL(url) {
  window.location.href = url;
}

/**
 * 跳转至route
 * @param {string} route 路由
 */
function _2Route(route) {
  _2URL(route2url(route, false));
}

/**
 * 延时跳转至url
 * @param {string} url 跳转路径
 * @param {number} time 时延，单位ms
 */
function Dlay2URL(url, time) {
  setTimeout(`window.location.href = ${url}`, time);
}

/**
 * 延时路由
 * @param {string} route 路由
 * @param {number} time 时延，单位ms
 */
function DlayRoute(route, time) {
  Dlay2URL(route2url(route, true), time);
}

/**
 * 获取放缩系数
 * @param {string} type
 * @returns 对应类型的放缩系数
 */
function ZoomRatio(type) {
  var ret;
  switch (type) {
    case 'w':
      ret = ratio_w;
      break;
    case 'h':
      ret = ratio_h;
      break;
    //由于线条放缩受角度因素影响较大，比较难以拟合，此处简化处理，和面体放缩放在一起
    case 'line':
    case 'area':
    case 'ball':
    case 'circle':
      ret = ratio_w * ratio_h;
      break;
  }
  return ret;
}
