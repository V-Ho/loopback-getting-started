'use strict';

module.exports = function(Product) {

/**
* Return true if the input is larger than zero
* @param {number} quantity Number to validate
*/

//helper method to validate quantity
const validQuantity = quantity => Boolean(quantity > 0)

 /**
* Buy this product
* @param {number} quantity Number of products to buy
* @param {Function(Error, object)} callback
*/

  Product.prototype.buy = function(quantity, callback) {
    //invoke helper method in
    if (!validQuantity(quantity)) {
      return callback(`Invalid quantity ${quantity}`)
    }
    const result = {
      status: `You bought ${quantity} product(s)`
    }
    callback(null, result);
  };
}
