var account_menu_display = false;

function open_drawer_menu() {/*
    $(".side-menu").anim("left", "30%");*/
    $(".side-menu").animate({right: '0'});
}
function open_account_menu() {
    account_menu_display = !account_menu_display;
    if ($(window).width() > 768) {
        $(".account-menu").css(
            "display",
            account_menu_display ? "flex" : "none"
        );
    } else {
        $(".header").css("height", account_menu_display ? $('.account-menu').height()+50+'px' : "50px");
    }
}
function close_account_menu(){
    $(".header").css("height", "50px");
}
function close_drawer_menu(){
    /*$(".side-menu").css("left", "100%");*/
    $(".side-menu").animate({right: '-100%'});
}

$(document).ready(function() {
    if ($(window).width() > 768) {
        $(window).click(function() {
            if (account_menu_display) {
                $(".account-menu").css("display", "none");
            }
        });
        $(".account-menu").click(function(event) {        
            event.stopPropagation();
        });
        $(".account").click(function(event) {        
            event.stopPropagation();
        });
    } else {
        $(window).click(function() {
            $(".side-menu").css("left", "100%");
        });
        $(".side-menu").click(function(event) {        
            event.stopPropagation();
        });
        $(".fa-bars").click(function(event) {        
            event.stopPropagation();
        });
    }
    $('.side-menu-item-title').click(function () {

        if ( $(this).find('.side-menu-icon').hasClass('fa-angle-left')){
            $(this).find('.side-menu-icon').removeClass('fa-angle-left').addClass('fa-angle-down');
            $(this).parent().find('.side-menu-sub-menu').fadeIn(100)
        }else {
            $(this).find('.side-menu-icon').removeClass('fa-angle-down').addClass('fa-angle-left');
            $(this).parent().find('.side-menu-sub-menu').fadeOut(100)
        }

    });
});
