/**
 * 基类A
 */
class A {
  /**
   *
   * @param {string} ID 唯一标识符
   * @param {string} name 名
   */
  constructor(ID, name) {
    this.ID = ID;
    this.name = name;
  }
}

/**
 * 简单球类 Ball
 */
class Ball extends A {
  /**
   *
   * @param {string} ID 继承标识符
   * @param {string} name 继承名
   * @param {number} _size 半径
   * @param {number} _speed 速度
   * @param {number} _angle 运动角
   * @param {string} _color 颜色
   */
  constructor(ID, name, _size, _x, _y, _angle, _speed, _color) {
    super(ID, name);
    this.show = true;
    this.r = _size;
    this.x = _x;
    this.y = _y;
    this.θ = _angle;
    this.v = _speed;
    this.vy = _speed * sin(_angle);
    this.vx = _speed * cos(_angle);
    this.color = _color;
  }
  // collide(other, n) {
  //   //先撞墙
  //   if (this.x < this.r || this.x > CTX.width - this.r) {
  //     if (this.x < this.r) this.x = this.r;
  //     else this.x = CTX.width - this.r;
  //     this.vx *= -1;
  //   }
  //   if (this.y < this.r || this.y > CTX.height - this.r) {
  //     if (this.y < this.r) this.y = this.r;
  //     else this.y = CTX.height - this.r;
  //     this.vy *= -1;
  //   }
  //   //再撞球
  //   if (n == 0) return;
  //   for (var i = 0; i < n; i++) {}
  // }

  /**
   *
   */
  move() {
    // this.vx;
    // this.vy;
    this.θ = atan2(this.vy, this.vx);
    this.v = sqrt2(this.vy, this.vx);
    this.x += this.vx;
    this.y += this.vy; //先撞墙
    if (this.x <= this.r || this.x >= CTX.width - this.r) {
      if (this.x <= this.r) this.x = this.r;
      else this.x = CTX.width - this.r;
      this.vx *= -1;
    }
    if (this.y <= this.r || this.y >= CTX.height - this.r) {
      if (this.y <= this.r) this.y = this.r;
      else this.y = CTX.height - this.r;
      this.vy *= -1;
    }
  }

  /**
   * 绘制
   */
  plot() {
    if (!this.show) return;
    CTX.beginPath();
    CTX.globalAlpha = 1;
    CTX.fillStyle = this.color;
    CTX.arc(this.x, this.y, this.r, 0, 2 * PI);
    CTX.fill();
    if (DEBUG && deb_obj) {
      CTX.beginPath();
      CTX.strokeStyle = 'orange';
      CTX.lineWidth = 2;
      CTX.moveTo(this.x, this.y);
      CTX.lineTo(this.x + this.r * cos(this.θ), this.y + this.r * sin(this.θ));
      CTX.stroke();
      CTX.beginPath();
      CTX.fillStyle = 'orange';
      CTX.fillText(
        `no.${this.ID}`, //, ${this.x.toFixed()} , ${this.y.toFixed()}
        this.x,
        this.y
      );
      CTX.fill();
    }
  }
  /**
   *
   * @param {Ball} b 另一个球
   */
  collide_with(b) {
    var theta = atan2p(this, b),
      theta1 = this.θ - theta,
      theta2 = b.θ - theta - PI,
      vs1 = this.v * cos(theta1),
      vs2 = b.v * cos(theta2); //向心速度
    if ((b.x - this.x) * (vs2 - vs1) >= 0) return; //碰撞检测,>=0表示不会碰撞
    var m1 = sqr(this.r),
      m2 = sqr(b.r),
      dif = m2 - m1,
      sum = m2 + m1,
      vt1 = this.v * sin(theta1),
      vt2 = b.v * sin(theta2), //法心速度
      p1 = m1 * vs1,
      p2 = m2 * vs2;
    vs1 = (-dif * vs1 + 2 * p2) / sum;
    vs2 = (dif * vs2 + 2 * p1) / sum;
    this.vy = vs1 * sin(theta1) + vt1 * cos(theta1);
    this.vx = vs1 * cos(theta1) + vt1 * sin(theta1);
    this.move();
    this.plot();
    b.vy = vs2 * sin(theta2) + vt2 * cos(theta2);
    b.vx = vs2 * cos(theta2) + vt2 * sin(theta2);
    b.move();
    b.plot();
    // var coX = isCollide(this, b, true), coY = isCollide(this, b, false)
    // if (abs(this.r - b.size) / this.r <= ZERO) {//两个球大小相等
    //     if (coX) swap(this.vx, b.vx)
    //     if (coY) swap(this.vy, b.vy)
    // } else {
    //     var m1 = sqr(this.r), m2 = sqr(b.size),
    //         dif = m2 - m1, sum = m1 + m2,
    //         px1 = m1 * this.vx, py1 = m1 * this.vy,
    //         px2 = m2 * b.vx, py2 = m2 * b.vy
    //     if (coX) {
    //         this.vx = (-dif * this.vx + 2 * px2) / sum
    //         b.vx = (dif * b.vx + 2 * px1) / sum
    //     }
    //     if (coY) {
    //         this.vy = (-dif * this.vy + 2 * py2) / sum
    //         b.vy = (dif * b.vy + 2 * py1) / sum
    //     }
    // }
  }
}

