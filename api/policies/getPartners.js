
/**
 * LIST PARTNERS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (req, res, next) {
    Partner.find({ parent: null }).populate('user').exec(function (err, models) {
        if (err) return res.badRequest("Error");
        req.partners = models;
        next();
    });
}