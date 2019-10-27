import express from 'express';
import UserController from '../../controllers/userController';
import UserValidations from '../../middlewares/validations';

const router = express.Router();

router.route('/signup')
  .post(UserValidations.signup, UserController.signup);

router.route('/signin')
  .post(UserValidations.signin, UserController.signin);

router.route('/email-verification')
  .patch(UserController.emailVerification);
export default router;
