var Site = Site || {};
Site.util = {
  baseURL: "",
  addClassTemporarily: function(element, className, timing) {
    element.classList.add(className);
    setTimeout(function() {
      element.classList.remove(className);
    }, timing);
  },
  scrollToTop: function(scrollDuration) {
      var scrollStep = -window.scrollY / (scrollDuration / 15),
          scrollInterval = setInterval(function(){
          if ( window.scrollY != 0 ) {
              window.scrollBy( 0, scrollStep );
          }
          else clearInterval(scrollInterval);
      },15);
  },
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
};
