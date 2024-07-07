import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass1234',
  database: 'postgres',
  entities: ['dist/**/**.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!')
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err)
//   })

// module.exports = {
//   // migrationsTableName: 'migrations',
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'pass1234',
//   database: 'postgres',
//   // logging: false,
//   // synchronize: false,
//   // name: 'default',
//   entities: ['dist/**/**.entity{.ts,.js}'],
//   migrations: ['dist/migrations/**/*{.ts,.js}'],
//   subscribers: ['src/subscriber/**/*{.ts,.js}'],
//   cli: {
//     migrationsDir: './src/migrations',
//   }
// }
