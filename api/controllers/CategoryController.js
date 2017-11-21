/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
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

    params: function (req) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        console.clear();
        console.log("Fetch Params: ", params);
        return params;
    },

    paramId: function (req) {
        var id = req.param('id')
        if (!id) {
            return res.send("No id specified.", 500);
        }
        console.clear();
        console.log("Fetch Id: ", id);
        return id;
    },

    findAll: function (req, res) {
        var params = this.params(req);
        var page = params.page || 1;
        var limit = params.limit || 10;
        var count = 0;
        Category.find({}).paginate({ page: page, limit: limit }).exec(function (err, categories) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            if (categories.length > 0) {
                count = categories.length;
            }
            var totalPages = Math.ceil(categories.length / limit);
            return res.json({ categories: categories, totalItems: count, totalPages: totalPages });
        });
    },

    findById: function (req, res) {
        var params = this.params(req);
        Category.find({ id: params.id }).exec(function (err, category) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            return res.json({ category });
        });
    },

    save: function (req, res) {
        var uploadFile = req.file('fileUpload');
        uploadFile.upload({ dirname: '../../assets/images/category' }, function onUploadComplete(err, files) {
            // Earlier it was ./assets/images .. Changed to ../../assets/images
            //	Files will be uploaded to ./assets/images
            // Access it via localhost:1337/images/file-name
            if (err) return res.serverError(err);
            //	IF ERROR Return and send 500 error
            var imageFile = files[0].fd;
            var lastPart = imageFile.split("/").pop();
            var name = req.body.name;
            var description = req.body.description;
            var parentId = req.body.parentId;
            var category = {
                name: name,
                parentId: parentId,
                description: description,
                image: lastPart
            }
            Category.create(category).exec(function (err) {
                if (err) {
                    res.send(500, { error: 'Database Error' });
                }
                return res.json({ category });
            });
        });
    },

    delete: function (req, res) {
        var cId = req.params.id;

        Category.findOne(id).exec(function (err, category) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            if (category) {
                Category.destroy({ id: cId }).exec(function (err) {
                    if (err) {
                        res.send(500, { error: 'Database Error' });
                    }
                    return res.json({ category });
                });
            }
        });
    },

    update: function (req, res) {
        var name = req.body.name;
        var description = req.body.description;
        var parentId = req.body.parentId;

        var category = {
            name: name,
            description: description,
            parentId: parentId
        };

        Category.update({ id: req.params.id }, category).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            return res.json({ category });
        });
    }
};

