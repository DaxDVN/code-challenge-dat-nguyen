import { copyFile } from 'fs/promises';

const copyEnvFile = async () => {
  try {
    await copyFile('.env.sample', '.env');
    console.log('.env file created successfully');
  } catch (err) {
    console.error('Error copying .env file:', err);
    process.exit(1);
  }
};

copyEnvFile();
