function rand(min, max) {
  return min + (max - min) * Math.random();
}
function randCoord(base, i) {
  return;
}
function randVal(val, min, max) {
  return val * rand(min, max);
}
function randSize() {
  return randVal(size, 1, size_ratio);
}
function randSpeed() {
  return randVal(speed, 1, speed_ratio);
}
function randAngle() {
  return randVal(PI, 0, 2);
}
function randColor() {
  return `rgb(${rand(30, 90)},${rand(30, 90)},${rand(60, 180)})`;
}

function sqr(n) {
  return n ** 2;
}
function sqr2(n1, n2) {
  return sqr(n1) + sqr(n2);
}
function sqr2p(p1, p2) {
  return sqr2(p2.y - p1.y, p2.x - p1.x);
}
function sqrt(n) {
  return Math.sqrt(n);
}
function sqrt2(n1, n2) {
  return sqrt(sqr2(n1, n2));
}
function sqrt2p(p1, p2) {
  return sqrt2(p2.y - p1.y, p2.x - p1.x);
}
function abs(n) {
  return Math.abs(n);
}
function abs2(n1, n2) {
  return abs(n2 - n1);
}
//三角函数系统是按顺时针解析，原因是屏幕的y轴向下
function sin(theta) {
  return Math.sin(theta);
}
function sin2(y, x) {
  return y / sqrt2(y, x);
}
function sin2p(p1, p2) {
  return sin2(p2.y - p1.y, p2.x - p1.x);
}
function cos(theta) {
  return Math.cos(theta);
}
function cos2(y, x) {
  return x / sqrt2(y, x);
}
function cos2p(p1, p2) {
  return cos2(p2.y - p1.y, p2.x - p1.x);
}
function tan(theta) {
  return Math.tan(theta);
}
function tan2(y, x) {
  return y / x;
}
function tan2p(p1, p2) {
  return tan2(p2.y - p1.y, p2.x - p1.x);
}
function atan(n) {
  return Math.atan(n);
}
function atan2(y, x) {
  return Math.atan2(y, x);
}
function atan2p(p1, p2) {
  return atan2(p2.y - p1.y, p2.x - p1.x);
}

function swap(a, b) {
  var t = a;
  a = b;
  b = t;
}
