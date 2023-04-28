var baseWidth = header.scrollWidth, //采用scrollWidth或scrollHeight是为自适应界面大小，如果采用clientWidth、clientHeight，自适应比例会出错
    baseHeight = header.scrollHeight, //1920*1600::1391*679(浏览器非全屏)||1397*786(浏览器全屏)
    baseArea = baseWidth * baseHeight,
    baseSpeed = .3,
    coverSpeed = 2 * baseSpeed,
    limitSpeed = baseSpeed / 10,
    halfCount = 24,
    count = 2 * halfCount; //i7-16G,ssd-256G,1050ti-4G,且窗口大小不变情况下，count=1000+初始化时有卡顿


var galaxy = document.getElementById("galaxy"),
    galaxyCtx = galaxy.getContext("2d");
galaxy.width = baseWidth;
galaxy.height = baseHeight;
galaxy.style.position = "fixed";
galaxyCtx.lineWidth = .3;

//(min,min+range)随机数字,避免使用Math.floor导致的同速问题
function randomNum(min, range) {
    return min + Math.random() * range;
}
//随机颜色，使用Math.floor取整以兼容IE11
function randomColor() {
    return "rgb(" +
        Math.floor(randomNum(42, 60)) +
        "," +
        Math.floor(randomNum(18, 24)) +
        "," +
        Math.floor(randomNum(60, 60)) +
        ")";
}
//距离平方
function sqr(x1, x2, y1, y2) {
    return Math.pow(x1 - x2, 2) +
        Math.pow(y1 - y2, 2);
}

//Particle伪类
/*
以下方法受最新版Edge，Chrome以及IE11支持
——2020/7/25
*/
//粒子构造函数
function Particle() {
    this.r = Math.floor(randomNum(15, 24)) * baseArea / 1098042;
    this.x = randomNum(this.r, galaxy.width - 2 * this.r);
    this.y = randomNum(this.r, galaxy.height - 2 * this.r);
    this.color = randomColor();
    this.speedX = randomNum(-1, 2) * baseSpeed;
    this.speedY = randomNum(-1, 2) * baseSpeed;
    /*确保粒子速度不为0*/
    while (Math.abs(this.speedX) < limitSpeed || Math.abs(this.speedY) < limitSpeed) {
        this.speedX = randomNum(-1, 2) * coverSpeed;
        this.speedY = randomNum(-1, 2) * coverSpeed;
    }
}
//属性函数
Particle.prototype = {
    plot: function() {
        galaxyCtx.beginPath();
        galaxyCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        galaxyCtx.fillStyle = this.color;
        galaxyCtx.fill();
    },
    move: function() {
        this.x += this.speedX;
        this.y += this.speedY;
        //小球坐标越界处理
        if (this.x <= this.r || this.x >= galaxy.width - this.r) {
            if (this.x <= this.r) this.x = this.r;
            else this.x = galaxy.width - this.r;
            this.speedX *= -1;
        }
        if (this.y <= this.r || this.y >= galaxy.height - this.r) {
            if (this.y <= this.r) this.y = this.r;
            else this.y = galaxy.height - this.r;
            this.speedY *= -1;
        }
    }
}

/*
以下是基于最新js语法
受最新版Edge和Chrome可支持
IE11及以下版本浏览器并不支持
——2020/7/29
*/
// class Particle {
//     //小球构造函数
//     constructor() {
//         ***
//     },
//     //绘制
//     plot() {
//         ***
//     },
//     //移动
//     move() {
//         ***
//     }
// }

//存储所有粒子
var particles = [];
//入栈若干粒子
for (let i = count; 0 < i; i--) {
    particles.push(new Particle());
}

//鼠标事件
var mouseX = mouseY = angle = NaN,
    gfocus = false;
galaxy.onmouseenter = galaxy.onmousemove = function(e) {
    gfocus = true;
    var ev = e;
    mouseX = ev.offsetX;
    mouseY = ev.offsetY;
}
galaxy.onmouseleave = function() {
    gfocus = false;
}

//关键帧动画
function galaxyPlot() {
    //清除上一帧画布内容
    galaxyCtx.clearRect(0, 0, galaxy.width, galaxy.height);
    //绘制当前帧内容
    //利用角度变化近似鼠标的移动行为，因为人为移动鼠标不可能总使得角度不变
    var tmp_angle = Math.atan2(mouseY, mouseX);
    if (gfocus && tmp_angle != angle) {
        var xrate = Math.floor(100 * mouseX / header.scrollWidth),
            yrate = Math.floor(100 * (mouseY + document.documentElement.scrollTop) / header.scrollHeight);
        header.style.setProperty("background-image", "radial-gradient(circle  at " + xrate.toString() + "% " + yrate.toString() + "%, #ccffff 0, #99ccff 60%)");
        angle = tmp_angle;
        //console.log("replot at " + xrate + "/" + yrate);
    }
    //绘制小球之间、球与鼠标之间画线
    for (let i = count - 1; - 1 < i; i--) {
        particles[i].plot();
        particles[i].move();
        //鼠标、小球间画线，并预期模拟排斥效果
        if (gfocus && 62500 >= sqr(particles[i].x, mouseX, particles[i].y, mouseY)) {
            galaxyCtx.beginPath();
            galaxyCtx.moveTo(mouseX, mouseY);
            galaxyCtx.lineTo(particles[i].x, particles[i].y);
            galaxyCtx.strokeStyle = "black";
            galaxyCtx.stroke();
        }
        //考虑采用全局的lineWidth=0.3替代globalAlpha的反复改变，均可达到弱化线条视觉效果的目的
        //以此为界线，前画鼠标线，后画粒子线，属性不能混淆
        //深度2循环，beginPath和stroke放在循环外以减小开销
        galaxyCtx.beginPath();
        for (let j = count - 1; i != j && -1 < j; j--) {
            //减小比较值会使小球间平均画线量减少从而减小绘制开销
            if (10000 >= sqr(particles[i].x, particles[j].x, particles[i].y, particles[j].y)) {
                galaxyCtx.moveTo(particles[i].x, particles[i].y);
                galaxyCtx.lineTo(particles[j].x, particles[j].y);
            }
        }
        galaxyCtx.strokeStyle = "white";
        galaxyCtx.stroke();
    }
}
//将关键帧绘制动作集中于主函数
function main() {
    //绘制
    galaxyPlot();
    //关键帧，帧数稳定在60
    this.requestAnimationFrame(main);
}
//调用
main();

//重绘粒子
function reParticles(preWidth, curWidth, preHeight, curHeight) {
    var widthRatio = curWidth / preWidth,
        heightRatio = curHeight / preHeight,
        areaRatio = widthRatio * heightRatio;
    for (let i = halfCount - 1, j = count - 1; - 1 < i; i--, j--) {
        //粒子半径及坐标处理
        particles[i].r *= areaRatio;
        particles[i].x *= widthRatio;
        particles[i].y *= heightRatio;
        //降维
        particles[j].r *= areaRatio;
        particles[j].x *= widthRatio;
        particles[j].y *= heightRatio;
    }
}