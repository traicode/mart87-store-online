/**
 * ApiController
 *
 * @description :: Server-side logic for managing apis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var pager = require('sails-pager');
module.exports = {
    params: function (req) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        console.clear();
        return params;
    },

    getSlides: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Slide, conditions, currentPage, perPage, [{name: 'user'}], 'createdAt DESC', function(err, records){
            if(err){
                 res.send(500, { err: 'Database Error' });
            }
            return res.json(records);
        });
    },
    
    getPartners: function (req, res) {
            var perPage = req.query.limit;
            var currentPage = req.query.page;
            var conditions = {};
            pager.paginate(Partner, conditions, currentPage, perPage, [{name: 'user'}], 'createdAt DESC', function(err, records){
                if(err){
                     res.send(500, { err: 'Database Error' });
                }
                return res.json(records);
            });
    },
    
    getCategories: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {parent:null};
        pager.paginate(Category, conditions, currentPage, perPage, [{name: 'children'},{name: 'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },
    getProducts: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },

    
    getTopProducts: function(req , res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },

    getNewProducts: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });

    },
    getRecommendProducts: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });

    },
    getPopularProducts: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },

    getProductsByCategory: function (req, res) {
        var params = this.params(req);
        var cateId = params.id;

        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
 
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category', query: {id: cateId}},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },

    getProductName:function(req,res){
        Product.find({ select: ['id','name'] }).exec(function (err, products) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            return res.json(products);
        });
    },

    getCategoryName:function(req,res){
        Category.find({ select: ['id','name'] }).exec(function (err, categories) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            return res.json({ categories: categories });
        });
    }
};

