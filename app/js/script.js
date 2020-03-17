//Scripts
$(".marquee").each(function () {

    var marquee = $(this);
    marquee.css({"overflow": "hidden", "width": "100%"});

// оболочка для текста ввиде span (IE не любит дивы с inline-block)
    marquee.wrapInner("<span>");
    marquee.find("span").css({ "width": "auto", "display": "inline-block", "text-align":"center" });
    marquee.append(marquee.find("span").clone()); // тут у нас два span с текстом

    marquee.wrapInner("<div>");
    marquee.find("div").css("width", "2000%");

    var reset = function() {
        $(this).css("margin-left", "0%");
        $(this).animate({ "margin-left": "-100%" }, 25000, 'linear', reset);
    };

    reset.call(marquee.find("div"));
});






//Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
// scroll body to 0px on click
$('#back-to-top').click(function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});

//Carousel responsive
$(function () {


    $.getJSON("//ip-api.com/json/?lang=ru", function(data) {
        var data_body = "";
        $.each(data, function(k, v) {
            data_body += "<b>" + k + "</b> : <i>" + v + "</i><br />";
        });
        $(".city").text(data.city);
        // Google Map
        var locations = [
            [data_body, data.lat, data.lon, 2]  //Данные из IP API
        ];
    });


    var jcarousel = $('.jcarousel');

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 991) {
                width = width / 2;
            } else if (width >= 767) {
                width = width;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 8000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });

//Match Height
    $(function () {
        $('.item').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });

    //Change active items menu on change
    $(document).on("scroll", onScroll);

    $("a").click(function (e) {
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");

        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function () {
            //window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });

    });

});


//Change active items menu on change
var menu_selector = ".ubermenu";

function onScroll() {
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a").each(function () {
        var hash = $(this).attr("href");
        // console.log(hash);
        var target = $(hash);
        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}
