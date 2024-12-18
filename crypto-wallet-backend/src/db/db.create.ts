import { createDatabase } from 'typeorm-extension';

export const dbCreate = async () => {
  try {
    await createDatabase({
      ifNotExist: true,
      options: {
        type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_NAME,
      },
    });
    console.log('Database created successfully (if not existed).');
  } catch (error) {
    console.error('Error during database creation:', error);
    throw error;
  }
};
