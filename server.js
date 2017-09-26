var app = require('express')();
var path = require('path');
var http = require('http').Server(app);



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


http.listen(3000, function () {
    console.log('Listening to port 3000');
});