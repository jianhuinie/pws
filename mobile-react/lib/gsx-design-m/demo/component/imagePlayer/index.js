define(function (require) {
    var imagePlayer = require('src/biz/component/imagePlayer/index');
    var lazyLoadImage = require('src/component/lazyLoadImage/index');

    var imgUrls = [
        'https://imgs.genshuixue.com/41979956_b18b9flj.jpeg',
        'https://imgs.genshuixue.com/41735389_8oud6ene.jpeg',
        'https://imgs.genshuixue.com/41371792_zqqb5e87.jpeg',
        'https://imgs.genshuixue.com/41781200_5eif90ii.jpeg'
    ];

    return function () {
        var imgs = '';
        imgUrls.forEach(function (url, index) {
            imgs += ''
                + '<li>'
                +   '<img class="img" data-src="' + url + '" data-inde="' + index + '"/>'
                + '</li>';
        });
        $('.demo-view').html(
            ''
            + '<ul>'
            +   imgs
            + '</ul>'
        )
        .on('click', '.img', function (event) {
            var target = $(event.target);
            imagePlayer(imgUrls, target.data('index'));
        });
        setTimeout(function () {
            lazyLoadImage.init();
        });
        var editor = CodeMirror.fromTextArea($('.code-mirror')[0], {
            lineNumbers: true
        });
        editor.setOption('theme', 'monokai');
    };
});