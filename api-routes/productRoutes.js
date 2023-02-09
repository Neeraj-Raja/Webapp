var express = require('express');
var router = express.Router();

var product = require('../services/products');
var helper = require('../config/helper');

router.post('/', helper.pAuthCheck, product.createNewProduct);

router.get('/:id', product.getProduct);

router.put('/:id', helper.pAuthCheck, product.putProductInfo);

router.patch('/:id', helper.pAuthCheck, product.patchProductInfo);

router.delete('/:id', helper.pAuthCheck, product.deleteProduct);
module.exports = router;