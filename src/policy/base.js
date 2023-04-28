/*
[小白鸥]关于js禁止浏览器缩放
https://www.cnblogs.com/xiaobaiou/p/10731062.html
*/
//chrome 禁止ctrl+滚轮
window.addEventListener('mousewheel', function(event) {
    if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
    }
}, { passive: false });

//firefox禁止ctrl+滚轮
window.addEventListener('DOMMouseScroll', function(event) {
    if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
    }
}, { passive: false });

/*
版权声明：本文为CSDN博主「Noblesse-」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wen81643956/article/details/99586314
*/
// 阻止pc端浏览器缩放js代码
// 由于浏览器菜单栏属于系统软件权限，没发控制，着手解决ctrl/cammond + +/- 
// chrome 浏览器直接加上下面这个样式就行了，但是ff不识别
document.body.style.zoom = 'reset';
window.addEventListener('keydown', function(event) {
    if ((event.ctrlKey === true || event.metaKey === true) &&
        (event.which === 61 || event.which === 107 ||
            event.which === 173 || event.which === 109 ||
            event.which === 187 || event.which === 189)) {
        event.preventDefault();
    }
}, false);

//跳转
function _2URL(url) {
    top.location.href = url;
}

//延时跳转
function delay2URL(url, time) {
    setTimeout("top.location.href = '" + url + "'", time);
}
//窗口大小改变时重新放置小球
window.onresize = function() {
    var curWidth = header.scrollWidth,
        curHeight = header.scrollHeight;
    reParticles(galaxy.width, curWidth, galaxy.height, curHeight);
    galaxy.width = curWidth;
    galaxy.height = curHeight;
    galaxyCtx.lineWidth = .3;
    sticky(); //sticky.js函数，用于判断galaxy和indexbar呈像问题
};

//窗口滚动条位置改变时判断galaxy和indexbar呈像问题
window.onload = window.onscroll = function() {
    sticky();
}

document.onkeydown = function(e) {
    var keyCode = e.keyCode || e.which || e.charCode,
        ctrlKey = e.ctrlKey || e.metaKey,
        cmdInfo = '';
    // switch (keyCode) {
    //     case 13: //enter
    //         if (search_ipt != document.activeElement) {
    //             if (document.documentElement.scrollTop < header.scrollHeight / 2) {
    //                 document.documentElement.scrollTop = header.scrollHeight / 2;
    //             }
    //             search_ipt.focus();
    //             cmdInfo = 'enter input';
    //         }
    //         break;
    //     case 27: //esc
    //         if (search_ipt == document.activeElement) {
    //             cmdInfo = cmd_escape();
    //         }
    //         break;
    //     case 8:
    //         if (search_ipt.value != '' && ctrlKey) {
    //             cmdInfo = cmd_clear();
    //         }
    //         break;
    // }
    // if (cmdInfo != '') cmdInfo += '<br/>';
    // center.innerHTML = cmd_info(cmdInfo);
}