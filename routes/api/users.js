const express = require('express');
const { validation, ctrlWrapper, auth, upload } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const {
  userSchema,
  userStatusSchema,
  verifyEmailSchema,
} = require('../../models');

const validateMiddlwarePost = validation(
  userSchema,
  'Помилка від Joi або іншої бібліотеки валідації'
);

const validateMiddlwarePatch = validation(
  userStatusSchema,
  'Помилка від Joi або іншої бібліотеки валідації'
);

const validateMiddlwarePostEmail = validation(
  verifyEmailSchema,
  'missing required field email'
);

const router = express.Router();

router.post('/register', validateMiddlwarePost, ctrlWrapper(ctrl.register));
router.post('/login', validateMiddlwarePost, ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post(
  '/verify',
  validateMiddlwarePostEmail,
  ctrlWrapper(ctrl.resendVerifyEmail)
);
router.patch(
  '/',
  auth,
  validateMiddlwarePatch,
  ctrlWrapper(ctrl.updateStatusUser)
);
router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
