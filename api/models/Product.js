/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string'
    },
    categoryId:{
      type:'string'
    },
    price:{
      type:'string'
    },
    type:{
      type:'string'
    },
    stock:{
      type:'string'
    },
    description:{
      type:'string'
    },
    images: {
      type: 'array'
    },
    // Add a reference to Category
    category: {
      model: 'Category'
    },
    // Add a reference to User
    user: {
      model: 'User'
    },
     // Add a reference to OrderDetail
    orderDetail: {
      collection: 'OrderDetail',
      via: 'product',
      dominant: true
    },
  }
};

