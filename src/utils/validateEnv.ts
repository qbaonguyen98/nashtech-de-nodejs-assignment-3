import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    PORT: port(),
    MONGO_DB: str(),
  });
};

export default validateEnv;
