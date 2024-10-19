import dotenv from 'dotenv'; // envni import qilip oldik ! 

dotenv.config(); // bu bolmasa dotenv ishlamaydi !! 
export const PORT = process.env.PORT || 7070;
export const ENVIROVMENT = process.env.ENVIROVMENT || 7070;
export const REG_KEY = process.env.REG_KEY;
export const DB_URL = process.env.DB_URL;