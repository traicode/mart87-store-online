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

    order: function (req, res) {
        var products = [];

        if (req.session.user == null) {
            res.redirect(redirectAuthUser);
        } else {
            console.log("All Data : ", req.body);
            var productOrderItem = req.body.products;

            var qty = req.body.qty;
            var subTotalPrice = req.body.subTotal;
            var deliveryPrice = req.body.deliveryPrice;
            var grandTotalPrice = req.body.grandTotal;
            var products = req.body.productId;
            var status = 'process';

            var order = {
                qty: qty,
                subTotalPrice: subTotalPrice,
                deliveryPrice: deliveryPrice,
                grandTotalPrice: grandTotalPrice,
                user: req.session.user,
                products: products,
                status:status
            }
            Order.create(order).exec(function (err) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                res.redirect(redirect);
            });
        }
    },
};

