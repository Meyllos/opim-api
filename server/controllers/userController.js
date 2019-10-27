import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserTable from "../models/userModel";
import { SUCCESS_CODE, CREATED_CODE, BAD_REQUEST_CODE , UNAUTHORIZED_CODE, INTERNAL_SERVER_ERROR_CODE} from '../constantes/statusCodes';
import Helper from '../helpers/index';
import HelperEmail from '../helpers/email';
import omit from 'object.omit';
import nodemailer from 'nodemailer';

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
   * @param {object} req
   * @param {object} res
   * @returns object
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

  /**
   * Sign in a user
   * 
   * @static
   * @param {object} req 
   * @param {object} res 
   * @return object
   * @memberof UserController
   */
  static async signin(req, res) {
    const values = [req.body.email];
    
    const result = await UserTable.match(values);

    if (result.rowCount <= 0) {
      return res.status(401).json({ status: UNAUTHORIZED_CODE, error: 'Email or Password Incorrect' });
    }

    return bcrypt.compare(req.body.password, result.rows[0].password, (err, ok) => {
      if (err) { 
        return Helper.error(res, UNAUTHORIZED_CODE, 'Something went wrong'); 
      }
      if (ok) {
        
        const { id, email, verified } = result.rows[0];
        const token = jwt.sign({ id, email}, process.env.JWT_KEY, { expiresIn: '24h' });
       
        const log = Object.assign({token, id, email});

        let message = 'logged in'; 

        if (!verified) {

          HelperEmail.sendEmail(email, token);
          message = 'An email with an activation link has been sent to your email address';
          
        }

        return Helper.ok(res, SUCCESS_CODE, log, message);
      }
      return Helper.error(res, UNAUTHORIZED_CODE, 'Email or Password Incorrect');
    });

  }
  
}

export default UserController;
