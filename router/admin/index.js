const model = require('../../model');
const mongoose = require('mongoose');
const ObjectId = function (id) {
  return mongoose.Types.ObjectId(id);
};

const admin = {
  remove(req, res, next){

  },
  index() {
    admin.show_policy(...arguments);
  },
  show_history(){},
  show_create_history(){},
  create_history(req, res, next){

  },
  view_policy(req, res, next){
    model.Policy.findOne()
      .where('_id').equals(ObjectId(req.params.policyId))
      .exec(function (err, policy) {
        if (err) {
          return res.end('error: ', err)
        } else {
					res.render('view_policy', {
						status: 'policy',
						user: req.session.admin.user,
						policy,
					});
        }
      })
    ;
  },
  show_policy(req, res, next){
    model.Policy.find()
      .sort('date')
      .exec(function (err, policy) {
        if (err) {
          return res.end('error: ', err);
        }
        res.render('show_policy', {
          status: 'policy',
          policy,
          user: req.session.admin.user,
        });
      });
  },
  show_create_policy(req, res, next){
    res.render('create_policy', {
      status: 'policy',
      user: req.session.admin.user,
    });
  },
  create_policy(req, res, next){
    let status = Number.parseInt(req.body.status);
    if (isNaN(status)) {
      res.end('the status is Not a Number.');
    } else {
      status = Number(Boolean(status));
    }

    let policy = new model.Policy({
      status,
      title: req.body.title,
      uper: req.session.admin.user,
      content: req.body.content,
    });

    policy.save((err, result) => {
      if (err){
        res.end(err.toString());
      } else {
        res.redirect(`/admin/policy/${result._id}`);
      }
    });

  },
};

Object.assign(exports, admin);
