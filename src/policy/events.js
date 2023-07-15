//加载完毕
console.log(1, 'event ok');

// 从简原则
// 为了减小计算机各部门的工作负担，各事件内部执行代码应尽可能少
// 通常，只涉及信号量值变换，其他工作例如渲染、大量计算则放在主体代码中执行

//全局键盘事件
//按键
document.body.style.zoom = 'reset';
window.onkeydown = ev => {
  //callee针对firefox
  const e = ev || window.event || arguments.callee.caller.arguments[0],
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
      if (!ipt_Actived()) e.preventDefault(); //避免页面滚动
      key_Space = true;
      break;
    case '`':
      key_Console = !key_Console;
      break;
    case 'Enter':
      if (!ipt_Actived()) search_ipt.focus();
      else if (!deb_cmd && search_ipt.value === '') search_ipt.blur();
      break;
    case 'Escape':
      if (ipt_Actived()) search_ipt.blur();
      break;
    case '-':
    case '_':
    case '=':
    case '+':
    case 'f':
      //阻止页面放缩以及页面搜索
      if (e.ctrlKey || e.metaKey) e.preventDefault();
      break;
    default:
      break;
  }
};

//弹键
window.onkeyup = ev => {
  //callee针对firefox
  const e = ev || window.event || arguments.callee.caller.arguments[0],
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
      // key_Console = false;
      break;
    default:
      break;
  }
};

//全局窗口事件
//尺寸变化
window.onresize = () => {
  if (DEBUG && deb_cmd) console.log('resize:', CTX.width, CTX.height);
  base_height = panels[0].scrollHeight;
  //窗口等比放缩
  reBALLs();
  //重置绘画配置，窗口尺寸瞬间改变可能导致尺寸未及时同步
  GLXInit(HEADER.scrollWidth, HEADER.scrollHeight);
  //改变窗口后立马画帧，否则会造成画面空缺造成闪屏
  FRAME();
};
//全局滚轮事件
/*
[小白鸥]关于js禁止浏览器缩放
https://www.cnblogs.com/xiaobaiou/p/10731062.html
*/
window.addEventListener(
  'wheel',
  ev => {
    const e = ev,
      delta = e.deltaY;
    if (e.ctrlKey || e.metaKey || delta !== 0) e.preventDefault();
    //暂存非整数，等待下次滚轮取整
    indexUpdate(delta);
    smoothScrollTo(base_height * INDEX, duration);
    // INDEX = round(INDEX);
    // console.log('round', INDEX);
    // INDEX = round(scrollTop / base_height);
    // console.log('goto', INDEX);
  },
  { passive: false }
);

//firefox
// window.addEventListener(
//   'DOMMouseScroll',
//   ev => {
//     if (ev.ctrlKey === true || ev.metaKey) {
//       ev.preventDefault();
//     }
//   },
//   { passive: false }
// );

//sticky
window.onscroll = ev => {
  const e = ev;
  // console.log(e.deltaY);
  scrollTop = window.pageYOffset || DOCELEM.scrollTop;
  scrollHeight = DOCELEM.scrollHeight - DOCELEM.clientHeight;
  //导航栏
  if (ib2Top('top')) {
    if (!ipt_Actived()) indexbar.style.opacity = 'var(--low-opa)';
  } else indexbar.style.opacity = 'var(--high-opa)';
  //核心
  if (ib2Top('head')) {
    [...pulses].forEach(pulse => {
      pulse.style.display = 'block';
    });
  } else {
    [...pulses].forEach(pulse => {
      pulse.style.display = 'none';
    });
  }
  // core.style.width =
  //   core.style.height = `calc(var(--core-r) - var(--core-r)*0.5*${ratio_s})`;
  core.style.top = `calc(40% + ${coreTop()}px)`; //40~110
  // core.style.left = `calc(50% - ${ratio_s * 40}%)`; //50~10
  // core.style.width = core.style.height = `calc(var(--core-r) - ${
  //   scrollTop / 10
  // }px)`;
  // console.log(core.style.top);
};

//组件事件,所有组件事件应当在脚本加载完成后再统一挂载
//否则可能遇到组件不存在、无法访问的问题
// GLX.onmouseenter = GLX.onmousemove = ev => glx_mEnter(ev);
// GLX.onmouseleave = ev => glx_mLeave(ev);
// GLX.onmousedown = ev => glx_mDown(ev);
// GLX.onmouseup = ev => glx_mUp(ev);
// search_ipt.onblur = ev => ipt_Blur(ev);
// search_ipt.onfocus = ev => ipt_Focus(ev);
// search_ipt.onkeydown = ev => ipt_KDown(ev);
// search_ipt.onkeyup = ev => ipt_KUp(ev);
// search_btn.onmousedown = ev => btn_mDown(ev);
// search_btn.onmouseup = ev => btn_mUp(ev);

//画布事件
//仅限canvas 的事件
//移入|移动事件
GLX.onmouseenter = GLX.onmousemove = ev => {
  mouseFOCUS = true;
  const e = ev;
  if (DEBUG && deb_mouse)
    console.log('M_ENTER|MOVE:(', e.offsetX, ',', e.offsetY, ')');
  mousePOS.x = e.offsetX;
  mousePOS.y = e.offsetY;
};
//离开事件
GLX.onmouseleave = ev => {
  if (DEBUG && deb_mouse) console.log('M_LEAVE');
  mouseFOCUS = false;
  mouse_Left = false;
  mouse_Mid = false;
  mouse_Right = false;
};
//按键事件
GLX.onmousedown = ev => {
  const e = ev,
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
  const e = ev,
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

core.onmouseenter = () => {
  core.style.background = '';
};

//获取输入框激活状态
function ipt_Actived() {
  return document.activeElement === search_ipt;
}
//输入框焦点事件
search_ipt.onblur = ev => {
  if (ib2Top('top')) indexbar.style.opacity = 'var(--low-opa)';
};
search_ipt.onfocus = ev => {
  indexbar.style.opacity = 'var(--high-opa)';
};
//输入框按键
search_ipt.onkeydown = ev => {
  const e = ev,
    ek = e.key;
  if (DEBUG && deb_key) console.log('IPT_K_DOWN:', ek);
  switch (ek) {
    case 'Tab':
      e.preventDefault(); //避免失焦
      console.log('→');
      break;
  }
};
search_ipt.onkeyup = ev => {
  const e = ev,
    ek = e.key;
  if (DEBUG && deb_key) console.log('IPT_K_UP:', ek);

  switch (ek) {
    case 'Enter':
      if (ipt_Actived) {
        let ipt_text = TryEXE(search_ipt.value);
        if (ipt_text) HISTORY.push(ipt_text);
        // console.log(HISTORY);
      }
      break;
    case 'ArrowUp':
      console.log('↑');
      break;
    case 'ArrowDown':
      console.log('↓');
      break;

    default:
      break;
  }
};

//按钮点击事件
search_btn.onmousedown = ev => {
  if (deb_cmd) return;
  if (ib2Top('head')) setBGI(search_btn, 'search_active_black.svg');
  else setBGI(search_btn, 'search_active.svg');
};
search_btn.onmouseup = ev => {
  if (!deb_cmd) setBGI(search_btn, 'search.svg');
};

//导航栏位置事件
/**
 * 判断滚动条是否过某位置
 * @param {string} type 标记
 * @returns true或false
 */
function ib2Top(type) {
  let top;
  switch (type) {
    case 'top':
      top = min(base_height / 4, 200);
      break;
    case 'head':
      top = base_height;
      break;
    case 'btm':
      break;
  }
  return scrollTop <= top - 1;
}

//核心事件
