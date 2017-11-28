/**
 * AccountController
 *
 * @description :: Server-side logic for managing Accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var redirectLogin = "/login";
var redirectIndex = "/";
var redirectAccount = "/account";
module.exports = {

    params: function(req) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        console.clear();
        console.log("Fetch Params: ", params);
        return params;
    },

    account:function(req, res){
        res.view("pages/account/account");
    },
    editAccount:function(req,res){
        var user = req.session.user;
        var fields = ['id','email','firstName','lastName','address','phone'];
        User.find({id:user.id,select: fields}).exec(function (err, user){
            if (err) {
              return res.serverError(err);
            }
            res.view("pages/account/edit-account",{user});
            return;
        });
    },
    updateAccount:function(req,res){
        var user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
        }
        if(req.session.user != null){
            User.update({id:req.session.user.id},user).exec(function (err, user){
                if (err) {
                  return res.serverError(err);
                }
                res.redirect(redirectAccount);
                return;
            });
        }else{
            res.redirect(redirectLogin);
        }
    },
    changePassword:function(req,res){
        res.view("pages/account/change-password")
    },
    address:function(req,res){
        res.view("pages/account/address");
    },
    download:function(req,res){
        res.view("pages/account/download");
    },
    editAddress:function(req,res){
        res.view("pages/account/edit-address");
    },
    forgotton:function(req,res){
        res.view("pages/account/forgotten");
    },
    newAddress:function(req,res){
        res.view("pages/account/new-address");
    },
    order:function(req,res){
        res.view("pages/account/order");
    },
    recurring:function(req,res){
        res.view("pages/account/recurring");
    },
    return:function(req,res){
        res.view("pages/account/return");
    },
    reward:function(req,res){
        res.view("pages/account/reward");
    },
    transaction:function(req,res){
        res.view("pages/account/transaction");
    },
    wishlist:function(req,res){
        res.view("pages/account/wishlist");
    },


    newSletter:function(req,res){
       var user = req.session.user;
       var fields = ['id','isSubscribe'];
       if(req.session.user != null){
        User.find({id:user.id,select: fields}).exec(function (err, user){
            if (err) {
              return res.serverError(err);
            }
            res.view("pages/account/newsletter",{user});
            return;
        });
       }else{
        res.redirect(redirectLogin);
       } 
    },
    updateSubscription:function(req,res){
        var user = {
            isSubscribe: req.body.subscription,
        }
        if(req.session.user != null){
            User.update({id:req.session.user.id},user).exec(function (err, user){
                if (err) {
                  return res.serverError(err);
                }
                res.redirect(redirectAccount);
                return;
            });
        }else{
            res.redirect(redirectLogin);
        }
    }
};

