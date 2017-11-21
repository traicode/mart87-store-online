/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        User.find({}).exec(function (err, users) {
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            Category.find({}).exec(function (err, categories) {
                if(err){
                    res.send(500, {error: 'Database Error'});
                }
                Product.find({}).exec(function (err, products) {
                    if(err){
                        res.send(500, {error: 'Database Error'});
                    }
                    Order.find({}).exec(function (err, orders) {
                        if(err){
                            res.send(500, {error: 'Database Error'});
                        }
                        res.view({
                            user: users.length,
                            category: categories.length,
                            product: products.length,
                            order: orders.length
                        });
                    })
                })
            });
        });
    }
};

