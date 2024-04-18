import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import bookRoutes from './routes/book.routes.js';

const app = express();
app.use(express.json(), cors({origin: 'http://localhost:5173' }));
app.use('/api/v1/', bookRoutes);

dotenv.config();
const PORT = process.env.PORT;
dbConnect();

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));