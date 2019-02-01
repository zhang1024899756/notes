let Express = require('express');
let router = Express.Router();

let User = require('./controllers/User');


router.get('/login',User.login);
router.post('/logup',User.logup);
router.get('/list',User.list);
router.post('/updata',User.updata);


module.exports = router;
