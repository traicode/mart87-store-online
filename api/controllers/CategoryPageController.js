/**
 * CategoryPageController
 *
 * @description :: Server-side logic for managing Categorypages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
	category:function(req,res){
        var cId = req.params.id;
        var page = req.params.page;
        var limit = 10;
        var offset = (page - 1) *  limit;
        Product.find({}).paginate({page: page, limit: offset}).exec(function(err, products){
            if(err){
                res.send(500, {error: 'Database Error'});
            }
            res.view('/pages/category',{products:products});
        });
    }
};

