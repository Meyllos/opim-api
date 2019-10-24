import { pool, creator } from './index';
import { createUsersTable } from '../config/ddl';

class UserTable {
  /**
   * insert method - use to register a new user
   * @param {array} values 
   */
  static async create(values){
    try {
      await creator.createTable(createUsersTable);   
      
      const exist = await pool.query(`SELECT * FROM users WHERE email = $1 `, [values[0]]);

      if (exist.rowCount > 0) {
        return { error: { status: 409, message: 'Email already exists' } };
      }

      const result = await pool.query(`INSERT INTO users (email,password) VALUES($1, $2) RETURNING id, email`, values);

      return result;

    } catch (e) {
      return { error: { status: 500, message: e.message, err: e } };
    }
  }
}

export default UserTable;
