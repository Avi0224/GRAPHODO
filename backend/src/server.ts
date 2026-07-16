import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
