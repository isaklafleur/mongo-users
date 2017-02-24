const assert = require('assert');
const User = require('../src/user');

// Describe function
describe('Creating records', () => {
    it('saves a user', (done) => {
        //1. Create a instant of a user
        const joe = new User({ name: "Joe" });
        
        //2. Save the instant to the database
        joe.save()
            //3. Has user been saved successfully?
            .then(() => {
                assert(!joe.isNew);
                done();
            });

    });
});

// Inside the Describe function it will have it blocks

