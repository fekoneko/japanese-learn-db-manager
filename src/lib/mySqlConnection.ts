import { createConnection } from 'mysql2/promise';

const mySqlConnection = createConnection({
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: +(process.env.MYSQL_PORT ?? '3306'),
  database: process.env.MYSQL_DATABASE ?? 'jpldb',
  user: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? 'passwd',
});
export default mySqlConnection;