/**
 * 动力球类 goBall
 */
class goBall extends Ball {
  constructor(ID, name) {
    super(ID, name, size, NaN, 0, '#e43');
    this.fx = 0;
    this.fy = 0;
    this.level = 1;
    this.energy = 1;
    this.r_ = size;
  }
  /**
   * 单帧
   */
  single_frame() {
    this.plot();
    this.grow();
    this.move();
  }
  /**
   * 绘制
   */
  plot() {
    if (!me.show) return;
    CTX.fillStyle = this.color;
    CTX.beginPath();
    CTX.arc(this.x, this.y, this.r, 0, 2 * PI);
    CTX.fill();
    if (!mouse_Left) return;
    CTX.beginPath();
    CTX.moveTo(this.x, this.y);
    CTX.lineTo(mousePos.x, mousePos.y);
    CTX.strokeStyle = 'black';
    CTX.stroke();
    if (!DEBUG) return;
    CTX.beginPath();
    CTX.fillStyle = 'white';
    CTX.fillText(`${this.name}/${this.level}`, this.x, this.y);
    CTX.fill();
  }
  /**
   * 内动力
   */
  active_force() {
    var θ = NaN,
      fsin = 0,
      fcos = 0;
    //顺时针
    if (key_D && key_S) θ = 0.25;
    else if (key_A && key_S) θ = 0.75;
    else if (key_S) θ = 0.5;
    else if (key_W && key_A) θ = 1.25;
    else if (key_A) θ = 1;
    else if (key_D && key_W) θ = 1.75;
    else if (key_W) θ = 1.5;
    else if (key_D) θ = 2;
    θ *= PI;
    if (θ) {
      fsin = force * sin(θ);
      fcos = force * cos(θ);
    }
    return [fsin, fcos];
  }
  /**
   * 外动力
   */
  external_force() {
    var f = 0,
      fsin,
      fcos;
    if (mouse_Left) f = sqrt2p(this, mousePos);
    fsin = f * sin2p(this, mousePos);
    fcos = f * cos2p(this, mousePos);
    return [fsin, fcos];
  }
  /**
   * 成长
   */
  grow() {
    //尺寸
    if (this.r < this.r_) this.r += Math.log(this.r_ / this.r);
  }
  /**
   * 升级
   */
  levelUp() {
    this.level++;
    this.r_ = sqrt(this.level) * size;
    this.energy = this.energy < 0.9 ? this.energy + 0.1 : 1;
  }
  /**
   * 移动
   */
  move() {
    //坐标
    if (key_Space && (key_D || key_S || key_A || key_W) && this.energy > 0) {
      acc = 2;
      this.energy = this.energy < 0.01 ? this.energy - 0.01 : 0;
    }
    var af = this.active_force(),
      ef = this.external_force(),
      miu = acc * dec,
      multi_factor = this.level * miu,
      mass = sqr(this.r);

    this.fy += (af[0] + ef[0]) * multi_factor;
    this.fx += (af[1] + ef[1]) * multi_factor;
    this.vy = this.fy / mass;
    this.vx = this.fx / mass;
    this.fy *= dec;
    this.fx *= dec;
    acc = miu > 1 ? miu : 1;
    // trace.tag = (trace.tag + 1) % trace.length
    // trace[trace.tag] = { 'x': this.x, 'y': this.y }
    this.y += this.vy;
    this.x += this.vx;
    if (this.x < this.r || this.x > CTX.width - this.r) {
      if (this.x < this.r) this.x = this.r;
      else this.x = CTX.width - this.r;
      this.fx *= -1;
    }
    if (this.y < this.r || this.y > CTX.height - this.r) {
      if (this.y < this.r) this.y = this.r;
      else this.y = CTX.height - this.r;
      this.fy *= -1;
    }
  }
}
