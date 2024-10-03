const express = require("express");
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => { 
//     console.log(`Server is running on port ${PORT}`); 
// });

// connect to database
const dbURI = 'mongodb+srv://bijayabc:DRDDkUnvnofOsyCC@node-app.ju9ze.mongodb.net/blogs?retryWrites=true&w=majority&appName=node-app'
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

app.get("/", (req, res) => { 
    res.send("Express on Vercel after link to mongoDB"); 
});

module.exports = app;