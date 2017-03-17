function sayHello() {
    $('.button').click(function () {
        alert('hello');
    })
}

function canvasDraw () {
    var draw = $('#test-canvas');
    if (draw.getContext) {
        var context = draw.getContext("2d");
        context.strokeStyle = "red";
        context.fillStyle = "#0000ff";
        context.fillRect(10, 10, 50, 50);
    }
}

$(document).ready(function () {
    sayHello();
    canvasDraw();
    var width = $('.box').width();
    console.log(width);
    var innerWidth = $('.box').innerWidth();
    console.log(innerWidth);
    var outWidth = $('.box').outerWidth(true);
    console.log(outWidth);
    var offsetTop = $('.box').offset().top;
    console.log(offsetTop);
});



$(window).scroll(function () {
    var imgs = $('img[data-src]');
    var viewHeight = $(window).innerHeight();
    var viewHeightMin = $(window).scrollTop();
    var viewHeightMax = viewHeightMin + viewHeight;
    imgs.each(function () {
        var offsetTop = $(this).offset().top || $(this).parent().offset().top;
        var height = $(this).height() || $(this).parent().height();

        console.log(offsetTop);
        console.log(height);
        console.log(viewHeightMax);
        console.log(viewHeightMin);
        // $(this).prop('src', $(this).data('src')).removeAttr('data-src')
        if ((viewHeightMax >= offsetTop - height - viewHeight) && (viewHeightMin <= offsetTop + height + viewHeight)) {
            $(this).attr('src', $(this).data('src')).removeAttr('data-src');
        }
    });
});