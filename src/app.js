import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import router from './routes/index.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://pclavellino:Mongo2024@coderbackend-i.urz19td.mongodb.net/ProyectoFinal-Backend-3`)

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
