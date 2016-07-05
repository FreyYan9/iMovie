var express = require("express");
var mongoDB = require("mongoose");
var mongoStore = require("connect-mongo")(express);
var path = require("path");



var port = process.env.PORT || 3000;
var app = express();
var server = app.listen(port);
var date = getDate();
 
app.set("views","./app/views/pages");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.bodyParser());	
app.use(express.cookieParser());
app.use(express.session({
	secret : "iMovie",
	store : new mongoStore({
		url : "mongodb://127.0.0.1:27017/iMovie",
		collection : "iMovie-sessions"
	})
}));

mongoDB.connect("mongodb://127.0.0.1:27017/iMovie");

require("./config/routes")(app);

if("development" === app.get("env")){
	// app.set("showStackError", true);
	// app.use(express.logger(":method :url :status"));
	app.locals.pretty = true;
	// mongoDB.set("debug",true);
}





console.log("restart app.js         " + date);













































function getDate(){
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentTime = "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " + this.day;
	// alert(currentTime);
	return this.hour +  ":" + this.minute + ":" + this.second;
}