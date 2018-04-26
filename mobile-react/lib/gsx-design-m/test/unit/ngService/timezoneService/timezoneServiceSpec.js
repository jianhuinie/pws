/**
 * @file ajax service
 * @author hanrui
 * @date   2015/11/03
 */
define(function (require) {
    describe('timezoneService', function() {
        require('src/ngService/timezoneService/index');
        beforeEach(module('library.services'));

        var timezoneService;
        var date;
        var zoneIndex;

        beforeEach(inject(function(_timezoneService_) {
            timezoneService = _timezoneService_;
            date = new Date('2015-10-10 00:00:00');
            zoneIndex = -8;
        }));

        describe('公共 方法', function() {
            it('equalTranfer method', function() {
                expect(timezoneService.equalTranfer).toBeDefined();
            });

            it('tranfer method', function() {
                expect(timezoneService.tranfer).toBeDefined();
            });
        });

        describe('equalTranfer 方法', function() {
            describe('非东8区', function() {
                // // 东京
                // it('东9区', function() {
                //     expect(timezoneService.equalTranfer(date, -8)).toBe(1444406400000);
                // });

                // 纽约，每年夏天固定夏令时
                describe('西5区', function() {
                    it('夏令时，减一小时', function() {
                        expect(timezoneService.equalTranfer(date, -8)).toBe(1444406400000);
                        expect(date.getTimezoneOffset() / 60).toBe(4);
                    });

                    it('非夏令时', function() {
                        var tempDate = new Date('2015-12-10 00:00:00');
                        expect(timezoneService.equalTranfer(tempDate, -8)).toBe(1449676800000);
                        expect(tempDate.getTimezoneOffset() / 60).toBe(5);
                    });
                });

            });

            // /**
            //  * 1986年至1991年，中华人民共和国在全国范围实行了六年夏时制，
            //  * 每年从4月中旬的第一个星期日2时整（北京时间）到9月中旬第一个星期日
            //  * 的凌晨2时整（北京夏令时）。除1986年因是实行夏时制的第一年，
            //  * 从5月4日开始到9月14日结束外，其它年份均按规定的时段施行。
            //  * 由于省电效果不抵需要适应时间的弊端，1992年4月5日后不再实行；
            //  */
            // describe('东8区', function() {
            //     it('夏令时，加一小时', function() {
            //         var tempDate = new Date('1986-06-19 00:00:00');
            //         expect(timezoneService.equalTranfer(tempDate, -8)).toBe(519494400000);
            //         expect(tempDate.getTimezoneOffset() / 60).toBe(-9);
            //     });

            //     it('非夏令时', function() {
            //         expect(timezoneService.equalTranfer(date, -8)).toBe(1444406400000);
            //         expect(date.getTimezoneOffset() / 60).toBe(-8);
            //     });
            // });

            // });

            // describe('tranfer 方法', function() {
            //     it('定义', function() {
            //         expect(timezoneService.tranfer).toBeDefined();
            //     });

            //     it('tranfer method', function() {
            //         expect(timezoneService.send).toBeDefined();
            //     });
            // });
        });
    });
});