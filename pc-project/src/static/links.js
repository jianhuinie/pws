define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var etpl = require('cobble/util/etpl');

var i = 2;
    var render = etpl.compile(
        '<!-- for: ${links} as ${link}, ${number} -->'
     +    '<dt>'
     +      '<a id="${number}"></a>'
     +        '${link.catname}'
     +           '</dt>'
     +           '<dd>'
     +   '<!-- for: ${link.data} as ${data} -->'
     +     '<a href="${data.link}" target="_blank">${index} ${data.title}</a>'
     +   '<!-- /for -->'
     +     '</dd>'
     +  '<!-- /for -->'
    );

    exports.init = function () {

        var links = store.get('links');


        var i = 0;
        var newarray = [];
        for (var data in links) {
                newarray[i] = links[data];
                i++
                // console.log(newarray);
        };


        var el = render({
            links: newarray
        });

        $(el).appendTo('.exp');
    };

});