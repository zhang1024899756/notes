let Express = require('express');
let bodyParser = require('body-parser');


let port = process.env.port || 8082;
//let dbUrl = 'mongodb://localhost:27017/..';
let app = Express();

//连接数据库


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//跨域
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(require('./routes.js'));

app.listen(port,() => {
    console.log('====================================');
    console.log("服务在..." + port + "...端口运行.....");
    console.log('====================================');
});