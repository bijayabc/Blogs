const Blog = require('../models/blog')

const blog_index = (req, res) => {
    // sort the lists based on the time of creation
    const blogs = Blog.find().sort( {createdAt: -1} )
        .then((result) => {
            res.render('index.ejs', { title: 'All Blogs', blogs: result})
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index
}