import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserTable from "../models/userModel";
import { CREATED_CODE, BAD_REQUEST_CODE } from '../constantes/statusCodes';
import Helper from '../helpers/index';
import omit from 'object.omit';

dotenv.config();

/**
 * Contains user routes controllers
 *
 * @class UserController
 */
class UserController {
  /**
   * Sign up a user
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} res
   * @memberof UserController
  */
  static async signup(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPasssCode = await bcrypt.hash(req.body.password, salt);

      const user = [req.body.email, hashedPasssCode ];

      const result = await UserTable.create(user);

      if (result.error) {
        Helper.error(res, result.error.status, result.error.message);
        return;
      }

      const { id, email } = result.rows[0]; 

      const token = jwt.sign({ id, email }, process.env.JWT_KEY, {
        expiresIn: '24h'
      });

      req.body = Object.assign({ token, id , email }, omit(req.body, 'password'));

      req.body.passwordConfirmation = undefined;

      Helper.ok(res, CREATED_CODE, req.body, 'Account Successfully Created');
      
    }catch(e){
      Helper.error(res, BAD_REQUEST_CODE, 'Bad Request');
    }
  }
}

export default UserController;
