var fetch = require('node-fetch');

function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}
var g = gen();
var response = g.next();

response.value
    // .then(function(data) {
    //     return data.json();
    // })
    .then(function(data) {
        console.log(data);
        g.next(data);
    });