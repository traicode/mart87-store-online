/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



var passport = require('passport');

var redirectAfterHome = '/';
var redirectAfterToLogin = '/login';

module.exports = {

    _config: {
        rest: false,
        actions: false,
        shortcuts: false
    },
    
    index: function(req, res) {
        res.json({
            session: req.session
        });
    },
    
    loginView: function(req, res) {
        res.view('auth/login');
    },
    
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                var fields = ['email','name','firstName','lastName','address','phones','role'];
                User.findOne({id:user.id,select: fields}).exec(function(err,data){
                      req.session.user = data;
                      res.redirect(redirectAfterHome);
                });
                

                // return res.send({
                //     message: info.message,
                //     user: user
                // });
            });

        })(req, res);
    },

    registerView: function(req, res) {
        res.view('auth/register');  
    },
    
    register: function(req, res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        User.create(params, function(err, user) {
            if (err) return res.send(err, 500);
            res.redirect(redirectAfterToLogin);
        });
    },

    logout: function(req, res) {
        req.session.user = null;
        req.logout();
        res.redirect(redirectAfterToLogin);
    }
};