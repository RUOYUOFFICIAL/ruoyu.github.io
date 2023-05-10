function main() {
  fetch('./src/config')
    .then(function (response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function (text) {
      // 处理jsonData
      console.log('config ok\n' + text);
      var year = new Date().getFullYear(),
        AUTHOR = '若愚[RUOYU]';
      ftext.innerHTML = `<b>&copy;${year}  &#64;${AUTHOR} ·</b>   <i>Design & Code</i>`;

      //首次初始化
      Init(HEADER.scrollWidth, HEADER.scrollHeight);
      if (DEBUG && deb_cmd) console.log('size:', CTX.width, CTX.height);

      //入栈若干粒子
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
      // console.log(BALLs);
      //回调动画
      window.requestAnimationFrame((timestamp) => ANIMATION(timestamp, 0));
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message
      );
    });
}
//运行
main();
