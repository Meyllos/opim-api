import { Pool } from 'pg';
import DB_URL from '../config';

const db = new Pool({ connectionString: DB_URL });

const drop = {
	table: async (query) => { return  await db.query(query); },
	truncate: async query => db.query(query)
};
  
const create = {
	table: async query => db.query(query)
};

export { db, create, drop };
