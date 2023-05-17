const ROOTPATH = './src/',
  DATE = new Date();
//配置
var CONFIG,
  assets = [],
  fileNames; //脚本生成时间

/**
 *获取父级路径
 * @param {string} type 文件类型
 * @returns 父级路径
 */
function getParentPath(type) {
  let path = ROOTPATH;
  switch (type) {
    case 'js':
      path += 'policy/';
      break;
    case 'png':
    case 'svg':
    case 'jpg':
    case 'json':
      path += 'assets/';
      break;
    case 'html':
      path += 'route/';
      break;
    case 'css':
      path += 'style/';
      break;
    default:
      break;
  }
  return path;
}

/**
 * 引入脚本
 * @param {*} fname
 */
function importFile(fnames, index) {
  if (index >= fileNames.length) return;
  let fname = fnames[index],
    type = fname.split('.').pop(),
    path = getParentPath(type) + fname,
    obj;
  // console.log(fname, type);
  switch (type) {
    case 'svg':
    case 'png':
    case 'jpg':
      //图片预加载，确保需要使用时能立即获取
      obj = new Image();
      obj.src = path;
      assets.push({ fname, path });
      break;
    case 'css':
      obj = document.createElement('link');
      obj.rel = 'stylesheet';
      // link.type = 'text/css';
      obj.href = path;
      document.head.appendChild(obj);
      break;
    case 'js':
      obj = document.createElement('script');
      obj.src = path;
      // script.defer = true;
      document.documentElement.appendChild(obj);
      break;
  }
  //同步机制
  obj.onload = () => {
    importFile(fnames, ++index);
  };
  obj = null;
}

/**
 * 主函数
 */
function main() {
  //注意，当js被引入html生效，相对路径应相对于html
  fetch(ROOTPATH + 'config.json')
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('config not ok.');
    })
    .then(cfgJson => {
      // 处理json
      // console.log(text);
      CONFIG = cfgJson;
      // console.log('config ok\nauthor:', CONFIG.author);
      fileNames = CONFIG.BOOTFILE;
      importFile(fileNames, 0); //引入脚本

      let year = DATE.getFullYear(),
        author = CONFIG.AUTHOR,
        meta = document.querySelector("meta[name='base']"),
        attr = meta.getAttribute('content');

      document.title = author;
      meta.setAttribute('content', `${attr},author=${author}`);
      ftext.innerHTML = `<b>&copy;${year}  &#64;${author} ·</b>   <i>Design & Code</i>`;
    })
    .then(() => {})
    .catch(error => {
      console.log(error.message);
    });
}

//加载
window.onload = () => {
  main();
};
