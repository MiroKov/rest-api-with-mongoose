const mongoose = require('mongoose');

const Account = mongoose.model('Account', {
    name: String,
    balance: Number
});

exports.Account = Account;