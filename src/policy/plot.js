//加载完毕
console.log(4, 'plot ok');

/**
 * 画布初始化
 * @param {number} width 宽
 * @param {number} height 高
 */
function GLXInit(width, height) {
  GLX.width = width;
  GLX.height = height;
  CTX.width = width;
  CTX.height = height;
  CTX.textAlign = 'center';
  CTX.font = `${size * 0.75}px sans-serif`;
}
/**
 * 绘制初始化，包括一些宽高相关的常量
 * @param {number} width 宽
 * @param {number} height 高
 */
function Init(width, height) {
  ratio_w = width / WIDTH;
  ratio_h = height / HEIGHT;
  len_short *= ZoomRatio('line');
  len_long = len_short * ratio_mid;
  size *= ZoomRatio('ball');
  GLXInit(width, height);
  // console.log(GLX.scrollHeight, GLX.scrollWidth, len_long);
  // console.log(width, height);
}

//窗口尺寸改变，重绘粒子
function reBALLs() {
  var curWidth = HEADER.scrollWidth,
    curHeight = HEADER.scrollHeight,
    preWidth = CTX.width,
    preHeight = CTX.height;
  ratio_w = curWidth / preWidth;
  ratio_h = curHeight / preHeight;
  var ratio_area = ZoomRatio('area');
  len_short *= ratio_area; //   ZoomRatio('line');
  len_long = len_short * ratio_mid;
  for (let i = 0; i < count; i++) {
    BALLs[i].r *= ratio_area;
    BALLs[i].x *= ratio_w;
    BALLs[i].y *= ratio_h;
  }
  // console.log(curHeight, curWidth, len_long);
  //注意，上面各个尺寸放缩后，CTX的大小必须重新设置，结合run.js中的window.onresize事件查看
  // CTX.width = curWidth;
  // CTX.height = curHeight;
}

//绘制背景层
function onBGIPlot() {
  //利用角度变化近似鼠标的移动行为，因为人为移动鼠标不可能总使得角度不变
  var tmp_angle = atan2(mousePOS.x, mousePOS.y);
  if (mouseFOCUS && tmp_angle !== ANGLE) {
    ratio_x = (100 * mousePOS.x) / HEADER.scrollWidth;
    ratio_y = (100 * (mousePOS.y + scrollTop)) / HEADER.scrollHeight;
    //console.log("replot at " + ratio_x + "/" + ratio_y);
    //背景光
    HEADER.style.setProperty(
      'background-image',
      `radial-gradient(circle at ${ratio_x}% ${ratio_y}%, lightcyan 0, skyblue 50%)`
    );
    let rect = core.getBoundingClientRect(),
      rx = rect.left + rect.width / 2,
      ry = rect.top + rect.height / 2,
      cpos = { x: rx, y: ry },
      ratio_m2c_former = -sqrt2p(cpos, mousePOS) / 10; //分母影响距离光因子，分母越大，作用距离越远
    //核心光
    core.style.setProperty(
      'background-image',
      `linear-gradient(${
        (atan2p(cpos, mousePOS) / PI) * 180 - 90
      }deg, var(--core-sd-c) ${ratio_m2c_former}%, var(--core-bgc) ${
        100 + ratio_m2c_former
      }%)`
    );
    // 记录当前角度以便下次对比
    ANGLE = tmp_angle;
  }
}

//绘制球体层
function onBallPlot() {
  for (let i = count - 1; -1 < i; i--) {
    if (BALLs[i].show) {
      var b1 = BALLs[i];
      //先画球
      b1.plot();
      b1.move();
      //再画球与鼠标的连线
      if (mouseFOCUS && sqr(len_long) >= sqr2p(b1, mousePOS)) {
        CTX.beginPath();
        CTX.strokeStyle = 'black';
        if (mouse_Left) {
          CTX.lineWidth = width_broad;
          CTX.strokeStyle = 'orangered';
        }
        CTX.moveTo(mousePOS.x, mousePOS.y);
        CTX.lineTo(b1.x, b1.y);
        CTX.stroke();
      }
      //最后画球与球的连线
      CTX.beginPath();
      CTX.lineWidth = width_narrow;
      CTX.strokeStyle = 'snow';
      for (let j = i - 1; i != j && -1 < j; j--) {
        var b2 = BALLs[j];
        if (sqr(len_short) >= sqr2p(b1, b2)) {
          CTX.moveTo(b1.x, b1.y);
          CTX.lineTo(b2.x, b2.y);
        }
      }
      CTX.stroke();
    }
  }
}

//绘制关键帧，由底层到顶层绘制
function FRAME() {
  //清除旧帧
  CTX.clearRect(0, 0, CTX.width, CTX.height);
  //绘制新帧
  //背景层
  onBGIPlot();
  //球体层
  onBallPlot();
}

//首次初始化
Init(HEADER.scrollWidth, HEADER.scrollHeight);
if (DEBUG && deb_cmd) console.log('size:', CTX.width, CTX.height);
//创建粒子
for (let i = 0; i < count; i++)
  BALLs.push(
    new Ball(
      i,
      '!me',
      randType('size'),
      randType('x'),
      randType('y'),
      randType('angle'),
      randType('speed'),
      randType('indigo')
    )
  );

//形成动画
let ANIMATION = (timestamp, elapsed) => {
  //锁帧
  if (elapsed > 1000 / FPS) {
    //TO DO SOMETHING
    FRAME();
    elapsed = 0;
  }
  window.requestAnimationFrame(_timestamp =>
    ANIMATION(_timestamp, elapsed + _timestamp - timestamp)
  );
};
// console.log(CONFIG);

//回调动画
window.requestAnimationFrame(timestamp => ANIMATION(timestamp, 0));
