const winAuthMiddlware = (req, res, next) => {
    const nodeSSPI = require('node-sspi');
    let nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true,
        offerBasic: false 
    });
    nodeSSPIObj.authenticate(req, res, (err) => {
        res.finished || next();
    });
}
exports.auth = winAuthMiddlware;