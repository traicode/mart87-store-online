/**
 * OrderDetail.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    qty:{
      type:'integer'
    },
    // Add a reference to Order
    order:{
      model:"Order"
    },
    // Add a reference to Product
    product: {
      model:'Product'
    },
  }
};

