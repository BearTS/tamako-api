require('dotenv').config();
const Josh = require('@joshdb/core');
const provider = require('@joshdb/mongo');

const userTable = new Josh({
    name: 'UserManager',
    provider,
    providerOptions: {
        collection: 'UserManager',
        url: process.env.MONGO_URI,
    }
});


module.exports.userTable = userTable;