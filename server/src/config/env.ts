import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "dream_bazar_jwt_secret_dev_key_123456";
export const DB_CONN_STRING = process.env.DB_CONN_STRING || "mongodb://mongodb:27017/dream-bazar";
export const DB_NAME = process.env.DB_NAME || "dream-bazar";
export const PORT = process.env.PORT || 4000;
