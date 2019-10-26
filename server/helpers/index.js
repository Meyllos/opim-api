import { BAD_REQUEST_CODE } from '../constantes/statusCodes';

/**
 * Contains helper methods
 *
 * @class
 */
class Helper {
  /**
   * Success Hedear Model 
   * @static
   * @param {object} res
   * @param {string} statusCode
   * @param {object | array} data
   * @param {string} message
   * @return {object} res
   * @memberof Helper
   */
  static ok(res, statusCode, data, message) {
    const body = {
      status: statusCode,
      message,
      data
    };
    return res.status(statusCode).json(body);
  }

  /**
   * @Hapi/Joi Error Hedear Model
   * @static
   * @param {object} res
   * @param {object} error
   * @return {object} res
   * @memberof Helper
   */
  static joiError(res, error) {
    const body = {
      status: 422,
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
    };
    return res.status(422).json(body);
  }

  /**
   * Error Hedear Model
   * @static
   * @param {object} res
   * @param {string} statusCode
   * @param {object} error
   * @return {object} res
   * @memberof Helper
   */
  static error(res, statusCode, error) {
    const body = {
      status: statusCode,
      error
    };
    return res.status(statusCode).json(body);
  }
}

export default Helper;
