import dotenv from 'dotenv';
dotenv.config();

const config ={
    port: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || '',
}

export default config