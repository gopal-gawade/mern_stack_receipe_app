import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipeRouter } from './routes/recipes.js';
import dotenv from "dotenv";
dotenv.config();

const url = process.env.SECRET_KEY;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose.connect(url)

app.listen(3001, () => console.log('Server started...'));
