/**
 * PartnerController
 *
 * @description :: Server-side logic for managing partners
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index:function(req, res){
        var page = req.params.page;
        var limit = 10;
        var offset = (page - 1) *  limit;
        Partner.find({}).paginate({page: page, limit: offset}).exec(function(err, partners){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view({partners:partners});
        });
    },

    'new': function(req, res){
            res.view();
    },

    create:function(req, res){
        var image = req.file('image');
	    image.upload({ dirname: '../../assets/images/partner'},function onUploadComplete (err, files) {				
            if (err) return res.serverError(err);							
                // save original file name
                var imageFile  = files[0].fd;
                var lastPart = imageFile.split("/").pop();
                var name = req.body.name;
                var description = req.body.description;
                var partner = {
                    name: name,
                    description:description,
                    image:lastPart
                }
                Partner.create(partner).exec(function(err){
                    if(err){
                        res.send(500, {error: 'Database Error'});
                    }
                    res.redirect('/dashboard/partner');
                });
        });
        
    },

    delete: function(req, res){
        var cId = req.params.id;
        Partner.destroy({id:cId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/dashboard/partner');
        });
        return false;
    },

    edit: function(req, res) {
        var id = req.params.id;
        Partner.findOne(id).exec(function(err, partner) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view({partner,partner});
        });
    },
    update: function(req, res){
        var name = req.body.name;
        var description = req.body.description;

        Partner.update({id: req.params.id},{name:name,description:description}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/dashboard/partner');
        });

        return false;
    }
};

