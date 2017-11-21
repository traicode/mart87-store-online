/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    qty:{
      type:'integer'
    },
    totalPrice:{
      type:'float'
    },
    // Add a reference to User
    user: {
      model: 'User'
    },
    // Add a reference to Product
    products: {
      collection: 'Product',
      via: 'orders'
    }
  }
};

