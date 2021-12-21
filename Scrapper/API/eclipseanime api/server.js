var express = require('express'),
    app = express(),
    port = process.env.PORT || 4000;

app.listen(port);
console.log('ECLIPSE ANIME API started at ' + port);