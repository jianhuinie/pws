/**
 * @file ajax service
 * @author hanrui
 * @date   2015/11/03
 */
define(function (require) {
    describe('ajaxService', function() {
        require('src/ngService/ajaxService/ajaxService');
        beforeEach(module('library.services'));

        var ajaxService;
        var $http;
        var $q;
        var $cacheFactory;
        // var $cacheFactory;
        var data;
        var path;

        beforeEach(inject(function(_ajaxService_, _$http_, _$q_, _$cacheFactory_, _$timeout_) {
            ajaxService = _ajaxService_;
            $http = _$http_;
            $q = _$q_;
            $cacheFactory = _$cacheFactory_;
            path = '/GET/person/info.do';
            data = {
                name: 'js-library',
                author: 'hr'
            };
          // sinon.stub($log, 'warn', function() {});
        }));

        describe('public method', function() {
            it('send method', function() {
                expect(ajaxService.send).toBeDefined();
            });

            it('clearCache method', function() {
                expect(ajaxService.clearCache).toBeDefined();
            });
        });

        describe('case: method', function() {
            it('POST method', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 200}');

                ajaxService
                  .send(path)
                  .then(function(data) {
                      expect(data.data).toBeTruthy();
                  });

                $httpBackend.flush();
            }));

            it('GET method', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('GET', path)
                    .respond(200, '{"data": true, "status": 200}');

                ajaxService
                  .send(path, { method: 'GET' })
                  .then(function(data) {
                      expect(data.data).toBeTruthy();
                  });

                $httpBackend.flush();
            }));

            it('', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('GET', path)
                    .respond(200, '{"data": true, "status": 200}');

                ajaxService
                  .send(path, { method: 'GET' })
                  .then(function(data) {
                      expect(data.data).toBeTruthy();
                  });

                $httpBackend.flush();
            }));
        });

        describe('case: isResponseFilter', function() {
            it('isResponseFilter=true', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": "�nr\u0002\b &nbsp", "status": 200}');

                ajaxService
                  .send(path, { isResponseFilter: true })
                  .then(function(data) {
                      expect(data.data).toContain('&nbsp');
                  });

                $httpBackend.flush();
            }));

            // it('isResponseFilter=false', inject(function (ajaxService, $httpBackend) {
            //     $httpBackend
            //         .expect('POST', path)
            //         .respond(200, '{"data": "�nr\u0002\b &nbsp", "status": 200}');

            //     try {
            //         ajaxService
            //           .send(path);
            //     } catch (e) {
            //         console.log(e);
            //         expect(1).toBe(1);
            //     }
            //     // expect(temp()).toThrow();

            //     $httpBackend.flush();
            // }));
        });

        describe('status', function() {
            it('200', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 200}');

                ajaxService
                  .send(path)
                  .then(function (data) {
                      expect(data.status).toBe(200);
                  }, function () {
                      expect(data).toThrow(400);
                  });

                $httpBackend.flush();
            }));

            it('300', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 300}');

                ajaxService
                  .send(path, {
                      partSuccessHandler: function (data) {
                          expect(data.status).toBe(300);
                      }
                  });

                $httpBackend.flush();
            }));

            it('400', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 400}');

                ajaxService
                  .send(path)
                  .then(function (data) {
                      expect(data.data).toContain('&nbsp');
                  }, function (data) {
                      expect(data.status).toBe(400);
                  });

                $httpBackend.flush();
            }));

            it('500', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 500}');

                ajaxService
                  .send(path);

                $httpBackend.flush();
            }));

            it('700', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 700}');

                ajaxService
                  .send(path);

                $httpBackend.flush();
            }));
        });

        describe('content type', function() {
            it('text', inject(function (ajaxService, $httpBackend) {
                $httpBackend
                    .expect('POST', path, function (data) {
                        // console.log(data);
                        // 'name=js-library&author=hr'
                        expect(data).toBe('name=js-library&author=hr');
                        return data;
                    })
                    .respond(200, '{"data": true, "status": 200}');

                ajaxService
                  .send(path, {
                      data: data,
                      contentType: 'application/x-www-form-urlencoded',
                      transformRequest: function(obj) {
                          // console.log(obj);
                          obj = JSON.parse(obj);
                          var str = [];
                          for (var p in obj) {
                              if (obj.hasOwnProperty(p)) {
                                  if (obj[p] && Object.prototype.toString.call(obj[p]) === '[object Object]') {
                                      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(JSON.stringify(obj[p])));
                                  } else {
                                      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                                  }
                              }
                          }
                          return str.join('&');
                      }
                  });

                $httpBackend.flush();
            }));
        });
        
        describe('cache', function() {
            var cache;
            var params;
            beforeEach(inject(function ($cacheFactory) {
                cache = $cacheFactory('js-library-' + new Date().getTime());
                params = {
                    data: data,
                    cache: cache
                };
                var key = path + '_' + JSON.stringify(params);
                cache.put(key, {
                    data: {
                      "data": false,
                      "status": 200
                    },
                    createTime: new Date().getTime()
                });
            }));

            it('Get', inject(function (ajaxService, $httpBackend, $cacheFactory) {
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 200}');

                ajaxService
                    .send(path, params)
                    .then(function (data) {
                        expect(data.data).toBe(false);
                        ajaxService.clearCache();
                    });

                // $httpBackend.flush();
            }));

            // timeout风险
            it('timeout', inject(function (ajaxService, $httpBackend, $cacheFactory, $timeout) {
                // ajaxService.clearCache();
                $httpBackend
                    .expect('POST', path)
                    .respond(200, '{"data": true, "status": 200}');

                $timeout(function () {
                    params.cacheExpires = 100;
                    ajaxService
                        .send(path, params)
                        .then(function (data) {
                            expect(data.data).toBe(true);
                        });
                    $httpBackend.flush();
                }, 200);
            }));
        });
    });
});