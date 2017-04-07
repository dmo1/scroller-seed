"use strict";

var Site = Site || {};
Site.about = (function () {
  var $ = jQuery,
    skrollrInstance,
    preloadQueue;

  var publicInterface = {
      thisPageName: "about",
      init: function() {
        console.debug(publicInterface.thisPageName + ".init()");

        setupDOMListeners();
        startPreloading();
      },
      end: function() {
        removeDOMListeners();
      }
  };

  function startPreloading() {
    var preloadManifest;

    preloadManifest = $.parseJSON( $("body").attr("data-preload-manifest") );

    if (preloadManifest) {
      preloadQueue = new createjs.LoadQueue();
      if ($(".preloader-inner").hasClass("active")) {
        preloadQueue.on("progress", function(event) {
          var translateValue = Math.round(event.progress * 100) - 100;
          $(".preloader-inner-progress").css( { "transform": "translateX(" + translateValue + "%)" });
        }, this);
      }
      preloadQueue.on("complete", function() {
        $(".preloader-inner")
          .removeClass("active")
          .fadeOut(500);

        Site.state.trigger(Site.state.PAGE_INITIALIZED, publicInterface.thisPageName);

        $(".preloaded-content").removeClass("active-content");
        $(".about-page").addClass("active-content");
        setTimeout(function() {
          $(".about-text").addClass("animated");
          skrollrInstance = skrollr.init();
        }, 500);

        Site.state.on(Site.state.PAGE_INITIALIZED, onForeignPageInitialized);
      }, this);
      preloadQueue.loadManifest(preloadManifest);
    }
  }

  function onForeignPageInitialized(event, pageName) {
    if (publicInterface.thisPageName !== pageName) {
      publicInterface.end();
    }
  }

  function setupDOMListeners() {
  }

  function removeDOMListeners() {
    skrollrInstance.destroy();
    $(window).off("resize", updateSceneSizes);
  }

  Site.currentPage = publicInterface;
  Site.state.trigger(Site.state.NEW_CURRENT_PAGE, Site.currentPage);

  return publicInterface;
})();
