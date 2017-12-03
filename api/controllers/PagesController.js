/**
 * PageController.index => pages/index.ejs : res.view();
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    index: function (req, res) {
        return res.view({
            categories : req.categories,
            partners : req.partners,
            slides : req.slides
        });
    },

    category: function (req, res) {
        return res.view({
            categories : req.categories,
            partners : req.partners,
            slides : req.slides
        });
    },

    search :function(req,res){
        
        
        var  text =  req.body.text;
        console.log("Search : ",  text);
        return res.view({
            categories : req.categories,
            partners : req.partners,
            slides : req.slides
        });
    }
    
};

