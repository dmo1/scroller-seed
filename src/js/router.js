"use strict";

var Site = Site || {};
Site.router = (function() {
  var $ajaxifyContainer,
    defaultPage = "home",
    pageState = {
      currentPage: "",
      loadedPage: ""
    };

  var publicInterface = {
    startRouting: function(ajaxifyContainer) {
      var currentPage = defaultPage;

      $ajaxifyContainer = $(ajaxifyContainer);
      $ajaxifyContainer.ajaxify({
        requestDelay: 500,
        aniTime: 500,
        aniParams: {
          opacity: 0
        }
      });
      $(window).on('pronto.request', function(event, eventInfo){
          console.debug(event);
      })
      this.setCurrentPage(currentPage);
      Site.state.trigger(Site.state.START_ROUTING, currentPage);
      Site.state.on(Site.state.NAVIGATE_TO, publicInterface.navigateTo);
    },
    navigateTo: function(event, pageURL) {
      $ajaxifyContainer.ajaxify(pageURL);
    },
    getCurrentPage: function() {
      return pageState.currentPage;
    },
    getLoadedPage: function() {
      return pageState.loadedPage;
    },
    setCurrentPage: function(pageName) {
      pageState.currentPage = pageName;
    },
    setLoadedPage: function(pageName) {
      pageState.loadedPage = pageName;
    }
  };

  return publicInterface;
}());
