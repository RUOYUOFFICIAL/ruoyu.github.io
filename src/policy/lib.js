//加载完毕
console.log(2, 'lib ok');

//计算或数学类

/**
 * 获取最小值
 * @param  {...number} values 多个值
 * @returns 最小值
 */
function min(...values) {
  return Math.min(...values);
}
/**
 * 获取最大值
 * @param  {...any} values 多个值
 * @returns 最大值
 */
function max(...values) {
  return Math.max(...values);
}

/**
 * 取底
 * @param {number} n
 * @returns floor of n
 */
function floor(n) {
  return Math.floor(n);
}

/**
 * 去顶
 * @param {number} n
 * @returns ceil of n
 */
function ceil(n) {
  return Math.ceil(n);
}

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
  let ret = '';
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
  let t = a;
  a = b;
  b = t;
}

//功能类
/**
 *路由转url
 * @param {string} route
 * @param {boolean} delay
 * @returns 路由对应的URL
 */
// function route2url(route, delay) {
//   let path = './src/route/';
//   if (delay) return `\'${path}${route}\'`;
//   else return path + route;
// }
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
  _2URL(getPath('page', route));
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
  Dlay2URL(getPath('page', route), time);
}

/**
 * 获取放缩系数
 * @param {string} type
 * @returns 对应类型的放缩系数
 */
