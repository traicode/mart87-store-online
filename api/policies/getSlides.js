/**
 * LIST SLIDES
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = function (req, res, next) {
    Slide.find({ parent: null }).populate('user').exec(function (err, models) {
        if (err) return res.badRequest("Error");
        req.slides = models;
        next();
    });
}