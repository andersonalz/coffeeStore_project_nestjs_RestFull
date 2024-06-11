module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'pass1234',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  magrations: ['dist/magrations/*.js'],
  cli: {
    dir: 'src/magrations',
  },
};
