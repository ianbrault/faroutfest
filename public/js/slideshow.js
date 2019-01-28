/*
 * js/slideshow.js
 */

$(function() {
    $("#slideshow img:gt(0)").hide();
    setInterval(function() {
        $("#slideshow :first-child").fadeOut(600)
            .next("img").fadeIn(600)
            .end().appendTo("#slideshow");
    }, 3000);
});
