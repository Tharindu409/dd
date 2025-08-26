const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
 const adminRoutes = require('./routes/AdminRoutes');  
 
const path = require('path');
const app = express(); // Define app BEFORE using it

app.use(cors());
app.use(express.json());

  
// Register your routes AFTER app is created
app.use('/users', userRoutes);
 app.use('/admin', adminRoutes);

 

// Connect to MongoDB
mongoose.connect('mongodb+srv://Login:XQq5posG3fkuioqf@cluster0.sblckfz.mongodb.net/artGalleryDB')
  .then(() => {
    app.listen(5000, () => {
      console.log('Backend running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
