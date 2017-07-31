step1(function (value1) {
    step2(value1, function(value2) {
        step3(value2, function(value3) {
            step4(value3, function(value4) {
                //TODO
            });
        });
    });
});

Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) {
        //TODO
    })
    .done();

function* longRunningTask(value1) {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // TODO
}

function scheduler(task) {
    var taskObj = task.next(task.value);
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}
scheduler(longRunningTask(1));

// var lt = longRunningTask(1);
// var res = lt.next();
// while(!res.done) {
//     res = res.next(res.value);
// }