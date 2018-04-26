/**
 * 加载js
 */
const loadStatus = {
    _list: {},
    is: function (url) {
        return this._list[url];
    },
    set: function (url) {
        this._list[url] = true;
    }
};

const loadScript = function (url, async) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = !async;
    script.src = url;

    document.head.appendChild(script);

    return script;
};

const sync = function (url) {
    if (!loadStatus.is(url)) {
        loadScript(url);
    }
    
    loadStatus.set(url);
};

const async = function (url, done) {
    if (loadStatus.is(url)) {
        if (done) {
            done();
        }
    } else {
        const loadJs = loadScript(url, false);
        if (document.all) {
            // IE
            loadJs.onreadystatechange = function () {
                if (loadJs.readyState === 'loaded' || loadJs.readyState === 'complete') {
                    loadStatus.set(url);
                    if (done) {
                        done();
                    }
                }
            };
        } else {
            loadJs.onload = function () {
                loadStatus.set(url);
                if (done) {
                    done();
                }
            };
        }
    }
};

const loadCss = function (path) {
    const doc = document;
    let styleElement = doc.getElementById(path);
    if (!styleElement) {
        styleElement = doc.createElement('style');
        styleElement.id = path;
        styleElement.type = 'text/css';
        styleElement.href = path;
        doc.getElementsByTagName('head')[0].appendChild(styleElement);
    }
};

export default {
    sync: sync,
    async: async,
    loadCss: loadCss
};