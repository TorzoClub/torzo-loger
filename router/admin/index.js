const model = require('../../model');

Object.assign(exports, {
  index(req, res, next) {
    model.History.find({ occupation: /host/ })
      .where('type').equals('policy')
      .exec(function (err, policy) {
        if (err) {
          res.end('error: ', err);
        }
        res.render('admin', {
          user: req.session.admin.user,
          policy,
        });
      })

  },
  remove(req, res, next){

  },
  create_history(req, res, next){

  },
  create_policy(req, res, next){

  },
});
