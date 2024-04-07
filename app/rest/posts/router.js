const { validationResult } = require("express-validator");
const { authenticate } = require("../middlewares/authentication");

module.exports = app => {
    const router = require("express").Router();
    const post = require('./controller');
    const valdation = require('./validation.rules');
    const checkValidation = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
          return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
  
    router.post("/", authenticate, valdation.validate('create'), checkValidation, post.create);
    router.get("/", valdation.validate('getAll'), checkValidation, post.getAll);
    router.put("/:id", authenticate, valdation.validate('update'), checkValidation, post.update);
    router.get("/:id", valdation.validate('getOne'), checkValidation, post.getOne);
    router.delete("/:id", authenticate, valdation.validate('delete'), checkValidation, post.delete);

    router.post("/:id/comment", authenticate, valdation.validate('comments'), checkValidation, post.createComment);
    router.get("/:id/comment", valdation.validate('getComments'), checkValidation, post.getComments);
  
    app.use("/api/posts", router);
  };