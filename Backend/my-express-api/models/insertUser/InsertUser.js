const mongoose = require('mongoose');
const User = require('../../userData.js/userData');

const insertUser = async () => {
    try {
        // insert multiple users at once
        const users = [
            {
                name: 'Suresh Singh',
                email: 'suresh@example.com',
                age: 24,
            },
            {
                name: 'Ramesh Singh',
                email: 'ramesh@example.com',
                age: 24,
            },
            {
                name: 'Vishesh Singh',
                email: 'vishesh@example.com',
                age: 24,
            },
        ];

        const savedUsers = await User.insertMany(users);
        console.log('Users inserted:', savedUsers);
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};

module.exports = insertUser;
