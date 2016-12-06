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


router.get('/user', admin.show_user_manage);
router.get('/user/profile/:name', admin.show_user_profile);

/* 修改操作都需要检查权限 */
router.use('/user', admin.check_op_permission);

router.get('/user/create', admin.show_user_create);
router.post('/user/create', admin.user_create);

router.post('/user/:name', admin.update_user);
router.post('/user/create/:name', admin.create_user);
router.post('/user/delete/:name', admin.delete_user);

/* 删除 历史记录 or 政策 */
router.post('/remove', admin.remove);

router.get('/create_policy', admin.show_create_policy);
router.post('/create_policy', admin.create_policy);

router.get('/create_history', admin.show_create_history);
router.post('/create_history', admin.create_history);

module.exports = router;
