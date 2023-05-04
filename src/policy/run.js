var year = new Date().getFullYear();
ftext.innerHTML = `<b>&copy;${year}  &#64;${AUTHOR}</b>   <i>.Design, .Code</i>`;

window.onresize = () => {
  //窗口等比放缩
  if (DEBUG && deb_cmd) console.log('resize:', CTX.width, CTX.height);
  var curWidth = HEADER.scrollWidth,
    curHeight = HEADER.scrollHeight;
  reBALLs(CTX.width, curWidth, CTX.height, curHeight);
  CTX.width = curWidth;
  CTX.height = curHeight;
  //重置绘画配置，窗口尺寸瞬间改变可能导致尺寸未及时同步
  GLXInit(HEADER.scrollWidth, HEADER.scrollHeight);
};

//回调动画
window.requestAnimationFrame((timestamp) => ANIMATION(timestamp, 0));
