/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
var pager = require('sails-pager');
var redirectAuthUser = "/login";
var redirect = "/dashboard/product";
  // "/home/ubuntu/workspace/mart78-ui/elephant/assets/images/product"
var path = require('path').resolve(sails.config.appPath, 'assets/images/product');
        
module.exports = {

    index: function (req, res) {

        var perPage = req.query.limit || 10;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            res.view(records);
            return;
        });

    },

    'new': function (req, res) {
        Category.find({}).exec(function (err, categories) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view({ categories: categories });
            return;
        });
    },

    create: function (req, res) {
        var images = [];
        
        req.file('files').upload({ dirname: path }, function (err, uploadedFiles) {

            if (err) return res.negotiate(err);
            
            if (uploadedFiles.length > 0) {
                for (var i =0; i<uploadedFiles.length; i++) {
                    var image = uploadedFiles[i].fd.split("/").pop();
                    images.push(image);
                }
            }
            
            if(req.session.user == null){
                res.redirect(redirectAuthUser);
                return;
            }else{
                var user = req.session.user;
                var cateId = req.body.categoryId;
                Category.findOne({id:cateId}).exec(function(err,resCat){
                    if (err) return res.serverError(err);
                    var  category = resCat;
                    
                    var name = req.body.name;
                    var description = req.body.description;
                    var price = req.body.price;
                    var type = req.body.type;
                    var stock = req.body.stock;
                    var product = {
                        name: name,
                        price: price,
                        type: type,
                        stock: stock,
                        description: description,
                        images: images,
                        category:category,
                        user:user
                    }
                    Product.create(product).exec(function (err) {
                        if (err) {
                            res.send(500, { error: 'Database Error' });
                        }
                        res.redirect(redirect);
                        return;
                    });
            
                });
            }    
        });
    },

    delete: function (req, res) {
        var cId = req.params.id;
        Product.destroy({ id: cId }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.redirect(redirect);
            return;
        });
    },

    edit: function (req, res) {
        var id = req.params.id;
        Product.findOne(id).exec(function (err, product) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            Category.find({}).exec(function (err, categories) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                res.view({ product, product, categories: categories });
                return;
            });
        });
    },
    update: function (req, res) {
        var images = [];
        
        req.file('files').upload({ dirname: path }, function (err, uploadedFiles) {

            if (err) return res.negotiate(err);
            
            if (uploadedFiles.length > 0) {
                for (var i =0; i<uploadedFiles.length; i++) {
                    var image = uploadedFiles[i].fd.split("/").pop();
                    images.push(image);
                }
            }
            
            if(req.session.user == null){
                res.redirect(redirectAuthUser);
                return;
            }else{
                var user = req.session.user;
                var cateId = req.body.categoryId;
                Category.findOne({id:cateId}).exec(function(err,resCat){
                    if (err) return res.serverError(err);
                    var  category = resCat;
                    
                    var name = req.body.name;
                    var description = req.body.description;
                    var price = req.body.price;
                    var type = req.body.type;
                    var stock = req.body.stock;
                    var product = {
                        name: name,
                        price: price,
                        type: type,
                        stock: stock,
                        description: description,
                        images: images,
                        category:category,
                        user:user
                    }
                    Product.update({ id: req.params.id }, product).exec(function (err) {
                        if (err) {
                            res.send(500, { error: 'Database Error' });
                        }
                        res.redirect(redirect);
                        return;
                    });
            
                });
            }    
        });
    
    }
};

