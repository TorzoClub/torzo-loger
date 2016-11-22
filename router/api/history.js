const express = require('express');
const router = express.Router();

/* 历史记录 */
router.get('/offset/:offset', (req, res, next) => {
  let offset = Number.parseInt(req.params.offset);
  if (Number.isNaN(offset)) {
    res.end('invalid offset params.');
  } else {
    res.end(`offset is ${offset}`);
  }
});


module.exports = router;
