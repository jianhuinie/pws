/**
 * The test of strings.js
 *
 * @author yangji01@baidu.com
 */

define(function (require) {
    function getTestName(name) {
        return 'stringsTest - ' + name;
    }

    var strings = require('src/util/strings');

    describe(getTestName('strings.escapeHTML'), function () {
        it('escape html string test', function () {
            expect(strings.escapeHTML('<span>&test"</span>'))
                .toBe('&lt;span&gt;&amp;test&quot;&lt;/span&gt;');
        });
    });

    describe(getTestName('strings.unescapeHTML'), function () {
        it('unescape html string test', function () {
            expect(strings.unescapeHTML(
                '&lt;span&gt;&amp;test&quot;&lt;/span&gt;'))
                .toBe('<span>&test"</span>');
        });
    });

    describe(getTestName('strings.escapeQuote'), function () {
        it('escape quote string test', function () {
            expect(strings.escapeQuote('"test\'')).toBe('&quot;test&#39;');
        });
    });

    describe(getTestName('strings.getLength'), function () {
        it('empty string', function () {
            expect(strings.getLength('')).toBe(0);
        });

        it('pure chinese character', function () {
            expect(strings.getLength('汉字')).toBe(4);
        });

        it('pure english character', function () {
            expect(strings.getLength('abc;,.')).toBe(6);
        });

        it('chinese character and english character', function () {
            expect(strings.getLength('汉字abc')).toBe(7);
        });
    });

    describe(getTestName('strings.subString'), function () {
        it('pure chinese character', function () {
            expect(strings.subString('汉字汉字', 2)).toBe('汉');
        });

        it('pure english character', function () {
            expect(strings.subString('abc;,.', 3)).toBe('abc');
        });

        it('chinese character and english character', function () {
            expect(strings.subString('abc汉字', 6)).toBe('abc汉');
        });
    });

    describe(getTestName('strings.getCutString'), function () {
        it('pure chinese character', function () {
            expect(strings.getCutString('汉字汉字', 2)).toBe('汉..');
        });

        it('pure english character', function () {
            expect(strings.getCutString('abc;,.', 3)).toBe('abc..');
        });

        it('chinese character and english character', function () {
            expect(strings.getCutString('abc汉字', 6)).toBe('abc汉..');
        });

        it('has tail string', function () {
            expect(strings.getCutString('abc汉字', 6, '#$%')).toBe('abc汉#$%');
        });
    });

    describe(getTestName('strings.addSlashes'), function () {
        it('add slashes after quote string test', function () {
            expect(strings.addSlashes('"test\'')).toBe('\\\\\"test\\\\\'');
        });
    });

    describe(getTestName('strings.insertWbr'), function () {
        it('inert wbr', function () {
            expect(strings.insertWbr('test'))
                .toBe('t<wbr>e<wbr>s<wbr>t<wbr>');
        });
    });

    describe(getTestName('strings.upperCaseFirstChar'), function () {
        it('upperCaseFirstChar', function () {
            expect(strings.upperCaseFirstChar('test')).toBe('Test');
        });
    });

    describe(getTestName('strings.getWordsFromString'), function () {
        it('getWordsFromString', function () {
            expect(strings.getWordsFromString('test\na\nb'))
                .toEqual(['test', 'a', 'b' ]);
        });
    });

    describe(getTestName('strings.getDisplayWidth'), function () {
        it('has no style', function () {
            expect(strings.getDisplayWidth('test'))
                .toBeGreaterThan(0);
        });
        it('has style', function () {
            expect(strings.getDisplayWidth('test', {'font-size': '100px'}))
                .toBeGreaterThan(100);
        });
    });

    describe(getTestName('strings.cutStringByWidth'), function () {
        it('has no style', function () {
            $('#string-hidden-span').css({'font-size': ''});
            expect(strings.cutStringByWidth('test', 100))
                .toBe('test');
        });
        it('has style', function () {
            expect(strings.cutStringByWidth('test',
                100, '#', {'font-size': '100px'})).toBe('te#');
            expect(strings.cutStringByWidth('汉字test',
                100, '#', {'font-size': '100px'})).toBe('汉#');
        });
    });
});
