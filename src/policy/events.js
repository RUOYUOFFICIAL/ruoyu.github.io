// 从简原则
// 为了减小计算机各部门的工作负担，各事件内部执行代码应尽可能少
// 通常，只涉及信号量值变换，其他工作例如渲染、大量计算则放在主体代码中执行

//键盘事件
//按键
document.body.style.zoom = 'reset';
window.onkeydown = ev => {
  //callee针对firefox
  var e = ev || window.event || arguments.callee.caller.arguments[0],
    ec = e.code, //code备用
    ek = e.key;
  if (DEBUG && deb_key) console.log('K_DOWN:', ek);

  //按键检测
  switch (ek) {
    case 'w':
      key_S = false;
      key_W = true;
      break;
    case 's':
      key_W = false;
      key_S = true;
      break;
    case 'a':
      key_D = false;
      key_A = true;
      break;
    case 'd':
      key_A = false;
      key_D = true;
      break;
    case ' ':
      key_Space = true;
      break;
    case '`':
      key_CONSOLE = !key_CONSOLE;
      break;
    case '-':
    case '_':
    case '=':
    case '+':
      //阻止页面放缩
      if (e.ctrlKey || e.metaKey) e.preventDefault();
      break;
    default:
      break;
  }
};

//弹键
window.onkeyup = ev => {
  //callee针对firefox
  var e = ev || window.event || arguments.callee.caller.arguments[0],
    ec = e.code, //code备用
    ek = e.key;
  if (DEBUG && deb_key) console.log('K_UP:', ek);
  switch (ek) {
    case 'w':
      key_W = false;
      break;
    case 's':
      key_S = false;
      break;
    case 'a':
      key_A = false;
      break;
    case 'd':
      key_D = false;
      break;
    case ' ':
      key_Space = false;
      break;
    case '`':
      key_CONSOLE = false;
      break;
    default:
      break;
  }
};

//窗口事件
//尺寸变化
window.onresize = () => {
  if (DEBUG && deb_cmd) console.log('resize:', CTX.width, CTX.height);
  //窗口等比放缩
  reBALLs();
  //重置绘画配置，窗口尺寸瞬间改变可能导致尺寸未及时同步
  GLXInit(HEADER.scrollWidth, HEADER.scrollHeight);
};

//禁用事件
/*
[小白鸥]关于js禁止浏览器缩放
https://www.cnblogs.com/xiaobaiou/p/10731062.html
*/
//chrome 禁止ctrl+滚轮
window.addEventListener(
  'mousewheel',
  ev => {
    var e = ev;
    if (DEBUG && deb_mouse) console.log(e);
    if (e.ctrlKey === true || e.metaKey) e.preventDefault();
  },
  false
);

//firefox禁止ctrl+滚轮
window.addEventListener(
  'DOMMouseScroll',
  ev => {
    var e = ev;
    if (e.ctrlKey === true || e.metaKey) e.preventDefault();
  },
  false
);

//仅限canvas 的鼠标事件
//移入|移动事件
GLX.onmouseenter = GLX.onmousemove = ev => {
  mouseFOCUS = true;
  var e = ev;
  if (DEBUG && deb_mouse)
    console.log('M_ENTER|MOVE:(', e.offsetX, ',', e.offsetY, ')');
  mousePOS.x = e.offsetX;
  mousePOS.y = e.offsetY;
};
//离开事件
GLX.onmouseleave = () => {
  if (DEBUG && deb_mouse) console.log('M_LEAVE');
  mouseFOCUS = false;
  mouse_Left = false;
  mouse_Mid = false;
  mouse_Right = false;
};
//按键事件
GLX.onmousedown = ev => {
  var e = ev,
    eb = e.button;
  if (DEBUG && deb_mouse) console.log('M_DOWN:', eb);
  switch (eb) {
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
      break;
  }
};
//弹键事件
GLX.onmouseup = ev => {
  var e = ev,
    eb = e.button;
  if (DEBUG && deb_mouse) console.log('M_UP:', eb);
  switch (eb) {
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
      break;
  }
};

//自定义事件
//sticky
window.onscroll = ev => {
  var e = ev;
  // console.log(e);
  if (document.documentElement.scrollTop < HEADER.scrollHeight) {
    galaxy.style.display = 'block';
    core.style.display = 'block';
    indexbar.style.opacity = 'var(--high-opa)';
  } else {
    galaxy.style.display = 'none';
    core.style.display = 'none';
    indexbar.style.opacity = 'var(--low-opa)';
  }
};
// window.addEventListener('scroll', () => {
//   // onBGIPlot();
// });
