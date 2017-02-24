const mongoose = require('mongoose');
const PostSchema = require('./post');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer then 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

// Middleware # 1
UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    // this === joe

    BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// Representing the whole collection of the data
const User = mongoose.model('user', UserSchema);

module.exports = User;