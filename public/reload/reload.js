'use strict';
(function() {

  var socket = window.io.connect();

  socket.on('reloadCss', function() {
    reloadCss();
  });

  socket.on('reloadAll', function() {
    reloadAll();
  });

  socket.on('test', function(data) {
    console.log(data.message);
  });

  function reloadCss() {
    var links = document.getElementsByTagName('link');
    for (var i = 0, len = links.length; i < len; i++) {
      var link = links[i];
      if (link.href.indexOf('css') > -1) {
        var string = link.href.replace(/^([^\?]*)([\?]*.*)/, '$1' + '?random=' + (new Date()).getTime() + Math.random() * 10000);
        link.href = string;
      }
    }
  }

  function reloadAll() {
    location.reload();
  }

})();
