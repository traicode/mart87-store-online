/**
 * SlideController
 *
 * @description :: Server-side logic for managing slides
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req, res){
        var page = req.params.page;
        var limit = 10;
        var offset = (page - 1) *  limit;
        Slide.find({}).paginate({page: page, limit: offset}).exec(function(err, slides){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view({slides:slides});
        });
    },

    'new': function(req, res){
            res.view();
    },

    create:function(req, res){
        var image = req.file('image');
	    image.upload({ dirname: '../../assets/images/slide'},function onUploadComplete (err, files) {				
            if (err) return res.serverError(err);								
                var imageFile  = files[0].fd;
                var lastPart = imageFile.split("/").pop();
                var name = req.body.name;
                var description = req.body.description;
                var slide = {
                    name: name,
                    description:description,
                    image:lastPart
                }
                Slide.create(slide).exec(function(err){
                    if(err){
                        res.send(500, {error: 'Database Error'});
                    }
                    res.redirect('/dashboard/slide');
                });
        });
        
    },

    delete: function(req, res){
        var cId = req.params.id;
        Slide.destroy({id:cId}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/dashboard/slide');
        });
        return false;
    },

    edit: function(req, res) {
        var id = req.params.id;
        Slide.findOne(id).exec(function(err, slide) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.view({slide,slide});
        });
    },
    update: function(req, res){
        var name = req.body.name;
        var description = req.body.description;

        Slide.update({id: req.params.id},{name:name,description:description}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.redirect('/dashboard/slide');
        });

        return false;
    }
};

