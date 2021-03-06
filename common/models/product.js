'use strict'

module.exports = function (Product) {
/**
* Return true if the input is larger than zero
* @param {number} quantity Number to validate
*/

// helper method to validate quantity
  const validQuantity = quantity => Boolean(quantity > 0)

 /**
* Buy this product
* @param {number} quantity Number of products to buy
* @param {Function(Error, object)} callback
*/

  Product.prototype.buy = function (quantity, callback) {
    // invoke helper method in
    if (!validQuantity(quantity)) {
      return callback(`Invalid quantity ${quantity}`)
    }
    const result = {
      status: `You bought ${quantity} product(s)`
    }
    callback(null, result)
  }

  // Validation method
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters'
    }
  })

  Product.validatesUniquenessOf('name')

  // ensure price is 0 or higher using regex
  const positiveInteger = /^[0-9]*$/

  // validate integer, pass in error cb, call err if test not passed
  const validatePositiveInteger = function (err) {
    if (!positiveInteger.test(this.price)) {
      err()
    }
  }

  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a positive integer'
  })

  function validateMinimalPrice (err, done) {
    const price = this.price

    // asynchronous validation to check against db value, ensure price higher than min
    process.nextTick(() => {
      const minimalPriceFromDB = 0.5
      if (price < minimalPriceFromDB) {
        err()
      }
      done()
    })
  }

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be higher than minimal price in the DB'
  })
}
