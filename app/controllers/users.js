const express = require('express');

const {
  resultFormat,
} = require('../helpers/formHelper');
const {
  isLoggedIn,
  isNotLoggedIn,
} = require('../middlewares/checkLogin');
const {
  users,
} = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const user = await users.findAll({});
    console.log(user);
    res.json(resultFormat(true, null, user));
  } catch (error) {
    res.json(resultFormat(false, error.message));
  }
});

router.post('/', isNotLoggedIn, async (req, res) => {
  try {
    const exUsers = await users.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (exUsers) {
      res.json(resultFormat(400, '이미 가입 된 유저 name 입니다.'));
      return;
    }
    await users.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.json(resultFormat(true, null));
  } catch (error) {
    res.json(resultFormat(false, error.message));
  }
});

router.put('/', isLoggedIn, async (req, res) => {
  try {
    await sers.update({
      password : req.body.password,
    }, {
      where: {
        id,
      },
    });
  } catch (error) {
    res.json(resultFormat(false, error.message));
    return;
  }
  res.json(resultFormat(true, null));
});

router.delete('/', isLoggedIn, async (req, res) => {
  try {
    await users.findOne({
      where: {
        id,
      },
    });
  } catch (error) {
    res.json(resultFormat(false, error.message));
    return;
  }
  res.json(resultFormat(true, null));
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const user = await users.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(resultFormat(true, null, user));
  } catch (error) {
    res.json(resultFormat(false, error.message));
  }
});

module.exports = router;
