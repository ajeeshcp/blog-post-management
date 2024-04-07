module.exports = app => {
  const { validationResult } = require("express-validator");
    var router = require("express").Router();
    const users = require('./controller');
    const valdation = require('./validation.rules');
    const checkValidation = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
          return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
  
    router.post("/register", valdation.validate('create'), checkValidation, users.register);

    router.post("/login", valdation.validate('login'), checkValidation, users.login);
  
    app.use("/api/", router);
  };