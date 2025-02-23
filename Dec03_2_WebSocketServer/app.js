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

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen("포트번호"); // WAS용

// 웹소켓 포트번호 세팅
var io = require("socket.io")();
io.listen("포트번호"); // 웹소켓 포트번호
// 웹소켓 서비스 시작
// 자동으로 생김
// http://주소:포트/socket.io/socket.io.js -> 확인하는법
// 그리고 이걸 html에서 사용하기위한 세팅 가서 하기

// 함수 vs 메서드
// 함수 : 기능들의 모음
// 메서드 : 객체의 행동 (객체.메서드명 : 주어.동사)
// 문법
//    주어
//      io.sockets : 연결된 모든 socket들
//      socket : 그 socket 하나
//    동사
//      emit("제목", 내용) : 보내기
//      on("제목", 콜백함수) : 받기

io.sockets.on("connection", function (socket) {
	console.log("접속");
    socket.on("myTxt", function (txt) {
		console.log(txt);
        io.sockets.emit("serverTxt", txt);
    });
	socket.on("myDrawData", function(txt){
		io.sockets.emit("serverDrawData", txt);
	})
});



// Java
//    Thread 개수 고려해야함
//    통일된 시스템 : ex)Stream 시리즈들..
// Node.js
//    콜백함수기때문에 신경안써도됨
//    웹 소켓만을 위한 문법이 따로 있음

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
