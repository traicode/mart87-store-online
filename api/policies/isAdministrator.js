/**
 * isAdministrator
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any administrator user
 *                 Assumes that your login action in one of your controllers sets `req.session.isAdministrator = admin;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

 var redirectLogin = "/login";
 var redirectIndex = "/";
module.exports = function(req, res, next) {
    if (req.session.user == null) {
        return res.redirect(redirectIndex);
     }else if(req.session.user.role == 1){
        return next();
     }else{
        return res.redirect(redirectIndex);
     }
 };
 