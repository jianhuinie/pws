var Observer = (function () {
    var __message = {};
    return {
        register: function (event, handler) {
            if (!__message[event]) {
                __message[event] = [handler];
            }
            else {
                __message[event].push(handler);
            }
        },
        fire: function (event) {
            var events =  __message[event];
            var eventsLength = events ? events.length : 0;
            if (eventsLength) {
                for (var i = 0; i < eventsLength; i++) {
                    events[i].apply(this, arguments);
                }
            }
        },
        remove: function (event, handler) {  
            var events =  __message[event];
            var eventsLength = events ? events.length : 0;
            if (eventsLength) {
                for (var i = 0; i < eventsLength; i++) {
                    if (events[i] === handler) {
                        events.splice(i, 1);
                    }
                }
            }
        }
    }
})();
Observer.register('hello', function () {  
    console.log(Array.prototype.slice.call(arguments, 0));
});
Observer.fire('hello', 1, 2, 3);

//学生类
function Student(result) {
    this.result = result;
    var that = this;
    this.say = function () {
        console.log(that.result);
    }
}
Student.prototype.answer = function (question) { 
    var that = this;
    Observer.register(question, that.say);
}

Student.prototype.sleep = function (question) {
    var that = this; 
    Observer.remove(question, that.say);
}

//老师类
function Teacher() {

}
Teacher.prototype.ask = function (question) {
    Observer.fire(question);
}

var stu1 = new Student('stu1 回答问题');
var stu2 = new Student('stu2 回答问题');
var stu3 = new Student('stu3 回答问题');
stu1.answer('这是什么?');
stu2.answer('这是什么?');
stu3.answer('这是什么?');
stu2.sleep('这是什么?');
var teacher = new Teacher();
teacher.ask('这是什么?');