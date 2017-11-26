/**
 * AccountController
 *
 * @description :: Server-side logic for managing Accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    account:function(req, res){
        res.view("pages/account/account");
    },
    address:function(req,res){
        res.view("pages/account/address");
    },
	changePassword:function(req,res){
        res.view("pages/account/change-password")
    },
    download:function(req,res){
        res.view("pages/account/download");
    },
    editAccount:function(req,res){
        res.view("pages/account/edit-account");
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
    newSletter:function(req,res){
        res.view("pages/account/newsletter");
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
    }
};

