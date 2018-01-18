;
var __WAServiceStartTime__ = Date.now();
(function(global) {
    var WeixinJSBridge = function(e) {
            if ("function" == typeof logxx && logxx("jsbridge start"), e.navigator && e.navigator.userAgent) {
                var t = e.navigator.userAgent;
                if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1) {
                    var n = e.WeixinJSBridge;
                    return delete e.WeixinJSBridge, n
                }
            }
            var o = e.hasOwnProperty("document"),
                r = {},
                i = 0,
                a = {},
                c = {};
            if (o) {
                var t = e.navigator.userAgent;
                !(-1 != t.indexOf("Android"))
            }
            var u = e.__wxConfig || {},
                s = e.webkit,
                f = e.WeixinJSCore;
            delete e.webkit, ("android" === u.platform || "ios" === u.platform && u.clientVersion) && delete e.WeixinJSCore;
            var l = function(e, t, n) {
                    if (f) {
                        var o = f.invokeHandler(e, t, n);
                        if (void 0 !== o && "function" == typeof r[n] && "" !== o) {
                            try {
                                o = JSON.parse(o)
                            } catch (e) {
                                o = {}
                            }
                            r[n](o), delete r[n]
                        }
                    } else s.messageHandlers.invokeHandler.postMessage({
                        event: e,
                        paramsString: t,
                        callbackId: n
                    })
                },
                d = function(e, t, n) {
                    f ? f.publishHandler(e, t, n) : s.messageHandlers.publishHandler.postMessage({
                        event: e,
                        paramsString: t,
                        webviewIds: n
                    })
                },
                p = function(e, t, n) {
                    t = m(t);
                    var o = JSON.stringify(t || {}),
                        a = ++i;
                    r[a] = n, l(e, o, a)
                },
                h = function(e, t) {
                    t = _(t);
                    var n = r[e];
                    "function" == typeof n && n(t), delete r[e]
                },
                v = function(e, t) {
                    a[e] = t
                },
                g = function(e, t, n) {
                    n = n || [], n = JSON.stringify(n);
                    var o = "custom_event_" + e,
                        r = JSON.stringify(t);
                    d(o, r, n)
                },
                y = function(e, t) {
                    c["custom_event_" + e] = t
                },
                b = function(e, t, n, o) {
                    t = _(t);
                    var r;
                    "function" == typeof(r = -1 != e.indexOf("custom_event_") ? c[e] : a[e]) && r(t, n, o)
                },
                m = function(e) {
                    if (null == e) return e;
                    var t = [];
                    for (var n in e) {
                        var o = e[n];
                        if (void 0 !== o && o instanceof ArrayBuffer && void 0 !== o.byteLength) {
                            var r = WeixinNativeBuffer.new(o);
                            r.key = n, t.push(r)
                        }
                    }
                    if (t.length > 0) {
                        for (var i = 0; i < t.length; i++) {
                            var r = t[i];
                            delete e[r.key]
                        }
                        e.__nativeBuffers__ = t
                    }
                    return e
                },
                _ = function(e) {
                    if (null == e || null == e.__nativeBuffers__) return e;
                    var t = e.__nativeBuffers__;
                    delete e.__nativeBuffers__;
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        if (null != o) {
                            var r = WeixinNativeBuffer.get(o);
                            void 0 !== r && r instanceof ArrayBuffer && (e[o.key] = r)
                        }
                    }
                    return e
                };
            return e.WeixinJSBridge = {get invokeCallbackHandler() {
                    return h
                },
                get subscribeHandler() {
                    return b
                }
            }, u && u.clientDebug && (e.WeixinJSBridge = {
                on: v,
                publish: g,
                invoke: p,
                subscribe: y,
                get invokeCallbackHandler() {
                    return h
                },
                get subscribeHandler() {
                    return b
                }
            }), {
                on: v,
                publish: g,
                invoke: p,
                subscribe: y,
                get invokeCallbackHandler() {
                    return h
                },
                get subscribeHandler() {
                    return b
                }
            }
        }(this),
        needCoreJS = !0;
    try {
        var s = new Proxy({}, {});
        needCoreJS = !1
    } catch (e) {}
    needCoreJS && function(e, t, n) {
        "use strict";
        ! function(e) {
            function t(o) {
                if (n[o]) return n[o].exports;
                var r = n[o] = {
                    exports: {},
                    id: o,
                    loaded: !1
                };
                return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
            }
            var n = {};
            t.m = e, t.c = n, t.p = "", t(0)
        }([function(e, t, n) {
            n(1), n(50), n(51), n(52), n(54), n(55), n(58), n(59), n(60), n(61), n(62), n(63), n(64), n(65), n(66), n(68), n(70), n(72), n(74), n(77), n(78), n(79), n(83), n(86), n(87), n(88), n(89), n(91), n(92), n(93), n(94), n(95), n(97), n(99), n(100), n(101), n(103), n(104), n(105), n(107), n(108), n(109), n(111), n(112), n(113), n(114), n(115), n(116), n(117), n(118), n(119), n(120), n(121), n(122), n(123), n(124), n(126), n(130), n(131), n(132), n(133), n(137), n(139), n(140), n(141), n(142), n(143), n(144), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(158), n(159), n(161), n(162), n(163), n(167), n(168), n(169), n(170), n(171), n(173), n(174), n(175), n(176), n(179), n(181), n(182), n(183), n(185), n(187), n(189), n(190), n(191), n(193), n(194), n(195), n(196), n(203), n(206), n(207), n(209), n(210), n(211), n(212), n(213), n(214), n(215), n(216), n(217), n(218), n(219), n(220), n(222), n(223), n(224), n(225), n(226), n(227), n(228), n(229), n(231), n(234), n(235), n(237), n(238), n(239), n(240), n(241), n(242), n(243), n(244), e.exports = n(245)
        }, function(e, t, o) {
            var r = o(2),
                i = o(3),
                a = o(4),
                c = o(6),
                u = o(16),
                s = o(20).KEY,
                f = o(5),
                l = o(21),
                d = o(22),
                p = o(17),
                h = o(23),
                v = o(24),
                g = o(25),
                y = o(27),
                b = o(40),
                m = o(43),
                _ = o(10),
                k = o(30),
                w = o(14),
                S = o(15),
                M = o(44),
                C = o(47),
                P = o(49),
                A = o(9),
                O = o(28),
                T = P.f,
                I = A.f,
                x = C.f,
                B = r.Symbol,
                j = r.JSON,
                E = j && j.stringify,
                R = h("_hidden"),
                D = h("toPrimitive"),
                L = {}.propertyIsEnumerable,
                F = l("symbol-registry"),
                N = l("symbols"),
                W = l("op-symbols"),
                U = Object.prototype,
                V = "function" == typeof B,
                J = r.QObject,
                K = !J || !J.prototype || !J.prototype.findChild,
                q = a && f(function() {
                    return 7 != M(I({}, "a", {
                        get: function() {
                            return I(this, "a", {
                                value: 7
                            }).a
                        }
                    })).a
                }) ? function(e, t, n) {
                    var o = T(U, t);
                    o && delete U[t], I(e, t, n), o && e !== U && I(U, t, o)
                } : I,
                G = function(e) {
                    var t = N[e] = M(B.prototype);
                    return t._k = e, t
                },
                z = V && "symbol" == typeof B.iterator ? function(e) {
                    return "symbol" == typeof e
                } : function(e) {
                    return e instanceof B
                },
                H = function(e, t, n) {
                    return e === U && H(W, t, n), _(e), t = w(t, !0), _(n), i(N, t) ? (n.enumerable ? (i(e, R) && e[R][t] && (e[R][t] = !1), n = M(n, {
                        enumerable: S(0, !1)
                    })) : (i(e, R) || I(e, R, S(1, {})), e[R][t] = !0), q(e, t, n)) : I(e, t, n)
                },
                X = function(e, t) {
                    _(e);
                    for (var n, o = b(t = k(t)), r = 0, i = o.length; i > r;) H(e, n = o[r++], t[n]);
                    return e
                },
                $ = function(e, t) {
                    return t === n ? M(e) : X(M(e), t)
                },
                Y = function(e) {
                    var t = L.call(this, e = w(e, !0));
                    return !(this === U && i(N, e) && !i(W, e)) && (!(t || !i(this, e) || !i(N, e) || i(this, R) && this[R][e]) || t)
                },
                Q = function(e, t) {
                    if (e = k(e), t = w(t, !0), e !== U || !i(N, t) || i(W, t)) {
                        var n = T(e, t);
                        return !n || !i(N, t) || i(e, R) && e[R][t] || (n.enumerable = !0), n
                    }
                },
                Z = function(e) {
                    for (var t, n = x(k(e)), o = [], r = 0; n.length > r;) i(N, t = n[r++]) || t == R || t == s || o.push(t);
                    return o
                },
                ee = function(e) {
                    for (var t, n = e === U, o = x(n ? W : k(e)), r = [], a = 0; o.length > a;) !i(N, t = o[a++]) || n && !i(U, t) || r.push(N[t]);
                    return r
                };
            V || (B = function() {
                if (this instanceof B) throw TypeError("Symbol is not a constructor!");
                var e = p(arguments.length > 0 ? arguments[0] : n),
                    t = function(n) {
                        this === U && t.call(W, n), i(this, R) && i(this[R], e) && (this[R][e] = !1), q(this, e, S(1, n))
                    };
                return a && K && q(U, e, {
                    configurable: !0,
                    set: t
                }), G(e)
            }, u(B.prototype, "toString", function() {
                return this._k
            }), P.f = Q, A.f = H, o(48).f = C.f = Z, o(42).f = Y, o(41).f = ee, a && !o(26) && u(U, "propertyIsEnumerable", Y, !0), v.f = function(e) {
                return G(h(e))
            }), c(c.G + c.W + c.F * !V, {
                Symbol: B
            });
            for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;) h(te[ne++]);
            for (var te = O(h.store), ne = 0; te.length > ne;) g(te[ne++]);
            c(c.S + c.F * !V, "Symbol", {
                for: function(e) {
                    return i(F, e += "") ? F[e] : F[e] = B(e)
                },
                keyFor: function(e) {
                    if (z(e)) return y(F, e);
                    throw TypeError(e + " is not a symbol!")
                },
                useSetter: function() {
                    K = !0
                },
                useSimple: function() {
                    K = !1
                }
            }), c(c.S + c.F * !V, "Object", {
                create: $,
                defineProperty: H,
                defineProperties: X,
                getOwnPropertyDescriptor: Q,
                getOwnPropertyNames: Z,
                getOwnPropertySymbols: ee
            }), j && c(c.S + c.F * (!V || f(function() {
                var e = B();
                return "[null]" != E([e]) || "{}" != E({
                    a: e
                }) || "{}" != E(Object(e))
            })), "JSON", {
                stringify: function(e) {
                    if (e !== n && !z(e)) {
                        for (var t, o, r = [e], i = 1; arguments.length > i;) r.push(arguments[i++]);
                        return t = r[1], "function" == typeof t && (o = t), !o && m(t) || (t = function(e, t) {
                            if (o && (t = o.call(this, e, t)), !z(t)) return t
                        }), r[1] = t, E.apply(j, r)
                    }
                }
            }), B.prototype[D] || o(8)(B.prototype, D, B.prototype.valueOf), d(B, "Symbol"), d(Math, "Math", !0), d(r.JSON, "JSON", !0)
        }, function(e, n) {
            var o = e.exports = Function("return this")();
            "number" == typeof t && (t = o)
        }, function(e, t) {
            var n = {}.hasOwnProperty;
            e.exports = function(e, t) {
                return n.call(e, t)
            }
        }, function(e, t, n) {
            e.exports = !n(5)(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(e, t) {
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (e) {
                    return !0
                }
            }
        }, function(e, t, o) {
            var r = o(2),
                i = o(7),
                a = o(8),
                c = o(16),
                u = o(18),
                s = function(e, t, o) {
                    var f, l, d, p, h = e & s.F,
                        v = e & s.G,
                        g = e & s.S,
                        y = e & s.P,
                        b = e & s.B,
                        m = v ? r : g ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
                        _ = v ? i : i[t] || (i[t] = {}),
                        k = _.prototype || (_.prototype = {});
                    v && (o = t);
                    for (f in o) l = !h && m && m[f] !== n, d = (l ? m : o)[f], p = b && l ? u(d, r) : y && "function" == typeof d ? u(Function.call, d) : d, m && c(m, f, d, e & s.U), _[f] != d && a(_, f, p), y && k[f] != d && (k[f] = d)
                };
            r.core = i, s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, e.exports = s
        }, function(t, n) {
            var o = t.exports = {
                version: "2.4.0"
            };
            "number" == typeof e && (e = o)
        }, function(e, t, n) {
            var o = n(9),
                r = n(15);
            e.exports = n(4) ? function(e, t, n) {
                return o.f(e, t, r(1, n))
            } : function(e, t, n) {
                return e[t] = n, e
            }
        }, function(e, t, n) {
            var o = n(10),
                r = n(12),
                i = n(14),
                a = Object.defineProperty;
            t.f = n(4) ? Object.defineProperty : function(e, t, n) {
                if (o(e), t = i(t, !0), o(n), r) try {
                    return a(e, t, n)
                } catch (e) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                return "value" in n && (e[t] = n.value), e
            }
        }, function(e, t, n) {
            var o = n(11);
            e.exports = function(e) {
                if (!o(e)) throw TypeError(e + " is not an object!");
                return e
            }
        }, function(e, t) {
            e.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        }, function(e, t, n) {
            e.exports = !n(4) && !n(5)(function() {
                return 7 != Object.defineProperty(n(13)("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }, function(e, t, n) {
            var o = n(11),
                r = n(2).document,
                i = o(r) && o(r.createElement);
            e.exports = function(e) {
                return i ? r.createElement(e) : {}
            }
        }, function(e, t, n) {
            var o = n(11);
            e.exports = function(e, t) {
                if (!o(e)) return e;
                var n, r;
                if (t && "function" == typeof(n = e.toString) && !o(r = n.call(e))) return r;
                if ("function" == typeof(n = e.valueOf) && !o(r = n.call(e))) return r;
                if (!t && "function" == typeof(n = e.toString) && !o(r = n.call(e))) return r;
                throw TypeError("Can't convert object to primitive value")
            }
        }, function(e, t) {
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        }, function(e, t, n) {
            var o = n(2),
                r = n(8),
                i = n(3),
                a = n(17)("src"),
                c = Function.toString,
                u = ("" + c).split("toString");
            n(7).inspectSource = function(e) {
                return c.call(e)
            }, (e.exports = function(e, t, n, c) {
                var s = "function" == typeof n;
                s && (i(n, "name") || r(n, "name", t)), e[t] !== n && (s && (i(n, a) || r(n, a, e[t] ? "" + e[t] : u.join(String(t)))), e === o ? e[t] = n : c ? e[t] ? e[t] = n : r(e, t, n) : (delete e[t], r(e, t, n)))
            })(Function.prototype, "toString", function() {
                return "function" == typeof this && this[a] || c.call(this)
            })
        }, function(e, t) {
            var o = 0,
                r = Math.random();
            e.exports = function(e) {
                return "Symbol(".concat(e === n ? "" : e, ")_", (++o + r).toString(36))
            }
        }, function(e, t, o) {
            var r = o(19);
            e.exports = function(e, t, o) {
                if (r(e), t === n) return e;
                switch (o) {
                    case 1:
                        return function(n) {
                            return e.call(t, n)
                        };
                    case 2:
                        return function(n, o) {
                            return e.call(t, n, o)
                        };
                    case 3:
                        return function(n, o, r) {
                            return e.call(t, n, o, r)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            }
        }, function(e, t) {
            e.exports = function(e) {
                if ("function" != typeof e) throw TypeError(e + " is not a function!");
                return e
            }
        }, function(e, t, n) {
            var o = n(17)("meta"),
                r = n(11),
                i = n(3),
                a = n(9).f,
                c = 0,
                u = Object.isExtensible || function() {
                    return !0
                },
                s = !n(5)(function() {
                    return u(Object.preventExtensions({}))
                }),
                f = function(e) {
                    a(e, o, {
                        value: {
                            i: "O" + ++c,
                            w: {}
                        }
                    })
                },
                l = function(e, t) {
                    if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!i(e, o)) {
                        if (!u(e)) return "F";
                        if (!t) return "E";
                        f(e)
                    }
                    return e[o].i
                },
                d = function(e, t) {
                    if (!i(e, o)) {
                        if (!u(e)) return !0;
                        if (!t) return !1;
                        f(e)
                    }
                    return e[o].w
                },
                p = function(e) {
                    return s && h.NEED && u(e) && !i(e, o) && f(e), e
                },
                h = e.exports = {
                    KEY: o,
                    NEED: !1,
                    fastKey: l,
                    getWeak: d,
                    onFreeze: p
                }
        }, function(e, t, n) {
            var o = n(2),
                r = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
            e.exports = function(e) {
                return r[e] || (r[e] = {})
            }
        }, function(e, t, n) {
            var o = n(9).f,
                r = n(3),
                i = n(23)("toStringTag");
            e.exports = function(e, t, n) {
                e && !r(e = n ? e : e.prototype, i) && o(e, i, {
                    configurable: !0,
                    value: t
                })
            }
        }, function(e, t, n) {
            var o = n(21)("wks"),
                r = n(17),
                i = n(2).Symbol,
                a = "function" == typeof i;
            (e.exports = function(e) {
                return o[e] || (o[e] = a && i[e] || (a ? i : r)("Symbol." + e))
            }).store = o
        }, function(e, t, n) {
            t.f = n(23)
        }, function(e, t, n) {
            var o = n(2),
                r = n(7),
                i = n(26),
                a = n(24),
                c = n(9).f;
            e.exports = function(e) {
                var t = r.Symbol || (r.Symbol = i ? {} : o.Symbol || {});
                "_" == e.charAt(0) || e in t || c(t, e, {
                    value: a.f(e)
                })
            }
        }, function(e, t) {
            e.exports = !1
        }, function(e, t, n) {
            var o = n(28),
                r = n(30);
            e.exports = function(e, t) {
                for (var n, i = r(e), a = o(i), c = a.length, u = 0; c > u;)
                    if (i[n = a[u++]] === t) return n
            }
        }, function(e, t, n) {
            var o = n(29),
                r = n(39);
            e.exports = Object.keys || function(e) {
                return o(e, r)
            }
        }, function(e, t, n) {
            var o = n(3),
                r = n(30),
                i = n(34)(!1),
                a = n(38)("IE_PROTO");
            e.exports = function(e, t) {
                var n, c = r(e),
                    u = 0,
                    s = [];
                for (n in c) n != a && o(c, n) && s.push(n);
                for (; t.length > u;) o(c, n = t[u++]) && (~i(s, n) || s.push(n));
                return s
            }
        }, function(e, t, n) {
            var o = n(31),
                r = n(33);
            e.exports = function(e) {
                return o(r(e))
            }
        }, function(e, t, n) {
            var o = n(32);
            e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
                return "String" == o(e) ? e.split("") : Object(e)
            }
        }, function(e, t) {
            var n = {}.toString;
            e.exports = function(e) {
                return n.call(e).slice(8, -1)
            }
        }, function(e, t) {
            e.exports = function(e) {
                if (e == n) throw TypeError("Can't call method on  " + e);
                return e
            }
        }, function(e, t, n) {
            var o = n(30),
                r = n(35),
                i = n(37);
            e.exports = function(e) {
                return function(t, n, a) {
                    var c, u = o(t),
                        s = r(u.length),
                        f = i(a, s);
                    if (e && n != n) {
                        for (; s > f;)
                            if ((c = u[f++]) != c) return !0
                    } else
                        for (; s > f; f++)
                            if ((e || f in u) && u[f] === n) return e || f || 0;
                    return !e && -1
                }
            }
        }, function(e, t, n) {
            var o = n(36),
                r = Math.min;
            e.exports = function(e) {
                return e > 0 ? r(o(e), 9007199254740991) : 0
            }
        }, function(e, t) {
            var n = Math.ceil,
                o = Math.floor;
            e.exports = function(e) {
                return isNaN(e = +e) ? 0 : (e > 0 ? o : n)(e)
            }
        }, function(e, t, n) {
            var o = n(36),
                r = Math.max,
                i = Math.min;
            e.exports = function(e, t) {
                return e = o(e), e < 0 ? r(e + t, 0) : i(e, t)
            }
        }, function(e, t, n) {
            var o = n(21)("keys"),
                r = n(17);
            e.exports = function(e) {
                return o[e] || (o[e] = r(e))
            }
        }, function(e, t) {
            e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
        }, function(e, t, n) {
            var o = n(28),
                r = n(41),
                i = n(42);
            e.exports = function(e) {
                var t = o(e),
                    n = r.f;
                if (n)
                    for (var a, c = n(e), u = i.f, s = 0; c.length > s;) u.call(e, a = c[s++]) && t.push(a);
                return t
            }
        }, function(e, t) {
            t.f = Object.getOwnPropertySymbols
        }, function(e, t) {
            t.f = {}.propertyIsEnumerable
        }, function(e, t, n) {
            var o = n(32);
            e.exports = Array.isArray || function(e) {
                return "Array" == o(e)
            }
        }, function(e, t, o) {
            var r = o(10),
                i = o(45),
                a = o(39),
                c = o(38)("IE_PROTO"),
                u = function() {},
                s = function() {
                    var e, t = o(13)("iframe"),
                        n = a.length;
                    for (t.style.display = "none", o(46).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), s = e.F; n--;) delete s.prototype[a[n]];
                    return s()
                };
            e.exports = Object.create || function(e, t) {
                var o;
                return null !== e ? (u.prototype = r(e), o = new u, u.prototype = null, o[c] = e) : o = s(), t === n ? o : i(o, t)
            }
        }, function(e, t, n) {
            var o = n(9),
                r = n(10),
                i = n(28);
            e.exports = n(4) ? Object.defineProperties : function(e, t) {
                r(e);
                for (var n, a = i(t), c = a.length, u = 0; c > u;) o.f(e, n = a[u++], t[n]);
                return e
            }
        }, function(e, t, n) {
            e.exports = n(2).document && document.documentElement
        }, function(e, t, n) {
            var o = n(30),
                r = n(48).f,
                i = {}.toString,
                a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                c = function(e) {
                    try {
                        return r(e)
                    } catch (e) {
                        return a.slice()
                    }
                };
            e.exports.f = function(e) {
                return a && "[object Window]" == i.call(e) ? c(e) : r(o(e))
            }
        }, function(e, t, n) {
            var o = n(29),
                r = n(39).concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function(e) {
                return o(e, r)
            }
        }, function(e, t, n) {
            var o = n(42),
                r = n(15),
                i = n(30),
                a = n(14),
                c = n(3),
                u = n(12),
                s = Object.getOwnPropertyDescriptor;
            t.f = n(4) ? s : function(e, t) {
                if (e = i(e), t = a(t, !0), u) try {
                    return s(e, t)
                } catch (e) {}
                if (c(e, t)) return r(!o.f.call(e, t), e[t])
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.S + o.F * !n(4), "Object", {
                defineProperty: n(9).f
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S + o.F * !n(4), "Object", {
                defineProperties: n(45)
            })
        }, function(e, t, n) {
            var o = n(30),
                r = n(49).f;
            n(53)("getOwnPropertyDescriptor", function() {
                return function(e, t) {
                    return r(o(e), t)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(7),
                i = n(5);
            e.exports = function(e, t) {
                var n = (r.Object || {})[e] || Object[e],
                    a = {};
                a[e] = t(n), o(o.S + o.F * i(function() {
                    n(1)
                }), "Object", a)
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Object", {
                create: n(44)
            })
        }, function(e, t, n) {
            var o = n(56),
                r = n(57);
            n(53)("getPrototypeOf", function() {
                return function(e) {
                    return r(o(e))
                }
            })
        }, function(e, t, n) {
            var o = n(33);
            e.exports = function(e) {
                return Object(o(e))
            }
        }, function(e, t, n) {
            var o = n(3),
                r = n(56),
                i = n(38)("IE_PROTO"),
                a = Object.prototype;
            e.exports = Object.getPrototypeOf || function(e) {
                return e = r(e), o(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
            }
        }, function(e, t, n) {
            var o = n(56),
                r = n(28);
            n(53)("keys", function() {
                return function(e) {
                    return r(o(e))
                }
            })
        }, function(e, t, n) {
            n(53)("getOwnPropertyNames", function() {
                return n(47).f
            })
        }, function(e, t, n) {
            var o = n(11),
                r = n(20).onFreeze;
            n(53)("freeze", function(e) {
                return function(t) {
                    return e && o(t) ? e(r(t)) : t
                }
            })
        }, function(e, t, n) {
            var o = n(11),
                r = n(20).onFreeze;
            n(53)("seal", function(e) {
                return function(t) {
                    return e && o(t) ? e(r(t)) : t
                }
            })
        }, function(e, t, n) {
            var o = n(11),
                r = n(20).onFreeze;
            n(53)("preventExtensions", function(e) {
                return function(t) {
                    return e && o(t) ? e(r(t)) : t
                }
            })
        }, function(e, t, n) {
            var o = n(11);
            n(53)("isFrozen", function(e) {
                return function(t) {
                    return !o(t) || !!e && e(t)
                }
            })
        }, function(e, t, n) {
            var o = n(11);
            n(53)("isSealed", function(e) {
                return function(t) {
                    return !o(t) || !!e && e(t)
                }
            })
        }, function(e, t, n) {
            var o = n(11);
            n(53)("isExtensible", function(e) {
                return function(t) {
                    return !!o(t) && (!e || e(t))
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S + o.F, "Object", {
                assign: n(67)
            })
        }, function(e, t, n) {
            var o = n(28),
                r = n(41),
                i = n(42),
                a = n(56),
                c = n(31),
                u = Object.assign;
            e.exports = !u || n(5)(function() {
                var e = {},
                    t = {},
                    n = Symbol(),
                    o = "abcdefghijklmnopqrst";
                return e[n] = 7, o.split("").forEach(function(e) {
                    t[e] = e
                }), 7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != o
            }) ? function(e, t) {
                for (var n = a(e), u = arguments.length, s = 1, f = r.f, l = i.f; u > s;)
                    for (var d, p = c(arguments[s++]), h = f ? o(p).concat(f(p)) : o(p), v = h.length, g = 0; v > g;) l.call(p, d = h[g++]) && (n[d] = p[d]);
                return n
            } : u
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Object", {
                is: n(69)
            })
        }, function(e, t) {
            e.exports = Object.is || function(e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Object", {
                setPrototypeOf: n(71).set
            })
        }, function(e, t, o) {
            var r = o(11),
                i = o(10),
                a = function(e, t) {
                    if (i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
                };
            e.exports = {
                set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
                    try {
                        n = o(18)(Function.call, o(49).f(Object.prototype, "__proto__").set, 2), n(e, []), t = !(e instanceof Array)
                    } catch (e) {
                        t = !0
                    }
                    return function(e, o) {
                        return a(e, o), t ? e.__proto__ = o : n(e, o), e
                    }
                }({}, !1) : n),
                check: a
            }
        }, function(e, t, n) {
            var o = n(73),
                r = {};
            r[n(23)("toStringTag")] = "z", r + "" != "[object z]" && n(16)(Object.prototype, "toString", function() {
                return "[object " + o(this) + "]"
            }, !0)
        }, function(e, t, o) {
            var r = o(32),
                i = o(23)("toStringTag"),
                a = "Arguments" == r(function() {
                    return arguments
                }()),
                c = function(e, t) {
                    try {
                        return e[t]
                    } catch (e) {}
                };
            e.exports = function(e) {
                var t, o, u;
                return e === n ? "Undefined" : null === e ? "Null" : "string" == typeof(o = c(t = Object(e), i)) ? o : a ? r(t) : "Object" == (u = r(t)) && "function" == typeof t.callee ? "Arguments" : u
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.P, "Function", {
                bind: n(75)
            })
        }, function(e, t, n) {
            var o = n(19),
                r = n(11),
                i = n(76),
                a = [].slice,
                c = {},
                u = function(e, t, n) {
                    if (!(t in c)) {
                        for (var o = [], r = 0; r < t; r++) o[r] = "a[" + r + "]";
                        c[t] = Function("F,a", "return new F(" + o.join(",") + ")")
                    }
                    return c[t](e, n)
                };
            e.exports = Function.bind || function(e) {
                var t = o(this),
                    n = a.call(arguments, 1),
                    c = function() {
                        var o = n.concat(a.call(arguments));
                        return this instanceof c ? u(t, o.length, o) : i(t, o, e)
                    };
                return r(t.prototype) && (c.prototype = t.prototype), c
            }
        }, function(e, t) {
            e.exports = function(e, t, o) {
                var r = o === n;
                switch (t.length) {
                    case 0:
                        return r ? e() : e.call(o);
                    case 1:
                        return r ? e(t[0]) : e.call(o, t[0]);
                    case 2:
                        return r ? e(t[0], t[1]) : e.call(o, t[0], t[1]);
                    case 3:
                        return r ? e(t[0], t[1], t[2]) : e.call(o, t[0], t[1], t[2]);
                    case 4:
                        return r ? e(t[0], t[1], t[2], t[3]) : e.call(o, t[0], t[1], t[2], t[3])
                }
                return e.apply(o, t)
            }
        }, function(e, t, n) {
            var o = n(9).f,
                r = n(15),
                i = n(3),
                a = Function.prototype,
                c = /^\s*function ([^ (]*)/,
                u = Object.isExtensible || function() {
                    return !0
                };
            "name" in a || n(4) && o(a, "name", {
                configurable: !0,
                get: function() {
                    try {
                        var e = this,
                            t = ("" + e).match(c)[1];
                        return i(e, "name") || !u(e) || o(e, "name", r(5, t)), t
                    } catch (e) {
                        return ""
                    }
                }
            })
        }, function(e, t, n) {
            var o = n(11),
                r = n(57),
                i = n(23)("hasInstance"),
                a = Function.prototype;
            i in a || n(9).f(a, i, {
                value: function(e) {
                    if ("function" != typeof this || !o(e)) return !1;
                    if (!o(this.prototype)) return e instanceof this;
                    for (; e = r(e);)
                        if (this.prototype === e) return !0;
                    return !1
                }
            })
        }, function(e, t, n) {
            var o = n(2),
                r = n(3),
                i = n(32),
                a = n(80),
                c = n(14),
                u = n(5),
                s = n(48).f,
                f = n(49).f,
                l = n(9).f,
                d = n(81).trim,
                p = o.Number,
                h = p,
                v = p.prototype,
                g = "Number" == i(n(44)(v)),
                y = "trim" in String.prototype,
                b = function(e) {
                    var t = c(e, !1);
                    if ("string" == typeof t && t.length > 2) {
                        t = y ? t.trim() : d(t, 3);
                        var n, o, r, i = t.charCodeAt(0);
                        if (43 === i || 45 === i) {
                            if (88 === (n = t.charCodeAt(2)) || 120 === n) return NaN
                        } else if (48 === i) {
                            switch (t.charCodeAt(1)) {
                                case 66:
                                case 98:
                                    o = 2, r = 49;
                                    break;
                                case 79:
                                case 111:
                                    o = 8, r = 55;
                                    break;
                                default:
                                    return +t
                            }
                            for (var a, u = t.slice(2), s = 0, f = u.length; s < f; s++)
                                if ((a = u.charCodeAt(s)) < 48 || a > r) return NaN;
                            return parseInt(u, o)
                        }
                    }
                    return +t
                };
            if (!p(" 0o1") || !p("0b1") || p("+0x1")) {
                p = function(e) {
                    var t = arguments.length < 1 ? 0 : e,
                        n = this;
                    return n instanceof p && (g ? u(function() {
                        v.valueOf.call(n)
                    }) : "Number" != i(n)) ? a(new h(b(t)), n, p) : b(t)
                };
                for (var m, _ = n(4) ? s(h) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), k = 0; _.length > k; k++) r(h, m = _[k]) && !r(p, m) && l(p, m, f(h, m));
                p.prototype = v, v.constructor = p, n(16)(o, "Number", p)
            }
        }, function(e, t, n) {
            var o = n(11),
                r = n(71).set;
            e.exports = function(e, t, n) {
                var i, a = t.constructor;
                return a !== n && "function" == typeof a && (i = a.prototype) !== n.prototype && o(i) && r && r(e, i), e
            }
        }, function(e, t, n) {
            var o = n(6),
                r = n(33),
                i = n(5),
                a = n(82),
                c = "[" + a + "]",
                u = "​",
                s = RegExp("^" + c + c + "*"),
                f = RegExp(c + c + "*$"),
                l = function(e, t, n) {
                    var r = {},
                        c = i(function() {
                            return !!a[e]() || u[e]() != u
                        }),
                        s = r[e] = c ? t(d) : a[e];
                    n && (r[n] = s), o(o.P + o.F * c, "String", r)
                },
                d = l.trim = function(e, t) {
                    return e = String(r(e)), 1 & t && (e = e.replace(s, "")), 2 & t && (e = e.replace(f, "")), e
                };
            e.exports = l
        }, function(e, t) {
            e.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
        }, function(e, t, n) {
            var o = n(6),
                r = n(36),
                i = n(84),
                a = n(85),
                c = 1..toFixed,
                u = Math.floor,
                s = [0, 0, 0, 0, 0, 0],
                f = "Number.toFixed: incorrect invocation!",
                l = function(e, t) {
                    for (var n = -1, o = t; ++n < 6;) o += e * s[n], s[n] = o % 1e7, o = u(o / 1e7)
                },
                d = function(e) {
                    for (var t = 6, n = 0; --t >= 0;) n += s[t], s[t] = u(n / e), n = n % e * 1e7
                },
                p = function() {
                    for (var e = 6, t = ""; --e >= 0;)
                        if ("" !== t || 0 === e || 0 !== s[e]) {
                            var n = String(s[e]);
                            t = "" === t ? n : t + a.call("0", 7 - n.length) + n
                        }
                    return t
                },
                h = function(e, t, n) {
                    return 0 === t ? n : t % 2 == 1 ? h(e, t - 1, n * e) : h(e * e, t / 2, n)
                },
                v = function(e) {
                    for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
                    for (; n >= 2;) t += 1, n /= 2;
                    return t
                };
            o(o.P + o.F * (!!c && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !n(5)(function() {
                c.call({})
            })), "Number", {
                toFixed: function(e) {
                    var t, n, o, c, u = i(this, f),
                        s = r(e),
                        g = "",
                        y = "0";
                    if (s < 0 || s > 20) throw RangeError(f);
                    if (u != u) return "NaN";
                    if (u <= -1e21 || u >= 1e21) return String(u);
                    if (u < 0 && (g = "-", u = -u), u > 1e-21)
                        if (t = v(u * h(2, 69, 1)) - 69, n = t < 0 ? u * h(2, -t, 1) : u / h(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
                            for (l(0, n), o = s; o >= 7;) l(1e7, 0), o -= 7;
                            for (l(h(10, o, 1), 0), o = t - 1; o >= 23;) d(1 << 23), o -= 23;
                            d(1 << o), l(1, 1), d(2), y = p()
                        } else l(0, n), l(1 << -t, 0), y = p() + a.call("0", s);
                    return s > 0 ? (c = y.length, y = g + (c <= s ? "0." + a.call("0", s - c) + y : y.slice(0, c - s) + "." + y.slice(c - s))) : y = g + y, y
                }
            })
        }, function(e, t, n) {
            var o = n(32);
            e.exports = function(e, t) {
                if ("number" != typeof e && "Number" != o(e)) throw TypeError(t);
                return +e
            }
        }, function(e, t, n) {
            var o = n(36),
                r = n(33);
            e.exports = function(e) {
                var t = String(r(this)),
                    n = "",
                    i = o(e);
                if (i < 0 || i == 1 / 0) throw RangeError("Count can't be negative");
                for (; i > 0;
                    (i >>>= 1) && (t += t)) 1 & i && (n += t);
                return n
            }
        }, function(e, t, o) {
            var r = o(6),
                i = o(5),
                a = o(84),
                c = 1..toPrecision;
            r(r.P + r.F * (i(function() {
                return "1" !== c.call(1, n)
            }) || !i(function() {
                c.call({})
            })), "Number", {
                toPrecision: function(e) {
                    var t = a(this, "Number#toPrecision: incorrect invocation!");
                    return e === n ? c.call(t) : c.call(t, e)
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Number", {
                EPSILON: Math.pow(2, -52)
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(2).isFinite;
            o(o.S, "Number", {
                isFinite: function(e) {
                    return "number" == typeof e && r(e)
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Number", {
                isInteger: n(90)
            })
        }, function(e, t, n) {
            var o = n(11),
                r = Math.floor;
            e.exports = function(e) {
                return !o(e) && isFinite(e) && r(e) === e
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Number", {
                isNaN: function(e) {
                    return e != e
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(90),
                i = Math.abs;
            o(o.S, "Number", {
                isSafeInteger: function(e) {
                    return r(e) && i(e) <= 9007199254740991
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Number", {
                MAX_SAFE_INTEGER: 9007199254740991
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Number", {
                MIN_SAFE_INTEGER: -9007199254740991
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(96);
            o(o.S + o.F * (Number.parseFloat != r), "Number", {
                parseFloat: r
            })
        }, function(e, t, n) {
            var o = n(2).parseFloat,
                r = n(81).trim;
            e.exports = 1 / o(n(82) + "-0") != -1 / 0 ? function(e) {
                var t = r(String(e), 3),
                    n = o(t);
                return 0 === n && "-" == t.charAt(0) ? -0 : n
            } : o
        }, function(e, t, n) {
            var o = n(6),
                r = n(98);
            o(o.S + o.F * (Number.parseInt != r), "Number", {
                parseInt: r
            })
        }, function(e, t, n) {
            var o = n(2).parseInt,
                r = n(81).trim,
                i = n(82),
                a = /^[\-+]?0[xX]/;
            e.exports = 8 !== o(i + "08") || 22 !== o(i + "0x16") ? function(e, t) {
                var n = r(String(e), 3);
                return o(n, t >>> 0 || (a.test(n) ? 16 : 10))
            } : o
        }, function(e, t, n) {
            var o = n(6),
                r = n(98);
            o(o.G + o.F * (parseInt != r), {
                parseInt: r
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(96);
            o(o.G + o.F * (parseFloat != r), {
                parseFloat: r
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(102),
                i = Math.sqrt,
                a = Math.acosh;
            o(o.S + o.F * !(a && 710 == Math.floor(a(Number.MAX_VALUE)) && a(1 / 0) == 1 / 0), "Math", {
                acosh: function(e) {
                    return (e = +e) < 1 ? NaN : e > 94906265.62425156 ? Math.log(e) + Math.LN2 : r(e - 1 + i(e - 1) * i(e + 1))
                }
            })
        }, function(e, t) {
            e.exports = Math.log1p || function(e) {
                return (e = +e) > -1e-8 && e < 1e-8 ? e - e * e / 2 : Math.log(1 + e)
            }
        }, function(e, t, n) {
            function o(e) {
                return isFinite(e = +e) && 0 != e ? e < 0 ? -o(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e
            }
            var r = n(6),
                i = Math.asinh;
            r(r.S + r.F * !(i && 1 / i(0) > 0), "Math", {
                asinh: o
            })
        }, function(e, t, n) {
            var o = n(6),
                r = Math.atanh;
            o(o.S + o.F * !(r && 1 / r(-0) < 0), "Math", {
                atanh: function(e) {
                    return 0 == (e = +e) ? e : Math.log((1 + e) / (1 - e)) / 2
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(106);
            o(o.S, "Math", {
                cbrt: function(e) {
                    return r(e = +e) * Math.pow(Math.abs(e), 1 / 3)
                }
            })
        }, function(e, t) {
            e.exports = Math.sign || function(e) {
                return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Math", {
                clz32: function(e) {
                    return (e >>>= 0) ? 31 - Math.floor(Math.log(e + .5) * Math.LOG2E) : 32
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = Math.exp;
            o(o.S, "Math", {
                cosh: function(e) {
                    return (r(e = +e) + r(-e)) / 2
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(110);
            o(o.S + o.F * (r != Math.expm1), "Math", {
                expm1: r
            })
        }, function(e, t) {
            var n = Math.expm1;
            e.exports = !n || n(10) > 22025.465794806718 || n(10) < 22025.465794806718 || -2e-17 != n(-2e-17) ? function(e) {
                return 0 == (e = +e) ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : Math.exp(e) - 1
            } : n
        }, function(e, t, n) {
            var o = n(6),
                r = n(106),
                i = Math.pow,
                a = i(2, -52),
                c = i(2, -23),
                u = i(2, 127) * (2 - c),
                s = i(2, -126),
                f = function(e) {
                    return e + 1 / a - 1 / a
                };
            o(o.S, "Math", {
                fround: function(e) {
                    var t, n, o = Math.abs(e),
                        i = r(e);
                    return o < s ? i * f(o / s / c) * s * c : (t = (1 + c / a) * o, n = t - (t - o), n > u || n != n ? i * (1 / 0) : i * n)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = Math.abs;
            o(o.S, "Math", {
                hypot: function(e, t) {
                    for (var n, o, i = 0, a = 0, c = arguments.length, u = 0; a < c;) n = r(arguments[a++]), u < n ? (o = u / n, i = i * o * o + 1, u = n) : n > 0 ? (o = n / u, i += o * o) : i += n;
                    return u === 1 / 0 ? 1 / 0 : u * Math.sqrt(i)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = Math.imul;
            o(o.S + o.F * n(5)(function() {
                return -5 != r(4294967295, 5) || 2 != r.length
            }), "Math", {
                imul: function(e, t) {
                    var n = +e,
                        o = +t,
                        r = 65535 & n,
                        i = 65535 & o;
                    return 0 | r * i + ((65535 & n >>> 16) * i + r * (65535 & o >>> 16) << 16 >>> 0)
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Math", {
                log10: function(e) {
                    return Math.log(e) / Math.LN10
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Math", {
                log1p: n(102)
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Math", {
                log2: function(e) {
                    return Math.log(e) / Math.LN2
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Math", {
                sign: n(106)
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(110),
                i = Math.exp;
            o(o.S + o.F * n(5)(function() {
                return -2e-17 != !Math.sinh(-2e-17)
            }), "Math", {
                sinh: function(e) {
                    return Math.abs(e = +e) < 1 ? (r(e) - r(-e)) / 2 : (i(e - 1) - i(-e - 1)) * (Math.E / 2)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(110),
                i = Math.exp;
            o(o.S, "Math", {
                tanh: function(e) {
                    var t = r(e = +e),
                        n = r(-e);
                    return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (i(e) + i(-e))
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Math", {
                trunc: function(e) {
                    return (e > 0 ? Math.floor : Math.ceil)(e)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(37),
                i = String.fromCharCode,
                a = String.fromCodePoint;
            o(o.S + o.F * (!!a && 1 != a.length), "String", {
                fromCodePoint: function(e) {
                    for (var t, n = [], o = arguments.length, a = 0; o > a;) {
                        if (t = +arguments[a++], r(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");
                        n.push(t < 65536 ? i(t) : i(55296 + ((t -= 65536) >> 10), t % 1024 + 56320))
                    }
                    return n.join("")
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(30),
                i = n(35);
            o(o.S, "String", {
                raw: function(e) {
                    for (var t = r(e.raw), n = i(t.length), o = arguments.length, a = [], c = 0; n > c;) a.push(String(t[c++])), c < o && a.push(String(arguments[c]));
                    return a.join("")
                }
            })
        }, function(e, t, n) {
            n(81)("trim", function(e) {
                return function() {
                    return e(this, 3)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(125)(!1);
            o(o.P, "String", {
                codePointAt: function(e) {
                    return r(this, e)
                }
            })
        }, function(e, t, o) {
            var r = o(36),
                i = o(33);
            e.exports = function(e) {
                return function(t, o) {
                    var a, c, u = String(i(t)),
                        s = r(o),
                        f = u.length;
                    return s < 0 || s >= f ? e ? "" : n : (a = u.charCodeAt(s), a < 55296 || a > 56319 || s + 1 === f || (c = u.charCodeAt(s + 1)) < 56320 || c > 57343 ? e ? u.charAt(s) : a : e ? u.slice(s, s + 2) : c - 56320 + (a - 55296 << 10) + 65536)
                }
            }
        }, function(e, t, o) {
            var r = o(6),
                i = o(35),
                a = o(127),
                c = "".endsWith;
            r(r.P + r.F * o(129)("endsWith"), "String", {
                endsWith: function(e) {
                    var t = a(this, e, "endsWith"),
                        o = arguments.length > 1 ? arguments[1] : n,
                        r = i(t.length),
                        u = o === n ? r : Math.min(i(o), r),
                        s = String(e);
                    return c ? c.call(t, s, u) : t.slice(u - s.length, u) === s
                }
            })
        }, function(e, t, n) {
            var o = n(128),
                r = n(33);
            e.exports = function(e, t, n) {
                if (o(t)) throw TypeError("String#" + n + " doesn't accept regex!");
                return String(r(e))
            }
        }, function(e, t, o) {
            var r = o(11),
                i = o(32),
                a = o(23)("match");
            e.exports = function(e) {
                var t;
                return r(e) && ((t = e[a]) !== n ? !!t : "RegExp" == i(e))
            }
        }, function(e, t, n) {
            var o = n(23)("match");
            e.exports = function(e) {
                var t = /./;
                try {
                    "/./" [e](t)
                } catch (n) {
                    try {
                        return t[o] = !1, !"/./" [e](t)
                    } catch (e) {}
                }
                return !0
            }
        }, function(e, t, o) {
            var r = o(6),
                i = o(127);
            r(r.P + r.F * o(129)("includes"), "String", {
                includes: function(e) {
                    return !!~i(this, e, "includes").indexOf(e, arguments.length > 1 ? arguments[1] : n)
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.P, "String", {
                repeat: n(85)
            })
        }, function(e, t, o) {
            var r = o(6),
                i = o(35),
                a = o(127),
                c = "".startsWith;
            r(r.P + r.F * o(129)("startsWith"), "String", {
                startsWith: function(e) {
                    var t = a(this, e, "startsWith"),
                        o = i(Math.min(arguments.length > 1 ? arguments[1] : n, t.length)),
                        r = String(e);
                    return c ? c.call(t, r, o) : t.slice(o, o + r.length) === r
                }
            })
        }, function(e, t, o) {
            var r = o(125)(!0);
            o(134)(String, "String", function(e) {
                this._t = String(e), this._i = 0
            }, function() {
                var e, t = this._t,
                    o = this._i;
                return o >= t.length ? {
                    value: n,
                    done: !0
                } : (e = r(t, o), this._i += e.length, {
                    value: e,
                    done: !1
                })
            })
        }, function(e, t, o) {
            var r = o(26),
                i = o(6),
                a = o(16),
                c = o(8),
                u = o(3),
                s = o(135),
                f = o(136),
                l = o(22),
                d = o(57),
                p = o(23)("iterator"),
                h = !([].keys && "next" in [].keys()),
                v = function() {
                    return this
                };
            e.exports = function(e, t, o, g, y, b, m) {
                f(o, t, g);
                var _, k, w, S = function(e) {
                        if (!h && e in A) return A[e];
                        switch (e) {
                            case "keys":
                            case "values":
                                return function() {
                                    return new o(this, e)
                                }
                        }
                        return function() {
                            return new o(this, e)
                        }
                    },
                    M = t + " Iterator",
                    C = "values" == y,
                    P = !1,
                    A = e.prototype,
                    O = A[p] || A["@@iterator"] || y && A[y],
                    T = O || S(y),
                    I = y ? C ? S("entries") : T : n,
                    x = "Array" == t ? A.entries || O : O;
                if (x && (w = d(x.call(new e))) !== Object.prototype && (l(w, M, !0), r || u(w, p) || c(w, p, v)), C && O && "values" !== O.name && (P = !0, T = function() {
                        return O.call(this)
                    }), r && !m || !h && !P && A[p] || c(A, p, T), s[t] = T, s[M] = v, y)
                    if (_ = {
                            values: C ? T : S("values"),
                            keys: b ? T : S("keys"),
                            entries: I
                        }, m)
                        for (k in _) k in A || a(A, k, _[k]);
                    else i(i.P + i.F * (h || P), t, _);
                return _
            }
        }, function(e, t) {
            e.exports = {}
        }, function(e, t, n) {
            var o = n(44),
                r = n(15),
                i = n(22),
                a = {};
            n(8)(a, n(23)("iterator"), function() {
                return this
            }), e.exports = function(e, t, n) {
                e.prototype = o(a, {
                    next: r(1, n)
                }), i(e, t + " Iterator")
            }
        }, function(e, t, n) {
            n(138)("anchor", function(e) {
                return function(t) {
                    return e(this, "a", "name", t)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(5),
                i = n(33),
                a = /"/g,
                c = function(e, t, n, o) {
                    var r = String(i(e)),
                        c = "<" + t;
                    return "" !== n && (c += " " + n + '="' + String(o).replace(a, "&quot;") + '"'), c + ">" + r + "</" + t + ">"
                };
            e.exports = function(e, t) {
                var n = {};
                n[e] = t(c), o(o.P + o.F * r(function() {
                    var t = "" [e]('"');
                    return t !== t.toLowerCase() || t.split('"').length > 3
                }), "String", n)
            }
        }, function(e, t, n) {
            n(138)("big", function(e) {
                return function() {
                    return e(this, "big", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("blink", function(e) {
                return function() {
                    return e(this, "blink", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("bold", function(e) {
                return function() {
                    return e(this, "b", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("fixed", function(e) {
                return function() {
                    return e(this, "tt", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("fontcolor", function(e) {
                return function(t) {
                    return e(this, "font", "color", t)
                }
            })
        }, function(e, t, n) {
            n(138)("fontsize", function(e) {
                return function(t) {
                    return e(this, "font", "size", t)
                }
            })
        }, function(e, t, n) {
            n(138)("italics", function(e) {
                return function() {
                    return e(this, "i", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("link", function(e) {
                return function(t) {
                    return e(this, "a", "href", t)
                }
            })
        }, function(e, t, n) {
            n(138)("small", function(e) {
                return function() {
                    return e(this, "small", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("strike", function(e) {
                return function() {
                    return e(this, "strike", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("sub", function(e) {
                return function() {
                    return e(this, "sub", "", "")
                }
            })
        }, function(e, t, n) {
            n(138)("sup", function(e) {
                return function() {
                    return e(this, "sup", "", "")
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Array", {
                isArray: n(43)
            })
        }, function(e, t, o) {
            var r = o(18),
                i = o(6),
                a = o(56),
                c = o(153),
                u = o(154),
                s = o(35),
                f = o(155),
                l = o(156);
            i(i.S + i.F * !o(157)(function(e) {
                Array.from(e)
            }), "Array", {
                from: function(e) {
                    var t, o, i, d, p = a(e),
                        h = "function" == typeof this ? this : Array,
                        v = arguments.length,
                        g = v > 1 ? arguments[1] : n,
                        y = g !== n,
                        b = 0,
                        m = l(p);
                    if (y && (g = r(g, v > 2 ? arguments[2] : n, 2)), m == n || h == Array && u(m))
                        for (t = s(p.length), o = new h(t); t > b; b++) f(o, b, y ? g(p[b], b) : p[b]);
                    else
                        for (d = m.call(p), o = new h; !(i = d.next()).done; b++) f(o, b, y ? c(d, g, [i.value, b], !0) : i.value);
                    return o.length = b, o
                }
            })
        }, function(e, t, o) {
            var r = o(10);
            e.exports = function(e, t, o, i) {
                try {
                    return i ? t(r(o)[0], o[1]) : t(o)
                } catch (t) {
                    var a = e.return;
                    throw a !== n && r(a.call(e)), t
                }
            }
        }, function(e, t, o) {
            var r = o(135),
                i = o(23)("iterator"),
                a = Array.prototype;
            e.exports = function(e) {
                return e !== n && (r.Array === e || a[i] === e)
            }
        }, function(e, t, n) {
            var o = n(9),
                r = n(15);
            e.exports = function(e, t, n) {
                t in e ? o.f(e, t, r(0, n)) : e[t] = n
            }
        }, function(e, t, o) {
            var r = o(73),
                i = o(23)("iterator"),
                a = o(135);
            e.exports = o(7).getIteratorMethod = function(e) {
                if (e != n) return e[i] || e["@@iterator"] || a[r(e)]
            }
        }, function(e, t, n) {
            var o = n(23)("iterator"),
                r = !1;
            try {
                var i = [7][o]();
                i.return = function() {
                    r = !0
                }, Array.from(i, function() {
                    throw 2
                })
            } catch (e) {}
            e.exports = function(e, t) {
                if (!t && !r) return !1;
                var n = !1;
                try {
                    var i = [7],
                        a = i[o]();
                    a.next = function() {
                        return {
                            done: n = !0
                        }
                    }, i[o] = function() {
                        return a
                    }, e(i)
                } catch (e) {}
                return n
            }
        }, function(e, t, n) {
            var o = n(6),
                r = n(155);
            o(o.S + o.F * n(5)(function() {
                function e() {}
                return !(Array.of.call(e) instanceof e)
            }), "Array", {
                of: function() {
                    for (var e = 0, t = arguments.length, n = new("function" == typeof this ? this : Array)(t); t > e;) r(n, e, arguments[e++]);
                    return n.length = t, n
                }
            })
        }, function(e, t, o) {
            var r = o(6),
                i = o(30),
                a = [].join;
            r(r.P + r.F * (o(31) != Object || !o(160)(a)), "Array", {
                join: function(e) {
                    return a.call(i(this), e === n ? "," : e)
                }
            })
        }, function(e, t, n) {
            var o = n(5);
            e.exports = function(e, t) {
                return !!e && o(function() {
                    t ? e.call(null, function() {}, 1) : e.call(null)
                })
            }
        }, function(e, t, o) {
            var r = o(6),
                i = o(46),
                a = o(32),
                c = o(37),
                u = o(35),
                s = [].slice;
            r(r.P + r.F * o(5)(function() {
                i && s.call(i)
            }), "Array", {
                slice: function(e, t) {
                    var o = u(this.length),
                        r = a(this);
                    if (t = t === n ? o : t, "Array" == r) return s.call(this, e, t);
                    for (var i = c(e, o), f = c(t, o), l = u(f - i), d = Array(l), p = 0; p < l; p++) d[p] = "String" == r ? this.charAt(i + p) : this[i + p];
                    return d
                }
            })
        }, function(e, t, o) {
            var r = o(6),
                i = o(19),
                a = o(56),
                c = o(5),
                u = [].sort,
                s = [1, 2, 3];
            r(r.P + r.F * (c(function() {
                s.sort(n)
            }) || !c(function() {
                s.sort(null)
            }) || !o(160)(u)), "Array", {
                sort: function(e) {
                    return e === n ? u.call(a(this)) : u.call(a(this), i(e))
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(164)(0),
                i = n(160)([].forEach, !0);
            o(o.P + o.F * !i, "Array", {
                forEach: function(e) {
                    return r(this, e, arguments[1])
                }
            })
        }, function(e, t, o) {
            var r = o(18),
                i = o(31),
                a = o(56),
                c = o(35),
                u = o(165);
            e.exports = function(e, t) {
                var o = 1 == e,
                    s = 2 == e,
                    f = 3 == e,
                    l = 4 == e,
                    d = 6 == e,
                    p = 5 == e || d,
                    h = t || u;
                return function(t, u, v) {
                    for (var g, y, b = a(t), m = i(b), _ = r(u, v, 3), k = c(m.length), w = 0, S = o ? h(t, k) : s ? h(t, 0) : n; k > w; w++)
                        if ((p || w in m) && (g = m[w], y = _(g, w, b), e))
                            if (o) S[w] = y;
                            else if (y) switch (e) {
                        case 3:
                            return !0;
                        case 5:
                            return g;
                        case 6:
                            return w;
                        case 2:
                            S.push(g)
                    } else if (l) return !1;
                    return d ? -1 : f || l ? l : S
                }
            }
        }, function(e, t, n) {
            var o = n(166);
            e.exports = function(e, t) {
                return new(o(e))(t)
            }
        }, function(e, t, o) {
            var r = o(11),
                i = o(43),
                a = o(23)("species");
            e.exports = function(e) {
                var t;
                return i(e) && (t = e.constructor, "function" != typeof t || t !== Array && !i(t.prototype) || (t = n), r(t) && null === (t = t[a]) && (t = n)), t === n ? Array : t
            }
        }, function(e, t, n) {
            var o = n(6),
                r = n(164)(1);
            o(o.P + o.F * !n(160)([].map, !0), "Array", {
                map: function(e) {
                    return r(this, e, arguments[1])
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(164)(2);
            o(o.P + o.F * !n(160)([].filter, !0), "Array", {
                filter: function(e) {
                    return r(this, e, arguments[1])
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(164)(3);
            o(o.P + o.F * !n(160)([].some, !0), "Array", {
                some: function(e) {
                    return r(this, e, arguments[1])
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(164)(4);
            o(o.P + o.F * !n(160)([].every, !0), "Array", {
                every: function(e) {
                    return r(this, e, arguments[1])
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(172);
            o(o.P + o.F * !n(160)([].reduce, !0), "Array", {
                reduce: function(e) {
                    return r(this, e, arguments.length, arguments[1], !1)
                }
            })
        }, function(e, t, n) {
            var o = n(19),
                r = n(56),
                i = n(31),
                a = n(35);
            e.exports = function(e, t, n, c, u) {
                o(t);
                var s = r(e),
                    f = i(s),
                    l = a(s.length),
                    d = u ? l - 1 : 0,
                    p = u ? -1 : 1;
                if (n < 2)
                    for (;;) {
                        if (d in f) {
                            c = f[d], d += p;
                            break
                        }
                        if (d += p, u ? d < 0 : l <= d) throw TypeError("Reduce of empty array with no initial value")
                    }
                for (; u ? d >= 0 : l > d; d += p) d in f && (c = t(c, f[d], d, s));
                return c
            }
        }, function(e, t, n) {
            var o = n(6),
                r = n(172);
            o(o.P + o.F * !n(160)([].reduceRight, !0), "Array", {
                reduceRight: function(e) {
                    return r(this, e, arguments.length, arguments[1], !0)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(34)(!1),
                i = [].indexOf,
                a = !!i && 1 / [1].indexOf(1, -0) < 0;
            o(o.P + o.F * (a || !n(160)(i)), "Array", {
                indexOf: function(e) {
                    return a ? i.apply(this, arguments) || 0 : r(this, e, arguments[1])
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(30),
                i = n(36),
                a = n(35),
                c = [].lastIndexOf,
                u = !!c && 1 / [1].lastIndexOf(1, -0) < 0;
            o(o.P + o.F * (u || !n(160)(c)), "Array", {
                lastIndexOf: function(e) {
                    if (u) return c.apply(this, arguments) || 0;
                    var t = r(this),
                        n = a(t.length),
                        o = n - 1;
                    for (arguments.length > 1 && (o = Math.min(o, i(arguments[1]))), o < 0 && (o = n + o); o >= 0; o--)
                        if (o in t && t[o] === e) return o || 0;
                    return -1
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.P, "Array", {
                copyWithin: n(177)
            }), n(178)("copyWithin")
        }, function(e, t, o) {
            var r = o(56),
                i = o(37),
                a = o(35);
            e.exports = [].copyWithin || function(e, t) {
                var o = r(this),
                    c = a(o.length),
                    u = i(e, c),
                    s = i(t, c),
                    f = arguments.length > 2 ? arguments[2] : n,
                    l = Math.min((f === n ? c : i(f, c)) - s, c - u),
                    d = 1;
                for (s < u && u < s + l && (d = -1, s += l - 1, u += l - 1); l-- > 0;) s in o ? o[u] = o[s] : delete o[u], u += d, s += d;
                return o
            }
        }, function(e, t, o) {
            var r = o(23)("unscopables"),
                i = Array.prototype;
            i[r] == n && o(8)(i, r, {}), e.exports = function(e) {
                i[r][e] = !0
            }
        }, function(e, t, n) {
            var o = n(6);
            o(o.P, "Array", {
                fill: n(180)
            }), n(178)("fill")
        }, function(e, t, o) {
            var r = o(56),
                i = o(37),
                a = o(35);
            e.exports = function(e) {
                for (var t = r(this), o = a(t.length), c = arguments.length, u = i(c > 1 ? arguments[1] : n, o), s = c > 2 ? arguments[2] : n, f = s === n ? o : i(s, o); f > u;) t[u++] = e;
                return t
            }
        }, function(e, t, o) {
            var r = o(6),
                i = o(164)(5),
                a = !0;
            "find" in [] && Array(1).find(function() {
                a = !1
            }), r(r.P + r.F * a, "Array", {
                find: function(e) {
                    return i(this, e, arguments.length > 1 ? arguments[1] : n)
                }
            }), o(178)("find")
        }, function(e, t, o) {
            var r = o(6),
                i = o(164)(6),
                a = "findIndex",
                c = !0;
            a in [] && Array(1)[a](function() {
                c = !1
            }), r(r.P + r.F * c, "Array", {
                findIndex: function(e) {
                    return i(this, e, arguments.length > 1 ? arguments[1] : n)
                }
            }), o(178)(a)
        }, function(e, t, o) {
            var r = o(178),
                i = o(184),
                a = o(135),
                c = o(30);
            e.exports = o(134)(Array, "Array", function(e, t) {
                this._t = c(e), this._i = 0, this._k = t
            }, function() {
                var e = this._t,
                    t = this._k,
                    o = this._i++;
                return !e || o >= e.length ? (this._t = n, i(1)) : "keys" == t ? i(0, o) : "values" == t ? i(0, e[o]) : i(0, [o, e[o]])
            }, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
        }, function(e, t) {
            e.exports = function(e, t) {
                return {
                    value: t,
                    done: !!e
                }
            }
        }, function(e, t, n) {
            n(186)("Array")
        }, function(e, t, n) {
            var o = n(2),
                r = n(9),
                i = n(4),
                a = n(23)("species");
            e.exports = function(e) {
                var t = o[e];
                i && t && !t[a] && r.f(t, a, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }
        }, function(e, t, o) {
            var r = o(2),
                i = o(80),
                a = o(9).f,
                c = o(48).f,
                u = o(128),
                s = o(188),
                f = r.RegExp,
                l = f,
                d = f.prototype,
                p = /a/g,
                h = /a/g,
                v = new f(p) !== p;
            if (o(4) && (!v || o(5)(function() {
                    return h[o(23)("match")] = !1, f(p) != p || f(h) == h || "/a/i" != f(p, "i")
                }))) {
                f = function(e, t) {
                    var o = this instanceof f,
                        r = u(e),
                        a = t === n;
                    return !o && r && e.constructor === f && a ? e : i(v ? new l(r && !a ? e.source : e, t) : l((r = e instanceof f) ? e.source : e, r && a ? s.call(e) : t), o ? this : d, f)
                };
                for (var g = c(l), y = 0; g.length > y;) ! function(e) {
                    e in f || a(f, e, {
                        configurable: !0,
                        get: function() {
                            return l[e]
                        },
                        set: function(t) {
                            l[e] = t
                        }
                    })
                }(g[y++]);
                d.constructor = f, f.prototype = d, o(16)(r, "RegExp", f)
            }
            o(186)("RegExp")
        }, function(e, t, n) {
            var o = n(10);
            e.exports = function() {
                var e = o(this),
                    t = "";
                return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
            }
        }, function(e, t, o) {
            o(190);
            var r = o(10),
                i = o(188),
                a = o(4),
                c = /./.toString,
                u = function(e) {
                    o(16)(RegExp.prototype, "toString", e, !0)
                };
            o(5)(function() {
                return "/a/b" != c.call({
                    source: "a",
                    flags: "b"
                })
            }) ? u(function() {
                var e = r(this);
                return "/".concat(e.source, "/", "flags" in e ? e.flags : !a && e instanceof RegExp ? i.call(e) : n)
            }) : "toString" != c.name && u(function() {
                return c.call(this)
            })
        }, function(e, t, n) {
            n(4) && "g" != /./g.flags && n(9).f(RegExp.prototype, "flags", {
                configurable: !0,
                get: n(188)
            })
        }, function(e, t, o) {
            o(192)("match", 1, function(e, t, o) {
                return [function(o) {
                    var r = e(this),
                        i = o == n ? n : o[t];
                    return i !== n ? i.call(o, r) : new RegExp(o)[t](String(r))
                }, o]
            })
        }, function(e, t, n) {
            var o = n(8),
                r = n(16),
                i = n(5),
                a = n(33),
                c = n(23);
            e.exports = function(e, t, n) {
                var u = c(e),
                    s = n(a, u, "" [e]),
                    f = s[0],
                    l = s[1];
                i(function() {
                    var t = {};
                    return t[u] = function() {
                        return 7
                    }, 7 != "" [e](t)
                }) && (r(String.prototype, e, f), o(RegExp.prototype, u, 2 == t ? function(e, t) {
                    return l.call(e, this, t)
                } : function(e) {
                    return l.call(e, this)
                }))
            }
        }, function(e, t, o) {
            o(192)("replace", 2, function(e, t, o) {
                return [function(r, i) {
                    var a = e(this),
                        c = r == n ? n : r[t];
                    return c !== n ? c.call(r, a, i) : o.call(String(a), r, i)
                }, o]
            })
        }, function(e, t, o) {
            o(192)("search", 1, function(e, t, o) {
                return [function(o) {
                    var r = e(this),
                        i = o == n ? n : o[t];
                    return i !== n ? i.call(o, r) : new RegExp(o)[t](String(r))
                }, o]
            })
        }, function(e, t, o) {
            o(192)("split", 2, function(e, t, r) {
                var i = o(128),
                    a = r,
                    c = [].push,
                    u = "length";
                if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[u] || 2 != "ab".split(/(?:ab)*/)[u] || 4 != ".".split(/(.?)(.?)/)[u] || ".".split(/()()/)[u] > 1 || "".split(/.?/)[u]) {
                    var s = /()??/.exec("")[1] === n;
                    r = function(e, t) {
                        var o = String(this);
                        if (e === n && 0 === t) return [];
                        if (!i(e)) return a.call(o, e, t);
                        var r, f, l, d, p, h = [],
                            v = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
                            g = 0,
                            y = t === n ? 4294967295 : t >>> 0,
                            b = new RegExp(e.source, v + "g");
                        for (s || (r = new RegExp("^" + b.source + "$(?!\\s)", v));
                            (f = b.exec(o)) && !((l = f.index + f[0][u]) > g && (h.push(o.slice(g, f.index)), !s && f[u] > 1 && f[0].replace(r, function() {
                                for (p = 1; p < arguments[u] - 2; p++) arguments[p] === n && (f[p] = n)
                            }), f[u] > 1 && f.index < o[u] && c.apply(h, f.slice(1)), d = f[0][u], g = l, h[u] >= y));) b.lastIndex === f.index && b.lastIndex++;
                        return g === o[u] ? !d && b.test("") || h.push("") : h.push(o.slice(g)), h[u] > y ? h.slice(0, y) : h
                    }
                } else "0".split(n, 0)[u] && (r = function(e, t) {
                    return e === n && 0 === t ? [] : a.call(this, e, t)
                });
                return [function(o, i) {
                    var a = e(this),
                        c = o == n ? n : o[t];
                    return c !== n ? c.call(o, a, i) : r.call(String(a), o, i)
                }, r]
            })
        }, function(e, t, o) {
            ! function() {
                WeixinJSBridge.invoke("getSystemInfo", {}, function(e) {
                    /ios\s8\.[0-9]+/.test(e.system.toLowerCase()) && (Promise = n)
                })
            }();
            var r, i, a, c = o(26),
                u = o(2),
                s = o(18),
                f = o(73),
                l = o(6),
                d = o(11),
                p = o(19),
                h = o(197),
                v = o(198),
                g = o(199),
                y = o(200).set,
                b = o(201)(),
                m = u.TypeError,
                _ = u.process,
                k = u.Promise,
                _ = u.process,
                w = "process" == f(_),
                S = function() {},
                M = !! function() {
                    try {
                        var e = k.resolve(1),
                            t = (e.constructor = {})[o(23)("species")] = function(e) {
                                e(S, S)
                            };
                        return (w || "function" == typeof PromiseRejectionEvent) && e.then(S) instanceof t
                    } catch (e) {}
                }(),
                C = function(e, t) {
                    return e === t || e === k && t === a
                },
                P = function(e) {
                    var t;
                    return !(!d(e) || "function" != typeof(t = e.then)) && t
                },
                A = function(e) {
                    return C(k, e) ? new O(e) : new i(e)
                },
                O = i = function(e) {
                    var t, o;
                    this.promise = new e(function(e, r) {
                        if (t !== n || o !== n) throw m("Bad Promise constructor");
                        t = e, o = r
                    }), this.resolve = p(t), this.reject = p(o)
                },
                T = function(e) {
                    try {
                        e()
                    } catch (e) {
                        return {
                            error: e
                        }
                    }
                },
                I = function(e, t) {
                    if (!e._n) {
                        e._n = !0;
                        var n = e._c;
                        b(function() {
                            for (var o = e._v, r = 1 == e._s, i = 0; n.length > i;) ! function(t) {
                                var n, i, a = r ? t.ok : t.fail,
                                    c = t.resolve,
                                    u = t.reject,
                                    s = t.domain;
                                try {
                                    a ? (r || (2 == e._h && j(e), e._h = 1), !0 === a ? n = o : (s && s.enter(), n = a(o), s && s.exit()), n === t.promise ? u(m("Promise-chain cycle")) : (i = P(n)) ? i.call(n, c, u) : c(n)) : u(o)
                                } catch (e) {
                                    u(e)
                                }
                            }(n[i++]);
                            e._c = [], e._n = !1, t && !e._h && x(e)
                        })
                    }
                },
                x = function(e) {
                    y.call(u, function() {
                        var t, o, r, i = e._v;
                        if (B(e) && (t = T(function() {
                                w ? _.emit("unhandledRejection", i, e) : (o = u.onunhandledrejection) ? o({
                                    promise: e,
                                    reason: i
                                }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", i)
                            }), e._h = w || B(e) ? 2 : 1), e._a = n, t) throw t.error
                    })
                },
                B = function(e) {
                    if (1 == e._h) return !1;
                    for (var t, n = e._a || e._c, o = 0; n.length > o;)
                        if (t = n[o++], t.fail || !B(t.promise)) return !1;
                    return !0
                },
                j = function(e) {
                    y.call(u, function() {
                        var t;
                        w ? _.emit("rejectionHandled", e) : (t = u.onrejectionhandled) && t({
                            promise: e,
                            reason: e._v
                        })
                    })
                },
                E = function(e) {
                    var t = this;
                    t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), I(t, !0))
                },
                R = function(e) {
                    var t, n = this;
                    if (!n._d) {
                        n._d = !0, n = n._w || n;
                        try {
                            if (n === e) throw m("Promise can't be resolved itself");
                            (t = P(e)) ? b(function() {
                                var o = {
                                    _w: n,
                                    _d: !1
                                };
                                try {
                                    t.call(e, s(R, o, 1), s(E, o, 1))
                                } catch (e) {
                                    E.call(o, e)
                                }
                            }): (n._v = e, n._s = 1, I(n, !1))
                        } catch (e) {
                            E.call({
                                _w: n,
                                _d: !1
                            }, e)
                        }
                    }
                };
            M || (k = function(e) {
                h(this, k, "Promise", "_h"), p(e), r.call(this);
                try {
                    e(s(R, this, 1), s(E, this, 1))
                } catch (e) {
                    E.call(this, e)
                }
            }, r = function(e) {
                this._c = [], this._a = n, this._s = 0, this._d = !1, this._v = n, this._h = 0, this._n = !1
            }, r.prototype = o(202)(k.prototype, {
                then: function(e, t) {
                    var o = A(g(this, k));
                    return o.ok = "function" != typeof e || e, o.fail = "function" == typeof t && t, o.domain = w ? _.domain : n, this._c.push(o), this._a && this._a.push(o), this._s && I(this, !1), o.promise
                },
                catch: function(e) {
                    return this.then(n, e)
                }
            }), O = function() {
                var e = new r;
                this.promise = e, this.resolve = s(R, e, 1), this.reject = s(E, e, 1)
            }), l(l.G + l.W + l.F * !M, {
                Promise: k
            }), o(22)(k, "Promise"), o(186)("Promise"), a = o(7).Promise, l(l.S + l.F * !M, "Promise", {
                reject: function(e) {
                    var t = A(this);
                    return (0, t.reject)(e), t.promise
                }
            }), l(l.S + l.F * (c || !M), "Promise", {
                resolve: function(e) {
                    if (e instanceof k && C(e.constructor, this)) return e;
                    var t = A(this);
                    return (0, t.resolve)(e), t.promise
                }
            }), l(l.S + l.F * !(M && o(157)(function(e) {
                k.all(e).catch(S)
            })), "Promise", {
                all: function(e) {
                    var t = this,
                        o = A(t),
                        r = o.resolve,
                        i = o.reject,
                        a = T(function() {
                            var o = [],
                                a = 0,
                                c = 1;
                            v(e, !1, function(e) {
                                var u = a++,
                                    s = !1;
                                o.push(n), c++, t.resolve(e).then(function(e) {
                                    s || (s = !0, o[u] = e, --c || r(o))
                                }, i)
                            }), --c || r(o)
                        });
                    return a && i(a.error), o.promise
                },
                race: function(e) {
                    var t = this,
                        n = A(t),
                        o = n.reject,
                        r = T(function() {
                            v(e, !1, function(e) {
                                t.resolve(e).then(n.resolve, o)
                            })
                        });
                    return r && o(r.error), n.promise
                }
            })
        }, function(e, t) {
            e.exports = function(e, t, o, r) {
                if (!(e instanceof t) || r !== n && r in e) throw TypeError(o + ": incorrect invocation!");
                return e
            }
        }, function(e, t, n) {
            var o = n(18),
                r = n(153),
                i = n(154),
                a = n(10),
                c = n(35),
                u = n(156),
                s = {},
                f = {},
                t = e.exports = function(e, t, n, l, d) {
                    var p, h, v, g, y = d ? function() {
                            return e
                        } : u(e),
                        b = o(n, l, t ? 2 : 1),
                        m = 0;
                    if ("function" != typeof y) throw TypeError(e + " is not iterable!");
                    if (i(y)) {
                        for (p = c(e.length); p > m; m++)
                            if ((g = t ? b(a(h = e[m])[0], h[1]) : b(e[m])) === s || g === f) return g
                    } else
                        for (v = y.call(e); !(h = v.next()).done;)
                            if ((g = r(v, b, h.value, t)) === s || g === f) return g
                };
            t.BREAK = s, t.RETURN = f
        }, function(e, t, o) {
            var r = o(10),
                i = o(19),
                a = o(23)("species");
            e.exports = function(e, t) {
                var o, c = r(e).constructor;
                return c === n || (o = r(c)[a]) == n ? t : i(o)
            }
        }, function(e, t, n) {
            var o, r, i, a = n(18),
                c = n(76),
                u = n(46),
                s = n(13),
                f = n(2),
                l = f.process,
                d = f.setImmediate,
                p = f.clearImmediate,
                h = f.MessageChannel,
                v = 0,
                g = {},
                y = function() {
                    var e = +this;
                    if (g.hasOwnProperty(e)) {
                        var t = g[e];
                        delete g[e], t()
                    }
                },
                b = function(e) {
                    y.call(e.data)
                };
            d && p || (d = function(e) {
                for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
                return g[++v] = function() {
                    c("function" == typeof e ? e : Function(e), t)
                }, o(v), v
            }, p = function(e) {
                delete g[e]
            }, "process" == n(32)(l) ? o = function(e) {
                l.nextTick(a(y, e, 1))
            } : h ? (r = new h, i = r.port2, r.port1.onmessage = b, o = a(i.postMessage, i, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (o = function(e) {
                f.postMessage(e + "", "*")
            }, f.addEventListener("message", b, !1)) : o = "onreadystatechange" in s("script") ? function(e) {
                u.appendChild(s("script")).onreadystatechange = function() {
                    u.removeChild(this), y.call(e)
                }
            } : function(e) {
                setTimeout(a(y, e, 1), 0)
            }), e.exports = {
                set: d,
                clear: p
            }
        }, function(e, t, o) {
            var r = o(2),
                i = o(200).set,
                a = r.MutationObserver || r.WebKitMutationObserver,
                c = r.process,
                u = r.Promise,
                s = "process" == o(32)(c);
            e.exports = function() {
                var e, t, o, f = function() {
                    var r, i;
                    for (s && (r = c.domain) && r.exit(); e;) {
                        i = e.fn, e = e.next;
                        try {
                            i()
                        } catch (r) {
                            throw e ? o() : t = n, r
                        }
                    }
                    t = n, r && r.enter()
                };
                if (s) o = function() {
                    c.nextTick(f)
                };
                else if (a) {
                    var l = !0,
                        d = document.createTextNode("");
                    new a(f).observe(d, {
                        characterData: !0
                    }), o = function() {
                        d.data = l = !l
                    }
                } else if (u && u.resolve) {
                    var p = u.resolve();
                    o = function() {
                        p.then(f)
                    }
                } else o = function() {
                    i.call(r, f)
                };
                return function(r) {
                    var i = {
                        fn: r,
                        next: n
                    };
                    t && (t.next = i), e || (e = i, o()), t = i
                }
            }
        }, function(e, t, n) {
            var o = n(16);
            e.exports = function(e, t, n) {
                for (var r in t) o(e, r, t[r], n);
                return e
            }
        }, function(e, t, o) {
            var r = o(204);
            e.exports = o(205)("Map", function(e) {
                return function() {
                    return e(this, arguments.length > 0 ? arguments[0] : n)
                }
            }, {
                get: function(e) {
                    var t = r.getEntry(this, e);
                    return t && t.v
                },
                set: function(e, t) {
                    return r.def(this, 0 === e ? 0 : e, t)
                }
            }, r, !0)
        }, function(e, t, o) {
            var r = o(9).f,
                i = o(44),
                a = o(202),
                c = o(18),
                u = o(197),
                s = o(33),
                f = o(198),
                l = o(134),
                d = o(184),
                p = o(186),
                h = o(4),
                v = o(20).fastKey,
                g = h ? "_s" : "size",
                y = function(e, t) {
                    var n, o = v(t);
                    if ("F" !== o) return e._i[o];
                    for (n = e._f; n; n = n.n)
                        if (n.k == t) return n
                };
            e.exports = {
                getConstructor: function(e, t, o, l) {
                    var d = e(function(e, r) {
                        u(e, d, t, "_i"), e._i = i(null), e._f = n, e._l = n, e[g] = 0, r != n && f(r, o, e[l], e)
                    });
                    return a(d.prototype, {
                        clear: function() {
                            for (var e = this, t = e._i, o = e._f; o; o = o.n) o.r = !0, o.p && (o.p = o.p.n = n), delete t[o.i];
                            e._f = e._l = n, e[g] = 0
                        },
                        delete: function(e) {
                            var t = this,
                                n = y(t, e);
                            if (n) {
                                var o = n.n,
                                    r = n.p;
                                delete t._i[n.i], n.r = !0, r && (r.n = o), o && (o.p = r), t._f == n && (t._f = o), t._l == n && (t._l = r), t[g]--
                            }
                            return !!n
                        },
                        forEach: function(e) {
                            u(this, d, "forEach");
                            for (var t, o = c(e, arguments.length > 1 ? arguments[1] : n, 3); t = t ? t.n : this._f;)
                                for (o(t.v, t.k, this); t && t.r;) t = t.p
                        },
                        has: function(e) {
                            return !!y(this, e)
                        }
                    }), h && r(d.prototype, "size", {
                        get: function() {
                            return s(this[g])
                        }
                    }), d
                },
                def: function(e, t, o) {
                    var r, i, a = y(e, t);
                    return a ? a.v = o : (e._l = a = {
                        i: i = v(t, !0),
                        k: t,
                        v: o,
                        p: r = e._l,
                        n: n,
                        r: !1
                    }, e._f || (e._f = a), r && (r.n = a), e[g]++, "F" !== i && (e._i[i] = a)), e
                },
                getEntry: y,
                setStrong: function(e, t, o) {
                    l(e, t, function(e, t) {
                        this._t = e, this._k = t, this._l = n
                    }, function() {
                        for (var e = this, t = e._k, o = e._l; o && o.r;) o = o.p;
                        return e._t && (e._l = o = o ? o.n : e._t._f) ? "keys" == t ? d(0, o.k) : "values" == t ? d(0, o.v) : d(0, [o.k, o.v]) : (e._t = n, d(1))
                    }, o ? "entries" : "values", !o, !0), p(t)
                }
            }
        }, function(e, t, o) {
            var r = o(2),
                i = o(6),
                a = o(16),
                c = o(202),
                u = o(20),
                s = o(198),
                f = o(197),
                l = o(11),
                d = o(5),
                p = o(157),
                h = o(22),
                v = o(80);
            e.exports = function(e, t, o, g, y, b) {
                var m = r[e],
                    _ = m,
                    k = y ? "set" : "add",
                    w = _ && _.prototype,
                    S = {},
                    M = function(e) {
                        var t = w[e];
                        a(w, e, "delete" == e ? function(e) {
                            return !(b && !l(e)) && t.call(this, 0 === e ? 0 : e)
                        } : "has" == e ? function(e) {
                            return !(b && !l(e)) && t.call(this, 0 === e ? 0 : e)
                        } : "get" == e ? function(e) {
                            return b && !l(e) ? n : t.call(this, 0 === e ? 0 : e)
                        } : "add" == e ? function(e) {
                            return t.call(this, 0 === e ? 0 : e), this
                        } : function(e, n) {
                            return t.call(this, 0 === e ? 0 : e, n), this
                        })
                    };
                if ("function" == typeof _ && (b || w.forEach && !d(function() {
                        (new _).entries().next()
                    }))) {
                    var C = new _,
                        P = C[k](b ? {} : -0, 1) != C,
                        A = d(function() {
                            C.has(1)
                        }),
                        O = p(function(e) {
                            new _(e)
                        }),
                        T = !b && d(function() {
                            for (var e = new _, t = 5; t--;) e[k](t, t);
                            return !e.has(-0)
                        });
                    O || (_ = t(function(t, o) {
                        f(t, _, e);
                        var r = v(new m, t, _);
                        return o != n && s(o, y, r[k], r), r
                    }), _.prototype = w, w.constructor = _), (A || T) && (M("delete"), M("has"), y && M("get")), (T || P) && M(k), b && w.clear && delete w.clear
                } else _ = g.getConstructor(t, e, y, k), c(_.prototype, o), u.NEED = !0;
                return h(_, e), S[e] = _, i(i.G + i.W + i.F * (_ != m), S), b || g.setStrong(_, e, y), _
            }
        }, function(e, t, o) {
            var r = o(204);
            e.exports = o(205)("Set", function(e) {
                return function() {
                    return e(this, arguments.length > 0 ? arguments[0] : n)
                }
            }, {
                add: function(e) {
                    return r.def(this, e = 0 === e ? 0 : e, e)
                }
            }, r)
        }, function(e, t, o) {
            var r, i = o(164)(0),
                a = o(16),
                c = o(20),
                u = o(67),
                s = o(208),
                f = o(11),
                l = c.getWeak,
                d = Object.isExtensible,
                p = s.ufstore,
                h = {},
                v = function(e) {
                    return function() {
                        return e(this, arguments.length > 0 ? arguments[0] : n)
                    }
                },
                g = {
                    get: function(e) {
                        if (f(e)) {
                            var t = l(e);
                            return !0 === t ? p(this).get(e) : t ? t[this._i] : n
                        }
                    },
                    set: function(e, t) {
                        return s.def(this, e, t)
                    }
                },
                y = e.exports = o(205)("WeakMap", v, g, s, !0, !0);
            7 != (new y).set((Object.freeze || Object)(h), 7).get(h) && (r = s.getConstructor(v), u(r.prototype, g), c.NEED = !0, i(["delete", "has", "get", "set"], function(e) {
                var t = y.prototype,
                    n = t[e];
                a(t, e, function(t, o) {
                    if (f(t) && !d(t)) {
                        this._f || (this._f = new r);
                        var i = this._f[e](t, o);
                        return "set" == e ? this : i
                    }
                    return n.call(this, t, o)
                })
            }))
        }, function(e, t, o) {
            var r = o(202),
                i = o(20).getWeak,
                a = o(10),
                c = o(11),
                u = o(197),
                s = o(198),
                f = o(164),
                l = o(3),
                d = f(5),
                p = f(6),
                h = 0,
                v = function(e) {
                    return e._l || (e._l = new g)
                },
                g = function() {
                    this.a = []
                },
                y = function(e, t) {
                    return d(e.a, function(e) {
                        return e[0] === t
                    })
                };
            g.prototype = {
                get: function(e) {
                    var t = y(this, e);
                    if (t) return t[1]
                },
                has: function(e) {
                    return !!y(this, e)
                },
                set: function(e, t) {
                    var n = y(this, e);
                    n ? n[1] = t : this.a.push([e, t])
                },
                delete: function(e) {
                    var t = p(this.a, function(t) {
                        return t[0] === e
                    });
                    return ~t && this.a.splice(t, 1), !!~t
                }
            }, e.exports = {
                getConstructor: function(e, t, o, a) {
                    var f = e(function(e, r) {
                        u(e, f, t, "_i"), e._i = h++, e._l = n, r != n && s(r, o, e[a], e)
                    });
                    return r(f.prototype, {
                        delete: function(e) {
                            if (!c(e)) return !1;
                            var t = i(e);
                            return !0 === t ? v(this).delete(e) : t && l(t, this._i) && delete t[this._i]
                        },
                        has: function(e) {
                            if (!c(e)) return !1;
                            var t = i(e);
                            return !0 === t ? v(this).has(e) : t && l(t, this._i)
                        }
                    }), f
                },
                def: function(e, t, n) {
                    var o = i(a(t), !0);
                    return !0 === o ? v(e).set(t, n) : o[e._i] = n, e
                },
                ufstore: v
            }
        }, function(e, t, o) {
            var r = o(208);
            o(205)("WeakSet", function(e) {
                return function() {
                    return e(this, arguments.length > 0 ? arguments[0] : n)
                }
            }, {
                add: function(e) {
                    return r.def(this, e, !0)
                }
            }, r, !1, !0)
        }, function(e, t, n) {
            var o = n(6),
                r = n(19),
                i = n(10),
                a = (n(2).Reflect || {}).apply,
                c = Function.apply;
            o(o.S + o.F * !n(5)(function() {
                a(function() {})
            }), "Reflect", {
                apply: function(e, t, n) {
                    var o = r(e),
                        u = i(n);
                    return a ? a(o, t, u) : c.call(o, t, u)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(44),
                i = n(19),
                a = n(10),
                c = n(11),
                u = n(5),
                s = n(75),
                f = (n(2).Reflect || {}).construct,
                l = u(function() {
                    function e() {}
                    return !(f(function() {}, [], e) instanceof e)
                }),
                d = !u(function() {
                    f(function() {})
                });
            o(o.S + o.F * (l || d), "Reflect", {
                construct: function(e, t) {
                    i(e), a(t);
                    var n = arguments.length < 3 ? e : i(arguments[2]);
                    if (d && !l) return f(e, t, n);
                    if (e == n) {
                        switch (t.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t[0]);
                            case 2:
                                return new e(t[0], t[1]);
                            case 3:
                                return new e(t[0], t[1], t[2]);
                            case 4:
                                return new e(t[0], t[1], t[2], t[3])
                        }
                        var o = [null];
                        return o.push.apply(o, t), new(s.apply(e, o))
                    }
                    var u = n.prototype,
                        p = r(c(u) ? u : Object.prototype),
                        h = Function.apply.call(e, p, t);
                    return c(h) ? h : p
                }
            })
        }, function(e, t, n) {
            var o = n(9),
                r = n(6),
                i = n(10),
                a = n(14);
            r(r.S + r.F * n(5)(function() {
                Reflect.defineProperty(o.f({}, 1, {
                    value: 1
                }), 1, {
                    value: 2
                })
            }), "Reflect", {
                defineProperty: function(e, t, n) {
                    i(e), t = a(t, !0), i(n);
                    try {
                        return o.f(e, t, n), !0
                    } catch (e) {
                        return !1
                    }
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(49).f,
                i = n(10);
            o(o.S, "Reflect", {
                deleteProperty: function(e, t) {
                    var n = r(i(e), t);
                    return !(n && !n.configurable) && delete e[t]
                }
            })
        }, function(e, t, o) {
            var r = o(6),
                i = o(10),
                a = function(e) {
                    this._t = i(e), this._i = 0;
                    var t, n = this._k = [];
                    for (t in e) n.push(t)
                };
            o(136)(a, "Object", function() {
                var e, t = this,
                    o = t._k;
                do {
                    if (t._i >= o.length) return {
                        value: n,
                        done: !0
                    }
                } while (!((e = o[t._i++]) in t._t));
                return {
                    value: e,
                    done: !1
                }
            }), r(r.S, "Reflect", {
                enumerate: function(e) {
                    return new a(e)
                }
            })
        }, function(e, t, o) {
            function r(e, t) {
                var o, u, l = arguments.length < 3 ? e : arguments[2];
                return f(e) === l ? e[t] : (o = i.f(e, t)) ? c(o, "value") ? o.value : o.get !== n ? o.get.call(l) : n : s(u = a(e)) ? r(u, t, l) : void 0
            }
            var i = o(49),
                a = o(57),
                c = o(3),
                u = o(6),
                s = o(11),
                f = o(10);
            u(u.S, "Reflect", {
                get: r
            })
        }, function(e, t, n) {
            var o = n(49),
                r = n(6),
                i = n(10);
            r(r.S, "Reflect", {
                getOwnPropertyDescriptor: function(e, t) {
                    return o.f(i(e), t)
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(57),
                i = n(10);
            o(o.S, "Reflect", {
                getPrototypeOf: function(e) {
                    return r(i(e))
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Reflect", {
                has: function(e, t) {
                    return t in e
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(10),
                i = Object.isExtensible;
            o(o.S, "Reflect", {
                isExtensible: function(e) {
                    return r(e), !i || i(e)
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Reflect", {
                ownKeys: n(221)
            })
        }, function(e, t, n) {
            var o = n(48),
                r = n(41),
                i = n(10),
                a = n(2).Reflect;
            e.exports = a && a.ownKeys || function(e) {
                var t = o.f(i(e)),
                    n = r.f;
                return n ? t.concat(n(e)) : t
            }
        }, function(e, t, n) {
            var o = n(6),
                r = n(10),
                i = Object.preventExtensions;
            o(o.S, "Reflect", {
                preventExtensions: function(e) {
                    r(e);
                    try {
                        return i && i(e), !0
                    } catch (e) {
                        return !1
                    }
                }
            })
        }, function(e, t, o) {
            function r(e, t, o) {
                var s, p, h = arguments.length < 4 ? e : arguments[3],
                    v = a.f(l(e), t);
                if (!v) {
                    if (d(p = c(e))) return r(p, t, o, h);
                    v = f(0)
                }
                return u(v, "value") ? !(!1 === v.writable || !d(h)) && (s = a.f(h, t) || f(0), s.value = o, i.f(h, t, s), !0) : v.set !== n && (v.set.call(h, o), !0)
            }
            var i = o(9),
                a = o(49),
                c = o(57),
                u = o(3),
                s = o(6),
                f = o(15),
                l = o(10),
                d = o(11);
            s(s.S, "Reflect", {
                set: r
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(71);
            r && o(o.S, "Reflect", {
                setPrototypeOf: function(e, t) {
                    r.check(e, t);
                    try {
                        return r.set(e, t), !0
                    } catch (e) {
                        return !1
                    }
                }
            })
        }, function(e, t, n) {
            var o = n(6);
            o(o.S, "Date", {
                now: function() {
                    return (new Date).getTime()
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(56),
                i = n(14);
            o(o.P + o.F * n(5)(function() {
                return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
                    toISOString: function() {
                        return 1
                    }
                })
            }), "Date", {
                toJSON: function(e) {
                    var t = r(this),
                        n = i(t);
                    return "number" != typeof n || isFinite(n) ? t.toISOString() : null
                }
            })
        }, function(e, t, n) {
            var o = n(6),
                r = n(5),
                i = Date.prototype.getTime,
                a = function(e) {
                    return e > 9 ? e : "0" + e
                };
            o(o.P + o.F * (r(function() {
                return "0385-07-25T07:06:39.999Z" != new Date(-5e13 - 1).toISOString()
            }) || !r(function() {
                new Date(NaN).toISOString()
            })), "Date", {
                toISOString: function() {
                    if (!isFinite(i.call(this))) throw RangeError("Invalid time value");
                    var e = this,
                        t = e.getUTCFullYear(),
                        n = e.getUTCMilliseconds(),
                        o = t < 0 ? "-" : t > 9999 ? "+" : "";
                    return o + ("00000" + Math.abs(t)).slice(o ? -6 : -4) + "-" + a(e.getUTCMonth() + 1) + "-" + a(e.getUTCDate()) + "T" + a(e.getUTCHours()) + ":" + a(e.getUTCMinutes()) + ":" + a(e.getUTCSeconds()) + "." + (n > 99 ? n : "0" + a(n)) + "Z"
                }
            })
        }, function(e, t, n) {
            var o = Date.prototype,
                r = o.toString,
                i = o.getTime;
            new Date(NaN) + "" != "Invalid Date" && n(16)(o, "toString", function() {
                var e = i.call(this);
                return e === e ? r.call(this) : "Invalid Date"
            })
        }, function(e, t, n) {
            var o = n(23)("toPrimitive"),
                r = Date.prototype;
            o in r || n(8)(r, o, n(230))
        }, function(e, t, n) {
            var o = n(10),
                r = n(14);
            e.exports = function(e) {
                if ("string" !== e && "number" !== e && "default" !== e) throw TypeError("Incorrect hint");
                return r(o(this), "number" != e)
            }
        }, function(e, t, o) {
            var r = o(6),
                i = o(232),
                a = o(233),
                c = o(10),
                u = o(37),
                s = o(35),
                f = o(11),
                l = o(2).ArrayBuffer,
                d = o(199),
                p = a.ArrayBuffer,
                h = a.DataView,
                v = i.ABV && l.isView,
                g = p.prototype.slice,
                y = i.VIEW;
            r(r.G + r.W + r.F * (l !== p), {
                ArrayBuffer: p
            }), r(r.S + r.F * !i.CONSTR, "ArrayBuffer", {
                isView: function(e) {
                    return v && v(e) || f(e) && y in e
                }
            }), r(r.P + r.U + r.F * o(5)(function() {
                return !new p(2).slice(1, n).byteLength
            }), "ArrayBuffer", {
                slice: function(e, t) {
                    if (g !== n && t === n) return g.call(c(this), e);
                    for (var o = c(this).byteLength, r = u(e, o), i = u(t === n ? o : t, o), a = new(d(this, p))(s(i - r)), f = new h(this), l = new h(a), v = 0; r < i;) l.setUint8(v++, f.getUint8(r++));
                    return a
                }
            }), o(186)("ArrayBuffer")
        }, function(e, t, n) {
            for (var o, r = n(2), i = n(8), a = n(17), c = a("typed_array"), u = a("view"), s = !(!r.ArrayBuffer || !r.DataView), f = s, l = 0, d = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); l < 9;)(o = r[d[l++]]) ? (i(o.prototype, c, !0), i(o.prototype, u, !0)) : f = !1;
            e.exports = {
                ABV: s,
                CONSTR: f,
                TYPED: c,
                VIEW: u
            }
        }, function(e, t, o) {
            var r = o(2),
                i = o(4),
                a = o(26),
                c = o(232),
                u = o(8),
                s = o(202),
                f = o(5),
                l = o(197),
                d = o(36),
                p = o(35),
                h = o(48).f,
                v = o(9).f,
                g = o(180),
                y = o(22),
                b = r.ArrayBuffer,
                m = r.DataView,
                _ = r.Math,
                k = r.RangeError,
                w = r.Infinity,
                S = b,
                M = _.abs,
                C = _.pow,
                P = _.floor,
                A = _.log,
                O = _.LN2,
                T = i ? "_b" : "buffer",
                I = i ? "_l" : "byteLength",
                x = i ? "_o" : "byteOffset",
                B = function(e, t, n) {
                    var o, r, i, a = Array(n),
                        c = 8 * n - t - 1,
                        u = (1 << c) - 1,
                        s = u >> 1,
                        f = 23 === t ? C(2, -24) - C(2, -77) : 0,
                        l = 0,
                        d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = M(e), e != e || e === w ? (r = e != e ? 1 : 0, o = u) : (o = P(A(e) / O), e * (i = C(2, -o)) < 1 && (o--, i *= 2), e += o + s >= 1 ? f / i : f * C(2, 1 - s), e * i >= 2 && (o++, i /= 2), o + s >= u ? (r = 0, o = u) : o + s >= 1 ? (r = (e * i - 1) * C(2, t), o += s) : (r = e * C(2, s - 1) * C(2, t), o = 0)); t >= 8; a[l++] = 255 & r, r /= 256, t -= 8);
                    for (o = o << t | r, c += t; c > 0; a[l++] = 255 & o, o /= 256, c -= 8);
                    return a[--l] |= 128 * d, a
                },
                j = function(e, t, n) {
                    var o, r = 8 * n - t - 1,
                        i = (1 << r) - 1,
                        a = i >> 1,
                        c = r - 7,
                        u = n - 1,
                        s = e[u--],
                        f = 127 & s;
                    for (s >>= 7; c > 0; f = 256 * f + e[u], u--, c -= 8);
                    for (o = f & (1 << -c) - 1, f >>= -c, c += t; c > 0; o = 256 * o + e[u], u--, c -= 8);
                    if (0 === f) f = 1 - a;
                    else {
                        if (f === i) return o ? NaN : s ? -w : w;
                        o += C(2, t), f -= a
                    }
                    return (s ? -1 : 1) * o * C(2, f - t)
                },
                E = function(e) {
                    return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
                },
                R = function(e) {
                    return [255 & e]
                },
                D = function(e) {
                    return [255 & e, e >> 8 & 255]
                },
                L = function(e) {
                    return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
                },
                F = function(e) {
                    return B(e, 52, 8)
                },
                N = function(e) {
                    return B(e, 23, 4)
                },
                W = function(e, t, n) {
                    v(e.prototype, t, {
                        get: function() {
                            return this[n]
                        }
                    })
                },
                U = function(e, t, n, o) {
                    var r = +n,
                        i = d(r);
                    if (r != i || i < 0 || i + t > e[I]) throw k("Wrong index!");
                    var a = e[T]._b,
                        c = i + e[x],
                        u = a.slice(c, c + t);
                    return o ? u : u.reverse()
                },
                V = function(e, t, n, o, r, i) {
                    var a = +n,
                        c = d(a);
                    if (a != c || c < 0 || c + t > e[I]) throw k("Wrong index!");
                    for (var u = e[T]._b, s = c + e[x], f = o(+r), l = 0; l < t; l++) u[s + l] = f[i ? l : t - l - 1]
                },
                J = function(e, t) {
                    l(e, b, "ArrayBuffer");
                    var n = +t,
                        o = p(n);
                    if (n != o) throw k("Wrong length!");
                    return o
                };
            if (c.ABV) {
                if (!f(function() {
                        new b
                    }) || !f(function() {
                        new b(.5)
                    })) {
                    b = function(e) {
                        return new S(J(this, e))
                    };
                    for (var K, q = b.prototype = S.prototype, G = h(S), z = 0; G.length > z;)(K = G[z++]) in b || u(b, K, S[K]);
                    a || (q.constructor = b)
                }
                var H = new m(new b(2)),
                    X = m.prototype.setInt8;
                H.setInt8(0, 2147483648), H.setInt8(1, 2147483649), !H.getInt8(0) && H.getInt8(1) || s(m.prototype, {
                    setInt8: function(e, t) {
                        X.call(this, e, t << 24 >> 24)
                    },
                    setUint8: function(e, t) {
                        X.call(this, e, t << 24 >> 24)
                    }
                }, !0)
            } else b = function(e) {
                var t = J(this, e);
                this._b = g.call(Array(t), 0), this[I] = t
            }, m = function(e, t, o) {
                l(this, m, "DataView"), l(e, b, "DataView");
                var r = e[I],
                    i = d(t);
                if (i < 0 || i > r) throw k("Wrong offset!");
                if (o = o === n ? r - i : p(o), i + o > r) throw k("Wrong length!");
                this[T] = e, this[x] = i, this[I] = o
            }, i && (W(b, "byteLength", "_l"), W(m, "buffer", "_b"), W(m, "byteLength", "_l"), W(m, "byteOffset", "_o")), s(m.prototype, {
                getInt8: function(e) {
                    return U(this, 1, e)[0] << 24 >> 24
                },
                getUint8: function(e) {
                    return U(this, 1, e)[0]
                },
                getInt16: function(e) {
                    var t = U(this, 2, e, arguments[1]);
                    return (t[1] << 8 | t[0]) << 16 >> 16
                },
                getUint16: function(e) {
                    var t = U(this, 2, e, arguments[1]);
                    return t[1] << 8 | t[0]
                },
                getInt32: function(e) {
                    return E(U(this, 4, e, arguments[1]))
                },
                getUint32: function(e) {
                    return E(U(this, 4, e, arguments[1])) >>> 0
                },
                getFloat32: function(e) {
                    return j(U(this, 4, e, arguments[1]), 23, 4)
                },
                getFloat64: function(e) {
                    return j(U(this, 8, e, arguments[1]), 52, 8)
                },
                setInt8: function(e, t) {
                    V(this, 1, e, R, t)
                },
                setUint8: function(e, t) {
                    V(this, 1, e, R, t)
                },
                setInt16: function(e, t) {
                    V(this, 2, e, D, t, arguments[2])
                },
                setUint16: function(e, t) {
                    V(this, 2, e, D, t, arguments[2])
                },
                setInt32: function(e, t) {
                    V(this, 4, e, L, t, arguments[2])
                },
                setUint32: function(e, t) {
                    V(this, 4, e, L, t, arguments[2])
                },
                setFloat32: function(e, t) {
                    V(this, 4, e, N, t, arguments[2])
                },
                setFloat64: function(e, t) {
                    V(this, 8, e, F, t, arguments[2])
                }
            });
            y(b, "ArrayBuffer"), y(m, "DataView"), u(m.prototype, c.VIEW, !0), t.ArrayBuffer = b, t.DataView = m
        }, function(e, t, n) {
            var o = n(6);
            o(o.G + o.W + o.F * !n(232).ABV, {
                DataView: n(233).DataView
            })
        }, function(e, t, n) {
            n(236)("Int8", 1, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, o) {
            if (o(4)) {
                var r = o(26),
                    i = o(2),
                    a = o(5),
                    c = o(6),
                    u = o(232),
                    s = o(233),
                    f = o(18),
                    l = o(197),
                    d = o(15),
                    p = o(8),
                    h = o(202),
                    v = o(36),
                    g = o(35),
                    y = o(37),
                    b = o(14),
                    m = o(3),
                    _ = o(69),
                    k = o(73),
                    w = o(11),
                    S = o(56),
                    M = o(154),
                    C = o(44),
                    P = o(57),
                    A = o(48).f,
                    O = o(156),
                    T = o(17),
                    I = o(23),
                    x = o(164),
                    B = o(34),
                    j = o(199),
                    E = o(183),
                    R = o(135),
                    D = o(157),
                    L = o(186),
                    F = o(180),
                    N = o(177),
                    W = o(9),
                    U = o(49),
                    V = W.f,
                    J = U.f,
                    K = i.RangeError,
                    q = i.TypeError,
                    G = i.Uint8Array,
                    z = Array.prototype,
                    H = s.ArrayBuffer,
                    X = s.DataView,
                    $ = x(0),
                    Y = x(2),
                    Q = x(3),
                    Z = x(4),
                    ee = x(5),
                    te = x(6),
                    ne = B(!0),
                    oe = B(!1),
                    re = E.values,
                    ie = E.keys,
                    ae = E.entries,
                    ce = z.lastIndexOf,
                    ue = z.reduce,
                    se = z.reduceRight,
                    fe = z.join,
                    le = z.sort,
                    de = z.slice,
                    pe = z.toString,
                    he = z.toLocaleString,
                    ve = I("iterator"),
                    ge = I("toStringTag"),
                    ye = T("typed_constructor"),
                    be = T("def_constructor"),
                    me = u.CONSTR,
                    _e = u.TYPED,
                    ke = u.VIEW,
                    we = x(1, function(e, t) {
                        return Oe(j(e, e[be]), t)
                    }),
                    Se = a(function() {
                        return 1 === new G(new Uint16Array([1]).buffer)[0]
                    }),
                    Me = !!G && !!G.prototype.set && a(function() {
                        new G(1).set({})
                    }),
                    Ce = function(e, t) {
                        if (e === n) throw q("Wrong length!");
                        var o = +e,
                            r = g(e);
                        if (t && !_(o, r)) throw K("Wrong length!");
                        return r
                    },
                    Pe = function(e, t) {
                        var n = v(e);
                        if (n < 0 || n % t) throw K("Wrong offset!");
                        return n
                    },
                    Ae = function(e) {
                        if (w(e) && _e in e) return e;
                        throw q(e + " is not a typed array!")
                    },
                    Oe = function(e, t) {
                        if (!(w(e) && ye in e)) throw q("It is not a typed array constructor!");
                        return new e(t)
                    },
                    Te = function(e, t) {
                        return Ie(j(e, e[be]), t)
                    },
                    Ie = function(e, t) {
                        for (var n = 0, o = t.length, r = Oe(e, o); o > n;) r[n] = t[n++];
                        return r
                    },
                    xe = function(e, t, n) {
                        V(e, t, {
                            get: function() {
                                return this._d[n]
                            }
                        })
                    },
                    Be = function(e) {
                        var t, o, r, i, a, c, u = S(e),
                            s = arguments.length,
                            l = s > 1 ? arguments[1] : n,
                            d = l !== n,
                            p = O(u);
                        if (p != n && !M(p)) {
                            for (c = p.call(u), r = [], t = 0; !(a = c.next()).done; t++) r.push(a.value);
                            u = r
                        }
                        for (d && s > 2 && (l = f(l, arguments[2], 2)), t = 0, o = g(u.length), i = Oe(this, o); o > t; t++) i[t] = d ? l(u[t], t) : u[t];
                        return i
                    },
                    je = function() {
                        for (var e = 0, t = arguments.length, n = Oe(this, t); t > e;) n[e] = arguments[e++];
                        return n
                    },
                    Ee = !!G && a(function() {
                        he.call(new G(1))
                    }),
                    Re = function() {
                        return he.apply(Ee ? de.call(Ae(this)) : Ae(this), arguments)
                    },
                    De = {
                        copyWithin: function(e, t) {
                            return N.call(Ae(this), e, t, arguments.length > 2 ? arguments[2] : n)
                        },
                        every: function(e) {
                            return Z(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        fill: function(e) {
                            return F.apply(Ae(this), arguments)
                        },
                        filter: function(e) {
                            return Te(this, Y(Ae(this), e, arguments.length > 1 ? arguments[1] : n))
                        },
                        find: function(e) {
                            return ee(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        findIndex: function(e) {
                            return te(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        forEach: function(e) {
                            $(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        indexOf: function(e) {
                            return oe(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        includes: function(e) {
                            return ne(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        join: function(e) {
                            return fe.apply(Ae(this), arguments)
                        },
                        lastIndexOf: function(e) {
                            return ce.apply(Ae(this), arguments)
                        },
                        map: function(e) {
                            return we(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        reduce: function(e) {
                            return ue.apply(Ae(this), arguments)
                        },
                        reduceRight: function(e) {
                            return se.apply(Ae(this), arguments)
                        },
                        reverse: function() {
                            for (var e, t = this, n = Ae(t).length, o = Math.floor(n / 2), r = 0; r < o;) e = t[r], t[r++] = t[--n], t[n] = e;
                            return t
                        },
                        some: function(e) {
                            return Q(Ae(this), e, arguments.length > 1 ? arguments[1] : n)
                        },
                        sort: function(e) {
                            return le.call(Ae(this), e)
                        },
                        subarray: function(e, t) {
                            var o = Ae(this),
                                r = o.length,
                                i = y(e, r);
                            return new(j(o, o[be]))(o.buffer, o.byteOffset + i * o.BYTES_PER_ELEMENT, g((t === n ? r : y(t, r)) - i))
                        }
                    },
                    Le = function(e, t) {
                        return Te(this, de.call(Ae(this), e, t))
                    },
                    Fe = function(e) {
                        Ae(this);
                        var t = Pe(arguments[1], 1),
                            n = this.length,
                            o = S(e),
                            r = g(o.length),
                            i = 0;
                        if (r + t > n) throw K("Wrong length!");
                        for (; i < r;) this[t + i] = o[i++]
                    },
                    Ne = {
                        entries: function() {
                            return ae.call(Ae(this))
                        },
                        keys: function() {
                            return ie.call(Ae(this))
                        },
                        values: function() {
                            return re.call(Ae(this))
                        }
                    },
                    We = function(e, t) {
                        return w(e) && e[_e] && "symbol" != typeof t && t in e && String(+t) == String(t)
                    },
                    Ue = function(e, t) {
                        return We(e, t = b(t, !0)) ? d(2, e[t]) : J(e, t)
                    },
                    Ve = function(e, t, n) {
                        return !(We(e, t = b(t, !0)) && w(n) && m(n, "value")) || m(n, "get") || m(n, "set") || n.configurable || m(n, "writable") && !n.writable || m(n, "enumerable") && !n.enumerable ? V(e, t, n) : (e[t] = n.value, e)
                    };
                me || (U.f = Ue, W.f = Ve), c(c.S + c.F * !me, "Object", {
                    getOwnPropertyDescriptor: Ue,
                    defineProperty: Ve
                }), a(function() {
                    pe.call({})
                }) && (pe = he = function() {
                    return fe.call(this)
                });
                var Je = h({}, De);
                h(Je, Ne), p(Je, ve, Ne.values), h(Je, {
                    slice: Le,
                    set: Fe,
                    constructor: function() {},
                    toString: pe,
                    toLocaleString: Re
                }), xe(Je, "buffer", "b"), xe(Je, "byteOffset", "o"), xe(Je, "byteLength", "l"), xe(Je, "length", "e"), V(Je, ge, {
                    get: function() {
                        return this[_e]
                    }
                }), e.exports = function(e, t, o, s) {
                    s = !!s;
                    var f = e + (s ? "Clamped" : "") + "Array",
                        d = "Uint8Array" != f,
                        h = "get" + e,
                        v = "set" + e,
                        y = i[f],
                        b = y || {},
                        m = y && P(y),
                        _ = !y || !u.ABV,
                        S = {},
                        M = y && y.prototype,
                        O = function(e, n) {
                            var o = e._d;
                            return o.v[h](n * t + o.o, Se)
                        },
                        T = function(e, n, o) {
                            var r = e._d;
                            s && (o = (o = Math.round(o)) < 0 ? 0 : o > 255 ? 255 : 255 & o), r.v[v](n * t + r.o, o, Se)
                        },
                        I = function(e, t) {
                            V(e, t, {
                                get: function() {
                                    return O(this, t)
                                },
                                set: function(e) {
                                    return T(this, t, e)
                                },
                                enumerable: !0
                            })
                        };
                    _ ? (y = o(function(e, o, r, i) {
                        l(e, y, f, "_d");
                        var a, c, u, s, d = 0,
                            h = 0;
                        if (w(o)) {
                            if (!(o instanceof H || "ArrayBuffer" == (s = k(o)) || "SharedArrayBuffer" == s)) return _e in o ? Ie(y, o) : Be.call(y, o);
                            a = o, h = Pe(r, t);
                            var v = o.byteLength;
                            if (i === n) {
                                if (v % t) throw K("Wrong length!");
                                if ((c = v - h) < 0) throw K("Wrong length!")
                            } else if ((c = g(i) * t) + h > v) throw K("Wrong length!");
                            u = c / t
                        } else u = Ce(o, !0), c = u * t, a = new H(c);
                        for (p(e, "_d", {
                                b: a,
                                o: h,
                                l: c,
                                e: u,
                                v: new X(a)
                            }); d < u;) I(e, d++)
                    }), M = y.prototype = C(Je), p(M, "constructor", y)) : D(function(e) {
                        new y(null), new y(e)
                    }, !0) || (y = o(function(e, o, r, i) {
                        l(e, y, f);
                        var a;
                        return w(o) ? o instanceof H || "ArrayBuffer" == (a = k(o)) || "SharedArrayBuffer" == a ? i !== n ? new b(o, Pe(r, t), i) : r !== n ? new b(o, Pe(r, t)) : new b(o) : _e in o ? Ie(y, o) : Be.call(y, o) : new b(Ce(o, d))
                    }), $(m !== Function.prototype ? A(b).concat(A(m)) : A(b), function(e) {
                        e in y || p(y, e, b[e])
                    }), y.prototype = M, r || (M.constructor = y));
                    var x = M[ve],
                        B = !!x && ("values" == x.name || x.name == n),
                        j = Ne.values;
                    p(y, ye, !0), p(M, _e, f), p(M, ke, !0), p(M, be, y), (s ? new y(1)[ge] == f : ge in M) || V(M, ge, {
                        get: function() {
                            return f
                        }
                    }), S[f] = y, c(c.G + c.W + c.F * (y != b), S), c(c.S, f, {
                        BYTES_PER_ELEMENT: t,
                        from: Be,
                        of: je
                    }), "BYTES_PER_ELEMENT" in M || p(M, "BYTES_PER_ELEMENT", t), c(c.P, f, De), L(f), c(c.P + c.F * Me, f, {
                        set: Fe
                    }), c(c.P + c.F * !B, f, Ne), c(c.P + c.F * (M.toString != pe), f, {
                        toString: pe
                    }), c(c.P + c.F * a(function() {
                        new y(1).slice()
                    }), f, {
                        slice: Le
                    }), c(c.P + c.F * (a(function() {
                        return [1, 2].toLocaleString() != new y([1, 2]).toLocaleString()
                    }) || !a(function() {
                        M.toLocaleString.call([1, 2])
                    })), f, {
                        toLocaleString: Re
                    }), R[f] = B ? x : j, r || B || p(M, ve, j)
                }
            } else e.exports = function() {}
        }, function(e, t, n) {
            n(236)("Uint8", 1, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, n) {
            n(236)("Uint8", 1, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            }, !0)
        }, function(e, t, n) {
            n(236)("Int16", 2, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, n) {
            n(236)("Uint16", 2, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, n) {
            n(236)("Int32", 4, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, n) {
            n(236)("Uint32", 4, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, n) {
            n(236)("Float32", 4, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, n) {
            n(236)("Float64", 8, function(e) {
                return function(t, n, o) {
                    return e(this, t, n, o)
                }
            })
        }, function(e, t, o) {
            function r(e) {
                var t = h(null);
                return e != n && (k(e) ? _(e, !0, function(e, n) {
                    t[e] = n
                }) : p(t, e)), t
            }

            function i(e, t, n) {
                m(t);
                var o, r, i = C(e),
                    a = g(i),
                    c = a.length,
                    u = 0;
                if (arguments.length < 3) {
                    if (!c) throw TypeError("Reduce of empty object with no initial value");
                    o = i[a[u++]]
                } else o = Object(n);
                for (; c > u;) A(i, r = a[u++]) && (o = t(o, i[r], r, e));
                return o
            }

            function a(e, t) {
                return (t == t ? b(e, t) : T(e, function(e) {
                    return e != e
                })) !== n
            }

            function c(e, t) {
                if (A(e, t)) return e[t]
            }

            function u(e, t, n) {
                return P && t in Object ? y.f(e, t, d(0, n)) : e[t] = n, e
            }

            function s(e) {
                return M(e) && v(e) === r.prototype
            }
            var f = o(18),
                l = o(6),
                d = o(15),
                p = o(67),
                h = o(44),
                v = o(57),
                g = o(28),
                y = o(9),
                b = o(27),
                m = o(19),
                _ = o(198),
                k = o(246),
                w = o(136),
                S = o(184),
                M = o(11),
                C = o(30),
                P = o(4),
                A = o(3),
                O = function(e) {
                    var t = 1 == e,
                        o = 4 == e;
                    return function(i, a, c) {
                        var u, s, l, d = f(a, c, 3),
                            p = C(i),
                            h = t || 7 == e || 2 == e ? new("function" == typeof this ? this : r) : n;
                        for (u in p)
                            if (A(p, u) && (s = p[u], l = d(s, u, i), e))
                                if (t) h[u] = l;
                                else if (l) switch (e) {
                            case 2:
                                h[u] = s;
                                break;
                            case 3:
                                return !0;
                            case 5:
                                return s;
                            case 6:
                                return u;
                            case 7:
                                h[l[0]] = l[1]
                        } else if (o) return !1;
                        return 3 == e || o ? o : h
                    }
                },
                T = O(6),
                I = function(e) {
                    return function(t) {
                        return new x(t, e)
                    }
                },
                x = function(e, t) {
                    this._t = C(e), this._a = g(e), this._i = 0, this._k = t
                };
            w(x, "Dict", function() {
                var e, t = this,
                    o = t._t,
                    r = t._a,
                    i = t._k;
                do {
                    if (t._i >= r.length) return t._t = n, S(1)
                } while (!A(o, e = r[t._i++]));
                return "keys" == i ? S(0, e) : "values" == i ? S(0, o[e]) : S(0, [e, o[e]])
            }), r.prototype = null, l(l.G + l.F, {
                Dict: r
            }), l(l.S, "Dict", {
                keys: I("keys"),
                values: I("values"),
                entries: I("entries"),
                forEach: O(0),
                map: O(1),
                filter: O(2),
                some: O(3),
                every: O(4),
                find: O(5),
                findKey: T,
                mapPairs: O(7),
                reduce: i,
                keyOf: b,
                includes: a,
                has: A,
                get: c,
                set: u,
                isDict: s
            })
        }, function(e, t, o) {
            var r = o(73),
                i = o(23)("iterator"),
                a = o(135);
            e.exports = o(7).isIterable = function(e) {
                var t = Object(e);
                return t[i] !== n || "@@iterator" in t || a.hasOwnProperty(r(t))
            }
        }]), "undefined" != typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd ? define(function() {
            return e
        }) : t.core = e
    }(1, 1);
    var NativeBuffer = function(e) {
            var t = e.WeixinNativeBuffer,
                n = e.getNativeBufferId,
                o = e.setNativeBuffer,
                r = e.getNativeBuffer,
                i = e.__wxConfig || {},
                a = !1;
            "android" === i.platform ? a = "function" == typeof n && "function" == typeof o && "function" == typeof r && i.nativeBufferEnabled : "ios" === i.platform && (a = null != t);
            var c = function(e) {
                    if (t) return t.new(e);
                    if ("function" == typeof n && "function" == typeof o) {
                        var r = n(),
                            i = e.slice(0);
                        return o(r, i), r
                    }
                    return -1
                },
                u = function(e) {
                    return t ? t.get(e) : "function" == typeof r ? r(e) : void 0
                },
                s = function(e) {
                    t && t.useCompatibleMode(e)
                },
                f = function(e) {
                    var t = {};
                    return a ? t.id = c(e) : t.base64 = v(e), t
                },
                l = function(e) {
                    if (null != e) return a && void 0 !== e.id ? u(e.id) : void 0 !== e.base64 ? g(e.base64) : void 0
                },
                d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                p = p || function(e) {
                    for (var t, n, o = String(e), r = "", i = 0, a = d; o.charAt(0 | i) || (a = "=", i % 1); r += a.charAt(63 & t >> 8 - i % 1 * 8)) {
                        if ((n = o.charCodeAt(i += .75)) > 255) throw new Error('"btoa" failed');
                        t = t << 8 | n
                    }
                    return r
                },
                h = h || function(e) {
                    var t = String(e).replace(/=+$/, ""),
                        n = "";
                    if (t.length % 4 == 1) throw new Error('"atob" failed');
                    for (var o, r, i = 0, a = 0; r = t.charAt(a++); ~r && (o = i % 4 ? 64 * o + r : r, i++ % 4) ? n += String.fromCharCode(255 & o >> (-2 * i & 6)) : 0) r = d.indexOf(r);
                    return n
                },
                v = function(e) {
                    var t = "";
                    const n = new Uint8Array(e),
                        o = n.byteLength;
                    for (var r = 0; r < o; r++) t += String.fromCharCode(n[r]);
                    return p(t)
                },
                g = function(e) {
                    const t = h(e),
                        n = t.length,
                        o = new Uint8Array(n);
                    for (var r = 0; r < n; r++) o[r] = t.charCodeAt(r);
                    return o.buffer
                };
            return delete e.WeixinNativeBuffer, delete e.getNativeBufferId, delete e.setNativeBuffer, delete e.getNativeBuffer, {
                new: f,
                get: l,
                useCompatibleMode: s
            }
        }(this),
        WeixinNativeBuffer = NativeBuffer;
    NativeBuffer = null;
    var Reporter = function(e) {
            function t(o) {
                if (n[o]) return n[o].exports;
                var r = n[o] = {
                    exports: {},
                    id: o,
                    loaded: !1
                };
                return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
            }
            var n = {};
            return t.m = e, t.c = n, t.p = "", t(0)
        }([function(e, t, n) {
            function o(e) {
                void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
            }

            function r() {
                var e = arguments;
                o(function() {
                    WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
                })
            }

            function i() {
                var e = arguments;
                o(function() {
                    WeixinJSBridge.publish.apply(WeixinJSBridge, e)
                })
            }

            function a() {
                return void 0 !== wx ? wx.version && wx.version.version || "" : ""
            }

            function c() {
                !p || p.length <= 0 || (r("reportKeyValue", {
                    dataArray: p
                }), p = [])
            }

            function u() {
                !h || h.length <= 0 || (r("reportIDKey", {
                    dataArray: h
                }), h = [])
            }

            function s() {
                !v || v.length <= 0 || (r("systemLog", {
                    dataArray: v
                }), v = [])
            }

            function f() {
                return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "ios" : "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
            }

            function l(e) {
                return function() {
                    try {
                        return e.apply(e, arguments)
                    } catch (e) {
                        console.error("reporter error:" + e.message)
                    }
                }
            }
            var d = n(1),
                p = [],
                h = [],
                v = [],
                g = 0,
                y = 0,
                b = 0,
                m = 0,
                _ = 0,
                k = {},
                w = {},
                S = {},
                M = "ios" === f(),
                C = (f(), !1),
                P = function() {},
                A = "",
                O = "",
                T = "",
                I = {
                    surroundThirdByTryCatch: function(e, t) {
                        var n = "";
                        return O && (n = "at " + O + " " + T + " function;"),
                            function() {
                                var o = void 0;
                                try {
                                    var r = Date.now();
                                    o = e.apply(e, arguments);
                                    var i = Date.now() - r;
                                    i > 1e3 && I.slowReport({
                                        key: "apiCallback",
                                        cost: i,
                                        extend: n + t
                                    })
                                } catch (e) {
                                    I.thirdErrorReport({
                                        error: e,
                                        extend: n + t
                                    })
                                }
                                return o
                            }
                    },
                    slowReport: function(e) {
                        var t = e.key,
                            n = e.cost,
                            o = e.extend,
                            r = e.force,
                            i = d.SlowValueType[t],
                            a = Date.now();
                        if (i && (r || !(a - _ < 500)) && !(Object.keys(S).length > 50 || (S[o] || (S[o] = 0), ++S[o] > 3))) {
                            _ = a;
                            var c = n + "," + encodeURIComponent(o) + "," + i;
                            I.reportKeyValue({
                                key: "Slow",
                                value: c,
                                force: !0
                            })
                        }
                    },
                    speedReport: function(e) {
                        var t = e.key,
                            n = e.data,
                            o = e.timeMark,
                            r = e.force,
                            i = d.SpeedValueType[t],
                            a = Date.now(),
                            c = 0,
                            u = o.nativeTime;
                        if (i && (r || !(a - (k[i] || 0) < 500)) && o.startTime && o.endTime && (1 != i && 2 != i || u)) {
                            n && (c = JSON.stringify(n).length), k[i] = a;
                            var s = i + "," + o.startTime + "," + u + "," + u + "," + o.endTime + "," + c;
                            I.reportKeyValue({
                                key: "Speed",
                                value: s,
                                force: !0
                            })
                        }
                    },
                    reportKeyValue: function(e) {
                        var t = e.key,
                            n = e.value,
                            o = e.force;
                        d.KeyValueType[t] && (!o && Date.now() - g < 50 || (g = Date.now(), p.push({
                            key: d.KeyValueType[t],
                            value: n
                        }), p.length >= 20 && c()))
                    },
                    reportIDKey: function(e) {
                        var t = e.id,
                            n = e.key,
                            o = e.force;
                        d.IDKeyType[n] && (!o && Date.now() - y < 20 || (y = Date.now(), h.push({
                            id: t || (M ? "356" : "358"),
                            key: d.IDKeyType[n],
                            value: 1
                        }), h.length >= 1 && u()))
                    },
                    thirdErrorReport: function(e) {
                        var t = e.error,
                            n = e.extend;
                        I.errorReport({
                            key: C ? "widgetThirdScriptError" : "thirdScriptError",
                            error: t,
                            extend: n
                        })
                    },
                    errorReport: function(e) {
                        var t = e.key,
                            n = e.error,
                            o = e.extend;
                        if (d.ErrorType[t]) {
                            var r = o ? n.message + ";" + o : n.message,
                                f = t + "\n" + r + "\n" + n.stack;
                            if (console.error(f), "undefined" != typeof window && void 0 !== window.__webviewId__ ? i("WEBVIEW_ERROR_MSG", {
                                    data: {
                                        msg: f
                                    },
                                    options: {
                                        timestamp: Date.now()
                                    }
                                }) : I.triggerErrorMessage(f), !(Object.keys(w).length > 50)) {
                                var l = d.ErrorType[t] + "," + n.name + "," + encodeURIComponent(r) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(a());
                                w[l] || (w[l] = 0), w[l]++;
                                if (!(("thirdScriptError" === t || "widgetThirdScriptError" === t) && w[l] > 3 || w[l] > 3) && (I.reportIDKey({
                                        key: t,
                                        force: !0
                                    }), I.reportKeyValue({
                                        key: "Error",
                                        value: l,
                                        force: !0
                                    }), u(), c(), s(), __wxConfig.karmaTest)) throw n
                            }
                        }
                    },
                    log: function(e, t) {
                        e && "string" == typeof e && (!t && Date.now() - b < 50 || (b = Date.now(), v.push(e + ""), v.length >= 50 && s()))
                    },
                    submit: function() {
                        Date.now() - m < 50 || (m = Date.now(), u(), c(), s())
                    },
                    registerErrorListener: function(e) {
                        "function" == typeof e && (P = e)
                    },
                    unRegisterErrorListener: function() {
                        P = function() {}
                    },
                    triggerErrorMessage: function(e) {
                        A != e && (A = e, setTimeout(function() {
                            try {
                                P(e)
                            } catch (e) {
                                console.error(e.message, "at onError callback function")
                            }
                        }, 0))
                    },
                    setIsWidget: function(e) {
                        C = void 0 != e && e
                    }
                },
                x = {};
            for (var B in I) ! function(e) {
                x.__defineGetter__(e, function() {
                    return l(I[e])
                })
            }(B);
            x.__defineSetter__("__route__", function(e) {
                O = e
            }), x.__defineSetter__("__method__", function(e) {
                T = e
            }), "undefined" != typeof window && (window.onbeforeunload = function() {
                I.submit()
            }), e.exports = x
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            t.IDKeyType = {
                login: 1,
                login_cancel: 2,
                login_fail: 3,
                request_fail: 4,
                connectSocket_fail: 5,
                closeSocket_fail: 6,
                sendSocketMessage_fail: 7,
                uploadFile_fail: 8,
                downloadFile_fail: 9,
                redirectTo_fail: 10,
                navigateTo_fail: 11,
                navigateBack_fail: 12,
                appServiceSDKScriptError: 13,
                webviewSDKScriptError: 14,
                jsEnginScriptError: 15,
                thirdScriptError: 16,
                webviewScriptError: 17,
                exparserScriptError: 18,
                widgetEnginScriptError: 113,
                widgetThirdScriptError: 114,
                startRecord: 19,
                startRecord_fail: 20,
                getLocation: 21,
                getLocation_fail: 22,
                chooseLocation: 23,
                chooseLocation_fail: 24,
                openAddress: 25,
                openAddress_fail: 26,
                openLocation: 27,
                openLocation_fail: 28,
                makePhoneCall: 29,
                makePhoneCall_fail: 30,
                operateWXData: 31,
                operateWXData_fail: 32,
                checkLogin: 33,
                checkLogin_fail: 34,
                refreshSession: 35,
                refreshSession_fail: 36,
                chooseVideo: 37,
                chooseVideo_fail: 38,
                chooseImage: 39,
                chooseImage_fail: 40,
                verifyPaymentPassword: 41,
                verifyPaymentPassword_fail: 42,
                requestPayment: 43,
                requestPayment_fail: 44,
                bindPaymentCard: 45,
                bindPaymentCard_fail: 46,
                requestPaymentToBank: 47,
                requestPaymentToBank_fail: 48,
                openDocument: 49,
                openDocument_fail: 50,
                chooseContact: 51,
                chooseContact_fail: 52,
                operateMusicPlayer: 53,
                operateMusicPlayer_fail: 54,
                getMusicPlayerState_fail: 55,
                playVoice_fail: 56,
                setNavigationBarTitle_fail: 57,
                switchTab_fail: 58,
                getImageInfo_fail: 59,
                enableCompass_fail: 60,
                enableAccelerometer_fail: 61,
                getStorage_fail: 62,
                setStorage_fail: 63,
                clearStorage_fail: 64,
                removeStorage_fail: 65,
                getStorageInfo_fail: 66,
                getStorageSync_fail: 67,
                setStorageSync_fail: 68,
                addCard_fail: 69,
                openCard_fail: 70,
                openSetting_fail: 71,
                reLaunch_fail: 72,
                getClipboardData_fail: 73,
                setClipboardData_fail: 74,
                showShareMenu_fail: 75,
                hideShareMenu_fail: 76,
                showToast_fail: 77,
                hideToast_fail: 78,
                openBluetoothAdapter_fail: 79,
                closeBluetoothAdapter_fail: 80,
                getBluetoothAdapterState_fail: 81,
                startBluetoothDevicesDiscovery_fail: 82,
                stopBluetoothDevicesDiscovery_fail: 83,
                getBluetoothDevices_fail: 84,
                getConnectedBluetoothDevices_fail: 85,
                createBLEConnection_fail: 86,
                closeBLEConnection_fail: 87,
                getBLEDeviceServices_fail: 88,
                getBLEDeviceCharacteristics_fail: 89,
                notifyBLECharacteristicValueChanged_fail: 90,
                readBLECharacteristicValue_fail: 91,
                checkIsSupportFacialRecognition_fail: 92,
                startFacialRecognitionVerify_fail: 93,
                startFacialRecognitionVerifyAndUploadVideo_fail: 94,
                startBeaconDiscovery_fail: 95,
                stopBeaconDiscovery_fail: 96,
                getBeacons_fail: 97,
                getSetting_fail: 98,
                setScreenBrightness_fail: 99,
                getScreenBrightness_fail: 100,
                vibrateShort_fail: 101,
                vibrateLong_fail: 102,
                shareAppMessage: 103,
                shareAppMessage_fail: 104,
                shareAppMessage_cancel: 105,
                shareAppMessageDirectly: 106,
                shareAppMessageDirectly_fail: 107,
                shareAppMessageDirectly_cancel: 108,
                sendBizRedPacket_fail: 109,
                addPhoneContact_fail: 110,
                saveImageToPhotosAlbum_fail: 111,
                saveVideoToPhotosAlbum_fail: 112,
                setTopBarText_fail: 115,
                setNavigationBarRightButton_fail: 116,
                setEnableDebug_fail: 117,
                captureScreen_fail: 118,
                setKeepScreenOn_fail: 119,
                createRequestTask: 120,
                createRequestTask_fail: 121,
                createDownloadTask: 122,
                createDownloadTask_fail: 123,
                createUploadTask: 124,
                createUploadTask_fail: 125,
                checkIsSupportSoterAuthentication_fail: 126,
                startSoterAuthentication_fail: 127,
                navigateToMiniProgram_fail: 128,
                navigateBackMiniProgram_fail: 129,
                openDeliveryList_fail: 130,
                setNavigationBarColor_fail: 131,
                setStatusBarStyle_fail: 132,
                getFileInfo_fail: 133
            }, t.KeyValueType = {
                Speed: 13544,
                Error: 13582,
                Slow: 13968,
                Clipboard: 14367,
                NetworkAPI: 14480
            }, t.SpeedValueType = {
                webview2AppService: 1,
                appService2Webview: 2,
                funcReady: 3,
                firstGetData: 4,
                firstRenderTime: 5,
                reRenderTime: 6,
                forceUpdateRenderTime: 7,
                appRoute2newPage: 8,
                newPage2pageReady: 9,
                thirdScriptRunTime: 10,
                pageframe: 11,
                WAWebview: 12,
                WAWidget: 13,
                widgetCanvasReady: 14,
                widgetFirstDataPush: 15
            }, t.SlowValueType = {
                apiCallback: 1,
                pageInvoke: 2,
                widgetInvoke: 3
            }, t.ErrorType = {
                appServiceSDKScriptError: 1,
                webviewSDKScriptError: 2,
                jsEnginScriptError: 3,
                thirdScriptError: 4,
                webviewScriptError: 5,
                exparserScriptError: 6,
                widgetEnginScriptError: 7,
                widgetThirdScriptError: 8
            }
        }]),
        wx = function(e) {
            function t(o) {
                if (n[o]) return n[o].exports;
                var r = n[o] = {
                    exports: {},
                    id: o,
                    loaded: !1
                };
                return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
            }
            var n = {};
            return t.m = e, t.c = n, t.p = "", t(0)
        }([function(e, t, n) {
            var o = n(1),
                r = n(2),
                i = n(6);
            n(51), n(52), n(53), n(54), n(105), n(107);
            var a = n(4),
                c = n(31),
                u = (function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    t.default = e
                }(c), n(108)),
                s = n(110),
                f = n(113),
                l = n(3),
                d = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(l),
                p = n(116),
                h = n(117),
                v = n(119),
                g = n(120),
                y = n(132),
                b = n(142),
                m = n(146),
                _ = n(148),
                k = n(55),
                w = n(45),
                S = n(9),
                M = n(152),
                C = n(183),
                P = n(191),
                A = n(194),
                O = n(195),
                T = g.socket.connectSocket,
                I = g.socket.closeSocket,
                x = g.socket.sendSocketMessage,
                B = g.socket.onSocketOpen,
                j = g.socket.onSocketClose,
                E = g.socket.onSocketMessage,
                R = g.socket.onSocketError,
                D = y.image.chooseImage,
                L = y.image.previewImage,
                F = y.image.getImageInfo,
                N = y.image.saveImageToPhotosAlbum,
                W = y.record.startRecord,
                U = y.record.stopRecord,
                V = y.video.chooseVideo,
                J = y.video.saveVideoToPhotosAlbum,
                K = y.voice.playVoice,
                q = y.voice.pauseVoice,
                G = y.voice.stopVoice,
                z = y.voice.onVoicePlayEnd,
                H = y.backgroundAudio.getBackgroundAudioPlayerState,
                X = y.backgroundAudio.playBackgroundAudio,
                $ = y.backgroundAudio.pauseBackgroundAudio,
                Y = y.backgroundAudio.seekBackgroundAudio,
                Q = y.backgroundAudio.stopBackgroundAudio,
                Z = y.backgroundAudio.onBackgroundAudioPlay,
                ee = y.backgroundAudio.onBackgroundAudioPause,
                te = y.backgroundAudio.onBackgroundAudioStop,
                ne = k.screen.captureScreen,
                oe = k.screen.onUserCaptureScreen,
                re = k.screen.setKeepScreenOn,
                ie = k.screen.setScreenBrightness,
                ae = k.screen.getScreenBrightness,
                ce = k.vibrate.vibrateShort,
                ue = k.vibrate.vibrateLong,
                se = k.contact.chooseContact,
                fe = k.contact.chooseWeChatContact,
                le = k.contact.addPhoneContact,
                de = S.interaction.showToast,
                pe = S.interaction.hideToast,
                he = S.interaction.showLoading,
                ve = S.interaction.hideLoading,
                ge = S.interaction.showModal,
                ye = S.interaction.showActionSheet,
                be = S.navigationBar.setNavigationBarTitle,
                me = S.navigationBar.showNavigationBarLoading,
                _e = S.navigationBar.hideNavigationBarLoading,
                ke = S.navigationBar.setNavigationBarColor,
                we = S.navigationBar.setNavigationBarRightButton,
                Se = S.navigationBar.onTapNavigationBarRightButton,
                Me = M.share.getShareInfo,
                Ce = M.share.showShareMenu,
                Pe = M.share.hideShareMenu,
                Ae = M.share.updateShareMenu,
                Oe = M.share.ShareInfoStorage,
                Te = {},
                Ie = {
                    invokeWebviewMethod: p.invokeWebviewMethod,
                    drawCanvas: w.drawCanvas,
                    createContext: w.createContext,
                    createCanvasContext: w.createCanvasContext,
                    canvasToTempFilePath: w.canvasToTempFilePath,
                    getShareInfo: Me,
                    pageScrollTo: S.pageScrollTo,
                    chooseInvoiceTitle: M.chooseInvoiceTitle,
                    ShareInfoStorage: Oe,
                    arrayBufferToBase64: Reporter.surroundThirdByTryCatch(r.arrayBufferToBase64),
                    base64ToArrayBuffer: Reporter.surroundThirdByTryCatch(r.base64ToArrayBuffer),
                    openSetting: M.openSetting,
                    getExtConfig: s.getExtConfig,
                    chooseMedia: y.chooseMedia,
                    chooseWeChatContact: fe,
                    uploadEncryptedFileToCDN: g.CDN.uploadEncryptedFileToCDN,
                    onUploadEncryptedFileToCDNProgress: g.CDN.onUploadEncryptedFileToCDNProgress,
                    getExtConfigSync: s.getExtConfigSync,
                    showShareMenu: Ce,
                    hideShareMenu: Pe,
                    updateShareMenu: Ae,
                    openUrl: C.web.openUrl,
                    setNavigationBarColor: ke,
                    _getRealRoute: O._getRealRoute,
                    vibrateShort: ce,
                    vibrateLong: ue,
                    getSetting: M.getSetting,
                    checkIsSupportFacialRecognition: M.facialRecognition.checkIsSupportFacialRecognition,
                    startFacialRecognitionVerify: M.facialRecognition.startFacialRecognitionVerify,
                    startFacialRecognitionVerifyAndUploadVideo: M.facialRecognition.startFacialRecognitionVerifyAndUploadVideo,
                    sendBizRedPacket: M.redPacket.sendBizRedPacket,
                    sendGoldenRedPacket: M.redPacket.sendGoldenRedPacket,
                    openGoldenRedPacketDetail: M.redPacket.openGoldenRedPacketDetail,
                    addPhoneContact: le,
                    setScreenBrightness: ie,
                    getScreenBrightness: ae,
                    getWeRunData: M.getWeRunData,
                    canIUse: _.canIUse,
                    setPageStyle: S.setPageStyle,
                    triggerGettingWidgetData: h.triggerGettingWidgetData,
                    navigateToMiniProgram: C.miniProgram.navigateToMiniProgram,
                    navigateBackMiniProgram: C.miniProgram.navigateBackMiniProgram,
                    setNavigationBarRightButton: we,
                    onTapNavigationBarRightButton: Se,
                    setTopBarText: S.topBar.setTopBarText,
                    setEnableDebug: P.setEnableDebug,
                    captureScreen: ne,
                    onUserCaptureScreen: oe,
                    setKeepScreenOn: re,
                    checkIsSupportSoterAuthentication: M.soter.checkIsSupportSoterAuthentication,
                    startSoterAuthentication: M.soter.startSoterAuthentication,
                    checkIsSoterEnrolledInDevice: M.soter.checkIsSoterEnrolledInDevice,
                    openDeliveryList: C.web.openDeliveryList,
                    reportIDKey: v.reportIDKey,
                    reportKeyValue: v.reportKeyValue,
                    setNavigationBarTitle: be,
                    showNavigationBarLoading: me,
                    hideNavigationBarLoading: _e,
                    startPullDownRefresh: S.startPullDownRefresh,
                    stopPullDownRefresh: S.stopPullDownRefresh,
                    operateWXData: M.operateWXData,
                    getOpenDeviceId: M.getOpenDeviceId,
                    openBluetoothAdapter: k.bluetooth.openBluetoothAdapter,
                    closeBluetoothAdapter: k.bluetooth.closeBluetoothAdapter,
                    getBluetoothAdapterState: k.bluetooth.getBluetoothAdapterState,
                    onBluetoothAdapterStateChange: k.bluetooth.onBluetoothAdapterStateChange,
                    startBluetoothDevicesDiscovery: k.bluetooth.startBluetoothDevicesDiscovery,
                    stopBluetoothDevicesDiscovery: k.bluetooth.stopBluetoothDevicesDiscovery,
                    getBluetoothDevices: k.bluetooth.getBluetoothDevices,
                    getConnectedBluetoothDevices: k.bluetooth.getConnectedBluetoothDevices,
                    createBLEConnection: k.bluetooth.createBLEConnection,
                    closeBLEConnection: k.bluetooth.closeBLEConnection,
                    getBLEDeviceServices: k.bluetooth.getBLEDeviceServices,
                    getBLEDeviceCharacteristics: k.bluetooth.getBLEDeviceCharacteristics,
                    notifyBLECharacteristicValueChanged: k.bluetooth.notifyBLECharacteristicValueChanged,
                    notifyBLECharacteristicValueChange: k.bluetooth.notifyBLECharacteristicValueChange,
                    readBLECharacteristicValue: k.bluetooth.readBLECharacteristicValue,
                    writeBLECharacteristicValue: k.bluetooth.writeBLECharacteristicValue,
                    onBluetoothDeviceFound: k.bluetooth.onBluetoothDeviceFound,
                    onBLEConnectionStateChanged: k.bluetooth.onBLEConnectionStateChanged,
                    onBLEConnectionStateChange: k.bluetooth.onBLEConnectionStateChange,
                    onBLECharacteristicValueChange: k.bluetooth.onBLECharacteristicValueChange,
                    startBeaconDiscovery: k.iBeacon.startBeaconDiscovery,
                    stopBeaconDiscovery: k.iBeacon.stopBeaconDiscovery,
                    getBeacons: k.iBeacon.getBeacons,
                    onBeaconUpdate: k.iBeacon.onBeaconUpdate,
                    onBeaconServiceChange: k.iBeacon.onBeaconServiceChange,
                    startWifi: k.wifi.startWifi,
                    stopWifi: k.wifi.stopWifi,
                    getWifiList: k.wifi.getWifiList,
                    getConnectedWifi: k.wifi.getConnectedWifi,
                    connectWifi: k.wifi.connectWifi,
                    presetWifiList: k.wifi.presetWifiList,
                    setWifiList: k.wifi.setWifiList,
                    onGetWifiList: k.wifi.onGetWifiList,
                    onWifiConnected: k.wifi.onWifiConnected,
                    redirectTo: S.route.redirectTo,
                    reLaunch: S.route.reLaunch,
                    navigateTo: S.route.navigateTo,
                    switchTab: S.route.switchTab,
                    navigateBack: S.route.navigateBack,
                    navigateBackApplication: C.application.navigateBackApplication,
                    getStorage: m.getStorage,
                    getStorageSync: m.getStorageSync,
                    setStorage: m.setStorage,
                    setStorageSync: m.setStorageSync,
                    removeStorage: m.removeStorage,
                    removeStorageSync: m.removeStorageSync,
                    clearStorage: m.clearStorage,
                    clearStorageSync: m.clearStorageSync,
                    getStorageInfo: m.getStorageInfo,
                    getStorageInfoSync: m.getStorageInfoSync,
                    request: g.request,
                    connectSocket: T,
                    closeSocket: I,
                    sendSocketMessage: x,
                    onSocketOpen: B,
                    onSocketClose: j,
                    onSocketMessage: E,
                    onSocketError: R,
                    uploadFile: g.uploadFile,
                    downloadFile: g.downloadFile,
                    chooseImage: D,
                    previewImage: L,
                    getImageInfo: F,
                    saveImageToPhotosAlbum: N,
                    startRecord: W,
                    stopRecord: U,
                    playVoice: K,
                    pauseVoice: q,
                    stopVoice: G,
                    onVoicePlayEnd: z,
                    chooseVideo: V,
                    saveVideoToPhotosAlbum: J,
                    getLocation: function(e) {
                        u.getLocation.call(Ie, e)
                    },
                    openLocation: u.openLocation,
                    chooseLocation: u.chooseLocation,
                    startLocationUpdate: u.startLocationUpdate,
                    stopLocationUpdate: u.stopLocationUpdate,
                    onLocationChange: u.onLocationChange,
                    getNetworkType: k.network.getNetworkType,
                    onNetworkStatusChange: k.network.onNetworkStatusChange,
                    getSystemInfo: k.systemInfo.getSystemInfo,
                    getSystemInfoSync: k.systemInfo.getSystemInfoSync,
                    startAccelerometer: k.accelerometer.startAccelerometer,
                    stopAccelerometer: k.accelerometer.stopAccelerometer,
                    onAccelerometerChange: k.accelerometer.onAccelerometerChange,
                    startCompass: k.compass.startCompass,
                    stopCompass: k.compass.stopCompass,
                    onCompassChange: k.compass.onCompassChange,
                    reportAction: v.reportAction,
                    getBackgroundAudioManager: y.backgroundAudio.getBackgroundAudioManager,
                    getRecorderManager: y.record.getRecorderManager,
                    getBackgroundAudioPlayerState: H,
                    playBackgroundAudio: X,
                    pauseBackgroundAudio: $,
                    seekBackgroundAudio: Y,
                    stopBackgroundAudio: Q,
                    onBackgroundAudioPlay: Z,
                    onBackgroundAudioPause: ee,
                    onBackgroundAudioStop: te,
                    login: M.login,
                    checkSession: M.checkSession,
                    authorize: M.authorize,
                    getUserInfo: M.getUserInfo,
                    requestPayment: M.payment.requestPayment,
                    verifyPaymentPassword: M.payment.verifyPaymentPassword,
                    bindPaymentCard: M.payment.bindPaymentCard,
                    requestPaymentToBank: M.payment.requestPaymentToBank,
                    addCard: M.card.addCard,
                    openCard: M.card.openCard,
                    scanCode: k.scan.scanCode,
                    chooseAddress: M.chooseAddress,
                    saveFile: b.saveFile,
                    openDocument: b.openDocument,
                    getSavedFileList: b.getSavedFileList,
                    getSavedFileInfo: b.getSavedFileInfo,
                    getFileInfo: b.getFileInfo,
                    removeSavedFile: b.removeSavedFile,
                    readFile: b.readFile,
                    chooseContact: se,
                    makePhoneCall: k.phone.makePhoneCall,
                    makeVoIPCall: k.phone.makeVoIPCall,
                    onAppRoute: S.route.onAppRoute,
                    onAppRouteDone: S.route.onAppRouteDone,
                    onAppEnterBackground: function(e) {
                        S.route.onAppEnterBackground.call(Ie, e)
                    },
                    onAppEnterForeground: function(e) {
                        S.route.onAppEnterForeground.call(Ie, e)
                    },
                    onAppUnhang: function(e) {
                        S.route.onAppUnhang.call(Ie, e)
                    },
                    onPageReload: function(e) {
                        S.route.onPageReload.call(Ie, e)
                    },
                    createAnimation: S.createAnimation,
                    createAudioContext: function(e) {
                        return i.createAudioContext.call(Ie, e, d.default.currentWebviewId)
                    },
                    createVideoContext: function(e) {
                        return i.createVideoContext.call(Ie, e, d.default.currentWebviewId)
                    },
                    createInnerAudioContext: i.createInnerAudioContext,
                    createMapContext: i.createMapContext,
                    createCameraContext: function() {
                        return i.createCameraContext.call(Ie, d.default.currentWebviewId)
                    },
                    onWebviewEvent: S.event.onWebviewEvent,
                    onNativeEvent: S.event.onNativeEvent,
                    hideKeyboard: S.hideKeyboard,
                    getPublicLibVersion: P.getPublicLibVersion,
                    showModal: ge,
                    showToast: de,
                    hideToast: pe,
                    showLoading: he,
                    hideLoading: ve,
                    showActionSheet: ye,
                    reportAnalytics: v.reportAnalytics,
                    getClipboardData: k.clipboard.getClipboardData,
                    setClipboardData: k.clipboard.setClipboardData,
                    createSelectorQuery: f.createSelectorQuery,
                    updatePerfData: A.updatePerfData,
                    traceEvent: A.traceEvent
                };
            Ie.appStatus = a.AppStatus.FORE_GROUND, Ie.hanged = !1, (0, o.subscribe)("INVOKE_METHOD", function(e, t) {
                var n = e.name,
                    o = e.args;
                Ie[n](o, !0)
            }), (0, o.subscribe)("WEBVIEW_ERROR_MSG", function(e, t) {
                var n = e.msg;
                Reporter.triggerErrorMessage(n)
            }), (0, o.onMethod)("onError", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                console.error("thirdScriptError", "\n", "sdk uncaught third Error", "\n", e.message, "\n", e.stack)
            });
            for (var xe in Ie) ! function(e) {
                Te.__defineGetter__(e, function() {
                    return "function" == typeof Ie[e] ? (0, r.surroundByTryCatchFactory)(Ie[e], "wx." + e) : Ie[e]
                })
            }(xe);
            !0 === __wxConfig.karmaTest ? e.exports = Ie : e.exports = Te
        }, function(e, t, n) {
            function o(e, t, n) {
                "background" === g.default.runningStatus && -1 !== y.BackgroudAPIBlackList.indexOf(e) ? n({
                    errMsg: e + ":fail can not be invoked in background running status"
                }) : "active" !== g.default.runningStatus && -1 !== y.NotActiveAPIBlackList.indexOf(e) ? n({
                    errMsg: e + ":fail can only be invokeed in acitve running status"
                }) : WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
            }

            function r() {
                WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
            }

            function i() {
                var e = Array.prototype.slice.call(arguments);
                e[1] = {
                    data: e[1],
                    options: {
                        timestamp: Date.now()
                    }
                }, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
            }

            function a() {
                var e = Array.prototype.slice.call(arguments),
                    t = e[1];
                e[1] = function(e, n) {
                    var o = e.data,
                        r = e.options,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        a = r && r.timestamp || 0,
                        c = Date.now();
                    "function" == typeof t && t(o, n), Reporter.speedReport({
                        key: "webview2AppService",
                        data: o || {},
                        timeMark: {
                            startTime: a,
                            endTime: c,
                            nativeTime: i.nativeTime || 0
                        }
                    })
                }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
            }

            function c(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                t = (0, h.assign)({}, t);
                var r = {};
                for (var i in t) "function" == typeof t[i] && (!0 === __wxConfig.karmaTest ? r[i] = t[i] : r[i] = Reporter.surroundThirdByTryCatch(t[i], "at api " + e + " " + i + " callback function"), delete t[i]);
                var a = {};
                for (var c in n) "function" == typeof n[c] && (a[c] = (0, h.surroundByTryCatchFactory)(n[c], "at api " + e + " " + c + " callback function"));
                o(e, t, function(t) {
                    t.errMsg = t.errMsg || e + ":ok";
                    var n = 0 === t.errMsg.indexOf(e + ":ok"),
                        o = 0 === t.errMsg.indexOf(e + ":cancel"),
                        i = 0 === t.errMsg.indexOf(e + ":fail");
                    if ("function" == typeof a.beforeAll && a.beforeAll(t), n) "function" == typeof a.beforeSuccess && a.beforeSuccess(t), "function" == typeof r.success && r.success(t), "function" == typeof a.afterSuccess && a.afterSuccess(t);
                    else if (o) t.errMsg = t.errMsg.replace(e + ":cancel", e + ":fail cancel"), "function" == typeof r.fail && r.fail(t), "function" == typeof a.beforeCancel && a.beforeCancel(t), "function" == typeof r.cancel && r.cancel(t), "function" == typeof a.afterCancel && a.afterCancel(t);
                    else if (i) {
                        "function" == typeof a.beforeFail && a.beforeFail(t), "function" == typeof r.fail && r.fail(t);
                        var c = !0;
                        "function" == typeof a.afterFail && (c = a.afterFail(t)), !1 !== c && Reporter.reportIDKey({
                            key: e + "_fail"
                        })
                    }
                    "function" == typeof r.complete && r.complete(t), "function" == typeof a.afterAll && a.afterAll(t), (0, b.reportJSAPI)(e, n, i, o, t.errMsg)
                }), Reporter.reportIDKey({
                    key: e
                })
            }

            function u(e, t) {
                r(e, (0, h.surroundByTryCatchFactory)(t, "at api " + e + " callback function"))
            }

            function s() {}

            function f(e, t, n) {
                var o = (0, h.paramCheck)(t, n);
                return !o || (l(e, t, "parameter error: " + o), !1)
            }

            function l(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    o = e + ":fail " + n;
                console.error(o);
                var r = Reporter.surroundThirdByTryCatch(t.fail || s, "at api " + e + " fail callback function"),
                    i = Reporter.surroundThirdByTryCatch(t.complete || s, "at api " + e + " complete callback function");
                r({
                    errMsg: o
                }), i({
                    errMsg: o
                })
            }

            function d(e, t, n) {
                var o = t.replace(/\.html\?.*|\.html$/, "");
                return -1 !== __wxConfig.pages.indexOf(o) || (l(e, n, 'url "' + (0, h.removeHtmlSuffixFromUrl)(t) + '" is not in app.json'), !1)
            }

            function p(e, t, n) {
                var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                return function(r) {
                    c("operateWXData", Object.assign({}, r, {
                        data: Object.assign({
                            api_name: t
                        }, o, n ? {
                            data: n
                        } : void 0)
                    }), {
                        beforeAll: function(t) {
                            t.errMsg = t.errMsg.replace("operateWXData", e)
                        },
                        beforeSuccess: function(e) {
                            if ("android" === (0, h.getPlatform)() && (e.data = JSON.parse(e.data)), e.data.data) {
                                e.rawData = e.data.data;
                                var t = JSON.parse(e.data.data);
                                e = Object.assign(e, t)
                            }
                            e.data.signature && (e.signature = e.data.signature), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
                        }
                    })
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.invoke = o, t.on = r, t.publish = i, t.subscribe = a, t.invokeMethod = c, t.onMethod = u, t.noop = s, t.beforeInvoke = f, t.beforeInvokeFail = l, t.checkUrlInConfig = d, t.operateWXDataFactory = p;
            var h = n(2),
                v = n(3),
                g = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(v),
                y = n(4),
                b = n(5)
        }, function(e, t) {
            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function r(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            function i(e, t) {
                return !0 === __wxConfig.karmaTest ? e : function() {
                    try {
                        return e.apply(e, arguments)
                    } catch (e) {
                        if ("[object Error]" === Object.prototype.toString.apply(e)) {
                            if ("AppServiceSdkKnownError" == e.type) throw e;
                            Reporter.errorReport({
                                key: "appServiceSDKScriptError",
                                error: e,
                                extend: t
                            })
                        }
                    }
                }
            }

            function a(e) {
                var t = Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
                if ("Array" == t || "Object" == t) try {
                    e = JSON.stringify(e)
                } catch (e) {
                    throw e.type = "AppServiceSdkKnownError", e
                } else e = "String" == t || "Number" == t || "Boolean" == t ? e.toString() : "Date" == t ? e.getTime().toString() : "Undefined" == t ? "undefined" : "Null" == t ? "null" : "";
                return {
                    data: e,
                    dataType: t
                }
            }

            function c(e, t) {
                return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : ""
            }

            function u(e) {
                return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
            }

            function s(e) {
                return "Object" === u(e)
            }

            function f(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "parameter",
                    o = u(t),
                    r = u(e);
                if (r != o) return n + " should be " + o + " instead of " + r + ";";
                var i = "";
                switch (o) {
                    case "Object":
                        for (var a in t) i += f(e[a], t[a], n + "." + a);
                        break;
                    case "Array":
                        if (e.length < t.length) return n + " should have at least " + t.length + " item;";
                        for (var c = 0; c < t.length; ++c) i += f(e[c], t[c], n + "[" + c + "]")
                }
                return i
            }

            function l(e, t) {
                if ((!(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]) && (t = b(t)), 0 === t.indexOf("/")) return t.substr(1);
                if (0 === t.indexOf("./")) return l(e, t.substr(2), !1);
                var n, o, r = t.split("/");
                for (n = 0, o = r.length; n < o && ".." === r[n]; n++);
                r.splice(0, n);
                var t = r.join("/"),
                    i = e.length > 0 ? e.split("/") : [];
                return i.splice(i.length - n - 1, n + 1), i.concat(r).join("/")
            }

            function d() {
                return "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
            }

            function p(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if ("object" !== (void 0 === e ? "undefined" : T(e))) return e;
                var n = [];
                for (var o in e)
                    if (e.hasOwnProperty(o))
                        if (t) try {
                            n.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]))
                        } catch (t) {
                            n.push(o + "=" + e[o])
                        } else n.push(o + "=" + e[o]);
                return n.join("&")
            }

            function h(e, t) {
                if ("string" == typeof e && "object" === (void 0 === t ? "undefined" : T(t)) && Object.keys(t).length > 0) {
                    var n = e.split("?");
                    return n[0] + "?" + p(g((n[1] || "").split("&").reduce(function(e, t) {
                        if ("string" == typeof t && t.length > 0) {
                            var n = t.split("="),
                                o = n[0],
                                r = n[1];
                            e[o] = r
                        }
                        return e
                    }, {}), Object.keys(t).reduce(function(e, n) {
                        return "object" === T(t[n]) ? e[encodeURIComponent(n)] = encodeURIComponent(JSON.stringify(t[n])) : e[encodeURIComponent(n)] = encodeURIComponent(t[n]), e
                    }, {})))
                }
                return e
            }

            function v(e) {
                return /^(http|https):\/\/.*/i.test(e)
            }

            function g() {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return t.reduce(function(e, t) {
                    for (var n in t) e[n] = t[n];
                    return e
                }, {})
            }

            function y(e) {
                if ("string" == typeof e) {
                    var t = e.split("?"),
                        n = t[0],
                        o = (t[1] || "").split("&").reduce(function(e, t) {
                            if ("string" == typeof t && t.length > 0) {
                                var n = t.split("="),
                                    o = n[0],
                                    r = n[1];
                                e[o] = r
                            }
                            return e
                        }, {}),
                        r = [];
                    for (var i in o) o.hasOwnProperty(i) && r.push(i + "=" + encodeURIComponent(o[i]));
                    return r.length > 0 ? n + "?" + r.join("&") : e
                }
                return e
            }

            function b(e) {
                if ("string" != typeof e) return e;
                var t = e.split("?")[0],
                    n = e.split("?")[1];
                return t += ".html", void 0 !== n ? t + "?" + n : t
            }

            function m(e) {
                return "string" == typeof e ? -1 !== e.indexOf("?") ? e.replace(/\.html\?/, "?") : e.replace(/\.html$/, "") : e
            }

            function _(e, t) {
                for (var n in t) e[n] = t[n];
                return e
            }

            function k(e) {
                for (var t = "", n = new Uint8Array(e), o = n.byteLength, r = 0; r < o; r++) t += String.fromCharCode(n[r]);
                return x(t)
            }

            function w(e) {
                for (var t = B(e), n = t.length, o = new Uint8Array(n), r = 0; r < n; r++) o[r] = t.charCodeAt(r);
                return o.buffer
            }

            function S(e, t) {
                var n = new FileReader;
                n.onload = function() {
                    t(this.result)
                }, n.readAsArrayBuffer(e)
            }

            function M(e) {
                return Object.keys(e).reduce(function(t, n) {
                    return "string" == typeof e[n] ? t[n] = e[n] : "number" == typeof e[n] ? t[n] = e[n] + "" : t[n] = Object.prototype.toString.apply(e[n]), t
                }, {})
            }

            function C() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" == e ? t : 3 & t | 8).toString(16)
                })
            }

            function P(e, t) {
                switch (d()) {
                    case "devtools":
                        return !0;
                    case "ios":
                        return j > e;
                    case "android":
                        return j > t
                }
                return !1
            }

            function A(e, t, n) {
                !1 !== s(e) && t != n && e.hasOwnProperty(t) && (e[n] = e[t], delete e[t])
            }

            function O(e, t) {
                e = e.split("."), t = t.split(".");
                for (var n = Math.max(e.length, t.length); e.length < n;) e.push("0");
                for (; t.length < n;) t.push("0");
                for (var o = 0; o < n; o++) {
                    var r = parseInt(e[o]),
                        i = parseInt(t[o]);
                    if (r > i) return 1;
                    if (r < i) return -1
                }
                return 0
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            t.surroundByTryCatchFactory = i, t.getDataType = u, t.isObject = s, t.paramCheck = f, t.getRealRoute = l, t.getPlatform = d, t.urlEncodeFormData = p, t.addQueryStringToUrl = h, t.validateUrl = v, t.assign = g, t.encodeUrlQuery = y, t.transWxmlToHtml = b, t.removeHtmlSuffixFromUrl = m, t.extend = _, t.arrayBufferToBase64 = k, t.base64ToArrayBuffer = w, t.blobToArrayBuffer = S, t.convertObjectValueToString = M, t.guid = C, t.checkClientVersion = P, t.renameProperty = A, t.compareVersion = O;
            var I = (t.anyTypeToString = i(a, "anyTypeToString"), t.stringToAnyType = i(c, "stringToAnyType"), t.AppServiceSdkKnownError = function(e) {
                    function t(e) {
                        n(this, t);
                        var r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-SDK:" + e));
                        return r.type = "AppServiceSdkKnownError", r
                    }
                    return r(t, e), t
                }(Error), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),
                x = x || function(e) {
                    for (var t, n, o = String(e), r = "", i = 0, a = I; o.charAt(0 | i) || (a = "=", i % 1); r += a.charAt(63 & t >> 8 - i % 1 * 8)) {
                        if ((n = o.charCodeAt(i += .75)) > 255) throw new Error('"btoa" failed');
                        t = t << 8 | n
                    }
                    return r
                },
                B = B || function(e) {
                    var t = String(e).replace(/=+$/, ""),
                        n = "";
                    if (t.length % 4 == 1) throw new Error('"atob" failed');
                    for (var o, r, i = 0, a = 0; r = t.charAt(a++); ~r && (o = i % 4 ? 64 * o + r : r, i++ % 4) ? n += String.fromCharCode(255 & o >> (-2 * i & 6)) : 0) r = I.indexOf(r);
                    return n
                },
                j = __wxConfig.clientVersion || 1
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = {
                lastRoute: "",
                query: {},
                runningStatus: "active",
                navigatorLock: !1,
                openUrlLock: !1,
                possessingBackgroundAudioPlayer: !1,
                webviewEventCallback: null
            }
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            t.LOG_LIMIT = 1024, t.AppStatus = {
                FORE_GROUND: 0,
                BACK_GROUND: 1,
                LOCK: 2
            }, t.BackgroudAPIBlackList = [], t.NotActiveAPIBlackList = []
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = {},
                o = {},
                r = {},
                i = 0,
                a = function(e, t) {
                    var n = Object.keys(t).map(function(n) {
                        return Object.keys(t[n]).map(function(o) {
                            return {
                                func: n,
                                result: e,
                                errMsg: o,
                                count: t[n][o]
                            }
                        })
                    });
                    return [].concat.apply([], n)
                },
                c = function() {
                    n = {}, o = {}, r = {}
                },
                u = function() {
                    var e = a(1, n),
                        t = a(2, o),
                        i = a(3, r),
                        u = [].concat(e, t, i);
                    0 !== u.length && WeixinJSBridge.invoke("reportRealtimeAction", {
                        actionData: JSON.stringify({
                            dataType: 1,
                            dataArray: u
                        })
                    }), c()
                },
                s = function(e, t, a, c, s) {
                    var f = t ? n : a ? o : r;
                    f[e] = f[e] || {}, f[e][s] = (f[e][s] || 0) + 1, Date.now() - i >= 6e4 && (i = Date.now(), setTimeout(u, 6e4))
                };
            t.reportJSAPI = s
        }, function(e, t, n) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createAudioContext = t.createVideoContext = t.createInnerAudioContext = t.createMapContext = t.notifyWebviewIdtoMap = t.createCameraContext = t.notifyWebviewIdtoCamera = void 0;
            var r = n(7);
            Object.defineProperty(t, "notifyWebviewIdtoCamera", {
                enumerable: !0,
                get: function() {
                    return r.notifyWebviewIdtoCamera
                }
            }), Object.defineProperty(t, "createCameraContext", {
                enumerable: !0,
                get: function() {
                    return r.createCameraContext
                }
            });
            var i = n(29);
            Object.defineProperty(t, "notifyWebviewIdtoMap", {
                enumerable: !0,
                get: function() {
                    return i.notifyWebviewIdtoMap
                }
            }), Object.defineProperty(t, "createMapContext", {
                enumerable: !0,
                get: function() {
                    return i.createMapContext
                }
            });
            var a = n(38);
            Object.defineProperty(t, "createInnerAudioContext", {
                enumerable: !0,
                get: function() {
                    return a.createInnerAudioContext
                }
            }), n(40);
            var c = n(49),
                u = o(c),
                s = n(50),
                f = o(s);
            t.createVideoContext = u.default, t.createAudioContext = f.default
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r(e) {
                g = e
            }

            function i(e) {
                return new y(e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.cameraInfo = t.createCameraContext = t.notifyWebviewIdtoCamera = void 0;
            var a = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                c = n(1),
                u = n(2),
                s = n(8),
                f = n(9),
                l = {},
                d = {},
                p = [],
                h = {},
                v = new s.EventEmitter2,
                g = 0;
            (0, c.subscribe)("cameraInserted", function(e, t) {
                var n = e.cameraId,
                    o = e.bindings;
                l[t] = n, d[t + "_" + n] = o, v.emit("cameraInsert")
            }), (0, c.subscribe)("cameraRemoved", function(e, t) {
                var n = e.cameraId;
                delete l[t], delete d[t + "_" + n]
            }), f.route.onAppRouteDone(function(e) {
                if ("function" == typeof getCurrentPages) {
                    var t = getCurrentPages(),
                        n = t.map(function(e) {
                            return e.__wxWebviewId__
                        });
                    Object.keys(l).forEach(function(e) {
                        -1 === n.indexOf(Number(e)) && (delete d[e + "_" + l[e]], delete l[e], h[e] && (h[e].forEach(function(e) {
                            clearTimeout(e)
                        }), delete h[e]))
                    })
                }
            }), (0, c.onMethod)("onCameraVideoTaken", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                p.forEach(function(n) {
                    n(e, t)
                })
            });
            var y = function() {
                function e(t) {
                    o(this, e), this.webviewId = t
                }
                return a(e, [{
                    key: "_invoke",
                    value: function(e, t) {
                        var n = (0, u.getPlatform)();
                        "ios" !== n && "android" !== n || (t.type = e, (0, c.invokeMethod)("operateCamera", t))
                    }
                }, {
                    key: "_invokeMethod",
                    value: function(e, t) {
                        var n = this.webviewId;
                        if ("number" == typeof l[n] || l[n]) {
                            if (d[this.webviewId + "_" + l[n]].isCancelAuth) return "function" == typeof t.fail && t.fail({
                                errMsg: "user cancel auth"
                            }), void("function" == typeof t.complete && t.complete({
                                errMsg: "user cancel auth"
                            }));
                            t.cameraId = l[n], this._invoke(e, t)
                        }
                    }
                }, {
                    key: "takePhoto",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this._invokeMethod("takePhoto", e)
                    }
                }, {
                    key: "startRecord",
                    value: function() {
                        var e = this,
                            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = t.timeoutCallback,
                            o = t.fail;
                        if (t.fail = function(t) {
                                e._isRecording = !1, clearTimeout(r), "function" == typeof o && o(t)
                            }, this._invokeMethod("startRecord", t), !this._isRecording) {
                            this._isRecording = !0;
                            var r = this._timer = setTimeout(function() {
                                e._isRecording && (e.stopRecord({
                                    complete: n || function() {}
                                }), e._isRecording = !1)
                            }, 3e4);
                            h[this.webviewId] ? h[this.webviewId].push(r) : h[this.webviewId] = [r];
                            var i = this._videoTaken = function(t, o) {
                                if (t.cameraId === l[o]) {
                                    var a = p.indexOf(i);
                                    a > -1 && p.splice(a, 1), e._isRecording && (delete t.cameraId, "function" == typeof n && n(t), e._isRecording = !1, clearTimeout(r))
                                }
                            };
                            p.push(i)
                        }
                    }
                }, {
                    key: "stopRecord",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = p.indexOf(this._videoTaken);
                        t > -1 && (p.splice(t, 1), this._videoTaken = null), this._invokeMethod("stopRecord", e), this._isRecording = !1, clearTimeout(this._timer)
                    }
                }]), e
            }();
            t.notifyWebviewIdtoCamera = r, t.createCameraContext = i, t.cameraInfo = d
        }, function(e, t, n) {
            var o, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            ! function(i) {
                function a() {
                    this._events = {}, this._conf && c.call(this, this._conf)
                }

                function c(e) {
                    e ? (this._conf = e, e.delimiter && (this.delimiter = e.delimiter), this._events.maxListeners = e.maxListeners !== i ? e.maxListeners : p, e.wildcard && (this.wildcard = e.wildcard), e.newListener && (this.newListener = e.newListener), e.verboseMemoryLeak && (this.verboseMemoryLeak = e.verboseMemoryLeak), this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = p
                }

                function u(e, t) {
                    var n = "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.";
                    this.verboseMemoryLeak ? (n += " Event name: %s.", console.error(n, e, t)) : console.error(n, e), console.trace && console.trace()
                }

                function s(e) {
                    this._events = {}, this.newListener = !1, this.verboseMemoryLeak = !1, c.call(this, e)
                }

                function f(e, t, n, o) {
                    if (!n) return [];
                    var r, i, a, c, u, s, l, d = [],
                        p = t.length,
                        h = t[o],
                        v = t[o + 1];
                    if (o === p && n._listeners) {
                        if ("function" == typeof n._listeners) return e && e.push(n._listeners), [n];
                        for (r = 0, i = n._listeners.length; r < i; r++) e && e.push(n._listeners[r]);
                        return [n]
                    }
                    if ("*" === h || "**" === h || n[h]) {
                        if ("*" === h) {
                            for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && (d = d.concat(f(e, t, n[a], o + 1)));
                            return d
                        }
                        if ("**" === h) {
                            l = o + 1 === p || o + 2 === p && "*" === v, l && n._listeners && (d = d.concat(f(e, t, n, p)));
                            for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && ("*" === a || "**" === a ? (n[a]._listeners && !l && (d = d.concat(f(e, t, n[a], p))), d = d.concat(f(e, t, n[a], o))) : d = a === v ? d.concat(f(e, t, n[a], o + 2)) : d.concat(f(e, t, n[a], o)));
                            return d
                        }
                        d = d.concat(f(e, t, n[h], o + 1))
                    }
                    if (c = n["*"], c && f(e, t, c, o + 1), u = n["**"])
                        if (o < p) {
                            u._listeners && f(e, t, u, p);
                            for (a in u) "_listeners" !== a && u.hasOwnProperty(a) && (a === v ? f(e, t, u[a], o + 2) : a === h ? f(e, t, u[a], o + 1) : (s = {}, s[a] = u[a], f(e, t, {
                                "**": s
                            }, o + 1)))
                        } else u._listeners ? f(e, t, u, p) : u["*"] && u["*"]._listeners && f(e, t, u["*"], p);
                    return d
                }

                function l(e, t) {
                    e = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                    for (var n = 0, o = e.length; n + 1 < o; n++)
                        if ("**" === e[n] && "**" === e[n + 1]) return;
                    for (var r = this.listenerTree, a = e.shift(); a !== i;) {
                        if (r[a] || (r[a] = {}), r = r[a], 0 === e.length) return r._listeners ? ("function" == typeof r._listeners && (r._listeners = [r._listeners]), r._listeners.push(t), !r._listeners.warned && this._events.maxListeners > 0 && r._listeners.length > this._events.maxListeners && (r._listeners.warned = !0, u.call(this, r._listeners.length, a))) : r._listeners = t, !0;
                        a = e.shift()
                    }
                    return !0
                }
                var d = Array.isArray ? Array.isArray : function(e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    p = 10;
                s.EventEmitter2 = s, s.prototype.delimiter = ".", s.prototype.setMaxListeners = function(e) {
                    e !== i && (this._events || a.call(this), this._events.maxListeners = e, this._conf || (this._conf = {}), this._conf.maxListeners = e)
                }, s.prototype.event = "", s.prototype.once = function(e, t) {
                    return this.many(e, 1, t), this
                }, s.prototype.many = function(e, t, n) {
                    function o() {
                        0 == --t && r.off(e, o), n.apply(this, arguments)
                    }
                    var r = this;
                    if ("function" != typeof n) throw new Error("many only accepts instances of Function");
                    return o._origin = n, this.on(e, o), r
                }, s.prototype.emit = function() {
                    this._events || a.call(this);
                    var e = arguments[0];
                    if ("newListener" === e && !this.newListener && !this._events.newListener) return !1;
                    var t, n, o, r, i, c = arguments.length;
                    if (this._all && this._all.length) {
                        if (i = this._all.slice(), c > 3)
                            for (t = new Array(c), r = 0; r < c; r++) t[r] = arguments[r];
                        for (o = 0, n = i.length; o < n; o++) switch (this.event = e, c) {
                            case 1:
                                i[o].call(this, e);
                                break;
                            case 2:
                                i[o].call(this, e, arguments[1]);
                                break;
                            case 3:
                                i[o].call(this, e, arguments[1], arguments[2]);
                                break;
                            default:
                                i[o].apply(this, t)
                        }
                    }
                    if (this.wildcard) {
                        i = [];
                        var u = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        f.call(this, i, u, this.listenerTree, 0)
                    } else {
                        if ("function" == typeof(i = this._events[e])) {
                            switch (this.event = e, c) {
                                case 1:
                                    i.call(this);
                                    break;
                                case 2:
                                    i.call(this, arguments[1]);
                                    break;
                                case 3:
                                    i.call(this, arguments[1], arguments[2]);
                                    break;
                                default:
                                    for (t = new Array(c - 1), r = 1; r < c; r++) t[r - 1] = arguments[r];
                                    i.apply(this, t)
                            }
                            return !0
                        }
                        i && (i = i.slice())
                    }
                    if (i && i.length) {
                        if (c > 3)
                            for (t = new Array(c - 1), r = 1; r < c; r++) t[r - 1] = arguments[r];
                        for (o = 0, n = i.length; o < n; o++) switch (this.event = e, c) {
                            case 1:
                                i[o].call(this);
                                break;
                            case 2:
                                i[o].call(this, arguments[1]);
                                break;
                            case 3:
                                i[o].call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                i[o].apply(this, t)
                        }
                        return !0
                    }
                    if (!this._all && "error" === e) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                    return !!this._all
                }, s.prototype.emitAsync = function() {
                    this._events || a.call(this);
                    var e = arguments[0];
                    if ("newListener" === e && !this.newListener && !this._events.newListener) return Promise.resolve([!1]);
                    var t, n, o, r, i, c = [],
                        u = arguments.length;
                    if (this._all) {
                        if (u > 3)
                            for (t = new Array(u), r = 1; r < u; r++) t[r] = arguments[r];
                        for (o = 0, n = this._all.length; o < n; o++) switch (this.event = e, u) {
                            case 1:
                                c.push(this._all[o].call(this, e));
                                break;
                            case 2:
                                c.push(this._all[o].call(this, e, arguments[1]));
                                break;
                            case 3:
                                c.push(this._all[o].call(this, e, arguments[1], arguments[2]));
                                break;
                            default:
                                c.push(this._all[o].apply(this, t))
                        }
                    }
                    if (this.wildcard) {
                        i = [];
                        var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        f.call(this, i, s, this.listenerTree, 0)
                    } else i = this._events[e];
                    if ("function" == typeof i) switch (this.event = e, u) {
                        case 1:
                            c.push(i.call(this));
                            break;
                        case 2:
                            c.push(i.call(this, arguments[1]));
                            break;
                        case 3:
                            c.push(i.call(this, arguments[1], arguments[2]));
                            break;
                        default:
                            for (t = new Array(u - 1), r = 1; r < u; r++) t[r - 1] = arguments[r];
                            c.push(i.apply(this, t))
                    } else if (i && i.length) {
                        if (u > 3)
                            for (t = new Array(u - 1), r = 1; r < u; r++) t[r - 1] = arguments[r];
                        for (o = 0, n = i.length; o < n; o++) switch (this.event = e, u) {
                            case 1:
                                c.push(i[o].call(this));
                                break;
                            case 2:
                                c.push(i[o].call(this, arguments[1]));
                                break;
                            case 3:
                                c.push(i[o].call(this, arguments[1], arguments[2]));
                                break;
                            default:
                                c.push(i[o].apply(this, t))
                        }
                    } else if (!this._all && "error" === e) return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
                    return Promise.all(c)
                }, s.prototype.on = function(e, t) {
                    if ("function" == typeof e) return this.onAny(e), this;
                    if ("function" != typeof t) throw new Error("on only accepts instances of Function");
                    return this._events || a.call(this), this.emit("newListener", e, t), this.wildcard ? (l.call(this, e, t), this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]), this._events[e].push(t), !this._events[e].warned && this._events.maxListeners > 0 && this._events[e].length > this._events.maxListeners && (this._events[e].warned = !0, u.call(this, this._events[e].length, e))) : this._events[e] = t, this)
                }, s.prototype.onAny = function(e) {
                    if ("function" != typeof e) throw new Error("onAny only accepts instances of Function");
                    return this._all || (this._all = []), this._all.push(e), this
                }, s.prototype.addListener = s.prototype.on, s.prototype.off = function(e, t) {
                    function n(e) {
                        if (e !== i) {
                            var t = Object.keys(e);
                            for (var o in t) {
                                var a = t[o],
                                    c = e[a];
                                c instanceof Function || "object" !== (void 0 === c ? "undefined" : r(c)) || null === c || (Object.keys(c).length > 0 && n(e[a]), 0 === Object.keys(c).length && delete e[a])
                            }
                        }
                    }
                    if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
                    var o, a = [];
                    if (this.wildcard) {
                        var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        a = f.call(this, null, c, this.listenerTree, 0)
                    } else {
                        if (!this._events[e]) return this;
                        o = this._events[e], a.push({
                            _listeners: o
                        })
                    }
                    for (var u = 0; u < a.length; u++) {
                        var s = a[u];
                        if (o = s._listeners, d(o)) {
                            for (var l = -1, p = 0, h = o.length; p < h; p++)
                                if (o[p] === t || o[p].listener && o[p].listener === t || o[p]._origin && o[p]._origin === t) {
                                    l = p;
                                    break
                                }
                            if (l < 0) continue;
                            return this.wildcard ? s._listeners.splice(l, 1) : this._events[e].splice(l, 1), 0 === o.length && (this.wildcard ? delete s._listeners : delete this._events[e]), this.emit("removeListener", e, t), this
                        }(o === t || o.listener && o.listener === t || o._origin && o._origin === t) && (this.wildcard ? delete s._listeners : delete this._events[e], this.emit("removeListener", e, t))
                    }
                    return n(this.listenerTree), this
                }, s.prototype.offAny = function(e) {
                    var t, n = 0,
                        o = 0;
                    if (e && this._all && this._all.length > 0) {
                        for (t = this._all, n = 0, o = t.length; n < o; n++)
                            if (e === t[n]) return t.splice(n, 1), this.emit("removeListenerAny", e), this
                    } else {
                        for (t = this._all, n = 0, o = t.length; n < o; n++) this.emit("removeListenerAny", t[n]);
                        this._all = []
                    }
                    return this
                }, s.prototype.removeListener = s.prototype.off, s.prototype.removeAllListeners = function(e) {
                    if (0 === arguments.length) return !this._events || a.call(this), this;
                    if (this.wildcard)
                        for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), n = f.call(this, null, t, this.listenerTree, 0), o = 0; o < n.length; o++) {
                            var r = n[o];
                            r._listeners = null
                        } else this._events && (this._events[e] = null);
                    return this
                }, s.prototype.listeners = function(e) {
                    if (this.wildcard) {
                        var t = [],
                            n = "string" == typeof e ? e.split(this.delimiter) : e.slice();
                        return f.call(this, t, n, this.listenerTree, 0), t
                    }
                    return this._events || a.call(this), this._events[e] || (this._events[e] = []), d(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
                }, s.prototype.listenerCount = function(e) {
                    return this.listeners(e).length
                }, s.prototype.listenersAny = function() {
                    return this._all ? this._all : []
                }, (o = function() {
                    return s
                }.call(t, n, t, e)) !== i && (e.exports = o)
            }()
        }, function(e, t, n) {
            function o(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.event = t.route = t.topBar = t.navigationBar = t.interaction = void 0;
            var r = n(10);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(11);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(12);
            Object.keys(a).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return a[e]
                    }
                })
            });
            var c = n(13);
            Object.keys(c).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return c[e]
                    }
                })
            });
            var u = n(14);
            Object.keys(u).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return u[e]
                    }
                })
            });
            var s = n(15),
                f = o(s),
                l = n(16),
                d = o(l),
                p = n(22),
                h = o(p),
                v = n(23),
                g = o(v),
                y = n(35),
                b = o(y);
            t.interaction = f, t.navigationBar = d, t.topBar = h, t.route = g, t.event = b
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.pageScrollTo = void 0;
            var o = n(1);
            t.pageScrollTo = function(e) {
                var t = getCurrentPages(),
                    n = t[t.length - 1].__wxWebviewId__;
                e.hasOwnProperty("page") && e.page.hasOwnProperty("__wxWebviewId__") && (n = e.page.__wxWebviewId__), (0, o.publish)("pageScrollTo", e, [n])
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.stopPullDownRefresh = t.startPullDownRefresh = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("startPullDownRefresh", e, {})
                },
                i = function(e) {
                    (0, o.invokeMethod)("stopPullDownRefresh", e)
                };
            t.startPullDownRefresh = r, t.stopPullDownRefresh = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setPageStyle = void 0;
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = n(1),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = 0,
                u = {},
                s = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    u[c] = {
                        success: e.success,
                        fail: e.fail,
                        complete: e.complete
                    }, (0, r.publish)("setPageStyle", {
                        callbackId: c,
                        style: e.style
                    }, [a.default.currentWebviewId]), c += 1
                };
            (0, r.subscribe)("callbackSetPageStyle", function(e) {
                var t = e.res,
                    n = e.callbackId,
                    r = t.errMsg,
                    i = 0 === r.indexOf("setPageStyle:ok"),
                    a = 0 === r.indexOf("setPageStyle:fail"),
                    c = u[n];
                delete u[n], "object" === (void 0 === c ? "undefined" : o(c)) && (i ? "function" == typeof c.success && c.success(t) : a && "function" == typeof c.fail && c.fail(t), "function" == typeof c.complete && c.complete(t))
            }), t.setPageStyle = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.hideKeyboard = void 0;
            var o = n(2),
                r = n(1);
            t.hideKeyboard = function(e) {
                "devtools" == (0, o.getPlatform)() ? (0, r.publish)("hideKeyboard", {}) : (0, r.invokeMethod)("hideKeyboard", e)
            }
        }, function(e, t, n) {
            function o(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }

            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createAnimation = void 0;
            var i = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                a = n(1),
                c = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        r(this, e), this.actions = [], this.currentTransform = [], this.currentStepAnimates = [], this.option = {
                            transition: {
                                duration: void 0 !== t.duration ? t.duration : 400,
                                timingFunction: void 0 !== t.timingFunction ? t.timingFunction : "linear",
                                delay: void 0 !== t.delay ? t.delay : 0
                            },
                            transformOrigin: t.transformOrigin || "50% 50% 0"
                        }
                    }
                    return i(e, [{
                        key: "export",
                        value: function() {
                            var e = this.actions;
                            return this.actions = [], {
                                actions: e
                            }
                        }
                    }, {
                        key: "step",
                        value: function() {
                            var e = this,
                                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            return this.currentStepAnimates.forEach(function(t) {
                                "style" !== t.type ? e.currentTransform[t.type] = t : e.currentTransform[t.type + "." + t.args[0]] = t
                            }), this.actions.push({
                                animates: Object.keys(this.currentTransform).reduce(function(t, n) {
                                    return [].concat(o(t), [e.currentTransform[n]])
                                }, []),
                                option: {
                                    transformOrigin: void 0 !== t.transformOrigin ? t.transformOrigin : this.option.transformOrigin,
                                    transition: {
                                        duration: void 0 !== t.duration ? t.duration : this.option.transition.duration,
                                        timingFunction: void 0 !== t.timingFunction ? t.timingFunction : this.option.transition.timingFunction,
                                        delay: void 0 !== t.delay ? t.delay : this.option.transition.delay
                                    }
                                }
                            }), this.currentStepAnimates = [], this
                        }
                    }, {
                        key: "matrix",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
                                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
                            return this.currentStepAnimates.push({
                                type: "matrix",
                                args: [e, t, n, o, r, i]
                            }), this
                        }
                    }, {
                        key: "matrix3d",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                                r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
                                a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                                c = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
                                u = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0,
                                s = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 0,
                                f = arguments.length > 10 && void 0 !== arguments[10] ? arguments[10] : 1,
                                l = arguments.length > 11 && void 0 !== arguments[11] ? arguments[11] : 0,
                                d = arguments.length > 12 && void 0 !== arguments[12] ? arguments[12] : 0,
                                p = arguments.length > 13 && void 0 !== arguments[13] ? arguments[13] : 0,
                                h = arguments.length > 14 && void 0 !== arguments[14] ? arguments[14] : 0,
                                v = arguments.length > 15 && void 0 !== arguments[15] ? arguments[15] : 1;
                            return this.currentStepAnimates.push({
                                type: "matrix3d",
                                args: [e, t, n, o, r, i, a, c, u, s, f, l, d, p, h, v]
                            }), this.stepping = !1, this
                        }
                    }, {
                        key: "rotate",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "rotate",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "rotate3d",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                            return this.currentStepAnimates.push({
                                type: "rotate3d",
                                args: [e, t, n, o]
                            }), this.stepping = !1, this
                        }
                    }, {
                        key: "rotateX",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "rotateX",
                                args: [e]
                            }), this.stepping = !1, this
                        }
                    }, {
                        key: "rotateY",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "rotateY",
                                args: [e]
                            }), this.stepping = !1, this
                        }
                    }, {
                        key: "rotateZ",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "rotateZ",
                                args: [e]
                            }), this.stepping = !1, this
                        }
                    }, {
                        key: "scale",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                t = arguments[1];
                            return t = void 0 !== t ? t : e, this.currentStepAnimates.push({
                                type: "scale",
                                args: [e, t]
                            }), this
                        }
                    }, {
                        key: "scale3d",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                            return this.currentStepAnimates.push({
                                type: "scale3d",
                                args: [e, t, n]
                            }), this
                        }
                    }, {
                        key: "scaleX",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                            return this.currentStepAnimates.push({
                                type: "scaleX",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "scaleY",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                            return this.currentStepAnimates.push({
                                type: "scaleY",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "scaleZ",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                            return this.currentStepAnimates.push({
                                type: "scaleZ",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "skew",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            return this.currentStepAnimates.push({
                                type: "skew",
                                args: [e, t]
                            }), this
                        }
                    }, {
                        key: "skewX",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "skewX",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "skewY",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "skewY",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "translate",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            return this.currentStepAnimates.push({
                                type: "translate",
                                args: [e, t]
                            }), this
                        }
                    }, {
                        key: "translate3d",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                            return this.currentStepAnimates.push({
                                type: "translate3d",
                                args: [e, t, n]
                            }), this
                        }
                    }, {
                        key: "translateX",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "translateX",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "translateY",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "translateY",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "translateZ",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                            return this.currentStepAnimates.push({
                                type: "translateZ",
                                args: [e]
                            }), this
                        }
                    }, {
                        key: "opacity",
                        value: function(e) {
                            return this.currentStepAnimates.push({
                                type: "style",
                                args: ["opacity", e]
                            }), this
                        }
                    }, {
                        key: "backgroundColor",
                        value: function(e) {
                            return this.currentStepAnimates.push({
                                type: "style",
                                args: ["background-color", e]
                            }), this
                        }
                    }, {
                        key: "width",
                        value: function(e) {
                            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                                type: "style",
                                args: ["width", e]
                            }), this
                        }
                    }, {
                        key: "height",
                        value: function(e) {
                            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                                type: "style",
                                args: ["height", e]
                            }), this
                        }
                    }, {
                        key: "left",
                        value: function(e) {
                            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                                type: "style",
                                args: ["left", e]
                            }), this
                        }
                    }, {
                        key: "right",
                        value: function(e) {
                            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                                type: "style",
                                args: ["right", e]
                            }), this
                        }
                    }, {
                        key: "top",
                        value: function(e) {
                            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                                type: "style",
                                args: ["top", e]
                            }), this
                        }
                    }, {
                        key: "bottom",
                        value: function(e) {
                            return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                                type: "style",
                                args: ["bottom", e]
                            }), this
                        }
                    }]), e
                }(),
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, a.beforeInvoke)("createAnimation", e, {})) return new c(e)
                };
            t.createAnimation = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.showActionSheet = t.showModal = t.hideLoading = t.showLoading = t.hideToast = t.showToast = void 0;
            var o = n(1),
                r = n(2),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = {
                            title: "",
                            content: "",
                            confirmText: "确定",
                            cancelText: "取消",
                            showCancel: !0,
                            confirmColor: "#3CC51F",
                            cancelColor: "#000000"
                        };
                    if (t = (0, r.extend)(t, e), (0, o.beforeInvoke)("showModal", t, {
                            title: "",
                            content: "",
                            confirmText: "",
                            cancelText: "",
                            confirmColor: "",
                            cancelColor: ""
                        })) return t.confirmText.length > 4 ? void(0, o.beforeInvokeFail)("showModal", e, "confirmText length should not large then 4") : t.cancelText.length > 4 ? void(0, o.beforeInvokeFail)("showModal", e, "cancelText length should not large then 4") : void(0, o.invokeMethod)("showModal", t, {
                        beforeSuccess: function(e) {
                            e.confirm = Boolean(e.confirm), "ios" === (0, r.getPlatform)() ? e.cancel = !e.confirm : e.cancel = !e.confirm && Boolean(e.cancel)
                        }
                    })
                },
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = {
                            duration: 1500,
                            title: "",
                            icon: "success",
                            mask: !1
                        };
                    t = (0, r.extend)(t, e), e.image && (t.image = (0, r.getRealRoute)(a.default.lastRoute, e.image, !1)), ["success", "loading"].indexOf(t.icon) < 0 && (t.icon = "success"), (0, o.beforeInvoke)("showToast", t, {
                        duration: 1,
                        title: "",
                        icon: ""
                    }) && (0, o.invokeMethod)("showToast", t)
                },
                s = function(e) {
                    (0, o.invokeMethod)("hideToast", e)
                },
                f = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = {
                            title: "",
                            icon: "loading",
                            mask: !1,
                            duration: 1e8
                        };
                    t = (0, r.extend)(t, e), e.image && (t.image = (0, r.getRealRoute)(a.default.lastRoute, e.image, !1)), (0, o.beforeInvoke)("showLoading", t, {
                        duration: 1,
                        title: ""
                    }) && (0, o.invokeMethod)("showToast", t, {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("showToast", "showLoading")
                        }
                    })
                },
                l = function(e) {
                    (0, o.invokeMethod)("hideToast", e, {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("hideToast", "hideLoading")
                        }
                    })
                },
                d = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = {
                            itemList: [],
                            itemColor: "#000000"
                        };
                    if (t = (0, r.extend)(t, e), t.cancelText = "取消", t.cancelColor = "#000000", (0, o.beforeInvoke)("showActionSheet", t, {
                            itemList: ["1"],
                            itemColor: ""
                        })) return e.itemList.length > 6 ? void(0, o.beforeInvokeFail)("showActionSheet", e, "parameter error: itemList should not be large than 6") : void(0, o.invokeMethod)("showActionSheet", t)
                };
            t.showToast = u, t.hideToast = s, t.showLoading = f, t.hideLoading = l, t.showModal = c, t.showActionSheet = d
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(17);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(19);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(20);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(21);
            Object.keys(a).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return a[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.hideNavigationBarLoading = t.showNavigationBarLoading = t.setNavigationBarTitle = void 0;
            var o = n(1),
                r = n(18),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("setNavigationBarTitle", e, {
                        title: ""
                    }) && (0, r.invokeMethod)("setNavigationBarTitle", e)
                },
                a = function(e) {
                    (0, r.invokeMethod)("showNavigationBarLoading", e)
                },
                c = function(e) {
                    (0, r.invokeMethod)("hideNavigationBarLoading", e)
                };
            t.setNavigationBarTitle = i, t.showNavigationBarLoading = a, t.hideNavigationBarLoading = c
        }, function(e, t, n) {
            function o(e) {
                void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
            }

            function r() {
                var e = arguments;
                o(function() {
                    WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
                })
            }

            function i() {
                var e = arguments;
                o(function() {
                    WeixinJSBridge.on.apply(WeixinJSBridge, e)
                })
            }

            function a() {
                var e = Array.prototype.slice.call(arguments);
                e[1] = {
                    data: e[1],
                    options: {
                        timestamp: Date.now()
                    }
                }, o(function() {
                    WeixinJSBridge.publish.apply(WeixinJSBridge, e)
                })
            }

            function c() {
                var e = Array.prototype.slice.call(arguments),
                    t = e[1];
                e[1] = function(e, n) {
                    var o = e.data,
                        r = e.options,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        a = r && r.timestamp || 0,
                        c = Date.now();
                    "function" == typeof t && t(o, n), Reporter.speedReport({
                        key: "appService2Webview",
                        data: o || {},
                        timeMark: {
                            startTime: a,
                            endTime: c,
                            nativeTime: i.nativeTime
                        }
                    })
                }, o(function() {
                    WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
                })
            }

            function u(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    o = {};
                for (var i in t) "function" == typeof t[i] && (o[i] = t[i], delete t[i]);
                r(e, t, function(t) {
                    t.errMsg = t.errMsg || e + ":ok";
                    var r = 0 === t.errMsg.indexOf(e + ":ok"),
                        i = 0 === t.errMsg.indexOf(e + ":cancel"),
                        a = 0 === t.errMsg.indexOf(e + ":fail");
                    "function" == typeof n.beforeAll && n.beforeAll(t), r ? ("function" == typeof n.beforeSuccess && n.beforeSuccess(t), "function" == typeof o.success && o.success(t), "function" == typeof n.afterSuccess && n.afterSuccess(t)) : i ? ("function" == typeof o.cancel && o.cancel(t), "function" == typeof n.cancel && n.cancel(t)) : a && ("function" == typeof n.beforeFail && n.beforeFail(t), "function" == typeof o.fail && o.fail(t), "function" == typeof n.afterFail && n.afterFail(t)), "function" == typeof o.complete && o.complete(t), "function" == typeof n.afterAll && n.afterAll(t)
                })
            }

            function s(e, t) {
                i(e, t)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.emitter = void 0, t.invoke = r, t.on = i, t.publish = a, t.subscribe = c, t.invokeMethod = u, t.onMethod = s;
            var f = n(8),
                l = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(f);
            t.emitter = new l.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setNavigationBarColor = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("setNavigationBarColor", e, {
                            frontColor: "",
                            backgroundColor: ""
                        })) {
                        if (-1 === ["#ffffff", "#000000"].indexOf(e.frontColor)) return void(0, o.beforeInvokeFail)("setNavigationBarColor", e, 'invalid frontColor "' + e.frontColor + '"');
                        "#ffffff" === e.frontColor ? (0, o.invokeMethod)("setStatusBarStyle", {
                            color: "white"
                        }) : "#000000" === e.frontColor && (0, o.invokeMethod)("setStatusBarStyle", {
                            color: "black"
                        });
                        var t = Object.assign({}, e);
                        delete t.alpha, (0, o.invokeMethod)("setNavigationBarColor", t)
                    }
                };
            t.setNavigationBarColor = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setNavigationBarRightButton = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!1 === e.hide && !e.iconPath && !e.text) return void(0, o.beforeInvokeFail)("setNavigationBarRightButton", e, "invalid args");
                    (0, o.invokeMethod)("setNavigationBarRightButton", e, {})
                };
            t.setNavigationBarRightButton = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onTapNavigationBarRightButton = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onTapNavigationBarRightButton", Reporter.surroundThirdByTryCatch(e, "at onTapNavigationBarRightButton callback function"))
                };
            t.onTapNavigationBarRightButton = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setTopBarText = void 0;
            var o = n(1),
                r = 0,
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return e.text ? Date.now() - r < 5e3 ? void(0, o.beforeInvokeFail)("setTopBarText", e, "invoke too frequently") : void(0, o.invokeMethod)("setTopBarText", e, {
                        beforeSuccess: function() {
                            r = Date.now()
                        }
                    }) : void(0, o.beforeInvokeFail)("setTopBarText", e, "invalid text")
                };
            t.setTopBarText = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(24);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(28);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(33);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(34);
            Object.keys(a).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return a[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.reLaunch = t.navigateBack = t.switchTab = t.redirectTo = t.navigateTo = void 0;
            var o = n(1),
                r = n(2),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = n(25),
                u = function(e) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    (0, o.beforeInvoke)("redirectTo", e, {
                        url: ""
                    }) && (e.url = (0, r.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, r.encodeUrlQuery)(e.url), (0, o.checkUrlInConfig)("redirectTo", e.url, e) && (a.default.navigatorLock = !0, (0, o.invokeMethod)("redirectTo", e, {
                        afterSuccess: function() {
                            a.default.lastRoute = e.url
                        },
                        afterFail: function() {
                            a.default.navigatorLock = !1
                        }
                    })))
                },
                s = function(e) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if ("active" !== a.default.runningStatus) return void(0, o.beforeInvokeFail)("reLaunch", e, "can not invoke reLaunch in background");
                    (0, o.beforeInvoke)("reLaunch", e, {
                        url: ""
                    }) && (e.url = (0, r.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, r.encodeUrlQuery)(e.url), (0, o.checkUrlInConfig)("reLaunch", e.url, e) && (a.default.navigatorLock = !0, (0, o.invokeMethod)("reLaunch", e, {
                        afterSuccess: function() {
                            a.default.lastRoute = e.url
                        },
                        afterFail: function() {
                            a.default.navigatorLock = !1
                        }
                    })))
                },
                f = function(e) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    (0, o.beforeInvoke)("navigateTo", e, {
                        url: ""
                    }) && (e.url = (0, r.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, r.encodeUrlQuery)(e.url), (0, o.checkUrlInConfig)("navigateTo", e.url, e) && (a.default.navigatorLock = !0, (0, o.invokeMethod)("navigateTo", e, {
                        afterSuccess: function() {
                            a.default.lastRoute = e.url, (0, c.notifyCurrentRoutetoContext)(a.default.lastRoute)
                        },
                        afterFail: function() {
                            a.default.navigatorLock = !1
                        }
                    })))
                },
                l = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("switchTab", e, {
                        url: ""
                    }) && (/\?.*$/.test(e.url) && (console.warn("wx.switchTab: url 不支持 queryString"), e.url = e.url.replace(/\?.*$/, "")), e.url = (0, r.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, r.encodeUrlQuery)(e.url), (0, o.checkUrlInConfig)("switchTab", e.url, e) && (a.default.navigatorLock = !0, (0, o.invokeMethod)("switchTab", e, {
                        afterSuccess: function() {
                            a.default.lastRoute = e.url, (0, c.notifyCurrentRoutetoContext)(a.default.lastRoute)
                        },
                        afterFail: function() {
                            a.default.navigatorLock = !1
                        }
                    })))
                },
                d = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    "number" != typeof e.delta ? e.delta = 1 : (e.delta = parseInt(e.delta), e.delta < 1 && (e.delta = 1)), (0, o.invokeMethod)("navigateBack", e)
                };
            t.navigateTo = f, t.redirectTo = u, t.switchTab = l, t.navigateBack = d, t.reLaunch = s
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r(e) {
                y = e
            }

            function i(e) {
                return "number" == typeof e
            }

            function a(e) {
                var t = null;
                if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
                    var n = parseInt(t[1].slice(0, 2), 16),
                        o = parseInt(t[1].slice(2, 4), 16),
                        r = parseInt(t[1].slice(4), 16);
                    return [n, o, r, 255]
                }
                if (null != (t = /^rgb\((.+)\)$/.exec(e))) return t[1].split(",").map(function(e) {
                    return parseInt(e.trim())
                }).concat(255);
                if (null != (t = /^rgba\((.+)\)$/.exec(e))) return t[1].split(",").map(function(e, t) {
                    return 3 == t ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim())
                });
                var i = e.toLowerCase();
                if (d.predefinedColor.hasOwnProperty(i)) {
                    t = /^#([0-9|A-F|a-f]{6})$/.exec(d.predefinedColor[i]);
                    var n = parseInt(t[1].slice(0, 2), 16),
                        o = parseInt(t[1].slice(2, 4), 16),
                        r = parseInt(t[1].slice(4), 16);
                    return [n, o, r, 255]
                }
                console.group("非法颜色: " + e), console.error("不支持颜色：" + e), console.groupEnd()
            }

            function c(e) {
                if (Array.isArray(e)) {
                    var t = [];
                    return e.forEach(function(e) {
                        t.push(c(e))
                    }), t
                }
                if ("object" == (void 0 === e ? "undefined" : s(e))) {
                    var t = {};
                    for (var n in e) t[n] = c(e[n]);
                    return t
                }
                return e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Context = t.notifyCurrentRoutetoContext = void 0;
            var u = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                f = n(2),
                l = n(26),
                d = n(27),
                p = ["scale", "rotate", "translate", "save", "restore"],
                h = ["drawImage", "fillText", "fill", "stroke", "fillRect", "strokeRect", "clearRect"],
                v = ["beginPath", "clip", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"],
                g = ["setFillStyle", "setTextAlign", "setStrokeStyle", "setGlobalAlpha", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit", "setTextBaseline", "setLineDash"],
                y = "",
                b = function() {
                    function e(t, n) {
                        o(this, e), this.type = t, this.data = n, this.colorStop = []
                    }
                    return u(e, [{
                        key: "addColorStop",
                        value: function(e, t) {
                            this.colorStop.push([e, a(t)])
                        }
                    }]), e
                }(),
                m = function() {
                    function e(t) {
                        o(this, e), this.actions = [], this.path = [], this.canvasId = t
                    }
                    return u(e, [{
                        key: "getActions",
                        value: function() {
                            var e = c(this.actions);
                            return this.actions = [], this.path = [], e
                        }
                    }, {
                        key: "clearActions",
                        value: function() {
                            this.actions = [], this.path = []
                        }
                    }, {
                        key: "draw",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                                t = this.canvasId,
                                n = c(this.actions);
                            this.actions = [], this.path = [], this.isWidgetCanvas ? (0, l.drawCanvas)({
                                isWidgetCanvas: !0,
                                actions: n,
                                reserve: e
                            }) : (0, l.drawCanvas)({
                                canvasId: t,
                                actions: n,
                                reserve: e
                            })
                        }
                    }, {
                        key: "createLinearGradient",
                        value: function(e, t, n, o) {
                            return new b("linear", [e, t, n, o])
                        }
                    }, {
                        key: "createCircularGradient",
                        value: function(e, t, n) {
                            return new b("radial", [e, t, n])
                        }
                    }]), e
                }();
            [].concat(p, h).forEach(function(e) {
                m.prototype[e] = "fill" == e || "stroke" == e ? function() {
                    this.actions.push({
                        method: e + "Path",
                        data: c(this.path)
                    })
                } : "fillRect" === e ? function(e, t, n, o) {
                    this.actions.push({
                        method: "fillPath",
                        data: [{
                            method: "rect",
                            data: [e, t, n, o]
                        }]
                    })
                } : "strokeRect" === e ? function(e, t, n, o) {
                    this.actions.push({
                        method: "strokePath",
                        data: [{
                            method: "rect",
                            data: [e, t, n, o]
                        }]
                    })
                } : "fillText" == e ? function(t, n, o) {
                    this.actions.push({
                        method: e,
                        data: [t.toString(), n, o]
                    })
                } : "drawImage" == e ? function(t, n, o, r, a) {
                    "devtools" == (0, f.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, f.getRealRoute)(y, t, !1).replace(/.html$/, ""));
                    var c = void 0;
                    c = i(r) && i(a) ? [t, n, o, r, a] : [t, n, o], this.actions.push({
                        method: e,
                        data: c
                    })
                } : function() {
                    this.actions.push({
                        method: e,
                        data: [].slice.apply(arguments)
                    })
                }
            }), v.forEach(function(e) {
                "beginPath" == e ? m.prototype[e] = function() {
                    this.path = []
                } : "clip" == e ? m.prototype[e] = function() {
                    this.actions.push({
                        method: e,
                        data: c(this.path)
                    })
                } : "lineTo" == e ? m.prototype.lineTo = function() {
                    0 == this.path.length ? this.path.push({
                        method: "moveTo",
                        data: [].slice.apply(arguments)
                    }) : this.path.push({
                        method: "lineTo",
                        data: [].slice.apply(arguments)
                    })
                } : m.prototype[e] = function() {
                    this.path.push({
                        method: e,
                        data: [].slice.apply(arguments)
                    })
                }
            }), g.forEach(function(e) {
                m.prototype[e] = "setFillStyle" == e || "setStrokeStyle" == e ? function() {
                    var t = arguments[0];
                    "string" == typeof t ? this.actions.push({
                        method: e,
                        data: ["normal", a(t)]
                    }) : "object" == (void 0 === t ? "undefined" : s(t)) && t instanceof b && this.actions.push({
                        method: e,
                        data: [t.type, t.data, t.colorStop]
                    })
                } : "setGlobalAlpha" === e ? function() {
                    var t = [].slice.apply(arguments, [0, 1]);
                    t[0] = Math.floor(255 * parseFloat(t[0])), this.actions.push({
                        method: e,
                        data: t
                    })
                } : "setShadow" == e ? function() {
                    var t = [].slice.apply(arguments, [0, 4]);
                    t[3] = a(t[3]), this.actions.push({
                        method: e,
                        data: t
                    })
                } : "setLineDash" == e ? function() {
                    var t = [].slice.apply(arguments, [0, 2]);
                    t[0] = t[0] || [0, 0], t[1] = t[1] || 0, this.actions.push({
                        method: e,
                        data: t
                    })
                } : function() {
                    this.actions.push({
                        method: e,
                        data: [].slice.apply(arguments, [0, 1])
                    })
                }
            }), t.notifyCurrentRoutetoContext = r, t.Context = m
        }, function(e, t, n) {
            function o(e, t) {
                return e + "canvas" + t
            }

            function r() {
                for (var e in b)
                    if (0 == e.indexOf(v + "canvas")) {
                        b[e];
                        delete b[e]
                    }
            }

            function i(e) {
                v = e
            }

            function a(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    o = arguments[3],
                    r = arguments[4],
                    i = arguments[5],
                    a = (0, d.getPlatform)();
                "ios" == a || "android" == a ? WeixinJSBridge.invoke("drawCanvas", {
                    canvasId: e,
                    reserve: n,
                    actions: t
                }, function(e) {
                    e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof o && o(e) : "function" == typeof r && r(e), "function" == typeof i && i(e)
                }) : WeixinJSBridge.publish("canvas" + e + "actionsChanged", {
                    actions: t,
                    reserve: n
                })
            }

            function c(e) {
                var t = e.isWidgetCanvas,
                    n = e.canvasId,
                    r = e.actions,
                    i = e.reserve,
                    c = e.success,
                    u = e.fail,
                    s = e.complete,
                    f = S();
                if (Array.isArray(r)) {
                    if (t) {
                        if (f - _ < w) {
                            var l = {
                                errMsg: "drawCanvas:fail 调用 draw 过于频繁。"
                            };
                            return k += 1, k > 500 && (k = 0, console.warn(l.errMsg)), void("function" == typeof u && u(l))
                        }
                        return _ = f, void WeixinJSBridge.invoke("drawCanvas", {
                            canvasId: p,
                            reserve: i,
                            actions: r
                        }, function(e) {
                            e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof c && c(e) : "function" == typeof u && u(e), "function" == typeof s && s(e)
                        })
                    }
                    if (n) {
                        var d = o(v, n);
                        if ("number" == typeof b[d]) {
                            var p = b[d];
                            a(p, r, i, c, u, s)
                        } else m[d] = m[d] || [], m[d] = m[d].concat({
                            actions: r,
                            reserve: i,
                            success: c,
                            fail: u,
                            complete: s
                        })
                    }
                }
            }

            function u(e) {
                var t = (0, d.getPlatform)();
                "ios" === t || "android" === t ? M ? A(M, e) : (0, f.invokeMethod)("getSystemInfo", {}, {
                    beforeSuccess: function(t) {
                        M = t, A(M, e)
                    }
                }) : (WeixinJSBridge.subscribe("onCanvasToDataUrl_" + e.canvasId, function(t) {
                    var n = t.dataUrl;
                    (0, f.invokeMethod)("base64ToTempFilePath", (0, d.assign)({
                        base64Data: n
                    }, e), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("base64ToTempFilePath", "canvasToTempFilePath")
                        }
                    })
                }), (0, f.publish)("invokeCanvasToDataUrl_" + e.canvasId, e))
            }

            function s(e) {
                if (e.canvasId) {
                    var t = o(v, e.canvasId);
                    if ("number" == typeof b[t]) e.canvasId = b[t], u(e);
                    else {
                        var n = {
                                errMsg: "canvasToTempFilePath: fail canvas is empty"
                            },
                            r = Reporter.surroundThirdByTryCatch(e.fail || h, "at api canvasToTempFilePath fail callback function"),
                            i = Reporter.surroundThirdByTryCatch(e.complete || h, "at api canvasToTempFilePath complete callback function");
                        r(n), i(n)
                    }
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createWidgetContext = t.createCanvasContext = t.createContext = t.canvasToTempFilePath = t.drawCanvas = t.notifyWebviewIdToCanvas = t.clearOldWebviewCanvas = t.canvasInfo = void 0;
            var f = n(1),
                l = n(25),
                d = n(2),
                p = n(8),
                h = (new p.EventEmitter2, function() {}),
                v = 0,
                g = {},
                y = {},
                b = {},
                m = {},
                _ = 0,
                k = 0,
                w = 4500,
                S = Date.now;
            "undefined" != typeof __widgetConfig__ && (w = "number" == typeof __widgetConfig__.drawMinInterval ? __widgetConfig__.drawMinInterval : 25), WeixinJSBridge.subscribe("canvasInsert", function(e, t) {
                var n = e.canvasId,
                    r = e.canvasNumber,
                    i = e.data,
                    c = e.position,
                    u = o(v, n);
                g[r] = {
                    lastTouches: [],
                    data: i
                }, b[u] = b[u] || r, y[r] = c, Array.isArray(m[u]) && (m[u].forEach(function(e) {
                    a(r, e.actions, e.reserve, e.success, e.fail, e.complete)
                }), delete m[u])
            }), WeixinJSBridge.subscribe("canvasUpdate", function(e, t) {
                var n = (e.canvasId, e.canvasNumber),
                    o = e.position;
                y.hasOwnProperty(n) && (y[n] = o)
            }), WeixinJSBridge.subscribe("canvasRemove", function(e, t) {
                var n = e.canvasId,
                    r = o(v, n);
                b[r] && delete b[r]
            });
            var M = void 0;
            (0, f.invokeMethod)("getSystemInfo", {}, {
                beforeSuccess: function(e) {
                    M = e
                }
            });
            var C = function(e, t, n, o) {
                    n *= t, o *= t, e.x = e.x ? e.x * t : 0, e.y = e.y ? e.y * t : 0, (e.x < 0 || e.x > n) && (e.x = 0), (e.y < 0 || e.y > o) && (e.y = 0), e.width = e.width ? Math.min(n - e.x, e.width * t) : n - e.x, e.height = e.height ? Math.min(o - e.y, e.height * t) : o - e.y, e.destWidth = e.destWidth ? e.destWidth / t : e.width / t, e.destHeight = e.destHeight ? e.destHeight / t : e.height / t
                },
                P = function(e, t, n, o) {
                    e.x = e.x ? e.x : 0, e.y = e.y ? e.y : 0, (e.x < 0 || e.x > n) && (e.x = 0), (e.y < 0 || e.y > o) && (e.y = 0), e.width = e.width ? Math.min(n - e.x, e.width) : n - e.x, e.height = e.height ? Math.min(o - e.y, e.height) : o - e.y, e.destWidth = e.destWidth ? e.destWidth : e.width * t, e.destHeight = e.destHeight ? e.destHeight : e.height * t
                },
                A = function(e, t) {
                    var n = JSON.parse(JSON.stringify(t));
                    n.success = t.success, n.fail = t.fail, n.complete = t.complete;
                    var o = 300,
                        r = 150;
                    y.hasOwnProperty(t.canvasId) && (o = y[t.canvasId].width, r = y[t.canvasId].height), "ios" !== (0, d.getPlatform)() || "6.5.10" !== e.version && "6.5.11" !== e.version && "6.5.12" !== e.version ? P(n, e.pixelRatio, o, r) : C(n, e.pixelRatio, o, r), (0, f.invokeMethod)("canvasToTempFilePath", n)
                },
                O = function() {
                    return new l.Context
                },
                T = function() {
                    var e = new l.Context;
                    return e.isWidgetCanvas = !0, e
                },
                I = function(e) {
                    return new l.Context(e)
                };
            t.canvasInfo = g, t.clearOldWebviewCanvas = r, t.notifyWebviewIdToCanvas = i, t.drawCanvas = c, t.canvasToTempFilePath = s, t.createContext = O, t.createCanvasContext = I, t.createWidgetContext = T
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgrey: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkslategrey: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgray: "#d3d3d3",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370db",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#db7093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                rebeccapurple: "#663399",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32"
            };
            t.predefinedColor = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onAppRoute = void 0;
            var o = n(1),
                r = n(3),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = n(26),
                c = n(29),
                u = n(7),
                s = n(30),
                f = n(31),
                l = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(f),
                d = [];
            (0, o.onMethod)("onAppRoute", function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (e.path = e.path.substring(0, e.path.length - 5), e.webviewId = void 0 !== e.webviewId ? e.webviewId : t, i.default.lastRoute = e.path, "appLaunch" !== e.openType && "autoReLaunch" !== e.openType)
                    for (var n in e.query) e.query[n] = decodeURIComponent(e.query[n]);
                i.default.query = e.query, "navigateBack" != e.openType && "redirectTo" != e.openType || (0, a.clearOldWebviewCanvas)(), (0, a.notifyWebviewIdToCanvas)(e.webviewId), (0, c.notifyWebviewIdtoMap)(e.webviewId), (0, u.notifyWebviewIdtoCamera)(e.webviewId), i.default.currentWebviewId = e.webviewId, (0, s.checkNeedAppEnterForegroundPatch)() && l.emitter.emit("onAppRoute"), d.forEach(function(t) {
                    t(e)
                })
            });
            t.onAppRoute = function(e, t) {
                d.push(e)
            }
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r(e) {
                d = e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.mapInfo = t.createMapContext = t.notifyWebviewIdtoMap = void 0;
            var i = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                a = n(1),
                c = n(2),
                u = n(8),
                s = {},
                f = {},
                l = new u.EventEmitter2,
                d = 0,
                p = 0;
            WeixinJSBridge.subscribe("mapInsert", function(e, t) {
                var n = e.domId,
                    o = e.mapId,
                    r = e.bindregionchange,
                    i = e.bindtap,
                    a = e.showLocation,
                    c = e.target;
                s[t + "_" + n] = o, f[t + "_" + o] = {
                    bindregionchange: r,
                    bindtap: i,
                    showLocation: a,
                    target: c
                }, l.emit("mapInsert")
            });
            var h = function() {
                    function e(t) {
                        var n = this;
                        if (o(this, e), "string" != typeof t) throw new Error("map ID should be a String");
                        this.domId = t, this._lastMarkerPos = {}, this._lastMarkerDeg = {}, this._translating = {}, this._delayTranslate = {}, this._isGetMarkerPos = {}, WeixinJSBridge.subscribe("doMapActionCallback", function(e, t) {
                            var o = e.callbackId;
                            o && "function" == typeof n[o] && (n[o](e), delete n[o])
                        })
                    }
                    return i(e, [{
                        key: "_invoke",
                        value: function(e, t) {
                            var n = (0, c.getPlatform)(),
                                o = ["includeMapPoints", "getMapMarker"];
                            if ("ios" !== n && "android" !== n || -1 !== o.indexOf(e)) {
                                t.method = e;
                                var r = "callback" + d + "_" + t.mapId + "_" + p++;
                                this[r] = function(e) {
                                    delete e.callbackId, delete e.mapId, delete e.method, e.errMsg && (e.errMsg.indexOf(":ok") > -1 ? "function" == typeof t.success && t.success(e) : e.errMsg.indexOf(":fail") > -1 && "function" == typeof t.fail && t.fail(e)), "function" == typeof t.complete && t.complete(e)
                                }, t.callbackId = r, (0, a.publish)("doMapAction" + t.mapId, t, [d])
                            } else {
                                var i = f[d + "_" + t.mapId];
                                if ("moveToMapLocation" === e) return void(i && i.showLocation ? (0, a.invokeMethod)(e, t) : console.error("only show-location set to true can invoke moveToLocation"));
                                (0, a.invokeMethod)(e, t)
                            }
                        }
                    }, {
                        key: "_invokeMethod",
                        value: function(e, t) {
                            var n = this,
                                o = d + "_" + this.domId;
                            "number" == typeof s[o] || s[o] ? (t.mapId = s[o], this._invoke(e, t)) : l.on("mapInsert", function() {
                                t.mapId = s[o], n._invoke(e, t)
                            })
                        }
                    }, {
                        key: "getCenterLocation",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this._invokeMethod("getMapCenterLocation", e)
                        }
                    }, {
                        key: "getScale",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this._invokeMethod("getMapScale", e)
                        }
                    }, {
                        key: "getRegion",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this._invokeMethod("getMapRegion", e)
                        }
                    }, {
                        key: "moveToLocation",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this._invokeMethod("moveToMapLocation", e)
                        }
                    }, {
                        key: "translateMarker",
                        value: function() {
                            var e = this,
                                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                n = t.markerId;
                            if (void 0 === n) return void console.warn("MapContext.translateMarker: require markerId");
                            if (!t.destination) return void console.warn("MapContext.translateMarker: require destination");
                            if (this._translating[n]) return void(this._delayTranslate[n] ? this._delayTranslate[n].push(t) : this._delayTranslate[n] = [t]);
                            var o = {
                                    markerId: n,
                                    keyFrames: [{
                                        longitude: t.destination.longitude,
                                        latitude: t.destination.latitude,
                                        duration: t.duration || 1e3
                                    }],
                                    success: function(n) {
                                        "function" == typeof t.success && t.success.call(e, n), "function" == typeof t.animationEnd && t.animationEnd.call(e)
                                    },
                                    fail: function(o) {
                                        e._delayTranslate[n] = [], "function" == typeof t.fail && t.fail.call(e, o)
                                    },
                                    complete: function() {
                                        e._translating[n] = !1;
                                        var t = e._delayTranslate[n];
                                        t && t.length && e.translateMarker(t.shift())
                                    }
                                },
                                r = this._lastMarkerPos[n],
                                i = t.destination;
                            if (t.autoRotate || "number" != typeof t.rotate) {
                                var a = void 0,
                                    c = void 0;
                                if (r) {
                                    var u = i.latitude - r.latitude,
                                        s = i.longitude - r.longitude,
                                        f = u / s || 0;
                                    a = Math.abs((s < 0 ? 180 : 0) - Math.abs(180 * Math.atan(f) / Math.PI)) * (u > 0 ? -1 : 1)
                                } else if (!this._isGetMarkerPos[n]) return this._translating[n] = !0, this._invokeMethod("getMapMarker", {
                                    markerId: n,
                                    success: function(t) {
                                        e._lastMarkerPos[n] = t.pos
                                    },
                                    complete: function() {
                                        e._isGetMarkerPos[n] = !0, e._translating[n] = !1;
                                        var t = e._delayTranslate[n];
                                        t && t.length && e.translateMarker(t.shift())
                                    }
                                }), void(this._delayTranslate[n] ? this._delayTranslate[n].push(t) : this._delayTranslate[n] = [t]);
                                "number" == typeof this._lastMarkerDeg[n] && (c = a - this._lastMarkerDeg[n], Math.abs(c) > 180 && (c = c > 0 ? c - 360 : c + 360), Math.abs(c) > 3 && t.autoRotate && o.keyFrames.unshift({
                                    rotate: c,
                                    duration: Math.abs(c) < 10 ? 100 : 500
                                })), (Math.abs(c) > 3 && t.autoRotate || void 0 === this._lastMarkerDeg[n]) && (this._lastMarkerDeg[n] = a)
                            } else {
                                var l = t.rotate - (this._lastMarkerDeg[n] || 0);
                                Math.abs(l) > 3 && (Math.abs(l) > 180 && (l = l > 0 ? l - 360 : l + 360), o.keyFrames.unshift({
                                    rotate: l,
                                    duration: Math.abs(l) < 10 ? 100 : 500
                                }), this._lastMarkerDeg[n] = t.rotate)
                            }
                            r && r.latitude === i.latitude && r.longitude === i.longitude && (o.keyFrames.pop(), t.autoRotate && (o.keyFrames = [])), o.keyFrames.length > 0 ? (this._translating[n] = !0, this._invokeMethod("translateMapMarker", o)) : setTimeout(function() {
                                o.success(), o.complete()
                            }), this._lastMarkerPos[n] = t.destination
                        }
                    }, {
                        key: "includePoints",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            if (e.points && e.points instanceof Array) {
                                e.points.forEach(function(e) {
                                    e.latitude = Number(e.latitude), e.longitude = Number(e.longitude)
                                });
                                var t = e.padding;
                                e.padding = [0, 0, 0, 0], t && (e.padding[0] = Number(t[0]) || 0, e.padding[1] = Number(t[1]) || 0, e.padding[2] = Number(t[2]) || 0, e.padding[3] = Number(t[3]) || 0), this._invokeMethod("includeMapPoints", e)
                            }
                        }
                    }]), e
                }(),
                v = function(e) {
                    return new h(e)
                };
            t.notifyWebviewIdtoMap = r, t.createMapContext = v, t.mapInfo = f
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.checkNeedAppEnterForegroundPatch = void 0;
            var o = (n(1), n(2)),
                r = function() {
                    var e = !1;
                    return "ios" === (0, o.getPlatform)() ? e = !0 : "android" === (0, o.getPlatform)() && __wxConfig.clientVersion >= 637865520 && (e = !0),
                        function() {
                            return e
                        }
                }();
            t.checkNeedAppEnterForegroundPatch = r
        }, function(e, t, n) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onPageReload = t.onAppRunningStatusChange = t.onAppUnhang = t.onAppEnterBackground = t.onAppEnterForeground = t.emitter = void 0;
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                i = n(1),
                a = n(4),
                c = n(8),
                u = o(c),
                s = n(32),
                f = o(s),
                l = n(2),
                d = n(3),
                p = o(d),
                h = n(30),
                v = __wxConfig.appLaunchInfo || {},
                g = void 0;
            void 0 !== v && ("object" === r(v.shareInfo) && null !== v.shareInfo && (g = v.shareInfo, v.shareTicket = f.default.set(g.shareKey, g.shareName), delete v.shareInfo), v.path && (v.path = (0, l.removeHtmlSuffixFromUrl)(v.path)));
            var y = new u.default;
            (0, i.onMethod)("onAppEnterForeground", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                1044 !== e.scene || e.shareInfo || (e.shareInfo = g), !(0, h.checkNeedAppEnterForegroundPatch)() || 1 !== e.reLaunch && !0 !== e.reLaunch ? y.emit("onAppEnterForeground", e) : y.once("onAppRoute", function() {
                    y.emit("onAppEnterForeground", e)
                })
            }), (0, i.onMethod)("onAppEnterBackground", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                y.emit("onAppEnterBackground", e)
            }), (0, i.onMethod)("onAppUnhang", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                y.emit("onAppUnhang", e)
            }), (0, i.onMethod)("onAppRunningStatusChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                p.default.runningStatus = e.status, y.emit("onAppRunningStatusChange", e)
            }), (0, i.onMethod)("onPageReload", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                e.webviewId = t, y.emit("onPageReload", e)
            });
            var b = function(e) {
                    var t = this;
                    y.on("onAppEnterForeground", function(n) {
                        if (n || (n = {}), n.query = p.default.query, n.path = (0, l.removeHtmlSuffixFromUrl)(p.default.lastRoute), "object" === r(n.shareInfo) && null !== n.shareInfo) {
                            var o = n,
                                c = o.shareInfo;
                            n.shareTicket = f.default.set(c.shareKey, c.shareName), delete n.shareInfo
                        }(0, i.publish)("onAppEnterForeground", n),
                        t.appStatus = a.AppStatus.FORE_GROUND, "function" == typeof e && e(n)
                    })
                },
                m = function(e) {
                    var t = this;
                    y.on("onAppEnterBackground", function(n) {
                        n = n || {}, (0, i.publish)("onAppEnterBackground", n), "hide" === n.mode ? t.appStatus = a.AppStatus.LOCK : t.appStatus = a.AppStatus.BACK_GROUND, "close" === n.mode ? t.hanged = !1 : "hang" === n.mode && (t.hanged = !0), "function" == typeof e && e(n)
                    })
                },
                _ = function(e) {
                    var t = this;
                    y.on("onAppUnhang", function(n) {
                        t.hanged = !1, "function" == typeof e && e(n)
                    })
                },
                k = function(e) {
                    y.on("onAppRunningStatusChange", function(t) {
                        "function" == typeof e && e(t)
                    })
                },
                w = function(e) {
                    y.on("onPageReload", function(t) {
                        t.path && (t.path = (0, l.removeHtmlSuffixFromUrl)(t.path)), "function" == typeof e && e(t)
                    })
                };
            t.emitter = y, t.onAppEnterForeground = b, t.onAppEnterBackground = m, t.onAppUnhang = _, t.onAppRunningStatusChange = k, t.onPageReload = w
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = {},
                i = {
                    get: function(e) {
                        return r[e]
                    },
                    set: function(e, t) {
                        var n = (0, o.guid)();
                        return r[n] = {
                            shareKey: e,
                            shareName: t
                        }, n
                    }
                };
            t.default = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onAppRouteDone = void 0;
            var o = n(1),
                r = n(3),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = [];
            (0, o.onMethod)("onAppRouteDone", function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                i.default.navigatorLock = !1, e.path = e.path.substring(0, e.path.length - 5), e.webviewId = void 0 !== e.webviewId ? e.webviewId : t, i.default.lastRoute = e.path, a.forEach(function(t) {
                    t(e)
                }), (0, o.publish)("onAppRouteDone", {}, [t])
            });
            t.onAppRouteDone = function(e, t) {
                a.push(e)
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onPageReload = t.onAppEnterBackground = t.onAppEnterForeground = t.onAppUnhang = void 0;
            var o = n(31),
                r = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(o),
                i = r.onAppEnterBackground,
                a = r.onAppEnterForeground,
                c = r.onAppUnhang,
                u = r.onPageReload;
            t.onAppUnhang = c, t.onAppEnterForeground = a, t.onAppEnterBackground = i, t.onPageReload = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(36);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(37);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onWebviewEvent = void 0;
            var o = n(1),
                r = n(2),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i);
            "devtools" === (0, r.getPlatform)() && (0, o.subscribe)("SPECIAL_PAGE_EVENT", function(e) {
                var t = e.data,
                    n = e.eventName,
                    i = e.ext,
                    c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (t && "input" == t.type && "function" == typeof a.default.webviewEventCallback) {
                    var u = a.default.webviewEventCallback({
                            data: t,
                            eventName: n,
                            webviewId: c
                        }),
                        s = t.detail.value;
                    if (i && i.setKeyboardValue)
                        if (void 0 === u);
                        else if ("Object" === (0, r.getDataType)(u)) {
                        var f = {};
                        s != u.value && (f.value = u.value + ""), isNaN(parseInt(u.cursor)) || (f.cursor = parseInt(u.cursor)), (0, o.publish)("setKeyboardValue", f, [c])
                    } else s != u && (0, o.publish)("setKeyboardValue", {
                        value: u + "",
                        cursor: -1
                    }, [c])
                }
            });
            t.onWebviewEvent = function(e, t) {
                a.default.webviewEventCallback = e, (0, o.subscribe)("PAGE_EVENT", function(t) {
                    var n = t.data,
                        o = t.eventName,
                        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    e({
                        data: n,
                        eventName: o,
                        webviewId: r
                    })
                })
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onNativeEvent = void 0;
            var o = n(1);
            t.onNativeEvent = function(e) {
                ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd"].forEach(function(t) {
                    (0, o.onMethod)(t, function(n, o) {
                        e({
                            data: n,
                            eventName: t,
                            webviewId: o
                        })
                    })
                })
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createInnerAudioContext = void 0;
            var o = n(39),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = function() {
                    return new r.default
                };
            t.createInnerAudioContext = i
        }, function(e, t, n) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                c = n(1),
                u = n(8),
                s = o(u),
                f = n(3),
                l = o(f),
                d = new WeakMap,
                p = new WeakMap,
                h = new WeakMap,
                v = new WeakMap,
                g = new WeakMap,
                y = {},
                b = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    wx.version && "develop" === wx.version.version && console.warn.apply(console, ["Audio"].concat(t))
                },
                m = new s.default;
            (0, c.onMethod)("onAudioStateChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.state,
                    n = e.audioId;
                delete e.audioId, delete e.state;
                var o = "play" !== t,
                    r = y[n];
                r && p.set(r, Object.assign(p.get(r), {
                    paused: o
                })), b("onAudioStateChange[" + t + "]", e), m.emit(n + "_onAudioStateChange_" + t, e)
            });
            var _ = function() {
                    return function(e, t) {
                        var n = this;
                        b("setAudioState", e, t), v.get(this) && (setTimeout(function() {
                            b("setAudioState，合并调用", Object.assign({}, p.get(n), g.get(n)), d.get(n)), (0, c.invokeMethod)("setAudioState", Object.assign({}, p.get(n), g.get(n), {
                                audioId: d.get(n),
                                complete: function(e) {
                                    b("setAudioState.complete", e)
                                }
                            })), v.set(n, !0)
                        }, 0), v.set(this, !1)), g.set(this, Object.assign(g.get(this), i({}, e, t))), b("setAudioState，延后调用", p.get(this))
                    }
                }(),
                k = function(e, t) {
                    var n = this,
                        o = p.get(this)[e];
                    return (0, c.invokeMethod)("getAudioState", {
                        audioId: d.get(this),
                        success: function(r) {
                            delete r.errMsg, p.set(n, Object.assign(p.get(n), r)), o = r[e], "function" == typeof t && t(o)
                        }
                    }), o
                },
                w = function(e) {
                    b("operateAudio", e);
                    var t = d.get(this);
                    (0, c.invokeMethod)("operateAudio", Object.assign({
                        audioId: t,
                        fail: function(e) {
                            var n = e.errMsg;
                            m.emit(t + "_onAudioStateChange_error", {
                                errMsg: n,
                                errCode: -1
                            })
                        }
                    }, e), {
                        beforeAll: function(t) {
                            b("operateAudio[" + e.operationType + "] callback", t)
                        }
                    })
                },
                S = function(e, t) {
                    m.on(d.get(this) + "_onAudioStateChange_" + e, Reporter.surroundThirdByTryCatch(t, "at audioContext.on" + e + " callback function"))
                },
                M = function() {
                    function e() {
                        var t = this;
                        r(this, e), b("constructor");
                        var n = void 0;
                        if (p.set(this, {}), g.set(this, {}), h.set(this, void 0), v.set(this, !0), (0, c.invokeMethod)("createAudioInstance", {
                                success: function(e) {
                                    d.set(t, e.audioId), p.set(t, {
                                        src: "",
                                        startTime: 0,
                                        paused: !0,
                                        currentTime: 0,
                                        duration: 0,
                                        obeyMuteSwitch: !0
                                    }), y[e.audioId] = t
                                },
                                fail: function(e) {
                                    n = e.errMsg
                                }
                            }), n) throw new Error(n)
                    }
                    return a(e, [{
                        key: "play",
                        value: function() {
                            var e = this;
                            setTimeout(function() {
                                w.call(e, {
                                    operationType: "play"
                                })
                            }, 0)
                        }
                    }, {
                        key: "pause",
                        value: function() {
                            w.call(this, {
                                operationType: "pause"
                            })
                        }
                    }, {
                        key: "stop",
                        value: function() {
                            w.call(this, {
                                operationType: "stop"
                            })
                        }
                    }, {
                        key: "seek",
                        value: function(e) {
                            var t = this;
                            if ("number" != typeof e || e < 0) throw new TypeError("Failed to seek, the currentTime " + e + " is invalid.");
                            setTimeout(function() {
                                w.call(t, {
                                    operationType: "seek",
                                    currentTime: 1e3 * e
                                })
                            }, 0)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            (0, c.invokeMethod)("destroyAudioInstance", {
                                audioId: d.get(this)
                            })
                        }
                    }, {
                        key: "onPlay",
                        value: function(e) {
                            S.call(this, "play", e)
                        }
                    }, {
                        key: "onPause",
                        value: function(e) {
                            S.call(this, "pause", e)
                        }
                    }, {
                        key: "onTimeUpdate",
                        value: function(e) {
                            var t = this,
                                n = d.get(this) + "_onAudioStateChange_timeupdate";
                            void 0 === h.get(this) && h.set(this, setInterval(function() {
                                if ("active" === l.default.runningStatus && !0 !== p.get(t).paused && 1 !== p.get(t).paused) {
                                    var e = p.get(t).currentTime;
                                    k.call(t, "currentTime", function(t) {
                                        t !== e && m.emit(n)
                                    })
                                }
                            }, 250)), m.removeAllListeners(n), m.on(n, function() {
                                "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at audioContext.onTimeUpdate callback function")()
                            })
                        }
                    }, {
                        key: "onStop",
                        value: function(e) {
                            S.call(this, "stop", e)
                        }
                    }, {
                        key: "onCanplay",
                        value: function(e) {
                            S.call(this, "canplay", e)
                        }
                    }, {
                        key: "onError",
                        value: function(e) {
                            S.call(this, "error", e)
                        }
                    }, {
                        key: "onEnded",
                        value: function(e) {
                            S.call(this, "ended", e)
                        }
                    }, {
                        key: "onWaiting",
                        value: function(e) {
                            S.call(this, "waiting", e)
                        }
                    }, {
                        key: "onSeeking",
                        value: function(e) {
                            S.call(this, "seeking", e)
                        }
                    }, {
                        key: "onSeeked",
                        value: function(e) {
                            S.call(this, "seeked", e)
                        }
                    }, {
                        key: "src",
                        get: function() {
                            return k.call(this, "src")
                        },
                        set: function(e) {
                            if ("string" != typeof e || 0 === e.length) throw new TypeError("Failed to set src, the src " + e + " is invalid.");
                            _.call(this, "src", e)
                        }
                    }, {
                        key: "startTime",
                        get: function() {
                            return k.call(this, "startTime") / 1e3
                        },
                        set: function(e) {
                            if ("number" != typeof e) throw new TypeError("Failed to set startTime, the startTime " + e + " is invalid.");
                            _.call(this, "startTime", 1e3 * e)
                        }
                    }, {
                        key: "autoplay",
                        set: function(e) {
                            "boolean" == typeof e && _.call(this, "autoplay", e)
                        }
                    }, {
                        key: "loop",
                        set: function(e) {
                            "boolean" == typeof e && _.call(this, "loop", e)
                        }
                    }, {
                        key: "oebyMuteSwitch",
                        set: function(e) {
                            "boolean" == typeof e && _.call(this, "oebyMuteSwitch", e)
                        }
                    }, {
                        key: "paused",
                        get: function() {
                            return k.call(this, "paused")
                        }
                    }, {
                        key: "duration",
                        get: function() {
                            return k.call(this, "duration") / 1e3
                        }
                    }, {
                        key: "currentTime",
                        get: function() {
                            return k.call(this, "currentTime") / 1e3
                        }
                    }, {
                        key: "buffered",
                        get: function() {
                            return k.call(this, "buffered")
                        }
                    }]), e
                }();
            t.default = M
        }, function(e, t, n) {
            n(41), n(42), n(43), n(46), n(47), n(48)
        }, function(e, t, n) {
            var o = n(3),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = n(2),
                a = n(1);
            (0, a.onMethod)("onKeyboardValueChange", function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = e.value,
                    o = e.cursor;
                if (e.data && "function" == typeof r.default.webviewEventCallback) {
                    var c = JSON.parse(e.data);
                    if (c.bindinput) {
                        var u = void 0;
                        try {
                            u = r.default.webviewEventCallback({
                                data: {
                                    type: "input",
                                    target: c.target,
                                    currentTarget: c.target,
                                    timeStamp: Date.now(),
                                    touches: [],
                                    detail: {
                                        value: e.value,
                                        cursor: e.cursor
                                    }
                                },
                                eventName: c.bindinput,
                                webviewId: t
                            })
                        } catch (e) {
                            throw new i.AppServiceSdkKnownError("bind key input error")
                        }
                        if (c.setKeyboardValue)
                            if (void 0 === u || null === u || !1 === u);
                            else if ("Object" === (0, i.getDataType)(u)) {
                            var s = {
                                inputId: e.inputId
                            };
                            n != u.value && (s.value = u.value + ""), isNaN(parseInt(u.cursor)) || (s.cursor = parseInt(u.cursor), void 0 === s.value && (s.value = n), s.cursor > s.value.length && (s.cursor = -1)), (0, a.invokeMethod)("setKeyboardValue", s)
                        } else n != u && (0, a.invokeMethod)("setKeyboardValue", {
                            value: u + "",
                            cursor: -1,
                            inputId: e.inputId
                        })
                    }
                }(0, a.publish)("setKeyboardValue", {
                    value: n,
                    cursor: o,
                    inputId: e.inputId
                }, [t])
            })
        }, function(e, t, n) {
            var o = n(1),
                r = n(3),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = n(29);
            (0, o.onMethod)("onMapMarkerClick", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (e.data && "function" == typeof i.default.webviewEventCallback) {
                    var n = JSON.parse(e.data);
                    n.bindmarkertap && i.default.webviewEventCallback({
                        data: {
                            type: "markertap",
                            target: n.target,
                            currentTarget: n.target,
                            timeStamp: Date.now(),
                            touches: [],
                            detail: {
                                markerId: n.markerId
                            },
                            markerId: n.markerId
                        },
                        eventName: n.bindmarkertap,
                        webviewId: t
                    })
                }
            }), (0, o.onMethod)("onMapCalloutClick", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (e.data && "function" == typeof i.default.webviewEventCallback) {
                    var n = JSON.parse(e.data);
                    n.bindcallouttap && i.default.webviewEventCallback({
                        data: {
                            type: "callouttap",
                            target: n.target,
                            currentTarget: n.target,
                            timeStamp: Date.now(),
                            touches: [],
                            detail: {
                                markerId: n.markerId
                            },
                            markerId: n.markerId
                        },
                        eventName: n.bindcallouttap,
                        webviewId: t
                    })
                }
            }), (0, o.onMethod)("onMapControlClick", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (e.data && "function" == typeof i.default.webviewEventCallback) {
                    var n = JSON.parse(e.data);
                    n.bindcontroltap && i.default.webviewEventCallback({
                        data: {
                            type: "controltap",
                            target: n.target,
                            currentTarget: n.target,
                            timeStamp: Date.now(),
                            touches: [],
                            detail: {
                                controlId: n.controlId
                            },
                            controlId: n.controlId
                        },
                        eventName: n.bindcontroltap,
                        webviewId: t
                    })
                }
            }), (0, o.onMethod)("onMapRegionChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = a.mapInfo[t + "_" + e.mapId];
                n && n.bindregionchange && "function" == typeof i.default.webviewEventCallback && i.default.webviewEventCallback({
                    data: {
                        target: n.target,
                        currentTarget: n.target,
                        timeStamp: Date.now(),
                        touches: [],
                        detail: {
                            type: e.type
                        },
                        type: e.type
                    },
                    eventName: n.bindregionchange,
                    webviewId: t
                })
            }), (0, o.onMethod)("onMapClick", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = a.mapInfo[t + "_" + e.mapId];
                n && n.bindtap && "function" == typeof i.default.webviewEventCallback && i.default.webviewEventCallback({
                    data: {
                        type: "tap",
                        target: n.target,
                        currentTarget: n.target,
                        timeStamp: Date.now(),
                        touches: [],
                        detail: {}
                    },
                    eventName: n.bindtap,
                    webviewId: t
                })
            })
        }, function(e, t, n) {
            var o = n(3),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = n(1),
                a = n(44),
                c = n(45);
            ["onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel", "onLongPress"].forEach(function(e) {
                (0, i.onMethod)(e, function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        o = JSON.parse(t.data),
                        i = o.canvasNumber;
                    c.canvasInfo.hasOwnProperty(i) || console.error("No such canvas " + i + " register in " + n + ", but trigger " + e + " event.");
                    var u = c.canvasInfo[i].data,
                        s = (0, a.calTouches)(u.lastTouches, e, t),
                        f = s.touches,
                        l = s.changedTouches;
                    u.lastTouches = f, u[e] && "function" == typeof r.default.webviewEventCallback && ("onTouchMove" === e && 0 === l.length || r.default.webviewEventCallback({
                        data: {
                            type: a.touchType[e],
                            timeStamp: new Date - u.startTime,
                            target: u.target,
                            touches: f,
                            changedTouches: l
                        },
                        eventName: u[e],
                        webviewId: n
                    }))
                })
            })
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function(e, t, n) {
                    var o = [],
                        r = [];
                    if ("onTouchStart" === t) {
                        for (var i in e) o.push(e[i]);
                        var a = {
                            x: n.touch.x,
                            y: n.touch.y,
                            identifier: n.touch.id
                        };
                        r.push(a), o.push(a)
                    } else if ("onTouchMove" === t)
                        for (var c in e) {
                            var u = e[c],
                                s = !1;
                            for (var f in n.touches) {
                                var l = {
                                    x: n.touches[f].x,
                                    y: n.touches[f].y,
                                    identifier: n.touches[f].id
                                };
                                if (l.identifier === u.identifier && (u.x !== l.x || u.y !== l.y)) {
                                    o.push(l), r.push(l), s = !0;
                                    break
                                }
                            }
                            s || o.push(u)
                        } else if ("onTouchEnd" === t) {
                            var d = {
                                x: n.touch.x,
                                y: n.touch.y,
                                identifier: n.touch.id
                            };
                            for (var p in e) {
                                var h = e[p];
                                h.identifier === d.identifier ? r.push(d) : o.push(h)
                            }
                        } else if ("onTouchCancel" === t)
                        for (var v in n.touches) {
                            var g = {
                                x: n.touches[v].x,
                                y: n.touches[v].y,
                                identifier: n.touches[v].id
                            };
                            r.push(g)
                        } else if ("onLongPress" === t) {
                            var y = {
                                x: n.touch.x,
                                y: n.touch.y,
                                identifier: n.touch.id
                            };
                            for (var b in e) e[b].identifier === y.identifier ? o.push(y) : o.push(e[b]);
                            r.push(y)
                        }
                    return {
                        touches: o,
                        changedTouches: r
                    }
                },
                o = {
                    onTouchStart: "touchstart",
                    onTouchMove: "touchmove",
                    onTouchEnd: "touchend",
                    onTouchCancel: "touchcancel",
                    onLongPress: "longtap"
                };
            t.calTouches = n, t.touchType = o
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(26);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            })
        }, function(e, t, n) {
            var o = n(3),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = n(1);
            ["onVideoPlay", "onVideoPause", "onVideoEnded", "onVideoTimeUpdate", "onVideoClickFullScreenBtn", "onVideoClickDanmuBtn", "onVideoFullScreenChange", "onVideoWaiting", "onVideoError"].forEach(function(e) {
                (0, i.onMethod)(e, function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        n = arguments[1],
                        o = "bind" + e.substring(7).toLowerCase(),
                        a = JSON.parse(t.data),
                        c = a.handlers,
                        u = a.event,
                        s = a.createdTimestamp;
                    if (c[o] && "function" == typeof r.default.webviewEventCallback) {
                        var f = {
                            type: o.substring(4),
                            target: u.target,
                            currentTarget: u.currentTarget,
                            timeStamp: Date.now() - s,
                            detail: {}
                        };
                        "bindtimeupdate" === o && (f.detail = {
                            currentTime: t.position
                        }), "bindfullscreenchange" === o && (f.detail = {
                            fullScreen: t.fullScreen,
                            direction: t.direction
                        }), "binderror" === o && (f.detail = {
                            errMsg: t.errMsg
                        }), r.default.webviewEventCallback({
                            data: f,
                            eventName: c[o],
                            webviewId: n
                        })
                    }
                    "onVideoFullScreenChange" === e && (0, i.publish)("videoFullScreenChange", t, [n])
                })
            })
        }, function(e, t, n) {
            var o = n(3),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = n(1);
            ["onTextViewClick", "onImageViewClick"].forEach(function(e) {
                (0, i.onMethod)(e, function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    if (e.data && "function" == typeof r.default.webviewEventCallback) {
                        var n = JSON.parse(e.data);
                        n.bindtap && r.default.webviewEventCallback({
                            data: {
                                target: n.target,
                                currentTarget: n.target
                            },
                            eventName: n.bindtap,
                            webviewId: t
                        })
                    }
                })
            })
        }, function(e, t, n) {
            var o = n(3),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = n(1),
                a = n(7);
            (0, i.onMethod)("onCameraNeedAuthCancel", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = a.cameraInfo[t + "_" + e.cameraId];
                n && n.binderror && "function" == typeof r.default.webviewEventCallback && r.default.webviewEventCallback({
                    data: {
                        type: "error",
                        target: n.target,
                        currentTarget: n.target,
                        timeStamp: Date.now(),
                        touches: [],
                        detail: {
                            msg: "user cancel auth"
                        }
                    },
                    eventName: n.binderror,
                    webviewId: t,
                    nodeId: n.nodeId
                }), n && (n.isCancelAuth = !0)
            }), (0, i.onMethod)("onCameraStop", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    n = a.cameraInfo[t + "_" + e.cameraId];
                n && n.bindstop && "function" == typeof r.default.webviewEventCallback && r.default.webviewEventCallback({
                    data: {
                        type: "stop",
                        target: n.target,
                        currentTarget: n.target,
                        timeStamp: Date.now(),
                        touches: [],
                        detail: {}
                    },
                    eventName: n.bindstop,
                    webviewId: t,
                    nodeId: n.nodeId
                })
            })
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r(e, t) {
                var n = this,
                    o = new p(e, t);
                return o._getAppStatus = function() {
                    return n.appStatus
                }, o._getHanged = function() {
                    return n.hanged
                }, this.onAppEnterBackground(function() {
                    o.pause()
                }), o
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }();
            t.default = r;
            var a = n(1),
                c = n(2),
                u = n(8),
                s = n(4),
                f = "ios" !== (0, c.getPlatform)() && "android" !== (0, c.getPlatform)(),
                l = {},
                d = new u.EventEmitter2;
            WeixinJSBridge.subscribe("videoPlayerInsert", function(e, t) {
                var n = e.domId,
                    o = e.videoPlayerId;
                l[n] = l[n] || o, d.emit("videoPlayerInsert", n)
            }), WeixinJSBridge.subscribe("videoPlayerRemoved", function(e, t) {
                var n = e.domId;
                e.videoPlayerId;
                delete l[n]
            });
            var p = function() {
                function e(t, n) {
                    if (o(this, e), "string" != typeof t) throw new Error("video ID should be a String");
                    this.domId = t, this.webviewId = n
                }
                return i(e, [{
                    key: "play",
                    value: function() {
                        var e = this._getAppStatus();
                        e === s.AppStatus.BACK_GROUND || e === s.AppStatus.LOCK || this._invokeMethod("play")
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this._invokeMethod("pause")
                    }
                }, {
                    key: "seek",
                    value: function(e) {
                        this._invokeMethod("seek", [e])
                    }
                }, {
                    key: "sendDanmu",
                    value: function(e) {
                        var t = e.text,
                            n = e.color;
                        this._invokeMethod("sendDanmu", [t, n])
                    }
                }, {
                    key: "playbackRate",
                    value: function(e) {
                        .5 !== (e = parseFloat(e.toFixed(1))) && .8 !== e && 1 !== e && 1.25 !== e && 1.5 !== e || this._invokeMethod("playbackRate", [e])
                    }
                }, {
                    key: "requestFullScreen",
                    value: function() {
                        this._invokeMethod("requestFullScreen")
                    }
                }, {
                    key: "exitFullScreen",
                    value: function() {
                        this._invokeMethod("exitFullScreen")
                    }
                }, {
                    key: "_invokeMethod",
                    value: function(e, t) {
                        function n() {
                            f ? (this.action = {
                                method: e,
                                data: t
                            }, this._sendAction()) : (0, a.invokeMethod)("operateVideoPlayer", {
                                data: t,
                                videoPlayerId: l[this.domId],
                                type: e
                            })
                        }
                        var o = this;
                        "number" == typeof l[this.domId] ? n.apply(this) : d.on("videoPlayerInsert", function(e) {
                            n.apply(o)
                        })
                    }
                }, {
                    key: "_sendAction",
                    value: function() {
                        WeixinJSBridge.publish("video_" + this.domId + "_actionChanged", this.action)
                    }
                }]), e
            }()
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r(e, t) {
                var n = this,
                    o = new f(e, t);
                return o._getAppStatus = function() {
                    return n.appStatus
                }, o._getHanged = function() {
                    return n.hanged
                }, this.onAppEnterBackground(function() {
                    o.pause()
                }), o
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }();
            t.default = r;
            var a = (n(1), n(2), n(8)),
                c = n(4),
                u = {},
                s = new a.EventEmitter2;
            WeixinJSBridge.subscribe("audioInsert", function(e, t) {
                var n = e.audioId;
                u[t + "_" + n] = !0, s.emit("audioInsert_" + t + "_" + n)
            });
            var f = function() {
                function e(t, n) {
                    if (o(this, e), "string" != typeof t) throw new Error("audioId should be a String");
                    this.audioId = t, this.webviewId = n
                }
                return i(e, [{
                    key: "setSrc",
                    value: function(e) {
                        this._sendAction({
                            method: "setSrc",
                            data: e
                        })
                    }
                }, {
                    key: "play",
                    value: function() {
                        var e = this._getAppStatus();
                        this._getHanged();
                        e === c.AppStatus.BACK_GROUND || this._sendAction({
                            method: "play"
                        })
                    }
                }, {
                    key: "pause",
                    value: function() {
                        this._sendAction({
                            method: "pause"
                        })
                    }
                }, {
                    key: "seek",
                    value: function(e) {
                        this._sendAction({
                            method: "setCurrentTime",
                            data: e
                        })
                    }
                }, {
                    key: "_ready",
                    value: function(e) {
                        u[this.webviewId + "_" + this.audioId] ? e() : s.on("audioInsert_" + this.webviewId + "_" + this.audioId, function() {
                            e()
                        })
                    }
                }, {
                    key: "_sendAction",
                    value: function(e) {
                        var t = this;
                        this._ready(function() {
                            WeixinJSBridge.publish("audio_" + t.audioId + "_actionChanged", e, [t.webviewId])
                        })
                    }
                }]), e
            }()
        }, function(module, exports) {
            if ("undefined" == typeof navigator) try {
                eval("const GeneratorFunction = Object.getPrototypeOf(function *() {}).constructor; const f = new GeneratorFunction('', 'console.log(0)'); f().__proto__.__proto__.next = () => {};")
            } catch (e) {}
        }, function(e, t, n) {
            (function(e) {
                var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                };
                n(1);
                if ("undefined" != typeof Function && !__wxConfig.karmaTest) {
                    Function;
                    e = {}, Function.constructor = function() {}, Function.prototype.constructor = function() {}, Function = function() {
                        if (arguments.length > 0 && "return this" === arguments[arguments.length - 1]) return function() {
                            return e
                        }
                    }, Object.defineProperty(Function.constructor.__proto__, "apply", {
                        writable: !1,
                        configurable: !1,
                        value: Function.prototype.constructor.apply
                    })
                }
                if ("undefined" != typeof eval && (eval = void 0), "undefined" != typeof setTimeout) {
                    var o = setTimeout;
                    setTimeout = function(e, n) {
                        if ("function" != typeof e) throw new TypeError("setTimetout expects a function as first argument but got " + (void 0 === e ? "undefined" : t(e)) + ".");
                        var r = Reporter.surroundThirdByTryCatch(e, "at setTimeout callback function");
                        return o(r, n)
                    };
                    var r = setInterval;
                    setInterval = function(e, n) {
                        if ("function" != typeof e) throw new TypeError("setInterval expects a function as first argument but got " + (void 0 === e ? "undefined" : t(e)) + ".");
                        Reporter.surroundThirdByTryCatch(e, "at setInterval callback function");
                        return r(e, n)
                    }
                }
            }).call(t, function() {
                return this
            }())
        }, function(e, t, n) {
            var o = n(1),
                r = n(2),
                i = n(4);
            if ("undefined" != typeof __wxConfig && __wxConfig.debug && "devtools" !== (0, r.getPlatform)()) {
                var a = [],
                    c = [];
                ["log", "warn", "error", "info", "debug"].forEach(function(e) {
                    var t = console[e];
                    console[e] = function() {
                        a.length > i.LOG_LIMIT && a.shift();
                        var n = Array.prototype.slice.call(arguments);
                        a.push({
                            method: e,
                            log: n
                        }), t.apply(console, arguments), c.length > 0 && (0, o.publish)(e, {
                            log: n
                        }, c)
                    }
                }), (0, o.subscribe)("DOMContentLoaded", function(e, t) {
                    c.push(t), (0, o.publish)("initLogs", {
                        logs: a
                    }, [t])
                })
            }
            void 0 === console.group && (console.group = function() {}), void 0 === console.groupEnd && (console.groupEnd = function() {})
        }, function(e, t, n) {
            function o() {
                s({
                    success: function(e) {
                        a.default.currentClipBoardData = e.data
                    }
                })
            }
            var r = n(31),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = n(55),
                u = n(64),
                s = c.clipboard.getClipboardData;
            o(), (0, r.onAppEnterForeground)(o), (0, r.onAppEnterBackground)(function() {
                s({
                    success: function(e) {
                        e.data !== a.default.currentClipBoardData && (a.default.currentClipBoardData = e.data, (0, u.reportClipBoardData)(!1))
                    }
                })
            })
        }, function(e, t, n) {
            function o(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.wifi = t.bluetooth = t.contact = t.vibrate = t.screen = t.iBeacon = t.clipboard = t.scan = t.phone = t.compass = t.accelerometer = t.network = t.systemInfo = void 0;
            var r = n(56),
                i = o(r),
                a = n(58),
                c = o(a),
                u = n(59),
                s = o(u),
                f = n(60),
                l = o(f),
                d = n(61),
                p = o(d),
                h = n(62),
                v = o(h),
                g = n(63),
                y = o(g),
                b = n(65),
                m = o(b),
                _ = n(66),
                k = o(_),
                w = n(72),
                S = o(w),
                M = n(73),
                C = o(M),
                P = n(74),
                A = o(P),
                O = n(95),
                T = o(O);
            t.systemInfo = i, t.network = c, t.accelerometer = s, t.compass = l, t.phone = p, t.scan = v, t.clipboard = y, t.iBeacon = m, t.screen = k, t.vibrate = S, t.contact = C, t.bluetooth = A, t.wifi = T
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getSystemInfoSync = t.getSystemInfo = void 0;
            var o = n(1),
                r = n(2),
                i = n(57),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = function(e) {
                    var t = (0, r.getPlatform)();
                    (0, o.invokeMethod)("getSystemInfo", e, {
                        beforeSuccess: function(e) {
                            "ios" === t && (e.brand = "iPhone"), e.platform = t, e.SDKVersion = a.default.SDKVersion
                        }
                    })
                },
                u = function(e) {
                    var t = {},
                        n = (0, r.getPlatform)();
                    return (0, o.invokeMethod)("getSystemInfo", {}, {
                        beforeSuccess: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            "ios" === n && (e.brand = "iPhone"), t = e, t.platform = n, t.SDKVersion = a.default.SDKVersion, delete e.errMsg
                        }
                    }), t
                };
            t.getSystemInfo = c, t.getSystemInfoSync = u
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = {
                SDKVersion: "1.6.0"
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onNetworkStatusChange = t.getNetworkType = void 0;
            var o = n(1),
                r = [],
                i = function(e) {
                    (0, o.invokeMethod)("getNetworkType", e)
                },
                a = function(e) {
                    r.push(Reporter.surroundThirdByTryCatch(e, "onNetworkStatusChange"))
                };
            (0, o.onMethod)("onNetworkStatusChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                r.forEach(function(t) {
                    "function" == typeof t && t(e)
                })
            }), t.getNetworkType = i, t.onNetworkStatusChange = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onAccelerometerChange = t.stopAccelerometer = t.startAccelerometer = void 0;
            var o = n(1),
                r = n(2),
                i = !1,
                a = [],
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("enableAccelerometer", (0, r.assign)(e, {
                        enable: !0
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("enableAccelerometer", "startAccelerometer")
                        }
                    }), i = !0
                },
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("enableAccelerometer", (0, r.assign)(e, {
                        enable: !1
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("enableAccelerometer", "stopAccelerometer")
                        }
                    }), i = !1
                },
                s = function(e) {
                    i || ((0, o.invokeMethod)("enableAccelerometer", {
                        enable: !0
                    }), i = !0), a.push(Reporter.surroundThirdByTryCatch(e, "at onAccelerometerChange callback function"))
                };
            (0, o.onMethod)("onAccelerometerChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                a.forEach(function(t) {
                    "function" == typeof t && t(e)
                })
            }), t.startAccelerometer = c, t.stopAccelerometer = u, t.onAccelerometerChange = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onCompassChange = t.stopCompass = t.startCompass = void 0;
            var o = n(1),
                r = n(2),
                i = !1,
                a = [],
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("enableCompass", (0, r.assign)(e, {
                        enable: !0
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("enableCompass", "startCompass")
                        }
                    }), i = !0
                },
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("enableCompass", (0, r.assign)(e, {
                        enable: !1
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("enableCompass", "stopCompass")
                        }
                    }), i = !1
                },
                s = function(e) {
                    i || ((0, o.invokeMethod)("enableCompass", {
                        enable: !0
                    }), i = !0), a.push(Reporter.surroundThirdByTryCatch(e, "at onCompassChange callback function"))
                };
            (0, o.onMethod)("onCompassChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                a.forEach(function(t) {
                    "function" == typeof t && t(e)
                })
            }), t.startCompass = c, t.stopCompass = u, t.onCompassChange = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.makeVoIPCall = t.makePhoneCall = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("makePhoneCall", e, {
                        phoneNumber: ""
                    }) && (0, o.invokeMethod)("makePhoneCall", e)
                },
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("makeVoIPCall", (0, r.assign)({
                        allowBackCamera: !1,
                        showOther: !1
                    }, e))
                };
            t.makePhoneCall = i, t.makeVoIPCall = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.scanCode = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("scanCode", e, {}) && (0, o.invokeMethod)("scanCode", e, {
                        beforeSuccess: function(e) {
                            "string" == typeof e.path && (e.path = e.path.replace(/\.html$/, ""), e.path = e.path.replace(/\.html\?/, "?"))
                        }
                    })
                };
            t.scanCode = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setClipboardData = t.getClipboardData = void 0;
            var o = n(1),
                r = n(64),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getClipboardData", e, {})
                },
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("setClipboardData", e, {
                        data: ""
                    }) && (0, o.invokeMethod)("setClipboardData", e, {
                        beforeSuccess: function() {
                            a.default.currentClipBoardData = e.data, (0, r.reportClipBoardData)(!0)
                        }
                    })
                };
            t.getClipboardData = c, t.setClipboardData = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.reportClipBoardData = void 0;
            var o = (n(1), n(3)),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = function(e) {
                    if ("" !== r.default.currentClipBoardData) {
                        var t = getCurrentPages().find(function(e) {
                                return e.__wxWebviewId__ === r.default.currentWebviewId
                            }) || {},
                            n = [r.default.currentClipBoardData, t.route, e ? 1 : 0, Object.keys(t.options).map(function(e) {
                                return encodeURIComponent(e) + "=" + encodeURIComponent(t.options[e])
                            }).join("&")].map(encodeURIComponent).join(",");
                        Reporter.reportKeyValue({
                            key: "Clipboard",
                            value: n,
                            force: !0
                        })
                    }
                };
            t.reportClipBoardData = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBeaconServiceChange = t.onBeaconUpdate = t.getBeacons = t.stopBeaconDiscovery = t.startBeaconDiscovery = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!e.uuids) return void(0, o.beforeInvokeFail)("startBeaconDiscovery", e, "must have uuid");
                    if (!Array.isArray(e.uuids)) return void(0, o.beforeInvokeFail)("startBeaconDiscovery", e, "uuid must be an Array");
                    if (0 !== e.uuids.length) {
                        var t = new RegExp(/^[0-9a-f]{4}$|^[0-9a-f]{8}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
                        if (!e.uuids.some(function(e) {
                                return "string" == typeof e && t.test(e)
                            })) return void(0, o.beforeInvokeFail)("startBeaconDiscovery", e, "invalid service uuid")
                    }(0, o.invokeMethod)("startBeaconDiscovery", e)
                },
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("stopBeaconDiscovery", e)
                },
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getBeacons", e)
                },
                c = function(e) {
                    (0, o.beforeInvoke)("onBeaconUpdate", e, o.noop) && (0, o.onMethod)("onBeaconUpdated", Reporter.surroundThirdByTryCatch(e, "at onBeaconUpdate callback function"))
                },
                u = function(e) {
                    (0, o.beforeInvoke)("onBeaconServiceChange", e, o.noop) && (0, o.onMethod)("onBeaconServiceChanged", Reporter.surroundThirdByTryCatch(e, "at onBeaconServiceChange callback function"))
                };
            t.startBeaconDiscovery = r, t.stopBeaconDiscovery = i, t.getBeacons = a, t.onBeaconUpdate = c, t.onBeaconServiceChange = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(67);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(68);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(69);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(70);
            Object.keys(a).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return a[e]
                    }
                })
            });
            var c = n(71);
            Object.keys(c).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return c[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.captureScreen = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("captureScreen", e, {})
                };
            t.captureScreen = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onUserCaptureScreen = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onUserCaptureScreen", Reporter.surroundThirdByTryCatch(e, "at onUserCaptureScreen callback function"))
                };
            t.onUserCaptureScreen = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getScreenBrightness = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getScreenBrightness", e, {})
                };
            t.getScreenBrightness = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setScreenBrightness = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("setScreenBrightness", e, {})
                };
            t.setScreenBrightness = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setKeepScreenOn = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("setKeepScreenOn", e, {
                        keepScreenOn: !0
                    }) && (0, o.invokeMethod)("setKeepScreenOn", e, {})
                };
            t.setKeepScreenOn = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.vibrateLong = t.vibrateShort = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("vibrateShort", e, {})
                },
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("vibrateLong", e, {})
                };
            t.vibrateShort = r, t.vibrateLong = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.addPhoneContact = t.chooseWeChatContact = t.chooseContact = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.invokeMethod)("chooseContact", e)
                },
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("chooseWeChatContact", e)
                },
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("addPhoneContact", e, {})
                };
            t.chooseContact = r, t.chooseWeChatContact = i, t.addPhoneContact = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(75);
            Object.defineProperty(t, "openBluetoothAdapter", {
                enumerable: !0,
                get: function() {
                    return o.openBluetoothAdapter
                }
            });
            var r = n(76);
            Object.defineProperty(t, "closeBluetoothAdapter", {
                enumerable: !0,
                get: function() {
                    return r.closeBluetoothAdapter
                }
            });
            var i = n(77);
            Object.defineProperty(t, "getBluetoothAdapterState", {
                enumerable: !0,
                get: function() {
                    return i.getBluetoothAdapterState
                }
            });
            var a = n(78);
            Object.defineProperty(t, "onBluetoothAdapterStateChange", {
                enumerable: !0,
                get: function() {
                    return a.onBluetoothAdapterStateChange
                }
            });
            var c = n(79);
            Object.defineProperty(t, "startBluetoothDevicesDiscovery", {
                enumerable: !0,
                get: function() {
                    return c.startBluetoothDevicesDiscovery
                }
            });
            var u = n(80);
            Object.defineProperty(t, "stopBluetoothDevicesDiscovery", {
                enumerable: !0,
                get: function() {
                    return u.stopBluetoothDevicesDiscovery
                }
            });
            var s = n(81);
            Object.defineProperty(t, "getBluetoothDevices", {
                enumerable: !0,
                get: function() {
                    return s.getBluetoothDevices
                }
            });
            var f = n(82);
            Object.defineProperty(t, "getConnectedBluetoothDevices", {
                enumerable: !0,
                get: function() {
                    return f.getConnectedBluetoothDevices
                }
            });
            var l = n(83);
            Object.defineProperty(t, "createBLEConnection", {
                enumerable: !0,
                get: function() {
                    return l.createBLEConnection
                }
            });
            var d = n(84);
            Object.defineProperty(t, "closeBLEConnection", {
                enumerable: !0,
                get: function() {
                    return d.closeBLEConnection
                }
            });
            var p = n(85);
            Object.defineProperty(t, "getBLEDeviceServices", {
                enumerable: !0,
                get: function() {
                    return p.getBLEDeviceServices
                }
            });
            var h = n(86);
            Object.defineProperty(t, "getBLEDeviceCharacteristics", {
                enumerable: !0,
                get: function() {
                    return h.getBLEDeviceCharacteristics
                }
            });
            var v = n(87);
            Object.defineProperty(t, "notifyBLECharacteristicValueChanged", {
                enumerable: !0,
                get: function() {
                    return v.notifyBLECharacteristicValueChanged
                }
            });
            var g = n(88);
            Object.defineProperty(t, "notifyBLECharacteristicValueChange", {
                enumerable: !0,
                get: function() {
                    return g.notifyBLECharacteristicValueChange
                }
            });
            var y = n(89);
            Object.defineProperty(t, "onBluetoothDeviceFound", {
                enumerable: !0,
                get: function() {
                    return y.onBluetoothDeviceFound
                }
            });
            var b = n(90);
            Object.defineProperty(t, "readBLECharacteristicValue", {
                enumerable: !0,
                get: function() {
                    return b.readBLECharacteristicValue
                }
            });
            var m = n(91);
            Object.defineProperty(t, "writeBLECharacteristicValue", {
                enumerable: !0,
                get: function() {
                    return m.writeBLECharacteristicValue
                }
            });
            var _ = n(92);
            Object.defineProperty(t, "onBLEConnectionStateChanged", {
                enumerable: !0,
                get: function() {
                    return _.onBLEConnectionStateChanged
                }
            });
            var k = n(93);
            Object.defineProperty(t, "onBLEConnectionStateChange", {
                enumerable: !0,
                get: function() {
                    return k.onBLEConnectionStateChange
                }
            });
            var w = n(94);
            Object.defineProperty(t, "onBLECharacteristicValueChange", {
                enumerable: !0,
                get: function() {
                    return w.onBLECharacteristicValueChange
                }
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openBluetoothAdapter = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("openBluetoothAdapter", e, {})
                };
            t.openBluetoothAdapter = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.closeBluetoothAdapter = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("closeBluetoothAdapter", e, {})
                };
            t.closeBluetoothAdapter = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getBluetoothAdapterState = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getBluetoothAdapterState", e, {})
                };
            t.getBluetoothAdapterState = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBluetoothAdapterStateChange = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onBluetoothAdapterStateChange", Reporter.surroundThirdByTryCatch(e, "at onBluetoothAdapterStateChange callback function"))
                };
            t.onBluetoothAdapterStateChange = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.startBluetoothDevicesDiscovery = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (e.services) {
                        if (!Array.isArray(e.services)) return void(0, o.beforeInvokeFail)("startBluetoothDevicesDiscovery", {}, "services must be an Array");
                        if (0 !== e.services.length) {
                            var t = new RegExp(/^[0-9a-f]{4}$|^[0-9a-f]{8}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
                            if (!e.services.some(function(e) {
                                    return "string" == typeof e && t.test(e)
                                })) return void(0, o.beforeInvokeFail)("startBluetoothDevicesDiscovery", {}, "invalid service uuid");
                            e.services = e.services.map(function(e) {
                                return "android" === (0, r.getPlatform)() && (e = e.toUpperCase()), 4 === e.length ? "0000" + e + "-0000-1000-8000-00805F9B34FB" : 8 === e.length ? e + "-0000-1000-8000-00805F9B34FB" : e
                            })
                        }
                    }(0, o.invokeMethod)("startBluetoothDevicesDiscovery", e, {})
                };
            t.startBluetoothDevicesDiscovery = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.stopBluetoothDevicesDiscovery = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("stopBluetoothDevicesDiscovery", e, {})
                };
            t.stopBluetoothDevicesDiscovery = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getBluetoothDevices = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getBluetoothDevices", e, {
                        beforeSuccess: function(e) {
                            Array.isArray(e.devices) || (e.devices = []), e.devices.map(function(e) {
                                return e.name || (e.name = "未知设备"), e.advertisData && (e.advertisData = (0, r.base64ToArrayBuffer)(e.advertisData)), e
                            })
                        }
                    })
                };
            t.getBluetoothDevices = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getConnectedBluetoothDevices = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (e.services) {
                        if (!Array.isArray(e.services)) return void(0, o.beforeInvokeFail)("getConnectedBluetoothDevices", e, "services must be an Array");
                        if (0 !== e.services.length) {
                            var t = new RegExp(/^[0-9a-f]{4}$|^[0-9a-f]{8}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
                            if (!e.services.some(function(e) {
                                    return "string" == typeof e && t.test(e)
                                })) return void(0, o.beforeInvokeFail)("getConnectedBluetoothDevices", {}, "invalid service uuid");
                            e.services = e.services.map(function(e) {
                                return console.warn((0, r.getPlatform)()), "android" === (0, r.getPlatform)() && (e = e.toUpperCase()), 4 === e.length ? "0000" + e + "-0000-1000-8000-00805F9B34FB" : 8 === e.length ? e + "-0000-1000-8000-00805F9B34FB" : e
                            })
                        }
                    }(0, o.invokeMethod)("getConnectedBluetoothDevices", e, {
                        beforeSuccess: function(e) {
                            Array.isArray(e.devices) || (e.devices = []), e.devices = e.devices.map(function(e) {
                                return e.name || (e.name = "未知设备"), e.advertisData && (e.advertisData = (0, r.base64ToArrayBuffer)(e.advertisData)), e
                            })
                        }
                    })
                };
            t.getConnectedBluetoothDevices = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createBLEConnection = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("createBLEConnection", e, {
                        deviceId: ""
                    }) && (0, o.invokeMethod)("createBLEConnection", e, {})
                };
            t.createBLEConnection = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.closeBLEConnection = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("closeBLEConnection", e, {
                        deviceId: ""
                    }) && (0, o.invokeMethod)("closeBLEConnection", e, {})
                };
            t.closeBLEConnection = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getBLEDeviceServices = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("getBLEDeviceServices", e, {
                        deviceId: ""
                    }) && (0, o.invokeMethod)("getBLEDeviceServices", e, {
                        beforeSuccess: function(e) {
                            Array.isArray(e.services) || (e.services = []), void 0 === e.errCode && (e.errCode = 0)
                        }
                    })
                };
            t.getBLEDeviceServices = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getBLEDeviceCharacteristics = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("getBLEDeviceCharacteristics", e, {
                        deviceId: "",
                        serviceId: ""
                    }) && (0, o.invokeMethod)("getBLEDeviceCharacteristics", Object.assign({}, e, {
                        serviceId: "android" === (0, r.getPlatform)() ? e.serviceId.toUpperCase() : e.serviceId
                    }), {
                        beforeSuccess: function(e) {
                            Array.isArray(e.characteristics) || (e.characteristics = [])
                        }
                    })
                };
            t.getBLEDeviceCharacteristics = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.notifyBLECharacteristicValueChanged = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("notifyBLECharacteristicValueChanged", e, {
                            state: !0,
                            deviceId: "",
                            serviceId: "",
                            characteristicId: ""
                        })) {
                        var t = "android" === (0, r.getPlatform)();
                        (0, o.invokeMethod)("notifyBLECharacteristicValueChanged", Object.assign({}, e, {
                            serviceId: t ? e.serviceId.toUpperCase() : e.serviceId,
                            characteristicId: t ? e.characteristicId.toUpperCase() : e.characteristicId
                        }), {})
                    }
                };
            t.notifyBLECharacteristicValueChanged = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.notifyBLECharacteristicValueChange = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("notifyBLECharacteristicValueChange", e, {
                            state: !0,
                            deviceId: "",
                            serviceId: "",
                            characteristicId: ""
                        })) {
                        var t = "android" === (0, r.getPlatform)();
                        (0, o.invokeMethod)("notifyBLECharacteristicValueChanged", Object.assign({}, e, {
                            serviceId: t ? e.serviceId.toUpperCase() : e.serviceId,
                            characteristicId: t ? e.characteristicId.toUpperCase() : e.characteristicId
                        }), {
                            beforeAll: function(e) {
                                e.errMsg = e.errMsg.replace("notifyBLECharacteristicValueChanged", "notifyBLECharacteristicValueChange")
                            }
                        })
                    }
                };
            t.notifyBLECharacteristicValueChange = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBluetoothDeviceFound = void 0;
            var o = n(1),
                r = n(2),
                i = function(e) {
                    (0, o.onMethod)("onBluetoothDeviceFound", function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = [];
                        Array.isArray(t.devices) ? n = t.devices : n.push(t), n = n.map(function(e) {
                            try {
                                e.advertisData = (0, r.base64ToArrayBuffer)(e.advertisData)
                            } catch (e) {}
                            return e
                        }), Reporter.surroundThirdByTryCatch(e, "at onBluetoothDeviceFound callback function")({
                            devices: n
                        })
                    })
                };
            t.onBluetoothDeviceFound = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.readBLECharacteristicValue = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("readBLECharacteristicValue", e, {
                            deviceId: "",
                            serviceId: "",
                            characteristicId: ""
                        })) {
                        var t = "android" === (0, r.getPlatform)();
                        (0, o.invokeMethod)("readBLECharacteristicValue", Object.assign({}, e, {
                            serviceId: t ? e.serviceId.toUpperCase() : e.serviceId,
                            characteristicId: t ? e.characteristicId.toUpperCase() : e.characteristicId
                        }), {})
                    }
                };
            t.readBLECharacteristicValue = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.writeBLECharacteristicValue = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("writeBLECharacteristicValue", e, {
                        value: new ArrayBuffer(0),
                        deviceId: "",
                        serviceId: "",
                        characteristicId: ""
                    }) && (0, o.invokeMethod)("writeBLECharacteristicValue", Object.assign({}, e, {
                        value: (0, r.arrayBufferToBase64)(e.value),
                        serviceId: e.serviceId.toUpperCase(),
                        characteristicId: "android" === (0, r.getPlatform)() ? e.characteristicId.toUpperCase() : e.characteristicId
                    }), {})
                };
            t.writeBLECharacteristicValue = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBLEConnectionStateChanged = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onBLEConnectionStateChanged", Reporter.surroundThirdByTryCatch(e, "at onBLEConnectionStateChanged callback function"))
                };
            t.onBLEConnectionStateChanged = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBLEConnectionStateChange = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onBLEConnectionStateChanged", Reporter.surroundThirdByTryCatch(e, "at onBLEConnectionStateChange callback function"))
                };
            t.onBLEConnectionStateChange = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBLECharacteristicValueChange = void 0;
            var o = n(1),
                r = n(2),
                i = function(e) {
                    (0, o.onMethod)("onBLECharacteristicValueChange", Reporter.surroundThirdByTryCatch(e, "at onBLECharacteristicValueChange callback function")), (0, o.onMethod)("onBLECharacteristicValueChange", function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        "string" == typeof t.value && (t.value = (0, r.base64ToArrayBuffer)(t.value)), Reporter.surroundThirdByTryCatch(e, "at onBLECharacteristicValueChange callback function")(t)
                    })
                };
            t.onBLECharacteristicValueChange = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(96);
            Object.defineProperty(t, "startWifi", {
                enumerable: !0,
                get: function() {
                    return o.startWifi
                }
            });
            var r = n(97);
            Object.defineProperty(t, "stopWifi", {
                enumerable: !0,
                get: function() {
                    return r.stopWifi
                }
            });
            var i = n(98);
            Object.defineProperty(t, "getWifiList", {
                enumerable: !0,
                get: function() {
                    return i.getWifiList
                }
            });
            var a = n(99);
            Object.defineProperty(t, "getConnectedWifi", {
                enumerable: !0,
                get: function() {
                    return a.getConnectedWifi
                }
            });
            var c = n(100);
            Object.defineProperty(t, "connectWifi", {
                enumerable: !0,
                get: function() {
                    return c.connectWifi
                }
            });
            var u = n(101);
            Object.defineProperty(t, "presetWifiList", {
                enumerable: !0,
                get: function() {
                    return u.presetWifiList
                }
            });
            var s = n(102);
            Object.defineProperty(t, "setWifiList", {
                enumerable: !0,
                get: function() {
                    return s.setWifiList
                }
            });
            var f = n(103);
            Object.defineProperty(t, "onGetWifiList", {
                enumerable: !0,
                get: function() {
                    return f.onGetWifiList
                }
            });
            var l = n(104);
            Object.defineProperty(t, "onWifiConnected", {
                enumerable: !0,
                get: function() {
                    return l.onWifiConnected
                }
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.startWifi = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("startWifi", e, {})
                };
            t.startWifi = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.stopWifi = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("stopWifi", e, {})
                };
            t.stopWifi = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getWifiList = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getWifiList", e, {})
                };
            t.getWifiList = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getConnectedWifi = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getConnectedWifi", e, {})
                };
            t.getConnectedWifi = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.connectWifi = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ("android" !== (0, r.getPlatform)()) return void(0, o.beforeInvokeFail)("connectWifi", e, "connectWifi must be invoked on Android platform");
                    (0, o.beforeInvoke)("connectWifi", e, {
                        SSID: "",
                        BSSID: "",
                        password: ""
                    }) && (0, o.invokeMethod)("connectWifi", e, {})
                };
            t.connectWifi = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.presetWifiList = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ("ios" !== (0, r.getPlatform)()) return void(0, o.beforeInvokeFail)("presetWifiList", e, "presetWifiList must be invoked on iOS platform");
                    (0, o.beforeInvoke)("presetWifiList", e, {
                        wifiList: []
                    }) && (0, o.invokeMethod)("presetWifiList", e, {})
                };
            t.presetWifiList = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setWifiList = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ("ios" !== (0, r.getPlatform)()) return void(0, o.beforeInvokeFail)("setWifiList", e, "setWifiList must be invoked on iOS platform");
                    (0, o.beforeInvoke)("setWifiList", e, {
                        wifiList: []
                    }) && (0, o.invokeMethod)("setWifiList", e, {})
                };
            t.setWifiList = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onGetWifiList = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onGetWifiList", Reporter.surroundThirdByTryCatch(e, "at onGetWifiList callback function"))
                };
            t.onGetWifiList = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onWifiConnected = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onWifiConnected", Reporter.surroundThirdByTryCatch(e, "at onWifiConnected callback function"))
                };
            t.onWifiConnected = r
        }, function(e, t, n) {
            var o = n(1),
                r = n(106),
                i = {
                    getCurrentRoute: r.getCurrentRoute
                },
                a = function(e, t, n, r) {
                    (0, o.publish)("callbackAppServiceMethod", {
                        res: e,
                        isSuccess: t,
                        callbackId: n
                    }, [r])
                };
            (0, o.subscribe)("invokeAppServiceMethod", function(e, t) {
                var n = e.name,
                    r = e.type,
                    c = e.args,
                    u = e.callbackId;
                try {
                    if ("bridge" === r)(0, o.invoke)(n, c, function(e) {
                        e.errMsg = e.errMsg || n + ":ok", -1 !== e.errMsg.indexOf(n + ":ok") ? a(e, !0, u, t) : a(e, !1, u, t)
                    });
                    else {
                        c.success = function(e) {
                            a(e, !0, u, t)
                        }, c.fail = function(e) {
                            a(e, !1, u, t)
                        };
                        ("wx" === r ? wx[n] : i[n])(c)
                    }
                } catch (e) {
                    var s = {
                        errMsg: n + ": fail " + e.message
                    };
                    a(s, !1, u, t)
                }
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getCurrentRoute = void 0;
            var o = n(3),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = function() {
                    (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).success({
                        currentRoute: r.default.lastRoute
                    })
                };
            t.getCurrentRoute = i
        }, function(e, t, n) {
            var o = n(1),
                r = n(3),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r);
            (0, o.onMethod)("onStartReportPageData", function() {
                console.log("onStartReportPageData");
                var e = "function" == typeof getCurrentPages ? getCurrentPages() : [];
                console.log("currentPages", e);
                var t = e.find(function(e) {
                    return e.__wxWebviewId__ === i.default.currentWebviewId
                });
                console.log("currentPage", t), t && (0, o.invokeMethod)("reportPageData", {
                    isUserReport: !0,
                    pageData: JSON.stringify(t.data),
                    pageRoute: t.__route__,
                    complete: function(e) {
                        console.log("reportPageData", e)
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(109);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onLocationChange = t.stopLocationUpdate = t.startLocationUpdate = t.chooseLocation = t.openLocation = t.getLocation = void 0;
            var o = n(1),
                r = (n(4), !1),
                i = [],
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    !0 === r ? i.push(e) : (r = !0, (0, o.invokeMethod)("getLocation", e, {
                        beforeAll: function() {
                            r = !1
                        },
                        afterAll: function(e) {
                            i.forEach(function(t) {
                                "function" == typeof t.complete && t.complete(e)
                            }), i = []
                        },
                        afterSuccess: function(e) {
                            i.forEach(function(t) {
                                "function" == typeof t.success && t.success(e)
                            })
                        },
                        afterFail: function(e) {
                            i.forEach(function(t) {
                                "function" == typeof t.fail && t.fail(e)
                            })
                        }
                    }))
                },
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("openLocation", e, {
                        latitude: 1,
                        longitude: 1
                    }) && (0, o.invokeMethod)("openLocation", e)
                },
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("chooseLocation", e)
                },
                s = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("enableLocationUpdate", Object.assign({}, e, {
                        enableLocationUpdate: !0
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("enableLocationUpdate", "startLocationUpdate")
                        }
                    })
                },
                f = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("enableLocationUpdate", Object.assign({}, e, {
                        enableLocationUpdate: !1
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("enableLocationUpdate", "stopLocationUpdate")
                        }
                    })
                },
                l = function(e) {
                    (0, o.onMethod)("onLocationChange", function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        Reporter.surroundThirdByTryCatch(e, "at onBLECharacteristicValueChange callback function")(t)
                    })
                };
            t.getLocation = a, t.openLocation = c, t.chooseLocation = u, t.startLocationUpdate = s, t.stopLocationUpdate = f, t.onLocationChange = l
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(111);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(112);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getExtConfig = void 0;
            var o = n(112),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    setTimeout(function() {
                        var t = {
                            errMsg: "getExtConfig: ok",
                            extConfig: (0, o.getExtConfigSync)()
                        };
                        "function" == typeof e.success && e.success(t), "function" == typeof e.complete && e.complete(t)
                    }, 0)
                };
            t.getExtConfig = r
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                if (!__wxConfig.ext) return {};
                try {
                    return JSON.parse(JSON.stringify(__wxConfig.ext))
                } catch (e) {
                    return {}
                }
            };
            t.getExtConfigSync = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(114);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createSelectorQuery = void 0;
            var o = n(115),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                i = function(e) {
                    var t = null;
                    if (e && e.page) t = e.page.__wxWebviewId__;
                    else {
                        var n = getCurrentPages();
                        t = n[n.length - 1].__wxWebviewId__
                    }
                    return new r.default(t)
                };
            t.createSelectorQuery = i
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                i = n(1),
                a = 1,
                c = {},
                u = function(e, t, n) {
                    var o = a++;
                    c[o] = n, (0, i.publish)("requestComponentInfo", {
                        reqId: o,
                        reqs: t
                    }, [e])
                };
            (0, i.subscribe)("responseComponentInfo", function(e) {
                var t = e.reqId,
                    n = c[t];
                n && (delete c[t], n(e.res))
            });
            var s = function() {
                    function e(t, n, r) {
                        o(this, e), this._selectorQuery = t, this._selector = n, this._single = r
                    }
                    return r(e, [{
                        key: "fields",
                        value: function(e, t) {
                            return this._selectorQuery._push(this._selector, this._single, e, t), this._selectorQuery
                        }
                    }, {
                        key: "boundingClientRect",
                        value: function(e) {
                            return this._selectorQuery._push(this._selector, this._single, {
                                id: !0,
                                dataset: !0,
                                rect: !0,
                                size: !0
                            }, e), this._selectorQuery
                        }
                    }, {
                        key: "scrollOffset",
                        value: function(e) {
                            return this._selectorQuery._push(this._selector, this._single, {
                                id: !0,
                                dataset: !0,
                                scrollOffset: !0
                            }, e), this._selectorQuery
                        }
                    }]), e
                }(),
                f = function() {
                    function e(t) {
                        o(this, e), this._webviewId = t, this._queue = [], this._queueCb = []
                    }
                    return r(e, [{
                        key: "select",
                        value: function(e) {
                            return new s(this, e, !0)
                        }
                    }, {
                        key: "selectAll",
                        value: function(e) {
                            return new s(this, e, !1)
                        }
                    }, {
                        key: "selectViewport",
                        value: function() {
                            return new s(this, "viewport", !0)
                        }
                    }, {
                        key: "_push",
                        value: function(e, t, n, o) {
                            this._queue.push({
                                selector: e,
                                single: t,
                                fields: n
                            }), this._queueCb.push(o || null)
                        }
                    }, {
                        key: "exec",
                        value: function(e) {
                            var t = this;
                            u(this._webviewId, this._queue, function(n) {
                                var o = t._queueCb;
                                n.forEach(function(e, n) {
                                    "function" == typeof o[n] && o[n].call(t, e)
                                }), "function" == typeof e && e.call(t, n)
                            })
                        }
                    }]), e
                }();
            t.default = f
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.invokeWebviewMethod = void 0;
            var o = n(1),
                r = n(3),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = 0,
                c = [],
                u = [],
                s = function() {},
                f = function(e) {
                    var t = e.name,
                        n = e.args,
                        r = void 0 === n ? {} : n,
                        f = e.webviewIds,
                        l = e.ext,
                        d = void 0 === l ? {} : l;
                    c[a] = {
                        success: r.success || s,
                        fail: r.fail || s,
                        complete: r.complete || s
                    }, u[a] = {
                        beforeAll: d.beforeAll || s,
                        beforeSuccess: d.beforeSuccess || s,
                        afterSuccess: d.afterSuccess || s,
                        beforeFail: d.beforeFail || s,
                        afterFail: d.afterFail || s,
                        afterAll: d.afterAll || s
                    }, (0, o.publish)("invokeWebviewMethod", {
                        name: t,
                        args: r,
                        callbackId: a
                    }, void 0 === f ? [i.default.currentWebviewId] : f), a += 1
                };
            (0, o.subscribe)("callbackWebviewMethod", function(e) {
                var t = e.res,
                    n = e.isSuccess,
                    o = e.callbackId,
                    r = c[o],
                    i = u[o];
                i.beforeAll(t), n ? (i.beforeSuccess(t), r.success(t), i.afterSuccess(t)) : (i.beforeFail(t), r.fail(t), i.afterFail(t)), r.complete(t), i.afterAll(t)
            }), t.invokeWebviewMethod = f
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(118);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.triggerGettingWidgetData = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("triggerGettingWidgetData", e, {
                        cacheKey: ""
                    }) && (0, o.invokeMethod)("triggerGettingWidgetData", e, {})
                };
            t.triggerGettingWidgetData = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.reportKeyValue = t.reportIDKey = t.reportAnalytics = t.reportAction = void 0;
            var o = n(1),
                r = n(2);
            t.reportAction = function(e) {
                (0, o.invokeMethod)("reportAction", e)
            }, t.reportAnalytics = function(e, t) {
                var n = "function" == typeof getCurrentPages && getCurrentPages(),
                    o = n && n.pop && n.pop(),
                    i = {
                        eventID: e,
                        data: t || {},
                        page: o && o.__route__,
                        uid: Date.now().toString(16) + Math.random().toString(16).substr(2),
                        type: 1,
                        version: wx && wx.version && wx.version.version || 0
                    };
                "devtools" !== (0, r.getPlatform)() && (console.info("[自定义分析] 上报成功"), console.info(i)), WeixinJSBridge.invoke("reportRealtimeAction", {
                    actionData: JSON.stringify(i)
                })
            }, t.reportIDKey = function(e, t) {}, t.reportKeyValue = function(e, t) {}
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.CDN = t.socket = t.uploadFile = t.downloadFile = t.request = void 0;
            var o = n(121);
            Object.defineProperty(t, "request", {
                enumerable: !0,
                get: function() {
                    return o.request
                }
            });
            var r = n(124);
            Object.defineProperty(t, "downloadFile", {
                enumerable: !0,
                get: function() {
                    return r.downloadFile
                }
            });
            var i = n(126);
            Object.defineProperty(t, "uploadFile", {
                enumerable: !0,
                get: function() {
                    return i.uploadFile
                }
            });
            var a = n(128);
            Object.defineProperty(t, "socket", {
                enumerable: !0,
                get: function() {
                    return a.socket
                }
            });
            var c = n(129),
                u = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(c);
            t.CDN = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.request = void 0;
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = n(1),
                i = n(2),
                a = n(122),
                c = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(a),
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, r.beforeInvoke)("request", e, {
                            url: ""
                        })) {
                        if (!1 === (0, i.validateUrl)(e.url)) return void(0, r.beforeInvokeFail)("request", e, 'invalid url "' + e.url + '"');
                        if ("function" === e.data) return void(0, r.beforeInvokeFail)("request", e, "data should not be Function");
                        var t = (0, i.getDataType)(e.header);
                        e.header = e.header || {}, e.header = (0, i.convertObjectValueToString)(e.header), "Undefined" !== t && "Object" !== t && (console.warn("wx.request: header must be an object"), e.header = {}), e.header = Object.keys(e.header).reduce(function(t, n) {
                            return "content-type" === n.toLowerCase() ? t[n.toLowerCase()] = e.header[n] : t[n] = e.header[n], t
                        }, {}), e.method && (e.method = e.method.toUpperCase());
                        var n = e.header || {},
                            a = "GET";
                        "string" == typeof e.method && (a = e.method.toUpperCase());
                        var u = void 0;
                        e.dataType = e.dataType || "json", n["content-type"] = n["content-type"] || "application/json", u = void 0 === e.data ? "" : "string" != typeof e.data ? n["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? (0, i.urlEncodeFormData)(e.data, !0) : n["content-type"].indexOf("application/json") > -1 ? JSON.stringify(e.data) : "object" === o(e.data) ? JSON.stringify(e.data) : u.toString() : e.data, "GET" == a && (e.url = (0, i.addQueryStringToUrl)(e.url, e.data));
                        try {
                            return new c.default(Object.assign({}, e, {
                                header: n,
                                method: a,
                                data: u
                            }))
                        } catch (t) {
                            (0, r.beforeInvokeFail)("request", e, t.message)
                        }
                    }
                };
            t.request = u
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r() {
                var e = this,
                    t = g.get(this);
                v.set(this, "sending"), y.set(this, Date.now());
                var n = void 0;
                if ((0, c.invokeMethod)("createRequestTask", {
                        data: t.data,
                        url: t.url,
                        header: t.header,
                        method: t.method,
                        success: function(t) {
                            h.set(e, t.requestTaskId), b += 1, _[t.requestTaskId] = e
                        },
                        fail: function(o) {
                            n = o.errMsg;
                            var r = t.url,
                                i = Date.now() - y.get(e);
                            (0, f.reportNetworkAPI)("request", r, 2, i, n)
                        },
                        complete: function(t) {
                            v.set(e, "done")
                        }
                    }), n) throw new Error(n);
                k.on(h.get(this) + "_onRequestTaskStateChange_success", function(e) {
                    if (e.errMsg = "request:ok", "string" == typeof e.data && 65279 === e.data.charCodeAt(0) && (e.data = e.data.substr(1)), "json" === t.dataType) try {
                        e.data = JSON.parse(e.data)
                    } catch (e) {}
                    e.statusCode = parseInt(e.statusCode), "object" === a(e.header) && (e.header = Object.keys(e.header).reduce(function(t, n) {
                        return Array.isArray(e.header[n]) ? t[n] = e.header[n].join(",") : "string" == typeof e.header[n] && (t[n] = e.header[n]), t
                    }, {})), "function" == typeof t.success && t.success(e), "function" == typeof t.complete && t.complete(e)
                }), k.on(h.get(this) + "_onRequestTaskStateChange_fail", function(e) {
                    e.errMsg = "request:fail " + e.errMsg, "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e)
                })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                c = n(1),
                u = n(8),
                s = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(u),
                f = n(123),
                l = 10;
            try {
                "number" == typeof __wxConfig.wxAppInfo.maxRequestConcurrent && (l = __wxConfig.wxAppInfo.maxRequestConcurrent)
            } catch (e) {}
            var d = 0,
                p = new WeakMap,
                h = new WeakMap,
                v = (new WeakMap, new WeakMap),
                g = new WeakMap,
                y = new WeakMap,
                b = 0,
                m = [],
                _ = {},
                k = new s.default;
            (0, c.onMethod)("onRequestTaskStateChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.state,
                    n = e.requestTaskId;
                delete e.state, delete e.requestTaskId, "success" !== t && "fail" !== t || (b -= 1, m.length > 0 && r.call(m.shift().item)), k.emit(n + "_onRequestTaskStateChange_" + t, e);
                var o = _[n],
                    i = g.get(o).url,
                    a = "success" === t ? 1 : 2,
                    c = Date.now() - y.get(o),
                    u = e.errMsg;
                (0, f.reportNetworkAPI)("request", i, a, c, u)
            });
            var w = function() {
                function e(t) {
                    o(this, e);
                    var n = d++;
                    if (p.set(this, n), v.set(this, "waiting"), ["success", "fail", "complete"].forEach(function(e) {
                            "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api request " + e + " callback function"))
                        }), g.set(this, t), b >= l) return void m.push({
                        id: n,
                        item: this
                    });
                    r.call(this)
                }
                return i(e, [{
                    key: "abort",
                    value: function() {
                        var e = this;
                        if ("waiting" == typeof v.get(this)) {
                            var t = m.findIndex(function(t) {
                                return t.id === p.get(e)
                            });
                            t > -1 && (m.splice(t, 1), b -= 1), v.set(this, "done")
                        } else {
                            (0, c.invokeMethod)("operateRequestTask", {
                                requestTaskId: h.get(this),
                                operationType: "abort"
                            })
                        }
                    }
                }]), e
            }();
            t.default = w
        }, function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function(e, t, n, o, r) {
                var i = [e, t, n, o, r].map(encodeURIComponent).join(",");
                Reporter.reportKeyValue({
                    key: "NetworkAPI",
                    value: i
                }), Reporter.reportIDKey({
                    key: e + "_" + (1 === n ? "ok" : "fail")
                })
            };
            t.reportNetworkAPI = n
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.downloadFile = void 0;
            var o = n(1),
                r = n(125),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = (n(2), function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("downloadFile", e, {
                            url: ""
                        })) try {
                        return new i.default(e)
                    } catch (t) {
                        (0, o.beforeInvokeFail)("downloadFile", e, t.message)
                    }
                });
            t.downloadFile = a
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                i = n(1),
                a = n(8),
                c = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(a),
                u = n(123),
                s = new WeakMap,
                f = (new WeakMap, new WeakMap),
                l = new WeakMap,
                d = {},
                p = new c.default;
            (0, i.onMethod)("onDownloadTaskStateChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.state,
                    n = e.downloadTaskId;
                if (delete e.state, delete e.downloadTaskId, p.emit(n + "_onDownloadTaskStateChange_" + t, e), "success" === t || "fail" === t) try {
                    var o = d[n],
                        r = f.get(o).url,
                        i = "success" === t ? 1 : 2,
                        a = Date.now() - l.get(o),
                        c = e.errMsg;
                    (0, u.reportNetworkAPI)("downloadFile", r, i, a, c)
                } catch (e) {}
            });
            var h = function() {
                function e(t) {
                    var n = this;
                    o(this, e);
                    var r = void 0;
                    if (["success", "fail", "complete"].forEach(function(e) {
                            "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api downloadFile " + e + " callback function"))
                        }), f.set(this, t), l.set(this, Date.now()), (0, i.invokeMethod)("createDownloadTask", {
                            url: t.url,
                            header: t.header,
                            success: function(e) {
                                s.set(n, e.downloadTaskId), d[e.downloadTaskId] = n
                            },
                            fail: function(e) {
                                r = e.errMsg;
                                var o = t.url,
                                    i = Date.now() - l.get(n);
                                (0, u.reportNetworkAPI)("downloadFile", o, 2, i, r)
                            },
                            complete: function(e) {}
                        }), r) throw new Error(r);
                    p.on(s.get(this) + "_onDownloadTaskStateChange_success", function(e) {
                        e.errMsg = "downloadFile:ok", e.statusCode = parseInt(e.statusCode), -1 === [200, 304].indexOf(e.statusCode) && delete e.tempPath, delete e.timeInterval, "function" == typeof t.success && t.success(e), "function" == typeof t.complete && t.complete(e)
                    }), p.on(s.get(this) + "_onDownloadTaskStateChange_fail", function(e) {
                        e.errMsg = "downloadFile:fail " + e.errMsg, "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e)
                    })
                }
                return r(e, [{
                    key: "abort",
                    value: function() {
                        (0, i.invokeMethod)("operateDownloadTask", {
                            downloadTaskId: s.get(this),
                            operationType: "abort"
                        })
                    }
                }, {
                    key: "onProgressUpdate",
                    value: function(e) {
                        p.on(s.get(this) + "_onDownloadTaskStateChange_progressUpdate", function(t) {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at DownloadTask.onProgressUpdate callback function")(t)
                        })
                    }
                }]), e
            }();
            t.default = h
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.uploadFile = void 0;
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = n(1),
                i = n(2),
                a = n(127),
                c = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(a),
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, r.beforeInvoke)("uploadFile", e, {
                            url: "",
                            filePath: "",
                            name: ""
                        })) {
                        "object" !== o(e.header) && void 0 !== e.header && (console.warn("uploadFile: header must be an object"), delete e.header), "object" !== o(e.formData) && void 0 !== e.formData && (console.warn("uploadFile: formData must be an object"), delete e.formData);
                        var t = {},
                            n = {};
                        e.header && (t = (0, i.convertObjectValueToString)(e.header)), e.formData && (n = (0, i.convertObjectValueToString)(e.formData));
                        try {
                            return new c.default(Object.assign({}, e, {
                                header: t,
                                formData: n
                            }))
                        } catch (t) {
                            (0, r.beforeInvokeFail)("uploadFile", e, t.message)
                        }
                    }
                };
            t.uploadFile = u
        }, function(e, t, n) {
            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                i = n(1),
                a = n(8),
                c = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(a),
                u = n(123),
                s = new WeakMap,
                f = (new WeakMap, new WeakMap),
                l = new WeakMap,
                d = {},
                p = new c.default;
            (0, i.onMethod)("onUploadTaskStateChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.state,
                    n = e.uploadTaskId;
                if (delete e.state, delete e.uploadTaskId, p.emit(n + "_onUploadTaskStateChange_" + t, e), "success" === t || "fail" === t) try {
                    var o = d[n],
                        r = f.get(o).url,
                        i = "success" === t ? 1 : 2,
                        a = Date.now() - l.get(o),
                        c = e.errMsg;
                    (0, u.reportNetworkAPI)("uploadFile", r, i, a, c)
                } catch (e) {}
            });
            var h = function() {
                function e(t) {
                    var n = this;
                    o(this, e);
                    var r = void 0;
                    if (["success", "fail", "complete"].forEach(function(e) {
                            "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api uploadFile " + e + " callback function"))
                        }), f.set(this), l.set(this, Date.now()), (0, i.invokeMethod)("createUploadTask", {
                            url: t.url,
                            header: t.header,
                            filePath: t.filePath,
                            name: t.name,
                            formData: t.formData,
                            success: function(e) {
                                s.set(n, e.uploadTaskId), d[e.uploadTaskId] = n
                            },
                            fail: function(e) {
                                r = e.errMsg;
                                var o = t.url,
                                    i = Date.now() - l.get(n);
                                (0, u.reportNetworkAPI)("uploadFile", o, 2, i, r)
                            },
                            complete: function(e) {}
                        }), r) throw new Error(r);
                    p.on(s.get(this) + "_onUploadTaskStateChange_success", function(e) {
                        e.errMsg = "uploadFile:ok", e.statusCode = parseInt(e.statusCode), -1 === [200, 304].indexOf(e.statusCode) && delete e.tempPath, "function" == typeof t.success && t.success(e), "function" == typeof t.complete && t.complete(e)
                    }), p.on(s.get(this) + "_onUploadTaskStateChange_fail", function(e) {
                        e.errMsg = "uploadFile:fail " + e.errMsg, "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e)
                    })
                }
                return r(e, [{
                    key: "abort",
                    value: function() {
                        (0, i.invokeMethod)("operateUploadTask", {
                            uploadTaskId: s.get(this),
                            operationType: "abort"
                        })
                    }
                }, {
                    key: "onProgressUpdate",
                    value: function(e) {
                        p.on(s.get(this) + "_onUploadTaskStateChange_progressUpdate", function(t) {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at UploadTask.onProgressUpdate callback function")(t)
                        })
                    }
                }]), e
            }();
            t.default = h
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.socket = void 0;
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = n(1),
                i = n(2);
            t.socket = {
                connectSocket: function(e) {
                    if ((0, r.beforeInvoke)("connectSocket", e, {
                            url: ""
                        })) {
                        "object" !== o(e.header) && void 0 !== e.header && (console.warn("connectSocket: header must be an object"), delete e.header);
                        var t = {};
                        e.header && (t = (0, i.convertObjectValueToString)(e.header)), (0, r.invokeMethod)("connectSocket", (0, i.assign)({}, e, {
                            header: t
                        }), {
                            beforeSuccess: function(e) {
                                e.statusCode = parseInt(e.statusCode)
                            }
                        })
                    }
                },
                closeSocket: function(e) {
                    (0, r.invokeMethod)("closeSocket", e)
                },
                sendSocketMessage: function(e) {
                    var t = (0, i.getDataType)(e.data);
                    "devtools" === (0, i.getPlatform)() ? (0, r.invokeMethod)("sendSocketMessage", e) : "String" === t ? (0, r.invokeMethod)("sendSocketMessage", e) : "ArrayBuffer" === t && (0, r.invokeMethod)("sendSocketMessage", (0, i.assign)(e, {
                        data: (0, i.arrayBufferToBase64)(e.data),
                        isBuffer: !0
                    }))
                },
                onSocketOpen: function(e) {
                    (0, r.beforeInvoke)("onSocketOpen", e, r.noop) && (0, r.onMethod)("onSocketOpen", Reporter.surroundThirdByTryCatch(e, "at onSocketOpen callback function"))
                },
                onSocketClose: function(e) {
                    (0, r.beforeInvoke)("onSocketClose", e, r.noop) && (0, r.onMethod)("onSocketClose", Reporter.surroundThirdByTryCatch(e, "at onSocketClose callback function"))
                },
                onSocketMessage: function(e) {
                    if ((0, r.beforeInvoke)("onSocketMessage", e, r.noop)) {
                        var t = Reporter.surroundThirdByTryCatch(e, "at onSocketMessage callback function");
                        (0, r.onMethod)("onSocketMessage", function(e) {
                            "devtools" !== (0, i.getPlatform)() && !0 === e.isBuffer && (e.data = (0, i.base64ToArrayBuffer)(e.data)), delete e.isBuffer, "devtools" === (0, i.getPlatform)() && "Blob" === (0, i.getDataType)(e.data) ? (0, i.blobToArrayBuffer)(e.data, function(n) {
                                e.data = n, t(e)
                            }) : t(e)
                        })
                    }
                },
                onSocketError: function(e) {
                    (0, r.onMethod)("onSocketError", Reporter.surroundThirdByTryCatch(e, "at onSocketError callback function"))
                }
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(130);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(131);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.uploadEncryptedFileToCDN = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("uploadEncryptedFileToCDN", e, {})
                };
            t.uploadEncryptedFileToCDN = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onUploadEncryptedFileToCDNProgress = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.onMethod)("onUploadEncryptedFileToCDNProgress", e)
                };
            t.onUploadEncryptedFileToCDNProgress = r
        }, function(e, t, n) {
            function o(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.video = t.image = void 0;
            var r = n(133);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(139);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(140),
                c = o(a),
                u = n(141),
                s = o(u);
            t.image = c, t.video = s
        }, function(e, t, n) {
            function o(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.backgroundAudio = t.record = t.voice = void 0;
            var r = n(134),
                i = o(r),
                a = n(135),
                c = o(a),
                u = n(136),
                s = n(137),
                f = o(s),
                l = n(138);
            c.getRecorderManager = l.getRecorderManager, f.getBackgroundAudioManager = u.getBackgroundAudioManager, t.voice = i, t.record = c, t.backgroundAudio = f
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onVoicePlayEnd = t.stopVoice = t.pauseVoice = t.playVoice = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.beforeInvoke)("playVoice", e, {
                        filePath: ""
                    }) && (0, o.invokeMethod)("playVoice", e)
                },
                i = function(e) {
                    (0, o.invokeMethod)("pauseVoice", e)
                },
                a = function(e) {
                    (0, o.invokeMethod)("stopVoice", e)
                },
                c = function(e) {
                    (0, o.onMethod)("onVoicePlayEnd", Reporter.surroundThirdByTryCatch(e, "at onVoicePlayEnd callback function"))
                };
            t.playVoice = r, t.pauseVoice = i, t.stopVoice = a, t.onVoicePlayEnd = c
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.stopRecord = t.startRecord = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.invokeMethod)("startRecord", e)
                },
                i = function(e) {
                    (0, o.invokeMethod)("stopRecord", e)
                };
            t.startRecord = r, t.stopRecord = i
        }, function(e, t, n) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function r(e) {
                "active" !== p.default.runningStatus || (0, u.invokeMethod)("operateBackgroundAudio", e)
            }

            function i(e, t) {
                if (!1 !== p.default.possessingBackgroundAudioPlayer) {
                    var n = g[e];
                    return (0, u.invokeMethod)("getBackgroundAudioState", {
                        success: function(o) {
                            g = (0, l.assign)(g, o), n = g[e], "function" == typeof t && t(n)
                        },
                        fail: function(e) {
                            e.errMsg
                        },
                        complete: function(e) {}
                    }), n
                }
            }

            function a(e, t) {
                if ("src" === e && !t) throw new Error("invalid wx.backgroundAudio.src: " + t);
                if ("active" !== p.default.runningStatus && !1 === p.default.possessingBackgroundAudioPlayer) throw new l.AppServiceSdkKnownError("Can not set wx.backgroundAudio." + e + ", background audio is preempted.");
                b[e] = t, 1 === Object.keys(b).length && setTimeout(function() {
                    var e = (0, l.assign)({}, b);
                    (0, u.invokeMethod)("setBackgroundAudioState", (0, l.assign)({}, b, {
                        success: function() {
                            g = (0, l.assign)({}, g, e)
                        },
                        fail: function(e) {
                            var t = e.errMsg;
                            throw new Error(t.replace(/^setBackgroundAudioState: fail /, ""))
                        },
                        complete: function(e) {}
                    })), b = {}
                }, 0)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getBackgroundAudioManager = void 0;
            var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                u = n(1),
                s = n(8),
                f = o(s),
                l = n(2),
                d = n(3),
                p = o(d),
                h = new f.default;
            (0, u.onMethod)("onBackgroundAudioNext", function() {
                h.emit("onBackgroundAudioNext")
            }), (0, u.onMethod)("onBackgroundAudioPrev", function() {
                h.emit("onBackgroundAudioPrev")
            }), (0, u.onMethod)("onBackgroundAudioStateChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.state;
                delete e.state, "play" === t ? p.default.possessingBackgroundAudioPlayer = !0 : "preempted" !== t && "occupied" !== t || (p.default.possessingBackgroundAudioPlayer = !1, h.emit("onBackgroundAudioStateChange_stop", e)), h.emit("onBackgroundAudioStateChange_" + t, e)
            });
            var v = void 0,
                g = {
                    src: "",
                    currentTime: 0,
                    duration: 0,
                    paused: !0,
                    buffered: 0,
                    title: "",
                    coverImgUrl: "",
                    description: "",
                    startTime: 0
                },
                y = {
                    play: function() {
                        r({
                            operationType: "play"
                        })
                    },
                    pause: function() {
                        r({
                            operationType: "pause"
                        })
                    },
                    seek: function(e) {
                        if ("number" != typeof e) throw new Error("wx.backgroundAudio.seek(currentTime): unexpected type " + (void 0 === e ? "undefined" : c(e)));
                        r({
                            currentTime: e,
                            operationType: "seek"
                        })
                    },
                    stop: function() {
                        r({
                            operationType: "stop"
                        })
                    },
                    onCanplay: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_canplay"), h.on("onBackgroundAudioStateChange_canplay", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onCanplay callback function")()
                        })
                    },
                    onWaiting: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_waiting"), h.on("onBackgroundAudioStateChange_waiting", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onWaiting callback function")()
                        })
                    },
                    onError: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_error"), h.on("onBackgroundAudioStateChange_error", function(t) {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onError callback function")(t)
                        })
                    },
                    onPlay: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_play"), h.on("onBackgroundAudioStateChange_play", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onPlay callback function")()
                        })
                    },
                    onPause: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_pause"), h.on("onBackgroundAudioStateChange_pause", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onPause callback function")()
                        })
                    },
                    onEnded: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_ended"), h.on("onBackgroundAudioStateChange_ended", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onEnded callback function")()
                        })
                    },
                    onStop: function(e) {
                        h.removeAllListeners("onBackgroundAudioStateChange_stop"), h.on("onBackgroundAudioStateChange_stop", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onStop callback function")()
                        })
                    },
                    onTimeUpdate: function(e) {
                        var t = this;
                        void 0 === v && (v = setInterval(function() {
                            if ("active" === p.default.runningStatus && !1 !== p.default.possessingBackgroundAudioPlayer) {
                                var e = g.currentTime;
                                i("currentTime", function(n) {
                                    t.currentTime !== e && h.emit("onBackgroundAudioStateChange_timeupdate")
                                })
                            }
                        }, 250)), h.removeAllListeners("onBackgroundAudioStateChange_timeupdate"), h.on("onBackgroundAudioStateChange_timeupdate", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onTimeUpdate callback function")()
                        })
                    },
                    onNext: function(e) {
                        h.removeAllListeners("onBackgroundAudioNext"), h.on("onBackgroundAudioNext", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onNext callback function")()
                        })
                    },
                    onPrev: function(e) {
                        h.removeAllListeners("onBackgroundAudioPrev"), h.on("onBackgroundAudioPrev", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onPrev callback function")()
                        })
                    }
                };
            ["src", "title", "epname", "singer", "startTime", "coverImgUrl", "currentTime", "duration", "paused", "buffered", "webUrl"].forEach(function(e) {
                Object.defineProperty(y, e, {
                    get: function() {
                        return i(e)
                    },
                    set: function(t) {
                        ["src", "title", "epname", "singer", "coverImgUrl", "startTime", "webUrl"].indexOf(e) > -1 && a(e, t)
                    }
                })
            });
            var b = {},
                m = function() {
                    return y
                };
            t.getBackgroundAudioManager = m
        }, function(e, t, n) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.onBackgroundAudioStop = t.onBackgroundAudioPause = t.onBackgroundAudioPlay = t.stopBackgroundAudio = t.seekBackgroundAudio = t.pauseBackgroundAudio = t.playBackgroundAudio = t.getBackgroundAudioPlayerState = void 0;
            var r = n(1),
                i = n(2),
                a = n(8),
                c = o(a),
                u = n(3),
                s = o(u),
                f = (n(4), function(e) {
                    if (!1 === s.default.possessingBackgroundAudioPlayer) {
                        var t = {
                            errMsg: "getBackgroundAudioPlayerState: fail not playing"
                        };
                        "function" == typeof e.fail && e.fail(t), "function" == typeof e.complete && e.complete(t)
                    } else(0, r.invokeMethod)("getMusicPlayerState", e, {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("getMusicPlayerState", "getBackgroundAudioPlayerState")
                        }
                    })
                }),
                l = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, r.invokeMethod)("operateMusicPlayer", (0, i.assign)({
                        operationType: "play"
                    }, e), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio")
                        }
                    })
                },
                d = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, r.invokeMethod)("operateMusicPlayer", (0, i.assign)({
                        operationType: "pause"
                    }, e), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio")
                        }
                    })
                },
                p = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, r.beforeInvoke)("seekBackgroundAudio", e, {
                        position: 1
                    }) && (0, r.invokeMethod)("operateMusicPlayer", (0, i.assign)({
                        operationType: "seek"
                    }, e), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio")
                        }
                    })
                },
                h = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, r.invokeMethod)("operateMusicPlayer", (0, i.assign)({
                        operationType: "stop"
                    }, e), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio")
                        }
                    })
                },
                v = new c.default;
            (0, r.onMethod)("onMusicPlay", function() {
                s.default.possessingBackgroundAudioPlayer = !0, v.emit("onBackgroundAudioPlay")
            });
            var g = function(e) {
                    v.removeAllListeners("onBackgroundAudioPlay"), v.on("onBackgroundAudioPlay", function() {
                        "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.onBackgroundAudioPlay callback function")()
                    })
                },
                y = function(e) {
                    (0, r.onMethod)("onMusicPause", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioPause callback function"))
                },
                b = function(e) {
                    (0, r.onMethod)("onMusicEnd", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioStop callback function"))
                };
            t.getBackgroundAudioPlayerState = f, t.playBackgroundAudio = l, t.pauseBackgroundAudio = d, t.seekBackgroundAudio = p, t.stopBackgroundAudio = h, t.onBackgroundAudioPlay = g, t.onBackgroundAudioPause = y, t.onBackgroundAudioStop = b
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getRecorderManager = void 0;
            var o = n(1),
                r = n(8),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = new i.default,
                c = {
                    8e3: [16e3, 48e3],
                    11025: [16e3, 48e3],
                    12e3: [24e3, 64e3],
                    16e3: [24e3, 96e3],
                    22050: [32e3, 128e3],
                    24e3: [32e3, 128e3],
                    32e3: [48e3, 192e3],
                    44100: [64e3, 32e4],
                    48e3: [64e3, 32e4]
                };
            (0, o.onMethod)("onRecorderStateChange", function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.state;
                delete e.state, a.emit("onRecorderStateChange_" + t, e)
            });
            var u = function(e) {
                    (0, o.invokeMethod)("operateRecorder", Object.assign({}, e))
                },
                s = {
                    start: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            t = Object.assign({
                                format: "aac",
                                sampleRate: 8e3,
                                encodeBitRate: 48e3,
                                numberOfChannels: 2
                            }, e);
                        if (-1 === Object.keys(c).map(function(e) {
                                return parseInt(e)
                            }).indexOf(t.sampleRate)) throw new Error('invalid sampleRate "' + t.sampleRate + '", sampleRate should be one of ' + JSON.stringify(Object.keys(c)));
                        if (t.encodeBitRate > c[t.sampleRate][1] || t.encodeBitRate < c[t.sampleRate][0]) throw new Error('invalid encodeBitRate "' + t.encodeBitRate + '", encodeBitRate should be greater than ' + c[t.sampleRate][0] + " and less than " + c[t.sampleRate][1]);
                        t.operationType = "start", t.fail = function(e) {
                            a.emit("onRecorderStateChange_error", e)
                        }, u(t)
                    },
                    pause: function() {
                        u({
                            operationType: "pause",
                            fail: function(e) {
                                a.emit("onRecorderStateChange_error", e)
                            }
                        })
                    },
                    resume: function() {
                        u({
                            operationType: "resume",
                            success: function() {
                                a.emit("onRecorderStateChange_resume")
                            },
                            fail: function(e) {
                                a.emit("onRecorderStateChange_error", e)
                            }
                        })
                    },
                    stop: function() {
                        u({
                            operationType: "stop",
                            fail: function(e) {
                                a.emit("onRecorderStateChange_error", e)
                            }
                        })
                    },
                    onStart: function(e) {
                        a.removeAllListeners("onRecorderStateChange_start"), a.on("onRecorderStateChange_start", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onPause callback function")()
                        })
                    },
                    onResume: function(e) {
                        a.removeAllListeners("onRecorderStateChange_resume"), a.on("onRecorderStateChange_resume", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onResume callback function")()
                        })
                    },
                    onPause: function(e) {
                        a.removeAllListeners("onRecorderStateChange_pause"), a.on("onRecorderStateChange_pause", function() {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onPause callback function")()
                        })
                    },
                    onStop: function(e) {
                        a.removeAllListeners("onRecorderStateChange_stop"), a.on("onRecorderStateChange_stop", function(t) {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onStop callback function")(t)
                        })
                    },
                    onFrameRecorded: function(e) {
                        a.removeAllListeners("onRecorderStateChange_frameRecorded"), a.on("onRecorderStateChange_frameRecorded", function(t) {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onFrameRecorded callback function")(t)
                        })
                    },
                    onError: function(e) {
                        a.removeAllListeners("onRecorderStateChange_error"), a.on("onRecorderStateChange_error", function(t) {
                            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onError callback function")(t)
                        })
                    }
                };
            t.default = s;
            t.getRecorderManager = function() {
                return s
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.chooseMedia = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("chooseMedia", e)
                };
            t.chooseMedia = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.saveImageToPhotosAlbum = t.getImageInfo = t.previewImage = t.chooseImage = void 0;
            var o = n(1),
                r = n(2),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = n(124),
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("chooseImage", (0, r.assign)({
                        count: 9,
                        sizeType: ["original", "compressed"],
                        sourceType: ["album", "camera"]
                    }, e), {
                        beforeSuccess: function(e) {
                            e.tempFileSizes && (e.tempFiles = e.tempFilePaths.map(function(t, n) {
                                return {
                                    path: t,
                                    size: e.tempFileSizes[n]
                                }
                            })), delete e.tempFileSizes
                        }
                    })
                },
                s = function(e) {
                    (0, o.beforeInvoke)("previewImage", e, {
                        urls: [""]
                    }) && (0, o.invokeMethod)("previewImage", e)
                },
                f = function(e) {
                    (0, o.beforeInvoke)("getImageInfo", e, {
                        src: ""
                    }) && (/^(http|https):\/\//.test(e.src) ? (0, c.downloadFile)({
                        url: e.src,
                        success: function(t) {
                            e.src = t.tempFilePath, (0, o.invokeMethod)("getImageInfo", e, {
                                beforeSuccess: function(t) {
                                    t.path = e.src
                                }
                            })
                        },
                        fail: function(t) {
                            (0, o.beforeInvokeFail)("getImageInfo", e, "download image fail")
                        }
                    }) : /^wxfile:\/\//.test(e.src) ? (0, o.invokeMethod)("getImageInfo", e, {
                        beforeSuccess: function(t) {
                            t.path = e.src
                        }
                    }) : (e.src = (0, r.getRealRoute)(a.default.lastRoute, e.src, !1), (0, o.invokeMethod)("getImageInfo", e, {
                        beforeSuccess: function(t) {
                            t.path = e.src
                        }
                    })))
                },
                l = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("saveImageToPhotosAlbum", e, {})
                };
            t.chooseImage = u, t.previewImage = s, t.getImageInfo = f, t.saveImageToPhotosAlbum = l
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.saveVideoToPhotosAlbum = t.chooseVideo = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], e.compressed = e.compressed || !0, (0, o.invokeMethod)("chooseVideo", e)
                },
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("saveVideoToPhotosAlbum", e, {})
                };
            t.chooseVideo = r, t.saveVideoToPhotosAlbum = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(143);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(144);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(145);
            Object.defineProperty(t, "readFile", {
                enumerable: !0,
                get: function() {
                    return i.readFile
                }
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openDocument = t.removeSavedFile = t.getSavedFileInfo = t.getSavedFileList = t.saveFile = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.beforeInvoke)("saveFile", e, {
                        tempFilePath: ""
                    }) && (0, o.invokeMethod)("saveFile", e)
                },
                i = function(e) {
                    (0, o.beforeInvoke)("openDocument", e, {
                        filePath: ""
                    }) && (0, o.invokeMethod)("openDocument", e)
                },
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getSavedFileList", e)
                },
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("getSavedFileInfo", e, {
                        filePath: ""
                    }) && (0, o.invokeMethod)("getSavedFileInfo", e)
                },
                u = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("removeSavedFile", e, {
                        filePath: ""
                    }) && (0, o.invokeMethod)("removeSavedFile", e)
                };
            t.saveFile = r, t.getSavedFileList = a, t.getSavedFileInfo = c, t.removeSavedFile = u, t.openDocument = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getFileInfo = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("getFileInfo", e, {
                            filePath: ""
                        })) {
                        if (void 0 !== e.digestAlgorithm) {
                            var t = (0, r.paramCheck)(e, {
                                digestAlgorithm: ""
                            });
                            if (t) return void(0, o.beforeInvokeFail)("getFileInfo", e, "parameter error: " + t);
                            if (-1 === ["md5", "sha1"].indexOf(e.digestAlgorithm)) return void(0, o.beforeInvokeFail)("getFileInfo", e, 'parameter error: invalid digestAlgorithm "' + e.digestAlgorithm + '"')
                        }(0, o.invokeMethod)("getFileInfo", e, {})
                    }
                };
            t.getFileInfo = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.readFile = void 0;
            var o = n(1),
                r = (n(2), function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("readFile", e, {
                        beforeSuccess: function(e) {
                            e.buffer && (e.data = e.buffer), e.data instanceof ArrayBuffer && (e.buffer = e.data)
                        }
                    })
                });
            t.readFile = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(147);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.clearStorageSync = t.clearStorage = t.removeStorageSync = t.removeStorage = t.getStorageInfoSync = t.getStorageInfo = t.getStorageSync = t.getStorage = t.setStorageSync = t.setStorage = void 0;
            var o = n(1),
                r = n(2),
                i = function(e) {
                    (0, o.beforeInvoke)("getStorage", e, {
                        key: ""
                    }) && (0, o.invokeMethod)("getStorage", e, {
                        beforeSuccess: function(e) {
                            e.data = (0, r.stringToAnyType)(e.data, e.dataType), delete e.dataType
                        },
                        afterFail: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            if (e.errMsg && e.errMsg.indexOf("data not found") > 0) return !1
                        }
                    })
                },
                a = function(e) {
                    if ((0, o.beforeInvoke)("getStorageSync", e, "")) {
                        var t = "ios" === (0, r.getPlatform)() ? "getStorage" : "getStorageSync",
                            n = void 0;
                        return (0, o.invokeMethod)(t, {
                            key: e
                        }, {
                            beforeAll: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                n = (0, r.stringToAnyType)(e.data, e.dataType)
                            },
                            afterFail: function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                if (e.errMsg && e.errMsg.indexOf("data not found") > 0) return !1
                            }
                        }), n
                    }
                },
                c = function(e) {
                    if ((0, o.beforeInvoke)("setStorage", e, {
                            key: ""
                        })) try {
                        var t = (0, r.anyTypeToString)(e.data),
                            n = t.data,
                            i = t.dataType;
                        (0, o.invokeMethod)("setStorage", {
                            key: e.key,
                            data: n,
                            dataType: i,
                            success: e.success,
                            fail: e.fail,
                            complete: e.complete
                        })
                    } catch (t) {
                        "function" == typeof e.fail && e.fail({
                            errMsg: "setStorage:fail " + t.message
                        }), "function" == typeof e.complete && e.complete({
                            errMsg: "setStorage:fail " + t.message
                        })
                    }
                },
                u = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    if ((0, o.beforeInvoke)("setStorage", e, "")) {
                        var n = "ios" === (0, r.getPlatform)() ? "setStorage" : "setStorageSync",
                            i = (0, r.anyTypeToString)(t),
                            a = i.data,
                            c = i.dataType,
                            u = !1,
                            s = "";
                        if ((0, o.invokeMethod)(n, {
                                key: e,
                                data: a,
                                dataType: c,
                                fail: function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    u = !0, s = e.errMsg.replace("setStorage:", "setStorageSync:")
                                }
                            }), u) throw new r.AppServiceSdkKnownError(s)
                    }
                },
                s = function(e) {
                    (0, o.beforeInvoke)("removeStorage", e, {
                        key: ""
                    }) && (0, o.invokeMethod)("removeStorage", e)
                },
                f = function(e) {
                    (0, o.beforeInvoke)("removeStorageSync", e, "") && (0, o.invokeMethod)("removeStorageSync", {
                        key: e
                    })
                },
                l = function(e) {
                    (0, o.invokeMethod)("clearStorage", e)
                },
                d = function() {
                    var e = "ios" === (0, r.getPlatform)() ? "clearStorage" : "clearStorageSync";
                    (0, o.invokeMethod)(e)
                },
                p = function(e) {
                    (0, o.invokeMethod)("getStorageInfo", e)
                },
                h = function() {
                    var e = void 0;
                    return (0, o.invokeMethod)("getStorageInfoSync", {}, {
                        beforeAll: function(t) {
                            e = t, delete t.errMsg
                        }
                    }), e
                };
            t.setStorage = c, t.setStorageSync = u, t.getStorage = i, t.getStorageSync = a, t.getStorageInfo = p, t.getStorageInfoSync = h, t.removeStorage = s, t.removeStorageSync = f, t.clearStorage = l, t.clearStorageSync = d
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(149);
            Object.defineProperty(t, "canIUse", {
                enumerable: !0,
                get: function() {
                    return o.canIUse
                }
            })
        }, function(e, t, n) {
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function r(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.canIUse = void 0;
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                a = n(150),
                c = o(a),
                u = n(151),
                s = o(u),
                f = n(2),
                l = n(57),
                d = o(l),
                p = (Object.keys(c.default), Object.keys(s.default), function(e, t, n) {
                    if (!t) return [];
                    var o = Object.keys(n),
                        r = o.indexOf(t);
                    if (-1 === r) return [];
                    var i = n[o[r]];
                    return Object.keys(i).filter(function(t) {
                        return (0, f.compareVersion)(t, e) <= 0
                    })
                }),
                h = function(e, t, n) {
                    for (var o = void 0, r = 0; r < e.length; r++)
                        for (var a = t[e[r]], c = 0; c < a.length; c++) {
                            var u = a[c];
                            if ("string" == typeof u && u === n) {
                                void 0 === o && (o = []);
                                break
                            }
                            if ("object" === (void 0 === u ? "undefined" : i(u)) && u.hasOwnProperty(n)) {
                                o = void 0 === o ? u[n] : o.concat(u[n]);
                                break
                            }
                        }
                    return o
                },
                v = function(e, t) {
                    for (var n = 0; n < e.length; n++) {
                        if ("string" == typeof e[n] && e[n] === t) return [];
                        if ("object" === i(e[n]) && e[n].hasOwnProperty(t)) return e[n][t]
                    }
                },
                g = function(e, t, n) {
                    return h(e, t, n)
                },
                y = function(e, t, n) {
                    return h(e, t, n)
                },
                b = function(e, t, n, o) {
                    var r = void 0,
                        i = void 0;
                    if (r = p(e, t, c.default), 0 === r.length) return !1;
                    if (n) {
                        var a = c.default[t];
                        if (void 0 === (i = g(r, a, n))) return !1
                    }
                    return !o || void 0 !== v(i, o)
                },
                m = function(e, t, n, o, r) {
                    var i = void 0,
                        a = void 0,
                        c = void 0;
                    if (i = p(e, t, s.default), 0 === i.length) return !1;
                    if (n) {
                        var u = s.default[t];
                        if (void 0 === (a = y(i, u, n))) return !1
                    }
                    return (!o || void 0 !== (c = v(a, o))) && (!r || void 0 !== v(c, r))
                },
                _ = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d.default.SDKVersion;
                    if ("string" != typeof e) throw new f.AppServiceSdkKnownError("canIUse: schema should be an object");
                    var n = e.split(".");
                    return !!b.apply(void 0, [t].concat(r(n))) || !!m.apply(void 0, [t].concat(r(n)))
                };
            t.canIUse = _
        }, function(e, t) {
            e.exports = {
                audio: {
                    "1.0.0": ["id", "src", "loop", "controls", "poster", "name", "author", "binderror", "bindplay", "bindpause", "bindtimeupdate", "bindended"]
                },
                button: {
                    "1.0.0": [{
                        size: ["default", "mini"]
                    }, {
                        type: ["primary", "default", "warn"]
                    }, "plain", "disabled", "loading", {
                        "form-type": ["submit", "reset"]
                    }, "hover-class", "hover-start-time", "hover-stay-time"],
                    "1.1.0": [{
                        "open-type": ["contact"]
                    }],
                    "1.2.0": [{
                        "open-type": ["share", "getPhoneNumber"]
                    }, "bindgetphonenumber"],
                    "1.3.0": [{
                        "open-type": ["getUserInfo"]
                    }],
                    "1.5.0": ["hover-stop-propagation", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "bindcontact"],
                    "1.4.0": ["session-from"]
                },
                camera: {
                    "1.6.0": ["device-position", "flash", "bindstop", "binderror"]
                },
                canvas: {
                    "1.0.0": ["canvas-id", "disable-scroll", "bindtouchstart", "bindtouchmove", "bindtouchend", "bindtouchcancel", "bindlongtap", "binderror"]
                },
                "checkbox-group": {
                    "1.0.0": ["bindchange"]
                },
                checkbox: {
                    "1.0.0": ["value", "disabled", "checked", "color"]
                },
                "contact-button": {
                    "1.0.0": ["size", {
                        type: ["default-dark", "default-light"]
                    }, "session-from"]
                },
                "cover-view": {
                    "1.4.0": []
                },
                "cover-image": {
                    "1.4.0": ["src"]
                },
                form: {
                    "1.0.0": ["report-submit", "bindsubmit", "bindreset"],
                    "1.2.0": ["bindautofill"]
                },
                icon: {
                    "1.0.0": [{
                        type: ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
                    }, "size", "color"]
                },
                image: {
                    "1.0.0": ["src", {
                        mode: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"]
                    }, "binderror", "bindload"],
                    "1.5.0": ["lazy-load"]
                },
                input: {
                    "1.0.0": ["value", {
                        type: ["text", "number", "idcard", "digit"]
                    }, "password", "placeholder", "placeholder-style", "placeholder-class", "disabled", "maxlength", "cursor-spacing", "auto-focus", "focus", "bindinput", "bindfocus", "bindblur", "bindconfirm"],
                    "1.1.0": [{
                        "confirm-type": ["send", "search", "next", "go", "done"]
                    }, "confirm-hold"],
                    "1.5.0": ["cursor"],
                    "1.2.0": ["auto-fill"]
                },
                label: {
                    "1.0.0": ["for"]
                },
                map: {
                    "1.0.0": ["longitude", "latitude", "scale", {
                        markers: ["id", "latitude", "longitude", "title", "iconPath", "rotate", "alpha", "width", "height"]
                    }, "covers", {
                        polyline: ["points", "color", "width", "dottedLine"]
                    }, {
                        circles: ["latitude", "longitude", "color", "fillColor", "radius", "strokeWidth"]
                    }, {
                        controls: ["id", "position", "iconPath", "clickable"]
                    }, "include-points", "show-location", "bindmarkertap", "bindcontroltap", "bindregionchange", "bindtap"],
                    "1.2.0": [{
                        markers: ["callout", "label", "anchor"]
                    }, {
                        polyline: ["arrowLine", "borderColor", "borderWidth"]
                    }, "bindcallouttap"],
                    "1.6.0": [{
                        polyline: ["arrowIconPath"]
                    }, "bindupdated"]
                },
                modal: {
                    "1.0.0": []
                },
                "movable-area": {
                    "1.2.0": []
                },
                "movable-view": {
                    "1.2.0": ["direction", "inertia", "out-of-bounds", "x", "y", "damping", "friction"]
                },
                navigator: {
                    "1.0.0": ["url", {
                        "open-type": ["navigate", "redirect", "switchTab"]
                    }, "delta", "hover-class", "hover-start-time", "hover-stay-time"],
                    "1.1.0": [{
                        "open-type": ["reLaunch", "navigateBack"]
                    }],
                    "1.5.0": ["hover-stop-propagation"]
                },
                "open-data": {
                    "1.4.0": [{
                        type: ["groupName"]
                    }, "open-gid"]
                },
                "picker-view": {
                    "1.0.0": ["value", "indicator-style", "bindchange"],
                    "1.1.0": ["indicator-class"],
                    "1.5.0": ["mask-style", "mask-class"]
                },
                "picker-view-column": {
                    "1.0.0": []
                },
                picker: {
                    "1.0.0": ["range", "range-key", "value", "bindchange", "disabled", "bindcolumnchange", "start", "end", {
                        fields: ["year", "month", "day"]
                    }, {
                        mode: ["selector", "date", "time"]
                    }],
                    "1.2.0": ["auto-fill"],
                    "1.4.0": ["bindcolumnchange", {
                        mode: ["multiSelector", "region"]
                    }],
                    "1.5.0": ["custom-item"]
                },
                progress: {
                    "1.0.0": ["percent", "show-info", "stroke-width", "color", "activeColor", "backgroundColor", "active"]
                },
                "radio-group": {
                    "1.0.0": ["bindchange"]
                },
                radio: {
                    "1.0.0": ["value", "checked", "disabled", "color"]
                },
                "rich-text": {
                    "1.4.0": [{
                        nodes: ["name", "attrs", "children"]
                    }]
                },
                "scroll-view": {
                    "1.0.0": ["scroll-x", "scroll-y", "upper-threshold", "lower-threshold", "scroll-top", "scroll-left", "scroll-into-view", "scroll-with-animation", "enable-back-to-top", "bindscrolltoupper", "bindscrolltolower", "bindscroll"]
                },
                slider: {
                    "1.0.0": ["min", "max", "step", "disabled", "value", "color", "selected-color", "activeColor", "backgroundColor", "show-value", "bindchange"]
                },
                swiper: {
                    "1.0.0": ["indicator-dots", "autoplay", "current", "interval", "duration", "circular", "vertical", "bindchange"],
                    "1.1.0": ["indicator-color", "indicator-active-color"]
                },
                "swiper-item": {
                    "1.0.0": []
                },
                switch: {
                    "1.0.0": ["checked", {
                        type: ["switch", "checkbox"]
                    }, "bindchange", "color"]
                },
                text: {
                    "1.0.0": [],
                    "1.1.0": ["selectable"],
                    "1.4.0": [{
                        space: ["ensp", "emsp", "nbsp"]
                    }, "decode"]
                },
                textarea: {
                    "1.0.0": ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "maxlength", "auto-focus", "focus", "auto-height", "fixed", "cursor-spacing", "bindfocus", "bindblur", "bindlinechange", "bindinput", "bindconfirm"],
                    "1.5.0": ["cursor"],
                    "1.6.0": ["show-confirm-bar"],
                    "1.2.0": ["auto-fill"]
                },
                video: {
                    "1.0.0": ["src", "controls", "danmu-list", "danmu-btn", "enable-danmu", "autoplay", "bindplay", "bindpause", "bindended", "bindtimeupdate", "objectFit", "poster"],
                    "1.6.0": ["initial-time", "page-gesture"],
                    "1.1.0": ["duration"],
                    "1.4.0": ["loop", "muted", "bindfullscreenchange"]
                },
                view: {
                    "1.0.0": ["hover-class", "hover-start-time", "hover-stay-time"],
                    "1.5.0": ["hover-stop-propagation"]
                }
            }
        }, function(e, t) {
            e.exports = {
                onAccelerometerChange: {
                    "1.0.0": [{
                        callback: ["x", "y", "z"]
                    }]
                },
                startAccelerometer: {
                    "1.1.0": []
                },
                stopAccelerometer: {
                    "1.1.0": []
                },
                chooseAddress: {
                    "1.1.0": [{
                        success: ["userName", "postalCode", "provinceName", "cityName", "countyName", "detailInfo", "nationalCode", "telNumber"]
                    }]
                },
                createAnimation: {
                    "1.0.0": [{
                        object: ["duration", {
                            timingFunction: ["linear", "ease", "ease-in", "ease-in-out", "ease-out", "step-start", "step-end"]
                        }, "delay", "transformOrigin"]
                    }]
                },
                createAudioContext: {
                    "1.0.0": []
                },
                createCameraContext: {
                    "1.6.0": []
                },
                canIUse: {
                    "1.0.0": []
                },
                login: {
                    "1.0.0": [{
                        success: ["code"]
                    }]
                },
                checkSession: {
                    "1.0.0": []
                },
                createMapContext: {
                    "1.0.0": []
                },
                requestPayment: {
                    "1.0.0": [{
                        object: ["timeStamp", "nonceStr", "package", "signType", "paySign"]
                    }]
                },
                showToast: {
                    "1.0.0": [{
                        object: ["title", "icon", "duration", "mask"]
                    }],
                    "1.1.0": [{
                        object: ["image"]
                    }]
                },
                showLoading: {
                    "1.1.0": [{
                        object: ["title", "mask"]
                    }]
                },
                hideToast: {
                    "1.0.0": []
                },
                hideLoading: {
                    "1.1.0": []
                },
                showModal: {
                    "1.0.0": [{
                        object: ["title", "content", "showCancel", "cancelText", "cancelColor", "confirmText", "confirmColor"]
                    }, {
                        success: ["confirm"]
                    }],
                    "1.1.0": [{
                        success: ["cancel"]
                    }]
                },
                showActionSheet: {
                    "1.0.0": [{
                        object: ["itemList", "itemColor"]
                    }, {
                        success: ["tapIndex"]
                    }]
                },
                arrayBufferToBase64: {
                    "1.1.0": []
                },
                base64ToArrayBuffer: {
                    "1.1.0": []
                },
                createVideoContext: {
                    "1.0.0": []
                },
                authorize: {
                    "1.2.0": [{
                        object: ["scope"]
                    }]
                },
                openBluetoothAdapter: {
                    "1.1.0": []
                },
                closeBluetoothAdapter: {
                    "1.1.0": []
                },
                getBluetoothAdapterState: {
                    "1.1.0": [{
                        success: ["discovering", "available"]
                    }]
                },
                onBluetoothAdapterStateChange: {
                    "1.1.0": [{
                        callback: ["available", "discovering"]
                    }]
                },
                startBluetoothDevicesDiscovery: {
                    "1.1.0": [{
                        object: ["services", "allowDuplicatesKey", "interval"]
                    }, {
                        success: ["isDiscovering"]
                    }]
                },
                stopBluetoothDevicesDiscovery: {
                    "1.1.0": []
                },
                getBluetoothDevices: {
                    "1.1.0": [{
                        success: ["devices"]
                    }]
                },
                onBluetoothDeviceFound: {
                    "1.1.0": [{
                        callback: ["devices"]
                    }]
                },
                getConnectedBluetoothDevices: {
                    "1.1.0": [{
                        object: ["services"]
                    }, {
                        success: ["devices"]
                    }]
                },
                createBLEConnection: {
                    "1.1.0": [{
                        object: ["deviceId"]
                    }]
                },
                closeBLEConnection: {
                    "1.1.0": [{
                        object: ["deviceId"]
                    }]
                },
                getBLEDeviceServices: {
                    "1.1.0": [{
                        object: ["deviceId"]
                    }, {
                        success: ["services"]
                    }]
                },
                getBLEDeviceCharacteristics: {
                    "1.1.0": [{
                        object: ["deviceId", "serviceId"]
                    }, {
                        success: ["characteristics"]
                    }]
                },
                readBLECharacteristicValue: {
                    "1.1.0": [{
                        object: ["deviceId", "serviceId", "characteristicId"]
                    }, {
                        success: ["characteristic"]
                    }]
                },
                writeBLECharacteristicValue: {
                    "1.1.0": [{
                        object: ["deviceId", "serviceId", "characteristicId", "value"]
                    }]
                },
                notifyBLECharacteristicValueChange: {
                    "1.1.1": [{
                        object: ["deviceId", "serviceId", "characteristicId", "state"]
                    }]
                },
                onBLEConnectionStateChange: {
                    "1.1.1": [{
                        callback: ["deviceId", "connected"]
                    }]
                },
                onBLECharacteristicValueChange: {
                    "1.1.0": [{
                        callback: ["deviceId", "serviceId", "characteristicId", "value"]
                    }]
                },
                addCard: {
                    "1.1.0": [{
                        object: ["cardList"]
                    }, {
                        success: ["cardList"]
                    }]
                },
                openCard: {
                    "1.1.0": [{
                        object: ["cardList"]
                    }]
                },
                checkIsSoterEnrolledInDevice: {
                    "1.6.0": [{
                        object: ["checkAuthMode"]
                    }, {
                        success: ["isEnrolled"]
                    }]
                },
                checkIsSupportSoterAuthentication: {
                    "1.5.0": [{
                        success: [{
                            supportMode: ["fingerPrint", "facial", "speech"]
                        }]
                    }]
                },
                chooseInvoiceTitle: {
                    "1.5.0": [{
                        success: ["type", "title", "taxNumber", "companyAddress", "telephone", "bankName", "bankAccount"]
                    }]
                },
                setClipboardData: {
                    "1.1.0": [{
                        object: ["data"]
                    }]
                },
                getClipboardData: {
                    "1.1.0": [{
                        success: ["data"]
                    }]
                },
                onCompassChange: {
                    "1.0.0": [{
                        callback: ["direction"]
                    }]
                },
                startCompass: {
                    "1.1.0": []
                },
                stopCompass: {
                    "1.1.0": []
                },
                createInnerAudioContext: {
                    "1.6.0": []
                },
                setStorage: {
                    "1.0.0": [{
                        object: ["key", "data"]
                    }]
                },
                getStorage: {
                    "1.0.0": [{
                        object: ["key"]
                    }, {
                        success: ["data"]
                    }]
                },
                getStorageSync: {
                    "1.0.0": []
                },
                getStorageInfo: {
                    "1.0.0": [{
                        success: ["keys", "currentSize", "limitSize"]
                    }]
                },
                removeStorage: {
                    "1.0.0": [{
                        object: ["key"]
                    }]
                },
                removeStorageSync: {
                    "1.0.0": []
                },
                clearStorage: {
                    "1.0.0": []
                },
                clearStorageSync: {
                    "1.0.0": []
                },
                getOpenDeviceId: {
                    "1.5.0": [{
                        success: ["encryptedData", "iv"]
                    }]
                },
                getNetworkType: {
                    "1.0.0": [{
                        success: ["networkType"]
                    }]
                },
                onNetworkStatusChange: {
                    "1.1.0": [{
                        callback: ["isConnected", {
                            networkType: ["wifi", "2g", "3g", "4g", "none", "unknown"]
                        }]
                    }]
                },
                setScreenBrightness: {
                    "1.2.0": [{
                        object: ["value"]
                    }]
                },
                getScreenBrightness: {
                    "1.2.0": [{
                        success: ["value"]
                    }]
                },
                vibrateLong: {
                    "1.2.0": []
                },
                vibrateShort: {
                    "1.2.0": []
                },
                getExtConfig: {
                    "1.1.0": [{
                        success: ["extConfig"]
                    }]
                },
                getExtConfigSync: {
                    "1.1.0": []
                },
                saveFile: {
                    "1.0.0": [{
                        object: ["tempFilePath"]
                    }, {
                        success: ["savedFilePath"]
                    }]
                },
                getSavedFileList: {
                    "1.0.0": [{
                        success: ["fileList"]
                    }]
                },
                getSavedFileInfo: {
                    "1.0.0": [{
                        object: ["filePath"]
                    }, {
                        success: ["size", "createTime"]
                    }]
                },
                removeSavedFile: {
                    "1.0.0": [{
                        object: ["filePath"]
                    }]
                },
                openDocument: {
                    "1.0.0": [{
                        object: ["filePath"]
                    }],
                    "1.4.0": [{
                        object: ["fileType"]
                    }]
                },
                getBackgroundAudioManager: {
                    "1.2.0": []
                },
                getFileInfo: {
                    "1.4.0": [{
                        object: ["filePath", {
                            digestAlgorithm: ["md5", "sha1"]
                        }]
                    }, {
                        success: ["size", "digest"]
                    }]
                },
                getRecorderManager: {
                    "1.6.0": []
                },
                startBeaconDiscovery: {
                    "1.2.0": [{
                        object: ["uuids"]
                    }]
                },
                stopBeaconDiscovery: {
                    "1.2.0": []
                },
                getBeacons: {
                    "1.2.0": [{
                        success: ["beacons"]
                    }]
                },
                onBeaconUpdate: {
                    "1.2.0": [{
                        callback: ["beacons"]
                    }]
                },
                onBeaconServiceChange: {
                    "1.2.0": [{
                        callback: ["available", "discovering"]
                    }]
                },
                getLocation: {
                    "1.0.0": [{
                        object: ["type"]
                    }, {
                        success: ["latitude", "longitude", "speed", "accuracy"]
                    }],
                    "1.2.0": [{
                        success: ["altitude", "verticalAccuracy", "horizontalAccuracy"]
                    }]
                },
                chooseLocation: {
                    "1.0.0": [{
                        object: ["cancel"]
                    }, {
                        success: ["name", "address", "latitude", "longitude"]
                    }]
                },
                openLocation: {
                    "1.0.0": [{
                        object: ["latitude", "longitude", "scale", "name", "address"]
                    }]
                },
                getBackgroundAudioPlayerState: {
                    "1.0.0": [{
                        success: ["duration", "currentPosition", "status", "downloadPercent", "dataUrl"]
                    }]
                },
                playBackgroundAudio: {
                    "1.0.0": [{
                        object: ["dataUrl", "title", "coverImgUrl"]
                    }]
                },
                pauseBackgroundAudio: {
                    "1.0.0": []
                },
                seekBackgroundAudio: {
                    "1.0.0": [{
                        object: ["position"]
                    }]
                },
                stopBackgroundAudio: {
                    "1.0.0": []
                },
                onBackgroundAudioPlay: {
                    "1.0.0": []
                },
                onBackgroundAudioPause: {
                    "1.0.0": []
                },
                onBackgroundAudioStop: {
                    "1.0.0": []
                },
                chooseImage: {
                    "1.0.0": [{
                        object: ["count", "sizeType", "sourceType"]
                    }, {
                        success: ["tempFilePaths"]
                    }],
                    "1.2.0": [{
                        success: ["tempFiles"]
                    }]
                },
                previewImage: {
                    "1.0.0": [{
                        object: ["current", "urls"]
                    }]
                },
                getImageInfo: {
                    "1.0.0": [{
                        object: ["src"]
                    }, {
                        success: ["width", "height", "path"]
                    }]
                },
                saveImageToPhotosAlbum: {
                    "1.2.0": [{
                        object: ["filePath"]
                    }]
                },
                startRecord: {
                    "1.0.0": [{
                        success: ["tempFilePath"]
                    }]
                },
                stopRecord: {
                    "1.0.0": []
                },
                chooseVideo: {
                    "1.0.0": [{
                        object: ["sourceType", "maxDuration", "camera"]
                    }, {
                        success: ["tempFilePath", "duration", "size", "height", "width"]
                    }],
                    "1.6.0": [{
                        object: ["compressed"]
                    }]
                },
                saveVideoToPhotosAlbum: {
                    "1.2.0": [{
                        object: ["filePath"]
                    }]
                },
                playVoice: {
                    "1.0.0": [{
                        object: ["filePath"]
                    }]
                },
                pauseVoice: {
                    "1.0.0": []
                },
                stopVoice: {
                    "1.0.0": []
                },
                navigateBackMiniProgram: {
                    "1.3.0": [{
                        object: ["extraData"]
                    }]
                },
                navigateToMiniProgram: {
                    "1.3.0": [{
                        object: ["appId", "path", "extraData", "envVersion"]
                    }]
                },
                uploadFile: {
                    "1.0.0": [{
                        object: ["url", "filePath", "name", "header", "formData"]
                    }, {
                        success: ["data", "statusCode"]
                    }]
                },
                downloadFile: {
                    "1.0.0": [{
                        object: ["url", "header"]
                    }]
                },
                request: {
                    "1.0.0": [{
                        object: ["url", "data", "header", {
                            method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]
                        }, "dataType"]
                    }, {
                        success: ["data", "statusCode"]
                    }],
                    "1.2.0": [{
                        success: ["header"]
                    }]
                },
                connectSocket: {
                    "1.0.0": [{
                        object: ["url", "data", "header", {
                            method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]
                        }]
                    }],
                    "1.4.0": [{
                        object: ["protocols"]
                    }]
                },
                onSocketOpen: {
                    "1.0.0": []
                },
                onSocketError: {
                    "1.0.0": []
                },
                sendSocketMessage: {
                    "1.0.0": [{
                        object: ["data"]
                    }]
                },
                onSocketMessage: {
                    "1.0.0": [{
                        callback: ["data"]
                    }]
                },
                closeSocket: {
                    "1.0.0": [],
                    "1.4.0": [{
                        object: ["code", "reason"]
                    }]
                },
                onSocketClose: {
                    "1.0.0": []
                },
                onUserCaptureScreen: {
                    "1.4.0": []
                },
                chooseContact: {
                    "1.0.0": [{
                        success: ["phoneNumber", "displayName"]
                    }]
                },
                getUserInfo: {
                    "1.0.0": [{
                        success: ["userInfo", "rawData", "signature", "encryptedData", "iv"]
                    }],
                    "1.1.0": [{
                        object: ["withCredentials"]
                    }],
                    "1.3.0": [{
                        object: ["lang"]
                    }]
                },
                addPhoneContact: {
                    "1.2.0": [{
                        object: ["photoFilePath", "nickName", "lastName", "middleName", "firstName", "remark", "mobilePhoneNumber", "weChatNumber", "addressCountry", "addressState", "addressCity", "addressStreet", "addressPostalCode", "organization", "title", "workFaxNumber", "workPhoneNumber", "hostNumber", "email", "url", "workAddressCountry", "workAddressState", "workAddressCity", "workAddressStreet", "workAddressPostalCode", "homeFaxNumber", "homePhoneNumber", "homeAddressCountry", "homeAddressState", "homeAddressCity", "homeAddressStreet", "homeAddressPostalCode"]
                    }]
                },
                makePhoneCall: {
                    "1.0.0": [{
                        object: ["phoneNumber"]
                    }]
                },
                startPullDownRefresh: {
                    "1.5.0": []
                },
                stopPullDownRefresh: {
                    "1.0.0": []
                },
                scanCode: {
                    "1.0.0": [{
                        success: ["result", "scanType", "charSet", "path"]
                    }],
                    "1.2.0": [{
                        object: ["onlyFromCamera"]
                    }]
                },
                pageScrollTo: {
                    "1.4.0": [{
                        object: ["scrollTop"]
                    }]
                },
                setEnableDebug: {
                    "1.4.0": [{
                        object: ["enableDebug"]
                    }]
                },
                setKeepScreenOn: {
                    "1.4.0": [{
                        object: ["keepScreenOn"]
                    }]
                },
                setNavigationBarColor: {
                    "1.4.0": [{
                        object: ["frontColor", "backgroundColor", "animation", "animation.duration", {
                            "animation.timingFunc": ["linear", "easeIn", "easeOut", "easeInOut"]
                        }]
                    }]
                },
                openSetting: {
                    "1.1.0": [{
                        success: ["authSetting"]
                    }]
                },
                getSetting: {
                    "1.2.0": [{
                        success: ["authSetting"]
                    }]
                },
                showShareMenu: {
                    "1.1.0": [{
                        object: ["withShareTicket"]
                    }]
                },
                hideShareMenu: {
                    "1.1.0": []
                },
                updateShareMenu: {
                    "1.2.0": [{
                        object: ["withShareTicket"]
                    }],
                    "1.4.0": [{
                        object: ["dynamic", "widget"]
                    }]
                },
                getShareInfo: {
                    "1.1.0": [{
                        object: ["shareTicket"]
                    }, {
                        callback: ["encryptedData", "iv"]
                    }]
                },
                startSoterAuthentication: {
                    "1.5.0": [{
                        object: ["requestAuthModes", "challenge", "authContent"]
                    }, {
                        success: ["errCode", "authMode", "resultJSON", "resultJSONSignature"]
                    }]
                },
                getSystemInfo: {
                    "1.0.0": [{
                        success: ["model", "pixelRatio", "windowWidth", "windowHeight", "language", "version", "system", "platform"]
                    }],
                    "1.5.0": [{
                        success: ["brand", "fontSizeSetting"]
                    }],
                    "1.1.0": [{
                        success: ["screenWidth", "screenHeight", "SDKVersion"]
                    }]
                },
                getSystemInfoSync: {
                    "1.0.0": [{
                        return: ["model", "pixelRatio", "windowWidth", "windowHeight", "language", "version", "system", "platform"]
                    }],
                    "1.5.0": [{
                        return: ["brand", "fontSizeSetting"]
                    }],
                    "1.1.0": [{
                        return: ["screenWidth", "screenHeight", "SDKVersion"]
                    }]
                },
                navigateTo: {
                    "1.0.0": [{
                        object: ["url"]
                    }]
                },
                redirectTo: {
                    "1.0.0": [{
                        object: ["url"]
                    }]
                },
                reLaunch: {
                    "1.1.0": [{
                        object: ["url"]
                    }]
                },
                switchTab: {
                    "1.0.0": [{
                        object: ["url"]
                    }]
                },
                navigateBack: {
                    "1.0.0": [{
                        object: ["delta"]
                    }]
                },
                setTopBarText: {
                    "1.4.3": [{
                        object: ["text"]
                    }]
                },
                setNavigationBarTitle: {
                    "1.0.0": [{
                        object: ["title"]
                    }]
                },
                showNavigationBarLoading: {
                    "1.0.0": []
                },
                hideNavigationBarLoading: {
                    "1.0.0": []
                },
                getWeRunData: {
                    "1.2.0": [{
                        success: ["encryptedData", "iv"]
                    }]
                },
                createSelectorQuery: {
                    "1.4.0": []
                },
                makeVoIPCall: {
                    "1.5.0": [{
                        object: ["allowBackCamera", "showOther", "avatarUrl", "context"]
                    }]
                },
                createCanvasContext: {
                    "1.0.0": []
                },
                canvasToTempFilePath: {
                    "1.0.0": [{
                        object: ["canvasId"]
                    }],
                    "1.2.0": [{
                        object: ["x", "y", "width", "height", "destWidth", "destHeight"]
                    }]
                },
                canvasContext: {
                    "1.0.0": ["addColorStop", "arc", "beginPath", "bezierCurveTo", "clearActions", "clearRect", "closePath", "createCircularGradient", "createLinearGradient", "drawImage", "draw", "fillRect", "fillText", "fill", "lineTo", "moveTo", "quadraticCurveTo", "rect", "rotate", "save", "scale", "setFillStyle", "setFontSize", "setGlobalAlpha", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit", "setShadow", "setStrokeStyle", "strokeRect", "stroke", "translate"],
                    "1.6.0": ["clip", "setLineDash"],
                    "1.1.0": ["setTextAlign"],
                    "1.4.0": ["setTextBaseline"]
                },
                animation: {
                    "1.0.0": ["opacity", "backgroundColor", "width", "height", "top", "left", "bottom", "right", "rotate", "rotateX", "rotateY", "rotateZ", "rotate3d", "scale", "scaleX", "scaleY", "scaleZ", "scale3d", "translate", "translateX", "translateY", "translateZ", "translate3d", "skew", "skewX", "skewY", "matrix", "matrix3d"]
                },
                audioContext: {
                    "1.0.0": ["setSrc", "play", "pause", "seek"]
                },
                cameraContext: {
                    "1.6.0": ["takePhoto", "startRecord", "stopRecord"]
                },
                mapContext: {
                    "1.0.0": ["getCenterLocation", "moveToLocation"],
                    "1.2.0": ["translateMarker", "includePoints"],
                    "1.4.0": ["getRegion", "getScale"]
                },
                videoContext: {
                    "1.0.0": ["play", "pause", "seek", "sendDanmu"],
                    "1.4.0": ["playbackRate", "requestFullScreen", "exitFullScreen"]
                },
                innerAudioContext: {
                    "1.6.0": ["play", "pause", "stop", "seek", "destroy", "onCanplay", "onPlay", "onPause", "onStop", "onEnded", "onTimeUpdate", "onError", "onWaiting", "onSeeking", "onSeeked", "src", "startTime", "autoplay", "loop", "obeyMuteSwitch", "duration", "currentTime", "paused", "buffered"]
                },
                backgroundAudioManager: {
                    "1.2.0": ["play", "pause", "stop", "seek", "onCanplay", "onPlay", "onPause", "onStop", "onEnded", "onTimeUpdate", "onPrev", "onNext", "onError", "onWaiting", "duration", "currentTime", "paused", "src", "startTime", "buffered", "title", "epname", "singer", "coverImgUrl", "webUrl"]
                },
                recorderManager: {
                    "1.6.0": ["start", "pause", "resume", "stop", "onStart", "onPause", "onStop", "onFrameRecorded", "onError"]
                },
                uploadTask: {
                    "1.4.0": ["onProgressUpdate", "abort"]
                },
                downloadTask: {
                    "1.4.0": ["onProgressUpdate", "abort"]
                },
                requestTask: {
                    "1.4.0": ["abort"]
                },
                selectorQuery: {
                    "1.4.0": ["select", "selectAll", "selectViewport", "exec"]
                },
                onBLEConnectionStateChanged: {
                    "1.1.0": [{
                        callback: ["deviceId", "connected"]
                    }]
                },
                notifyBLECharacteristicValueChanged: {
                    "1.1.0": [{
                        object: ["deviceId", "serviceId", "characteristicId", "state"]
                    }]
                },
                sendBizRedPacket: {
                    "1.2.0": [{
                        object: ["timeStamp", "nonceStr", "package", "signType", "paySign"]
                    }]
                },
                captureScreen: {
                    "1.4.0": [{
                        success: ["tempFilePath"]
                    }]
                }
            }
        }, function(e, t, n) {
            function o(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.facialRecognition = t.redPacket = t.soter = t.card = t.share = t.payment = void 0;
            var r = n(153);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(154);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(155);
            Object.keys(a).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return a[e]
                    }
                })
            });
            var c = n(156);
            Object.keys(c).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return c[e]
                    }
                })
            });
            var u = n(157);
            Object.keys(u).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return u[e]
                    }
                })
            });
            var s = n(160);
            Object.keys(s).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return s[e]
                    }
                })
            });
            var f = n(161);
            Object.keys(f).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return f[e]
                    }
                })
            });
            var l = n(162);
            Object.keys(l).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return l[e]
                    }
                })
            });
            var d = n(163);
            Object.keys(d).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return d[e]
                    }
                })
            });
            var p = n(164),
                h = o(p),
                v = n(165),
                g = o(v),
                y = n(170),
                b = o(y),
                m = n(171),
                _ = o(m),
                k = n(175),
                w = o(k),
                S = n(179),
                M = o(S);
            t.payment = h, t.share = g, t.card = b, t.soter = _, t.redPacket = w, t.facialRecognition = M
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.checkSession = t.login = void 0;
            var o = n(1),
                r = void 0,
                i = function(e) {
                    (0, o.invokeMethod)("login", e)
                },
                a = function(e) {
                    r && clearTimeout(r), (0, o.invokeMethod)("refreshSession", e, {
                        beforeSuccess: function(e) {
                            r = setTimeout(function() {
                                (0, o.invokeMethod)("refreshSession")
                            }, 1e3 * e.expireIn), delete e.err_code, delete e.expireIn
                        },
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("refreshSession", "checkSession")
                        }
                    })
                };
            t.login = i, t.checkSession = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.authorize = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("authorize", e, {
                        scope: ""
                    }) && (0, o.invokeMethod)("authorize", (0, r.assign)(e, {
                        scope: [e.scope]
                    }), {
                        beforeAll: function(e) {
                            delete e.body, void 0 !== e.err_code && (e.errCode = e.err_code, delete e.err_code)
                        }
                    })
                };
            t.authorize = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getUserInfo = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("operateWXData", (0, r.assign)({}, e, {
                        data: {
                            api_name: "webapi_getuserinfo",
                            with_credentials: "boolean" != typeof e.withCredentials || e.withCredentials,
                            data: {
                                lang: e.lang || "en"
                            }
                        }
                    }), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
                        },
                        beforeSuccess: function(e) {
                            "android" === (0, r.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data);
                            try {
                                e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
                            } catch (e) {}
                        }
                    })
                };
            t.getUserInfo = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.chooseAddress = void 0;
            var o = n(1),
                r = n(2),
                i = function(e) {
                    (0, o.invokeMethod)("openAddress", e, {
                        beforeSuccess: function(e) {
                            (0, r.renameProperty)(e, "addressPostalCode", "postalCode"), (0, r.renameProperty)(e, "proviceFirstStageName", "provinceName"), (0, r.renameProperty)(e, "addressCitySecondStageName", "cityName"), (0, r.renameProperty)(e, "addressCountiesThirdStageName", "countyName"), (0, r.renameProperty)(e, "addressDetailInfo", "detailInfo")
                        },
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("openAddress", "chooseAddress"), delete e.err_msg
                        }
                    })
                };
            t.chooseAddress = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(158);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(159);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getSetting = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("getSetting", e, {
                        beforeSuccess: function(e) {
                            e.authSetting;
                            e.authSetting = e.authSetting.reduce(function(e, t) {
                                return e[t.scope] = 1 === t.state, e
                            }, {})
                        }
                    })
                };
            t.getSetting = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openSetting = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("openSetting", e, {
                        beforeSuccess: function(e) {
                            e.authSetting;
                            e.authSetting = e.authSetting.reduce(function(e, t) {
                                return e[t.scope] = 1 === t.state, e
                            }, {})
                        }
                    })
                };
            t.openSetting = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getWeRunData = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("openWeRunSetting", {
                        success: function() {
                            (0, o.invokeMethod)("operateWXData", (0, r.assign)({
                                data: {
                                    api_name: "webapi_getwerunstep_history"
                                }
                            }, e), {
                                beforeAll: function(e) {
                                    e.errMsg = e.errMsg.replace("operateWXData", "getWeRunData")
                                },
                                beforeSuccess: function(e) {
                                    "android" === (0, r.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
                                }
                            })
                        },
                        fail: function(t) {
                            t.errMsg = t.errMsg.replace("openWeRunSetting", "getWeRunData"), "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api getWeRunData fail callback function")(t), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api getWeRunData fail callback function")(t)
                        }
                    })
                };
            t.getWeRunData = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.chooseInvoiceTitle = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("chooseInvoiceTitle", e, {
                        beforeSuccess: function(e) {
                            var t = e.invoiceTitleInfo || e.choose_invoice_title_info;
                            if (t) try {
                                var n = JSON.parse(t);
                                delete e.invoiceTitleInfo, delete e.choose_invoice_title_info, e = Object.assign(e, n)
                            } catch (e) {}
                        }
                    })
                };
            t.chooseInvoiceTitle = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.operateWXData = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("operateWXData", e, {
                            apiName: ""
                        })) {
                        var t = {
                            api_name: e.apiName,
                            data: e.reqData || {},
                            operate_directly: !0
                        };
                        (0, o.invokeMethod)("operateWXData", Object.assign({}, {
                            data: t
                        }, e), {
                            beforeSuccess: function(e) {
                                "android" === (0, r.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), e.respData = e.data, delete e.data
                            }
                        })
                    }
                };
            t.operateWXData = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getOpenDeviceId = void 0;
            var o = n(1),
                r = (0, o.operateWXDataFactory)("getOpenDeviceId", "webapi_getdeviceinfo");
            t.getOpenDeviceId = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.requestPaymentToBank = t.bindPaymentCard = t.verifyPaymentPassword = t.requestPayment = void 0;
            var o = n(1),
                r = n(18),
                i = function(e) {
                    (0, o.beforeInvoke)("requestPayment", e, {
                        timeStamp: "",
                        nonceStr: "",
                        package: "",
                        signType: "",
                        paySign: ""
                    }) && (0, r.invokeMethod)("requestPayment", e)
                },
                a = function(e) {
                    (0, r.invokeMethod)("verifyPaymentPassword", e)
                },
                c = function(e) {
                    (0, r.invokeMethod)("bindPaymentCard", e)
                },
                u = function(e) {
                    (0, r.invokeMethod)("requestPaymentToBank", e)
                };
            t.requestPayment = i, t.verifyPaymentPassword = a, t.bindPaymentCard = c, t.requestPaymentToBank = u
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ShareInfoStorage = void 0;
            var o = n(166);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(167);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(168);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            });
            var a = n(169);
            Object.keys(a).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return a[e]
                    }
                })
            });
            var c = n(32),
                u = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(c);
            t.ShareInfoStorage = u.default
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getShareInfo = void 0;
            var o = n(1),
                r = n(32),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = n(2),
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = i.default.get(e.shareTicket);
                    if (t)(0, o.invokeMethod)("operateWXData", (0, a.assign)({
                        data: {
                            api_name: "webapi_getshareinfo",
                            data: {
                                share_key: t.shareKey,
                                share_name: t.shareName
                            }
                        }
                    }, e), {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("operateWXData", "getShareInfo")
                        },
                        beforeSuccess: function(e) {
                            "android" === (0, a.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data);
                            try {
                                var t = JSON.parse(e.data.data);
                                t.roomTopic && (e.roomTopic = t.roomTopic)
                            } catch (e) {}
                            e.iv = e.data.iv, e.encryptedData = e.data.encryptedData, delete e.data
                        }
                    });
                    else {
                        var n = {
                            errMsg: "getShareInfo:fail invalid shareTicket"
                        };
                        "function" == typeof e.fail && e.fail(n), "function" == typeof e.complete && e.complete(n)
                    }
                };
            t.getShareInfo = c
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.showShareMenu = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    !0 === e.withShareTicket ? (0, o.invokeMethod)("showShareMenuWithShareTicket", e, {
                        beforeAll: function(e) {
                            e.errMsg = e.errMsg.replace("showShareMenuWithShareTicket", "showShareMenu")
                        },
                        beforeFail: function(e) {
                            e.errMsg += ", with arg withShareTicket: true"
                        }
                    }) : (0, o.invokeMethod)("showShareMenu", e, {})
                };
            t.showShareMenu = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.hideShareMenu = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("hideShareMenu", e, {})
                };
            t.hideShareMenu = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.updateShareMenu = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Promise.all([new Promise(function(t, n) {
                        if ("boolean" == typeof e.dynamic || "boolean" == typeof e.widget) {
                            var r = void 0;
                            r = "boolean" == typeof e.widget ? e.widget : e.dynamic, (0, o.invokeMethod)("updateShareMenuDynamic", {
                                isDynamic: r,
                                success: t,
                                fail: n
                            }, {
                                beforeAll: function(e) {
                                    e.errMsg = e.errMsg.replace("updateShareMenuDynamic", "updateShareMenu")
                                },
                                beforeFail: function(e) {
                                    e.errMsg += ', with arg "dynamic": true'
                                }
                            })
                        } else t({
                            errMsg: "updateShareMenu:ok"
                        })
                    }), new Promise(function(t, n) {
                        "boolean" == typeof e.withShareTicket ? (0, o.invokeMethod)("updateShareMenuShareTicket", {
                            withShareTicket: e.withShareTicket,
                            success: t,
                            fail: n
                        }, {
                            beforeAll: function(e) {
                                e.errMsg = e.errMsg.replace("updateShareMenuShareTicket", "updateShareMenu")
                            },
                            beforeFail: function(e) {
                                e.errMsg += ', with arg "withShareTicket": true'
                            }
                        }) : t({
                            errMsg: "updateShareMenu:ok"
                        })
                    })]).then(function(t) {
                        "function" == typeof e.success && Reporter.surroundThirdByTryCatch(e.success, "at api updateShareMenu success callback function")(t[0]), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api updateShareMenu complete callback function")(t[0])
                    }, function(t) {
                        "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api updateShareMenu fail callback function")(t[0]), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api updateShareMenu complete callback function")(t[0])
                    })
                };
            t.updateShareMenu = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openCard = t.addCard = void 0;
            var o = n(1),
                r = function(e) {
                    (0, o.beforeInvoke)("addCard", e, {
                        cardList: []
                    }) && (0, o.invokeMethod)("addCard", e)
                },
                i = function(e) {
                    (0, o.beforeInvoke)("openCard", e, {
                        cardList: []
                    }) && (0, o.invokeMethod)("openCard", e)
                };
            t.addCard = r, t.openCard = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(172);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(173);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(174);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.checkIsSupportSoterAuthentication = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("checkIsSupportSoterAuthentication", e, {})
                };
            t.checkIsSupportSoterAuthentication = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.startSoterAuthentication = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if ((0, o.beforeInvoke)("startSoterAuthentication", e, {
                            challenge: ""
                        })) {
                        var t = e.success;
                        (0, o.invokeMethod)("startSoterAuthentication", Object.assign({}, e, {
                            success: function(n) {
                                0 !== n.errCode ? "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api startSoterAuthentication fail callback function")(n) : "function" == typeof t && Reporter.surroundThirdByTryCatch(t, "at api startSoterAuthentication success callback function")(n)
                            }
                        }), {
                            beforeSuccess: function(e) {
                                "number" == typeof e.errCode && 0 !== e.errCode && (e.errMsg = "startSoterAuthentication:fail")
                            }
                        })
                    }
                };
            t.startSoterAuthentication = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.checkIsSoterEnrolledInDevice = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("checkIsSoterEnrolledInDevice", e, {
                        checkAuthMode: ""
                    }) && (0, o.invokeMethod)("checkIsSoterEnrolledInDevice", e, {})
                };
            t.checkIsSoterEnrolledInDevice = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(176);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(177);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            });
            var i = n(178);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openGoldenRedPacketDetail = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("openGoldenRedPacketDetail", e, {})
                };
            t.openGoldenRedPacketDetail = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.sendGoldenRedPacket = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("sendGoldenRedPacket", e, {})
                };
            t.sendGoldenRedPacket = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.sendBizRedPacket = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("sendBizRedPacket", e, {})
                };
            t.sendBizRedPacket = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(180);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(181);
            Object.defineProperty(t, "startFacialRecognitionVerify", {
                enumerable: !0,
                get: function() {
                    return r.startFacialRecognitionVerify
                }
            });
            var i = n(182);
            Object.keys(i).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return i[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.checkIsSupportFacialRecognition = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("checkIsSupportFacialRecognition", e, {})
                };
            t.checkIsSupportFacialRecognition = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.startFacialRecognitionVerify = t.packageRequestVerifyPreInfo = void 0;
            var o = n(1),
                r = n(2),
                i = function(e) {
                    return JSON.stringify({
                        name: e.name,
                        id_card_number: e.idCardNumber,
                        mobile: e.mobile
                    })
                },
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = i(e);
                    (0, o.invokeMethod)("startFacialRecognitionVerify", (0, r.assign)(e, {
                        requestVerifyPreInfo: t
                    }), {})
                };
            t.packageRequestVerifyPreInfo = i, t.startFacialRecognitionVerify = a
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.startFacialRecognitionVerifyAndUploadVideo = void 0;
            var o = n(1),
                r = n(2),
                i = n(181),
                a = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = (0, i.packageRequestVerifyPreInfo)(e);
                    (0, o.invokeMethod)("startFacialRecognitionVerifyAndUploadVideo", (0, r.assign)(e, {
                        requestVerifyPreInfo: t
                    }), {})
                };
            t.startFacialRecognitionVerifyAndUploadVideo = a
        }, function(e, t, n) {
            function o(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.web = t.miniProgram = t.application = void 0;
            var r = n(184),
                i = o(r),
                a = n(185),
                c = o(a),
                u = n(188),
                s = o(u);
            t.application = i, t.miniProgram = c, t.web = s
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.navigateBackApplication = void 0;
            var o = n(1);
            t.navigateBackApplication = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                (0, o.invokeMethod)("navigateBackApplication", e, {})
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(186);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(187);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.navigateBackMiniProgram = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("navigateBackMiniProgram", e, {})
                };
            t.navigateBackMiniProgram = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.navigateToMiniProgram = void 0;
            var o = n(1),
                r = n(2),
                i = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("navigateToMiniProgram", e, {
                        appId: ""
                    }) && ("string" == typeof e.path && e.path.trim().length > 0 ? (0, o.invokeMethod)("navigateToMiniProgram", (0, r.assign)(e, {
                        path: (0, r.transWxmlToHtml)(e.path).trim()
                    }), {}) : (0, o.invokeMethod)("navigateToMiniProgram", (0, r.assign)(e, {
                        path: void 0
                    }), {}))
                };
            t.navigateToMiniProgram = i
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(189);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(190);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openDeliveryList = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.invokeMethod)("openDeliveryList", e, {})
                };
            t.openDeliveryList = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.openUrl = void 0;
            var o = n(1),
                r = n(2),
                i = n(3),
                a = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i),
                c = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!0 !== a.default.openUrlLock)
                        if (e.url = e.url || "", (0, r.validateUrl)(e.url)) a.default.openUrlLock = !0, (0, o.invokeMethod)("openUrl", e, {
                            afterAll: function() {
                                a.default.openUrlLock = !1
                            }
                        });
                        else {
                            console.error("invalid url", e.url);
                            var t = {
                                errMsg: 'openUrl: invalid url "' + e.url + '"'
                            };
                            "function" == typeof e.fail && e.fail(t), "function" == typeof e.complete && e.complete(t)
                        }
                };
            t.openUrl = c
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(192);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(193);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getPublicLibVersion = void 0;
            var o = n(1);
            t.getPublicLibVersion = function() {
                var e = void 0;
                return (0, o.invokeMethod)("getPublicLibVersion", {
                    complete: function(t) {
                        t.version ? e = t.version : (e = t, delete e.errMsg)
                    }
                }), e
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.setEnableDebug = void 0;
            var o = n(1),
                r = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    (0, o.beforeInvoke)("setEnableDebug", e, {
                        enableDebug: !0
                    }) && ((0, o.invokeMethod)("setEnableDebug", e, {}), e.enableDebug && console.warn("已通过 wx.setEnableDebug 打开调试"))
                };
            t.setEnableDebug = r
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.traceEvent = t.updatePerfData = void 0;
            var o = n(1);
            t.updatePerfData = function(e) {
                (0, o.invokeMethod)("updatePerfData", e)
            }, t.traceEvent = function(e) {
                (0, o.invokeMethod)("traceEvent", e)
            }
        }, function(e, t, n) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t._getRealRoute = void 0;
            var o = n(2),
                r = n(3),
                i = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(r),
                a = function(e) {
                    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return (0, o.getRealRoute)(i.default.lastRoute, e, t)
                };
            t._getRealRoute = a
        }]),
        __appServiceEngine__ = function(e) {
            function t(o) {
                if (n[o]) return n[o].exports;
                var r = n[o] = {
                    exports: {},
                    id: o,
                    loaded: !1
                };
                return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
            }
            var n = {};
            return t.m = e, t.c = n, t.p = "", t(0)
        }([function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(1);
            Object.defineProperty(t, "Page", {
                enumerable: !0,
                get: function() {
                    return o.pageHolder
                }
            }), Object.defineProperty(t, "getCurrentPages", {
                enumerable: !0,
                get: function() {
                    return o.getCurrentPages
                }
            });
            var r = n(14);
            Object.defineProperty(t, "App", {
                enumerable: !0,
                get: function() {
                    return r.appHolder
                }
            }), Object.defineProperty(t, "getApp", {
                enumerable: !0,
                get: function() {
                    return r.getApp
                }
            }), "function" == typeof logxx && logxx("app-service-engine start")
        }, function(e, t, n) {
            "use strict";

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getTabBarRoutes = t.getRouteToPage = t.pageHolder = t.getCurrentPages = t.getCurrentPage = void 0;
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                i = n(2),
                a = n(6),
                c = o(a),
                u = n(2),
                s = n(5),
                f = n(13),
                l = n(8),
                d = o(l),
                p = n(9),
                h = o(p),
                v = wx.ShareInfoStorage,
                g = wx._getRealRoute;
            delete wx.ShareInfoStorage, delete wx._getRealRoute;
            var y = void 0,
                b = {},
                m = {},
                _ = [],
                k = 0,
                w = [];
            ! function() {
                var e = __wxConfig.page || {},
                    t = __wxConfig.global ? __wxConfig.global.window : {};
                for (var n in e) e[n].window = Object.assign({}, t, e[n].window)
            }(), __wxConfig.tabBar && __wxConfig.tabBar.list && "object" === r(__wxConfig.tabBar.list) && "function" == typeof __wxConfig.tabBar.list.forEach && __wxConfig.tabBar.list.forEach(function(e) {
                w.push(e.pagePath)
            });
            var S = {
                    appRouteTime: 0,
                    newPageTime: 0,
                    pageReadyTime: 0
                },
                M = function(e, t, n) {
                    Reporter.speedReport({
                        key: e,
                        timeMark: {
                            startTime: t,
                            endTime: n
                        }
                    })
                },
                C = (t.getCurrentPage = function() {
                    return y
                }, t.getCurrentPages = function() {
                    var e = [];
                    return _.forEach(function(t) {
                        e.push(t.page)
                    }), e
                }, t.pageHolder = function(e) {
                    if (!__wxRouteBegin) throw (0, u.error)("Page 注册错误", "Please do not register multiple Pages in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Please do not register multiple Pages in " + __wxRoute + ".js");
                    __wxRouteBegin = !1;
                    var t = __wxConfig.pages,
                        n = t[k];
                    if (k++, "Object" !== (0, u.getDataType)(e)) throw (0, u.error)("Page 注册错误", "Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
                    (0, u.info)("Register Page: " + n), m[n] = e
                }, function(e) {
                    try {
                        if ("number" == typeof __wxConfig.page[e + ".html"].window.onReachBottomDistance) return __wxConfig.page[e + ".html"].window.onReachBottomDistance
                    } catch (e) {
                        return s.DEFAULT_ON_REACH_BOTTOM_DISTANCE
                    }
                    return s.DEFAULT_ON_REACH_BOTTOM_DISTANCE
                }),
                P = (0, u.surroundByTryCatch)(function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    (0, u.info)("Update view with init data");
                    var o = {};
                    o.webviewId = t, o.enablePullUpRefresh = e.hasOwnProperty("onReachBottom"), o.enablePageScroll = e.hasOwnProperty("onPageScroll"), o.onReachBottomDistance = C(e.__route__), o.isPageReload = n, o.pageScrollTop = e.__pageScrollTop__;
                    var r = {
                        data: e.data,
                        ext: o,
                        options: {
                            firstRender: !0
                        }
                    };
                    d.default.emit(r, t), (0, f.triggerAnalytics)("pageReady", e)
                }),
                A = function(e, t, n) {
                    var o = void 0;
                    m.hasOwnProperty(e) ? o = m[e] : ((0, u.warn)("Page route 错误", "Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), o = {}), S.newPageTime = Date.now();
                    var r = new c.default(o, t, e);
                    P(r, t), (0, u.isDevTools)() && (__wxAppData[e] = r.data, __wxAppData[e].__webviewId__ = t, (0, u.publish)(s.UPDATE_APP_DATA)), y = {
                        page: r,
                        webviewId: t,
                        route: e
                    }, _.push(y), r.options = (0, h.default)(n), r.onLoad(n), r.onShow(), b[t] = {
                        page: r,
                        route: e
                    }, (0, f.triggerAnalytics)("pageLoad", r), (0, f.triggerAnalytics)("enterPage", r), M("appRoute2newPage", S.appRouteTime, S.newPageTime)
                },
                O = function(e) {
                    e.page.onHide(), (0, f.triggerAnalytics)("leavePage", e.page)
                },
                T = function(e) {
                    e.page.onUnload(), (0, u.isDevTools)() && (delete __wxAppData[e.route], (0, u.publish)(s.UPDATE_APP_DATA)), delete b[e.webviewId], _ = _.slice(0, _.length - 1), (0, f.triggerAnalytics)("pageUnload", e.page), (0, f.triggerAnalytics)("leavePage", e.page)
                },
                I = function(e) {
                    return -1 !== w.indexOf(e.route) || -1 !== w.indexOf(e.route + ".html")
                },
                x = function(e, t, n) {
                    y && O(y), b.hasOwnProperty(t) ? (0, u.error)("Page route 错误(system error)", "navigateTo with an already exist webviewId " + t) : A(e, t, n)
                },
                B = function(e, t, n) {
                    y && T(y), b.hasOwnProperty(t) ? (0, u.error)("Page route 错误(system error)", "redirectTo with an already exist webviewId " + t) : A(e, t, n)
                },
                j = function(e) {
                    for (var t = !1, n = _.length - 1; n >= 0; n--) {
                        var o = _[n];
                        if (o.webviewId === e) {
                            t = !0, y = o, o.page.onShow(), (0, f.triggerAnalytics)("enterPage", o.page);
                            break
                        }
                        T(o)
                    }
                    t || (0, u.error)("Page route 错误(system error)", "navigateBack with an unexist webviewId " + e)
                },
                E = function(e, t, n) {
                    var o = !0;
                    if (0 === _.length) return void(0, u.warn)("Page route 错误", "switchTab before pages are registered.");
                    for (; _.length > 1;) T(_[_.length - 1]), o = !1;
                    if (_[0].webviewId === t) y = _[0], o || y.page.onShow();
                    else if (I(_[0]) ? o && O(_[0]) : T(_[0]), b.hasOwnProperty(t)) {
                        var r = b[t].page;
                        y = {
                            webviewId: t,
                            route: e,
                            page: r
                        }, _ = [y], r.onShow(), (0, f.triggerAnalytics)("enterPage", r), (0, f.triggerAnalytics)("switchTab", r)
                    } else _ = [], A(e, t, n)
                },
                R = function(e, t, n) {
                    b.hasOwnProperty(t) ? (0, u.error)("Page route 错误(system error)", "appLaunch with an already exist webviewId " + t) : A(e, t, n)
                },
                D = function(e, t, n) {
                    for (; _.length > 0;) T(_[_.length - 1]);
                    A(e, t, n)
                },
                L = function(e, t, n, o) {
                    (0, u.info)("On app route: " + e), S.appRouteTime = Date.now(), "navigateTo" === o ? x(e, t, n) : "redirectTo" === o ? B(e, t, n) : "navigateBack" === o ? j(t) : "switchTab" === o ? E(e, t, n) : "appLaunch" === o ? R(e, t, n) : "reLaunch" === o || "autoReLaunch" === o ? D(e, t, n) : (0, u.error)("Page route 错误(system error)", "Illegal open type: " + o)
                },
                F = function(e, t) {
                    (0, u.info)("On page reload: " + e), b.hasOwnProperty(t) ? P(b[t].page, t, !0) : (0, u.error)("Page reload(system error)", "Can not find webviewId " + t)
                },
                N = function(e, t, n) {
                    if (!b.hasOwnProperty(e)) return void(0, u.warn)("事件警告", "OnWebviewEvent: " + t + ", WebviewId: " + e + " not found");
                    var o = b[e],
                        r = o.page;
                    return t === s.DOM_READY_EVENT ? (S.pageReadyTime = Date.now(), (0, u.info)("Invoke event onReady in page: " + o.route), r.onReady(), void M("newPage2pageReady", S.newPageTime, S.pageReadyTime)) : ((0, u.info)("Invoke event " + t + " in page: " + o.route), r.hasOwnProperty(t) ? u.safeInvoke.call(r, t, n) : void(0, u.warn)("事件警告", "Do not have " + t + " handler in current page: " + o.route + ". Please make sure that " + t + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json"))
                },
                W = function(e) {
                    if (!b.hasOwnProperty(e)) return void(0, u.warn)("事件警告", "onPullDownRefresh WebviewId: " + e + " not found");
                    var t = b[e],
                        n = t.page;
                    n.hasOwnProperty("onPullDownRefresh") && ((0, u.info)("Invoke event onPullDownRefresh in page: " + t.route), u.safeInvoke.call(n, "onPullDownRefresh"), (0, f.triggerAnalytics)("pullDownRefresh", n))
                },
                U = function(e, t) {
                    var n = e,
                        o = b[t],
                        r = o.page,
                        i = void 0;
                    if (r.hasOwnProperty("onShareAppMessage") && (i = "onShareAppMessage"), i) {
                        (0, u.info)("Invoke event " + i + " in page: " + o.route);
                        var a = u.safeInvoke.call(r, i, {
                            from: e.fromShareButton ? "button" : "menu",
                            target: e.target
                        }) || {};
                        n.title = a.title || e.title, n.desc = a.desc || e.desc, n.path = a.path ? (0, u.addHtmlSuffixToUrl)(a.path) : e.path, a.imageUrl && !/^(http|https|wxfile):\/\//.test(a.imageUrl) ? n.imageUrl = g(a.imageUrl, !1) : n.imageUrl = a.imageUrl, a.cacheKey && (n.cacheKey = a.cacheKey), n.path.length > 0 && "/" === n.path[0] && (n.path = n.path.substr(1)), n.success = a.success, n.cancel = a.cancel, n.fail = a.fail, n.complete = a.complete, (0, f.triggerAnalytics)("share", r)
                    }
                    return n
                };
            wx.onAppRoute((0, u.surroundByTryCatch)(function(e) {
                var t = e.path,
                    n = e.webviewId,
                    o = e.query || {},
                    r = e.openType;
                L(t, n, o, r)
            }), "onAppRoute"), wx.onPageReload((0, u.surroundByTryCatch)(function(e) {
                var t = e.path,
                    n = e.webviewId;
                F(t, n)
            }), "onPageReload"), wx.onWebviewEvent((0, u.surroundByTryCatch)(function(e) {
                var t = e.webviewId,
                    n = e.eventName,
                    o = e.data;
                return N(t, n, o)
            }, "onWebviewEvent")), WeixinJSBridge.on("onPullDownRefresh", (0, u.surroundByTryCatch)(function(e, t) {
                W(t)
            }, "onPullDownRefresh"));
            var V = function(e, t) {
                var n = U(e, t),
                    o = void 0;
                o = !0 === e.fromShareButton ? "shareAppMessageDirectly" : "shareAppMessage", WeixinJSBridge.invoke(o, n, function(e) {
                    e.errMsg = e.errMsg.replace("shareAppMessageDirectly", "shareAppMessage"), void 0 !== e.shareInfos && e.shareInfos.length > 0 && (e.shareTickets = e.shareInfos.map(function(e) {
                        return v.set(e.shareKey, e.shareName)
                    })), delete e.shareInfos;
                    var t = /^shareAppMessage:ok/.test(e.errMsg),
                        r = /^shareAppMessage:cancel/.test(e.errMsg),
                        i = /^shareAppMessage:fail/.test(e.errMsg);
                    t ? Reporter.reportIDKey({
                        key: o
                    }) : i ? Reporter.reportIDKey({
                        key: o + "_fail"
                    }) : Reporter.reportIDKey({
                        key: o + "_cancel"
                    }), t && "function" == typeof n.success ? n.success(e) : r && "function" == typeof n.fail ? (e.errMsg = "shareAppMessage:fail cancel", n.fail(e)) : i && "function" == typeof n.fail && n.fail(e), "function" == typeof n.complete && n.complete(e)
                })
            };
            WeixinJSBridge.on("onShareAppMessage", (0, u.surroundByTryCatch)(V, "onShareAppMessage")), WeixinJSBridge.subscribe("tapShareButton", function(e, t) {
                if (!b.hasOwnProperty(t)) return void(0, u.warn)("事件警告", "tapShareButton WebviewId: " + t + " not found");
                var n = b[t],
                    o = n.page,
                    r = (0, u.addHtmlSuffixToUrl)(o.route);
                Object.keys(o.options).length > 0 && (r += "?" + Object.keys(o.options).map(function(e) {
                    return e + "=" + o.options[e]
                }).join("&")), (0, u.surroundByTryCatch)(V, "onShareAppMessage")({
                    path: r,
                    title: "",
                    target: e ? e.target : void 0,
                    fromShareButton: !0
                }, t)
            }), WeixinJSBridge.subscribe("savePageState", (0, u.surroundByTryCatch)(function(e, t) {
                if (!b.hasOwnProperty(t)) return void(0, u.warn)("事件警告", "onPageWillManuallyTerminate WebviewId: " + t + " not found");
                b[t].page.__pageScrollTop__ = e.scrollTop
            }), "savePageState");
            t.getRouteToPage = function() {
                return m
            }, t.getTabBarRoutes = function() {
                return w
            }
        }, function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(3);
            Object.keys(o).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return o[e]
                    }
                })
            });
            var r = n(4);
            Object.keys(r).forEach(function(e) {
                "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: function() {
                        return r[e]
                    }
                })
            })
        }, function(e, t) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function o(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function r(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            function i() {
                var e = "";
                return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? e = "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 && (e = "android") : e = "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios", e
            }

            function a() {
                var e = void 0,
                    t = Array.prototype.slice.call(arguments),
                    n = t[0];
                Reporter.__route__ = this.__route__, Reporter.__method__ = n, t = t.slice(1);
                try {
                    var o = Date.now();
                    e = this[n].apply(this, t);
                    var r = Date.now() - o;
                    r > 1e3 && Reporter.slowReport({
                        key: "pageInvoke",
                        cost: r,
                        extend: "at " + this.__route__ + " page " + n + " function"
                    })
                } catch (e) {
                    Reporter.thirdErrorReport({
                        error: e,
                        extend: "at " + this.__route__ + " page " + n + " function"
                    })
                }
                return e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            t.getPlatform = i, t.safeInvoke = a;
            var u = (t.isEmptyObject = function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }, t.extend = function(e, t) {
                    for (var n = Object.keys(t), o = n.length; o--;) e[n[o]] = t[n[o]];
                    return e
                }),
                s = (t.noop = function() {}, t.getDataType = function(e) {
                    return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
                }, t.isObject = function(e) {
                    return null !== e && "object" === (void 0 === e ? "undefined" : c(e))
                }, Object.prototype.hasOwnProperty),
                f = (t.hasOwn = function(e, t) {
                    return s.call(e, t)
                }, t.def = function(e, t, n, o) {
                    Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !!o,
                        writable: !0,
                        configurable: !0
                    })
                }, Object.prototype.toString),
                l = (t.isPlainObject = function(e) {
                    return "[object Object]" === f.call(e)
                }, t.error = function(e, t) {
                    console.group(new Date + " " + e), console.error(t), console.groupEnd()
                }, t.warn = function(e, t) {
                    console.group(new Date + " " + e), console.warn(t), console.groupEnd()
                }, t.info = function(e) {
                    __wxConfig && __wxConfig.debug && console.info(e)
                }, t.surroundByTryCatch = function(e, t) {
                    return function() {
                        try {
                            return e.apply(e, arguments)
                        } catch (e) {
                            return l(e, t),
                                function() {}
                        }
                    }
                }, t.errorReport = function(e, t) {
                    if ("[object Error]" === Object.prototype.toString.apply(e)) {
                        if ("AppServiceEngineKnownError" === e.type) throw e;
                        Reporter.errorReport({
                            key: "jsEnginScriptError",
                            error: e,
                            extend: t
                        })
                    }
                });
            t.AppServiceEngineKnownError = function(e) {
                function t(e) {
                    n(this, t);
                    var r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-Engine:" + e));
                    return r.type = "AppServiceEngineKnownError", r
                }
                return r(t, e), t
            }(Error), t.publish = function() {
                var e = Array.prototype.slice.call(arguments),
                    t = {
                        options: {
                            timestamp: Date.now()
                        }
                    };
                e[1] ? e[1].options = u(e[1].options || {}, t.options) : e[1] = t, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
            }
        }, function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.hasExitCondition = t.shouldExit = t.addHtmlSuffixToUrl = t.isDevTools = void 0;
            var o = n(5);
            t.isDevTools = function() {
                return !!("undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("appservice") > -1)
            }, t.addHtmlSuffixToUrl = function(e) {
                if ("string" != typeof e) return e;
                var t = e.split("?")[0],
                    n = e.split("?")[1];
                return t += ".html", void 0 !== n ? t + "?" + n : t
            }, t.shouldExit = function(e) {
                return "hang" !== e && "hide" !== e
            }, t.hasExitCondition = function(e) {
                return -1 !== o.EXIT_SCENES.indexOf(e.scene)
            }
        }, function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            t.DOM_READY_EVENT = "__DOMReady", t.UPDATE_APP_DATA = "__updateAppData", t.DEFAULT_ON_REACH_BOTTOM_DISTANCE = 50, t.EXIT_SCENES = [1007, "1007", 1008, "1008", 1011, "1011", 1025, "1025", 1047, "1047", 1048, "1048", 1049, "1049", 1050, "1050"]
        }, function(e, t, n) {
            "use strict";

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                a = n(2),
                c = n(7),
                u = n(8),
                s = o(u),
                f = n(9),
                l = o(f),
                d = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"],
                p = function(e) {
                    for (var t = 0; t < d.length; ++t)
                        if (d[t] === e) return !0;
                    return "data" === e
                },
                h = ["__wxWebviewId__", "__route__"],
                v = ["route"],
                g = function(e) {
                    return -1 !== h.indexOf(e)
                },
                y = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = this,
                            o = arguments[1],
                            i = arguments[2];
                        r(this, e);
                        var c = {
                            __wxWebviewId__: o,
                            __route__: i
                        };
                        h.forEach(function(e) {
                            n.__defineSetter__(e, function() {
                                (0, a.warn)("关键字保护", "should not change the protected attribute " + e)
                            }), n.__defineGetter__(e, function() {
                                return c[e]
                            })
                        }), t.data = t.data || {}, (0, a.isPlainObject)(t.data) || (0, a.error)("Page data error", "data must be an object, your data is " + JSON.stringify(t.data)), this.data = JSON.parse(JSON.stringify(t.data)), d.forEach(function(e) {
                            n[e] = function() {
                                var n = (t[e] || a.noop).bind(this),
                                    o = void 0;
                                Reporter.__route__ = this.__route__, Reporter.__method__ = e, (0, a.info)(this.__route__ + ": " + e + " have been invoked");
                                try {
                                    var r = Date.now();
                                    o = n.apply(this, arguments);
                                    var i = Date.now() - r;
                                    i > 1e3 && Reporter.slowReport({
                                        key: "pageInvoke",
                                        cost: i,
                                        extend: "at " + this.__route__ + " page lifeCycleMethod " + e + " function"
                                    })
                                } catch (t) {
                                    Reporter.thirdErrorReport({
                                        error: t,
                                        extend: "at " + this.__route__ + " page lifeCycleMethod " + e + " function"
                                    })
                                }
                                return o
                            }.bind(n)
                        });
                        for (var u in t) ! function(e) {
                            g(e) ? (0, a.warn)("关键字保护", "Page's " + e + " is write-protected") : p(e) || ("Function" === (0, a.getDataType)(t[e]) ? n[e] = function() {
                                var n = void 0;
                                Reporter.__route__ = this.__route__, Reporter.__method__ = e;
                                try {
                                    var o = Date.now();
                                    n = t[e].apply(this, arguments);
                                    var r = Date.now() - o;
                                    r > 1e3 && Reporter.slowReport({
                                        key: "pageInvoke",
                                        cost: r,
                                        extend: "at " + this.__route__ + " page " + e + " function"
                                    })
                                } catch (t) {
                                    Reporter.thirdErrorReport({
                                        error: t,
                                        extend: "at " + this.__route__ + " page " + e + " function"
                                    })
                                }
                                return n
                            }.bind(n) : n[e] = (0, l.default)(t[e]))
                        }(u);
                        var s = {
                            route: i
                        };
                        v.forEach(function(e) {
                            n.hasOwnProperty(e) || (n[e] = s[e])
                        }), "function" == typeof t.onShareAppMessage && wx.showShareMenu()
                    }
                    return i(e, [{
                        key: "update",
                        value: function() {
                            (0, a.warn)("将被废弃", "Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
                        }
                    }, {
                        key: "forceUpdate",
                        value: function() {
                            (0, a.warn)("将被废弃", "Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
                        }
                    }, {
                        key: "setData",
                        value: function(e, t) {
                            try {
                                var n = (0, a.getDataType)(e);
                                if ("Object" !== n) return void(0, a.error)("类型错误", "setData accepts an Object rather than some " + n);
                                for (var o in e) {
                                    var r = (0, c.getObjectByPath)(this.data, o),
                                        i = r.obj,
                                        u = r.key;
                                    i && (i[u] = (0, l.default)(e[o]))
                                }
                                s.default.emit({
                                    data: e
                                }, this.__wxWebviewId__, t)
                            } catch (e) {
                                (0, a.errorReport)(e)
                            }
                        }
                    }, {
                        key: "pageScrollTo",
                        value: function(e) {
                            (0, a.publish)("pageScrollTo", {
                                data: e
                            }, [this.__wxWebviewId__])
                        }
                    }]), e
                }();
            t.default = y
        }, function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getObjectByPathStrictly = t.getObjectByPath = t.parsePath = void 0;
            var o = n(2),
                r = t.parsePath = function(e) {
                    if ("String" !== (0, o.getDataType)(e)) throw (0, o.error)("数据路径错误", "Path must be a string"), new o.AppServiceEngineKnownError("Path must be a string");
                    for (var t = e.length, n = [], r = "", i = 0, a = !1, c = !1, u = 0; u < t; u++) {
                        var s = e[u];
                        if ("\\" === s) u + 1 < t && ("." === e[u + 1] || "[" === e[u + 1] || "]" === e[u + 1]) ? (r += e[u + 1], u++) : r += "\\";
                        else if ("." === s) r && (n.push(r), r = "");
                        else if ("[" === s) {
                            if (r && (n.push(r), r = ""), 0 === n.length) throw (0, o.error)("数据路径错误", "Path can not start with []: " + e), new o.AppServiceEngineKnownError("Path can not start with []: " + e);
                            c = !0, a = !1
                        } else if ("]" === s) {
                            if (!a) throw (0, o.error)("数据路径错误", "Must have number in []: " + e), new o.AppServiceEngineKnownError("Must have number in []: " + e);
                            c = !1, n.push(i), i = 0
                        } else if (c) {
                            if (s < "0" || s > "9") throw (0, o.error)("数据路径错误", "Only number 0-9 could inside []: " + e), new o.AppServiceEngineKnownError("Only number 0-9 could inside []: " + e);
                            a = !0, i = 10 * i + s.charCodeAt(0) - 48
                        } else r += s
                    }
                    if (r && n.push(r), 0 === n.length) throw (0, o.error)("数据路径错误", "Path can not be empty"), new o.AppServiceEngineKnownError("Path can not be empty");
                    return n
                };
            t.getObjectByPath = function(e, t) {
                for (var n = r(t), i = {}, a = void 0, c = e, u = 0; u < n.length; u++) Number(n[u]) === n[u] && n[u] % 1 == 0 ? Array.isArray(c) || (i[a] = [], c = i[a]) : (0, o.isPlainObject)(c) || (i[a] = {}, c = i[a]), a = n[u], i = c, c = c[n[u]];
                return {
                    obj: i,
                    key: a
                }
            }, t.getObjectByPathStrictly = function(e, t) {
                for (var n = r(t), i = void 0, a = void 0, c = e, u = 0; u < n.length; u++) Number(n[u]) === n[u] && n[u] % 1 == 0 ? Array.isArray(c) || (c = []) : (0, o.isPlainObject)(c) || (c = {}), a = n[u], i = c, c = c[n[u]];
                return {
                    obj: i,
                    key: a
                }
            }
        }, function(e, t) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                    }
                    return e
                },
                r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                i = function() {
                    function e() {
                        n(this, e)
                    }
                    return r(e, null, [{
                        key: "emit",
                        value: function(e, t) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
                            wx.invokeWebviewMethod({
                                name: "appDataChange",
                                args: o({}, e, {
                                    complete: n
                                }),
                                webviewIds: [t]
                            })
                        }
                    }]), e
                }();
            t.default = i
        }, function(e, t, n) {
            "use strict";
            e.exports = n(10)
        }, function(e, t, n) {
            "use strict";

            function o(e) {}

            function r(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o;
                if (null === e) return null;
                var n = (0, c.copyValue)(e);
                if (null !== n) return n;
                var r = (0, c.copyCollection)(e, t),
                    a = null !== r ? r : e;
                return i(e, t, a, [e], [a])
            }

            function i(e, t, n, o, r) {
                if (null === e) return null;
                var s = (0, c.copyValue)(e);
                if (null !== s) return s;
                var f = (0, u.getKeys)(e).concat((0, u.getSymbols)(e)),
                    l = void 0,
                    d = void 0,
                    p = void 0,
                    h = void 0,
                    v = void 0,
                    g = void 0,
                    y = void 0,
                    b = void 0;
                for (l = 0, d = f.length; l < d; ++l) p = f[l], h = e[p], v = (0, u.indexOf)(o, h), g = void 0, y = void 0, b = void 0, -1 === v ? (g = (0, c.copy)(h, t), y = null !== g ? g : h, null !== h && /^(?:function|object)$/.test(void 0 === h ? "undefined" : a(h)) && (o.push(h), r.push(y))) : b = r[v], n[p] = b || i(h, t, y, o, r);
                return n
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                c = n(11),
                u = n(12);
            t.default = r
        }, function(e, t) {
            "use strict";

            function n(e, t) {
                var n = r(e);
                return null !== n ? n : o(e, t)
            }

            function o(e, t) {
                if ("function" != typeof t) throw new TypeError("customizer is must be a Function");
                if ("function" == typeof e) return e;
                var n = a.call(e);
                if ("[object Array]" === n) return [];
                if ("[object Object]" === n && e.constructor === Object) return {};
                if ("[object Date]" === n) return new Date(e.getTime());
                if ("[object RegExp]" === n) {
                    var o = String(e),
                        r = o.lastIndexOf("/");
                    return new RegExp(o.slice(1, r), o.slice(r + 1))
                }
                var i = t(e);
                return void 0 !== i ? i : null
            }

            function r(e) {
                var t = void 0 === e ? "undefined" : i(e);
                return null !== e && "object" !== t && "function" !== t ? e : null
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                a = Object.prototype.toString;
            t.copy = n, t.copyCollection = o, t.copyValue = r
        }, function(e, t) {
            "use strict";

            function n(e, t) {
                if ("[object Array]" !== r.call(e)) throw new TypeError("array must be an Array");
                var n = void 0,
                    o = void 0,
                    i = void 0;
                for (n = 0, o = e.length; n < o; ++n)
                    if ((i = e[n]) === t || i !== i && t !== t) return n;
                return -1
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                r = Object.prototype.toString,
                i = "function" == typeof Object.keys ? function(e) {
                    return Object.keys(e)
                } : function(e) {
                    var t = void 0 === e ? "undefined" : o(e);
                    if (null === e || "function" !== t && "object" !== t) throw new TypeError("obj must be an Object");
                    var n = [],
                        r = void 0;
                    for (r in e) Object.prototype.hasOwnProperty.call(e, r) && n.push(r);
                    return n
                },
                a = "function" == typeof Symbol ? function(e) {
                    return Object.getOwnPropertySymbols(e)
                } : function() {
                    return []
                };
            t.getKeys = i, t.getSymbols = a, t.indexOf = n
        }, function(e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.triggerAnalytics = void 0;
            var o = n(1),
                r = n(7),
                i = n(2),
                a = n(14),
                c = {},
                u = {},
                s = [],
                f = !1,
                l = [],
                d = !1,
                p = !1,
                h = 0,
                v = 0,
                g = 0,
                y = 0,
                b = 0,
                m = 0,
                _ = null,
                k = null,
                w = function(e) {
                    var t = {};
                    return "[object Array]" !== Object.prototype.toString.call(e) ? t : (e.forEach(function(e) {
                        var n = e.eventTarget;
                        "[object Object]" === Object.prototype.toString.call(n) && (n = [n]), n.forEach(function(n) {
                            var o = n.trigger || "click";
                            t[o] || (t[o] = []), ("click" !== o || /^([\.#][a-zA-Z_][^\.#]* ?)+$/.test(n.element && n.element.trim())) && t[o].push({
                                eventID: e.eventID,
                                page: n.page,
                                element: n.element && n.element.trim(),
                                data: n.data,
                                action: n.action,
                                extra: e.extra
                            })
                        })
                    }), t)
                },
                S = function(e) {
                    var t = 0;
                    switch (e) {
                        case "PAGE_TIME":
                            return t = g ? Date.now() - g - y : 0, t >= 0 ? t : null;
                        case "APP_TIME":
                            return t = h ? Date.now() - h - v : 0, t >= 0 ? t : null;
                        case "CURRENT_PAGE":
                            return k || null;
                        case "LAST_PAGE":
                            return _ || null;
                        default:
                            return
                    }
                },
                M = function(e, t) {
                    var n = e.data[t],
                        o = (0, a.getApp)() || {},
                        i = n.replace("$APP.", ""),
                        c = (0, r.getObjectByPathStrictly)(o, i);
                    if (c.obj && void 0 !== c.obj[c.key]) {
                        var s = c.obj[c.key];
                        "number" != typeof s && "string" != typeof s && "boolean" != typeof s || (u[e.eventID].data[t] = s)
                    }
                },
                C = function(e, t) {
                    Object.keys(e.data || {}).forEach(function(n) {
                        var o = e.data[n],
                            i = !1,
                            a = void 0;
                        if ("$" === o.charAt(0) && void 0 !== (a = S(o.substr(1)))) return void(null !== a && (u[e.eventID].data[n] = a));
                        if (0 === o.indexOf("$APP")) return void M(e, n);
                        if (t && (e.page === t.__route__ || "ANY_PAGE" === e.page)) {
                            if (0 === o.indexOf("$DATASET")) {
                                var c = o.replace("$DATASET.", "");
                                a = (0, r.getObjectByPath)(e.dataset || {}, c), a.obj && void 0 !== a.obj[a.key] && (u[e.eventID].data[n] = a.obj[a.key], i = !0)
                            }
                            if (o.indexOf("[]") > -1) {
                                if ((e.index || []).forEach(function(e) {
                                        o = o.replace("[]", "[" + e + "]")
                                    }), o.indexOf("[-1]") > -1 || o.indexOf("[]") > -1) return void console.warn("[自定义分析] 取不到下标，请检查配置（" + o + "）");
                                var s = o.match(/\[(\d+)\]\.\$INDEX$/);
                                s && (u[e.eventID].data[n] = Number(s[1]), i = !0)
                            }
                            if (a = (0, r.getObjectByPathStrictly)(t.data || {}, o), void 0 === a.obj || void 0 === a.key || void 0 === a.obj[a.key]) return void(i || console.warn("[自定义分析] 取不到该字段，请检查配置（" + o + "）"));
                            u[e.eventID].data[n] = a.obj[a.key]
                        }
                    })
                },
                P = function(e, t) {
                    var n = [];
                    Object.keys(u[e].data).forEach(function(t) {
                        n.push({
                            id: t,
                            value: u[e].data[t]
                        })
                    }), u[e].data = n, u[e].page = t, u[e].version = wx && wx.version && wx.version.version || 0, u[e].uid = Date.now().toString(16) + Math.random().toString(16).substr(2), u[e].type = 0, (0, i.isDevTools)() || (console.info("[自定义分析] 上报成功"), console.info(u[e])), WeixinJSBridge.invoke("reportRealtimeAction", {
                        actionData: JSON.stringify(u[e])
                    }), u[e] = null
                },
                A = function(e, t) {
                    if ("start" !== e.action && "start_and_report" !== e.action || (u[e.eventID] = {
                            eventID: e.eventID,
                            data: {},
                            extra: e.extra
                        }), u[e.eventID]) {
                        var n = t || (0, o.getCurrentPage)() && (0, o.getCurrentPage)().page;
                        C(e, n), "report" !== e.action && "start_and_report" !== e.action || P(e.eventID, n && n.__route__)
                    }
                },
                O = t.triggerAnalytics = function(e, t, n) {
                    if ("pageReady" === e && t) return void I(t);
                    if (p) return void s.push(e);
                    if ("launch" === e && !d) return h = Date.now(), d = !0, p = !0, s.push(e), void WeixinJSBridge.invoke("getAppConfig", {
                        type: 1
                    }, (0, i.surroundByTryCatch)(function(e) {
                        p = !1, e.data && (console.info("[自定义分析] 配置拉取成功"), T(e))
                    }));
                    if (!f) return void l.push([e, t, n]);
                    n || ("enterPage" === e ? (g = Date.now(), y = 0, k = t && t.__route__) : "leavePage" === e ? _ = t && t.__route__ : "background" === e ? b = Date.now() : "foreground" === e && (m = Date.now(), b && m > b && (y += m - b, v += m - b)));
                    var o = c[e];
                    if (o) {
                        var r = ["enterPage", "leavePage", "pageLoad", "pageUnload", "pullDownRefresh", "switchTab"];
                        o.forEach(function(n) {
                            n && (r.indexOf(e) > -1 ? (t && n.page === (t && t.__route__) || "ANY_PAGE" === n.page) && A(n, t) : A(n))
                        })
                    }
                },
                T = function(e, t) {
                    var n = {};
                    try {
                        n = JSON.parse(e.data)
                    } catch (e) {
                        n = {}
                    }
                    var r = (0, o.getCurrentPage)();
                    c = w(n), u = {}, t || s.forEach(function(e) {
                        O(e, r && r.page, !0)
                    }), O("pageReady", r && r.page)
                },
                I = function(e) {
                    if (e) {
                        var t = e.__route__,
                            n = c.click,
                            o = [];
                        n && (n.forEach(function(e) {
                            e.page !== t && "ANY_PAGE" !== e.page || !e.element || o.push({
                                eventID: e.eventID,
                                page: e.page,
                                element: e.element,
                                action: e.action
                            })
                        }), 0 !== o.length && WeixinJSBridge.publish("analyticsConfig", {
                            data: o
                        }, [e.__wxWebviewId__]))
                    }
                };
            WeixinJSBridge.subscribe("analyticsReport", function(e, t) {
                var n = e.data,
                    r = c.click,
                    a = void 0,
                    s = void 0;
                if (r && ("start" === n.action || "start_and_report" === n.action || u[n.eventID])) {
                    for (var f = (0, o.getCurrentPages)(), l = 0; l < f.length; l++) {
                        var d = f[l];
                        if (d.__wxWebviewId__ === t) {
                            s = d;
                            break
                        }
                    }
                    if (s) {
                        for (var p = 0; p < r.length; p++) {
                            var h = r[p];
                            if (n.eventID === h.eventID && (n.page === h.page || "ANY_PAGE" === h.page) && n.element === h.element) {
                                h.dataset = n.dataset || {}, a = (0, i.extend)({}, h);
                                break
                            }
                        }
                        a && (a.index = n.index, A(a, s))
                    }
                }
            }), WeixinJSBridge.on("onAppConfig", (0, i.surroundByTryCatch)(function(e) {
                console.info("[自定义分析] 收到最新配置"), 1 === Number(e.type) && T(e, !0)
            })), wx.onAppRouteDone(function() {
                f = !0, l.forEach(function(e) {
                    O.apply(null, e)
                })
            })
        }, function(e, t, n) {
            "use strict";

            function o(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getExitCondition = t.getModeInHang = t.getApp = t.appHolder = void 0;
            var r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function(t, n, o) {
                        return n && e(t.prototype, n), o && e(t, o), t
                    }
                }(),
                i = n(2),
                a = n(1),
                c = n(13),
                u = ["onLaunch", "onShow", "onHide", "onUnlaunch"],
                s = void 0,
                f = void 0,
                l = !1,
                d = !0,
                p = !1;
            wx.onAppUnhang(function() {
                l = !1
            }), delete wx.exitMiniProgram;
            var h = function(e) {
                    for (var t = 0; t < u.length; ++t)
                        if (u[t] === e) return !0;
                    return !1
                },
                v = function(e) {
                    return "getCurrentPage" === e
                },
                g = function() {
                    function e(t) {
                        var n = this;
                        o(this, e), u.forEach(function(e) {
                            var o = function() {
                                var n = (t[e] || i.noop).bind(this);
                                Reporter.__route__ = "App", Reporter.__method__ = e, (0, i.info)("App: " + e + " have been invoked");
                                try {
                                    n.apply(this, arguments)
                                } catch (t) {
                                    Reporter.thirdErrorReport({
                                        error: t,
                                        extend: "at App lifeCycleMethod " + e + " function"
                                    })
                                }
                            };
                            n[e] = o.bind(n)
                        });
                        for (var r in t) ! function(e) {
                            v(e) ? (0, i.warn)("关键字保护", "App's " + e + " is write-protected") : h(e) || ("[object Function]" === Object.prototype.toString.call(t[e]) ? n[e] = function() {
                                var n;
                                Reporter.__route__ = "App", Reporter.__method__ = e;
                                try {
                                    n = t[e].apply(this, arguments)
                                } catch (t) {
                                    Reporter.thirdErrorReport({
                                        error: t,
                                        extend: "at App " + e + " function"
                                    })
                                }
                                return n
                            }.bind(n) : n[e] = t[e])
                        }(r);
                        this.onError && Reporter.registerErrorListener(this.onError);
                        var f = function() {
                                "hang" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).mode && (l = !0);
                                var e = (0, a.getCurrentPages)();
                                e.length && (e[e.length - 1].onHide(), (0, c.triggerAnalytics)("leavePage", e[e.length - 1], !0)), this.onHide(), (0, c.triggerAnalytics)("background")
                            },
                            g = function() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                if (0 === e.scene || "0" === e.scene ? e.scene = s : s = e.scene, e.query = e.query || {}, (0, i.hasExitCondition)(e) && (p = !0), this.onShow(e), (0, c.triggerAnalytics)("foreground"), d || e.reLaunch) d = !1;
                                else {
                                    var t = (0, a.getCurrentPages)();
                                    t.length && (t[t.length - 1].onShow(), (0, c.triggerAnalytics)("enterPage", t[t.length - 1], !0))
                                }
                            };
                        if ("undefined" != typeof __wxConfig && __wxConfig) {
                            var y = __wxConfig.appLaunchInfo || {};
                            y.query = y.query || {}, s = y.scene, (0, i.hasExitCondition)(y) && (p = !0), this.onLaunch(y), (0, c.triggerAnalytics)("launch"), g.call(this, y)
                        } else(0, i.error)("App Launch Error", "Can not find __wxConfig");
                        wx.onAppEnterBackground(f.bind(this)), wx.onAppEnterForeground(g.bind(this))
                    }
                    return r(e, [{
                        key: "getCurrentPage",
                        value: function() {
                            (0, i.warn)("将被废弃", "App.getCurrentPage is deprecated, please use getCurrentPages.");
                            var e = (0, a.getCurrentPage)();
                            if (e) return e.page
                        }
                    }]), e
                }();
            t.appHolder = (0, i.surroundByTryCatch)(function(e) {
                f = new g(e)
            }, "create app instance"), t.getApp = function() {
                return f
            }, t.getModeInHang = function() {
                return l
            }, t.getExitCondition = function() {
                return p
            }
        }]),
        Page = __appServiceEngine__.Page,
        App = __appServiceEngine__.App,
        getApp = __appServiceEngine__.getApp,
        getCurrentPages = __appServiceEngine__.getCurrentPages;
    ! function() {
        var e = {};
        define = function(t, n) {
            e[t] = {
                status: 1,
                factory: n
            }
        };
        var t = function(e) {
                var t = e.match(/(.*)\/([^\/]+)?$/);
                return t && t[1] ? t[1] : "./"
            },
            n = function(e) {
                var n = t(e);
                return function(e) {
                    if ("string" != typeof e) throw new Error("require args must be a string");
                    for (var t = [], o = (n + "/" + e).split("/"), r = 0, i = o.length; r < i; ++r) {
                        var a = o[r];
                        if ("" != a && "." != a)
                            if (".." == a) {
                                if (0 == t.length) throw new Error("can't find module : " + e);
                                t.pop()
                            } else r + 1 < i && ".." == o[r + 1] ? r++ : t.push(a)
                    }
                    try {
                        var c = t.join("/");
                        return /\.js$/.test(c) || (c += ".js"), require(c)
                    } catch (e) {
                        throw e
                    }
                }
            };
        require = function(t) {
            if ("string" != typeof t) throw new Error("require args must be a string");
            var o = e[t];
            if (!o) throw new Error('module "' + t + '" is not defined');
            if (1 === o.status) {
                var r = o.factory,
                    i = {
                        exports: {}
                    },
                    a = void 0;
                r && (a = r(n(t), i, i.exports)), o.exports = i.exports || a, o.status = 2
            }
            return o.exports
        }
    }(), wx.version = {
        updateTime: "2017.10.9 21:54:02",
        info: "",
        version: "1.6.0"
    };;
    global.App = App;
    global.Page = Page;
    global.getApp = getApp;
    global.getCurrentPages = getCurrentPages;
    global.wx = wx;
})(this);
var __WAServiceEndTime__ = Date.now();