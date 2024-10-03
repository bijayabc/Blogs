const Blog = require('../models/blog')

const blog_index = (req, res) => {
    const blogs = Blog.find()
    res.send('hi')

    // sort the lists based on the time of creations
    // const blogs = Blog.find().sort( {createdAt: -1} )
    //     .then((result) => {
    //         res.render('index.ejs', { title: 'All Blogs', blogs: result})
    //     })
    //     .catch(err => console.log(err))
}

module.exports = {
    blog_index
}