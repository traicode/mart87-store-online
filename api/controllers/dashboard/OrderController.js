/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var pager = require('sails-pager');
var redirect = "/dashboard/order";
var redirectAuthUser = "/login";

module.exports = {
	index:function(req, res){
        var page = req.params.page;
        var limit = 10;
        var offset = (page - 1) *  limit;
        Order.find({}).paginate({page: page, limit: offset}).exec(function(err, orders){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view({orders:orders});
        });
    },

    'new': function(req, res){
            res.view();
    },

    create:function(req, res){
       var qty = req.body.qty;
       var deliveryPrice = req.body.deliveryPrice;
       var totalPrice = req.body.totalPrice;
       var products = req.body.productId;
        
        if(req.session.user == null){
                res.redirect(redirectAuthUser);
                return;
            }else{
                var order = {
                    qty:qty,
                    deliveryPrice:deliveryPrice,
                    totalPrice:totalPrice,
                    user: req.session.user,
                    products:products
                }
                Order.create(order).exec(function(err){
                    if(err){
                        res.send(500, {error: 'Database Error'});
                    }
                    res.redirect('/dashboard/order');
                });
                
        }
    },

    delete: function(req, res){
        var rId = req.params.id;
        Order.destroy({id:rId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/dashboard/order');
        });
        return false;
    },

    edit: function(req, res) {
        var rId = req.params.id;
        Order.findOne(rId).exec(function(err, role) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view({role,role});
        });
    },
    update: function(req, res){
        var name = req.body.name;
        var description = req.body.description;

        Order.update({id: req.params.id},{name:name,description:description}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/dashboard/order');
        });

        return false;
    }
};

