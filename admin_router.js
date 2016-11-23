const express = require('express');
const auth = require('./middlewares/auth.js');
const admin = require('./router/admin');
const router = express.Router();

// router.get('/refresh', auth.refresh);
router.get('/loginout', auth.loginout);
router.post('/login', auth.login);
router.use('/*', auth.checkLogin);

router.get('/', admin.index);
router.get('/policy/:policyId', admin.view_policy);
router.get('/policy', admin.show_policy);
router.get('/history', admin.show_history);

/* 删除 历史记录 or 政策 */
router.post('/remove', admin.remove);

router.get('/create_policy', admin.show_create_policy);
router.post('/create_policy', admin.create_policy);

router.get('/create_history', admin.show_create_history);
router.post('/create_history', admin.create_history);

module.exports = router;
