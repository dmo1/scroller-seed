"use strict";

var Site = Site || {};
Site.work = (function () {
  var iScroll,
    thisPageName = "about";

  var publicInterface = {
      init: function() {
        setupDOMListeners();
        updateSceneSizes();

        Site.state.trigger(Site.state.PAGE_INITIALIZED, thisPageName);

        $(".preloaded-content").removeClass("active-content");
        $(".about-page").addClass("active-content");

        Site.state.on(Site.state.PAGE_INITIALIZED, onForeignPageInitialized);
      },
      end: function() {
        removeDOMListeners();
      }
  };

  function onForeignPageInitialized(event, pageName) {
    if (thisPageName !== pageName) {
      publicInterface.end();
    }
  }

  function setupDOMListeners() {
    $(window).on("resize", updateSceneSizes);
    addWheelListener($(".scroll-container").get(0), translateVerticalScroll);

    //iScroll = new IScroll("#wrapper", { mouseWheel: true, scrollbars: true });
  }

  function removeDOMListeners() {
    $(window).off("resize", updateSceneSizes);
    $(".scroll-container").off("scroll", translateVerticalScroll);
  }

  function translateVerticalScroll(event) {
    //console.log(iScroll.x, iScroll.y, iScroll.directionX, iScroll.directionY);

    if (event.deltaY) {
      var newHPosition = parseInt($(".scroll-container").scrollLeft()) + event.deltaY;
        event.preventDefault();
        $(".scroll-container").scrollLeft(newHPosition);
    }
  }

  function updateSceneSizes() {
    var windowHeight = $(window).height(),
      navHeight = $("header").height();

      $(".scroll-container").height(windowHeight - navHeight);
  }

  return publicInterface;
})();
