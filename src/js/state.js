"use strict";

var Site = Site || {};
Site.state = (function() {
    var publicInterface = {
        NEW_CURRENT_PAGE: "NEW_CURRENT_PAGE",
        START_ROUTING: "PAGE_START_ROUTING",
        PAGE_START_PRELOADING: "PAGE_START_PRELOADING",
        PAGE_HTML_PRELOADED: "PAGE_HTML_PRELOADED",
        PAGE_PRELOADED: "PAGE_PRELOADED",
        PAGE_START_INITIALIZATION: "PAGE_START_INITIALIZATION",
        PAGE_INITIALIZED: "PAGE_INITIALIZED",
        NAVIGATE_TO: "NAVIGATE_TO",

        on: function(eventName, handler) {
          $("html").on(eventName, handler);
        },
        trigger: function(eventName, payload) {
          console.debug(eventName, payload);
          $("html").trigger(eventName, payload);
        }
    };

    //private methods

    return publicInterface;
}());
