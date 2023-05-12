//计算或数学类
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
  let ret;
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

//平滑滚动
function smoothScrollTo(targetPosition, duration) {
  let startPosition = window.pageYOffset,
    distance = targetPosition - startPosition,
    startTime = null;

  function scrollAnimation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }

    let elapsed = currentTime - startTime,
      ease = Math.easeInOut(elapsed, duration),
      scrollPosition = startPosition + distance * ease;
    window.scrollTo(0, scrollPosition);

    if (elapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  Math.easeInOut = function (t, duration) {
    t /= duration / 2;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
  };

  requestAnimationFrame(scrollAnimation);
}

// 保存原始的 split 方法
const originalSplit = String.prototype.split;
// 重写 split 方法
String.prototype.split = function (separator, limit) {
  // 调用原始的 split 方法
  const result = originalSplit.call(this, separator, limit);
  // 过滤掉空字符
  return result.filter(item => item !== '');
};

function setBGI(id, fname) {
  // console.log(fname, assets[0].fname);
  let obj = assets.find(item => item.fname === fname);
  // console.log(obj);
  let url = `url(\'${obj.path}\')`;
  // console.log(obj);
  id.style.backgroundImage = url;
}

//CMD库，所有命令函数将以$开头命名
/**
 * 执行指令
 * @param {string} text 指令
 */
function TryCMD(text) {
  if (!text) return; //空文本直接返回
  //模式不相关
  let len = text.length,
    suffixText = text.substring(len - 2, len);
  switch (suffixText) {
    case '`c': //相当于clear
      $c(); //清空后，下文不再生效，返回
      return;
    case '``': //相当于esc
      search_ipt.value = text.substring(0, len - 2);
      text = search_ipt.value; //及时更新文本
      $esc(); //失焦后，下文不需要生效，返回
      return;
  }
  // console.log(2, text);
  //模式相关
  if (deb_cmd) {
    //指令模式，严格匹配
    let ctem = CONFIG.CSet.find(item => item.key.includes(text)) || null;
    if (!ctem) {
      switch (text) {
        case 'cmd':
          console.log('cmd pattern already on');
          $c();
          break;
        default:
          console.log(`invalid command: ${text}`);
          break;
      }
    } else {
      window[`\$${ctem.key[0]}`]();
      $c();
    }
  } else {
    //非指令模式，宽松匹配
    switch (text.toLowerCase()) {
      case 'cmd':
        $cmd();
        $c();
        break;
      default: //保留其他
        break;
    }
  }
}
//根据指令名生成含义（区分大小写）
/**
 * 开启指令模式
 */
function $cmd() {
  deb_cmd = true;
  setBGI(search_btn, 'cmd.svg');
  search_btn.style.cursor = 'default';
  search_ipt.placeholder = '<';
  // console.log(deb_cmd);
}
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
  let ver = `version: ${CONFIG.version}`;
  console.log(ver);
  return ver;
}
/**
 * 获取帮助
 * @returns 帮助文本
 */
function $h() {
  let keys = Object.keys(CONFIG.CSet[0]),
    len1 = 12,
    len2 = 25,
    gapText = '| ',
    tableText = `${keys[0].toUpperCase().padEnd(len1)}${gapText}${keys[1]
      .toUpperCase()
      .padEnd(len2)}\n`,
    tableWidth = tableText.length,
    rowText = '';
  tableText += '—'.repeat(tableWidth) + '\n';
  CONFIG.CSet.forEach(item => {
    rowText = `${item.key.toString().padEnd(len1)}${gapText}${item.info.padEnd(
      len2
    )}\n`;
    tableText += rowText;
  });
  console.log(tableText);
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
  smoothScrollTo(0, duration);
}
/**
 * 滑动至底部
 */
function $btm() {
  smoothScrollTo(document.body.clientHeight - window.innerHeight, duration);
}
/**
 * 输入框退焦
 */
function $esc() {
  search_ipt.blur();
}
/**
 * 清空输入文本
 */
function $c() {
  search_ipt.value = '';
}
/**
 * 启动游戏
 */
function $g() {}
