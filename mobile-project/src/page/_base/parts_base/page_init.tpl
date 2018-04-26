<script>
    (function () {
        function createModFn(module_name) {
            var params = [];
            for (var i = 1, n = arguments.length; i < n; i++) {
                params.push(arguments[i]);
            }
            return function (modInitFn) {
                if ('function' == typeof modInitFn) {
                    modInitFn.apply(null, params);
                } else if ('object' == typeof modInitFn && modInitFn.init) {
                    modInitFn.init.apply(null, params);
                }
            }
        }

        var modFns = [];
        var modules = [];

        if (window.page_module) {
            modules.push(page_module);
            modFns.push(createModFn(page_module, page_data));
        }

        if (window.other_modules) {
            for (var i = 0, n = other_modules.length; i < n; i++) {
                modules.push(other_modules[i]);
                modFns.push(createModFn(other_modules[i]));
            }
        }
        function initMods(mods) {
            for (var i = 0, n = mods.length; i < n; i++) {
                if (modFns[i]) {
                    modFns[i](mods[i]);
                }
            }
        }

        var req = require;
        req(modules, function () {
            var args = arguments;
            if (window.gsx_ready) {
                gsx_ready(function () {
                    initMods.call(null, args);
                });
            } else {
                initMods.call(null, args);
            }
        });
    })();
</script>