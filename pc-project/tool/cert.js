
(function () {

    function parseQuery(queryStr) {

        var result = { };

        if (queryStr.charAt(0) === '?') {
            queryStr = queryStr.substr(1);
        }

        var arr = queryStr.split('&');
        for (var i = 0, len = arr.length; i < len; i++) {
            var parts = arr[i].split('=');
            if (parts.length === 2) {
                var key = parts[0];
                if (key) {
                    result[key] = decodeURIComponent(parts[1]);
                }
            }
        }

        return result;
    };

    function getImageUrl(url, width, height) {

        var result = [ url ];

        if (width > 0 || height > 0) {

            result.push('@0e_');

            if (width > 0) {
                result.push(width, 'w_');
            }
            if (height > 0) {
                result.push(height, 'h_');
            }

            var extName = url.split('.').pop();

            if (extName === 'gif') {
                extName = 'jpg';
            }

            result.push('1c_0i_1o_90Q_1x.', extName);
        }

        return result.join('');

    }

    var scripts = document.getElementsByTagName('script');
    var url = scripts[scripts.length - 1].src;
    var index = url.indexOf('?');

    var query = index > -1
              ? parseQuery(url.substr(index))
              : { };

    var type = query.type || 'co';
    var width = query.width;
    var height = query.height;

    var typeMap = {
        co: 'http://img.gsxservice.com/0cms/d/file/content/2015/03/550a518b9028f.png',
        edu: 'http://img.gsxservice.com/0cms/d/file/content/2015/03/550a518bb761f.png'
    };

    var url = typeMap[type];

    var code = '<a class="gsx-cert" href="http://www.genshuixue.com" target="_blank">'
             +     '<img src="' + getImageUrl(url, width, height) + '" />'
             + '</a>';

    document.write(code);

})();