function ZoomRatio(type) {
  let ret;
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

/**
 * 带时限的平滑滚动
 * @param {number} targetPosition 目标位置
 * @param {number} duration 滚动时间
 */
function smoothScrollTo(targetPosition, duration) {
  if (!wheel_Scrolling) {
    wheel_Scrolling = true;
    _smoothScrollTo(targetPosition, duration);
  }
}
/**
 * 平滑滚动
 * @param {number} targetPosition 目标位置
 * @param {number} duration 滚动时间
 */
function _smoothScrollTo(targetPosition, duration) {
  let startPosition = window.pageYOffset,
    distance = targetPosition - startPosition,
    startTime = null;

  function scrollAnimation(currentTime) {
    if (!startTime) startTime = currentTime;

    let elapsed = currentTime - startTime,
      ease = Math.easeInOut(elapsed, duration),
      scrollPosition = startPosition + distance * ease;
    window.scrollTo(0, scrollPosition);

    if (elapsed <= duration) {
      requestAnimationFrame(scrollAnimation);
    } else wheel_Scrolling = false;
  }
  //过渡曲线
  Math.easeInOut = (t, duration) => {
    t /= duration / 2;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
  };

  requestAnimationFrame(scrollAnimation);
}

//核心过渡曲线
function coreTop() {
  return scrollTop <= base_height
    ? scrollTop * 0.75
    : scrollTop - base_height * 0.25;
}
//纵轴角标
function indexUpdate(delta) {
  //基量不准，增加ZERO辅助计算
  if (delta < 0) curIndex = ceil(max(0, --curIndex) - ZERO);
  else curIndex = floor(min(base_count - 1, ++curIndex) + ZERO);
}

// 保存原始的 split 方法
const originalSplit = String.prototype.split;
/**
 * 重写字符串split 方法，去除空字符
 * @param {string|RegExp} separator 分隔符
 * @param {*} limit 限制数量
 * @returns 分割后的若干子串
 */
String.prototype.split = function (separator, limit) {
  // 调用原始的 split 方法
  if (this.indexOf(separator) === -1) return [];
  const result = originalSplit.call(this, separator, limit);
  // 过滤掉空字符
  return result.filter(item => item !== '');
};

/**
 * 设置背景图
 * @param {string} id 元素id
 * @param {string} fname 图片全名（包含后缀)
 */
function setBGI(id, fname) {
  // console.log(fname, assets[0].fname);
  let obj = assets.find(item => item.fname === fname);
  // console.log(obj);
  let url = `url(\'${obj.path}\')`;
  // console.log(obj);
  id.style.backgroundImage = url;
}

/**
 * 执行单一指令
 * @param {string} text 指令
 */
function TryEXE(text) {
  if (!text) return ''; //空文本直接返回
  REQUEST.add(text);
  let tmp,
    ret = typeEXE('Base', text);
  if (ret !== 'Base') return $dt('t') + ret;
  else ret = '';
  if (!deb_cmd) {
    tmp = typeEXE('!CMD', text);
    if (tmp === '!CMD') tmp = 'normal text: ' + text;
  } else {
    tmp = typeEXE('CMD', text);
    if (tmp === 'CMD') tmp = 'invalid command: ' + text;
  }
  ret += tmp;
  // console.log('tag', ret);
  return $dt('t') + ret;
}

//按类型执行
function typeEXE(type, text) {
  let set = CONFIG.KEYSET[type],
    tag = set.tag,
    gap = set.prefix;
  switch (type) {
    case 'Base':
    case '!CMD':
      let sptext = text.split(gap);
      text = sptext.pop() || '';
      if (type === 'Base' && ['e', 'esc', 'escape'].includes(text))
        search_ipt.value = sptext.toString().replaceAll(',', gap);
      break;
    case 'CMD':
      break;
  }
  let ktem =
    set.keys.find(item => item.key.includes(text.toLowerCase())) || null;
  if (!ktem) return type;
  // console.log(text);
  if (type != 'Base') _c();
  let ret = window[`${tag}${ktem.key[0]}`]();
  // console.log(ktem.info[1] || ret);
  return ktem.info[1] || ret;
}

//-----------------非指令模式、普通模式
//普通执行函数库，均以_开头命名
/**
 * 开启指令模式
 */
function cmd() {
  if (deb_cmd) return;
  deb_cmd = true;
  setBGI(search_btn, 'cmd.svg');
  search_btn.style.cursor = 'default';
  search_ipt.placeholder = '<';
  _c();
  // console.log(deb_cmd);
}
/**
 * 清空输入文本
 */
function _c() {
  search_ipt.value = '';
}
/**
 * 输入框退焦
 */
function _e() {
  //失焦必须挂钩keyup事件
  search_ipt.blur();
}

//------------------------指令模式
//CMD执行函数库，均以$开头命名
//根据指令名生成含义（区分大小写）

/**
 * 关闭指令模式
 */
var $e = ($q = () => {
  deb_cmd = false;
  setBGI(search_btn, 'search.svg');
  search_btn.style.cursor = 'pointer';
  search_ipt.placeholder = '?';
  // console.log(deb_cmd);
});
/**
 * 查看版本
 * @returns 版本号
 */
function $v() {
  let ver = `version: ${CONFIG.VERSION}`;
  // console.log(ver);
  return ver;
}
/**
 * 获取帮助
 * @returns 帮助文本
 */
function $h() {
  let keys = CONFIG.KEYSET['CMD'].keys,
    subkeys = Object.keys(keys[0]),
    gapText = '| ',
    len1 = 15,
    len2 = 25 - gapText.length,
    tableText = `\n${subkeys[0]
      .toUpperCase()
      .padEnd(len1)}${gapText}${subkeys[1].toUpperCase().padEnd(len2)}\n`,
    rowText = '';
  tableText += '—'.repeat(tableText.length) + '\n';
  keys.forEach(item => {
    rowText = `${item.key
      .toString()
      .padEnd(len1)}${gapText}${item.info[0].padEnd(len2)}\n`;
    tableText += rowText;
  });
  // console.log(tableText);
  return tableText;
}
/**
 * 刷新页面
 */
function $rf() {
  location.reload();
}
/**
 * 重载资源
 */
function $rl() {}
/**
 * 滑动至顶部
 */
function $top() {
  smoothScrollTo(bases[0].offsetTop, duration);
}
/**
 * 滑动至底部
 */
function $btm() {
  smoothScrollTo(bases[base_count - 1].offsetTop, duration);
}
/**
 * 清空输入历史
 */
function $cls() {
  HISTORY = [];
}
/**
 * 启动游戏
 */
function $g() {}

/**
 * 按照类型获取时间
 * @param {string|undefined} type 时间格式
 */
function $dt(type) {
  let tmpdate,
    date = new Date();
  switch (type) {
    case 't':
      tmpdate = date.toLocaleTimeString();
      break;
    default:
      tmpdate = date.toLocaleDateString();
      break;
  }
  return tmpdate + '  ';
}
