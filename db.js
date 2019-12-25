const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-app', {useNewUrlParser: true, useUnifiedTopology: true}, console.log('Database Connected...'))