/**
 * loading的单测用例
 * @author hanrui
 * @date   2015/11/04
 */
define(function (require) {
    describe('loading-directive', function() {

        require('src/ngDirective/loading/directive');
        beforeEach(module('library.directives'));

        var element;
        var outerScope;
        var innerScope;
        var source;
        var compile;

        beforeEach(inject(function ($rootScope, $timeout, $compile) {
            element = angular.element('<loading ng-model="isLoading" is-full-screen="isFullScreen" is-resize="isResize" img-url="imgUrl" z-index="zIndex"></loading>');
            outerScope = $rootScope;
            compile = $compile;
            $compile(element)(outerScope);
            innerScope = element.isolateScope();
            outerScope.$digest();
        }));

        describe('isLoading=false', function () {
            beforeEach(function () {
                outerScope.$apply(function () {
                    outerScope.isLoading = false;
                });
            });

            it('hide', function () {
                // console.log(element[0]);
                expect(element.hasClass('ng-hide')).toBe(true);
            });
        });

        describe('isLoading=true', function () {
            beforeEach(function () {
                outerScope.$apply(function () {
                    outerScope.isLoading = true;
                });
            });

            it('hide', function () {
                // console.log(element[0]);
                expect(element.hasClass('ng-hide')).toBe(false);
            });
        });

        // describe('zIndex=20', function () {
        //     beforeEach(function () {
        //         outerScope.$apply(function () {
        //             outerScope.zIndex = 20;
        //             outerScope.imgUrl = 'http://www.d1net.com/statics/images/icon/loading_more.gif';
        //             compile(element)(outerScope);
        //         });
        //     });

        //     it('hide', function () {
        //         console.log(element);
        //         var backdrop = angular.element(element.children()[0]);
        //         expect(backdrop.attr('style')).toContain('z-index: 20');
        //     });
        // });
    });
});