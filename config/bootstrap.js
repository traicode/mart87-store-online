/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

function createCategory(theCategory) {
    Category.findOne({ name: theCategory.name }, function(err, category) {
        if (!category) {
            Category.create(theCategory).exec(function(err, createdCategory) {
                console.log("The category " + createdCategory.id + " created successfully.");
            });
        }
    });
}

module.exports.bootstrap = function(cb) {

    var maxCategory = 10;

    for (var i = 1; i <=maxCategory; i++) {
        createCategory({
            name: 'category-' + i,
            image: 'c05f1269-9ca4-477a-9b21-8a282f3c2728.png',
            parent: Math.floor(Math.random() * maxCategory),
            description: 'category-' + i
        });
    }


    cb();
};
