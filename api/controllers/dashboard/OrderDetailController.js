/**
 * OrderDetailController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var pager = require('sails-pager');
var redirect = "/dashboard/order";
var redirectAuthUser = "/login";

module.exports = {
    
    index: function (req, res) {
        var orderId = req.params.id;
        var perPage = req.query.limit || 10;
        var currentPage = req.query.page;
        var conditions = {order:orderId};
        pager.paginate(OrderDetail, conditions, currentPage, perPage, [{ name: "order" },{name:"product"}], 'createdAt DESC', function (err, records) {
            if (err) {
                console.log(err);
            }
            res.view(records);
            return;
        });
    },

}