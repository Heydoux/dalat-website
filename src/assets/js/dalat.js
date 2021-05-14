document.addEventListener("DOMContentLoaded", function() {
  var iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; i++) {
    iframes[i].classList.add("toto");
  }
});
