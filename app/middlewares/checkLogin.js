const jwt = require('jsonwebtoken');
const {
  users,
} = require('../models');
const {
  resultFormat,
} = require('../helpers/formHelper');

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
    if (!token) {
      res.json(resultFormat(false, '토큰이 없습니다.', token));
      return;
    }
    const user = await users.findOne({
      where: {
        token,
      }
    });
    if(!user) {
      res.json(resultFormat(false, '토큰이 올바르지 않습니다.', token));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.json(resultFormat(false, '에러 발생.', error));
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.Authorization;
    if (token) {
      res.json(resultFormat(false, '토큰이 있는데요?', token));
      return;
    }
    next();
  } catch (error) {
    res.json(resultFormat(false, '에러 발생.', error));
  }
};
