const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// beforre only executes ONE time before the tests.
before((done) => {
    mongoose.connect('mongodb://localhost/user_test');
    mongoose.connection
        .once('open', () => { done(); } )
        .on('error', (error) => {
            console.log('Warning', error);
    });
});

    // define the hook
beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});