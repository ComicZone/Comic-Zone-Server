const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const rootRoute = require("./routes/index.route");

const connect = require('./configs/db.config')

dotenv.config()

const Uri = process.env.MONGODB_URI
const PORT = process.env.PORT

const app = express()

// Allows us to send and receive json files 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('common'))
app.use(helmet())

// Allows us to access a user's token stored as a cookie
app.use(cookieParser())

// Define a health check route that responds with a 200 status code
app.get('/api/v1/health', (req, res) => {
  res.status(200).json('Relax, brov. Everything is alright..');
});

app.use("/api/v1", rootRoute);

// Our port is converted to a number
const port = parseFloat(PORT) || 3000

// Server listening for requests
app.listen(port, '0.0.0.0', () => {
  connect("mongodb+srv://admin:comicZoneKids@comiczone.nvzy7wp.mongodb.net?retryWrites=true&w=majority")
  console.log(`Server connected on port ${port}`)
})