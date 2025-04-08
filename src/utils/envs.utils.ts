import 'dotenv/config';

interface EnvUtils {
  API_KEY: string | undefined; 
  BACKEND_URL: string | undefined;
}

const envsUtils: EnvUtils = {
  API_KEY: process.env.API_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
};

export default envsUtils;