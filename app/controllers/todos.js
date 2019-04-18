const express = require('express');

const { todos } = require('../models');
const { resultFormat } = require('../helpers/formHelper');
const { isLoggedIn } = require('../middlewares/checkLogin');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  const result = await todos.findAll({
    where: {
      userId: req.user.id
    }
  });
  res.json(resultFormat(true, null, result));
});

router.post('/', isLoggedIn, async (req, res) => {
  const {
    title,
    content,
  } = req.body;
  const result = await db.todos.create({
    title,
    content,
  });
  res.json(resultFormat(true, null, result));
});

router.put('/:id', isLoggedIn, async (req, res) => {
  const {
    title,
    content,
  } = req.body;
  const check = req.body.check === true ? 1 : 0;
  const result = await db.todos.update(
    {
      title,
      content,
      check,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );
  res.json(resultFormat(true, null, result));
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  const {
    id,
  } = req.params;
  const result = await db.todos.destroy({
    where: {
      id,
    },
  });
  res.json(resultFormat(true, null, result));
});

router.get('/:id', async (req, res) => {
  const result = await db.todos.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.json(resultFormat(true, null, result));
});

// router.get('/userName/:userName', async (req, res) => {
//   const result = await db.todos.findAll({where: {
//     userName: req.params.userName,
//   }});
//   res.json(resultFormat(true, null, result));
// });

module.exports = router;
