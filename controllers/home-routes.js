const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'comment',
      'created_at',
      'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('home', {
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {

  res.render('signup')
});

router.get('/dashboard', withAuth, (req, res) => {

  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',

    ]
  })
    .then(dbPostData => {
      const title = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        title
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/dashboard/post-update/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['title', 'comment']
  })
    .then(dbPostData => {
      const upPost = dbPostData.get({ plain: true });
      res.render('update-post', {
        upPost
      });
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})

router.get('/dashboard/create', withAuth, (req, res) => {
  res.render('add-post')
});


router.get('/post/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'comment',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['comment_text', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Post Found!' });
        return;
      }
      const info = dbPostData.get({ plain: true });
      res.render('single-post', {
        info,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

});

module.exports = router;