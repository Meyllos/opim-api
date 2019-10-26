import Joi from '@hapi/joi';
import Helper from '../helpers/index';
/**
 * Contains validations for user endpoints
 *
 * @class UserValidations
*/
class UserValidations {
  /**
   * Validates the signup body
   *
   * @static
   * @param {object} req
   * @param {objetc} res
   * @param {object} next
   * @returns object
   * @memberof UserValidations
  */
  static signup(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(50).required(),
      passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'does not match' } } })
    });

    const { error } = Joi.validate(req.body, schema);

    if (!error) {
      return next();
    }
    return Helper.joiError(res, error);
  }

  /**
   * Validates the signin body
   *
   * @static
   * @param {object} req
   * @param {objetc} res
   * @param {object} next
   * @returns object
   * @memberof UserValidations
  */

  static signin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(50).required()
    });

    const { error } = Joi.validate(req.body, schema);

    if (!error) {
      return next();
    }
    return Helper.joiError(res, error);
  }
}

export default UserValidations;
