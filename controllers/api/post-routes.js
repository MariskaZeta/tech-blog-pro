const router = require("express").Router();
const {
  Post,
  User,
  Comment
} = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// this route will GET all posts
router.get("/", (req, res) => {
  Post.findAll({
      attributes: ["id", "content", "title", "created_at"],
      order: [
        ["created_at", "DESC"]
      ],
      include: [{
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route will GET a single post by id
router.get("/:id", (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
      include: [{
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id!"
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route will be for users to POST/create a post
router.post("/", withAuth, (req, res) => {
  console.log("creating");
  Post.create({
      title: req.body.title,
      content: req.body.post_content,
      user_id: req.session.user_id
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is for users to PUT/update a post by id
router.put("/:id", withAuth, (req, res) => {
  Post.update({
      title: req.body.title,
      content: req.body.post_content,
    }, {
      where: {
        id: req.params.id,
      }
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id!"
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is to DELETE/destroy a post by id
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id!"
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
