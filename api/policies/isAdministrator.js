/**
 * isAdministrator
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any administrator user
 *                 Assumes that your login action in one of your controllers sets `req.session.isAdministrator = admin;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function isAdministrator (req, res, next) {
    res.redirect('/');
};
