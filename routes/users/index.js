const express = require("express");
const router = express.Router();
const {
  validateUserRegistration,
  validateUserLoggingIn,
  validateUpdatingUserSubscription,
  validateUserVerification,
} = require("./usersValidation");
const {
  registration,
  logIn,
  logOut,
  getCurrent,
  updateSubscription,
  updateAvatar,
  emailVerify,
  repeatEmailVerify,
} = require("../../controllers/usersController");
const guard = require("../../helpers/guard");
const uploadAvatar = require("../../helpers/uploadAvatar");

router.patch("/", guard, validateUpdatingUserSubscription, updateSubscription);
router.post("/signup", validateUserRegistration, registration);
router.post("/login", validateUserLoggingIn, logIn);
router.post("/logout", guard, logOut);
router.get("/current", guard, getCurrent);
router.patch("/avatars", guard, uploadAvatar.single("avatar"), updateAvatar);

router.get("/verify/:verificationToken", emailVerify);
router.post("/verify", validateUserVerification, repeatEmailVerify);
module.exports = router;
