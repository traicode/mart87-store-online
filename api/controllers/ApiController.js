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
        console.log("Fetch Params: ", params);
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
    
    mainCategories: function (req, res) {
        Category.find({}).exec(function (err, categories) {
            var i, j,chunk = 6, list6Categories = [];
            for (i = 0, j = categories.length; i < j; i += chunk) {
                list6Categories.push(categories.slice(i, i + chunk));
            }
            return res.json({categories: categories,list6Categories: list6Categories});
        });
    },

    categories: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Category, conditions, currentPage, perPage, [{name: 'children'},{name: 'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },
    products: function (req, res) {
        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'}], 'createdAt DESC', function(err, records){
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
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            return res.json(records);
        });
    },

    getNewProducts: function (req, res) {
        var params = this.params(req);
        var cateId = params.category;
        var page = params.page || 1;
        var limit = params.limit || 8;
        Product.find({}).paginate({ page: page, limit: limit }).exec(function (err, products) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            Product.count().exec(function (err, count) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                var totalPages = Math.ceil(count / limit);
                return res.json({ products: products, totalItems: count, totalPages: totalPages });
            });
        });

    },
    getRecommendProducts: function (req, res) {
        var params = this.params(req);
        var cateId = params.category;
        var page = params.page || 1;
        var limit = params.limit || 8;
        Product.find({}).paginate({ page: page, limit: limit }).exec(function (err, products) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            Product.count().exec(function (err, count) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                var totalPages = Math.ceil(count / limit);
                return res.json({ products: products, totalItems: count, totalPages: totalPages });
            });
        });

    },
    getPopularProducts: function (req, res) {
        var params = this.params(req);
        var cateId = params.category;
        var page = params.page || 1;
        var limit = params.limit || 8;
        Product.find({}).paginate({ page: page, limit: limit }).exec(function (err, products) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            Product.count().exec(function (err, count) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                var totalPages = Math.ceil(count / limit);
                return res.json({ products: products, totalItems: count, totalPages: totalPages });
            });
        });

    },

    getProductsByCategoryId: function (req, res) {
        var params = this.params(req);
        var cateId = params.id;

        var perPage = req.query.limit;
        var currentPage = req.query.page;
        var conditions = {categoryId:cateId};
 
        pager.paginate(Product, conditions, currentPage, perPage, [], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            console.log(records);
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

