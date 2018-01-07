const Schemas = require('../mongoose/schemas');

const get = (req, res, next) => {
    Schemas.Account.find((err, accounts) => {
        if (err) next(err);
        console.log(req.connection.user);
        console.log(req.connection.userSid);
        let out='';
        if (req.connection.userGroups) {
            for (let i in req.connection.userGroups) {
              out +=  req.connection.userGroups[i] + '\n'
            }
          }
          console.log(out)
        res.status(200).send(accounts);
    });
};

const post = (req, res, next) => {
    let account = new Schemas.Account(req.body);
    account.save((err, dbAccount) => {
        if (err) next(err);
        res.status(200).send(`Account posted with id: ${dbAccount._id}`);
    });
};

const update = (req, res, next) => {
    const id = req.params.id;
    let toUpdate = new Schemas.Account(req.body);
    Schemas.Account.findOne({ _id: id }, (err, foundAccount) => {
        if (err) next(err);
        foundAccount.name = toUpdate.name;
        foundAccount.balance = toUpdate.balance;
        foundAccount.save((err, dbAccount) => {
            if (err) next(err);
            res.status(200).send(`Updated account with id: ${dbAccount._id}`);
        });
    });

};

const remove = (req, res, next) => {
    const id = req.params.id;
    Schemas.Account.findOne({ _id: id }, (err, foundAccount) => {
        if (err) next(err);
        if (!foundAccount) return res.status(403).send(`No account with id=${id} found!`);
        foundAccount.remove((err, dbAccount) => {
            if (err) next(err);
            res.status(200).send(`Removed account with id: ${dbAccount._id}`);
        });
    });

};

module.exports = {
    get: get,
    post: post,
    put: update,
    delete: remove
}