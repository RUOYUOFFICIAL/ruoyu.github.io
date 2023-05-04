//指令控制
var cmdPattern = false;
search_ipt.onkeyup = function (e) {
  var keyCode = e.keyCode || e.which || e.charCode,
    ctrlKey = e.ctrlKey || e.metaKey,
    cmdInfo = '';
  switch (keyCode) {
    case 8: //
      break;
    case 13: //enter
      let ipttext = search_ipt.value,
        iptlen = ipttext.length;
      if (cmdPattern) {
        //指令模式
        switch (ipttext) {
          case 'e':
          case 'exit':
          case 'q':
          case 'quit':
            cmdInfo = cmd_quit();
            break;
          case 're':
          case 'rf':
          case 'refresh':
          case 'rl':
          case 'reload':
            cmd_reload();
            break;
          case 'top':
            cmdInfo = cmd_top();
            break;
          case 'btm':
          case 'bottom':
            cmdInfo = cmd_bottom();
            break;
          case 'noflow':
            cmdInfo = cmd_noflow();
            break;
          case 'showflow':
            cmdInfo = cmd_showflow();
            break;
          case 'nome':
            cmdInfo = cmd_nome();
            break;
          case 'showme':
            cmdInfo = cmd_showme();
            break;
          case '':
            break;
          default:
            cmdInfo = 'invalid cmd: ' + ipttext;
            break;
        }
      } else {
        //非指令模式
        switch (ipttext.toLowerCase()) {
          case 'cmd':
            cmdInfo = cmd_run();
            break;
          default:
            break;
        }
      }
      let suffixcmd = ipttext.substr(iptlen - 2, iptlen);
      switch (suffixcmd) {
        case '``':
          search_ipt.value = ipttext.substr(0, iptlen - 2);
          cmdInfo = cmd_escape();
          break;
        case '`c':
          cmdInfo = cmd_clear();
          break;
        default:
          break;
      }
      if (cmdInfo != '') cmdInfo += '<br/>';
      center.innerHTML = cmd_info(cmdInfo);
      break;
  }
};
