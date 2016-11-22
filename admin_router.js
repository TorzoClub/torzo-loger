const express = require('express');
const auth = require('./middlewares/auth.js');
const admin = require('./router/admin');
const router = express.Router();

// router.get('/refresh', auth.refresh);
router.get('/loginout', auth.loginout);
router.post('/login', auth.login);
router.use('/*', auth.checkLogin);

router.get('/', admin.index);

/* 删除 历史记录 or 政策 */
router.post('/remove', admin.remove);
router.post('/create_history', admin.create_history);
router.post('/create_policy', admin.create_policy);

module.exports = router;
