/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    subTotalPrice:{
      type:'float'
    },
    deliveryPrice:{
      type:'float'
    },
    grandTotalPrice:{
      type:'float'
    },
    phone:{
      type:'string'
    },
    // Add a reference to User
    user: {
      model: 'User'
    }, 
    // Add a reference to OrderDetail
    orderdetail: {
      collection: 'OrderDetail',
      via: 'order',
      dominant: true
    },
    status:{
      type:'string'
    }
  }
};

