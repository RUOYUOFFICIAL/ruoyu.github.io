function GLXInit(width, height) {
  GLX.width = width;
  GLX.height = height;
  CTX.width = width;
  CTX.height = height;
  CTX.textAlign = 'center';
  CTX.font = `${size * 0.75}px sans-serif`;
}
// console.log(CTX.font);
GLXInit(HEADER.scrollWidth, HEADER.scrollHeight);
// galaxy.width = baseWidth;
// galaxy.height = baseHeight;
// galaxy.style.position = 'fixed';
// galaxyCtx.lineWidth = 0.3;

//存储所有粒子
var BALLs = [];
//入栈若干粒子
for (let i = 0; i < count; i++)
  BALLs.push(
    new Ball(i, '!me', randSize(), randSpeed(), randAngle(), randColor())
  );

//关键帧动画
function FRAME() {
  //清除上一帧画布内容
  CTX.clearRect(0, 0, CTX.width, CTX.height);
  //绘制当前帧内容
  //利用角度变化近似鼠标的移动行为，因为人为移动鼠标不可能总使得角度不变
  var tmp_angle = atan2(mousePos.x, mousePos.y);
  if (mouseFOCUS && tmp_angle != angle) {
    var xrate = (100 * mousePos.x) / HEADER.scrollWidth,
      yrate =
        (100 * (mousePos.y + document.documentElement.scrollTop)) /
        HEADER.scrollHeight;
    HEADER.style.setProperty(
      'background-image',
      `radial-gradient(circle at ${xrate}% ${yrate}%, #cff 0, #9cf 50%)`
    );
    if (DEBUG && deb_mouse) {
      var rect = core.getBoundingClientRect(),
        rx = rect.left + rect.width / 2,
        ry = rect.top + rect.height / 2;
      core.style.setProperty(
        'background-image',
        `linear-gradient(${
          (atan2(mousePos.y - ry, mousePos.x - rx) * 180) / PI - 90
        }deg, #9AF 30%, #369 90%)`
      );
    }
    // console.log(core.style);
    angle = tmp_angle;
    //console.log("replot at " + xrate + "/" + yrate);
  }
  //绘制小球之间、球与鼠标之间画线
  for (let i = count - 1; -1 < i; i--) {
    if (BALLs[i].show) {
      var b1 = BALLs[i];
      b1.plot();
      b1.move();
      CTX.lineWidth = 0.7;
      if (mouseFOCUS && 90000 >= sqr2p(b1, mousePos)) {
        CTX.beginPath();
        CTX.strokeStyle = 'black';
        CTX.moveTo(mousePos.x, mousePos.y);
        CTX.lineTo(b1.x, b1.y);
        CTX.stroke();
      }
      CTX.beginPath();
      for (let j = i - 1; i != j && -1 < j; j--) {
        var b2 = BALLs[j];
        if (40000 >= sqr2p(b1, b2)) {
          CTX.moveTo(b1.x, b1.y);
          CTX.lineTo(b2.x, b2.y);
        }
      }
      CTX.strokeStyle = 'white';
      CTX.stroke();
    }
  }
  //   for (let i = count - 1; -1 < i; i--) {
  //     BALLs[i].plot();
  //     BALLs[i].move();
  //     //鼠标、小球间画线，并预期模拟排斥效果
  //     if (gfocus && 62500 >= sqr(BALLs[i].x, mouseX, BALLs[i].y, mouseY)) {
  //       galaxyCtx.beginPath();
  //       galaxyCtx.moveTo(mouseX, mouseY);
  //       galaxyCtx.lineTo(BALLs[i].x, BALLs[i].y);
  //       galaxyCtx.strokeStyle = 'black';
  //       galaxyCtx.stroke();
  //     }
  //     //考虑采用全局的lineWidth=0.3替代globalAlpha的反复改变，均可达到弱化线条视觉效果的目的
  //     //以此为界线，前画鼠标线，后画粒子线，属性不能混淆
  //     //深度2循环，beginPath和stroke放在循环外以减小开销
  //     galaxyCtx.beginPath();
  //     for (let j = count - 1; i != j && -1 < j; j--) {
  //       //减小比较值会使小球间平均画线量减少从而减小绘制开销
  //       if (10000 >= sqr(BALLs[i].x, BALLs[j].x, BALLs[i].y, BALLs[j].y)) {
  //         galaxyCtx.moveTo(BALLs[i].x, BALLs[i].y);
  //         galaxyCtx.lineTo(BALLs[j].x, BALLs[j].y);
  //       }
  //     }
  //     galaxyCtx.strokeStyle = 'white';
  //     galaxyCtx.stroke();
  //   }
  // }
}
//将关键帧绘制动作集中于主函数
let ANIMATION = (timestamp, elapsed) => {
  //锁帧
  if (elapsed > 1000 / FPS) {
    //TO DO SOMETHING
    FRAME();
    elapsed = 0;
  }

  window.requestAnimationFrame((_timestamp) =>
    ANIMATION(_timestamp, elapsed + _timestamp - timestamp)
  );
};
//窗口尺寸改变重绘粒子
function reBALLs(preWidth, curWidth, preHeight, curHeight) {
  var widthRatio = curWidth / preWidth,
    heightRatio = curHeight / preHeight,
    areaRatio = widthRatio * heightRatio;
  for (let i = 0; i < count; i++) {
    BALLs[i].r *= areaRatio;
    BALLs[i].x *= widthRatio;
    BALLs[i].y *= heightRatio;
  }
}
