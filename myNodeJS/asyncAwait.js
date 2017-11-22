var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
var start = async function () {
    console.log(123);
    await sleep(3000);
    console.log(666);
}
start();