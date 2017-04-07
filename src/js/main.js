"use strict";

var Site = Site || {};
Site.init = (function () {
  var isInitialized = false;

  var initCallback = function () {
      if (!isInitialized) {
          var state = Site.state;

          state.on(state.NEW_CURRENT_PAGE, onCurrentPageChange);
          state.on(state.PAGE_INITIALIZED, removePreloader);
          state.on(state.START_ROUTING, startRouting);

          Site.browserFeatures.init();
          Site.router.startRouting("#ajaxify-content");
          setupDOMListeners();
          Site.currentPage.init();

          isInitialized = true;
      }
    };

    function onCurrentPageChange() {
      Site.currentPage.init();

      $(".menu-item").removeClass("menu-item-active");
      $("[data-target-page=" + Site.currentPage.thisPageName + "]")
        .addClass("menu-item-active");
    }

    function startRouting(event, activePageName) {
      Site.state.trigger(Site.state.PAGE_START_PRELOADING, activePageName);
    }

    function setupDOMListeners() {
      $(".menu-item").on("click", onMenuItemClick);
      $(".mobile-menu-switch").on("touchend", onMobileMenuSwitch);
    }

    function onMenuItemClick(event) {
      var newPageName = event.currentTarget.dataset.targetPage;

      //Site.state.trigger(Site.state.NAVIGATE_TO, newPageURL);
      //event.preventDefault();
    }

    function onMobileMenuSwitch(event) {
      $("body").toggleClass("mobile-menu-open");
    }

    function removePreloader(event, pageName) {
      //if (Site.router.getCurrentPage() === pageName) {
        $(".preloader").fadeOut(1000);
      //}
    }

    return initCallback;
})();

document.addEventListener("DOMContentLoaded", Site.init);
