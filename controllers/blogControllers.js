const Blog = require('../models/blog')

const blog_index = (req, res) => {
    // sort the lists based on the time of creation
    const blogs = Blog.find().sort( {createdAt: -1} )
        .then((result) => {
            res.render('index.ejs', { title: 'All Blogs', blogs: result})
        })
        .catch(err => console.log(err))
}

const blog_create_get = (req, res) => {
    res.render('create.ejs', { title: 'Create a new Blog' })
}

const blog_create_post = (req, res) => {
    const {title, snippet, password, body} = req.body

    if (password === process.env.AUTH_PASSWORD) {
        const blog = new Blog(req.body)

        blog.save()
            .then((result) => {
                res.redirect('/blogs')
            })
            .catch(err => console.log(err))
    } else {
        res.render('error', {title: 'Error', message: 'You really thought you could just guess the password huh?' })
    }
}

const blog_details = (req, res) => {
    const id = req.params.id
    console.log(id)

    Blog.findById(id)
        .then((result) => {
            res.render('details.ejs', { title: 'Details', blog: result} )
        })
        .catch(err => {
            console.log(err)
            res.render('error', {title: 'Error' , message: 'The server encountered an error while executing your request.'})
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => res.send( { redirect: '/blogs' } ))
        .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}