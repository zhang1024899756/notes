//import Mongoose from 'mongoose';


let userArray = [
    {user:"zhang",password:"123456",count:8120},
    {user:"李四",password:"123456",count:2000},
    {user:"王二",password:"123456",count:820},
    {user:"麻子",password:"123456",count:526},
    {user:"吴孙",password:"123456",count:175},
    {user:"赵德",password:"123456",count:20},
    {user:"钱进",password:"123456",count:190},
]

exports.updata = (req,res) => {
    let reqSer = req.query;
    console.log('====================================');
    console.log(reqSer);
    console.log('====================================');
    for (let i = 0; i < userArray.length; i++) {
        if (reqSer.user == userArray[i].user) {
            userArray[i].count = reqSer.count
        }
        
    }
}


exports.login = (req,res) => {
    let user = req.query;
    let haveUser = false;
    for (let i = 0; i < userArray.length; i++) {
        const element = userArray[i];
        if (user.user == element.user) {
            haveUser = true;
            if (user.password == element.password) {
                res.send({user:element.user,count:element.count})
            }else {
                res.status(201).send({message:"密码错误！"})
            }
        }
    }
    if (!haveUser) {
        res.status(201).send({message:"未查找到该用户！"});
    }

}

exports.logup = (req,res) => {
    let haveUser = false;
    for (let i = 0; i < userArray.length; i++) {
        const element = userArray[i];
        if (req.body.user == element.user) {
            res.send({message:"该用户已存在！"})
            haveUser = true;
        }
        
    }
    if (!haveUser) {
        let newUser = {user:req.body.user,password:req.body.password,count:0}
        userArray.push(newUser)
        res.send({message:"注册成功！"})
    }
}

exports.list = (req,res) => {
    let resList = [];
    for (let i = 0; i < userArray.length; i++) {
        const element = userArray[i];
        let item = {user: element.user,count:element.count}
        resList.push(item);
    }
    
    res.send(ArraySort(resList))
}

function ArraySort(arr) {
　　var len = arr.length;
　　for (var i = 0; i < len; i++) {
　　　　for (var j = 0; j < len - 1 - i; j++) {
　　　　　　if (arr[j].count < arr[j+1].count) { //相邻元素两两对比
　　　　　　　　var temp = arr[j+1]; //元素交换
　　　　　　　　arr[j+1] = arr[j];
　　　　　　　　arr[j] = temp;
　　　　　　}
　　　　}
　　}
　　return arr;
}