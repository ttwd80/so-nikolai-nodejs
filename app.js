var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

//Crypto
var Crypto = require('crypto-js');

// routes
app.get('/getSignature', function(req, res) {
    var key = req.param('key');
    var dateStamp = req.param('dateStamp');
    var regionName = req.param('regionName');
    var serviceName = req.param('serviceName');

    var kDate = Crypto.HMAC(Crypto.SHA256, dateStamp, "AWS4" + key, {asBytes: true});
    var kRegion = Crypto.HMAC(Crypto.SHA256, regionName, kDate, {asBytes: true});
    var kService = Crypto.HMAC(Crypto.SHA256, serviceName, kRegion, {asBytes: true});
    var kSigning = Crypto.HMAC(Crypto.SHA256, "aws4_request", kService, {asBytes: true});
    res.send(key + ' ' + dateStamp + ' ' + regionName + ' ' + serviceName + ' ' + kSigning);

});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
