const model = require('../model');
const express = require('express');
const utils = require('utility');
const config = require('../config');

const trueOrFalse = () => Math.round(Math.random()),
  backCode = () => 65 + Math.floor(Math.random() * 25),
  randomChar = (lower=0) => String.fromCharCode(backCode() + (lower && 32)),
  randomString = (length, lower=0) => randomChar(lower && trueOrFalse()) + (--length ? randomString(length, lower && trueOrFalse()) : '');

const auth = (randomString, truePw, authCode) => {
  console.log(randomString, truePw, authCode);
  return authCode === utils.md5(randomString + truePw);
};

const router = {
  setRandomString(req){
    req.session.randomString = randomString(8, true);
    return req.session.randomString;
  },
  refresh(req, res, next) {
    res.end(router.setRandomString(req));
  },
  showLogin(req, res, next){

  },
  login(req, res, next) {
    delete req.session.user;

    if (req.body.user === 'dever') {
      if (!auth(req.session.randomString, config.super_pass, req.body.pass || '')) {
        res.render('show_login', {
          info: '账号/密码 错误',
          randomString: router.setRandomString(req),
        });
      } else {
        req.session.user = {
          name: 'dever',
          pw: req.body.pass,
        };
        res.redirect('/admin');
      }
    } else {
      model.User.findOne()
        .where('name').equals(req.body.user)
        .exec(function (err, policy) {
          if (err) {
            return res.end('error: ', err);
          }
          res.render('show_policy', {
            status: 'policy',
            policy,
            user: req.session.user.name,
          });
        });
    }
  },
  checkLogin(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.render('show_login', {
        info: 'session 可能过期了，或者出了什么问题，请重新登录',
        randomString: router.setRandomString(req),
      });
    }
  },
  loginout(req, res, next) {
    if (delete req.session.user) {
      res.redirect('/admin');
    } else {
      res.end('登出失败');
    }
  },
};

module.exports = router;
