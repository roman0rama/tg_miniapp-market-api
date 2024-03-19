"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Promise.resolve().then(function () { return require('dotenv'); }).then(function (dotenv) {
    dotenv.config({ path: '.env.local' });
});
var https = require("https");
var express_1 = require("express");
var cors_1 = require("cors");
var user_routes_js_1 = require("./routes/user.routes.js");
var reviews_routes_js_1 = require("./routes/reviews.routes.js");
var categories_routes_js_1 = require("./routes/categories.routes.js");
var uploads_routes_js_1 = require("./routes/uploads.routes.js");
var products_routes_js_1 = require("./routes/products.routes.js");
var fs = require("fs");
var path_1 = require("path");
var __dirname = path_1.default.resolve();
var options = {
    key: fs.readFileSync(path_1.default.join(__dirname, '.cert', 'key.pem')),
    cert: fs.readFileSync(path_1.default.join(__dirname, '.cert', 'cert.pem'))
};
var app = (0, express_1.default)();
var PORT = 80;
app.use('/uploads', express_1.default.static('uploads'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', user_routes_js_1.userRouter);
app.use('/api', reviews_routes_js_1.reviewRouter);
app.use('/api', categories_routes_js_1.categoryRouter);
app.use('/api', uploads_routes_js_1.uploadsRouter);
app.use('/api', products_routes_js_1.productsRouter);
app.get('/', function (req, res) {
    var options = {
        root: path_1.default.join('src')
    };
    var fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        }
    });
});
https.createServer(options, app).listen(PORT, '127.0.0.1', function () {
    console.log("CORS-enabled HTTPS web server started at localhost on: 127.0.0.1:".concat(PORT));
});
