$(document).ready(function() {
    var $svg = $("svg").drawsvg({
        callback: function() {
            if ($(window).width()>768){
                $('.landing').css({'top':'15vh','right':'calc(25% - 137px)'});
            } else {
                $('.landing').css('top','15vh');
            }
            $('.left').css('left', '0');
            $('.right').css('right', '0');
        }
    });
    $svg.drawsvg("animate");
});
