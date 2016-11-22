const express = require('express');
const router = express.Router();
const historyRouter = require('./router/api/history');

/* 历史记录 */
router.use('/history', historyRouter);
/* 获取 草案&结案 */
router.get('/policy', (req, res, next) => {
  
});

module.exports = router;
