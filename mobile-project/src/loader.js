/**
 * @file 前端加载文件
 * Created by xuzheng on 15/12/17.
 */
(function (global, moduleConfigUrl) {
    'use strict';

    //标识是否ready,即依赖配置文件moduleConfigUrl是否加载完成
    var isReady = false;
    //已载入成功的模块 {modName: exports}
    var loadedMods = {};
    //正在加载的模块 {modName: 1}
    var loadingMods = {};
    //在ready前调用define,require时需要进入队列等待
    var readyWaitList = [];
    //加载资源的根目录
    var root_path = '';
    //文件目录 注意: module_name中的目录结构不算
    var dir_path = '';

    //是否不合并加载
    var enableCombo = false;
    var maxComboNum = 15;
    var comboSymbol = '??';

    //正向依赖关系，取moduleConfigUrl.deps值
    var hashDependency = {};
    /**
     * 反向依赖关系，{ modName: [modName] }
     */
    var hashReverseDependency = {};
    var callbacksMap = {};
    // hash和content.length的管理
    var mgrKey = '~rv';
    var cachePrefix = 'm~';
    // 是否debug,debug不合并加载
    var isDebug = (function () {
        var searchStr = location.search
            .replace(/^\?/, '')
            .split('&')
            .join('|');
        //search中有参数render=debug，则debug
        var debugStr = 'render=debug';
        return function () {
            if (searchStr) {
                var searchReg = new RegExp('^' + searchStr + '$', 'ig');
                return searchReg.test(debugStr);
            }
            return false;
        };
    }());
    var doc = document;
    var ls = (function () {
        var _ls = window.localStorage;
        var isSupportLS = _ls && _ls.setItem && _ls.getItem && window.JSON && JSON.parse;
        return {
            set: function (key, value) {
                try {
                    if (value != null) {
                        _ls.setItem(key, value);
                    } else {
                        _ls.removeItem(key);
                    }
                } catch (e) {
                    return null;
                }
            },
            get: function (key) {
                try {
                    return _ls.getItem(key);
                } catch (e) {
                    return null;
                }
            },
            support: function () {
                return isSupportLS;
            },
            clear: function () {
                try {
                    for (var i = 0, item; item = _ls.key(i++);) { 
                        if (item && item.indexOf(cachePrefix) > -1) {
                            _ls.removeItem(item);
                            i--;
                        } 
                    };
                } catch (e) {
                    return null;
                }
            }
        };
    }());
    var moduleMgr = (function () {
        // 本地资源 { modName: { v:hash, l: content.length } }
        var resources = {};
        // manifest.js中version属性
        var revision = null;
        
        var nop = function () {
        };
        function getCacheKey(key) {
            return cachePrefix + key;
        }

        /**
         * 更新缓存信息
         *  1、新旧hash值不匹配
         *  2、长度不一致
         *  3、调试模式
         */
        function updateWholeCache() {
            var isDelete;
            var newVersion;
            var oldVersion;
            for (var k in resources) {
                if (resources.hasOwnProperty(k)) {
                    isDelete = 0;
                    oldVersion = resources[k]['v'];
                    newVersion = revision[k];
                    if (
                        (oldVersion != newVersion) ||
                        (!ls.get(getCacheKey(k))) ||
                        (ls.get(getCacheKey(k)).length != resources[k]['l']) ||
                        isDebug()
                    ) {
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
                } catch (ex) {}
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
    })();
    function g_eval(src, url) {
        //try {
        if (url) {
            src += '\n //# sourceURL=' + url;
        }
        eval(src);
        //} catch (e) {
        //    console.log(e);
        //}
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
    function array_remove(arr, getFn) {
        for (var count = 0, i = 0, n = getArrayLength(arr); i < n; ++i) {
            if (getFn(arr[i])) {
                arr.splice(i--, 1);
                count++;
            }
        }
        return count;
    }
    function filterModules(modules, hashMap) {
        array_remove(modules, function (modName) {
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
            if (!(loadingMods[name] ||
                loadedMods[name] ||
                loadWaitMap[name])) {
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
        //按字母排序,优化http缓存
        mods.sort(function (a, b) {
            return a <= b;
        });
        mods = processCachedMods(mods);
        var paths = parseModsPath(mods);
        for (var n = getArrayLength(paths), i = 0; i < n; i++) {
            loadScript(paths[i]);
        }
    }
    //生成合并请求
    function parseModsPath(mods) {
        var paths = [];
        var i;
        var n;
        for (i = 0, n = getArrayLength(mods); i < n; i++) {
            paths.push(dir_path + mods[i].replace(/.js$/, '_' + moduleMgr.getVersion(mods[i]) + '.js'));
        }
        if (enableCombo) {
            var urls = [];
            var num = Math.ceil(getArrayLength(paths) / maxComboNum);
            while (num--) {
                urls.push(root_path + comboSymbol + paths.splice(0, maxComboNum).join(','));
            }
            return urls;
        } else {
            for (i = 0, n = getArrayLength(paths); i < n; i++) {
                paths[i] = root_path + paths[i];
            }
            return paths;
        }
    }
    function getEvalSourceUrl(modName) {
        return root_path + dir_path + modName;
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
                    g_eval(cacheMod, getEvalSourceUrl(modName));
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
        //为了去重
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
        return root_path + imgPath;
    };

    // mod的依赖项 {modName: countDown}
    var counterMap = {};

    /**
     * 定义模块
     *  1、执行模块的前提是所有dep执行；
     *  2、当前模块加载之后，调用依赖当前模块的modName的countDown
     * @param {string} modName 
     * @param {Function} factory 
     */
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
                var str = 'define(\"' + modName + '\",' + factory.toString() + ')';
                moduleMgr.update(modName, str);
            }
        } else {
            // todo 未知模块载入需要上报日志
        }
    }
    function initModule(modName, factory) {
        var exportsObj = {};
        var modExports = factory(require, exportsObj);
        if ('undefined' === typeof modExports) {
            modExports = exportsObj;
        }
        loadedMods[modName] = modExports;
        // TODO: hurry 暂时只处理spa的css
        // if (modName.indexOf('/_pluginCss/') > -1 && modName.indexOf('/compile_spa/') > -1) {
        if (modName.indexOf('/_pluginCss/') > -1) {
            loadCss(modName, modExports);
        }
        var callbacks = callbacksMap[modName];
        for (var i = 0, n = getArrayLength(callbacks); i < n; i++) {
            callbacks[i](modExports);
        }
        callbacks.length = 0;
    }

    // 倒计时
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
    };

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
        root_path = config.root_path;
        dir_path = config.dir_path;
        enableCombo = config.enable_combo;
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
    function ready_require() {
        if (isReady) {
            require.apply(null, arguments);
        } else {
            readyWaitList.push([2, arguments]);
        }
    }
    function ready_define(modName, factory) {
        if (isReady) {
            define.apply(null, arguments);
        } else {
            readyWaitList.push([1, arguments]);
        }
    }
    ready_require['_config'] = function (json) {
        // hurry: 需要重新加载前端资源
        if (json.reload_data) {
            ls.clear();
        }
        initConfig(json);
        window[configCb] = null;
        ready();
    };
    function getRandom() {
        return new Date().getTime().toString(36) + (((1 + Math.random()) * 0x10000) | 0).toString(36).substring(1);
    }
    //加时间戳清缓存
    loadScript(moduleConfigUrl + '?t=' + getRandom());
    global.require = ready_require;
    global.define = ready_define;
})(
    window,
    '/v2/resources/manifest.js'
);