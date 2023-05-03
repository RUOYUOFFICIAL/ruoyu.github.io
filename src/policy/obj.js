class A {
  constructor(ID, name) {
    this.ID = ID;
    this.name = name;
  }
}

/**
 * 简单球:
 * 刚性，定速
 */
class Ball0 extends A {
  constructor(ID, name, _size, _speed, _angle, _color) {
    super(ID, name);
    this.show = true;
    this.r = _size;
    this.y = rand(_size, CTX.height - _size);
    this.x = rand(_size, CTX.width - _size);
    this.θ = _angle;
    this.v = _speed;
    this.vy = _speed * sin(_angle);
    this.vx = _speed * cos(_angle);
    this.color = _color;
  }
  collide(other, n) {
    //先撞墙
    if (this.x < this.r || this.x > CTX.width - this.r) {
      if (this.x < this.r) this.x = this.r;
      else this.x = CTX.width - this.r;
      this.vx *= -1;
    }
    if (this.y < this.r || this.y > CTX.height - this.r) {
      if (this.y < this.r) this.y = this.r;
      else this.y = CTX.height - this.r;
      this.vy *= -1;
    }
    //再撞球
    if (n == 0) return;
    for (var i = 0; i < n; i++) {}
  }
  update() {
    this.vx;
    this.vy;
    this.θ = atan2(this.vy, this.vx);
    this.v = sqrt2(this.vy, this.vx);
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    if (!this.show) return;
    CTX.beginPath();
    CTX.fillStyle = this.color;
    CTX.arc(this.x, this.y, this.r, 0, 2 * PI);
    CTX.fill();
    if (!DEBUG) return;
    CTX.beginPath();
    CTX.fillStyle = "yellow";
    CTX.fillText(
      `${this.ID},${(this.θ / PI).toFixed(2)},${cos(this.θ).toFixed(2)},${sin(
        this.θ
      ).toFixed(2)}`,
      this.x,
      this.y
    );
    CTX.fill();
  }
  frame() {}
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
    this.update();
    this.draw();
    b.vy = vs2 * sin(theta2) + vt2 * cos(theta2);
    b.vx = vs2 * cos(theta2) + vt2 * sin(theta2);
    b.update();
    b.draw();
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
 * 球集
 */
class Balls extends A {
  constructor(ID, name, _count) {
    super(ID, name);
    this.count = _count;
    this.balls = [];
  }
}
/**
 * 动力球
 */
class Ball1 extends Ball0 {
  constructor(ID, name) {
    super(ID, name, size, NaN, 0, "#ef4136");
    this.fx = 0;
    this.fy = 0;
    this.level = 1;
    this.energy = 1;
    this.r_ = size; //目标尺寸
  }
  single_frame() {
    this.draw();
    this.grow();
    this.update();
  }
  draw() {
    if (!me.show) return;
    CTX.fillStyle = this.color;
    CTX.beginPath();
    CTX.arc(this.x, this.y, this.r, 0, 2 * PI);
    CTX.fill();
    if (!mouse_Left) return;
    CTX.beginPath();
    CTX.moveTo(this.x, this.y);
    CTX.lineTo(mousePos.x, mousePos.y);
    CTX.strokeStyle = "black";
    CTX.stroke();
    if (!DEBUG) return;
    CTX.beginPath();
    CTX.fillStyle = "white";
    CTX.fillText(`${this.name}/${this.level}`, this.x, this.y);
    CTX.fill();
  }
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
  external_force() {
    var f = 0,
      fsin,
      fcos;
    if (mouse_Left) f = sqrt2p(this, mousePos);
    fsin = f * sin2p(this, mousePos);
    fcos = f * cos2p(this, mousePos);
    return [fsin, fcos];
  }
  grow() {
    //尺寸
    if (this.r < this.r_) this.r += Math.log(this.r_ / this.r);
  }
  levelUp() {
    this.level++;
    this.r_ = sqrt(this.level) * size;
    this.energy = this.energy < 0.9 ? this.energy + 0.1 : 1;
  }
  update() {
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
