const express = require("express");

const router = express.Router();

const {
    get_login,
    post_login,
    get_logout,
    get_signup,
    post_signup,
} = require("../controllers/users.controller");

router.get("/login", get_login);
router.post("/login", post_login);
router.get("/logout", get_logout);
router.get("/signup", get_signup);
router.post("/signup", post_signup);

module.exports = router;
