/**
 * SlideController
 *
 * @description :: Server-side logic for managing slides
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var pager = require('sails-pager');
var path = require('path').resolve(sails.config.appPath, 'assets/images/slide');
var redirect = "/dashboard/slide";
var redirectAuthUser = "/login";
module.exports = {
	index:function(req, res){
	 
	    var perPage = req.query.limit || 6;
        var currentPage = req.query.page;
        var conditions = {};
        pager.paginate(Slide, conditions, currentPage, perPage, [{name:'user'}], 'createdAt DESC', function(err, records){
            if(err){
                console.log(err);
            }
            res.view(records);
            return;
        });
    },

    'new': function(req, res){
            res.view();
    },

    create:function(req, res){
        var image = req.file('image');
        
         if(req.session.user == null){
            res.redirect(redirectAuthUser);
            return;
         }else{
            image.upload({ dirname: path },function onUploadComplete (err, files) {				
                if (err) return res.serverError(err);								
                    var imageFile  = files[0].fd;
                    var lastPart = imageFile.split("/").pop();
                    var name = req.body.name;
                    var description = req.body.description;
                     var user = req.session.user;
                    var slide = {
                        name: name,
                        description:description,
                        image:lastPart,
                        user:user
                    }
                    Slide.create(slide).exec(function(err){
                        if(err){
                            res.send(500, {error: 'Database Error'});
                        }
                        res.redirect(redirect);
                        return;
                    });
             });
         }
        
    },

    delete: function(req, res){
        var cId = req.params.id;
        Slide.destroy({id:cId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect(redirect);
            return;
        });
    },

    edit: function(req, res) {
        var id = req.params.id;
        Slide.findOne(id).exec(function(err, slide) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view({slide,slide});
            return;
        });
    },
    update: function(req, res){
        var image = req.file('image');
        
         if(req.session.user == null){
            res.redirect(redirectAuthUser);
            return;
         }else{
            image.upload({ dirname: path },function onUploadComplete (err, files) {				
                if (err) return res.serverError(err);								
                    var imageFile  = files[0].fd;
                    var lastPart = imageFile.split("/").pop();
                    var name = req.body.name;
                    var description = req.body.description;
                     var user = req.session.user;
                    var slide = {
                        name: name,
                        description:description,
                        image:lastPart,
                        user:user
                    }
                    Slide.update({id: req.params.id},slide).exec(function(err){
                        if(err){
                            res.send(500, {error: 'Database Error'});
                        }
                        res.redirect(redirect);
                        return;
                    });
             });
        }
    }
};

