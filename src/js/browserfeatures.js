"use strict";

var Site = Site || {};
Site.browserFeatures = (function() {
  var $classContainer;

  var pi,
    publicInterface = pi = {
      init: function() {
        $classContainer = $("html");
        
        setJSFlag();
        runWebkitBrowserTest();
      }
    };

    function runWebkitBrowserTest() {
      var isWebkit = 'WebkitAppearance' in document.documentElement.style;

      if (isWebkit) {
        $classContainer.addClass("webkit-browser");
      }
    }

    function setJSFlag() {
      $classContainer.removeClass("no-js").addClass("js");
    }

  return publicInterface;
}());
