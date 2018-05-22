const { app, expect } = require('../common')

// Get a reference to the Product model
const Product = app.models.Product

describe('Custom methods', function () {
  it('should allow buying a product', function () {
    const product = new Product({ name: 'buy-product', price: 299 })
    return product.buy(10, function (err, res) {
      expect(res.status).to.contain('You bought 10 product(s)')
    })
  })

  it('should not allow buying a negative product quantity', function () {
    const product = new Product({ name: 'buy-product', price: 299 })
    //callback verifies correct error message for -10
    return product.buy(-10, function (err, res) {
      expect(err).to.contain('Invalid quantity -10')
    })
  })
})

describe('Validation', function() {
  it('should reject a name < 3 characters', function() {
    return Product.create({ name: 'a', price: 299 })
      .then(res => Promise.reject('Product should not be created'))
      .catch(err => {
        expect(err.message).to.contain('Name should be at least 3 characters')
        expect(err.statusCode).to.be.equal(422)
      })
  })

  it('should reject a duplicate name', function() {
    return Promise.resolve()
    .then(() => Product.create({ name: 'abc', price: 299 }))
    .then(() => Product.create({ name: 'abc', price: 299 }))
    .then(res => Promise.reject('Product should not be created'))
    .catch(err => {
      expect(err.message).to.contain('Details: `name` is not unique')
      expect(err.statusCode).to.be.equal(422)
    })
  })

  it('should store a correct product', function() {
    return Product.create({ name: 'New Product Yay', price: 10 })
      .then(res => {
        expect(res.name).to.equal('New Product Yay')
        expect(res.price).to.be.equal(10)
      })
  })
})
