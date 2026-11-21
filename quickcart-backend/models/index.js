import { Sequelize } from 'sequelize';
import sqlJsAsSqlite3 from 'sql.js-as-sqlite3';
import fs from 'fs';

export let sequelize;

if (process.env.DATABASE_URL) {
  // Production: Neon PostgreSQL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  console.log('Using Neon PostgreSQL database');

} else if (process.env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL is missing in production!');

} else {
  // Local development: SQLite
  sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlJsAsSqlite3,
    logging: false
  });

  console.log('Using local SQLite database');

  sequelize.addHook('afterCreate', saveDatabaseToFile);
  sequelize.addHook('afterDestroy', saveDatabaseToFile);
  sequelize.addHook('afterUpdate', saveDatabaseToFile);
  sequelize.addHook('afterSave', saveDatabaseToFile);
  sequelize.addHook('afterUpsert', saveDatabaseToFile);
  sequelize.addHook('afterBulkCreate', saveDatabaseToFile);
  sequelize.addHook('afterBulkDestroy', saveDatabaseToFile);
  sequelize.addHook('afterBulkUpdate', saveDatabaseToFile);
}

export async function saveDatabaseToFile() {
  const dbInstance = await sequelize.connectionManager.getConnection();
  const binaryArray = dbInstance.database.export();
  const buffer = Buffer.from(binaryArray);
  fs.writeFileSync('database.sqlite', buffer);
}
