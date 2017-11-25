/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var pager = require('sails-pager');
var path = require('path').resolve(sails.config.appPath, 'assets/images/category');
var redirect = "/dashboard/category";
var redirectAuthUser = "/login";
module.exports = {

    params: function(req) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        console.clear();
        console.log("Fetch Params: ", params);
        return params;
    },

    paramId: function(req) {
        var id = req.param('id')
        if (!id) {
            return res.send("No id specified.", 500);
        }
        console.clear();
        console.log("Fetch Id: ", id);
        return id;
    },
    
	index:function(req, res){

        var perPage = req.query.limit || 10;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Category, conditions, currentPage, perPage, [{name: 'parent'},{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            res.view(records);
            return;
        });
    },

    'new': function(req, res){
        Category.find({parent:null}).exec(function(err, categories){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view({categories:categories});
            return;
       });
    },

    create:function(req, res){
        var uploadFile = req.file('fileUpload');
        uploadFile.upload({ dirname: path }, function onUploadComplete(err, files) {
            if (err) return res.serverError(err);
            //	IF ERROR Return and send 500 error
            
            var imageFile  = files[0].fd;
            var lastPart = imageFile.split("/").pop();
            
            var name = req.body.name;
            var description = req.body.description;
            var cateParent = null;
            
            if(req.session.user == null){
                res.redirect(redirectAuthUser);
                return;
            }else{
                var user = req.session.user;
                var parentId = req.body.parentId;
                Category.findOne({id:parentId}).exec(function(err,categoryParent){
                    if (err) return res.serverError(err);
                    cateParent = categoryParent;
                    var category = {
                        name: name,
                        parent:categoryParent,
                        description:description,
                        image:lastPart,
                        user:user
                    }
                    Category.create(category).exec(function(err){
                        if(err){
                            res.send(500, {error: 'Database Error'});
                        }
                        console.log("Category Insert Item :",  category);
                        res.redirect(redirect);
                        return;
                    });
                });
            }
        });
    },

    delete: function(req, res){
        var cId = req.params.id;
        Category.destroy({id:cId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect(redirect);
            return;
        });
    },

    edit: function(req, res) {
        var id = this.paramId(req);
        Category.findOne(id).exec(function(err, category) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            Category.find({}).exec(function(err, categories){
                if(err){
                    res.send(500, {error: 'Database Error'});
                }
                res.view({category,category,categories:categories});
                return;
           });
        });
    },
    update: function(req, res){
        var uploadFile = req.file('fileUpload');
        uploadFile.upload({ dirname: path }, function onUploadComplete(err, files) {
            if (err) return res.serverError(err);
            //	IF ERROR Return and send 500 error
            
            var imageFile  = files[0].fd;
            var lastPart = imageFile.split("/").pop();
            var name = req.body.name;
            var description = req.body.description;
            
            var parentId = req.body.parentId;
            Category.findOne({id:parentId}).exec(function(err,category){
                 if (err) return res.serverError(err);
                var category = {
                    name: name,
                    parent:category,
                    description:description,
                    image:lastPart
                }
                Category.update({id: req.params.id},category).exec(function(err){
                    if(err){
                        res.send(500, {error: 'Database Error'});
                    }
                    console.log("Category update Item :",  category);
                    res.redirect(redirect);
                    return;
                });
            });
        });
    }
};

