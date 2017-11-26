/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var redirectLogin = "/login";
var redirectIndex = "/";
module.exports = function(req, res, next) {

    if (req.session.user == null) {
        return res.redirect(redirectLogin);
     } else if(req.session.user.role == 2){
         return next();
     }else if(req.session.user.role == 1){
        return res.redirect(redirectIndex);
     }else{
        return res.redirect(redirectIndex);
     }
};
