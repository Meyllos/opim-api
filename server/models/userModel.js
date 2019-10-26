import { db, create } from './index';
import { users } from '../config/ddl';
import { RESOURCE_CONFLICT, INTERNAL_SERVER_ERROR_CODE } from '../constantes/statusCodes';

class UserTable {
  /**
   * insert method - use to register a new user
   * @param {array} values 
   */
  static async create(values){
    try {
      await create.table(users);   
      
      const exist = await db.query(`SELECT * FROM users WHERE email = $1 `, [values[0]]);

      if (exist.rowCount > 0) {
        return { error: { status: RESOURCE_CONFLICT, message: 'Email already exists' } };
      }

      const result = await db.query(`INSERT INTO users (email,password) VALUES($1, $2) RETURNING id, email`, values);

      return result;

    } catch (e) {
      return { error: { status: INTERNAL_SERVER_ERROR_CODE, message: e.message, err: e } };
    }
  }
  /**
   * select user from database
   * @param {array} values 
   */
  static async match(values) {
    return db.query('SELECT * FROM users WHERE email=$1', values);
  }
}

export default UserTable;
