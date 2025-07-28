import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';

function envPort() {
  // Load .env if not in Docker
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
}

envPort();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





