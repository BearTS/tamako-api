const { userTable } = require('./main');

module.exports = async function initSetup() {
    console.log(`User collection is connected, there are ${await userTable.size} rows in the database.`);
};