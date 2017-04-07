"use strict";

var Site = Site || {};
Site.home = (function () {
  var preloadQueue,
      pi,
      publicInterface = pi = {
      thisPageName: "home",
      init: function() {
        console.debug(pi.thisPageName + ".init()");

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
      preloadQueue.on("complete", function() {
        Site.state.on(Site.state.PAGE_INITIALIZED, onPageInitialized);
        $(".preloaded-content").removeClass("active-content");
        $(".home-page").addClass("active-content");
        setTimeout(function() {
            Site.state.trigger(Site.state.PAGE_INITIALIZED, publicInterface.thisPageName);
        }, 500);
      }, this);
      preloadQueue.loadManifest(preloadManifest);
    }
  }

  function onPageInitialized(event, pageName) {
    if (pageName !== pi.thisPageName) {
      publicInterface.end();
    } else {
      $(".video").get(0).play();
    }
  }

  function setupDOMListeners() {
    var navigateToAboutOnce = _.throttle(navigateToAbout, 1000, {leading: true, trailing: false});
    addWheelListener($(".home-page").get(0), navigateToAboutOnce);
  }

  function navigateToAbout() {
    $(".video-link").trigger("click");
  }

  function removeDOMListeners() {
  }

  Site.currentPage = publicInterface;
  Site.state.trigger(Site.state.NEW_CURRENT_PAGE, Site.currentPage);

  return publicInterface;
})();
