export const config = {
  database: {
    database: 'bookSystem',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PSW as string
  }
}