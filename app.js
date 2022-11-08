require('dotenv').config();

// node modules
const http = require('http');

// npm modules
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');

// app modules
const mongoose = require('./src/database/mongoose');

const uploadMulter = multer({
  limits: {
    fileSize: 8000000,
  },
});


// express instance
const app = express();

// cors options
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  exposedHeaders: 'Content-Type, X-Auth-Token',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
};

// Database setup
mongoose.connect();

// middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/api/v1', uploadMulter.any(), require('./src/routes/api.routes'));




// server setup
const port = process.env.PORT || 7000;
const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.log(`Error : ${err}`);
    process.exit(-1);
  }
  console.log('Server is running')
});

module.exports = server;