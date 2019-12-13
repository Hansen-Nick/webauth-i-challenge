const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./users/userRoute')

server.use(cors(), morgan(), helmet())
server.use(express.json()
)
server.use('/api', userRoute)

module.exports = server