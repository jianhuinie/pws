/**
 * ngDirective/parseRmb.js单元测试
 * @author XiaoBin Li
 */

define(function (require) {

    'use strict';

    describe('autoComplete', function() {

        require('src/ngDirective/module');
        require('src/ngDirective/autoComplete/directive');
        beforeEach(module('library.directives'));

        var $compile = null;
        var $scope = null;
        var $timeout = null;
        var $httpBackend = null;

        beforeEach(inject(function(_$compile_, $rootScope, _$timeout_, _$httpBackend_) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
        }));

        describe('Render', function() {
            it('should render input element with given id plus -value', function() {
                var template = '<input id="{{id}}-value" ng-model="searchStr" type="text" placeholder="{{placeholder}}">';
                var element = angular.element('<div><autoComplete template-url="/tpl.html" id="test"></autoComplete></div>');
                $httpBackend.whenGET('/tpl.html').respond(template);
                $compile(element)($scope);
                $httpBackend.flush();
                $scope.$digest();
                expect($(element).find('#test-value').length).toBe(1);
            });
        });

    });
});