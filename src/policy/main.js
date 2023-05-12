function main() {
  fetch('./src/config.json')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('config not ok.');
    })
    .then(cfgJson => {
      // 处理json
      // console.log(text);
      CONFIG = cfgJson;
      // console.log('config ok\nauthor:', CONFIG.author);
      let year = new Date().getFullYear(),
        author = CONFIG.author,
        meta = document.querySelector("meta[name='base']"),
        attr = meta.getAttribute('content');
      document.title = author;

      meta.setAttribute('content', `${attr},author=${author}`);
      ftext.innerHTML = `<b>&copy;${year}  &#64;${author} ·</b>   <i>Design & Code</i>`;

      // var metaElements = document.querySelectorAll('meta');

      // metaElements.forEach(function (metaElement) {
      //   var charset = metaElement.getAttribute('charset');
      //   var name = metaElement.getAttribute('name');
      //   var content = metaElement.getAttribute('content');

      //   console.log('charset:', charset);
      //   console.log('name:', name);
      //   console.log('content:', content);
      // });
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message
      );
    });

  // console.log(CONFIG);
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
  // console.log(BALLs);
  //回调动画
  window.requestAnimationFrame(timestamp => ANIMATION(timestamp, 0));
}

window.onload = () => {
  //页面资源加载完成后，挂载组件事件函数
  GLX.onmouseenter = GLX.onmousemove = ev => glx_mEnter(ev);
  GLX.onmouseleave = ev => glx_mLeave(ev);
  GLX.onmousedown = ev => glx_mDown(ev);
  GLX.onmouseup = ev => glx_mUp(ev);
  search_ipt.onblur = ev => ipt_Blur(ev);
  search_ipt.onfocus = ev => ipt_Focus(ev);
  search_ipt.onkeyup = ev => ipt_kUp(ev);
  search_btn.onmousedown = ev => btn_mDown(ev);
  search_btn.onmouseup = ev => btn_mUp(ev);
  //运行
  main();
};
