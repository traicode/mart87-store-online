/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
var pager = require('sails-pager');
 
  // "/home/ubuntu/workspace/mart78-ui/elephant/assets/images/product"
  var path = require('path').resolve(sails.config.appPath, 'assets/images/product');
        

module.exports = {

    index: function (req, res) {

        var perPage = req.query.limit || 10;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Product, conditions, currentPage, perPage, [{name: 'category'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            res.view(records);
            return res.json(records);
            res.view(records);
        });


        // var page = req.params.page || 1;
        // var limit = 10;
        // var offset = (page - 1) * limit;
        // var count = 0;
        // Product.find({}).paginate({ page: page, limit: offset }).exec(function (err, products) {
        //     if (err) {
        //         res.send(500, { error: 'Database Error' });
        //     }
        //     if(products.length > 0){
        //         count = products.length;
        //     }
        //     var totalPages = Math.ceil(products.length / limit);
        //     res.view({ products: products, totalItems: count, totalPages: totalPages });
        // });
    },

    'new': function (req, res) {
        Category.find({}).exec(function (err, categories) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view({ categories: categories });
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
            var name = req.body.name;
            var description = req.body.description;
            var price = req.body.price;
            var type = req.body.type;
            var stock = req.body.stock;
            var categoryId = req.body.categoryId;
            var product = {
                name: name,
                price: price,
                type: type,
                stock: stock,
                description: description,
                images: images,
                category:categoryId
            }
            Product.create(product).exec(function (err) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                res.redirect('/dashboard/product');
            });
        });
    },

    delete: function (req, res) {
        var cId = req.params.id;
        Product.destroy({ id: cId }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.redirect('/dashboard/product');
        });
        return false;
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
            });
        });
    },
    update: function (req, res) {
        var fileUpload = req.file('fileUpload');
        fileUpload.upload({ dirname: '../../assets/images/product' }, function onUploadComplete(err, files) {
            if (err) return res.serverError(err);
            var imageFile = files[0].fd;
            var lastPart = imageFile.split("/").pop();
            // save original file name
            var name = req.body.name;
            var description = req.body.description;
            var price = req.body.price;
            var type = req.body.type;
            var stock = req.body.stock;
            var categoryId = req.body.categoryId;
            var product = {
                name: name,
                categoryId: categoryId,
                price: price,
                type: type,
                stock: stock,
                description: description,
                image: lastPart
            }
            Product.update({ id: req.params.id }, product).exec(function (err) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                res.redirect('/dashboard/product');
            });
        });
    }
};

