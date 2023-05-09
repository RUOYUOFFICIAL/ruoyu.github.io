/**
 *
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns [min,max)上随机量
 */
function rand(min, max) {
  return min + (max - min) * Math.random();
}
/**
 *
 * @param {*} base
 * @param {number} i
 * @returns 随机坐标
 */
function randCoord(base, i) {
  return;
}
/**
 *
 * @param {number} val 基础量
 * @param {number} min 最小系数
 * @param {number} max 最大系数
 * @returns val*[min,max)倍的随机系数
 */
function randVal(val, min, max) {
  return val * rand(min, max);
}
/**
 *
 * @returns 随机大小
 */
function randSize() {
  return randVal(size, 1, size_ratio);
}
/**
 *
 * @returns 随机速度
 */
function randSpeed() {
  return randVal(speed, 1, speed_ratio);
}
/**
 *
 * @returns 随机角度
 */
function randAngle() {
  return randVal(PI, 0, 2);
}
/**
 *
 * @returns 蓝色系随机颜色
 */
function randIndigo() {
  //蓝紫色系列
  return `rgb(${rand(15, 45)},${rand(105, 150)},${rand(150, 180)})`;
}
/**
 *
 * @param {number} n 基础数
 * @returns n平方
 */
function sqr(n) {
  return n ** 2;
}
/**
 *
 * @param {number} n1 数1
 * @param {number} n2 数2
 * @returns n1和n2的平方和
 */
function sqr2(n1, n2) {
  return sqr(n1) + sqr(n2);
}
/**
 *
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns p1和p2的距离平方
 */
function sqr2p(p1, p2) {
  return sqr2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *
 * @param {number} n 基础数
 * @returns n的平方根
 */
function sqrt(n) {
  return Math.sqrt(n);
}
/**
 *
 * @param {number} n1 数1
 * @param {number} n2 数2
 * @returns n1和n2平方和的平方根根
 */
function sqrt2(n1, n2) {
  return sqrt(sqr2(n1, n2));
}
/**
 *
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns p1和p2的距离
 */
function sqrt2p(p1, p2) {
  return sqrt2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *
 * @param {number} n 基础数
 * @returns n的绝对值
 */
function abs(n) {
  return Math.abs(n);
}
/**
 *
 * @param {number} n1 数1
 * @param {number} n2 数2
 * @returns n2对n1的绝对差
 */
function abs2(n1, n2) {
  return abs(n2 - n1);
}
//三角函数系统是按顺时针解析，原因是屏幕的y轴向下
/**
 *
 * @param {number} theta 基础角
 * @returns sin(theta)
 */
function sin(theta) {
  return Math.sin(theta);
}
/**
 *
 * @param {number} y y坐标
 * @param {number} x x坐标
 * @returns 坐标(x,y)相对(0,0)角的sin值
 */
function sin2(y, x) {
  return y / sqrt2(y, x);
}
/**
 *
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns 点2对点1角的sin值
 */
function sin2p(p1, p2) {
  return sin2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *
 * @param {number} theta 基础角
 * @returns cos(theta)
 */
function cos(theta) {
  return Math.cos(theta);
}
/**
 *
 * @param {*} y y坐标
 * @param {*} x x坐标
 * @returns 坐标(x,y)相对(0,0)角的cos值
 */
function cos2(y, x) {
  return x / sqrt2(y, x);
}
/**
 *
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns 点2对点1角的cos值
 */
function cos2p(p1, p2) {
  return cos2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *
 * @param {number} theta 基础角
 * @returns tan(theta)
 */
function tan(theta) {
  return Math.tan(theta);
}
/**
 *
 * @param {*} y y坐标
 * @param {*} x x坐标
 * @returns 坐标(x,y)相对(0,0)角的tan值
 */
function tan2(y, x) {
  return y / x;
}
/**
 *
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns 点2对点1角的tan值
 */
function tan2p(p1, p2) {
  return tan2(p2.y - p1.y, p2.x - p1.x);
}
/**
 *
 * @param {number} n 正切值
 * @returns arctan(n)
 */
function atan(n) {
  return Math.atan(n);
}
/**
 *
 * @param {number} y y坐标
 * @param {number} x x坐标
 * @returns 坐标(x,y)相对x轴的角度
 */
function atan2(y, x) {
  return Math.atan2(y, x);
}
/**
 *
 * @param {*} p1 点1
 * @param {*} p2 点2
 * @returns 点2相对点1与x轴的夹角
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

//跳转
function _2URL(url) {
  top.location.href = url;
}
//延时跳转
function Dlay2URL(url, time) {
  setTimeout(`top.location.href = ${url}`, time);
}
