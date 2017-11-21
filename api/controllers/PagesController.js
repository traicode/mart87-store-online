/**
 * PageController.index => pages/index.ejs : res.view();
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    index: function (req, res) {

        Slide.find({}).exec(function (err, sliders) {

            Category.find({}).exec(function (err, categories) {

                var i, j, chunk = 6, list6Categories = [];

                for (i = 0, j = categories.length; i < j; i += chunk) {
                    list6Categories.push(categories.slice(i, i + chunk));
                }

                return res.view({
                    sliders: sliders,
                    categories: categories,
                    list6Categories: list6Categories
                });
            });

        });
    },

    category: function (req, res) {
        Slide.find({}).exec(function (err, sliders) {

            Category.find({}).exec(function (err, categories) {

                var i, j, chunk = 6, list6Categories = [];

                for (i = 0, j = categories.length; i < j; i += chunk) {
                    list6Categories.push(categories.slice(i, i + chunk));
                }

                return res.view({
                    sliders: sliders,
                    categories: categories,
                    list6Categories: list6Categories
                });
            });

        });
    }
};

