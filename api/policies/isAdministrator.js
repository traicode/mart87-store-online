/**
 * isAdministrator
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any administrator user
 *                 Assumes that your login action in one of your controllers sets `req.session.isAdministrator = admin;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
    
    var user  = req.session.user;
    
    if(user &&  user.role == 1){
        return next();
    }else{
        return res.redirect('/login');
    }
};
