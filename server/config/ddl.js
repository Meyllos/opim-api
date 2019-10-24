// eslint-disable-next-line import/prefer-default-export
export const createUsersTable = 'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,email varchar(100) NOT NULL UNIQUE,password varchar(120) NOT NULL,verified boolean DEFAULT false);';
