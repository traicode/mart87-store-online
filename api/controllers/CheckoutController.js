/**
 * CheckoutController
 *
 * @description :: Server-side logic for managing Checkouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var pager = require('sails-pager');
var redirect = "/";
var redirectAuthUser = "/login";
module.exports = {

    submitOrder: function (req, res) {
        if (req.session.user == null) {
            res.redirect(redirectAuthUser);
            return;
        } else {
            var proOrderItems = req.body.json.orderItems;
            var subTotalPrice = req.body.json.subTotal;
            var deliveryPrice = req.body.json.deliveryPrice;
            var grandTotalPrice = req.body.json.grandTotal;
            var status = 'process';
            var order = {
                subTotalPrice: subTotalPrice,
                deliveryPrice: deliveryPrice,
                grandTotalPrice: grandTotalPrice,
                user: req.session.user,
                phone:req.session.user.phone,
                status:status
            };
            Order.create(order).exec(function (err,ord) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                for(var i = 0 ; i < proOrderItems.length ; i++){
                    var productId = proOrderItems[i].proId;
                    var productQty = proOrderItems[i].proQty;
                    Product.find({id:productId}).exec(function(err,pro){
                        if (err) {
                            res.send(500, { error: 'Database Error' });
                        }
                        var orderDetail = {
                            order : ord,
                            product : pro[0],
                            qty:productQty
                        }
                        OrderDetail.create(orderDetail).exec(function(err){
                            if(err){
                                res.send(500, {error: 'Database Error'});
                            }
                        });
                    });   
                }
                res.redirect(redirect);
                return;
            });
        }
    },
};

