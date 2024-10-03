const express = require("express");
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config();  // Ensure dotenv is properly configured
const blogRoutes = require('./routes/blogRoutes')

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => { 
//     console.log(`Server is running on port ${PORT}`); 
// });

// connect to database
const dbURI = process.env.DB_URI
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch(err => (console.log(err)))

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.static('public')) // to allow the browser to access the local filesystem i.e the public folder
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(morgan('dev')) // log the nature of the request to the console
app.use(express.json()); // Middleware to parse JSON bodies

// handle routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs', { title: 'About' })
})

// Checks if the password is correct and returns a boolean JSON object accordingly
app.post('/verify-password', (req, res) => {
    const user_password = req.body.password

    if (user_password === process.env.AUTH_PASSWORD) {
        res.json( { isValid: true} )
    } else {
        res.json( {isValid: false} )
    }
})

// handle /blogs get route
app.use(blogRoutes)

// handle error when no routes match
app.use((req, res) => {
    res.status(404).render('error.ejs', { title: 'Error' , message: 'The server encountered an error while executing your request.'});
})

module.exports = app;