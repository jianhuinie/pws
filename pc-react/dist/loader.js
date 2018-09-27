(function (global, moduleConfigUrl) {
    'use strict';
    var isReady = false;
    var loadedMods = {};
    var loadingMods = {};
    var readyWaitList = [];
    var rootPath = '';
    var dirPath = '';
    var enableCombo = false;
    var maxComboNum = 15;
    var comboSymbol = '??';
    var hashDependency = {};
    var hashReverseDependency = {};
    var callbacksMap = {};
    var mgrKey = '~rv';
    var cachePrefix = 'm~';
    var isDebug = function () {
        var searchStr = location.search.replace(/^\?/, '').split('&').join('|');
        var debugStr = 'render=debug';
        return function () {
            if (searchStr) {
                var searchReg = new RegExp('^' + searchStr + '$', 'ig');
                return searchReg.test(debugStr);
            }
            return false;
        };
    }();
    var doc = document;
    var ls = function () {
        var _ls = window.localStorage;
        var isSupportLS = _ls && _ls.setItem && _ls.getItem && window.JSON && JSON.parse;
        return {
            set: function set(key, value) {
                if (value != null) {
                    try {
                        _ls.setItem(key, value);
                    } catch (e) {
                        _ls.removeItem(key);
                    }
                } else {
                    _ls.removeItem(key);
                }
            },
            get: function get(key) {
                try {
                    return _ls.getItem(key);
                } catch (e) {
                    return null;
                }
            },
            support: function support() {
                return isSupportLS;
            },
            clear: function clear() {
                try {
                    for (var i = 0, item; item = _ls.key(i++);) {
                        if (item && item.indexOf(cachePrefix) > -1) {
                            _ls.removeItem(item);
                            i--;
                        }
                    }
                    ;
                } catch (e) {
                    return null;
                }
            }
        };
    }();
    var moduleMgr = function () {
        var resources = {};
        var revision = null;
        var nop = function nop() {
        };
        function getCacheKey(key) {
            return cachePrefix + key;
        }
        function updateWholeCache() {
            var isDelete;
            var newVersion;
            var oldVersion;
            for (var k in resources) {
                if (resources.hasOwnProperty(k)) {
                    isDelete = 0;
                    oldVersion = resources[k]['v'];
                    newVersion = revision[k];
                    if (oldVersion != newVersion || !ls.get(getCacheKey(k)) || ls.get(getCacheKey(k)).length != resources[k]['l'] || isDebug()) {
                        isDelete = 1;
                    }
                    if (isDelete) {
                        resources[k] = undefined;
                        delete resources[k];
                        ls.set(getCacheKey(k), null);
                    }
                }
            }
        }
        function init(response) {
            revision = response;
            if (ls.support()) {
                resources = ls.get(getCacheKey(mgrKey));
                if (resources) {
                    resources = JSON.parse(resources);
                } else {
                    resources = {};
                }
                updateWholeCache();
                try {
                    ls.set(getCacheKey(mgrKey), JSON.stringify(resources));
                } catch (ex) {
                }
            }
        }
        function getCacheItem(name) {
            return ls.get(getCacheKey(name));
        }
        function updateCacheItem(name, value) {
            var data = resources[name] = {
                v: revision[name],
                l: value.length
            };
            if (data.v) {
                ls.set(getCacheKey(name), value);
                ls.set(getCacheKey(mgrKey), JSON.stringify(resources));
            }
        }
        function getVersion(modName) {
            return revision[modName];
        }
        return {
            init: ls.support() ? init : nop,
            get: ls.support() ? getCacheItem : nop,
            update: ls.support() ? updateCacheItem : nop,
            getVersion: getVersion
        };
    }();
    function gEval(src, url) {
        if (url) {
            src += '\n // # sourceURL=' + url;
        }
        eval(src);
    }
    function getArrayLength(array) {
        return array.length;
    }
    function parseDepModules(modName, targetArr, hashMap) {
        hashMap = hashMap || {};
        targetArr = targetArr || {};
        var depMods = hashDependency[modName];
        if (depMods) {
            var n = getArrayLength(depMods);
            var i = 0;
            for (; i < n; i++) {
                parseDepModules(depMods[i], targetArr, hashMap);
            }
        }
        if (!hashMap[modName]) {
            targetArr.push(modName);
            hashMap[modName] = 1;
        }
    }
    function arrayRemove(arr, getFn) {
        for (var count = 0, i = 0, n = getArrayLength(arr); i < n; ++i) {
            if (getFn(arr[i])) {
                arr.splice(i--, 1);
                count++;
            }
        }
        return count;
    }
    function filterModules(modules, hashMap) {
        arrayRemove(modules, function (modName) {
            return hashMap.hasOwnProperty(modName);
        });
    }
    var _timer = null;
    var loadWaitList = [];
    var loadWaitMap = {};
    function loadModules(mods) {
        var name;
        for (var i = 0, n = getArrayLength(mods); i < n; i++) {
            name = mods[i];
            if (!(loadingMods[name] || loadedMods[name] || loadWaitMap[name])) {
                loadWaitList.push(name);
                loadWaitMap[name] = 1;
            }
        }
        if (!_timer) {
            _timer = window.setTimeout(loadWaitListModules, 0);
        }
    }
    function loadWaitListModules() {
        _timer = null;
        var mods = loadWaitList;
        loadWaitList = [];
        loadWaitMap = {};
        mods.sort(function (a, b) {
            return a <= b;
        });
        mods = processCachedMods(mods);
        var paths = parseModsPath(mods);
        for (var n = getArrayLength(paths), i = 0; i < n; i++) {
            loadScript(paths[i]);
        }
    }
    function parseModsPath(mods) {
        var paths = [];
        var i;
        var n;
        for (i = 0, n = getArrayLength(mods); i < n; i++) {
            paths.push(dirPath + mods[i].replace(/.js$/, '_' + moduleMgr.getVersion(mods[i]) + '.js'));
        }
        if (enableCombo) {
            var urls = [];
            var num = Math.ceil(getArrayLength(paths) / maxComboNum);
            while (num--) {
                urls.push(rootPath + comboSymbol + paths.splice(0, maxComboNum).join(','));
            }
            return urls;
        } else {
            for (i = 0, n = getArrayLength(paths); i < n; i++) {
                paths[i] = rootPath + paths[i];
            }
            return paths;
        }
    }
    function getEvalSourceUrl(modName) {
        return rootPath + dirPath + modName;
    }
    function processCachedMods(mods) {
        var newMods = [];
        if (ls.support()) {
            var modName;
            var cacheMod;
            for (var i = 0, n = getArrayLength(mods); i < n; i++) {
                modName = mods[i];
                cacheMod = moduleMgr.get(modName);
                if (!!cacheMod) {
                    gEval(cacheMod, getEvalSourceUrl(modName));
                } else {
                    newMods.push(modName);
                }
            }
        } else {
            newMods = mods;
        }
        return newMods;
    }
    function requireModules(mods, callback) {
        var needMods = [];
        var hashMods = {};
        for (var i = 0, n = getArrayLength(mods); i < n; i++) {
            if (hashReverseDependency.hasOwnProperty(mods[i])) {
                parseDepModules(mods[i], needMods, hashMods);
            } else {
                throw Error('发现未知模块: ' + mods[i]);
            }
        }
        filterModules(needMods, loadedMods);
        filterModules(needMods, loadingMods);
        registerRequireCallback(mods, callback);
        loadModules(needMods);
    }
    function registerRequireCallback(requireMods, callback) {
        var requireModsLength = getArrayLength(requireMods);
        var fn = countDown(requireModsLength, function () {
            var modsExports = [];
            for (var i = 0, n = requireModsLength; i < n; i++) {
                modsExports.push(loadedMods[requireMods[i]]);
            }
            if ('function' === typeof callback) {
                callback.apply(null, modsExports);
            }
        });
        for (var i = 0, n = requireModsLength; i < n; i++) {
            if (loadedMods[requireMods[i]]) {
                fn();
            } else {
                callbacksMap[requireMods[i]].push(fn);
            }
        }
    }
    function getModule(modName) {
        return loadedMods[modName];
    }
    function require(mods, callback) {
        if (getArrayLength(arguments) === 1) {
            return getModule(mods);
        } else {
            requireModules(mods, callback);
        }
    }
    require.toUrl = function (imgPath) {
        return rootPath + imgPath;
    };
    var counterMap = {};
    function define(modName, factory) {
        if (!loadedMods.hasOwnProperty(modName)) {
            var depMods = hashDependency[modName];
            var depModsLength = getArrayLength(depMods);
            var reverseMods = hashReverseDependency[modName];
            var counter = countDown(depModsLength, function () {
                initModule(modName, factory);
                for (var j = getArrayLength(reverseMods); j--;) {
                    var rModName = reverseMods[j];
                    if (counterMap[rModName]) {
                        counterMap[rModName]();
                    }
                }
            });
            if (counter) {
                counter._name = modName;
            }
            counterMap[modName] = counter;
            for (var k = depMods.length; k--;) {
                if (loadedMods.hasOwnProperty(depMods[k])) {
                    counter();
                }
            }
            if (ls.support()) {
                var str = 'define("' + modName + '",' + factory.toString() + ')';
                moduleMgr.update(modName, str);
            }
        } else {
        }
    }
    function initModule(modName, factory) {
        var exportsObj = {};
        var modExports = factory(require, exportsObj);
        if ('undefined' === typeof modExports) {
            modExports = exportsObj;
        }
        loadedMods[modName] = modExports;
        if (modName.indexOf('/_pluginCss/') > -1) {
            loadCss(modName, modExports);
        }
        var callbacks = callbacksMap[modName];
        for (var i = 0, n = getArrayLength(callbacks); i < n; i++) {
            callbacks[i](modExports);
        }
        callbacks.length = 0;
    }
    function countDown(n, fn) {
        if (!n) {
            fn();
        } else {
            return function () {
                --n || fn();
            };
        }
    }
    function loadScript(url) {
        var script = doc.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = !0;
        script.src = url;
        doc.getElementsByTagName('head')[0].appendChild(script);
    }
    function loadCss(path, strCss) {
        var doc = document;
        var styleElement = doc.getElementById(path);
        if (!styleElement) {
            styleElement = doc.createElement('style');
            styleElement.id = path;
            styleElement.type = 'text/css';
            var textNode = doc.createTextNode(strCss);
            styleElement.appendChild(textNode);
            doc.getElementsByTagName('head')[0].appendChild(styleElement);
        }
    }
    ;
    var configCb = 'gsx_module_config';
    function initConfig(config) {
        cachePrefix = config.prefixKey + '~';
        var dependencyMap = config.deps;
        moduleMgr.init(config.version);
        var reverseConfig = {};
        for (var modName in dependencyMap) {
            if (dependencyMap.hasOwnProperty(modName)) {
                var arr = dependencyMap[modName];
                callbacksMap[modName] = [];
                reverseConfig[modName] = reverseConfig[modName] || [];
                for (var j = getArrayLength(arr); j--;) {
                    var depMod = arr[j];
                    if (reverseConfig[depMod]) {
                        reverseConfig[depMod].push(modName);
                    } else {
                        reverseConfig[depMod] = [modName];
                    }
                }
            }
        }
        rootPath = config.rootPath || location.origin + '/';
        dirPath = config.dirPath;
        enableCombo = config.enableCombo;
        hashDependency = dependencyMap;
        hashReverseDependency = reverseConfig;
        if (isDebug()) {
            enableCombo = false;
        }
    }
    function ready() {
        isReady = true;
        global.require = require;
        global.define = define;
        var item;
        while (item = readyWaitList.shift()) {
            if (item[0] == 1) {
                define.apply(null, item[1]);
            } else {
                require.apply(null, item[1]);
            }
        }
    }
    function requireReady() {
        if (isReady) {
            require.apply(null, arguments);
        } else {
            readyWaitList.push([
                2,
                arguments
            ]);
        }
    }
    function defineReady(modName, factory) {
        if (isReady) {
            define.apply(null, arguments);
        } else {
            readyWaitList.push([
                1,
                arguments
            ]);
        }
    }
    requireReady['_config'] = function (json) {
        if (json.reloadData) {
            ls.clear();
        }
        initConfig(json);
        window[configCb] = null;
        ready();
    };
    function getRandom() {
        return new Date().getTime().toString(36) + ((1 + Math.random()) * 65536 | 0).toString(36).substring(1);
    }
    loadScript(moduleConfigUrl + '?t=' + getRandom());
    global.require = requireReady;
    global.define = defineReady;
}(window, 'asset/manifest.js'));