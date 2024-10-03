const express = require("express");
const app = express();
const mongoose = require('mongoose')

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

app.get("/", (req, res) => { 
    res.send("Express on Vercel"); 
});

module.exports = app;