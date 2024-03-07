// Load environment variables from .env file
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

// Use your environment variables
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Check');
});
