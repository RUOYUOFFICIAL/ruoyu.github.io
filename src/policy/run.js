var arr = [];
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

      //搜索框、命令行事件必须等待配置文件加载完成后才能挂钩
      //搜索框事件
      search_ipt.onkeyup = ev => {
        let e = ev,
          ek = e.key;
        if (DEBUG && deb_key) console.log('IPT_K_UP:', ek);

        switch (ek) {
          case 'Enter':
            if (ipt_Actived) TryCMD(search_ipt.value);
            break;
          case 'ArrowUp':
            console.log('↑');
            break;
          case 'ArrowDown':
            console.log('↓');
            break;
          case 'Tab':
            e.preventDefault(); //避免失焦
            console.log('→');
            break;
          default:
            break;
        }
      };
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

//运行
main();
