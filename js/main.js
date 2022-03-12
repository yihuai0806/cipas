var userAgent, ieReg, ie;
userAgent = window.navigator.userAgent,
(ie = (ieReg = /msie|Trident.*rv[ :]*11\./gi).test(userAgent)) && $(".img-container").each(function() {
    var t = $(this)
      , e = t.find("img").prop("src");
    e && t.css("backgroundImage", "url(" + e + ")").addClass("custom-object-fit")
});

var offset = 600
  , offset_opacity = 5e4
  , scroll_top_duration = 700
  , $back_to_top = $(".cd-top");
$(window).scroll(function() {
    $(this).scrollTop() > offset ? $back_to_top.addClass("cd-is-visible") : $back_to_top.removeClass("cd-is-visible cd-fade-out"),
    $(this).scrollTop() > offset_opacity && $back_to_top.addClass("cd-fade-out")
}),
$back_to_top.on("click", function(t) {
    t.preventDefault(),
    $("body,html").animate({
        scrollTop: 0
    }, scroll_top_duration)
});

//popup
$(document).scroll(function () {
	var y = $(this).scrollTop();
		if (y > 1200) {
			$('.topMenu').fadeIn();
		} else {
			$('.topMenu').fadeOut();
	}
});

$('a[href*="#"]:not([href="#"])').click(function() {
  var offset = -112; // <-- change the value here
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top + offset
          }, 1000);
          return false;
      }
  }
});
