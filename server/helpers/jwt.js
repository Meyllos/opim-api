import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class HelperJwt {
  static async extractValsFromJwtToken(token){
    return jwt.verify(token, process.env.JWT_KEY);
  }
}
export default HelperJwt;
