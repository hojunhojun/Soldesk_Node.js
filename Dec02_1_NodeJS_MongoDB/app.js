var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 줄 이동 : alt + 위/아래
// 줄 복사 : shitf + alt + 위/아래
// 줄 삭제 : ctrl + shift + k
// 정렬 : alt + shift + f

app.listen("#포트번호");
app.get("/te.st", function (request, response) {
    response.send("hi");
});

// RESTful
// 게시판 관련 CRUD작업 요청해서 XML/JSON기반 처리
app.get("/snack.get", function(request, response) {
    var db = require("mongojs")("IP주소/DB명", ["dec02_snack"]); // 연결법
    // Node.js(JavaScript) +  MongoDB(JavaScript)
    // mongojs : MongoDB 명령이 여기서 그대로 쓰게 + 콜백함수
    db.dec02_snack.find(function(err, result) { // 에러객체, 결과객체
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send(result);
    });
});

app.get("/snack.reg", function(request, response) {
    var db = require("mongojs")("IP주소/DB명", ["dec02_snack"]); // 연결법
    var n = request.query.name;
    var p = request.query.price * 1;

    db.dec02_snack.insertOne({s_name : n, s_price : p}, function(err, result) { // 에러객체, 결과객체
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.send(result);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
