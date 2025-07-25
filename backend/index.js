const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const PostRoutes = require('./routes/posts');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aiblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/posts', PostRoutes);

app.get('/', (req, res) => {
  res.send('3D E-commerce Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 