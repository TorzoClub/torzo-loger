const model = require('../../model');
const mongoose = require('mongoose');
const ObjectId = function (id) {
  return mongoose.Types.ObjectId(id);
};

const has = (obj, ...keys) => keys.every(checkey => Object.keys(obj).some(objkey => objkey === checkey));

const admin = {
  show_user_create(req, res, next) {
    res.render('show_user_create', {
      status: 'user',
      info: '填写新用户信息',
      user: req.session.user,
    });
  },
  user_create(req, res, next) {
    if (has(req.body, 'name', 'pass', 'email', 'permission')) {
      if (req.body.name.length >= 16) {
        res.render('show_user_create', {
          status: 'user',
          info: '用户名需要在 16 字以内',
          user: req.session.user,
        });
      } else if (req.body.pass.length || req.body.pass.length > 16 ) {
        res.render('show_user_create', {
          status: 'user',
          info: '密码需要在 1~16 字以内',
          user: req.session.user,
        });
      } else if (req.body.email.length < 4 || req.body.email.length > 32 ) {
        res.render('show_user_create', {
          status: 'user',
          info: '非法邮箱',
          user: req.session.user,
        });
      } else if (req.body.permission.length || is_permission_number(req.body.permission)) {

      } else {
        let user = new model.User({

        });
        user.save((err, result) => {
          if (err){
            res.end(err.toString());
          } else {
            res.redirect(`/admin/policy/${result._id}`);
          }
        });
      }
    } else {
      res.render('show_user_create', {
        status: 'user',
        info: '你似乎少填了什么',
        user: req.session.user,
      });
    }
  },
  check_op_permission(req, res, next) {
    if (req.session.user.name === 'dever') {
      next();
    } else {
      model.User.findOne()
        .where('name').equals(req.session.user.name)
        .exec(function (err, user) {
          if (err) {
            return res.end('error: ', err);
          }
          if (user !== null && user.is_op()) {
            next();
          } else {
            res.render('user_manage_deined', {
              status: 'user',
              user: req.session.user,
            });
          }
        })
      ;
    }
  },
  show_user_manage(req, res, next) {
    model.User.find()
      .sort('permission')
      .exec(function (err, users) {
        if (err) {
          return res.end('error: ', err);
        }
        res.render('user_manage', {
          status: 'user',
          user: req.session.user,
          users,
        });
      });
  },
  show_user_profile(req, res, next) {
    if (req.params.name === 'dever') {
      res.render('show_user_profile', {
        status: 'user',
        user: {
          name: req.session.user.name
        },
        profile: {
          name: req.params.name,
          permission: '开发者',
        }
      });
    } else {
      model.Policy.findOne()
        .where('name').equals(req.params.name)
        .exec(function (err, policy) {
          if (err) {
            return res.end('error: ', err)
          } else {
            res.render('show_user_profile', {
              status: 'policy',
              user: {
                name: req.session.user.name
              },
              profile: {
                name: policy.name,
                permission: policy.permission_toString(),
              },
            });
          }
        })
      ;
    }

  },
  update_user(req, res, next){},
  create_user(req, res, next){},
  delete_user(req, res, next){},

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
            user: {
              name: req.session.user.name
            },
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
          user: {
            name: req.session.user.name,
          },
        });
      });
  },
  show_create_policy(req, res, next){
    res.render('show_create_policy', {
      status: 'policy',
      user: {
        name: req.session.user.name,
      },
    });
  },
  /* 创建只能是草案 */
  create_policy(req, res, next){
    let status = 1;

    let policy = new model.Policy({
      status,
      title: req.body.title,
      uper: req.session.user.name,
      content: req.body.content,
      type: req.body.type,
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
