/**
 * LIST CATEGORY
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (req, res, next) {
    Category.find({ parent: null }).populate('children').exec(function (err, models) {
        if (err) return res.badRequest("Error");
        req.categories = models;
        next();
    });
}