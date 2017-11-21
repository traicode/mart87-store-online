/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    // See `api/responses/login.js`
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: '/',
      invalidRedirect: '/login'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;
    req.session.user = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/login');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    
    // Attempt to signup a user using the provided parameters
    User.signup({
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      role:2
    }, function (err, user) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) return res.negotiate(err);

      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      
      

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/login');
    });
  },

  index:function(req, res){
      var page = 1
      var limit = 10;
      var offset = (page - 1) *  limit;
      User.find({}).paginate({page: page, limit: offset}).exec(function(err, users){
          if(err){
              res.send(500, {error: 'Database Error'});
          }
          res.view({users:users});
      });
  },
  'new': function(req, res){
    res.view();
  },

create:function(req, res){
  // Attempt to signup a user using the provided parameters
  User.signup({
    name: req.param('name'),
    email: req.param('email'),
    password: req.param('password')
  }, function (err, user) {
    // res.negotiate() will determine if this is a validation error
    // or some kind of unexpected server error, then call `res.badRequest()`
    // or `res.serverError()` accordingly.
    if (err) return res.negotiate(err);

    // Go ahead and log this user in as well.
    // We do this by "remembering" the user in the session.
    // Subsequent requests from this user agent will have `req.session.me` set.
    
    

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the signup was successful.
    if (req.wantsJSON) {
      return res.ok('Signup successful!');
    }

    // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
    res.redirect('/dashboard/user');
  });
},

delete: function(req, res){
    var uId = req.params.id;
    User.destroy({id:uId}).exec(function(err){
        if(err){
            res.send(500, {error: 'Database Error'});
        }
        res.redirect('/dashboard/user');
    });
    return false;
},

edit: function(req, res) {
    var uId = req.params.id;
    User.findOne(uId).exec(function(err, user) {
        if (err) {
            res.send(500, { error: 'Database Error' });
        }
        res.view({user:user});
    });
},
update: function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
    var user = {
      name:name,
      email:email,
      password:password,
      role:role
    }
    User.update({id: req.params.id},user).exec(function(err){
        if(err){
            res.send(500, {error: 'Database Error'});
        }
        res.redirect('/dashboard/user');
    });
  return false;
}
};

