function GLXInit(width, height) {
  GLX.width = width;
  GLX.height = height;
  CTX.width = width;
  CTX.height = height;
  CTX.textAlign = 'center';
  CTX.font = `${size * 0.75}px sans-serif`;
}
function Init(width, height) {
  AreaRatio = (width * height) / AREA;
  len1 *= AreaRatio;
  len2 *= AreaRatio;
  size *= AreaRatio;
  GLXInit(width, height);
}
Init(HEADER.scrollWidth, HEADER.scrollHeight);
// console.log(CTX.font);
//存储所有粒子
var BALLs = [];
//入栈若干粒子
for (let i = 0; i < count; i++)
  BALLs.push(
    new Ball(i, '!me', randSize(), randSpeed(), randAngle(), randIndigo())
  );

//窗口尺寸改变，重绘粒子
function reBALLs() {
  var curWidth = HEADER.scrollWidth,
    curHeight = HEADER.scrollHeight,
    preWidth = CTX.width,
    preHeight = CTX.height;
  WidthRatio = curWidth / preWidth;
  HeightRatio = curHeight / preHeight;
  AreaRatio = WidthRatio * HeightRatio;
  len1 *= AreaRatio;
  len2 *= AreaRatio;
  for (let i = 0; i < count; i++) {
    BALLs[i].r *= AreaRatio;
    BALLs[i].x *= WidthRatio;
    BALLs[i].y *= HeightRatio;
  }
  // CTX.width = curWidth;
  // CTX.height = curHeight;
}
//画布绘制
function PLOT() {
  //绘制当前帧内容
  //利用角度变化近似鼠标的移动行为，因为人为移动鼠标不可能总使得角度不变
  var tmp_angle = atan2(mousePOS.x, mousePOS.y);
  if (mouseFOCUS && tmp_angle != angle) {
    var xrate = (100 * mousePOS.x) / HEADER.scrollWidth,
      yrate =
        (100 * (mousePOS.y + document.documentElement.scrollTop)) /
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
          (atan2(mousePOS.y - ry, mousePOS.x - rx) * 180) / PI - 90
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
      if (mouseFOCUS && sqr(len1) >= sqr2p(b1, mousePOS)) {
        CTX.beginPath();
        CTX.strokeStyle = 'black';
        if (mouse_Left) {
          CTX.lineWidth = broad_wid;
          CTX.strokeStyle = '#f52';
        }
        CTX.moveTo(mousePOS.x, mousePOS.y);
        CTX.lineTo(b1.x, b1.y);
        CTX.stroke();
      }
      CTX.lineWidth = narrow_wid;
      CTX.beginPath();
      for (let j = i - 1; i != j && -1 < j; j--) {
        var b2 = BALLs[j];
        if (sqr(len2) >= sqr2p(b1, b2)) {
          CTX.moveTo(b1.x, b1.y);
          CTX.lineTo(b2.x, b2.y);
        }
      }
      CTX.strokeStyle = 'white';
      CTX.stroke();
    }
  }
}
//关键帧
function FRAME() {
  CTX.clearRect(0, 0, CTX.width, CTX.height);
  //绘制
  PLOT();
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
